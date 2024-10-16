import { clientAuth } from './client';
import { AxiosResponse } from 'axios';

// Reuse the Filters interface
interface Filters {
  [key: string]: any;
}

// Request parameters interface
interface GetBoardDataPostsParams {
  filters?: Filters;
  page: number;
}

// Define the structure of a single file
interface PostFile {
  postFileId: number;
  fileName: string;
  fileUrl: string;
  fileType: string;
}

// Define the structure of a single post
interface PostListResDto {
  postId: number;
  category: string;
  date: string;
  title: string;
  files: PostFile[];
  isNotice: boolean;
  // Add other relevant fields as needed
}

// Define the pagination information
interface PageInfo {
  totalElements: number;
  totalPages: number;
  currentPage: number;
  // Add other relevant fields if necessary
}

// Define the structure of the API response
interface GetBoardDataPostsResponse {
  data: {
    postListResDto: PostListResDto[];
    pageInfo: PageInfo;
  };
}

// Update the function to return the correct response type
export const getBoardDataPosts = async ({
  filters = {},
  page,
}: GetBoardDataPostsParams): Promise<GetBoardDataPostsResponse> => {
  const response: AxiosResponse<GetBoardDataPostsResponse> = await clientAuth({
    url: `/board/data/posts`,
    method: 'get',
    params: {
      take: 5,
      page: page - 1, // Assuming your API uses 0-based pagination
      ...filters,
    },
  });
  return response.data;
};
