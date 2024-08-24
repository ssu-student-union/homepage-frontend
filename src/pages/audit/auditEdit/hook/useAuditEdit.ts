import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostBoardFiles } from '@/hooks/usePostBoardFiles';
import { usePostBoardPosts } from '@/hooks/usePostBoardPosts';
import { handleFileLists, handleThumbnailImage } from '../utils/fileHandler';

export function useAuditEdit() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const { mutateAsync: uploadFiles } = usePostBoardFiles();
  const { mutateAsync: createPost, isLoading } = usePostBoardPosts();

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
        boardCode: '감사기구게시판',
        files,
        images,
      });

      const uploadedFiles = uploadResponse.data.data;

      const thumbnailImage = handleThumbnailImage(uploadedFiles);
      const postFileList = handleFileLists(uploadedFiles);

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

      navigate(-1);
      console.log('게시물 작성이 완료되었습니다.');
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
    isLoading,
  };
}
