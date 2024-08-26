export interface getBoardPostCommentProps {
  postId: number;
  type: string;
  userId: number;
}

export interface postReplyCommentList {
  id: number;
  authorName: string;
  studentId: string;
  content: string;
  createdAt: string;
  lastEditAt: string;
  likeCount: number;
  isAuthor: boolean;
}

export interface postCommentList extends postReplyCommentList {
  postReplyComments: postReplyCommentList[];
}

export interface getBoardPostCommentResponse {
  code: string;
  message: string;
  data: {
    postComments: postCommentList[];
    total: number;
  };
  isSuccess: boolean;
}
