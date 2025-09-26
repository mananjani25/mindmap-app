// src/components/layout/Sidebar.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import {
  FileText, Cloud, BarChart3, Users, GraduationCap, Settings, LogOut, X, Map, Home
} from 'lucide-react';
import type { UserRole } from '@/types';
import { cn, getInitials } from '@/lib/utils';

// --- YOUR NAVIGATION STRUCTURE IS PRESERVED ---
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: UserRole;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: Home, roles: ['ADMIN', 'INSTRUCTOR', 'STUDENT'] },
  { name: 'Tests', href: '/tests', icon: FileText, roles: ['ADMIN', 'INSTRUCTOR', 'STUDENT'] },
  { name: 'Documents', href: '/documents', icon: Cloud, roles: ['ADMIN', 'INSTRUCTOR'] },
  { name: 'Mind Maps', href: '/mindmaps', icon: Map, roles: ['ADMIN', 'INSTRUCTOR'] },
  { name: 'Results', href: '/results', icon: BarChart3, roles: ['ADMIN', 'INSTRUCTOR'] },
  { name: 'Students', href: '/students', icon: GraduationCap, roles: ['ADMIN', 'INSTRUCTOR'] },
  { name: 'Users', href: '/users', icon: Users, roles: ['ADMIN'] },
  { name: 'Settings', href: '/settings', icon: Settings, roles: ['ADMIN', 'INSTRUCTOR', 'STUDENT'] },
];
// --- END OF YOUR STRUCTURE ---

const NavLinks = ({ userRole, onClose }: { userRole?: UserRole, onClose: () => void }) => {
  const pathname = usePathname();
  const filteredNavigation = navigation.filter((item) => userRole ? item.roles.includes(userRole) : true);

  return (
    <ul className="flex-1 flex flex-col gap-y-1 px-4 ">
      {filteredNavigation.map((item) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
        return (
          <li key={item.name}>
            <Link
              href={item.href}
              onClick={onClose}
              className={cn(
                isActive ? 'bg-[#50C9DA] text-white' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                'group flex items-center gap-x-3 rounded-xl p-2 text-sm font-medium leading-6'
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>{item.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export function Sidebar({ isOpen, onClose, userRole }: SidebarProps) {
    const { data: session } = useSession();
    const user = session?.user;

  return (
    <>
      {/* --- Desktop Sidebar --- */}
      <nav className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60 lg:flex-col rounded-xl m-1 overflow-hidden">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-surface border-r border-border pb-4">
          <div className="flex h-16 shrink-0 items-center px-6">
            <h1 className="text-2xl font-bold text-[#50C9DA]">MindMap</h1>
          </div>
          <nav className="flex flex-1 flex-col">
            <NavLinks userRole={userRole} onClose={() => {}} />

            {/* Profile section at the bottom */}
            <div className="mt-auto px-4">
              <div className="flex items-center gap-x-3 p-2">
                 <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm font-medium text-white">
                    {user ? getInitials(`${user.firstName} ${user.lastName}`) : 'N'}
                  </div>
              </div>
            </div>
          </nav>
        </div>
      </nav>

      {/* --- Mobile Sidebar (Drawer) --- */}
      <div className={cn('fixed inset-y-0 left-0 z-50 w-60 transform bg-surface shadow-xl transition-transform duration-300 ease-in-out lg:hidden rounded-xl overflow-hidden', isOpen ? 'translate-x-0' : '-translate-x-full')}>
        <div className="flex grow flex-col gap-y-5 overflow-y-auto pb-4">
            <div className="flex h-16 shrink-0 items-center justify-between px-6">
                <h1 className="text-2xl font-bold text-slate-800">MindMap</h1>
                <button type="button" className="-m-2.5 p-2.5" onClick={onClose}>
                    <span className="sr-only">Close sidebar</span>
                    <X className="h-6 w-6 text-slate-800" />
                </button>
            </div>
            <nav className="flex flex-1 flex-col">
                <NavLinks userRole={userRole} onClose={onClose} />
                <div className="mt-auto px-4">
                  <div className="flex items-center gap-x-3 p-2">
                     <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-sm font-medium text-white">
                        {user ? getInitials(`${user.firstName} ${user.lastName}`) : 'N'}
                      </div>
                  </div>
                </div>
            </nav>
        </div>
      </div>
    </>
  );
}