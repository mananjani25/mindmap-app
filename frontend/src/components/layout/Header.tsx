// src/components/layout/Header.tsx

'use client';

import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { signOut } from 'next-auth/react';
import {
  MagnifyingGlassIcon,
  BellIcon,
  UserCircleIcon,
  GearIcon,
  SignOutIcon,
  SquaresFourIcon,
} from '@phosphor-icons/react';
import type { User } from '@/types';
import { cn, getInitials } from '@/lib/utils';

// --- YOUR EXISTING PROPS ARE PRESERVED ---
interface HeaderProps {
  user?: Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'role' | 'avatarUrl'>;
  onMenuClick: () => void;
}

export function Header({ user, onMenuClick }: HeaderProps) {
  // --- YOUR EXISTING LOGIC IS PRESERVED ---
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/auth/signin' });
  };

  return (
    <header className="header-main m-1 rounded-xl overflow-hidden">
      <div className="container-fluid ">
        <div className="flex p-2 items-center justify-between">
          {/* --- Left section: Mobile menu button --- */}
          <div className="flex items-center p-0 header-left">
            <button
              type="button"
              className="header-toggle me-3 inline-flex items-center justify-center rounded-xl bg-[#50C9DA]/10 p-2 text-[#50C9DA] lg:hidden"
              onClick={onMenuClick}
            >
              <span className="sr-only">Open main menu</span>
              <SquaresFourIcon size={24} />
            </button>
          </div>

          {/* --- Right section: Icons and user menu --- */}
          <div className="flex items-center justify-end p-0 header-right">
            <ul className="flex items-center gap-x-3">
              {/* Search Icon */}
              <li className="header-searchbar">
                <a href="#" className="block head-icon">
                  <MagnifyingGlassIcon size={24} className="text-secondary/80 hover:text-[#50C9DA] transition-colors" />
                </a>
              </li>

              {/* Notifications Icon */}
              <li className="header-notification">
                <a href="#" className="block head-icon relative">
                  <BellIcon size={24} className="text-secondary/80 hover:text-[#50C9DA] transition-colors" />
                  <span className="absolute top-0 right-0 p-1 bg-success border border-white rounded-full"></span>
                </a>
              </li>

              {/* User Profile Menu */}
              <li className="header-profile">
                <Menu as="div" className="relative">
                  <div>
                    <Menu.Button className="flex items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                      <span className="sr-only">Open user menu</span>
                      {user?.avatarUrl ? (
                        <img
                          className="h-9 w-9 rounded-lg object-cover"
                          src={user.avatarUrl}
                          alt={`${user.firstName} ${user.lastName}`}
                        />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#50C9DA] text-sm font-medium text-white">
                          {user ? getInitials(`${user.firstName} ${user.lastName}`) : 'U'}
                        </div>
                      )}
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-xl bg-surface py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-medium text-dark">{user?.firstName} {user?.lastName}</p>
                        <p className="truncate text-sm text-secondary">{user?.email}</p>
                      </div>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/profile"
                            className={cn(
                              active ? 'bg-primary/10' : '',
                              'flex items-center gap-x-2 px-4 py-2 text-sm text-dark'
                            )}
                          >
                            <UserCircleIcon size={20} /> Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/settings"
                            className={cn(
                              active ? 'bg-primary/10' : '',
                              'flex items-center gap-x-2 px-4 py-2 text-sm text-dark'
                            )}
                          >
                            <GearIcon size={20} /> Settings
                          </a>
                        )}
                      </Menu.Item>
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleSignOut}
                              className={cn(
                                active ? 'bg-primary/10' : '',
                                'w-full text-left flex items-center gap-x-2 px-4 py-2 text-sm text-dark'
                              )}
                            >
                              <SignOutIcon size={20} /> Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-b border-dashed border-secondary/10 m-2"></div>
    </header>
  );
}
