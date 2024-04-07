import { PostDto } from "./PostDto";
import { UserDto } from "./UserDto";

export class PostCommentReactionDto {
  id: string;
  post?: PostDto;
  author?: UserDto;
  reaction: string;

  constructor(data: PostCommentReactionDto) {
    this.id = data.id;
    this.post = data.post;
    this.author = data.author;
    this.reaction = data.reaction;
  }
}
