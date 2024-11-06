import { AuditDetailTopSection } from './container/auditDetailTopSection';
import { AuditDetailContentSection } from './container/auditDetailContentSection';
import { AuditDetailEditSection } from './container/auditDetailEditSection';
import { useGetBoardDetail } from '@/hooks/api/get/useGetBoardDetail';
import AuditDetailLoading from './container/auditDetailLoading';
import { items } from '../const/data';
import { AuditDetailFileSection } from './auditDetailFileSection';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { usePostId } from '@/hooks/usePostId';

export function AuditDetailPage() {
  const postId = usePostId();
  const boardCode: string = '감사기구게시판';

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

  const fileNameList =
    postDetail.fileResponseList?.filter((file) => file.fileType === 'files').map((file) => file.fileName) || [];

  const fileList =
    postDetail.fileResponseList?.filter((file) => file.fileType === 'files').map((file) => file.fileUrl) || [];
  const imageList =
    postDetail.fileResponseList?.filter((file) => file.fileType === 'images').map((file) => file.fileUrl) || [];

  const fileUrls = [...fileList, ...imageList];

  return (
    <div className="px-[120px] xs:px-[20px] sm:px-[20px] md:px-[40px]">
      <AuditDetailTopSection
        items={items}
        title={postDetail.title}
        date={postDetail.createdAt}
        authorName={postDetail.authorName}
      />
      {isLoading ? (
        <AuditDetailLoading />
      ) : (
        <>
          <AuditDetailContentSection content={postDetail.content} images={imageList} />
          <AuditDetailFileSection files={fileList} fileNames={fileNameList} />
          <AuditDetailEditSection
            authority={postDetail.allowedAuthorities}
            isAuthor={postDetail.isAuthor}
            title={postDetail.title}
            content={postDetail.content}
            imageUrls={imageList}
            boardCode={boardCode}
            postId={postId}
            fileUrls={fileUrls}
            baseUrl="/audit"
            noticeUrl="/audit?category=notice"
          />
        </>
      )}
    </div>
  );
}
