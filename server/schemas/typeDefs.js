const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Vendor {
    _id: ID
    firstName: String
    lastName: String
    email: String
    location: String
  }

  type Costume {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
    vendor: Vendor
  }

  type Order {
    _id: ID
    purchaseDate: String
    costumes: [Costume]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Auth {
    token: ID
    user: User
  }

  type Checkout {
    session: ID
  }  

  type Query {
    categories: [Category]
    costumes(category: ID, name: String): [Costume]
    costume(_id: ID!): Costume
    user: User
    order(_id: ID!): Order
    checkout(costumes: [ID]!): Checkout
    vendors: [Vendor]
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(costumes: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateCostume(_id: ID!, quantity: Int!): Costume
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
