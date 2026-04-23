export enum WorkoutType {
  RUN = "RUN",
  LONG_RUN = "LONG_RUN",
  TEMPO = "TEMPO",
  INTERVAL = "INTERVAL",
  RECOVERY = "RECOVERY",
  RACE = "RACE",
  TRAIL = "TRAIL",
}
export enum WorkoutStatus {
  IDLE = "idle",
  ACTIVE = "active",
  PAUSED = "paused",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}
export enum DeviceType {
  GARMIN = "GARMIN",
  POLAR = "POLAR",
  SUUNTO = "SUUNTO",
  COROS = "COROS",
  APPLE_HEALTH = "APPLE_HEALTH",
  GOOGLE_FIT = "GOOGLE_FIT",
  FITBIT = "FITBIT",
  STRAVA = "STRAVA",
  OTHER = "OTHER",
}

export interface TrackPoint {
  latitude: number;
  longitude: number;
  timestamp: number;
  altitude?: number;
  accuracy?: number;
  speed?: number;
  heartRate?: number;
}

export interface CreateTrackPointInput {
  latitude: number;
  longitude: number;
  timestamp: number;
  altitude?: number;
  accuracy?: number;
  speed?: number;
  heartRate?: number;
}

export interface WorkoutSession {
  id: string;
  title: string;
  date: Date;
  distance: number;
  duration: number;
  avgPace?: number;
  caloriesBurned?: number;
  workoutType: WorkoutType;
  importedFrom: DeviceType;
  notes?: string;
  routeData?: string;
  runId?: string;
  externalId?: string;
  userId: string;
  trackPoints?: TrackPoint[];
  createdAt: Date;
  updatedAt: Date;
}

export interface LocalWorkoutSession {
  localId: string;
  title: string;
  date: Date;
  distance: number;
  duration: number;
  avgPace?: number;
  caloriesBurned?: number;
  workoutType: WorkoutType;
  importedFrom: DeviceType;
  notes?: string;
  routeData?: string;
  runId?: string;
  externalId?: string;
  trackPoints?: TrackPoint[];
  status: WorkoutStatus;
  startTime?: number;
  pauseTime?: number;
  totalPauseTime?: number;
}

export interface CreateWorkoutSessionInput {
  title: string;
  date: Date;
  distance: number;
  duration: number;
  avgPace?: number;
  caloriesBurned?: number;
  workoutType: WorkoutType;
  importedFrom: DeviceType;
  notes?: string;
  routeData?: string;
  runId?: string;
  externalId?: string;
  trackPoints?: CreateTrackPointInput[];
}
export interface UpdateWorkoutSessionInput {
  id: string;
  title?: string;
  date?: Date;
  distance?: number;
  duration?: number;
  avgPace?: number;
  caloriesBurned?: number;
  workoutType?: WorkoutType;
  importedFrom?: DeviceType;
  notes?: string;
  routeData?: string;
  runId?: string;
  externalId?: string;
  trackPoints?: CreateTrackPointInput[];
}

export interface WorkoutStats {
  elapsedTime: number;
  distance: number;
  pace: number;
  currentSpeed: number;
  caloriesBurned: number;
}

export interface LocationPermission {
  granted: boolean;
  status: "granted" | "denied" | "undetermined";
}
