import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      refreshToken
      user {
        id
        email
        firstName
        lastName
        bio
        gender
        pace
        height
        weight
        preferredDistance
        weeklyGoal
        profileImg
        socialLinks
        enableEmailNotifications
        enablePushNotifications
        createdAt
        updatedAt
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($input: CreateUserInput!) {
    register(input: $input) {
      accessToken
      refreshToken
      user {
        id
        email
        firstName
        lastName
        bio
        gender
        pace
        height
        weight
        preferredDistance
        weeklyGoal
        profileImg
        socialLinks
        enableEmailNotifications
        enablePushNotifications
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
      id
      email
      firstName
      lastName
      bio
      gender
      pace
      height
      weight
      preferredDistance
      weeklyGoal
      profileImg
      socialLinks
      enableEmailNotifications
      enablePushNotifications
      createdAt
      updatedAt
    }
  }
`;
