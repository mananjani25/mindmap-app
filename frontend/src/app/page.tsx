// src/app/page.tsx

import { redirect } from "next/navigation";

/**
 * The root page now serves as a permanent redirect to the dashboard,
 * since authentication is currently disabled for UI development.
 */
export default function HomePage() {
  redirect('/dashboard');
}