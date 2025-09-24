/**
 * GraphQL queries, mutations, and subscriptions
 */

import { gql } from '@apollo/client';

// Fragment definitions for reusable field sets
export const USER_FRAGMENT = gql`
  fragment UserFields on users {
    id
    email
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
`;

export const TEST_FRAGMENT = gql`
  fragment TestFields on tests {
    id
    title
    description
    instructor_id
    status
    time_limit
    max_attempts
    passing_score
    instructions
    is_randomized
    show_results
    allow_review
    start_date
    end_date
    created_at
    updated_at
  }
`;

export const QUESTION_FRAGMENT = gql`
  fragment QuestionFields on questions {
    id
    test_id
    question_text
    question_type
    points
    order_index
    explanation
    created_at
    updated_at
  }
`;

export const QUESTION_OPTION_FRAGMENT = gql`
  fragment QuestionOptionFields on question_options {
    id
    question_id
    option_text
    is_correct
    order_index
    created_at
  }
`;

export const TEST_ATTEMPT_FRAGMENT = gql`
  fragment TestAttemptFields on test_attempts {
    id
    test_id
    student_id
    started_at
    submitted_at
    time_taken
    score
    total_questions
    correct_answers
    is_completed
    created_at
    updated_at
  }
`;

export const DOCUMENT_FRAGMENT = gql`
  fragment DocumentFields on documents {
    id
    title
    file_name
    file_path
    file_size
    mime_type
    uploaded_by
    processed
    raw_text
    processed_chunks
    created_at
    updated_at
  }
`;

// User Queries
export const GET_CURRENT_USER = gql`
  ${USER_FRAGMENT}
  query GetCurrentUser {
    users(limit: 1) {
      ...UserFields
    }
  }
`;

export const GET_USERS = gql`
  ${USER_FRAGMENT}
  query GetUsers(
    $where: users_bool_exp
    $order_by: [users_order_by!]
    $limit: Int
    $offset: Int
  ) {
    users(where: $where, order_by: $order_by, limit: $limit, offset: $offset) {
      ...UserFields
    }
    users_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  ${USER_FRAGMENT}
  query GetUserById($id: uuid!) {
    users_by_pk(id: $id) {
      ...UserFields
    }
  }
`;

// Test Queries
export const GET_TESTS = gql`
  ${TEST_FRAGMENT}
  ${USER_FRAGMENT}
  query GetTests(
    $where: tests_bool_exp
    $order_by: [tests_order_by!]
    $limit: Int
    $offset: Int
  ) {
    tests(where: $where, order_by: $order_by, limit: $limit, offset: $offset) {
      ...TestFields
      instructor {
        ...UserFields
      }
      questions_aggregate {
        aggregate {
          count
        }
      }
    }
    tests_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_TEST_BY_ID = gql`
  ${TEST_FRAGMENT}
  ${USER_FRAGMENT}
  ${QUESTION_FRAGMENT}
  ${QUESTION_OPTION_FRAGMENT}
  query GetTestById($id: uuid!) {
    tests_by_pk(id: $id) {
      ...TestFields
      instructor {
        ...UserFields
      }
      questions(order_by: { order_index: asc }) {
        ...QuestionFields
        options: question_options(order_by: { order_index: asc }) {
          ...QuestionOptionFields
        }
      }
    }
  }
