'use client';

import React from 'react';
import type { UserRole } from '@/types';

interface DashboardContentProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    firstName?: string;
    lastName?: string;
    role?: UserRole;
  };
}

export function DashboardContent({ user }: DashboardContentProps) {
  const welcomeMessage = `Welcome back, ${user.firstName || user.name || 'User'}!`;
  const roleDescription = user.role 
    ? `You are logged in as a ${user.role.toLowerCase()}.` 
    : 'Welcome to your dashboard.';

  return (
    <div className="space-y-8">
      <header className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          Dashboard
        </h1>
        <p className="mt-2 text-md text-gray-600">
          {welcomeMessage}
        </p>
      </header>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Your Account Status
        </h2>
        <p className="mt-3 text-gray-600">
          {roleDescription} This is your central hub for managing tests, documents, and AI-generated mind maps.
        </p>
        <div className="mt-6 border-t border-gray-200 pt-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Full Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{user.firstName} {user.lastName}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Email address</dt>
              <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
            </div>
             <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Role</dt>
              <dd className="mt-1 text-sm text-gray-900 capitalize">{user.role?.toLowerCase()}</dd>
            </div>
             <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm font-bold text-green-600">Active</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}