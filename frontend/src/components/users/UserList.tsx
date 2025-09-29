'use client';
import React from 'react';
import { UserCircle, EnvelopeSimple, Briefcase, Users, User, DotsThreeOutline, BookOpen, Crown, Student as StudentIcon } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface UserInfoCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: 'primary' | 'secondary' | 'success' | 'warning' | 'accent';
}

const UserInfoCard = ({ title, value, icon: Icon, color }: UserInfoCardProps) => (
  <div className="card p-4 rounded-xl shadow-sm flex items-center gap-4">
    <span className={cn('h-12 w-12 flex items-center justify-center rounded-xl text-xl', {
      'bg-[#50C9DA]/10 text-[#50C9DA]': color === 'primary',
      'bg-secondary/10 text-secondary': color === 'secondary',
      'bg-success/10 text-success': color === 'success',
      'bg-warning/10 text-warning': color === 'warning',
      'bg-[#AFCC35]/10 text-[#AFCC35]': color === 'accent'
    })}>
      <Icon weight="bold" />
    </span>
    <div>
      <p className="text-sm text-font-light mb-0">{title}</p>
      <h5 className="font-bold text-xl text-font-title">{value}</h5>
    </div>
  </div>
);

interface DetailedUserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
  };
}

const DetailedUserCard = ({ user }: DetailedUserCardProps) => (
  <div className="card p-4 flex items-center justify-between rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center gap-3">
      <div className={cn('w-10 h-10 flex items-center justify-center rounded-xl bg-gray-100 text-gray-500', {
        'bg-[#AFCC35]/10 text-[#AFCC35]': user.role === 'Admin',
        'bg-[#50C9DA]/10 text-[#50C9DA]': user.role === 'Instructor',
        'bg-blue-100 text-blue-700': user.role === 'Student',
      })}>
        {user.role === 'Admin' && <Crown size={24} />}
        {user.role === 'Instructor' && <BookOpen size={24} />}
        {user.role === 'Student' && <StudentIcon size={24} />}
      </div>
      <div>
        <h6 className="font-bold text-sm text-font-title">{user.name}</h6>
        <p className="text-font-light text-xs flex items-center mb-0">
          <EnvelopeSimple size={14} className="mr-1" />
          {user.email}
        </p>
      </div>
    </div>
    <div className="flex flex-col items-end">
      <span className={cn('px-2 py-0.5 text-xs rounded-xl font-bold', {
        'bg-success/10 text-success': user.status === 'Active',
        'bg-[#50C9DA]/10 text-[#50C9DA]': user.status === 'Inactive',
        'bg-warning/10 text-warning': user.status === 'Pending',
      })}>
        {user.status}
      </span>
      <p className="text-font-light text-xs mt-1">Role: <span className="text-[#AFCC35] font-medium">{user.role}</span></p>
    </div>
  </div>
);

const UserList = () => {
  const dummyUsers = [
    {
      id: 'U001',
      name: 'Admin User One',
      email: 'admin1@example.com',
      role: 'Admin',
      status: 'Active',
    },
    {
      id: 'U002',
      name: 'Instructor Alpha',
      email: 'instructorA@example.com',
      role: 'Instructor',
      status: 'Active',
    },
    {
      id: 'U003',
      name: 'Student Beta',
      email: 'studentB@example.com',
      role: 'Student',
      status: 'Active',
    },
    {
      id: 'U004',
      name: 'Admin User Two',
      email: 'admin2@example.com',
      role: 'Admin',
      status: 'Inactive',
    },
    {
      id: 'U005',
      name: 'Instructor Gamma',
      email: 'instructorG@example.com',
      role: 'Instructor',
      status: 'Pending',
    },
    {
      id: 'U006',
      name: 'Student Delta',
      email: 'studentD@example.com',
      role: 'Student',
      status: 'Active',
    },
    {
      id: 'U007',
      name: 'Admin User Three',
      email: 'admin3@example.com',
      role: 'Admin',
      status: 'Active',
    },
    {
      id: 'U008',
      name: 'Instructor Epsilon',
      email: 'instructorE@example.com',
      role: 'Instructor',
      status: 'Active',
    },
    {
      id: 'U009',
      name: 'Student Zeta',
      email: 'studentZ@example.com',
      role: 'Student',
      status: 'Inactive',
    },
    {
      id: 'U010',
      name: 'Admin User Four',
      email: 'admin4@example.com',
      role: 'Admin',
      status: 'Pending',
    },
  ];

  const totalUsers = dummyUsers.length;
  const activeUsers = dummyUsers.filter(u => u.status === 'Active').length;
  const admins = dummyUsers.filter(u => u.role === 'Admin').length;
  const instructors = dummyUsers.filter(u => u.role === 'Instructor').length;
  const students = dummyUsers.filter(u => u.role === 'Student').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        <UserInfoCard
          title="Total Users"
          value={totalUsers}
          icon={Users}
          color="primary"
        />
        <UserInfoCard
          title="Active Users"
          value={activeUsers}
          icon={User}
          color="success"
        />
        <UserInfoCard
          title="Admins"
          value={admins}
          icon={Briefcase}
          color="secondary"
        />
        <UserInfoCard
          title="Instructors"
          value={instructors}
          icon={BookOpen}
          color="accent"
        />
      </div>

      <div className="card p-6">
        <h5 className="font-bold text-xl mb-4">All Users</h5>
        <div className="space-y-4">
          {dummyUsers.map((user) => (
            <DetailedUserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
