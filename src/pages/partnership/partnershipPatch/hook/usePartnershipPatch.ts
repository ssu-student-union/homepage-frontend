import { usePatchBoardPosts } from '@/hooks/usePatchBoardPosts';
import { useDelBoardFiles } from '@/hooks/useDelBoardFiles';
import { usePostBoardFiles } from '@/hooks/usePostBoardFiles';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetBoardDetail } from '@/hooks/useGetBoardDetail';
import { handleFileLists } from '../../partnershipEdit/utils/fileHandler';

export function usePartnershipPatch() {
  const location = useLocation();
  const navigate = useNavigate();

  const postId: number = location.state?.postId;
  const boardCode: string = '제휴게시판';
  const { data: resp } = useGetBoardDetail({ boardCode, postId });
  const postDetail = resp?.data.postDetailResDto;

  // 파일과 이미지를 타입으로 구분하여 처리
  const fileList =
    postDetail?.fileResponseList?.filter((file) => file.fileType === 'files').map((file) => file.fileUrl) || [];
  const fileNames =
    postDetail?.fileResponseList?.filter((file) => file.fileType === 'files').map((file) => file.fileName) || [];

  const imageList =
    postDetail?.fileResponseList?.filter((file) => file.fileType === 'images').map((file) => file.fileUrl) || [];
  const [thumbnailImage, setThumbnailImage] = useState<string>(imageList[0] ?? '');

  const [title, setTitle] = useState<string>(postDetail?.title ?? '');
  const [category, setCategory] = useState<string>(postDetail?.categoryName ?? '');
  const [content, setContent] = useState<string>(postDetail?.content ?? '');
  const [deletedFiles, setDeletedFiles] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);

  const { mutateAsync: patchPost, isLoading }: any = usePatchBoardPosts();
  const { mutateAsync: deleteFiles } = useDelBoardFiles();
  const { mutateAsync: uploadFiles } = usePostBoardFiles();

  const handleTitleChange = (newTitle: string) => setTitle(newTitle);
  const handleCategoryChange = (newCategory: string) => setCategory(newCategory);
  const handleContentChange = (newContent: string) => setContent(newContent);

  const handleFileDelete = (fileUrl: string) => {
    setDeletedFiles((prev) => [...prev, fileUrl]);
  };

  const handleSubmit = async () => {
    try {
      // 삭제된 파일 처리
      if (deletedFiles.length > 0) {
        await deleteFiles({ boardCode, fileUrls: deletedFiles });
      }

      let uploadedFileList: number[] = [];
      if (newFiles.length > 0) {
        const uploadResponse = await uploadFiles({ boardCode, files: newFiles });
        uploadedFileList = handleFileLists(uploadResponse.data.data.postFiles);
      }

      // 게시물 수정 요청
      await patchPost({
        boardCode,
        postId,
        posts: {
          title,
          content,
          categoryCode: category,
          thumbnailImage,
          postFileList: uploadedFileList.length > 0 ? uploadedFileList : [0],
        },
      });

      navigate(`/partnership/${postId}`, { state: { postId } });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    postId,
    title,
    category,
    content,
    thumbnailImage,
    fileList,
    imageList,
    fileNames,
    handleTitleChange,
    handleCategoryChange,
    handleContentChange,
    setThumbnailImage,
    handleFileDelete,
    setNewFiles,
    handleSubmit,
    isLoading,
  };
}
