export interface TextAreaProps {
  children?: React.ReactNode;
  className: string;
  isReply?: boolean;
  isEdit?: boolean;
  commentId?: number;
  reply_comment_Id?: number;
  mother_Id?: number;
  replycommentId?: number;
  onReplySuccess?: () => void;
  onEditSuccess?: (newContent: string) => void;
  onCancel?: () => void;
  value?: string;
  comment_count?: number;
}
