---
# AthlonRun API Documentation

## Base URL

## �� Authentication Endpoints
## Authentication
Most endpoints require authentication using JWT Bearer tokens. Include the token in the Authorization header:
Authorization: Bearer <your-jwt-token>
### Register User
**Mutation:** `register`

**Description:** Register a new user account

**Input:**
```graphql
input RegisterInput {
  email: String!
  firstName: String!
  lastName: String!
  password: String!
}
```

**Response:**
```graphql
type AuthResponse {
  accessToken: String!
  refreshToken: String!
  user: User!
}
```

**Example:**
```graphql
mutation Register($input: RegisterInput!) {
  register(input: $input) {
    accessToken
    refreshToken
    user {
      id
      email
      firstName
      lastName
    }
  }
}
```

**Variables:**
```json
{
  "input": {
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "password": "password123"
  }
}
```

---

### Login User

**Mutation:** `login`

**Description:** Authenticate user and get access tokens

**Input:**

```graphql
input LoginInput {
  email: String!
  password: String!
}
```

**Response:**

```graphql
type AuthResponse {
  accessToken: String!
  refreshToken: String!
  user: User!
}
```

**Example:**

```graphql
mutation Login($input: LoginInput!) {
  login(input: $input) {
    accessToken
    refreshToken
    user {
      id
      email
      firstName
      lastName
    }
  }
}
```

---

### Get Current User

**Query:** `me`

**Description:** Get current authenticated user information

**Authentication:** Required

**Response:**

