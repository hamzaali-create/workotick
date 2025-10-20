export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  token?: string;
  [key: string]: any; // optional: for extra fields
}


export interface RegisterApiResponse {
  data: {
    id: string;
    name: string;
    email: string;
  };
  message: string;
}