export type AuthStatus = 'idle' | 'loading' | 'error' | 'success';

export type LoginCredentials = {
  email: string;
  password: string;
};
