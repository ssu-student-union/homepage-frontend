import { useParams } from 'react-router-dom';
import { ServiceNoticeData } from '../MockData';
import NoticeDetailLoading from '@/pages/notice/noticeDetail/container/noticeDetailLoading';
import { NoticeDetailContentSection } from '@/pages/notice/noticeDetail/container/noticeDetailContentSection';
import { ServiceNoticeDeatailTopSection } from './container/serviceNoticeDeatilTopSection';
import { ServiceNoticeDetailData } from '../MockData';
import { NoticeDetailFileSection } from '@/pages/notice/noticeDetail/container/noticeDetailFileSection';
import { ServiceNoticeDetailEditSection } from './container/serviceNoticeDetailEditSection';

export function ServiceNoticeDetailPage() {
  const { id } = useParams();
  const postid = Number(id);

  // id에 해당하는 게시글 데이터 찾기
  const post = ServiceNoticeData.data.postListResDto.find((item) => item.postId === Number(id));

  // post가 존재하는 경우 title과 date를 가져오고, 없으면 빈 값으로 처리
  const title = post ? post.title : '게시글을 찾을 수 없습니다.';
  const date = post ? post.date : '';
  const content = post ? post.content : '';
  const author = post ? post.author : 'IT지원위원회';

  const fileList =
    ServiceNoticeDetailData?.data?.postDetailResDto?.fileResponseList?.filter((file) => file.fileType === 'files').map((file) => file.fileUrl) || [];
  const fileNames =
  ServiceNoticeDetailData?.data?.postDetailResDto?.fileResponseList?.filter((file) => file.fileType === 'files').map((file) => file.fileName) || [];

  const imageList =
  ServiceNoticeDetailData?.data?.postDetailResDto?.fileResponseList?.filter((file) => file.fileType === 'images').map((file) => file.fileUrl) || [];

  const fileUrls = [...fileList, ...imageList];

  const boardCode: string = '서비스공지사항게시판';

  return (
    <div className="px-[120px] xs:px-[20px] sm:px-[20px] md:px-[40px]">
      <ServiceNoticeDeatailTopSection title={title} author={author} date={date} />
      {title === '게시글을 찾을 수 없습니다.' ? (
        <NoticeDetailLoading />
      ) : (
        <>
          <NoticeDetailContentSection content={content} images={imageList} />
          <NoticeDetailFileSection files={fileList} fileNames={fileNames} />
          <ServiceNoticeDetailEditSection
            title={ServiceNoticeDetailData.data.postDetailResDto.title}
            content={ServiceNoticeDetailData.data.postDetailResDto.content}
            isAuthor={ServiceNoticeDetailData.data.postDetailResDto.isAuthor}
            imageUrls={imageList}
            boardCode={boardCode}
            postId={postid}
            fileUrls={fileUrls}
          />
        </>
      )}
    </div>
  );
}
