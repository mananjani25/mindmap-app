import React from 'react';
import DocumentList from '@/components/documents/DocumentList';
import { MainLayout } from "@/components/layout/MainLayout";
import { UserRole } from "@/types";

const mockUser = {
  id: 'mock-user-789',
  firstName: 'Doc',
  lastName: 'Reader',
  email: 'docreader@example.com',
  role: UserRole.ADMIN, // Set to ADMIN to show all sidebar links
  avatarUrl: '/user-placeholder.jpg', // Make sure this image exists in your /public/avtar/ folder
};

const DocumentsPage = () => {
  return (
    <MainLayout>
      <DocumentList />
    </MainLayout>
  );
};

export default DocumentsPage;
