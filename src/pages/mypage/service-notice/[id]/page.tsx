import { useParams } from 'react-router';
import NoticeDetailLoading from '@/pages/notice/[id]/container/noticeDetailLoading';
import { NoticeDetailContentSection } from '@/pages/notice/[id]/container/noticeDetailContentSection';
import { ServiceNoticeDeatailTopSection } from './container/serviceNoticeDeatilTopSection';
import { NoticeDetailFileSection } from '@/pages/notice/[id]/container/noticeDetailFileSection';
import { ServiceNoticeDetailEditSection } from './container/serviceNoticeDetailEditSection';
import { useGetBoardDetail } from '@/hooks/deprecated/get/useGetBoardDetail';

export function ServiceNoticeDetailPage() {
  const { id } = useParams();
  const postId = Number(id);
  const boardCode: string = '서비스공지사항';
  // id에 해당하는 게시글 데이터 찾기
  const { data, isLoading, isError } = useGetBoardDetail({ boardCode, postId });

  // post가 존재하는 경우 title과 date를 가져오고, 없으면 빈 값으로 처리
  const title = data ? data.data.postDetailResDto.title : '게시글을 찾을 수 없습니다.';
  const date = data ? data.data.postDetailResDto.createdAt : '';
  const content = data ? data.data.postDetailResDto.content : '';
  const author = data ? data.data.postDetailResDto.authorName : 'IT지원위원회';

  const fileList =
    data?.data?.postDetailResDto?.fileResponseList
      ?.filter((file) => file.fileType === 'files')
      .map((file) => file.fileUrl) ?? [];
  const fileNames =
    data?.data?.postDetailResDto?.fileResponseList
      ?.filter((file) => file.fileType === 'files')
      .map((file) => file.fileName) ?? [];

  const imageList =
    data?.data?.postDetailResDto?.fileResponseList
      ?.filter((file) => file.fileType === 'images')
      .map((file) => file.fileUrl) ?? [];

  const fileUrls = [...fileList, ...imageList];

  return (
    <>
      {isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <NoticeDetailLoading />
        </div>
      ) : isError ? (
        <div>오류 발생. 관리자에게 문의하세요.</div>
      ) : (
        <div className="px-[20px] md:px-[40px] lg:px-[120px]">
          <ServiceNoticeDeatailTopSection title={title} author={author} date={date} />
          {title === '게시글을 찾을 수 없습니다.' ? (
            <NoticeDetailLoading />
          ) : (
            <>
              <NoticeDetailContentSection content={content} images={imageList} />
              <NoticeDetailFileSection files={fileList} fileNames={fileNames} />
              <ServiceNoticeDetailEditSection
                title={title}
                content={content}
                isAuthor={data?.data.postDetailResDto.isAuthor}
                imageUrls={imageList}
                boardCode={boardCode}
                postId={postId}
                fileUrls={fileUrls}
              />
            </>
          )}
        </div>
      )}
    </>
  );
}
