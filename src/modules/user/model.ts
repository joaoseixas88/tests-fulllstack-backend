enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
}

export interface User {
  id: string;
  name?: string | null;
  surname?: string | null;
  age?: number | null;
  job?: string | null;
  email: string | null;
  password?: string | null;
  createdAt: Date;
  updatedAt: Date;
  role: ROLE;
}
