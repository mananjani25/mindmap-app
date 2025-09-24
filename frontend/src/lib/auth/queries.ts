/**
 * GraphQL queries for authentication
 */

import { gql } from '@apollo/client';

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    users(where: { email: { _eq: $email } }, limit: 1) {
      id
      email
      password_hash
      first_name
      last_name
      role
      avatar_url
      email_verified
      is_active
      created_at
      updated_at
      last_login
    }
  }
`;

export const UPDATE_USER_LAST_LOGIN = gql`
  mutation UpdateUserLastLogin($id: uuid!, $last_login: timestamptz!) {
    update_users_by_pk(
      pk_columns: { id: $id }
      _set: { last_login: $last_login }
    ) {
      id
      last_login
    }
  }
`;

export const CREATE_USER_ACCOUNT = gql`
  mutation CreateUserAccount($object: users_insert_input!) {
    insert_users_one(object: $object) {
      id
      email
      first_name
      last_name
      role
      avatar_url
      email_verified
      is_active
      created_at
    }
  }
`;

export const CHECK_EMAIL_EXISTS = gql`
  query CheckEmailExists($email: String!) {
    users(where: { email: { _eq: $email } }, limit: 1) {
      id
      email
    }
  }
`;