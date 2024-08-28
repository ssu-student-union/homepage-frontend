import { PetitionCommentOrderType } from '@/pages/petition-notice/type';
import { postCommentList, postReplyCommentList } from '@/types/getBoardPostComment';

export interface CommentProps {
  comment?: postCommentList;
  replyComment?: postReplyCommentList;
  className: string;
  isReply?: boolean;
  commentId?: number;
  type?: PetitionCommentOrderType;
}
