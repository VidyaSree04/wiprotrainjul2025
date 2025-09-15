export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  emailId: string;
  password: string;
  address?: string;
  userType: number; // 0 = admin, 1 = normal user
  loggedIn?: boolean;
}