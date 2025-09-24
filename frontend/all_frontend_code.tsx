\n\n// ===== FILE: ./src/lib/apollo/client.ts =====\n\n
/**
 * Apollo Client configuration for GraphQL operations with Hasura
 */

import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { getSession } from 'next-auth/react';

// HTTP Link to Hasura GraphQL endpoint
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT || 'http://localhost:8080/v1/graphql',
  credentials: 'include',
});

// Auth Link - adds JWT token to requests
const authLink = setContext(async (_, { headers }) => {
  try {
    const session = await getSession();
    const token = session?.accessToken;

    return {
      headers: {
        ...headers,
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
        // Add admin secret for development (remove in production)
        ...(process.env.NODE_ENV === 'development' && {
          'X-Hasura-Admin-Secret': process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
        }),
      },
    };
  } catch (error) {
    console.error('Error getting session:', error);
    return {
      headers,
    };
  }
});

// Error Link - handles GraphQL and network errors
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        extensions
      );

      // Handle specific error types
      if (extensions?.code === 'access-denied') {
        // Redirect to login or show auth error
        console.warn('Access denied - user may need to re-authenticate');
      }
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    
    // Handle specific network errors
    if ('statusCode' in networkError) {
      switch (networkError.statusCode) {
        case 401:
          // Unauthorized - redirect to login
          console.warn('Unauthorized request - redirecting to login');
          break;
        case 403:
          // Forbidden - show permission error
          console.warn('Forbidden request - insufficient permissions');
          break;
        case 500:
          // Server error
          console.error('Server error occurred');
          break;
      }
    }
  }
});

// Cache configuration
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        tests: {
          keyArgs: ['where', 'order_by'],
          merge(existing = [], incoming) {
            return incoming;
          },
        },
        test_attempts: {
          keyArgs: ['where', 'order_by'],
          merge(existing = [], incoming) {
            return incoming;
          },
        },
        users: {
          keyArgs: ['where', 'order_by'],
          merge(existing = [], incoming) {
            return incoming;
          },
        },
        documents: {
          keyArgs: ['where', 'order_by'],
          merge(existing = [], incoming) {
            return incoming;
          },
        },
      },
    },
    User: {
      keyFields: ['id'],
    },
    Test: {
      keyFields: ['id'],
    },
    Question: {
      keyFields: ['id'],
    },
    TestAttempt: {
      keyFields: ['id'],
    },
    Document: {
      keyFields: ['id'],
    },
    MindMap: {
      keyFields: ['id'],
    },
  },
});

// Create Apollo Client instance
export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
    },
    query: {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
  connectToDevTools: process.env.NODE_ENV === 'development',
});

// Helper function to clear cache
export const clearApolloCache = () => {
  apolloClient.cache.reset();
};

// Helper function to refetch queries
export const refetchQueries = (queries: string[]) => {
  return apolloClient.refetchQueries({
    include: queries,
  });
};

export default apolloClient;\n\n// ===== FILE: ./src/lib/apollo/operations.ts =====\n\n
/**
 * GraphQL queries, mutations, and subscriptions
 */

import { gql } from '@apollo/client';

// Fragment definitions for reusable field sets
export const USER_FRAGMENT = gql`
  fragment UserFields on users {
    id
    email
    first_name
    last_name
    role
    avatar_url
    email_verified
    is_active
    created_at
    updated_at
    last_login
  }
`;

export const TEST_FRAGMENT = gql`
  fragment TestFields on tests {
    id
    title
    description
    instructor_id
    status
    time_limit
    max_attempts
    passing_score
    instructions
    is_randomized
    show_results
    allow_review
    start_date
    end_date
    created_at
    updated_at
  }
`;

export const QUESTION_FRAGMENT = gql`
  fragment QuestionFields on questions {
    id
    test_id
    question_text
    question_type
    points
    order_index
    explanation
    created_at
    updated_at
  }
`;

export const QUESTION_OPTION_FRAGMENT = gql`
  fragment QuestionOptionFields on question_options {
    id
    question_id
    option_text
    is_correct
    order_index
    created_at
  }
`;

export const TEST_ATTEMPT_FRAGMENT = gql`
  fragment TestAttemptFields on test_attempts {
    id
    test_id
    student_id
    started_at
    submitted_at
    time_taken
    score
    total_questions
    correct_answers
    is_completed
    created_at
    updated_at
  }
`;

