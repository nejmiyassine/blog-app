export interface IUser {
  id?: number;
  username: string;
  email: string;
  password: string;
}

export interface IGenericResponse {
  status: string;
  message: string;
}
