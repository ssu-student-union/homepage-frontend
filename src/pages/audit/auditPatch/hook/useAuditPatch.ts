import { useEffect, useState } from 'react';
import { usePatchBoardPosts } from '@/hooks/usePatchBoardPosts';
import { useNavigate } from 'react-router-dom';
import { handleCardClick } from '../../utils/cardHandler';
import { usePostBoardFiles } from '@/hooks/usePostBoardFiles';
import { handleFileLists } from '../../auditEdit/utils/fileHandler';

interface UseAuditPatchProps {
  postId: number;
  imageList: string[];
  initialTitle: string;
  initialCategory: string;
  initialContent: string;
  initialThumbnailImage: string;
}

export function useAuditPatch({
  postId,
  imageList,
  initialTitle,
  initialCategory,
  initialContent,
  initialThumbnailImage,
}: UseAuditPatchProps) {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>(initialTitle);
  const [category, setCategory] = useState<string>(initialCategory);
  const [content, setContent] = useState<string>(initialContent);
  const [newThumbnailImage, setThumbnailImage] = useState<string>(initialThumbnailImage);
  const [files, setFiles] = useState<File[]>([]);
  const { mutateAsync: patchPost, isLoading }: any = usePatchBoardPosts();
  const { mutateAsync: uploadFiles } = usePostBoardFiles();

  useEffect(() => {
    setTitle(initialTitle);
    setCategory(initialCategory);
    setContent(initialContent);
    setThumbnailImage(initialThumbnailImage);
  }, [initialTitle, initialCategory, initialContent, initialThumbnailImage]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleThumbnailImage = (newImage: string) => {
    setThumbnailImage(newImage);
    console.log(newImage);
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
      });

      const { postFiles } = uploadResponse.data.data;
      const postFileList = handleFileLists(postFiles);

      console.log(newThumbnailImage);

      await patchPost({
        boardCode: '감사기구게시판',
        posts: {
          title,
          content,
          categoryCode: category,
          thumbnailImage: newThumbnailImage,
          postFileList: postFileList,
        },
        postId: postId,
      });

      handleCardClick(postId.toString(), postId, category, newThumbnailImage, navigate);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return {
    title,
    category,
    content,
    newThumbnailImage,
    imageList,
    setFiles,
    handleTitleChange,
    handleCategoryChange,
    handleContentChange,
    handleThumbnailImage,
    handleSubmit,
    isLoading,
  };
}
