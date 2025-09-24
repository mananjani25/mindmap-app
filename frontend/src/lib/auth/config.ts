/**
 * NextAuth configuration for authentication with Hasura integration
 */

import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Use ES6 import for consistency
import { print } from 'graphql'; // Use print to safely convert GraphQL AST to string
import { GET_USER_BY_EMAIL, UPDATE_USER_LAST_LOGIN } from './queries';
import { User as AppUser } from '@/types';

// Type declarations remain the same...
declare module 'next-auth' {
  interface User extends AppUser {}

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


/**
 * Helper function to perform server-side GraphQL requests to Hasura using the admin secret.
 * This is used during the authorization flow, which happens server-side.
 */
const hasuraServerRequest = async (query: string, variables: Record<string, any>) => {
  const response = await fetch(process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Admin-Secret': process.env.HASURA_ADMIN_SECRET!,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    console.error('Hasura request failed:', response.statusText);
    throw new Error('Failed to connect to authentication service.');
  }

  const result = await response.json();
  if (result.errors) {
    console.error('Hasura GraphQL errors:', result.errors);
    throw new Error(result.errors[0].message || 'An error occurred during authentication.');
  }

  return result.data;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        try {
          // Use the server-side helper to query Hasura with the printed GraphQL query
          const data = await hasuraServerRequest(print(GET_USER_BY_EMAIL), {
            email: credentials.email,
          });

          const user = data?.users?.[0];

          if (!user) {
            throw new Error('No user found with this email.');
          }

          if (!user.is_active) {
            throw new Error('This account has been deactivated.');
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password_hash
          );

          if (!isPasswordValid) {
            throw new Error('The password you entered is incorrect.');
          }

          // Update last login (fire-and-forget is acceptable here)
          hasuraServerRequest(print(UPDATE_USER_LAST_LOGIN), {
            id: user.id,
            last_login: new Date().toISOString(),
          }).catch(err => console.error("Failed to update last login:", err));

          return {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            role: user.role,
            avatarUrl: user.avatar_url,
            emailVerified: user.email_verified,
            isActive: user.is_active,
            createdAt: user.created_at,
            updatedAt: user.updated_at,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          // Re-throw the error message to be displayed on the sign-in form
          throw new Error(error instanceof Error ? error.message : 'An unknown error occurred.');
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
    error: '/auth/signin', // Redirect to signin page on error, displaying the error
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.avatarUrl = user.avatarUrl;
        
        token.accessToken = generateHasuraJWT({
          userId: user.id,
          role: user.role,
        });
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

  debug: process.env.NODE_ENV === 'development',
};

/**
 * Generates a Hasura-compatible JWT.
 * Best Practice: Use a dedicated, strong secret for Hasura JWTs,
 * stored in an environment variable like HASURA_JWT_SECRET.
 */
function generateHasuraJWT(payload: { userId: string; role: string }) {
  const secret = process.env.HASURA_JWT_SECRET || process.env.NEXTAUTH_SECRET!;
  if (!secret) {
      throw new Error('JWT secret is not configured. Please set HASURA_JWT_SECRET or NEXTAUTH_SECRET.');
  }

  const hasuraPayload = {
    'sub': payload.userId,
    'iat': Math.floor(Date.now() / 1000),
    'exp': Math.floor(Date.now() / 1000) + (8 * 24 * 60 * 60), // 8 days
    'https://hasura.io/jwt/claims': {
      'x-hasura-allowed-roles': [payload.role, 'STUDENT', 'INSTRUCTOR'], // List all possible roles
      'x-hasura-default-role': payload.role,
      'x-hasura-user-id': payload.userId,
    },
  };

  return jwt.sign(hasuraPayload, secret, { algorithm: 'HS256' });
}