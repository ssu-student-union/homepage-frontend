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

  const [title, setTitle] = useState<string>(postDetail?.title ?? '');
  const [content, setContent] = useState<string>(postDetail?.content ?? '');
  const [imageList] = useState<string[]>(postDetail?.imageList ?? []);
  const [fileList, setFileList] = useState<string[]>(postDetail?.fileList ?? []);
  const [deletedFiles, setDeletedFiles] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [thumbnailImage, setThumbnailImage] = useState<string>(postDetail?.imageList[0] ?? '');

  const { mutateAsync: deleteFiles } = useDelBoardFiles();
  const { mutateAsync: uploadFiles } = usePostBoardFiles();
  const { mutateAsync: patchPost, isLoading }: any = usePatchBoardPosts();

  const handleTitleChange = (newTitle: string) => {
    console.log('Title changed to:', newTitle);
    setTitle(newTitle);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleFileDelete = (fileUrl: string) => {
    setFileList((prevList) => prevList.filter((file) => file !== fileUrl));
    setDeletedFiles((prevDeleted) => [...prevDeleted, fileUrl]);
  };

  const handleSubmit = async () => {
    try {
      if (deletedFiles.length > 0) {
        await deleteFiles({ boardCode, fileUrls: deletedFiles });
      }

      let uploadedFileList: number[] = [];
      let uploadedThumbnail = thumbnailImage;

      if (newFiles.length > 0) {
        const uploadResponse = await uploadFiles({
          boardCode,
          files: newFiles,
        });

        const { postFiles } = uploadResponse.data.data;
        uploadedFileList = handleFileLists(postFiles);
      }

      await patchPost({
        boardCode,
        postId,
        posts: {
          title,
          content,
          thumbNailImage: uploadedThumbnail,
          postFileList: uploadedFileList.length > 0 ? uploadedFileList : [0],
        },
      });

      navigate(`/notice/${postId}`);
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
    handleTitleChange,
    handleContentChange,
    setThumbnailImage,
    handleFileDelete,
    setNewFiles,
    handleSubmit,
    isLoading,
  };
}
