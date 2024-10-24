import { useDelBoardFiles } from '@/hooks/useDelBoardFiles';
import { useGetBoardDetail } from '@/hooks/useGetBoardDetail';
import { usePatchBoardPosts } from '@/hooks/usePatchBoardPosts';
import { usePostBoardFiles } from '@/hooks/usePostBoardFiles';
import { handleFileLists } from '@/pages/audit/auditEdit/utils/fileHandler';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function useNoticePatch() {
  const location = useLocation();
  const navigate = useNavigate();

  const postId: number = location.state?.data.postId;
  const boardCode: string = '공지사항게시판';

  const { data: resp } = useGetBoardDetail({ boardCode, postId });
  const postDetail = resp?.data.postDetailResDto;

  const fileList =
    postDetail?.fileResponseList?.filter((file) => file.fileType === 'files').map((file) => file.fileUrl) || [];
  const fileNames =
    postDetail?.fileResponseList?.filter((file) => file.fileType === 'files').map((file) => file.fileName) || [];
  const imageList =
    postDetail?.fileResponseList?.filter((file) => file.fileType === 'images').map((file) => file.fileUrl) || [];

  const [title, setTitle] = useState<string>(postDetail?.title ?? '');
  const [isUrgent, setIsUrgent] = useState<boolean>(false);
  const [content, setContent] = useState<string>(postDetail?.content ?? '');
  const [deletedFiles, setDeletedFiles] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [thumbnailImage, setThumbnailImage] = useState<string>(imageList[0] ?? '');

  const { mutateAsync: deleteFiles } = useDelBoardFiles();
  const { mutateAsync: uploadFiles } = usePostBoardFiles();
  const { mutateAsync: patchPost, isLoading }: any = usePatchBoardPosts();

  const handleTitleChange = (newTitle: string) => setTitle(newTitle);

  const handleUrgentChange = (isUrgent: boolean) => {
    setIsUrgent(isUrgent);
  };

  const handleContentChange = (newContent: string) => setContent(newContent);

  const handleFileDelete = (fileUrl: string) => {
    setDeletedFiles((prevDeleted) => [...prevDeleted, fileUrl]);
  };

  const handleSubmit = async () => {
    try {
      if (deletedFiles.length > 0) {
        await deleteFiles({ boardCode, fileUrls: deletedFiles });
      }

      let uploadedFileList: number[] = [];
      if (newFiles.length > 0) {
        const uploadResponse = await uploadFiles({ boardCode, files: newFiles });
        const { postFiles } = uploadResponse.data.data;
        uploadedFileList = handleFileLists(postFiles);
      }

      await patchPost({
        boardCode,
        postId,
        posts: {
          title,
          content,
          categoryCode: null,
          isNotice: isUrgent,
          thumbnailImage: thumbnailImage ? thumbnailImage : null,
          postFileList: uploadedFileList.length > 0 ? uploadedFileList : [],
        },
      });

      navigate(`/notice/${postId}`, { state: { postId } });
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
    fileList,
    handleUrgentChange,
    fileNames,
    handleTitleChange,
    handleContentChange,
    setThumbnailImage,
    handleFileDelete,
    setNewFiles,
    handleSubmit,
    isLoading,
  };
}
