/**
 * Professional landing page for unauthenticated users.
 */
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon, BeakerIcon, LightBulbIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export function WelcomePage() {
  return (
    <div className="bg-gray-50">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center">
              <span className="sr-only">MindMap</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                  <BeakerIcon className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-lg font-semibold text-gray-900">MindMap</span>
            </a>
          </div>
          <div className="flex flex-1 justify-end">
            <Link 
              href="/auth/signin" 
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-700"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      </header>

      <main className="relative isolate min-h-screen px-6 pt-14 lg:px-8">
        <div 
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" 
          aria-hidden="true"
        >
          <div 
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#80d4ff] to-[#3b82f6] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" 
            style={{
              clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
            }} 
          />
        </div>
        
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Unlock Knowledge, Visualize Success
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our AI-powered platform transforms complex documents into clear, interactive mind maps and generates insightful tests, helping you learn faster and teach better.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/auth/signup"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Get started for free
              </Link>
              <a href="#features" className="text-sm font-semibold leading-6 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <section id="features" className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">World-Class Features</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to accelerate learning
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <DocumentTextIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  Automated Test Generation
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Upload any document (PDF, DOCX) and our AI will create comprehensive multiple-choice tests in seconds, saving instructors hours of manual work.
                </dd>
              </div>
              <div className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                    <LightBulbIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  AI Mind-Map Generation
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">
                  Transform dense text into intuitive, hierarchical mind maps. Visualize key concepts, understand relationships, and grasp complex topics with ease.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}