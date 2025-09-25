'use client';

import React from 'react';
import type { UserRole } from '@/types';

interface MindmapsContentProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    firstName?: string;
    lastName?: string;
    role?: UserRole;
  };
}

export function MindmapsContent({ user }: MindmapsContentProps) {
  return (
    <div className="space-y-8">
      <header className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
          Mind Maps
        </h1>
        <p className="mt-2 text-md text-gray-600">
          AI-generated mind maps from your documents and content.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Generated Mind Maps</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Generate New Map
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <svg className="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900">AI Fundamentals</h3>
                <p className="text-sm text-gray-600 mt-1">From: AI_Research_Paper.pdf</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Complete</span>
                  <div className="space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                    <button className="text-gray-600 hover:text-gray-800 text-sm">Edit</button>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  <svg className="h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900">Machine Learning</h3>
                <p className="text-sm text-gray-600 mt-1">From: Course_Materials.docx</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">Processing</span>
                  <div className="space-x-2">
                    <button className="text-gray-400 text-sm" disabled>View</button>
                    <button className="text-gray-400 text-sm" disabled>Edit</button>
                  </div>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center min-h-64">
                <svg className="h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <h3 className="font-medium text-gray-900 mb-2">Create New Mind Map</h3>
                <p className="text-sm text-gray-600 mb-4">Upload a document or create from scratch</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                  Get Started
                </button>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Mind Map Library</h3>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Source
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
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
                        AI Fundamentals
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">AI_Research_Paper.pdf</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 days ago</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Complete
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">View</button>
                        <button className="text-green-600 hover:text-green-900 mr-4">Export</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Mind Map Stats</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Maps</span>
                  <span className="font-medium text-gray-900">24</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Generated This Week</span>
                  <span className="font-medium text-gray-900">3</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Processing</span>
                  <span className="font-medium text-gray-900">1</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-lg p-6 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Export Options</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                Export as PNG
              </button>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium">
                Export as SVG
              </button>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium">
                Export as PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}