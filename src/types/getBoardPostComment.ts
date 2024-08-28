export interface getBoardPostCommentProps {
  postId: number;
  type: string;
  userId?: number | null;
}

export interface postReplyCommentList {
  id: number;
  authorName: string;
  studentId: string;
  content: string;
  createdAt: string;
  lastEditedAt: string | null;
  likeCount: number;
  isDeleted: boolean;
  isAuthor: boolean;
  isLiked: boolean;
}

export interface postCommentList {
  id: number;
  authorName: string;
  studentId: string;
  content: string;
  commentType: string;
  createdAt: string;
  lastEditedAt: string | null;
  likeCount: number;
  isDeleted: boolean;
  isAuthor: boolean;
  isLiked: boolean;
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
