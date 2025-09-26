// src/components/auth/SignInForm.tsx

'use client';

import React from 'react';
import Link from 'next/link';

export function SignInForm() {
  // Simplified for UI display since auth is off
  const handleSubmit = (e: React.FormEvent) => e.preventDefault();

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-dark">
            Email address
          </label>
          <input
            id="email" name="email" type="email"
            className="mt-1 block w-full rounded-md border-border p-2 focus:border-primary focus:ring-primary/20"
            placeholder="Enter your email"
            defaultValue="test@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-dark">
            Password
          </label>
          <input
            id="password" name="password" type="password"
            className="mt-1 block w-full rounded-md border-border p-2 focus:border-primary focus:ring-primary/20"
            placeholder="Enter your password"
            defaultValue="password"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input id="remember" name="remember" type="checkbox" className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20" />
            <label htmlFor="remember" className="ml-2 block text-sm text-dark">Remember me</label>
          </div>
          <div className="text-sm">
            <Link href="#" className="font-medium text-primary hover:text-primary/80">Forgot your password?</Link>
          </div>
        </div>
      </div>
      <div>
        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90">
          Sign in
        </button>
      </div>
      <div className="text-center">
        <p className="text-sm text-secondary">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="font-medium text-primary hover:text-primary/80">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
}