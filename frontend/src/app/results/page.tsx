import React from 'react';
import ResultsDisplay from '@/components/results/ResultsDisplay';
import { MainLayout } from "@/components/layout/MainLayout";
import { UserRole } from "@/types";

const mockUser = {
  id: 'mock-user-202',
  firstName: 'Result',
  lastName: 'Viewer',
  email: 'resultviewer@example.com',
  role: UserRole.ADMIN, // Set to ADMIN to show all sidebar links
  avatarUrl: '/user-placeholder.jpg', // Make sure this image exists in your /public/avtar/ folder
};

const ResultsPage = () => {
  return (
    <MainLayout>
      <ResultsDisplay />
    </MainLayout>
  );
};

export default ResultsPage;
