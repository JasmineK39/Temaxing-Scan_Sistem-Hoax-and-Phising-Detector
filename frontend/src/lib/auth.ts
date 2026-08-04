export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string; 
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}