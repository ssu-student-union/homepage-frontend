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

export interface postPostCommentReactionProps {
  commentId: number;
  reaction: string;
}

export interface postPostReplyCommentReactionProps {
  replycommentId: number;
  reaction: string;
}

export interface postPostCommentReactionResponse {
  code: string;
  message: string;
  data: {
    likeCount: number;
  };
  isSuccess: boolean;
}

export interface postPostReplyCommentReactionResponse {
  code: string;
  message: string;
  data: string;
  isSuccess: boolean;
}
