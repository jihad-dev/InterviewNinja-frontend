export interface IUser {
  _id: string;
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: 'user' | 'admin'; 
  status: 'active' | 'inactive';
  isDeleted: boolean;
} 