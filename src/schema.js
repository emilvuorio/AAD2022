const { gql } = require('apollo-server-express');

module.exports = gql`
scalar DateTime

type Query {
    hello: String
    notes: [Note!]!
    note(id: ID!): Note!
    user(username: String!): User
    users: [Users!]!
    me: User!
}
type Note {
    id: ID!
    content: String!
    author: String!
    disabled: Boolean
    createdAt: DateTime!
    updatedAt: DateTime!
    favoritedCount: Int!
    favoritedBy: [User!]
    noteFeed(cursor: String): NoteFeed
}

type User {
    id: ID!
    username: String!
    email: String!
    avatar: String
    notes: [Note!]!
    favorties: [Note!]!
}


type Mutation {
    newNote(content: String!): Note!
    updateNote(id: ID!, content: String!): Note!
    deleteNote(id: ID!): Boolean!
    toggleFavorite(id: ID!): Note!
}

type NoteFeed {
    notes: [Note]!
    cursor: String!
    hasNextPage: Boolean!
}

`;
