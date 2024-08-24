export interface PostDetailResDto {
  title: string;
  createdAt: string;
  content: string;
  imageList: string[];
}

export interface GetBoardDetailResponse {
  data: {
    postDetailResDto: PostDetailResDto;
  };
}

export interface getBoardDetailProps {
  boardCode: string;
  postId: number;
  userId?: number;
}
