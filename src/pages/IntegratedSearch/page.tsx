import { BoardHeader } from '@/components/BoardHeader';
import { useSearchParams } from 'react-router';
import { Subtitle } from './component/Subtitle';
import { PostCard } from '@/components/PostCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { DataContentItem } from '@/pages/data/components/DataContentItem';
import { ServiceNoticePostContent } from '@/pages/mypage/service-notice/component/ServiceNoticePostContent';

// 임시 데이터
const mockNoticePosts = [
  {
    postId: 1,
    title: '2024학년도 1학기 수강신청 안내',
    boardName: '학사공지',
    date: new Date().toISOString(),
    isNew: true,
  },
  {
    postId: 2,
    title: '도서관 열람실 이용 안내',
    boardName: '시설공지',
    date: new Date(Date.now() - 86400000).toISOString(),
    isNew: false,
  },
  {
    postId: 3,
    title: '장학금 신청 접수 시작',
    boardName: '장학공지',
    date: new Date().toISOString(),
    isNew: true,
  },
  {
    postId: 4,
    title: '캠퍼스 주차장 공사 안내',
    boardName: '시설공지',
    date: new Date(Date.now() - 172800000).toISOString(),
    isNew: false,
  },
];

const mockDataPosts = [
  {
    postId: 1,
    title: 'Python 프로그래밍 기초 강의자료',
    content: '프로그래밍',
    date: new Date(),
    isNotice: false,
    files: [
      { postFileId: 1, fileName: 'python_basic.pdf', fileType: 'pdf', fileUrl: '/files/python_basic.pdf' },
    ],
  },
  {
    postId: 2,
    title: '2024학년도 학사일정표',
    content: '학사',
    date: new Date(Date.now() - 86400000),
    isNotice: true,
    files: [
      { postFileId: 2, fileName: 'schedule_2024.xlsx', fileType: 'xlsx', fileUrl: '/files/schedule.xlsx' },
    ],
  },
  {
    postId: 3,
    title: '데이터구조 실습 자료',
    content: '프로그래밍',
    date: new Date(Date.now() - 172800000),
    isNotice: false,
    files: [
      { postFileId: 3, fileName: 'data_structure.zip', fileType: 'zip', fileUrl: '/files/data_structure.zip' },
    ],
  },
];

const mockServiceNoticePosts = [
  {
    postId: 1,
    title: '홈페이지 정기 점검 안내',
    date: new Date().toISOString(),
    Emergency: true,
  },
  {
    postId: 2,
    title: '새로운 기능 업데이트 안내',
    date: new Date(Date.now() - 86400000).toISOString(),
    Emergency: false,
  },
  {
    postId: 3,
    title: '서버 점검 완료 안내',
    date: new Date(Date.now() - 172800000).toISOString(),
    Emergency: false,
  },
];

export function IntegratedSearch() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('q') || '';
  const navigate = useNavigate();
  const { t } = useTranslation();

  // 임시 페이지네이션 상태 (나중에 실제 API 데이터로 교체)
  const currentPage = 1;
  const totalPages = 3;

  return (
    <>
      <BoardHeader title="통합검색" className="border-b-neutral-200 max-md:px-5 md:border-b" />
      <div className="flex w-full justify-center">
        <div className="w-full max-w-[1530px] md:px-[72px] lg:px-[200px]">
          <div className="flex w-full text-3xl font-bold">
            <span className="text-[#2F4BF7]">"{keyword}"</span>에 대한 검색 결과
          </div>
          <div className="mt-32 flex w-full flex-col items-center gap-[120px]">
            <div>
              <Subtitle title="중앙/단과대 공지사항" count={mockNoticePosts.length} />
              <div className="flex flex-col gap-16 md:items-center">
                <div className="grid grid-cols-1 place-items-stretch gap-7 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {mockNoticePosts.map((post) => (
                    <PostCard key={post.postId} post={post} to={`/notice/${post.postId}`} />
                  ))}
                </div>
                <Button
                  onClick={() => {
                    // 다음 페이지 로드 로직 (API 연결 시 구현)
                  }}
                  className="mx-auto h-[30px] w-[87px] rounded-full px-4 py-2 text-[12px] md:mx-0 md:size-fit md:text-[1rem]"
                >
                  더보기 ({currentPage}/{totalPages})
                </Button>
              </div>
            </div>
            <div className="w-full">
              <Subtitle title="자료집" count={mockDataPosts.length} />
              <div className="flex flex-col gap-16 md:items-center">
                <div className="flex flex-col border-t border-t-gray-200">
                  {mockDataPosts.map((post) => (
                    <DataContentItem
                      key={post.postId}
                      to={`/data/${post.postId}`}
                      title={post.title}
                      content={post.content}
                      date={post.date}
                      isNotice={post.isNotice}
                      files={post.files}
                    />
                  ))}
                </div>
                <Button
                  onClick={() => {
                    // 다음 페이지 로드 로직 (API 연결 시 구현)
                  }}
                  className="mx-auto h-[30px] w-[87px] rounded-full px-4 py-2 text-[12px] md:mx-0 md:size-fit md:text-[1rem]"
                >
                  더보기 ({currentPage}/{totalPages})
                </Button>
              </div>
            </div>
            <div className="w-full">
              <Subtitle title="서비스 공지사항" count={mockServiceNoticePosts.length} />
              <div className="flex flex-col gap-16 md:items-center">
                <div className="flex w-full flex-col">
                  {mockServiceNoticePosts.map((post) => (
                    <ServiceNoticePostContent
                      key={post.postId}
                      to={`/service-notice/${post.postId}`}
                      postId={post.postId.toString()}
                      title={post.title}
                      date={post.date}
                      Emergency={post.Emergency}
                    />
                  ))}
                </div>
                <Button
                  onClick={() => {
                    // 다음 페이지 로드 로직 (API 연결 시 구현)
                  }}
                  className="mx-auto h-[30px] w-[87px] rounded-full px-4 py-2 text-[12px] md:mx-0 md:size-fit md:text-[1rem]"
                >
                  더보기 ({currentPage}/{totalPages})
                </Button>
              </div>
            </div>
            <Subtitle title="건의게시판" count={0} />
          </div>
        </div>
      </div>
    </>
  );
}
