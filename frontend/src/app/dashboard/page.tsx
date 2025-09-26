// src/app/dashboard/page.tsx

import { MainLayout } from "@/components/layout/MainLayout";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { UserRole } from "@/types";

// A mock user object to populate the UI while authentication is disabled.
const mockUser = {
  id: 'mock-user-123',
  firstName: 'Laura',
  lastName: 'Monaldo',
  email: 'lauradesign@example.com',
  role: UserRole.ADMIN, // Set to ADMIN to show all sidebar links
  avatarUrl: '/woman.jpg', // Make sure this image exists in your /public/avtar/ folder
};

export default function DashboardPage() {
  // We no longer need to check for a session here.
  // We pass the mock user directly to the components.
  return (
    <MainLayout>
      <DashboardContent user={mockUser} />
    </MainLayout>
  );
}