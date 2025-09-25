'use client';

import React from 'react';
import type { UserRole } from '@/types';

interface SettingsContentProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    firstName?: string;
    lastName?: string;
    role?: UserRole;
  };
}

export function SettingsContent({ user }: SettingsContentProps) {
  return (
    <div className="space-y-8">
      <header className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          Settings
        </h1>
        <p className="mt-2 text-md text-gray-600">
          Manage your account preferences and application settings.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            <a href="#account" className="bg-blue-50 border-blue-500 text-blue-700 group border-l-4 px-3 py-2 flex items-center text-sm font-medium">
              Account Settings
            </a>
            <a href="#notifications" className="border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900 group border-l-4 px-3 py-2 flex items-center text-sm font-medium">
              Notifications
            </a>
            <a href="#privacy" className="border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900 group border-l-4 px-3 py-2 flex items-center text-sm font-medium">
              Privacy & Security
            </a>
            <a href="#preferences" className="border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900 group border-l-4 px-3 py-2 flex items-center text-sm font-medium">
              Preferences
            </a>
          </nav>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div id="account" className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={user.firstName || ''}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={user.lastName || ''}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email || ''}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Account Type
                  </label>
                  <input
                    type="text"
                    value={user.role || ''}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div id="notifications" className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Notification Preferences</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive notifications about your account activity</p>
                  </div>
                  <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Mind Map Updates</h3>
                    <p className="text-sm text-gray-500">Get notified when AI generates new mind maps</p>
                  </div>
                  <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Weekly Summary</h3>
                    <p className="text-sm text-gray-500">Receive weekly activity summaries</p>
                  </div>
                  <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                </div>
              </div>
            </div>

            <div id="privacy" className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Privacy & Security</h2>
              <div className="space-y-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                  Change Password
                </button>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                    Enable
                  </button>
                </div>
              </div>
            </div>

            <div id="preferences">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Application Preferences</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Mind Map Style
                  </label>
                  <select className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                    <option>Hierarchical</option>
                    <option>Radial</option>
                    <option>Flow Chart</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Auto-save Documents</h3>
                    <p className="text-sm text-gray-500">Automatically save changes as you work</p>
                  </div>
                  <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" defaultChecked />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium mr-3">
                Save Changes
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}