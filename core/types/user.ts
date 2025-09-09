export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  bio?: string;
  gender?: string;
  birthDate?: string;
  pace?: string;
  height?: number ;
  weight?: number;
  preferredDistance?: number;
  weeklyGoal?: number;
  profileImg?: string | null;
  socialLinks?: any;
  enableEmailNotifications?: boolean;
  enablePushNotifications?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
