import { useState } from 'react';
import { useNavigate } from 'react-router';
import { usePostBoardFiles } from '@/hooks/api/post/usePostBoardFiles';
import { usePostBoardPosts } from '@/hooks/api/post/usePostBoardPosts';
import { handleFileLists } from '../utils/fileHandler';

export function useAuditEdit() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
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
      if (images.length === 0) {
        alert('이미지 파일을 1개 이상 추가해주세요.');
        return;
      }
      if (category === '') {
        alert('카테고리를 선택해주세요.');
        return;
      }

      const uploadResponse = await uploadFiles({
        boardCode: '감사기구게시판',
        files,
        images,
      });

      const { postFiles, thumbnailUrl } = uploadResponse.data.data;

      const thumbnailImage = thumbnailUrl;
      const postFileList = handleFileLists(postFiles);

      await createPost({
        boardCode: '감사기구게시판',
        post: {
          title,
          content,
          categoryCode: category,
          thumbNailImage: thumbnailImage,
          isNotice: false,
          postFileList,
        },
      });

      navigate(`/audit?category=notice`);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    files,
    images,
    title,
    category,
    content,
    setFiles,
    setImages,
    handleTitleChange,
    handleCategoryChange,
    handleContentChange,
    handleSubmit,
    isPending,
  };
}
