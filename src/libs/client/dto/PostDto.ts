/* eslint-disable @typescript-eslint/no-explicit-any */
import { BoardDto } from "./BoardDto";
import { CategoryDto } from "./CategoryDto";
import { UserDto } from "./UserDto";

export class PostDto {
  id: string;
  board: BoardDto;
  category: CategoryDto;
  author: UserDto;
  title: string;
  content: string;
  viewCount: number;
  thumbnailImage?: string;
  properties: any;
  lastEditedAt: string;

  constructor(data: PostDto) {
    this.id = data.id;
    this.board = new BoardDto(data.board);
    this.category = new CategoryDto(data.category);
    this.author = new UserDto(data.author);
    this.title = data.title;
    this.content = data.content;
    this.viewCount = data.viewCount;
    this.thumbnailImage = data.thumbnailImage;
    this.properties = data.properties;
    this.lastEditedAt = data.lastEditedAt;
  }
}