export const DOCUMENT_FRAGMENT = gql`
  fragment DocumentFields on documents {
    id
    title
    file_name
    file_path
    file_size
    mime_type
    uploaded_by
    processed
    raw_text
    processed_chunks
    created_at
    updated_at
  }
`;

// User Queries
export const GET_CURRENT_USER = gql`
  ${USER_FRAGMENT}
  query GetCurrentUser {
    users(limit: 1) {
      ...UserFields
    }
  }
`;

export const GET_USERS = gql`
  ${USER_FRAGMENT}
  query GetUsers(
    $where: users_bool_exp
    $order_by: [users_order_by!]
    $limit: Int
    $offset: Int
  ) {
    users(where: $where, order_by: $order_by, limit: $limit, offset: $offset) {
      ...UserFields
    }
    users_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  ${USER_FRAGMENT}
  query GetUserById($id: uuid!) {
    users_by_pk(id: $id) {
      ...UserFields
    }
  }
`;

// Test Queries
export const GET_TESTS = gql`
  ${TEST_FRAGMENT}
  ${USER_FRAGMENT}
  query GetTests(
    $where: tests_bool_exp
    $order_by: [tests_order_by!]
    $limit: Int
    $offset: Int
  ) {
    tests(where: $where, order_by: $order_by, limit: $limit, offset: $offset) {
      ...TestFields
      instructor {
        ...UserFields
      }
      questions_aggregate {
        aggregate {
          count
        }
      }
    }
    tests_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_TEST_BY_ID = gql`
  ${TEST_FRAGMENT}
  ${USER_FRAGMENT}
  ${QUESTION_FRAGMENT}
  ${QUESTION_OPTION_FRAGMENT}
  query GetTestById($id: uuid!) {
    tests_by_pk(id: $id) {
      ...TestFields
      instructor {
        ...UserFields
      }
      questions(order_by: { order_index: asc }) {
        ...QuestionFields
        options: question_options(order_by: { order_index: asc }) {
          ...QuestionOptionFields
        }
      }
    }
  }
