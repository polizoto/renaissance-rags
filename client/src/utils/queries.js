import { gql } from '@apollo/client';

export const QUERY_COSTUMES = gql`
  query getCostumes($category: ID) {
    costumes(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
      vendor {
        _id
        firstName
        lastName
        email
        location
      }
    }
  }
`;

export const QUERY_VENDORS = gql`
{
  vendors {
    _id
    firstName
    lastName
    email
    location
  }
}
`

export const QUERY_ALL_COSTUMES = gql`
  {
    costumes {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        costumes {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($costumes: [ID]!) {
    checkout(costumes: $costumes) {
      session
    }
  }
`;
