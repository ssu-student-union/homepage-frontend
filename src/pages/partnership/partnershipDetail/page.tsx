import { PartnershipDetailTopSection } from './container/PartnershipDetailTopSection';
import { PartnershipDetailContentSection } from './container/PartnershipDetailContentSection';
import { PartnershipDetailEditSection } from './container/PartnershipDetailEditSection';
import { useGetBoardDetail } from '@/hooks/api/get/useGetBoardDetail';
import { PartnershipDetailFileSection } from './container/PartnershipDetailFileSection';
import { usePostId } from '@/hooks/usePostId';

export function PartnershipDetailPage() {
  const postId = usePostId();
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
      <PartnershipDetailTopSection
        title={postDetail.title}
        date={postDetail.createdAt}
        writer={postDetail.authorName}
      />

      <PartnershipDetailContentSection content={postDetail.content} images={imageList} />

      <PartnershipDetailFileSection files={fileList} fileNames={fileNames} />

      <PartnershipDetailEditSection
        boardCode={boardCode}
        postId={postId}
        fileurl={fileUrls}
        authority={resp.data.postDetailResDto.isAuthor}
      />
    </div>
  );
}
