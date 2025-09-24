/**
 * Core application types and interfaces
 */

// User types
export enum UserRole {
    ADMIN = 'ADMIN',
    INSTRUCTOR = 'INSTRUCTOR',
    STUDENT = 'STUDENT',
  }
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatarUrl?: string;
  emailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface AuthUser extends User {
  accessToken: string;
  refreshToken?: string;
}

// Test types
export type TestStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type QuestionType = 'MCQ' | 'MULTIPLE_SELECT' | 'TRUE_FALSE';

export interface Test {
  id: string;
  title: string;
  description?: string;
  instructorId: string;
  instructor?: User;
  status: TestStatus;
  timeLimit?: number; // in minutes
  maxAttempts: number;
  passingScore?: number; // percentage
  instructions?: string;
  isRandomized: boolean;
  showResults: boolean;
  allowReview: boolean;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  questions?: Question[];
  questionsCount?: number;
}

export interface Question {
  id: string;
  testId: string;
  questionText: string;
  questionType: QuestionType;
  points: number;
  orderIndex: number;
  explanation?: string;
  createdAt: string;
  updatedAt: string;
  options: QuestionOption[];
}

export interface QuestionOption {
  id: string;
  questionId: string;
  optionText: string;
  isCorrect: boolean;
  orderIndex: number;
  createdAt: string;
}

// Test attempt types
export interface TestAttempt {
  id: string;
  testId: string;
  test?: Test;
  studentId: string;
  student?: User;
  startedAt: string;
  submittedAt?: string;
  timeTaken?: number; // in seconds
  score?: number; // percentage
  totalQuestions: number;
  correctAnswers: number;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  responses?: TestResponse[];
}

export interface TestResponse {
  id: string;
  attemptId: string;
  questionId: string;
  question?: Question;
  selectedOptionIds: string[];
  isCorrect: boolean;
  pointsEarned: number;
  timeSpent?: number; // in seconds
  createdAt: string;
}

// Document and Mind Map types
export type DocumentStatus = 'UPLOADED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

export interface Document {
  id: string;
  title: string;
  fileName: string;
  filePath: string;
  fileSize: number;
  mimeType: string;
  uploadedBy: string;
  uploadedByUser?: User;
  processed: boolean;
  rawText?: string;
  processedChunks?: ProcessedChunk[];
  createdAt: string;
  updatedAt: string;
  status?: DocumentStatus;
}

export interface ProcessedChunk {
  id: number;
  text: string;
  startSentence: number;
  endSentence: number;
  sentenceCount: number;
}

export interface DocumentSection {
  heading: string;
  content: string;
  level?: number;
  startPos?: number;
  endPos?: number;
}

export interface EntityExtraction {
  text: string;
  label: string;
  startPos?: number;
  endPos?: number;
}

export interface MindMap {
  id: string;
  documentId: string;
  document?: Document;
  title: string;
  structure: MindMapStructure;
  createdBy: string;
  createdByUser?: User;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MindMapNode {
  id: string;
  label: string;
  type: 'root' | 'branch' | 'leaf';
  level: number;
  children?: MindMapNode[];
  metadata?: {
    source?: string;
    entities?: string[];
    keyPhrases?: string[];
  };
}

export interface MindMapStructure {
  nodes: MindMapNode[];
  edges?: MindMapEdge[];
  metadata?: {
    totalNodes: number;
    maxDepth: number;
    createdAt: string;
    algorithm: string;
  };
}

export interface MindMapEdge {
  id: string;
  source: string;
  target: string;
  type?: 'hierarchical' | 'semantic' | 'cross-reference';
  weight?: number;
}

// API Response types
export interface ApiResponse<T = any> {
  data?: T;
  message: string;
  status: 'success' | 'error' | 'warning';
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  totalPages: number;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
  remember?: boolean;
}

export interface SignupForm {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface CreateTestForm {
  title: string;
  description?: string;
  timeLimit?: number;
  maxAttempts: number;
  passingScore?: number;
  instructions?: string;
  isRandomized: boolean;
  showResults: boolean;
  allowReview: boolean;
  startDate?: string;
  endDate?: string;
}

export interface CreateQuestionForm {
  questionText: string;
  questionType: QuestionType;
  points: number;
  explanation?: string;
  options: CreateOptionForm[];
}

export interface CreateOptionForm {
  optionText: string;
  isCorrect: boolean;
}

// UI State types
export interface LoadingState {
  [key: string]: boolean;
}

export interface ErrorState {
  [key: string]: string | null;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Component Props types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface TableColumn<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: T) => React.ReactNode;
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface SortOption {
  field: string;
  direction: 'asc' | 'desc';
}

// Dashboard types
export interface DashboardStats {
  totalUsers?: number;
  totalTests?: number;
  totalAttempts?: number;
  averageScore?: number;
  recentActivity?: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'test_created' | 'test_completed' | 'user_registered' | 'document_uploaded';
  title: string;
  description: string;
  timestamp: string;
  user?: User;
  metadata?: Record<string, any>;
}

// Settings types
export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  children?: NavItem[];
  roles?: UserRole[];
}

// File upload types
export interface FileUploadState {
  file: File | null;
  progress: number;
  status: 'idle' | 'uploading' | 'success' | 'error';
  error?: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
}