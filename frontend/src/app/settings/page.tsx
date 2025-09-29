import React from 'react';
import SettingsContent from '@/components/settings/SettingsContent';
import { MainLayout } from "@/components/layout/MainLayout";
import { UserRole } from "@/types";

const mockUser = {
  id: 'mock-user-505',
  firstName: 'Settings',
  lastName: 'Admin',
  email: 'settingsadmin@example.com',
  role: UserRole.ADMIN, // Set to ADMIN to show all sidebar links
  avatarUrl: '/user-placeholder.jpg', // Make sure this image exists in your /public/avtar/ folder
};

const SettingsPage = () => {
  return (
    <MainLayout>
      <SettingsContent />
    </MainLayout>
  );
};

export default SettingsPage;
