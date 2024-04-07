export class UserDto {
  id: string;
  name: string;
  profileImage: string;
  createdAt: string;

  constructor(data: UserDto) {
    this.id = data.id;
    this.name = data.name;
    this.profileImage = data.profileImage;
    this.createdAt = data.createdAt;
  }
}
