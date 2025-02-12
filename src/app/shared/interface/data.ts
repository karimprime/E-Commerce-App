/** Interface for user registration */
export interface RegisterData {
  name: string;
  phone: string;
  email: string;
  password: string;
  rePassword: string;
}

/** Interface for user login */
export interface LoginData {
  name: string;
  password: string;
}

/** Structure for successful authentication response */
export interface AuthRequestSuccess {
  message: string;
  user: UserData;
  token: string;
}

/** Structure for user information */
export interface UserData {
  name: string;
  email: string;
  role: string;
}

/** Standard API response message */
export interface APIResponseMessage {
  statusMsg: string;
  message: string;
}

/** Interface for forget password request */
export interface ForgetPasswordRequest {
  email: string;
}

/** Interface for verifying reset code */
export interface VerifyResetCodeRequest {
  resetCode: string;
}

/** Interface for verifying reset code  status Success*/
export interface VerifyResetCodeRequestSuccess {
  status: string;
}

/** Interface for resetting password */
export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
}
