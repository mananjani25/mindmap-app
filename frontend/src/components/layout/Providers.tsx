'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '@/lib/apollo/client';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ApolloProvider client={apolloClient}>
        {children}
      </ApolloProvider>
    </SessionProvider>
  );
}