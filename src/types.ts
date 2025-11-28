
export enum UserRole {
  STUDENT = 'STUDENT',
  TRAINER = 'TRAINER',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  bio?: string;
  password?: string; // Added password field
}

export enum CourseMode {
  ONLINE = 'Online Live',
  OFFLINE = 'Classroom',
  RECORDED = 'Recorded'
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructorName: string;
  price: number;
  duration: string;
  category: string;
  rating: number;
  studentsEnrolled: number;
  image: string;
  mode: CourseMode;
  nextBatchDate?: string;
  progress?: number; // For students
}

export interface Session {
  id: string;
  courseId: string;
  title: string;
  startTime: string; // ISO string
  durationMinutes: number;
  isLive: boolean;
  meetingLink?: string;
}

export interface AnalyticsData {
  name: string;
  value: number;
  fullMark?: number;
}

export type ReviewStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Review {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  status: ReviewStatus;
  courseName?: string;
}
