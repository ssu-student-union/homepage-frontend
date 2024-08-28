import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatchBoardPosts } from '@/hooks/usePatchBoardPosts';

export function useAuditEdit() {
  const navigate = useNavigate();
  const [postId] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const { mutateAsync: patchPost, isLoading } = usePatchBoardPosts();

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
        boardCode: '감사기구게시판',
        data: {
          title,
          content,
          categoryCode: category,
          thumbNailImage: thumbnailImage,
        },
        postId: postId,
      });

      navigate(`/audit/${postId}`);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return {
    title,
    category,
    content,
    handleTitleChange,
    handleCategoryChange,
    handleContentChange,
    handleSubmit,
    isLoading,
  };
}
