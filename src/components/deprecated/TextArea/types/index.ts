export interface TextAreaProps {
  children?: React.ReactNode;
  className: string;
  value?: string;
  isReply?: boolean;
  isEdit?: boolean;
  isAuthority?: string[];
  comment_count?: number;
  commentId?: number;
  reply_comment_Id?: number;
  mother_Id?: number;
  replycommentId?: number;
  onReplySuccess?: () => void;
  onEditSuccess?: (newContent: string) => void;
  onCancel?: () => void;
}
