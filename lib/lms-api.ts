import { apiBaseUrl } from '@/lib/api';

export type UserProfile = {
  id: number;
  full_name: string;
  email: string;
  mobile_number?: string | null;
  age?: number | null;
  location?: string | null;
  created_at: string;
  is_admin?: boolean;
};

export type AuthResponse = {
  access_token: string;
  token_type: 'bearer';
  user: UserProfile;
};

export type Enrollment = {
  id: number;
  course_id: string;
  status: string;
  price_paid: string;
  enrolled_at: string;
  last_accessed_at?: string | null;
};

export type AdminStudentRecord = {
  user_id: number;
  full_name: string;
  email: string;
  mobile_number?: string | null;
  age?: number | null;
  location?: string | null;
  registered_at: string;
  enrollment?: Enrollment | null;
  completed_lessons: number;
};

export type LessonProgressItem = {
  module_id: string;
  lesson_index: number;
  lesson_title: string;
  completed: boolean;
  completed_at?: string | null;
};

export type CourseProgress = {
  course_id: string;
  total_lessons: number;
  completed_lessons: number;
  percent_complete: number;
  items: LessonProgressItem[];
};

export type LessonPlayback = {
  video_uid: string;
  iframe_url: string;
  hls_url: string;
  dash_url: string;
  thumbnail_url: string;
  expires_at: string;
  completion_threshold_percent: number;
};

export type LessonWatchUpdate = {
  marked_complete: boolean;
  watched_percent: number;
};

export type DashboardCourse = {
  enrollment: Enrollment;
  progress: CourseProgress;
  course_title: string;
  course_subtitle: string;
};

export type DashboardResponse = {
  student_name: string;
  student_email: string;
  enrolled_courses: DashboardCourse[];
};

export type RegisterPayload = {
  full_name: string;
  email: string;
  password: string;
  mobile_number?: string;
  age?: number;
  location?: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

const accessTokenKey = 'shama_access_token';

async function lmsRequest<T>(path: string, init?: RequestInit, token?: string): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    let message = 'Request failed';
    try {
      const errorPayload = await response.json();
      message = errorPayload.detail || message;
    } catch {
      message = await response.text() || message;
    }
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export function getStoredAccessToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.localStorage.getItem(accessTokenKey);
}

export function setStoredAccessToken(token: string) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(accessTokenKey, token);
  }
}

export function clearStoredAccessToken() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(accessTokenKey);
  }
}