`;

export const GET_INSTRUCTOR_TESTS = gql`
  ${TEST_FRAGMENT}
  query GetInstructorTests($instructor_id: uuid!) {
    tests(
      where: { instructor_id: { _eq: $instructor_id } }
      order_by: { created_at: desc }
    ) {
      ...TestFields
      questions_aggregate {
        aggregate {
          count
        }
      }
      test_attempts_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

// Question Queries
export const GET_TEST_QUESTIONS = gql`
  ${QUESTION_FRAGMENT}
  ${QUESTION_OPTION_FRAGMENT}
  query GetTestQuestions($test_id: uuid!) {
    questions(
      where: { test_id: { _eq: $test_id } }
      order_by: { order_index: asc }
    ) {
      ...QuestionFields
      options: question_options(order_by: { order_index: asc }) {
        ...QuestionOptionFields
      }
    }
  }
`;

// Test Attempt Queries
export const GET_TEST_ATTEMPTS = gql`
  ${TEST_ATTEMPT_FRAGMENT}
  ${USER_FRAGMENT}
  ${TEST_FRAGMENT}
  query GetTestAttempts(
    $where: test_attempts_bool_exp
    $order_by: [test_attempts_order_by!]
    $limit: Int
    $offset: Int
  ) {
    test_attempts(
      where: $where
      order_by: $order_by
      limit: $limit
      offset: $offset
    ) {
      ...TestAttemptFields
      student {
        ...UserFields
      }
      test {
        ...TestFields
      }
    }
    test_attempts_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_STUDENT_ATTEMPTS = gql`
  ${TEST_ATTEMPT_FRAGMENT}
  ${TEST_FRAGMENT}
  query GetStudentAttempts($student_id: uuid!) {
    test_attempts(
      where: { student_id: { _eq: $student_id } }
      order_by: { created_at: desc }
    ) {
      ...TestAttemptFields
      test {
        ...TestFields
      }
    }
  }
`;

// Document Queries
export const GET_DOCUMENTS = gql`
  ${DOCUMENT_FRAGMENT}
  ${USER_FRAGMENT}
  query GetDocuments(
    $where: documents_bool_exp
    $order_by: [documents_order_by!]
    $limit: Int
    $offset: Int
  ) {
    documents(
      where: $where
      order_by: $order_by
      limit: $limit
      offset: $offset
    ) {
      ...DocumentFields
      uploaded_by_user: user {
        ...UserFields
      }
    }
    documents_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_DOCUMENT_BY_ID = gql`
  ${DOCUMENT_FRAGMENT}
  ${USER_FRAGMENT}
  query GetDocumentById($id: uuid!) {
    documents_by_pk(id: $id) {
      ...DocumentFields
      uploaded_by_user: user {
        ...UserFields
      }
    }
  }
`;

// User Mutations
export const CREATE_USER = gql`
  ${USER_FRAGMENT}
  mutation CreateUser($object: users_insert_input!) {
    insert_users_one(object: $object) {
      ...UserFields
    }
  }
`;

export const UPDATE_USER = gql`
  ${USER_FRAGMENT}
  mutation UpdateUser($id: uuid!, $_set: users_set_input!) {
    update_users_by_pk(pk_columns: { id: $id }, _set: $_set) {
      ...UserFields
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: uuid!) {
    delete_users_by_pk(id: $id) {
      id
    }
  }
`;

// Test Mutations
export const CREATE_TEST = gql`
  ${TEST_FRAGMENT}
  mutation CreateTest($object: tests_insert_input!) {
    insert_tests_one(object: $object) {
      ...TestFields
    }
  }
`;

export const UPDATE_TEST = gql`
  ${TEST_FRAGMENT}
  mutation UpdateTest($id: uuid!, $_set: tests_set_input!) {
    update_tests_by_pk(pk_columns: { id: $id }, _set: $_set) {
      ...TestFields
    }
  }
`;

export const DELETE_TEST = gql`
  mutation DeleteTest($id: uuid!) {
    delete_tests_by_pk(id: $id) {
      id
    }
  }
`;

export const PUBLISH_TEST = gql`
  ${TEST_FRAGMENT}
  mutation PublishTest($id: uuid!) {
    update_tests_by_pk(
      pk_columns: { id: $id }
      _set: { status: PUBLISHED }
    ) {
      ...TestFields
    }
  }
`;

// Question Mutations
export const CREATE_QUESTION = gql`
  ${QUESTION_FRAGMENT}
  mutation CreateQuestion($object: questions_insert_input!) {
    insert_questions_one(object: $object) {
      ...QuestionFields
    }
  }
`;

export const CREATE_QUESTIONS_BATCH = gql`
  ${QUESTION_FRAGMENT}
  mutation CreateQuestionsBatch($objects: [questions_insert_input!]!) {
    insert_questions(objects: $objects) {
      returning {
        ...QuestionFields
      }
    }
  }
`;

export const UPDATE_QUESTION = gql`
  ${QUESTION_FRAGMENT}
  mutation UpdateQuestion($id: uuid!, $_set: questions_set_input!) {
    update_questions_by_pk(pk_columns: { id: $id }, _set: $_set) {
      ...QuestionFields
    }
  }
`;

export const DELETE_QUESTION = gql`
  mutation DeleteQuestion($id: uuid!) {
    delete_questions_by_pk(id: $id) {
      id
    }
  }
`;

// Question Option Mutations
export const CREATE_QUESTION_OPTIONS = gql`
  ${QUESTION_OPTION_FRAGMENT}
  mutation CreateQuestionOptions($objects: [question_options_insert_input!]!) {
    insert_question_options(objects: $objects) {
      returning {
        ...QuestionOptionFields
      }
    }
  }
`;

// Test Attempt Mutations
export const START_TEST_ATTEMPT = gql`
  ${TEST_ATTEMPT_FRAGMENT}
  mutation StartTestAttempt($object: test_attempts_insert_input!) {
    insert_test_attempts_one(object: $object) {
      ...TestAttemptFields
    }
  }
`;

export const SUBMIT_TEST_ATTEMPT = gql`
  ${TEST_ATTEMPT_FRAGMENT}
  mutation SubmitTestAttempt(
    $id: uuid!
    $responses: [test_responses_insert_input!]!
    $_set: test_attempts_set_input!
  ) {
    insert_test_responses(objects: $responses) {
      affected_rows
    }
    update_test_attempts_by_pk(pk_columns: { id: $id }, _set: $_set) {
      ...TestAttemptFields
    }
  }
`;

// Document Mutations
export const CREATE_DOCUMENT = gql`
  ${DOCUMENT_FRAGMENT}
  mutation CreateDocument($object: documents_insert_input!) {
    insert_documents_one(object: $object) {
      ...DocumentFields
    }
  }
`;

export const UPDATE_DOCUMENT = gql`
  ${DOCUMENT_FRAGMENT}
  mutation UpdateDocument($id: uuid!, $_set: documents_set_input!) {
    update_documents_by_pk(pk_columns: { id: $id }, _set: $_set) {
      ...DocumentFields
    }
  }
`;

export const DELETE_DOCUMENT = gql`
  mutation DeleteDocument($id: uuid!) {
    delete_documents_by_pk(id: $id) {
      id
    }
  }
`;\n\n// ===== FILE: ./src/lib/utils.ts =====\n\n
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format bytes to human readable format
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Generate random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Capitalize first letter of string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Sleep utility for async operations
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Get file extension from filename
 */
export function getFileExtension(filename: string): string {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
}

/**
 * Check if file type is supported for document upload
 */
export function isSupportedFileType(filename: string): boolean {
  const supportedExtensions = ['pdf', 'docx', 'txt', 'pptx'];
  const extension = getFileExtension(filename).toLowerCase();
  return supportedExtensions.includes(extension);
}

/**
 * Safe JSON parse with fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch {
    return fallback;
  }
}

/**
 * Create URL-safe slug from text
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Convert camelCase to Title Case
 */
export function camelToTitle(camelCase: string): string {
  return camelCase
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

/**
 * Get initials from full name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

/**
 * Format duration in seconds to human readable format
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  } else {
    return `${remainingSeconds}s`;
  }
}\n\n// ===== FILE: ./src/lib/auth/queries.ts =====\n\n
/**
 * GraphQL queries for authentication
 */

import { gql } from '@apollo/client';

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    users(where: { email: { _eq: $email } }, limit: 1) {
      id
      email
      password_hash
      first_name
      last_name
      role
      avatar_url
      email_verified
      is_active
      created_at
      updated_at
      last_login
    }
  }
`;

export const UPDATE_USER_LAST_LOGIN = gql`
  mutation UpdateUserLastLogin($id: uuid!, $last_login: timestamptz!) {
    update_users_by_pk(
      pk_columns: { id: $id }
      _set: { last_login: $last_login }
    ) {
      id
      last_login
    }
  }
`;

export const CREATE_USER_ACCOUNT = gql`
  mutation CreateUserAccount($object: users_insert_input!) {
    insert_users_one(object: $object) {
      id
      email
      first_name
      last_name
      role
      avatar_url
      email_verified
      is_active
      created_at
    }
  }
`;

export const CHECK_EMAIL_EXISTS = gql`
  query CheckEmailExists($email: String!) {
    users(where: { email: { _eq: $email } }, limit: 1) {
      id
      email
    }
  }
`;\n\n// ===== FILE: ./src/lib/auth/config.ts =====\n\n
/**
 * NextAuth configuration for authentication with Hasura integration
 */

import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import bcrypt from 'bcryptjs';
import { apolloClient } from '@/lib/apollo/client';
import { GET_USER_BY_EMAIL } from './queries';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    avatarUrl?: string;
    emailVerified: boolean;
    isActive: boolean;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      role: string;
      avatarUrl?: string;
    };
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
    accessToken: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'john@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        try {
          // Query user from Hasura
          const { data } = await apolloClient.query({
            query: GET_USER_BY_EMAIL,
            variables: { email: credentials.email },
            fetchPolicy: 'network-only',
          });

          const user = data?.users?.[0];

          if (!user) {
            throw new Error('No user found with this email');
          }

          if (!user.is_active) {
            throw new Error('Account is deactivated');
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password_hash
          );

          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }

          // Update last login
          await apolloClient.mutate({
            mutation: UPDATE_USER_LAST_LOGIN,
            variables: {
              id: user.id,
              last_login: new Date().toISOString(),
            },
          });

          return {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            role: user.role,
            avatarUrl: user.avatar_url,
            emailVerified: user.email_verified,
            isActive: user.is_active,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          throw new Error(error instanceof Error ? error.message : 'Authentication failed');
        }
      },
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 8 * 24 * 60 * 60, // 8 days
  },

  jwt: {
    maxAge: 8 * 24 * 60 * 60, // 8 days
  },

  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    error: '/auth/error',
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.avatarUrl = user.avatarUrl;
        
        // Generate Hasura JWT token
        token.accessToken = generateHasuraJWT({
          userId: user.id,
          role: user.role,
          email: user.email,
        });
      }

      // Handle session updates
      if (trigger === 'update' && session) {
        if (session.firstName) token.firstName = session.firstName;
        if (session.lastName) token.lastName = session.lastName;
        if (session.avatarUrl) token.avatarUrl = session.avatarUrl;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.avatarUrl = token.avatarUrl;
        session.accessToken = token.accessToken;
      }

      return session;
    },
  },

  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log(`User ${user.email} signed in`);
    },
    
    async signOut({ session, token }) {
      console.log(`User ${token?.sub} signed out`);
    },
  },

  debug: process.env.NODE_ENV === 'development',
};

// Helper function to generate Hasura JWT
function generateHasuraJWT(payload: {
  userId: string;
  role: string;
  email: string;
}) {
  const jwt = require('jsonwebtoken');
  
  const hasuraPayload = {
    sub: payload.userId,
    email: payload.email,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (8 * 24 * 60 * 60), // 8 days
    'https://hasura.io/jwt/claims': {
      'x-hasura-allowed-roles': [payload.role.toLowerCase()],
      'x-hasura-default-role': payload.role.toLowerCase(),
      'x-hasura-user-id': payload.userId,
    },
  };

  return jwt.sign(
    hasuraPayload,
    process.env.NEXTAUTH_SECRET || 'your-super-secret-jwt-secret-key-min-32-chars',
    { algorithm: 'HS256' }
  );
}\n\n// ===== FILE: ./src/types/index.ts =====\n\n
/**
 * Core application types and interfaces
 */

// User types
export type UserRole = 'ADMIN' | 'INSTRUCTOR' | 'STUDENT';

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
}\n\n// ===== FILE: ./src/app/layout.tsx =====\n\n
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
\n\n// ===== FILE: ./src/app/page.tsx =====\n\n
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
\n\n// ===== FILE: ./src/components/layout/Sidebar.tsx =====\n\n
/**
 * Sidebar navigation component with role-based menu items
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  UsersIcon,
  ChartBarIcon,
  CogIcon,
  XMarkIcon,
  BeakerIcon,
  CloudArrowUpIcon,
  MapIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: UserRole;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
  badge?: string;
}

const navigation: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: HomeIcon,
    roles: ['ADMIN', 'INSTRUCTOR', 'STUDENT'],
  },
  {
    name: 'Tests',
    href: '/tests',
    icon: DocumentTextIcon,
    roles: ['ADMIN', 'INSTRUCTOR', 'STUDENT'],
  },
  {
    name: 'Documents',
    href: '/documents',
    icon: CloudArrowUpIcon,
    roles: ['ADMIN', 'INSTRUCTOR'],
  },
  {
    name: 'Mind Maps',
    href: '/mindmaps',
    icon: MapIcon,
    roles: ['ADMIN', 'INSTRUCTOR'],
  },
  {
    name: 'Results',
    href: '/results',
    icon: ChartBarIcon,
    roles: ['ADMIN', 'INSTRUCTOR'],
  },
  {
    name: 'Students',
    href: '/students',
    icon: AcademicCapIcon,
    roles: ['ADMIN', 'INSTRUCTOR'],
  },
  {
    name: 'Users',
    href: '/users',
    icon: UsersIcon,
    roles: ['ADMIN'],
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: CogIcon,
    roles: ['ADMIN', 'INSTRUCTOR', 'STUDENT'],
  },
];

export function Sidebar({ isOpen, onClose, userRole }: SidebarProps) {
  const pathname = usePathname();

  const filteredNavigation = navigation.filter((item) =>
    userRole ? item.roles.includes(userRole) : true
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 shadow-sm border-r border-gray-200">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center">
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <BeakerIcon className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-lg font-semibold text-gray-900">
                MindMap
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {filteredNavigation.map((item) => {
                    const isActive = pathname === item.href || 
                      (item.href !== '/dashboard' && pathname.startsWith(item.href));
                    
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            isActive
                              ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                              : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-l-md p-2 text-sm leading-6 font-medium'
                          )}
                        >
                          <item.icon
                            className={cn(
                              isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-blue-700',
                              'h-6 w-6 shrink-0'
                            )}
                            aria-hidden="true"
                          />
                          <span className="flex-1">{item.name}</span>
                          {item.badge && (
                            <span className="ml-auto text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>

              {/* Bottom section */}
              <li className="mt-auto">
                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <BeakerIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Need help?
                      </p>
                      <p className="text-xs text-gray-500">
                        Check our documentation
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
          {/* Mobile header */}
          <div className="flex h-16 shrink-0 items-center justify-between">
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <BeakerIcon className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-lg font-semibold text-gray-900">
                MindMap
              </span>
            </div>
            <button
              type="button"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              onClick={onClose}
            >
              <span className="sr-only">Close sidebar</span>
              <XMarkIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
            </button>
          </div>

          {/* Mobile navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {filteredNavigation.map((item) => {
                    const isActive = pathname === item.href || 
                      (item.href !== '/dashboard' && pathname.startsWith(item.href));
                    
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={cn(
                            isActive
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium'
                          )}
                        >
                          <item.icon
                            className={cn(
                              isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-blue-700',
                              'h-6 w-6 shrink-0'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                          {item.badge && (
                            <span className="ml-auto text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}\n\n// ===== FILE: ./src/components/layout/Footer.tsx =====\n\n
/**
 * Footer component
 */

'use client';

import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div className="text-sm text-gray-500">
            © {currentYear} MindMap. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a
              href="/privacy"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Terms of Service
            </a>
            <a
              href="/help"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              Help
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}\n\n// ===== FILE: ./src/components/layout/Header.tsx =====\n\n
/**
 * Header component with navigation, user menu, and notifications
 */

'use client';

import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { signOut } from 'next-auth/react';
import {
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { cn, getInitials } from '@/lib/utils';
import type { User } from '@/types';

interface HeaderProps {
  user?: Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'role' | 'avatarUrl'>;
  onMenuClick: () => void;
}

export function Header({ user, onMenuClick }: HeaderProps) {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/auth/signin' });
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left section */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset lg:hidden"
              onClick={onMenuClick}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Desktop logo */}
            <div className="hidden lg:flex lg:items-center lg:space-x-4">
              <div className="flex items-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                  <span className="text-sm font-bold text-white">MM</span>
                </div>
                <span className="ml-2 text-lg font-semibold text-gray-900">
                  MindMap
                </span>
              </div>
            </div>
          </div>

          {/* Center section - Search */}
          <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="w-full max-w-lg lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full rounded-md border-0 bg-gray-50 py-1.5 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:ring-inset sm:text-sm sm:leading-6"
                  placeholder="Search..."
                  type="search"
                />
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="ml-4 flex items-center space-x-4">
            {/* Notifications */}
            <button
              type="button"
              className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
              {/* Notification badge */}
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {/* User menu */}
            <Menu as="div" className="relative ml-3">
              <div>
                <Menu.Button className="flex items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  <span className="sr-only">Open user menu</span>
                  {user?.avatarUrl ? (
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={user.avatarUrl}
                      alt={`${user.firstName} ${user.lastName}`}
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
                      {user ? getInitials(`${user.firstName} ${user.lastName}`) : 'U'}
                    </div>
                  )}
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {/* User info */}
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                    <div className="font-medium">
                      {user?.firstName} {user?.lastName}
                    </div>
                    <div className="text-gray-500">{user?.email}</div>
                    <div className="text-xs text-blue-600 capitalize">
                      {user?.role.toLowerCase()}
                    </div>
                  </div>

                  {/* Menu items */}
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/profile"
                        className={cn(
                          active ? 'bg-gray-50' : '',
                          'flex items-center px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        <UserCircleIcon className="mr-3 h-4 w-4" />
                        Your Profile
                      </a>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/settings"
                        className={cn(
                          active ? 'bg-gray-50' : '',
                          'flex items-center px-4 py-2 text-sm text-gray-700'
                        )}
                      >
                        <Cog6ToothIcon className="mr-3 h-4 w-4" />
                        Settings
                      </a>
                    )}
                  </Menu.Item>

                  <div className="border-t border-gray-100">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleSignOut}
                          className={cn(
                            active ? 'bg-gray-50' : '',
                            'flex w-full items-center px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          <ArrowRightOnRectangleIcon className="mr-3 h-4 w-4" />
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
}\n\n// ===== FILE: ./src/components/layout/MainLayout.tsx =====\n\n
/**
 * Main layout component with header, sidebar, and content area
 */

'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        userRole={session?.user?.role}
      />

      {/* Main content area */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Header */}
        <Header
          user={session?.user}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Page content */}
        <main className={cn('flex-1', className)}>
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}