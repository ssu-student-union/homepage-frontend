export interface postPostReactionProps {
  postId: number;
  userId: number;
  reaction: string;
}

export interface postPostReactionResponse {
  code: string;
  message: string;
  isSuccess: boolean;
}
