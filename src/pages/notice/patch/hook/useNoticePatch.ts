import { useDelBoardFiles } from '@/hooks/deprecated/del/useDelBoardFiles';
import { usePatchBoardPosts } from '@/hooks/deprecated/patch/usePatchBoardPosts';
import { usePostBoardFiles } from '@/hooks/deprecated/post/usePostBoardFiles';
import { handleFileLists } from '@/pages/audit/edit/utils/fileHandler';
import { NoticePost } from '@/pages/notice/schema';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router';

interface useNoticePatchProps {
  boardCode: string;
  postDetail?: NoticePost;
  postId: number;
}

export function useNoticePatch({ postDetail, boardCode, postId }: useNoticePatchProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const fileList =
    postDetail?.fileResponseList?.filter((file) => file.fileType === 'files').map((file) => file.fileUrl) || [];
  const fileNames =
    postDetail?.fileResponseList?.filter((file) => file.fileType === 'files').map((file) => file.fileName) || [];
  const imageList =
    postDetail?.fileResponseList?.filter((file) => file.fileType === 'images').map((file) => file.fileUrl) || [];

  const [title, setTitle] = useState<string>(postDetail?.title ?? '');
  const [isUrgent, setIsUrgent] = useState<boolean>(postDetail?.status === '긴급공지');
  const [content, setContent] = useState<string>(postDetail?.content ?? '');
  const [deletedFiles, setDeletedFiles] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [thumbnailImage, setThumbnailImage] = useState<string>(imageList[0] ?? '');

  const { mutateAsync: deleteFiles } = useDelBoardFiles();
  const { mutateAsync: uploadFiles } = usePostBoardFiles();
  const { mutateAsync: patchPost, isPending } = usePatchBoardPosts();

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

      if (boardCode === '공지사항게시판') {
        await queryClient.invalidateQueries({ queryKey: ['getPost', boardCode, postId] });
        await queryClient.invalidateQueries({ queryKey: ['searchPosts', '공지사항게시판'] });
        navigate(`/notice/${postId}`, { state: { postId } });
      } else if (boardCode === '서비스공지사항') {
        await queryClient.invalidateQueries({ queryKey: ['getPost', boardCode, postId] });
        await queryClient.invalidateQueries({ queryKey: ['get-board-boardCode-posts', '서비스공지사항'] });
        navigate(`/service-notice/${postId}`, { state: { postId } });
      }
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
    isPending,
    isUrgent,
    setIsUrgent,
  };
}
