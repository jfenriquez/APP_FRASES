/* Request */
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

//////response

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
  recovery_token?: null;
  create_at?: Date;
  rol: string;
  extra_data2?: null;
  extra_data3?: null;
}
