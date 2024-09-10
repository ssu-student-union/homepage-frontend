import { usePatchBoardPosts } from '@/hooks/usePatchBoardPosts';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useNoticePatch() {
  const location = useLocation();
  const data = location.state?.data || {};
  const postId: number = data.postId ?? 0;
  const imageList: string[] = data.imageUrls ?? [];
  const initialThumbNailImage: string = data.thumbNailImage ?? '';

  const navigate = useNavigate();
  const [title, setTitle] = useState<string>(data.title ?? '');
  const [content, setContent] = useState<string>(data.content ?? '');
  const [thumbnailImage, setThumbnailImage] = useState<string>(initialThumbNailImage);
  const [isUrgent, setIsUrgent] = useState<boolean>(false);
  const { mutateAsync: patchPost, isLoading }: any = usePatchBoardPosts();

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleUrgentChange = (isUrgent: boolean) => {
    setIsUrgent(isUrgent);
  };

  const handleSubmit = async () => {
    try {
      await patchPost({
        boardCode: '공지사항게시판',
        data: {
          title,
          content,
          thumbNailImage: thumbnailImage,
          isNotice: isUrgent,
        },
        postId: postId,
      });

      navigate('/notice/postId');
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return {
    postId,
    title,
    content,
    thumbnailImage,
    imageList,
    handleTitleChange,
    handleContentChange,
    setThumbnailImage,
    handleUrgentChange,
    handleSubmit,
    isLoading,
  };
}
