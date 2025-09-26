// src/app/auth/signin/page.tsx

import { SignInForm } from "@/components/auth/SignInForm";

export default function SignInPage() {
  // No session check needed
  return (
    <div className="login-form-container">
      <div className="form_container">
        <div className="app-form">
          <div className="text-center mb-4">
            <h3 className="mb-1">Sign In</h3>
            <p>Enter your email & password to login</p>
          </div>
          <SignInForm />
        </div>
      </div>
    </div>
  );
}