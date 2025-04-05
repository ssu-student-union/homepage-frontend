import { usePatchBoardPosts } from '@/hooks/api/patch/usePatchBoardPosts';
import { useDelBoardFiles } from '@/hooks/api/del/useDelBoardFiles';
import { usePostBoardFiles } from '@/hooks/api/post/usePostBoardFiles';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useGetBoardDetail } from '@/hooks/api/get/useGetBoardDetail';
import { handleFileLists } from '../../auditEdit/utils/fileHandler';

export function useAuditPatch() {
  const location = useLocation();
  const navigate = useNavigate();

  const postId: number = location.state?.postId;
  const boardCode: string = '감사기구게시판';
  const { data: resp } = useGetBoardDetail({ boardCode, postId });
  const postDetail = resp?.data.postDetailResDto;

  const fileList =
    postDetail?.fileResponseList?.filter((file) => file.fileType === 'files').map((file) => file.fileUrl) || [];
  const fileNames =
    postDetail?.fileResponseList?.filter((file) => file.fileType === 'files').map((file) => file.fileName) || [];

  const imageList =
    postDetail?.fileResponseList?.filter((file) => file.fileType === 'images').map((file) => file.fileUrl) || [];
  const [thumbnailImage, setThumbnailImage] = useState<string>(imageList[0] ?? '');

  const [title, setTitle] = useState<string>(postDetail?.title ?? '');
  const [category, setCategory] = useState<string>(postDetail?.category ?? '');
  const [content, setContent] = useState<string>(postDetail?.content ?? '');
  const [deletedFiles, setDeletedFiles] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);

  const { mutateAsync: patchPost, isPending } = usePatchBoardPosts();
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
      if (deletedFiles.length > 0) {
        await deleteFiles({ boardCode, fileUrls: deletedFiles });
      }

      let uploadedFileList: number[] = [];
      if (newFiles.length > 0) {
        const uploadResponse = await uploadFiles({ boardCode, files: newFiles });
        uploadedFileList = handleFileLists(uploadResponse.data.data.postFiles);
      }

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

      navigate(`/audit/${postId}`, { state: { postId } });
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
    isPending,
  };
}
