// src/app/auth/signup/page.tsx

import { SignUpForm } from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="login-form-container">
       <div className="form_container">
        <div className="app-form">
          <div className="text-center mb-4">
            <h3 className="mb-1">Create your Account</h3>
            <p>Fill out the form to get started.</p>
          </div>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}