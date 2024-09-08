import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostBoardFiles } from '@/hooks/usePostBoardFiles';
import { usePostBoardPosts } from '@/hooks/usePostBoardPosts';
import { handleFileLists } from '../utils/fileHandler';

export function useNoticeEdit() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isUrgent, setIsUrgent] = useState<boolean>(false);

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

  const handleUrgentChange = (isUrgent: boolean) => {
    setIsUrgent(isUrgent);
  };

  const handleSubmit = async () => {
    try {
      const uploadResponse = await uploadFiles({
        boardCode: '공지사항게시판',
        files,
        images,
      });

      const { postFiles, thumbnailUrl } = uploadResponse.data.data;

      const thumbnailImage = thumbnailUrl;
      const postFileList = handleFileLists(postFiles);

      console.log(isUrgent);

      await createPost({
        boardCode: '공지사항게시판',
        post: {
          title,
          content,
          boardCode: '중앙기구',
          groupCode: '중앙운영위원회',
          thumbNailImage: thumbnailImage,
          isNotice: isUrgent,
          postFileList,
        },
      });

      navigate(`/notice?category=central&sub-category=all`);
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
    handleUrgentChange,
    handleSubmit,
    isLoading,
  };
}
