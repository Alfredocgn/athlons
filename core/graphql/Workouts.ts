import { gql } from "@apollo/client";

export const CREATE_WORKOUT_SESSION = gql`
  mutation CreateWorkoutSession(
    $createWorkoutSessionInput: CreateWorkoutSessionInput!
  ) {
    createWorkoutSession(
      createWorkoutSessionInput: $createWorkoutSessionInput
    ) {
      id
      title
      date
      distance
      duration
      workoutType
      avgPace
      caloriesBurned
      importedFrom
      notes
      trackPoints {
        latitude
        longitude
        timestamp
        elevation
      }
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_WORKOUT_SESSION = gql`
  mutation UpdateWorkoutSession(
    $updateWorkoutSessionInput: UpdateWorkoutSessionInput!
  ) {
    updateWorkoutSession(
      updateWorkoutSessionInput: $updateWorkoutSessionInput
    ) {
      id
      title
      date
      distance
      duration
      workoutType
      avgPace
      caloriesBurned
      trackPoints {
        latitude
        longitude
        timestamp
        elevation
      }
    }
  }
`;

export const GET_WORKOUT_SESSIONS = gql`
  query GetWorkoutSessions {
    workoutSessions {
      id
      title
      date
      distance
      duration
      avgPace
      caloriesBurned
      workoutType
      importedFrom
      notes
      routeData
      runId
      externalId
      userId
      createdAt
      updatedAt
      trackPoints {
        id
        latitude
        longitude
        timestamp
        elevation
        heartRate
      }
    }
  }
`;

export const GET_WORKOUT_SESSION = gql`
  query GetWorkoutSession($id: ID!) {
    workoutSession(id: $id) {
      id
      title
      date
      distance
      duration
      avgPace
      caloriesBurned
      workoutType
      importedFrom
      notes
      routeData
      runId
      externalId
      userId
      createdAt
      updatedAt
      trackPoints {
        id
        latitude
        longitude
        timestamp
        elevation
        heartRate
      }
    }
  }
`;