```graphql
type User {
  id: ID!
  email: String
  firstName: String!
  lastName: String!
  bio: String
  birthDate: DateTime
  gender: Gender
  height: Float
  weight: Float
  pace: Pace
  preferredDistance: Float
  weeklyGoal: Float
  profileImg: String
  socialLinks: JSON
  enableEmailNotifications: Boolean!
  enablePushNotifications: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

**Example:**

```graphql
query GetCurrentUser {
  me {
    id
    email
    firstName
    lastName
    bio
    height
    weight
    pace
  }
}
```

---

### Refresh Token

**Mutation:** `refreshToken`

**Description:** Get new access token using refresh token

**Input:**

```graphql
refreshToken: String!
```

**Response:**

```graphql
type AccessTokenResponse {
  accessToken: String!
}
```

**Example:**

```graphql
mutation RefreshToken($refreshToken: String!) {
  refreshToken(refreshToken: $refreshToken) {
    accessToken
  }
}
```

---

### Logout

**Mutation:** `logout`

**Description:** Logout user and invalidate refresh token

**Input:**

```graphql
refreshToken: String!
```

**Response:**

```graphql
Boolean!
```

---

### Forgot Password

**Mutation:** `forgotPassword`

**Description:** Send password reset email

**Input:**

```graphql
email: String!
```

**Response:**

```graphql
Boolean!
```

---

## 👤 User Management

### Get All Users

**Query:** `users`

**Description:** Get all users (admin only)

**Response:**

```graphql
[User!]!
```

---

### Get User by ID

**Query:** `user`

**Description:** Get specific user by ID

**Input:**

```graphql
id: ID!
```

**Response:**

```graphql
User!
```

---

### Get My Profile

**Query:** `myProfile`

**Description:** Get current user's profile

**Authentication:** Required

**Response:**

```graphql
User!
```

---

### Create User (Admin)

**Mutation:** `createUser`

**Description:** Create a new user (admin only)

**Authentication:** Required

**Input:**

```graphql
input CreateUserInput {
  firstName: String!
  lastName: String!
  birthDate: DateTime
  gender: Gender
  pace: Pace
  bio: String
  profileImg: String
  height: Float
  weight: Float
  preferredDistance: Float
  weeklyGoal: Float
  socialLinks: JSON
  enableEmailNotifications: Boolean = true
  enablePushNotifications: Boolean = true
}
```

**Response:**

```graphql
User!
```

---

### Update User (Admin)

**Mutation:** `updateUser`

**Description:** Update user information (admin only)

**Authentication:** Required

**Input:**

```graphql
input UpdateUserInput {
  id: ID!
  firstName: String
  lastName: String
  birthDate: DateTime
  gender: Gender
  pace: Pace
  bio: String
  profileImg: String
  height: Float
  weight: Float
  preferredDistance: Float
  weeklyGoal: Float
  socialLinks: JSON
  enableEmailNotifications: Boolean = true
  enablePushNotifications: Boolean = true
}
```

**Response:**

```graphql
User!
```

---

### Update Profile

**Mutation:** `updateProfile`

**Description:** Update current user's profile

**Authentication:** Required

**Input:**

```graphql
input UpdateProfileInput {
  id: ID!
  bio: String
  height: Float
  weight: Float
  preferredDistance: Float
  weeklyGoal: Float
  socialLinks: JSON
  enableEmailNotifications: Boolean
  enablePushNotifications: Boolean
}
```

**Response:**

```graphql
User!
```

---

### Remove User (Admin)

**Mutation:** `removeUser`

**Description:** Delete user (admin only)

**Authentication:** Required

**Input:**

```graphql
id: ID!
```

**Response:**

```graphql
User!
```

---

## ��‍♂️ Runs Management

### Get All Runs

**Query:** `runs`

**Description:** Get all runs with optional filters

**Input:**

```graphql
input RunFilters {
  clubId: String
  creatorId: String
  fromDate: String
  toDate: String
  location: String
  minDistance: Float
  maxDistance: Float
  pace: Pace
  search: String
}
```

**Response:**

```graphql
[Run!]!
```

**Example:**

```graphql
query GetRuns($filters: RunFilters) {
  runs(filters: $filters) {
    id
    title
    date
    location
    distance
    pace
    creator {
      firstName
      lastName
    }
    participantCount
  }
}
```

---

### Get Run by ID

**Query:** `run`

**Description:** Get specific run by ID

**Input:**

```graphql
id: String!
```

**Response:**

```graphql
Run!
```

---

### Get My Runs

**Query:** `myRuns`

**Description:** Get runs created by current user

**Authentication:** Required

**Response:**

```graphql
[Run!]!
```

---

### Get Upcoming Runs

**Query:** `upcomingRuns`

**Description:** Get upcoming runs

**Response:**

```graphql
[Run!]!
```

---

### Create Run

**Mutation:** `createRun`

**Description:** Create a new run

**Authentication:** Required

**Input:**

```graphql
input CreateRunInput {
  title: String!
  date: String!
  location: String!
  description: String
  distance: Float
  elevation: Float
  latitude: Float
  longitude: Float
  pace: Pace
  routeData: String
  routeId: String
  clubId: String
  eventImage: String
}
```

**Response:**

```graphql
Run!
```

**Example:**

```graphql
mutation CreateRun($createRunInput: CreateRunInput!) {
  createRun(createRunInput: $createRunInput) {
    id
    title
    date
    location
    creator {
      firstName
      lastName
    }
  }
}
```

---

### Update Run

**Mutation:** `updateRun`

**Description:** Update run information

**Authentication:** Required

**Input:**

```graphql
input UpdateRunInput {
  id: ID!
  title: String
  date: String
  location: String
  description: String
  distance: Float
  elevation: Float
  latitude: Float
  longitude: Float
  pace: Pace
  routeData: String
  routeId: String
  clubId: String
  eventImage: String
}
```

**Response:**

```graphql
Run!
```

---

### Remove Run

**Mutation:** `removeRun`

**Description:** Delete run

**Authentication:** Required

**Input:**

```graphql
id: String!
```

**Response:**

```graphql
Run!
```

---

### Register for Run

**Mutation:** `registerForRun`

**Description:** Register current user for a run

**Authentication:** Required

**Input:**

```graphql
id: String!
```

**Response:**

```graphql
Run!
```

---

### Cancel Registration

**Mutation:** `cancelRegistration`

**Description:** Cancel registration for a run

**Authentication:** Required

**Input:**

```graphql
id: String!
```

**Response:**

```graphql
Run!
```

---

## ��️ Routes Management

### Get All Routes

**Query:** `routes`

**Description:** Get all routes with optional filters

**Authentication:** Required

**Input:**

```graphql
input RouteDataFilters {
  creatorId: String
  minDistance: Float
  maxDistance: Float
  minElevation: Float
  maxElevation: Float
  nearLatitude: Float
  nearLongitude: Float
  radiusKm: Float
  createdAfter: DateTime
  createdBefore: DateTime
  limit: Int
  offset: Int
}
```

**Response:**

```graphql
[Route!]!
```

---

### Get Route by ID

**Query:** `route`

**Description:** Get specific route by ID

**Authentication:** Required

**Input:**

```graphql
id: ID!
```

**Response:**

```graphql
Route!
```

---

### Create Route

**Mutation:** `createRoute`

**Description:** Create a new route

**Authentication:** Required

**Input:**

```graphql
input CreateRouteInput {
  name: String!
  description: String!
  distance: Float!
  elevation: Float
  routeData: String!
}
```

**Response:**

```graphql
Route!
```

---

### Update Route

**Mutation:** `updateRoute`

**Description:** Update route information

**Authentication:** Required

**Input:**

```graphql
input UpdateRouteInput {
  id: ID!
  name: String
  description: String
  distance: Float
  elevation: Float
  routeData: String
}
```

**Response:**

```graphql
Route!
```

---

### Remove Route

**Mutation:** `removeRoute`

**Description:** Delete route

**Authentication:** Required

**Input:**

```graphql
id: ID!
```

**Response:**

```graphql
Route!
```

---

## 💪 Workout Sessions Management

### Get All Workout Sessions

**Query:** `workoutSessions`

**Description:** Get all workout sessions for current user

**Authentication:** Required

**Input:**

```graphql
input WorkoutSessionFilters {
  startDate: DateTime
  endDate: DateTime
  workoutType: WorkoutType
}
```

**Response:**

```graphql
[WorkoutSession!]!
```

---

### Get Workout Session by ID

**Query:** `workoutSession`

**Description:** Get specific workout session by ID

**Authentication:** Required

**Input:**

```graphql
id: ID!
```

**Response:**

```graphql
WorkoutSession!
```

---

### Get Workout Stats

**Query:** `getWorkoutStats`

**Description:** Get workout statistics for a date range

**Authentication:** Required

**Input:**

```graphql
startDate: DateTime!
endDate: DateTime!
```

**Response:**

```graphql
type WorkoutSessionStats {
  totalDistance: Float!
  totalDuration: Int!
  avgPace: Float!
  workoutCount: Int!
  weeklyGoalProgress: Float
}
```

---

### Get Sessions by Run

**Query:** `sessionsByRun`

**Description:** Get all workout sessions for a specific run

**Input:**

```graphql
runId: String!
```

**Response:**

```graphql
[WorkoutSession!]!
```

---

### Create Workout Session

**Mutation:** `createWorkoutSession`

**Description:** Create a new workout session

**Authentication:** Required

**Input:**

```graphql
input CreateWorkoutSessionInput {
  title: String!
  date: DateTime!
  distance: Float!
  duration: Int!
  avgPace: Float
  caloriesBurned: Int
  workoutType: WorkoutType!
  importedFrom: DeviceType!
  notes: String
  routeData: String
  runId: String
  externalId: String
  trackPoints: [CreateTrackPointInput!]
}

