export class BoardDto {
  id: string;
  code: string;
  name: string;
  createdAt: string;

  constructor(data: BoardDto) {
    this.id = data.id;
    this.code = data.code;
    this.name = data.name;
    this.createdAt = data.createdAt;
  }
}
