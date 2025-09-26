// src/components/layout/Footer.tsx

'use client';

import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="container-fluid">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="md:w-9/12 w-full">
           
          </div>
          <div className="md:w-3/12 w-full">
            <ul className="footer-text text-center md:text-end">
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}