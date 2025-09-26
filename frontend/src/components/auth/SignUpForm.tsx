// src/components/auth/SignUpForm.tsx

'use client';

import React from 'react';
import Link from 'next/link';

export function SignUpForm() {
  const handleSubmit = (e: React.FormEvent) => e.preventDefault();
  
  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-dark">First Name</label>
          <input id="firstName" name="firstName" type="text" required className="mt-1 block w-full rounded-md border-border p-2"/>
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-dark">Last Name</label>
          <input id="lastName" name="lastName" type="text" required className="mt-1 block w-full rounded-md border-border p-2"/>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="email" className="block text-sm font-medium text-dark">Email</label>
          <input id="email" name="email" type="email" required className="mt-1 block w-full rounded-md border-border p-2"/>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="password" className="block text-sm font-medium text-dark">Password</label>
          <input id="password" name="password" type="password" required className="mt-1 block w-full rounded-md border-border p-2"/>
        </div>
      </div>
      <div>
        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90">
          Sign Up
        </button>
      </div>
      <div className="text-center">
        <p className="text-sm text-secondary">
          Already have an account?{' '}
          <Link href="/auth/signin" className="font-medium text-primary hover:text-primary/80">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
}