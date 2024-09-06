import { usePatchBoardPosts } from '@/hooks/usePatchBoardPosts';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleCardClick } from '../../utils/cardHandler';

export function useNoticePatch() {
  const location = useLocation();
  const data = location.state?.data || {};
  const postId: number = data.postId ?? 0;
  const imageList: string[] = data.imageUrls ?? [];
  const initialThumbNailImage: string = data.thumbNailImage ?? '';

  const navigate = useNavigate();
  const [title, setTitle] = useState<string>(data.title ?? '');
  const [category, setCategory] = useState<string>(data.category ?? '');
  const [content, setContent] = useState<string>(data.content ?? '');
  const [thumbnailImage, setThumbnailImage] = useState<string>(initialThumbNailImage);
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
        boardCode: '공지사항게시판',
        data: {
          title,
          content,
          categoryCode: category,
          thumbNailImage: thumbnailImage,
        },
        postId: postId,
      });

      handleCardClick(postId.toString(), postId, category, thumbnailImage, navigate);
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
