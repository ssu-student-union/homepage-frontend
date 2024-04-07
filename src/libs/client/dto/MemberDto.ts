import { GroupDto } from "./GroupDto";
import { UserDto } from "./UserDto";

export class MemberDto {
  user?: UserDto;
  group?: GroupDto;
  role: "admin" | "role";
  createdAt: string;

  constructor(data: MemberDto) {
    this.user = data.user;
    this.group = data.group;
    this.role = data.role;
    this.createdAt = data.createdAt;
  }
}
