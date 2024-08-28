import { useLocation } from 'react-router-dom';
import { PartnershipDetailTopSection } from './container/PartnershipDetailTopSection';
import { PartnershipDetailContentSection } from './container/PartnershipDetailContentSection';
import { PartnershipDetailEditSection } from './container/PartnershipDetailEditSection';
import { useGetBoardDetail } from '@/hooks/useGetBoardDetail';
import { useEffect } from 'react';

export function PartnershipDetailPage() {
  const location = useLocation();
  const postId: number = location.state?.postId;
  const boardCode: string = '제휴게시판';

  useEffect(() => {
    console.log(postId);
  }, [postId]);

  const { data: resp } = useGetBoardDetail({ boardCode, postId });

  const postDetail = resp?.data.postDetailResDto;

  if (!postDetail) {
    return <div></div>;
  }

  console.log(postDetail);

  return (
    <div className="px-[120px] xs:px-[20px] sm:px-[20px] md:px-[40px]">
      <PartnershipDetailTopSection title={postDetail.title} date={postDetail.createdAt} />
      <PartnershipDetailContentSection content={postDetail.content} images={postDetail.imageList} />
      {/* <PartnershipDetailFileSection file={postDetail.file} /> */}
      <PartnershipDetailEditSection boardCode={boardCode} postId={postId} />
    </div>
  );
}
