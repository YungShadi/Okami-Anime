export interface UserDto {
  username: string;
  password: string;
  authorities: [string];
  email?: string;
  profilePic?: string;
  description?: string;
}
