export class GroupDto {
  id: string;
  code: string;
  name: string;
  createdAt: string;

  constructor(data: GroupDto) {
    this.id = data.id;
    this.code = data.code;
    this.name = data.name;
    this.createdAt = data.createdAt;
  }
}