input CreateTrackPointInput {
  latitude: Float!
  longitude: Float!
  timestamp: DateTime!
  elevation: Float
  heartRate: Int
}
```

**Response:**

```graphql
WorkoutSession!
```

---

### Update Workout Session

**Mutation:** `updateWorkoutSession`

**Description:** Update workout session information

**Authentication:** Required

**Input:**

```graphql
input UpdateWorkoutSessionInput {
  id: ID!
  title: String
  date: DateTime
  distance: Float
  duration: Int
  avgPace: Float
  caloriesBurned: Int
  workoutType: WorkoutType
  importedFrom: DeviceType
  notes: String
  routeData: String
  runId: String
  externalId: String
  trackPoints: [CreateTrackPointInput!]
}
```

**Response:**

```graphql
WorkoutSession!
```

---

### Remove Workout Session

**Mutation:** `removeWorkoutSession`

**Description:** Delete workout session

**Authentication:** Required

**Input:**

```graphql
id: ID!
```

**Response:**

```graphql
WorkoutSession!
```

---

### Assign Workout Session to Run

**Mutation:** `assignToRun`

**Description:** Assign a workout session to a run

**Authentication:** Required

**Input:**

```graphql
runId: String!
workoutSessionId: String!
```

**Response:**

```graphql
WorkoutSession!
```

---

## �� Data Types

### Enums

#### Gender

```graphql
enum Gender {
  MALE
  FEMALE
  OTHER
}
```

#### Pace

```graphql
enum Pace {
  BEGINNER
  INTERMEDIATE
  ADVANCED
  ELITE
}
```

#### WorkoutType

```graphql
enum WorkoutType {
  RUN
  LONG_RUN
  TEMPO
  INTERVAL
  RECOVERY
  RACE
  TRAIL
}
```

#### DeviceType

```graphql
enum DeviceType {
  GARMIN
  POLAR
  SUUNTO
  COROS
  APPLE_HEALTH
  GOOGLE_FIT
  FITBIT
  STRAVA
  OTHER
}
```

### Complex Types

#### User

```graphql
type User {
  id: ID!
  email: String
  firstName: String!
  lastName: String!
  bio: String
  birthDate: DateTime
  gender: Gender
  height: Float
  weight: Float
  pace: Pace
  preferredDistance: Float
  weeklyGoal: Float
  profileImg: String
  socialLinks: JSON
  enableEmailNotifications: Boolean!
  enablePushNotifications: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

#### Run

```graphql
type Run {
  id: ID!
  title: String!
  date: DateTime!
  location: String!
  description: String
  distance: Float
  elevation: Float
  latitude: Float
  longitude: Float
  pace: Pace
  routeData: String
  routeId: String
  clubId: String
  eventImage: String
  creator: User!
  creatorId: String!
  route: Route
  participantCount: Int!
  participants: [RunnerOnRun!]
  workoutSessions: [WorkoutSession!]
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

#### Route

```graphql
type Route {
  id: ID!
  name: String!
  description: String!
  distance: Float!
  elevation: Float
  routeData: String!
  routeDataJson: JSON
  creator: User!
  creatorId: String!
  runs: [Run!]
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

#### WorkoutSession

```graphql
type WorkoutSession {
  id: ID!
  title: String!
  date: DateTime!
  distance: Float!
  duration: Int!
  avgPace: Float
  caloriesBurned: Int
  workoutType: WorkoutType!
  importedFrom: DeviceType
  notes: String
  routeData: String
  runId: String
  externalId: String
  user: User!
  userId: String!
  run: Run
  trackPoints: [TrackPoint!]
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

#### TrackPoint

```graphql
type TrackPoint {
  id: ID!
  latitude: Float!
  longitude: Float!
  timestamp: DateTime!
  elevation: Float
  heartRate: Int
  workoutSession: WorkoutSession!
  workoutSessionId: String!
}
```

---

## 🔧 Error Handling

The API returns GraphQL errors with the following structure:

```json
{
  "errors": [
    {
      "message": "Error description",
      "extensions": {
        "code": "ERROR_CODE",
        "statusCode": 400
      }
    }
  ]
}
```

### Common Error Codes:

- `UNAUTHORIZED` (401): Authentication required
- `FORBIDDEN` (403): Insufficient permissions
- `BAD_REQUEST` (400): Invalid input data
- `NOT_FOUND` (404): Resource not found
- `INTERNAL_SERVER_ERROR` (500): Server error

---

## 📝 Notes

1. **Authentication**: Most endpoints require a valid JWT token in the Authorization header
2. **Pagination**: Some list endpoints support pagination with `limit` and `offset` parameters
3. **Filtering**: Many endpoints support filtering options for better data retrieval
4. **File Uploads**: Profile images and event images are handled through file upload endpoints
5. **Real-time**: Consider implementing subscriptions for real-time updates in the future

---

## �� Getting Started

1. **Register a new user** using the `register` mutation
2. **Login** using the `login` mutation to get access tokens
3. **Include the access token** in the Authorization header for subsequent requests
4. **Use the GraphQL playground** at `http://localhost:3000/graphql` for testing

---

## 📞 Support

For API support and questions, please refer to the project documentation or contact the development team.