export function registerUser(payload: RegisterPayload) {
  return lmsRequest<AuthResponse>('/api/v1/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function loginUser(payload: LoginPayload) {
  return lmsRequest<AuthResponse>('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function getCurrentUser(token: string) {
  return lmsRequest<UserProfile>('/api/v1/auth/me', undefined, token);
}

export function requestPasswordReset(email: string) {
  return lmsRequest<{ message: string; reset_token?: string | null }>('/api/v1/auth/password-reset/request', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export function confirmPasswordReset(token: string, newPassword: string) {
  return lmsRequest<{ message: string }>('/api/v1/auth/password-reset/confirm', {
    method: 'POST',
    body: JSON.stringify({ token, new_password: newPassword }),
  });
}

export type PaymentInstructions = {
  jazzcash_number: string;
  bank_name: string;
  bank_account_title: string;
  bank_account_number: string;
  bank_iban: string;
  bank_branch: string;
};

export type PaymentSubmission = {
  id: number;
  user_id: number;
  user_name: string;
  user_email: string;
  course_id: string;
  payment_method: 'jazzcash' | 'bank_transfer';
  amount: string;
  sender_account?: string | null;
  transaction_reference?: string | null;
  proof_filename: string;
  proof_content_type: string;
  status: 'pending' | 'approved' | 'rejected';
  review_note?: string | null;
  submitted_at: string;
  reviewed_at?: string | null;
};

export type PaymentSubmissionPayload = {
  payment_method: 'jazzcash' | 'bank_transfer';
  sender_account?: string;
  transaction_reference?: string;
  proof_filename: string;
  proof_data_url: string;
};

export function getDashboard(token: string) {
  return lmsRequest<DashboardResponse>('/api/v1/lms/me/dashboard', undefined, token);
}

export function getPaymentInstructions() {
  return lmsRequest<PaymentInstructions>('/api/v1/lms/payment-instructions');
}

export function submitPaymentProof(token: string, courseId: string, payload: PaymentSubmissionPayload) {
  return lmsRequest<PaymentSubmission>(`/api/v1/lms/courses/${courseId}/payment-submissions`, {
    method: 'POST',
    body: JSON.stringify(payload),
  }, token);
}

export function getPaymentSubmission(token: string, courseId: string) {
  return lmsRequest<PaymentSubmission | null>(`/api/v1/lms/courses/${courseId}/payment-submission`, undefined, token);
}

export function listPaymentSubmissions(token: string, status = 'pending') {
  return lmsRequest<PaymentSubmission[]>(`/api/v1/lms/admin/payment-submissions?status=${encodeURIComponent(status)}`, undefined, token);
}

export async function getPaymentProof(token: string, submissionId: number) {
  const response = await fetch(`${apiBaseUrl}/api/v1/lms/admin/payment-submissions/${submissionId}/proof`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error('Payment proof could not be loaded');
  }
  return response.blob();
}

export function reviewPayment(
  token: string,
  submissionId: number,
  decision: 'approve' | 'reject',
  reviewNote?: string,
) {
  return lmsRequest<PaymentSubmission>(
    `/api/v1/lms/admin/payment-submissions/${submissionId}/${decision}`,
    { method: 'POST', body: JSON.stringify({ review_note: reviewNote || null }) },
    token,
  );
}

export function listAdminStudents(token: string, courseId: string, search?: string) {
  const params = new URLSearchParams({ course_id: courseId });
  if (search?.trim()) {
    params.set('search', search.trim());
  }
  return lmsRequest<AdminStudentRecord[]>(`/api/v1/lms/admin/students?${params.toString()}`, undefined, token);
}

export function createAdminEnrollment(token: string, email: string, courseId: string, pricePaid?: string) {
  return lmsRequest<Enrollment>('/api/v1/lms/admin/enrollments', {
    method: 'POST',
    body: JSON.stringify({ email, course_id: courseId, price_paid: pricePaid || null }),
  }, token);
}

export function updateAdminEnrollmentStatus(
  token: string,
  userId: number,
  courseId: string,
  enrollmentStatus: 'active' | 'inactive' | 'expired' | 'refunded',
) {
  return lmsRequest<Enrollment>(
    `/api/v1/lms/admin/students/${userId}/courses/${courseId}/enrollment`,
    { method: 'PATCH', body: JSON.stringify({ status: enrollmentStatus }) },
    token,
  );
}

export function deleteAdminEnrollment(token: string, userId: number, courseId: string) {
  return lmsRequest<{ message: string }>(
    `/api/v1/lms/admin/students/${userId}/courses/${courseId}/enrollment`,
    { method: 'DELETE' },
    token,
  );
}

export function refundCourse(token: string, courseId: string) {
  return lmsRequest<Enrollment>(`/api/v1/lms/courses/${courseId}/refund`, {
    method: 'POST',
  }, token);
}

export function getCourseProgress(token: string, courseId: string) {
  return lmsRequest<CourseProgress>(`/api/v1/lms/courses/${courseId}/progress`, undefined, token);
}

export function updateLessonProgress(
  token: string,
  courseId: string,
  moduleId: string,
  lessonIndex: number,
  completed: boolean
) {
  return lmsRequest<CourseProgress>(
    `/api/v1/lms/courses/${courseId}/modules/${moduleId}/lessons/${lessonIndex}`,
    {
      method: 'POST',
      body: JSON.stringify({ completed }),
    },
    token
  );
}

export function getLessonPlayback(
  token: string,
  courseId: string,
  moduleId: string,
  lessonIndex: number,
) {
  return lmsRequest<LessonPlayback>(
    `/api/v1/lms/courses/${courseId}/modules/${moduleId}/lessons/${lessonIndex}/playback`,
    undefined,
    token,
  );
}

export function submitLessonWatchEvent(
  token: string,
  courseId: string,
  moduleId: string,
  lessonIndex: number,
  watchedPercent: number,
) {
  return lmsRequest<LessonWatchUpdate>(
    `/api/v1/lms/courses/${courseId}/modules/${moduleId}/lessons/${lessonIndex}/watch`,
    {
      method: 'POST',
      body: JSON.stringify({ watched_percent: watchedPercent }),
    },
    token,
  );
}