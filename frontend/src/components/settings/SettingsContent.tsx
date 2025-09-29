'use client';
import React, { useState } from 'react';
import { UserCircle, Bell, Gear, Palette, LockSimple, Question, EnvelopeSimple, GlobeSimple } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';

interface SettingItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
  children?: React.ReactNode;
}

const SettingItem = ({ icon: Icon, title, description, children }: SettingItemProps) => (
  <div className="flex items-start p-4 bg-light/50 rounded-xl shadow-sm">
    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-[#AFCC35]/10 text-[#AFCC35] mr-4">
      <Icon size={24} weight="bold" />
    </div>
    <div className="flex-grow">
      <h6 className="font-bold text-font-title mb-1">{title}</h6>
      <p className="text-sm text-font-light mb-2">{description}</p>
      {children && <div className="mt-2">{children}</div>}
    </div>
  </div>
);

const SettingsContent = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const settingsData = {
    profile: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: '/avatar/john-doe.png',
      bio: 'Passionate educator and mind map enthusiast.',
    },
    notifications: {
      emailNotifications: true,
      appNotifications: false,
      smsNotifications: false,
    },
    general: {
      language: 'English',
      theme: 'Light',
      timezone: 'UTC-5 (EST)',
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex border-b border-border mb-6">
        <button
          className={cn(
            'px-4 py-2 text-sm font-medium border-b-2 -mb-px flex items-center gap-2',
            activeTab === 'profile'
              ? 'border-[#AFCC35] text-[#AFCC35]'
              : 'border-transparent text-font-light hover:text-font-title'
          )}
          onClick={() => setActiveTab('profile')}
        >
          <UserCircle size={18} /> Profile
        </button>
        <button
          className={cn(
            'px-4 py-2 text-sm font-medium border-b-2 -mb-px flex items-center gap-2',
            activeTab === 'notifications'
              ? 'border-[#AFCC35] text-[#AFCC35]'
              : 'border-transparent text-font-light hover:text-font-title'
          )}
          onClick={() => setActiveTab('notifications')}
        >
          <Bell size={18} /> Notifications
        </button>
        <button
          className={cn(
            'px-4 py-2 text-sm font-medium border-b-2 -mb-px flex items-center gap-2',
            activeTab === 'general'
              ? 'border-[#AFCC35] text-[#AFCC35]'
              : 'border-transparent text-font-light hover:text-font-title'
          )}
          onClick={() => setActiveTab('general')}
        >
          <Gear size={18} /> General
        </button>
        <button
          className={cn(
            'px-4 py-2 text-sm font-medium border-b-2 -mb-px flex items-center gap-2',
            activeTab === 'security'
              ? 'border-[#AFCC35] text-[#AFCC35]'
              : 'border-transparent text-font-light hover:text-font-title'
          )}
          onClick={() => setActiveTab('security')}
        >
          <LockSimple size={18} /> Security
        </button>
      </div>

      <div>
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <SettingItem icon={UserCircle} title="Name" description="Your full name.">
              <input type="text" className="form-input w-full" value={settingsData.profile.name} readOnly />
            </SettingItem>
            <SettingItem icon={EnvelopeSimple} title="Email" description="Your primary email address.">
              <input type="email" className="form-input w-full" value={settingsData.profile.email} readOnly />
            </SettingItem>
            <SettingItem icon={UserCircle} title="Bio" description="A short description about yourself.">
              <textarea className="form-textarea w-full" rows={3} value={settingsData.profile.bio} readOnly></textarea>
            </SettingItem>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <SettingItem icon={Bell} title="Email Notifications" description="Receive updates via email.">
              <input type="checkbox" className="form-checkbox" checked={settingsData.notifications.emailNotifications} readOnly />
            </SettingItem>
            <SettingItem icon={Bell} title="In-App Notifications" description="Get alerts within the application.">
              <input type="checkbox" className="form-checkbox" checked={settingsData.notifications.appNotifications} readOnly />
            </SettingItem>
            <SettingItem icon={Bell} title="SMS Notifications" description="Receive alerts via SMS.">
              <input type="checkbox" className="form-checkbox" checked={settingsData.notifications.smsNotifications} readOnly />
            </SettingItem>
          </div>
        )}

        {activeTab === 'general' && (
          <div className="space-y-4">
            <SettingItem icon={Gear} title="Language" description="Choose your preferred language.">
              <select className="form-select w-full" value={settingsData.general.language} readOnly>
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </SettingItem>
            <SettingItem icon={Palette} title="Theme" description="Select your application theme.">
              <select className="form-select w-full" value={settingsData.general.theme} readOnly>
                <option>Light</option>
                <option>Dark</option>
              </select>
            </SettingItem>
            <SettingItem icon={GlobeSimple} title="Timezone" description="Set your local timezone.">
              <select className="form-select w-full" value={settingsData.general.timezone} readOnly>
                <option>UTC-5 (EST)</option>
                <option>UTC-8 (PST)</option>
                <option>UTC+1 (CET)</option>
              </select>
            </SettingItem>
          </div>
        )}

        {activeTab === 'security' && (
            <div className="space-y-4">
                <SettingItem icon={LockSimple} title="Change Password" description="Update your account password.">
                    <button className="btn bg-[#50C9DA] text-white px-4 py-2 rounded-xl">Change Password</button>
                </SettingItem>
                <SettingItem icon={Question} title="Two-Factor Authentication" description="Enhance your account security.">
                    <button className="btn bg-[#AFCC35] text-white px-4 py-2 rounded-xl">Enable 2FA</button>
                </SettingItem>
            </div>
        )}
      </div>
    </div>
  );
};

export default SettingsContent;
