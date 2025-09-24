import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { print } from 'graphql';
import { CREATE_USER_ACCOUNT } from '@/lib/auth/queries';

/**
 * Performs a server-side GraphQL request to Hasura using the admin secret.
 * This is a secure way to perform privileged operations like user creation.
 */
const hasuraAdminRequest = async (query: string, variables: Record<string, any>) => {
  const response = await fetch(process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hasura-Admin-Secret': process.env.HASURA_ADMIN_SECRET!,
    },
    body: JSON.stringify({ query, variables }),
  });

  const result = await response.json();

  if (!response.ok || result.errors) {
    console.error('Hasura Admin Request Failed:', result.errors);
    const errorMessage = result.errors?.[0]?.message || 'An unexpected error occurred.';
    // Check for unique constraint violation for a user-friendly error
    if (errorMessage.includes('Uniqueness violation')) {
        return { success: false, message: 'An account with this email already exists.' };
    }
    return { success: false, message: errorMessage };
  }

  return { success: true, data: result.data };
};

/**
 * API handler for user registration.
 */
export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password, role } = await request.json();

    // --- Server-Side Validation ---
    if (!firstName || !lastName || !email || !password || !role) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ message: 'Password must be at least 8 characters long.' }, { status: 400 });
    }
    if (!['STUDENT', 'INSTRUCTOR'].includes(role)) {
      return NextResponse.json({ message: 'Invalid user role specified.' }, { status: 400 });
    }

    // --- Secure Password Hashing ---
    const passwordHash = await bcrypt.hash(password, 10);

    // --- Create User via Hasura Mutation ---
    const { success, data, message } = await hasuraAdminRequest(print(CREATE_USER_ACCOUNT), {
      object: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password_hash: passwordHash,
        role: role,
        is_active: true,
        email_verified: false, // Set to true if you have an email verification flow
      },
    });

    if (!success) {
      const status = message?.includes('already exists') ? 409 : 500; // 409 Conflict for duplicates
      return NextResponse.json({ message: message || 'Failed to create user account.' }, { status });
    }

    // --- Return Success Response ---
    return NextResponse.json(data.insert_users_one, { status: 201 });

  } catch (error) {
    console.error('[API_REGISTER_ERROR]', error);
    return NextResponse.json({ message: 'An internal server error occurred.' }, { status: 500 });
  }
}