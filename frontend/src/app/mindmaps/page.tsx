import React from 'react';
import MindMapList from '@/components/mindmaps/MindMapList';
import { MainLayout } from "@/components/layout/MainLayout";
import { UserRole } from "@/types";

const mockUser = {
  id: 'mock-user-101',
  firstName: 'Mind',
  lastName: 'Mapper',
  email: 'mindmapper@example.com',
  role: UserRole.ADMIN, // Set to ADMIN to show all sidebar links
  avatarUrl: '/user-placeholder.jpg', // Make sure this image exists in your /public/avtar/ folder
};

const MindMapsPage = () => {
  return (
    <MainLayout>
      <MindMapList />
    </MainLayout>
  );
};

export default MindMapsPage;
