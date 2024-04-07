export class CategoryDto {
  id: string;
  code: string;
  name: string;

  constructor(data: CategoryDto) {
    this.id = data.id;
    this.code = data.code;
    this.name = data.name;
  }
}
