import { usePatchBoardPosts } from '@/hooks/usePatchBoardPosts';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { handleCardClick } from '../utils/cardHandler';
import { useGetBoardDetail } from '@/hooks/useGetBoardDetail';

export function usePartnershipPatch() {
  const location = useLocation();

  const postId: number = location.state?.postId;
  const boardCode: string = '제휴게시판';
  const { data: resp } = useGetBoardDetail({ boardCode, postId });
  const postDetail = resp?.data.postDetailResDto;

  const [title, setTitle] = useState<string>(postDetail?.title ?? '');
  const [category, setCategory] = useState<string>(postDetail?.categoryName ?? '');
  const [content, setContent] = useState<string>(postDetail?.content ?? '');
  const [imageList] = useState<string[]>(postDetail?.imageList ?? []);
  const [thumbnailImage, setThumbnailImage] = useState<string>(postDetail?.imageList[0] ?? '');

  useEffect(() => {
    console.log(content);
  }, [content]);

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
          thumbNailImage: thumbnailImage,
        },
        postId: postId,
      });

      handleCardClick(postId.toString(), postId, thumbnailImage);
      window.location.reload();
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
