// 단건 조회 데이터 타입
export interface QnaDetail {
  postId: number;
  category: '답변완료' | '답변대기';
  authorName: string;
  title: string;
  content: string;
  createdAt: string;
  lastEditedAt: string;
  isAuthor: boolean;
  allowedAuthorities: string[];
  officialCommentList: QnaOfficialComment[];
  department: string;
  college: string;
  qnaTargetCode: string;
  authorname: string;
}

export interface QnaOfficialComment {
  id: number;
  authorName: string;
  content: string;
  commentType: 'GENERAL' | 'OFFICIAL';
  createdAt: string;
  lastEditedAt: string | null;
  isAuthor: boolean;
  isDeleted: boolean;
}

// API 응답의 data 내부 구조를 나타내는 타입
export interface QnaDetailData {
  postDetailResDto: QnaDetail;
}

// 대댓글(Reply Comment) 타입
export interface QnaReplyComment {
  id: number;
  authorName: string;
  studentId: string;
  department: string;
  college: string;
  content: string;
  createdAt: string;
  lastEditedAt: string | null;
  likeCount: number;
  isAuthor: boolean;
  isLiked: boolean;
  isDeleted: boolean;
}

// 댓글(Comment) 타입 - 대댓글 배열 포함
export interface QnaComment {
  id: number;
  authorName: string;
  department: string;
  college: string;
  studentId: string;
  content: string;
  commentType: 'GENERAL' | 'OFFICIAL';
  createdAt: string;
  lastEditedAt: string | null;
  likeCount: number;
  isAuthor: boolean;
  isLiked: boolean;
  isDeleted: boolean;
  postReplyComments: QnaReplyComment[];
}

export interface QnaCommentListData {
  postComments: QnaComment[];
  total: number;
  allowedAuthorities: string[];
}
