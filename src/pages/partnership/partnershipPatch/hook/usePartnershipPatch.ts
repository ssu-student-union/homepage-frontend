import { usePatchBoardPosts } from '@/hooks/usePatchBoardPosts';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetBoardDetail } from '@/hooks/useGetBoardDetail';

export function usePartnershipPatch() {
  const location = useLocation();
  const navigate = useNavigate();

  const postId: number = location.state?.postId;
  const boardCode: string = '제휴게시판';
  const { data: resp } = useGetBoardDetail({ boardCode, postId });
  const postDetail = resp?.data.postDetailResDto;

  const [title, setTitle] = useState<string>(postDetail?.title ?? '');
  const [category, setCategory] = useState<string>(postDetail?.categoryName ?? '');
  const [content, setContent] = useState<string>(postDetail?.content ?? '');
  const [imageList] = useState<string[]>(postDetail?.imageList ?? []);
  const [thumbnailImage, setThumbnailImage] = useState<string>(postDetail?.imageList[0] ?? '');

  const { mutateAsync: patchPost, isLoading }: any = usePatchBoardPosts();

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSubmit = async () => {
    try {
      await patchPost({
        boardCode: '제휴게시판',
        posts: {
          title,
          content,
          categoryCode: category,
          thumbnailImage: thumbnailImage,
          postFileList: [0],
        },
        postId: postId,
      });

      navigate('/homepage-frontend/partnership');
    } catch (e) {
      console.error(e);
    }
  };

  return {
    postId,
    title,
    category,
    content,
    thumbnailImage,
    imageList,
    handleTitleChange,
    handleCategoryChange,
    handleContentChange,
    setThumbnailImage,
    handleSubmit,
    isLoading,
  };
}
