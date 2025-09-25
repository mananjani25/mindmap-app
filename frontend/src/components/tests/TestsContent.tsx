'use client';

import React from 'react';
import type { UserRole } from '@/types';

interface TestsContentProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    firstName?: string;
    lastName?: string;
    role?: UserRole;
  };
}

export function TestsContent({ user }: TestsContentProps) {
  return (
    <div className="space-y-8">
      <header className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          Tests
        </h1>
        <p className="mt-2 text-md text-gray-600">
          Manage and take tests, quizzes, and assessments.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              {user.role === 'STUDENT' ? 'Available Tests' : 'Test Management'}
            </h2>

            {user.role === 'STUDENT' ? (
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <h3 className="font-medium text-gray-900">AI Fundamentals Quiz</h3>
                  <p className="text-sm text-gray-600 mt-1">Test your understanding of AI basics and concepts</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm text-blue-600">Duration: 30 minutes</span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                      Start Test
                    </button>
                  </div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <h3 className="font-medium text-gray-900">Machine Learning Concepts</h3>
                  <p className="text-sm text-gray-600 mt-1">Assessment on ML algorithms and techniques</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm text-green-600">Completed (85%)</span>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium">
                      View Results
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-gray-600">Create and manage tests for your students</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                    Create New Test
                  </button>
                </div>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Test Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Students
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          AI Fundamentals Quiz
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          24 enrolled
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                          <button className="text-green-600 hover:text-green-900">Results</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Test Statistics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tests Taken</span>
                  <span className="font-medium text-gray-900">
                    {user.role === 'STUDENT' ? '8' : '12 Active'}
                  </span>
                </div>
                <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Average Score</span>
                  <span className="font-medium text-gray-900">
                    {user.role === 'STUDENT' ? '87%' : '82%'}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Completion Rate</span>
                  <span className="font-medium text-gray-900">92%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}