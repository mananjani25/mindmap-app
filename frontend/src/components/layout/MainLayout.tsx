// src/components/layout/MainLayout.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Footer } from './Footer';
import { cn } from '@/lib/utils';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  
  // State for mobile sidebar (drawer)
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  // State for desktop sidebar (collapsed/expanded)
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Effect to handle window resize and apply semi-nav automatically
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1199 && window.innerWidth > 768) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    };

    // Set initial state on component mount
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // --- Main Toggle Handler ---
  // On mobile, it controls the drawer. On desktop, it controls the collapse.
  const handleMenuToggle = () => {
    if (window.innerWidth < 992) {
      setMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      setSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  return (
    // The 'app-wrapper' class is key for the layout
    <div className="app-wrapper">
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onClose={() => setMobileSidebarOpen(false)}
        onExpand={() => setSidebarCollapsed(false)} // Add this to expand from semi-nav hover
        userRole={session?.user?.role}
      />

      <div className={cn("app-content flex flex-1 flex-col transition-all duration-300", 
          isSidebarCollapsed ? "lg:pl-[4.5rem]" : "lg:pl-68"
      )}>
        <Header user={session?.user} onMenuClick={handleMenuToggle} />

        <main className="flex-1">
          <div className="py-6">
            <div className="container-fluid">
              {children}
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
}