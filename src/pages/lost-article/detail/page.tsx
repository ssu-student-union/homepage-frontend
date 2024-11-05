import { useGetBoardDetail } from '@/hooks/useGetBoardDetail';
import { AuditDetailContentSection } from '@/pages/audit/auditDetail/container/auditDetailContentSection';
import { AuditDetailEditSection } from '@/pages/audit/auditDetail/container/auditDetailEditSection';
import AuditDetailLoading from '@/pages/audit/auditDetail/container/auditDetailLoading';
import { useLocation } from 'react-router-dom';
import { items } from './const/data';
import { LostDetailTopSection } from './container/lostDetailTopSection';
import { AuditDetailFileSection } from '@/pages/audit/auditDetail/auditDetailFileSection';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export function LostDetailPage() {
  const location = useLocation();
  const postId: number = location.state?.postId;
  const boardCode: string = '분실물게시판';

  const queryClient = useQueryClient();
  const { data: resp, isLoading, isError, refetch } = useGetBoardDetail({ boardCode, postId });

  useEffect(() => {
    if (!queryClient.getQueryData(['get-board-boardCode-posts-postId'])) {
      refetch();
    }
  }, [queryClient, refetch]);

  const postDetail = resp?.data.postDetailResDto;

  if (!postDetail || isError) {
    return <div>에러 발생!!!</div>;
  }

  // 파일과 이미지 리스트를 타입별로 구분하여 처리
  const fileNameList =
    postDetail.fileResponseList?.filter((file) => file.fileType === 'files').map((file) => file.fileName) || [];

  const fileList =
    postDetail.fileResponseList?.filter((file) => file.fileType === 'files').map((file) => file.fileUrl) || [];

  const imageList =
    postDetail.fileResponseList?.filter((file) => file.fileType === 'images').map((file) => file.fileUrl) || [];

  const fileUrls = [...fileList, ...imageList]; // 모든 파일과 이미지 URL을 합친 리스트

  return (
    <div className="px-[120px] xs:px-[20px] sm:px-[20px] md:px-[40px]">
      <LostDetailTopSection
        studentId={postDetail.studentId ? postDetail.studentId : postDetail.authorName}
        isCouncil={postDetail.studentId === null}
        items={items}
        title={postDetail.title}
        date={postDetail.createdAt}
      />
      {isLoading ? (
        <AuditDetailLoading />
      ) : (
        <>
          <AuditDetailContentSection content={postDetail.content} images={imageList} />
          <AuditDetailFileSection files={fileList} fileNames={fileNameList} />
          <AuditDetailEditSection
            title={postDetail.title}
            content={postDetail.content}
            authority={postDetail.allowedAuthorities}
            isAuthor={postDetail.isAuthor}
            imageUrls={imageList}
            boardCode={boardCode}
            postId={postId}
            fileUrls={fileUrls}
            baseUrl="/lost-article"
            noticeUrl="/lost-article?category=state"
          />
        </>
      )}
    </div>
  );
}
