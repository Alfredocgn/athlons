export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate?: Date;
  gender?: "MALE" | "FEMALE" | "OTHER";
  pace?: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";
  bio?: string;
  profileImg?: string;
  height?: number;
  weight?: number;
  preferredDistance?: number;
  weeklyGoal?: number;
  socialLinks?: any;
  enableEmailNotifications?: boolean;
  enablePushNotifications?: boolean;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    bio?: string;
    gender?: string;
    pace?: string;
    height?: number;
    weight?: number;
    preferredDistance?: number;
    weeklyGoal?: number;
    profileImg?: string;
    socialLinks?: any;
    enableEmailNotifications?: boolean;
    enablePushNotifications?: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
}

export interface LoginInput {
  email: string;
  password: string;
}
