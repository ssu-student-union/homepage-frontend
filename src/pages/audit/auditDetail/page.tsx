import { useLocation } from 'react-router-dom';
import { AuditDetailTopSection } from './container/auditDetailTopSection';
import { AuditDetailContentSection } from './container/auditDetailContentSection';
import { AuditDetailEditSection } from './container/auditDetailEditSection';
import { useGetBoardDetail } from '@/hooks/useGetBoardDetail';
import { AuditDetailFileSection } from './container/auditDetailFileSection';
import AuditDetailLoading from './container/auditDetailLoading';
import { items } from '../const/data';

export function AuditDetailPage() {
  const location = useLocation();
  const postId: number = location.state?.postId;
  const boardCode: string = '감사기구게시판';

  const { data: resp, isLoading, isError } = useGetBoardDetail({ boardCode, postId });

  const postDetail = resp?.data.postDetailResDto;

  if (!postDetail || isError) {
    return <div>에러 발생!!!</div>;
  }

  const fileUrls = [...(postDetail.fileList || []), ...(postDetail.imageList || [])];

  return (
    <div className="px-[120px] xs:px-[20px] sm:px-[20px] md:px-[40px]">
      <AuditDetailTopSection items={items} title={postDetail.title} date={postDetail.createdAt} />
      {isLoading ? (
        <AuditDetailLoading />
      ) : (
        <>
          <AuditDetailContentSection content={postDetail.content} images={postDetail.imageList} />
          <AuditDetailFileSection files={postDetail.fileList} />
          <AuditDetailEditSection
            title={postDetail.title}
            content={postDetail.content}
            imageUrls={postDetail.imageList}
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
