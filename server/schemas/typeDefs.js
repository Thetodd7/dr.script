const { gql } = require("apollo-server");

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    password: String
    profilePicture: String
}
type Requestapp {
     _id: ID
     patientText: String
     patientName: String
     createAt: String
     comments: [Comment]!
 }

type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
 }
 type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    requestapps(username: String): [Requestapp]
    requestapp(requestappId: ID!):Requestapp
    me: User
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addRequestapp(patientText: String!): Requestapp
    addComment(requestappId: ID!, commentText: String!): Requestapp
    removeRequestapp(requestappId: ID!): Requestapp
    removeComment(requestappId: ID!, commentId: ID!): Requestapp
  }

`;

module.exports = typeDefs;
