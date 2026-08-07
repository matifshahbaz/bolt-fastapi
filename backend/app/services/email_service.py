import logging
import smtplib
from email.message import EmailMessage

from app.core.config import settings

logger = logging.getLogger(__name__)


class EmailService:
    def send(self, recipient: str, subject: str, body: str) -> bool:
        if not settings.smtp_host:
            logger.warning("Email not sent because SHAMA_SMTP_HOST is not configured")
            return False

        message = EmailMessage()
        message["From"] = f"{settings.email_from_name} <{settings.email_from}>"
        message["To"] = recipient
        message["Subject"] = subject
        message.set_content(body)

        try:
            smtp_class = smtplib.SMTP_SSL if settings.smtp_use_ssl else smtplib.SMTP
            with smtp_class(settings.smtp_host, settings.smtp_port, timeout=15) as client:
                if settings.smtp_use_tls and not settings.smtp_use_ssl:
                    client.starttls()
                if settings.smtp_username:
                    client.login(settings.smtp_username, settings.smtp_password)
                client.send_message(message)
            return True
        except (OSError, smtplib.SMTPException):
            logger.exception("Unable to send transactional email to %s", recipient)
            return False

    def send_registration_confirmation(self, recipient: str, full_name: str) -> bool:
        return self.send(
            recipient,
            "Your Shama.pk account is ready",
            f"Hello {full_name},\n\nYour Shama.pk account has been created successfully.\n\nShama.pk",
        )

    def send_password_reset(self, recipient: str, full_name: str, reset_token: str) -> bool:
        reset_url = f"{settings.frontend_base_url.rstrip('/')}/reset-password?token={reset_token}"
        return self.send(
            recipient,
            "Reset your Shama.pk password",
            (
                f"Hello {full_name},\n\nUse the link below to reset your password. "
                f"It expires in {settings.password_reset_token_ttl_minutes} minutes and can be used once.\n\n"
                f"{reset_url}\n\nIf you did not request this, you can ignore this email.\n\nShama.pk"
            ),
        )

    def send_payment_received(self, recipient: str, full_name: str, course_title: str) -> bool:
        return self.send(
            recipient,
            "Shama.pk payment proof received",
            (
                f"Hello {full_name},\n\nWe received your payment proof for {course_title}. "
                "It is pending manual review. We will email you after it is reviewed.\n\nShama.pk"
            ),
        )

    def send_payment_alert(self, user_name: str, user_email: str, course_title: str) -> bool:
        return self.send(
            settings.admin_notification_email,
            "New Shama.pk payment proof",
            (
                f"A payment proof for {course_title} is ready for review.\n\n"
                f"Student: {user_name}\nEmail: {user_email}\n\n"
                f"Review it at {settings.frontend_base_url.rstrip('/')}/admin/payments"
            ),
        )

    def send_payment_approved(self, recipient: str, full_name: str, course_title: str) -> bool:
        return self.send(
            recipient,
            "Your Shama.pk course access is active",
            (
                f"Hello {full_name},\n\nYour payment for {course_title} has been approved and "
                f"your course access is now active.\n\n{settings.frontend_base_url.rstrip('/')}/dashboard\n\nShama.pk"
            ),
        )

    def send_course_access_granted(self, recipient: str, full_name: str, course_title: str) -> bool:
        return self.send(
            recipient,
            "Your Shama.pk course access is active",
            (
                f"Hello {full_name},\n\nAccess to {course_title} has been added to your Shama.pk account.\n\n"
                f"{settings.frontend_base_url.rstrip('/')}/dashboard\n\nShama.pk"
            ),
        )

    def send_payment_rejected(self, recipient: str, full_name: str, course_title: str, note: str | None) -> bool:
        reason = f"\nReview note: {note}" if note else ""
        return self.send(
            recipient,
            "Update about your Shama.pk payment proof",
            (
                f"Hello {full_name},\n\nWe could not approve your payment proof for {course_title}."
                f"{reason}\n\nYou may submit a new proof from the course page.\n\nShama.pk"
            ),
        )


email_service = EmailService()