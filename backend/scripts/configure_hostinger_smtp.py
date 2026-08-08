from __future__ import annotations

import getpass
import os
from pathlib import Path
import signal
import smtplib
import ssl
import subprocess
import sys
import time
from email.message import EmailMessage
from urllib.request import urlopen


SECRET_PATH = Path.home() / ".config" / "shama" / "smtp_password"
MAILBOX = "contact@shama.pk"
SMTP_HOST = "smtp.hostinger.com"
SMTP_PORT = 465


def verify_mailbox(password: str) -> None:
    message = EmailMessage()
    message["From"] = f"Shama.pk <{MAILBOX}>"
    message["To"] = MAILBOX
    message["Subject"] = "Shama.pk SMTP configuration test"
    message.set_content(
        "Hostinger SMTP authentication and delivery are working for Shama.pk.\n"
    )

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, context=context, timeout=20) as client:
        client.login(MAILBOX, password)
        client.send_message(message)


def save_password(password: str) -> bytes | None:
    previous = SECRET_PATH.read_bytes() if SECRET_PATH.exists() else None
    SECRET_PATH.parent.mkdir(mode=0o700, parents=True, exist_ok=True)
    os.chmod(SECRET_PATH.parent, 0o700)
    temporary_path = SECRET_PATH.with_name(f".{SECRET_PATH.name}.tmp")
    temporary_path.unlink(missing_ok=True)
    descriptor = os.open(temporary_path, os.O_WRONLY | os.O_CREAT | os.O_EXCL, 0o600)
    with os.fdopen(descriptor, "w", encoding="utf-8") as secret_file:
        secret_file.write(password + "\n")
    temporary_path.replace(SECRET_PATH)
    return previous


def restore_password(previous: bytes | None) -> None:
    if previous is None:
        SECRET_PATH.unlink(missing_ok=True)
        return
    SECRET_PATH.write_bytes(previous)
    os.chmod(SECRET_PATH, 0o600)


def verify_backend() -> None:
    previous_pid = int(
        subprocess.check_output(
            ["systemctl", "show", "shama-backend.service", "-p", "MainPID", "--value"],
            text=True,
        ).strip()
    )
    os.kill(previous_pid, signal.SIGTERM)

    deadline = time.monotonic() + 20
    while time.monotonic() < deadline:
        try:
            current_pid = int(
                subprocess.check_output(
                    ["systemctl", "show", "shama-backend.service", "-p", "MainPID", "--value"],
                    text=True,
                ).strip()
            )
            if current_pid and current_pid != previous_pid:
                with urlopen("http://127.0.0.1:8000/health", timeout=2) as response:
                    if response.status == 200:
                        return
        except (OSError, ValueError, subprocess.SubprocessError):
            pass
        time.sleep(0.25)
    raise RuntimeError("Backend did not become healthy after restart")


def main() -> int:
    if os.geteuid() == 0:
        print("Run this helper as the deploy user, without sudo.", file=sys.stderr)
        return 1

    password = getpass.getpass(f"Password for {MAILBOX}: ")
    confirmation = getpass.getpass("Enter the mailbox password again: ")
    if not password or password != confirmation:
        print("Passwords are empty or do not match. No changes were made.", file=sys.stderr)
        return 1

    print("Authenticating with Hostinger and sending a test email...")
    try:
        verify_mailbox(password)
    except (OSError, smtplib.SMTPException) as error:
        print(f"SMTP verification failed: {error}. No changes were made.", file=sys.stderr)
        return 1

    previous = save_password(password)
    try:
        verify_backend()
    except Exception:
        restore_password(previous)
        try:
            verify_backend()
        except Exception:
            pass
        print("Backend verification failed. Restored the previous secret.", file=sys.stderr)
        raise

    print("SMTP configured successfully.")
    print(f"Password file: {SECRET_PATH} (mode 600)")
    print(f"Test email sent to: {MAILBOX}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())