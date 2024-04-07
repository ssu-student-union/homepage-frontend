export class RoleDto {
  role: string;
  createdAt: string;

  constructor(data: RoleDto) {
    this.role = data.role;
    this.createdAt = data.createdAt;
  }
}
