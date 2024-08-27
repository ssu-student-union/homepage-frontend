import { postCommentList, postReplyCommentList } from '@/types/getBoardPostComment';

export interface CommentProps {
  comment?: postCommentList;
  replyComment?: postReplyCommentList;
  className: string;
  isReply?: boolean;
  commentId?: number;
  mother_id?: number;
}
