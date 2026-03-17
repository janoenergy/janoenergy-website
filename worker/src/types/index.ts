export interface Env {
  DATABASE_URL: string;
  JWT_SECRET: string;
  ALLOWED_ORIGINS?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  role: string;
  department?: string;
  avatarUrl?: string;
  isActive: boolean;
}
