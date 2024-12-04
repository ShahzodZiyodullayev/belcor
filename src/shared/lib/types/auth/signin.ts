export type TSession = {
  id: string;
  role: string;
  name: string;
  surname: string;
  accessToken: string;
  refreshToken: string;
  isAuthenticated: boolean;
};
