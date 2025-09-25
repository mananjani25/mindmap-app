'use client';

import React from 'react';
import type { UserRole } from '@/types';

interface ProfileContentProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    firstName?: string;
    lastName?: string;
    role?: UserRole;
    avatarUrl?: string;
  };
}

export function ProfileContent({ user }: ProfileContentProps) {
  return (
    <div className="space-y-8">
      <header className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          Profile
        </h1>
        <p className="mt-2 text-md text-gray-600">
          Manage your account information and preferences.
        </p>
      </header>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="flex items-center space-x-6 mb-6">
          <div className="flex-shrink-0">
            {user.avatarUrl ? (
              <img
                className="h-20 w-20 rounded-full object-cover"
                src={user.avatarUrl}
                alt={`${user.firstName} ${user.lastName}`}
              />
            ) : (
              <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-500">
                  {user.firstName?.[0]?.toUpperCase()}{user.lastName?.[0]?.toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-lg text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500 capitalize">
              {user.role?.toLowerCase()} Account
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Account Information
          </h3>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">User ID</dt>
              <dd className="mt-1 text-sm text-gray-900 font-mono">{user.id}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">First Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{user.firstName}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Last Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{user.lastName}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Email Address</dt>
              <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Account Type</dt>
              <dd className="mt-1 text-sm text-gray-900 capitalize">{user.role?.toLowerCase()}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm font-bold text-green-600">Active</dd>
            </div>
          </dl>
        </div>

        <div className="border-t border-gray-200 pt-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Profile Actions
          </h3>
          <div className="flex flex-wrap gap-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Edit Profile
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Change Password
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Privacy Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}