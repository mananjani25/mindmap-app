import React from 'react';
import UserList from '@/components/users/UserList';
import { MainLayout } from "@/components/layout/MainLayout";
import { UserRole } from "@/types";

const mockUser = {
  id: 'mock-user-404',
  firstName: 'User',
  lastName: 'Manager',
  email: 'usermanager@example.com',
  role: UserRole.ADMIN, // Set to ADMIN to show all sidebar links
  avatarUrl: '/user-placeholder.jpg', // Make sure this image exists in your /public/avtar/ folder
};

const UsersPage = () => {
  return (
    <MainLayout>
      <UserList />
    </MainLayout>
  );
};

export default UsersPage;
