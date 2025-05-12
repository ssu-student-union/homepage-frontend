import { useState } from 'react';
import { useNavigate } from 'react-router';
import { usePostBoardFiles } from '@/hooks/api/post/usePostBoardFiles';
import { usePostBoardPosts } from '@/hooks/api/post/usePostBoardPosts';
import { handleFileLists } from '@/pages/audit/edit/utils/fileHandler';

export function useLostEdit() {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const { mutateAsync: uploadFiles } = usePostBoardFiles();
  const { mutateAsync: createPost, isPending } = usePostBoardPosts();

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
      if (category === '') {
        alert('카테고리를 선택해주세요.');
        return;
      }

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
    isPending,
  };
}
