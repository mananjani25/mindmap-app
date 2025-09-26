import React from 'react';
import StudentList from '@/components/students/StudentList';
import { MainLayout } from "@/components/layout/MainLayout";
import { UserRole } from "@/types";

const mockUser = {
  id: 'mock-user-303',
  firstName: 'Student',
  lastName: 'Admin',
  email: 'studentadmin@example.com',
  role: UserRole.ADMIN, // Set to ADMIN to show all sidebar links
  avatarUrl: '/user-placeholder.jpg', // Make sure this image exists in your /public/avtar/ folder
};

const StudentsPage = () => {
  return (
    <MainLayout>
      <StudentList />
    </MainLayout>
  );
};

export default StudentsPage;
