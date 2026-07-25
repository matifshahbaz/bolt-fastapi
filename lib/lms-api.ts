import { apiBaseUrl } from '@/lib/api';

export type UserProfile = {
  id: number;
  full_name: string;
  email: string;
  created_at: string;
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

export function getDashboard(token: string) {
  return lmsRequest<DashboardResponse>('/api/v1/lms/me/dashboard', undefined, token);
}

export function purchaseCourse(token: string, courseId: string) {
  return lmsRequest<Enrollment>(`/api/v1/lms/courses/${courseId}/purchase`, {
    method: 'POST',
    body: JSON.stringify({ payment_method: 'manual' }),
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