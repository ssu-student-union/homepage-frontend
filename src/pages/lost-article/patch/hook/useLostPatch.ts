import { usePatchBoardPosts } from '@/hooks/api/patch/usePatchBoardPosts';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetBoardDetail } from '@/hooks/api/get/useGetBoardDetail';

export function useLostPatch() {
  const location = useLocation();
  const navigate = useNavigate();

  const postId: number = location.state?.postId;
  const boardCode: string = '분실물게시판';
  const { data: resp } = useGetBoardDetail({ boardCode, postId });
  const postDetail = resp?.data.postDetailResDto;

  const [title, setTitle] = useState<string>(postDetail?.title ?? '');
  const [category, setCategory] = useState<string>(postDetail?.category ?? '');
  const [content, setContent] = useState<string>(postDetail?.content ?? '');
  const imageList =
    postDetail?.fileResponseList?.filter((file) => file.fileType === 'images').map((file) => file.fileUrl) || [];
  const [thumbnailImage, setThumbnailImage] = useState<string>(imageList[0] ?? '');

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
        boardCode,
        posts: {
          title,
          content,
          categoryCode: category,
          thumbnailImage: thumbnailImage,
          postFileList: [],
        },
        postId,
      });

      navigate('/lost-article?category=state');
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
