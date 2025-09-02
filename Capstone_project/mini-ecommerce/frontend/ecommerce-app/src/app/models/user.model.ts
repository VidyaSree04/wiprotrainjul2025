// src/app/models/user.model.ts

export interface User {
  id: number;
  userId: string; // Add this property to match your API
  firstName: string;
  lastName: string;
  emailId: string;
  password?: string;
  address?: string;
  userType: number; // 0 = admin, 1 = normal user
  loggedIn?: boolean;
}