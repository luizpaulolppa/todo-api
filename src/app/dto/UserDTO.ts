export default interface UserDTO {
  name: string;
  email: string;
  password: string;

  passwordConfirmation?: string;
  token?: string;
}
