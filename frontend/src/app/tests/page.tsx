import React from 'react';
import TestList from '@/components/tests/TestList';
import { MainLayout } from "@/components/layout/MainLayout";
import { UserRole } from "@/types";

const mockUser = {
  id: 'mock-user-456',
  firstName: 'Test',
  lastName: 'User',
  email: 'testuser@example.com',
  role: UserRole.ADMIN, // Set to ADMIN to show all sidebar links
  avatarUrl: '/user-placeholder.jpg', // Make sure this image exists in your /public/avtar/ folder
};

const TestsPage = () => {
  return (
    <MainLayout>
      <TestList />
    </MainLayout>
  );
};

export default TestsPage;