`;

export const GET_INSTRUCTOR_TESTS = gql`
  ${TEST_FRAGMENT}
  query GetInstructorTests($instructor_id: uuid!) {
    tests(
      where: { instructor_id: { _eq: $instructor_id } }
      order_by: { created_at: desc }
    ) {
      ...TestFields
      questions_aggregate {
        aggregate {
          count
        }
      }
      test_attempts_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

// Question Queries
export const GET_TEST_QUESTIONS = gql`
  ${QUESTION_FRAGMENT}
  ${QUESTION_OPTION_FRAGMENT}
  query GetTestQuestions($test_id: uuid!) {
    questions(
      where: { test_id: { _eq: $test_id } }
      order_by: { order_index: asc }
    ) {
      ...QuestionFields
      options: question_options(order_by: { order_index: asc }) {
        ...QuestionOptionFields
      }
    }
  }
`;

// Test Attempt Queries
export const GET_TEST_ATTEMPTS = gql`
  ${TEST_ATTEMPT_FRAGMENT}
  ${USER_FRAGMENT}
  ${TEST_FRAGMENT}
  query GetTestAttempts(
    $where: test_attempts_bool_exp
    $order_by: [test_attempts_order_by!]
    $limit: Int
    $offset: Int
  ) {
    test_attempts(
      where: $where
      order_by: $order_by
      limit: $limit
      offset: $offset
    ) {
      ...TestAttemptFields
      student {
        ...UserFields
      }
      test {
        ...TestFields
      }
    }
    test_attempts_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_STUDENT_ATTEMPTS = gql`
  ${TEST_ATTEMPT_FRAGMENT}
  ${TEST_FRAGMENT}
  query GetStudentAttempts($student_id: uuid!) {
    test_attempts(
      where: { student_id: { _eq: $student_id } }
      order_by: { created_at: desc }
    ) {
      ...TestAttemptFields
      test {
        ...TestFields
      }
    }
  }
`;

// Document Queries
export const GET_DOCUMENTS = gql`
  ${DOCUMENT_FRAGMENT}
  ${USER_FRAGMENT}
  query GetDocuments(
    $where: documents_bool_exp
    $order_by: [documents_order_by!]
    $limit: Int
    $offset: Int
  ) {
    documents(
      where: $where
      order_by: $order_by
      limit: $limit
      offset: $offset
    ) {
      ...DocumentFields
      uploaded_by_user: user {
        ...UserFields
      }
    }
    documents_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const GET_DOCUMENT_BY_ID = gql`
  ${DOCUMENT_FRAGMENT}
  ${USER_FRAGMENT}
  query GetDocumentById($id: uuid!) {
    documents_by_pk(id: $id) {
      ...DocumentFields
      uploaded_by_user: user {
        ...UserFields
      }
    }
  }
`;

// User Mutations
export const CREATE_USER = gql`
  ${USER_FRAGMENT}
  mutation CreateUser($object: users_insert_input!) {
    insert_users_one(object: $object) {
      ...UserFields
    }
  }
`;

export const UPDATE_USER = gql`
  ${USER_FRAGMENT}
  mutation UpdateUser($id: uuid!, $_set: users_set_input!) {
    update_users_by_pk(pk_columns: { id: $id }, _set: $_set) {
      ...UserFields
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: uuid!) {
    delete_users_by_pk(id: $id) {
      id
    }
  }
`;

// Test Mutations
export const CREATE_TEST = gql`
  ${TEST_FRAGMENT}
  mutation CreateTest($object: tests_insert_input!) {
    insert_tests_one(object: $object) {
      ...TestFields
    }
  }
`;

export const UPDATE_TEST = gql`
  ${TEST_FRAGMENT}
  mutation UpdateTest($id: uuid!, $_set: tests_set_input!) {
    update_tests_by_pk(pk_columns: { id: $id }, _set: $_set) {
      ...TestFields
    }
  }
`;

export const DELETE_TEST = gql`
  mutation DeleteTest($id: uuid!) {
    delete_tests_by_pk(id: $id) {
      id
    }
  }
`;

export const PUBLISH_TEST = gql`
  ${TEST_FRAGMENT}
  mutation PublishTest($id: uuid!) {
    update_tests_by_pk(
      pk_columns: { id: $id }
      _set: { status: PUBLISHED }
    ) {
      ...TestFields
    }
  }
`;

// Question Mutations
export const CREATE_QUESTION = gql`
  ${QUESTION_FRAGMENT}
  mutation CreateQuestion($object: questions_insert_input!) {
    insert_questions_one(object: $object) {
      ...QuestionFields
    }
  }
`;

export const CREATE_QUESTIONS_BATCH = gql`
  ${QUESTION_FRAGMENT}
  mutation CreateQuestionsBatch($objects: [questions_insert_input!]!) {
    insert_questions(objects: $objects) {
      returning {
        ...QuestionFields
      }
    }
  }
`;

export const UPDATE_QUESTION = gql`
  ${QUESTION_FRAGMENT}
  mutation UpdateQuestion($id: uuid!, $_set: questions_set_input!) {
    update_questions_by_pk(pk_columns: { id: $id }, _set: $_set) {
      ...QuestionFields
    }
  }
`;

export const DELETE_QUESTION = gql`
  mutation DeleteQuestion($id: uuid!) {
    delete_questions_by_pk(id: $id) {
      id
    }
  }
`;

// Question Option Mutations
export const CREATE_QUESTION_OPTIONS = gql`
  ${QUESTION_OPTION_FRAGMENT}
  mutation CreateQuestionOptions($objects: [question_options_insert_input!]!) {
    insert_question_options(objects: $objects) {
      returning {
        ...QuestionOptionFields
      }
    }
  }
`;

// Test Attempt Mutations
export const START_TEST_ATTEMPT = gql`
  ${TEST_ATTEMPT_FRAGMENT}
  mutation StartTestAttempt($object: test_attempts_insert_input!) {
    insert_test_attempts_one(object: $object) {
      ...TestAttemptFields
    }
  }
`;

export const SUBMIT_TEST_ATTEMPT = gql`
  ${TEST_ATTEMPT_FRAGMENT}
  mutation SubmitTestAttempt(
    $id: uuid!
    $responses: [test_responses_insert_input!]!
    $_set: test_attempts_set_input!
  ) {
    insert_test_responses(objects: $responses) {
      affected_rows
    }
    update_test_attempts_by_pk(pk_columns: { id: $id }, _set: $_set) {
      ...TestAttemptFields
    }
  }
`;

// Document Mutations
export const CREATE_DOCUMENT = gql`
  ${DOCUMENT_FRAGMENT}
  mutation CreateDocument($object: documents_insert_input!) {
    insert_documents_one(object: $object) {
      ...DocumentFields
    }
  }
`;

export const UPDATE_DOCUMENT = gql`
  ${DOCUMENT_FRAGMENT}
  mutation UpdateDocument($id: uuid!, $_set: documents_set_input!) {
    update_documents_by_pk(pk_columns: { id: $id }, _set: $_set) {
      ...DocumentFields
    }
  }
`;

export const DELETE_DOCUMENT = gql`
  mutation DeleteDocument($id: uuid!) {
    delete_documents_by_pk(id: $id) {
      id
    }
  }
`;