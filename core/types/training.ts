export enum WorkoutType {
  RUNNING = "RUNNING",
  CYCLING = "CYCLING",
  WALKING = "WALKING",
  SWIMMING = "SWIMMING",
  GYM = "GYM",
  OTHER = "OTHER",
}

export enum DeviceType {
  MOBILE = "MOBILE",
  WATCH = "WATCH",
  COMPUTER = "COMPUTER",
  EXTERNAL = "EXTERNAL",
}

export interface TrackPoint {
  latitude: number;
  longitude: number;
  timestamp: number;
  altitude?: number;
  accuracy?: number;
  speed?: number;
}

export interface CreateTrackPointInput {
  latitude: number;
  longitude: number;
  timestamp: number;
  altitude?: number;
  accuracy?: number;
  speed?: number;
}

export interface WorkoutSession {
  id?: string;
  title: string;
  date: Date;
  duration: number;
  distance: number;
  caloriesBurned?: number;
  avgPace?: number;
  routeData?: string;
  notes?: string;
  workoutType: WorkoutType;
  importedFrom: DeviceType;
  externalId?: string;
  trackPoints?: CreateTrackPointInput[];
  runId?: string;
  status: "active" | "completed" | "paused";
}

export interface CreateWorkoutSessionInput {
  title: string;
  date: Date;
  duration: number;
  distance: number;
  caloriesBurned?: number;
  avgPace?: number;
  routeData?: string;
  notes?: string;
  workoutType: WorkoutType;
  importedFrom: DeviceType;
  externalId?: string;
  trackPoints?: CreateTrackPointInput[];
  runId?: string;
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
