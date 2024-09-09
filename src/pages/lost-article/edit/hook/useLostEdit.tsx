import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostBoardFiles } from '@/hooks/usePostBoardFiles';
import { usePostBoardPosts } from '@/hooks/usePostBoardPosts';
import { handleFileLists } from '@/pages/audit/auditEdit/utils/fileHandler';

export function useLostEdit() {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const { mutateAsync: uploadFiles } = usePostBoardFiles();
  const { mutateAsync: createPost, isLoading }: any = usePostBoardPosts();

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
      const uploadResponse = await uploadFiles({
        boardCode: '분실물게시판',
        images,
      });

      const { postFiles, thumbnailUrl } = uploadResponse.data.data;

      const thumbnailImage = thumbnailUrl;
      const postFileList = handleFileLists(postFiles);

      await createPost({
        boardCode: '분실물게시판',
        post: {
          title,
          content,
          categoryCode: category,
          thumbNailImage: thumbnailImage,
          isNotice: false,
          postFileList,
        },
      });

      navigate(`/lost-article?category=state`);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return {
    images,
    title,
    category,
    content,
    setImages,
    handleTitleChange,
    handleCategoryChange,
    handleContentChange,
    handleSubmit,
    isLoading,
  };
}
