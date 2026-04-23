// core/graphql/Profile.ts
import { gql } from "@apollo/client";

// Query completa (mantener para casos donde necesites todo)
export const GET_MY_PROFILE = gql`
  query GetMyProfile {
    myProfile {
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

// ✅ Queries específicas por pantalla
export const GET_PERSONAL_INFO = gql`
  query GetPersonalInfo {
    myProfile {
      id
      firstName
      lastName
      bio
      gender
      birthDate
    }
  }
`;

export const GET_PHYSICAL_INFO = gql`
  query GetPhysicalInfo {
    myProfile {
      id
      height
      weight
      profileImg
    }
  }
`;

export const GET_RUNNING_PREFERENCES = gql`
  query GetRunningPreferences {
    myProfile {
      id
      preferredDistance
      weeklyGoal
      pace
    }
  }
`;

// Las mutaciones pueden seguir siendo específicas
export const UPDATE_PERSONAL_INFO = gql`
  mutation UpdatePersonalInfo($updateProfileInput: UpdateProfileInput!) {
    updateProfile(updateProfileInput: $updateProfileInput) {
      id
      firstName
      lastName
      bio
      gender
      birthDate
    }
  }
`;

export const UPDATE_PHYSICAL_INFO = gql`
  mutation UpdatePhysicalInfo($updateProfileInput: UpdateProfileInput!) {
    updateProfile(updateProfileInput: $updateProfileInput) {
      id
      height
      weight
      profileImg
    }
  }
`;

export const UPDATE_RUNNING_PREFERENCES = gql`
  mutation UpdateRunningPreferences($updateProfileInput: UpdateProfileInput!) {
    updateProfile(updateProfileInput: $updateProfileInput) {
      id
      preferredDistance
      weeklyGoal
      pace
    }
  }
`;
