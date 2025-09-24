/**
 * Sidebar navigation component with role-based menu items
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  UsersIcon,
  ChartBarIcon,
  CogIcon,
  XMarkIcon,
  BeakerIcon,
  CloudArrowUpIcon,
  MapIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/types';

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
  badge?: string;
}

const navigation: NavItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: HomeIcon,
    roles: ['ADMIN', 'INSTRUCTOR', 'STUDENT'],
  },
  {
    name: 'Tests',
    href: '/tests',
    icon: DocumentTextIcon,
    roles: ['ADMIN', 'INSTRUCTOR', 'STUDENT'],
  },
  {
    name: 'Documents',
    href: '/documents',
    icon: CloudArrowUpIcon,
    roles: ['ADMIN', 'INSTRUCTOR'],
  },
  {
    name: 'Mind Maps',
    href: '/mindmaps',
    icon: MapIcon,
    roles: ['ADMIN', 'INSTRUCTOR'],
  },
  {
    name: 'Results',
    href: '/results',
    icon: ChartBarIcon,
    roles: ['ADMIN', 'INSTRUCTOR'],
  },
  {
    name: 'Students',
    href: '/students',
    icon: AcademicCapIcon,
    roles: ['ADMIN', 'INSTRUCTOR'],
  },
  {
    name: 'Users',
    href: '/users',
    icon: UsersIcon,
    roles: ['ADMIN'],
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: CogIcon,
    roles: ['ADMIN', 'INSTRUCTOR', 'STUDENT'],
  },
];

export function Sidebar({ isOpen, onClose, userRole }: SidebarProps) {
  const pathname = usePathname();

  const filteredNavigation = navigation.filter((item) =>
    userRole ? item.roles.includes(userRole) : true
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 shadow-sm border-r border-gray-200">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center">
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <BeakerIcon className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-lg font-semibold text-gray-900">
                MindMap
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {filteredNavigation.map((item) => {
                    const isActive = pathname === item.href || 
                      (item.href !== '/dashboard' && pathname.startsWith(item.href));
                    
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={cn(
                            isActive
                              ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                              : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-l-md p-2 text-sm leading-6 font-medium'
                          )}
                        >
                          <item.icon
                            className={cn(
                              isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-blue-700',
                              'h-6 w-6 shrink-0'
                            )}
                            aria-hidden="true"
                          />
                          <span className="flex-1">{item.name}</span>
                          {item.badge && (
                            <span className="ml-auto text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>

              {/* Bottom section */}
              <li className="mt-auto">
                <div className="rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <BeakerIcon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Need help?
                      </p>
                      <p className="text-xs text-gray-500">
                        Check our documentation
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
          {/* Mobile header */}
          <div className="flex h-16 shrink-0 items-center justify-between">
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <BeakerIcon className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-lg font-semibold text-gray-900">
                MindMap
              </span>
            </div>
            <button
              type="button"
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
              onClick={onClose}
            >
              <span className="sr-only">Close sidebar</span>
              <XMarkIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
            </button>
          </div>

          {/* Mobile navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {filteredNavigation.map((item) => {
                    const isActive = pathname === item.href || 
                      (item.href !== '/dashboard' && pathname.startsWith(item.href));
                    
                    return (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className={cn(
                            isActive
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium'
                          )}
                        >
                          <item.icon
                            className={cn(
                              isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-blue-700',
                              'h-6 w-6 shrink-0'
                            )}
                            aria-hidden="true"
                          />
                          {item.name}
                          {item.badge && (
                            <span className="ml-auto text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}