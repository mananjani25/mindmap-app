/**
 * Apollo Client configuration for GraphQL operations with Hasura
 */

import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { getSession } from 'next-auth/react';

// HTTP Link to Hasura GraphQL endpoint
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_ENDPOINT || 'http://localhost:8080/v1/graphql',
  credentials: 'include',
});

// Auth Link - adds JWT token to requests
const authLink = setContext(async (_, { headers }) => {
  try {
    const session = await getSession();
    const token = session?.accessToken;

    return {
      headers: {
        ...headers,
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
        // Add admin secret for development (remove in production)
        ...(process.env.NODE_ENV === 'development' && {
          'X-Hasura-Admin-Secret': process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
        }),
      },
    };
  } catch (error) {
    console.error('Error getting session:', error);
    return {
      headers,
    };
  }
});

// Error Link - handles GraphQL and network errors
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        extensions
      );

      // Handle specific error types
      if (extensions?.code === 'access-denied') {
        // Redirect to login or show auth error
        console.warn('Access denied - user may need to re-authenticate');
      }
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    
    // Handle specific network errors
    if ('statusCode' in networkError) {
      switch (networkError.statusCode) {
        case 401:
          // Unauthorized - redirect to login
          console.warn('Unauthorized request - redirecting to login');
          break;
        case 403:
          // Forbidden - show permission error
          console.warn('Forbidden request - insufficient permissions');
          break;
        case 500:
          // Server error
          console.error('Server error occurred');
          break;
      }
    }
  }
});

// Cache configuration
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        tests: {
          keyArgs: ['where', 'order_by'],
          merge(existing = [], incoming) {
            return incoming;
          },
        },
        test_attempts: {
          keyArgs: ['where', 'order_by'],
          merge(existing = [], incoming) {
            return incoming;
          },
        },
        users: {
          keyArgs: ['where', 'order_by'],
          merge(existing = [], incoming) {
            return incoming;
          },
        },
        documents: {
          keyArgs: ['where', 'order_by'],
          merge(existing = [], incoming) {
            return incoming;
          },
        },
      },
    },
    User: {
      keyFields: ['id'],
    },
    Test: {
      keyFields: ['id'],
    },
    Question: {
      keyFields: ['id'],
    },
    TestAttempt: {
      keyFields: ['id'],
    },
    Document: {
      keyFields: ['id'],
    },
    MindMap: {
      keyFields: ['id'],
    },
  },
});

// Create Apollo Client instance
export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
    },
    query: {
      errorPolicy: 'all',
      notifyOnNetworkStatusChange: true,
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
  connectToDevTools: process.env.NODE_ENV === 'development',
});

// Helper function to clear cache
export const clearApolloCache = () => {
  apolloClient.cache.reset();
};

// Helper function to refetch queries
export const refetchQueries = (queries: string[]) => {
  return apolloClient.refetchQueries({
    include: queries,
  });
};

export default apolloClient;