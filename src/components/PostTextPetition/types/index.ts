export interface PostListDtoResponse {
  postId: number;
  title: string;
  content: string | null;
  date: string;
  likeCount: number;
  onGoingStatus: '진행중' | '접수완료' | '답변완료' | '종료됨';
}
