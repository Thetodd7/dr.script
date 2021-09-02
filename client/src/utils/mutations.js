import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addRequestapp($patientText: String!) {
    addRequestapp(patientText: $patientText) {
      _id
      patientText
      patientName
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($requestappId: ID!, $patientText: String!) {
    addComment(requestappId: $requestappId, commentText: $commentText) {
      _id
      patientText
      patientName
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
