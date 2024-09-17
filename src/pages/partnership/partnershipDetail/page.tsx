import { useLocation } from 'react-router-dom';
import { PartnershipDetailTopSection } from './container/PartnershipDetailTopSection';
import { PartnershipDetailContentSection } from './container/PartnershipDetailContentSection';
import { PartnershipDetailEditSection } from './container/PartnershipDetailEditSection';
import { useGetBoardDetail } from '@/hooks/useGetBoardDetail';
import { PartnershipDetailFileSection } from './container/PartnershipDetailFileSection';

export function PartnershipDetailPage() {
  const location = useLocation();
  const postId: number = location.state?.postId;
  const boardCode: string = '제휴게시판';

  const { data: resp } = useGetBoardDetail({ boardCode, postId });

  const postDetail = resp?.data.postDetailResDto;

  if (!postDetail) {
    return <div>로딩 중...</div>;
  }
  const fileNames =
    postDetail.fileResponseList?.filter((file) => file.fileType === 'files').map((file) => file.fileName) || [];
  const fileList =
    postDetail.fileResponseList?.filter((file) => file.fileType === 'files').map((file) => file.fileUrl) || [];
  const imageList =
    postDetail.fileResponseList?.filter((file) => file.fileType === 'images').map((file) => file.fileUrl) || [];
  const fileUrls = [...fileList, ...imageList];

  return (
    <div className="px-[120px] xs:px-[20px] sm:px-[20px] md:px-[40px]">
      <PartnershipDetailTopSection title={postDetail.title} date={postDetail.createdAt} />

      <PartnershipDetailContentSection content={postDetail.content} images={imageList} />

      <PartnershipDetailFileSection files={fileList} fileNames={fileNames} />

      <PartnershipDetailEditSection boardCode={boardCode} postId={postId} fileurl={fileUrls} />
    </div>
  );
}
