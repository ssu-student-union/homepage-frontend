import { useState } from 'react';
import { useNavigate } from 'react-router';
import { usePostBoardFiles } from '@/hooks/api/post/usePostBoardFiles';
import { usePostBoardPosts } from '@/hooks/api/post/usePostBoardPosts';
import { handleFileLists } from '../utils/fileHandler';
import { File as Data } from '@/types/apis/post';
import { useQueryClient } from '@tanstack/react-query';

export function useNoticeEdit() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isUrgent, setIsUrgent] = useState<boolean>(false);

  const { mutateAsync: uploadFiles } = usePostBoardFiles();
  const { mutateAsync: createPost, isPending } = usePostBoardPosts();

  const queryClient = useQueryClient();

  const NOTICE_BOARD_CODE = '공지사항게시판';
  const SERVICE_NOTICE_BOARD_CODE = '서비스공지사항';

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleUrgentChange = (isUrgent: boolean) => {
    setIsUrgent(isUrgent);
  };

  const handleSubmit = async () => {
    try {
      if (images.length === 0 && !isUrgent) {
        alert('이미지 파일을 1개 이상 추가해주세요.');
        return;
      }

      const uploadResponse = await uploadFiles({
        boardCode: '공지사항게시판',
        files,
        images,
      });

      const { postFiles, thumbnailUrl } = uploadResponse.data.data;

      const thumbnailImage = thumbnailUrl;
      const postFileList = handleFileLists(postFiles);

      // 로컬에 저장한 기구 정보 가져오기!
      let groupCodeList: string[] | null = JSON.parse(localStorage.getItem('groupCodeList') || 'null');

      // null 검사... 멍청한 컴퓨터 같으니...
      if (groupCodeList === null) {
        groupCodeList = ['']; // 기본값 없음으로 해서 오류 시 서버에만 쌓이게 하기(게시판엔 안 보여짐!)
      }

      const createPostResponse = await createPost({
        boardCode: '공지사항게시판',
        post: {
          title,
          content,
          groupCode: groupCodeList[0],
          memberCode: localStorage.getItem('memberName'),
          thumbNailImage: thumbnailImage,
          isNotice: isUrgent,
          postFileList,
        },
      });

      const postId = createPostResponse.data.post_id;

      queryClient.invalidateQueries({
        queryKey: ['get-board-boardCode-posts-search', NOTICE_BOARD_CODE],
      });

      navigate(`/notice/${postId}`);
    } catch (e) {
      console.error(e);
    }
  };

  const handleServiceSubmit = async () => {
    try {
      if (!title.trim()) {
        alert('제목을 입력해주세요.');
        return;
      }
      if (!content.trim()) {
        alert('내용을 입력해주세요.');
        return;
      }

      let uploadResponse = null;
      let postFiles: Data[] = [];
      let thumbnailUrl: string | null = null;

      if (images.length > 0) {
        uploadResponse = await uploadFiles({
          boardCode: '서비스공지사항',
          files,
          images,
        });

        postFiles = uploadResponse.data.data.postFiles;
        thumbnailUrl = uploadResponse.data.data.thumbnailUrl;
      }

      const postFileList = handleFileLists(postFiles);

      const groupCodeList: string[] = JSON.parse(localStorage.getItem('groupCodeList') ?? 'null') ?? [''];

      const createPostResponse = await createPost({
        boardCode: '서비스공지사항',
        post: {
          title,
          content,
          groupCode: groupCodeList[0],
          memberCode: localStorage.getItem('memberName'),
          thumbNailImage: thumbnailUrl,
          isNotice: isUrgent,
          postFileList,
        },
      });

      const postId = createPostResponse?.data.post_id;

      queryClient.invalidateQueries({
        queryKey: ['get-board-boardCode-posts', SERVICE_NOTICE_BOARD_CODE],
      });

      navigate(`/service-notice/${postId}`);
    } catch (e) {
      console.error(e);
    }
  };

  return {
    files,
    images,
    title,
    content,
    setFiles,
    setImages,
    handleTitleChange,
    handleContentChange,
    handleUrgentChange,
    handleSubmit,
    handleServiceSubmit,
    isPending,
  };
}
