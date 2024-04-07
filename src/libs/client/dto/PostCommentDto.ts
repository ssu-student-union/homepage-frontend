import { PostDto } from "./PostDto";
import { UserDto } from "./UserDto";

export class PostCommentDto {
  id: string;
  post?: PostDto;
  author?: UserDto;
  content: string;
  type?: string;
  lastEditedAt: string;

  constructor(data: PostCommentDto) {
    this.id = data.id;
    this.post = data.post;
    this.author = data.author;
    this.content = data.content;
    this.type = data.type;
    this.lastEditedAt = data.lastEditedAt;
  }
}
