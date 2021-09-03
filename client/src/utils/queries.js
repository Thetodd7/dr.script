import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      requestapps {
        _id
        patientText
        createdAt
      }
    }
  }
`;

export const QUERY_THOUGHTS = gql`
  query getrequestapps {
    requestapps {
      _id
      patientText
      patientName
      createdAt
    }
  }
`;

export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($requestappId: ID!) {
    requestapp(requestappId: $requestappId) {
      _id
      patientText
      patientName
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
    }
  }
`;