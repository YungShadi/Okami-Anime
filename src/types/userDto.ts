export interface UserDto {
  username: string;
  password: string;
  email?: string;
  profilePic?: string;
  description?: string;
  logined: boolean;
}
