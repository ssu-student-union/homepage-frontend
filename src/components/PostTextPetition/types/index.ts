export interface PostListDtoResponse {
  postId: number;
  title: string;
  content: string | null;
  date: string;
  likeCount: number;
  onGoingStatus: string;
}
