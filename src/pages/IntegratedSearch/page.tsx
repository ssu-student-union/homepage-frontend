import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { BoardHeader } from '@/components/BoardHeader';
import { Subtitle } from './component/Subtitle';
import { PostCard } from '@/components/PostCard';
import { Button } from '@/components/ui/button';
// import { useNavigate } from 'react-router';
// import { useTranslation } from 'react-i18next';
import { DataContentItem } from '@/pages/data/components/DataContentItem';
import { ServiceNoticePostContent } from '@/pages/mypage/service-notice/component/ServiceNoticePostContent';
import { PostContent } from '@/components/PostContent';

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

// --- 임시 데이터 ---
const mockNoticePosts = [
  { postId: 1, title: '2024학년도 1학기 수강신청 안내', boardName: '학사공지', date: new Date().toISOString(), isNew: true },
  { postId: 2, title: '도서관 열람실 이용 안내', boardName: '시설공지', date: new Date(Date.now() - 86400000).toISOString(), isNew: false },
  { postId: 3, title: '장학금 신청 접수 시작', boardName: '장학공지', date: new Date().toISOString(), isNew: true },
  { postId: 4, title: '캠퍼스 주차장 공사 안내', boardName: '시설공지', date: new Date(Date.now() - 172800000).toISOString(), isNew: false },
  { postId: 5, title: '추가 공지 1', boardName: '학사공지', date: new Date().toISOString(), isNew: false },
  { postId: 6, title: '추가 공지 2', boardName: '학사공지', date: new Date().toISOString(), isNew: false },
  { postId: 7, title: '추가 공지 3', boardName: '학사공지', date: new Date().toISOString(), isNew: false },
  { postId: 8, title: '추가 공지 4', boardName: '학사공지', date: new Date().toISOString(), isNew: false },
];

const mockDataPosts = [
  {
    postId: 1,
    title: 'Python 프로그래밍 기초 강의자료',
    content: '프로그래밍',
    date: new Date(),
    isNotice: false,
    files: [{ postFileId: 1, fileName: 'python_basic.pdf', fileType: 'pdf', fileUrl: '/files/python_basic.pdf' }],
  },
  {
    postId: 2,
    title: '2024학년도 학사일정표',
    content: '학사',
    date: new Date(Date.now() - 86400000),
    isNotice: true,
    files: [{ postFileId: 2, fileName: 'schedule_2024.xlsx', fileType: 'xlsx', fileUrl: '/files/schedule.xlsx' }],
  },
  {
    postId: 3,
    title: '데이터구조 실습 자료',
    content: '프로그래밍',
    date: new Date(Date.now() - 172800000),
    isNotice: false,
    files: [{ postFileId: 3, fileName: 'data_structure.zip', fileType: 'zip', fileUrl: '/files/data_structure.zip' }],
  },
];

const mockServiceNoticePosts = [
  { postId: 1, title: '홈페이지 정기 점검 안내', date: new Date().toISOString(), Emergency: true },
  { postId: 2, title: '새로운 기능 업데이트 안내', date: new Date(Date.now() - 86400000).toISOString(), Emergency: false },
  { postId: 3, title: '서버 점검 완료 안내', date: new Date(Date.now() - 172800000).toISOString(), Emergency: false },
];

const mockSuggestPosts = [
  { postId: 1, title: '학생식당 메뉴 개선 건의', category: '답변대기' as const, author: '홍길동', date: new Date() },
  { postId: 2, title: '도서관 열람실 확대 요청', category: '답변완료' as const, author: '김철수', date: new Date(Date.now() - 86400000) },
  { postId: 3, title: '캠퍼스 와이파이 속도 개선 문의', category: '답변대기' as const, author: '이영희', date: new Date(Date.now() - 172800000) },
];

const categoryColors: { [category: string]: string } = {
  답변대기: 'text-gray-500',
  답변완료: 'text-primary',
} as const;

export function IntegratedSearch() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('q') || '';
  // const navigate = useNavigate();
  // const { t } = useTranslation();

  // 각 섹션별 표시할 행 수 상태
  const [noticeRows, setNoticeRows] = useState(1);
  const [dataRows, setDataRows] = useState(1);
  const [serviceRows, setServiceRows] = useState(1);
  const [suggestRows, setSuggestRows] = useState(1);

  // 윈도우 너비 감지
  const windowWidth = useWindowWidth();

  // 공지사항 그리드 컬럼 수 계산
  const noticeColumns = useMemo(() => {
    if (windowWidth < 720) return 1;
    if (windowWidth < 1440) return 3;
    return 4;
  }, [windowWidth]);

  // 리스트형 섹션의 한 페이지당 아이템 수
  const listItemsPerPage = 3;

  // 각 섹션별 표시할 아이템
  const displayedNoticePosts = useMemo(() => {
    return mockNoticePosts.slice(0, noticeRows * noticeColumns);
  }, [noticeRows, noticeColumns]);

  const displayedDataPosts = useMemo(() => {
    return mockDataPosts.slice(0, dataRows * listItemsPerPage);
  }, [dataRows]);

  const displayedServicePosts = useMemo(() => {
    return mockServiceNoticePosts.slice(0, serviceRows * listItemsPerPage);
  }, [serviceRows]);

  const displayedSuggestPosts = useMemo(() => {
    return mockSuggestPosts.slice(0, suggestRows * listItemsPerPage);
  }, [suggestRows]);

  // 더보기 버튼 표시 여부
  const hasMoreNotices = displayedNoticePosts.length < mockNoticePosts.length;
  const hasMoreData = displayedDataPosts.length < mockDataPosts.length;
  const hasMoreService = displayedServicePosts.length < mockServiceNoticePosts.length;
  const hasMoreSuggest = displayedSuggestPosts.length < mockSuggestPosts.length;

  // 현재/전체 페이지 계산
  const noticeCurrentPage = noticeRows;
  const noticeTotalPages = Math.ceil(mockNoticePosts.length / noticeColumns);

  const dataCurrentPage = dataRows;
  const dataTotalPages = Math.ceil(mockDataPosts.length / listItemsPerPage);

  const serviceCurrentPage = serviceRows;
  const serviceTotalPages = Math.ceil(mockServiceNoticePosts.length / listItemsPerPage);

  const suggestCurrentPage = suggestRows;
  const suggestTotalPages = Math.ceil(mockSuggestPosts.length / listItemsPerPage);

  return (
    <>
      <BoardHeader title="통합검색" className="border-b-neutral-200 max-md:px-5 md:border-b" />
      <div className="flex w-full justify-center mb-10">
        <div className="w-full max-w-[1530px] md:px-[72px] lg:px-[200px]">
          <div className="flex w-full text-3xl font-bold">
            <span className="text-[#2F4BF7]">"{keyword}"</span>에 대한 검색 결과
          </div>
          <div className="mt-32 flex w-full flex-col items-center gap-[120px]">
            
            {/* --- 공지사항 --- */}
            <div>
              <Subtitle title="중앙/단과대 공지사항" count={mockNoticePosts.length} />
              <div className="flex flex-col gap-16 md:items-center">
                <div className="grid grid-cols-1 place-items-stretch gap-7 min-[720px]:grid-cols-3 min-[1440px]:grid-cols-4">
                  {displayedNoticePosts.map((post) => (
                    <PostCard key={post.postId} post={post} to={`/notice/${post.postId}`} />
                  ))}
                </div>
                {hasMoreNotices && (
                  <Button
                    onClick={() => setNoticeRows(noticeRows + 1)}
                    className="mx-auto h-[30px] w-[87px] rounded-full px-4 py-2 text-[12px] md:mx-0 md:size-fit md:text-[1rem]"
                  >
                    더보기 ({noticeCurrentPage}/{noticeTotalPages})
                  </Button>
                )}
              </div>
            </div>

            {/* --- 자료집 (리스트형) --- */}
            <div className="w-full">
              <Subtitle title="자료집" count={mockDataPosts.length} />
              <div className="flex flex-col gap-16 md:items-center">
                <div className="flex w-full flex-col border-t border-t-gray-200">
                  {displayedDataPosts.map((post) => (
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
                {hasMoreData && (
                  <Button
                    onClick={() => setDataRows(dataRows + 1)}
                    className="mx-auto h-[30px] w-[87px] rounded-full px-4 py-2 text-[12px] md:mx-0 md:size-fit md:text-[1rem]"
                  >
                    더보기 ({dataCurrentPage}/{dataTotalPages})
                  </Button>
                )}
              </div>
            </div>

            {/* --- 서비스 공지사항 (리스트형) --- */}
            <div className="w-full">
              <Subtitle title="서비스 공지사항" count={mockServiceNoticePosts.length} />
              <div className="flex flex-col gap-16 md:items-center">
                <div className="flex w-full flex-col">
                  {displayedServicePosts.map((post) => (
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
                {hasMoreService && (
                  <Button
                    onClick={() => setServiceRows(serviceRows + 1)}
                    className="mx-auto h-[30px] w-[87px] rounded-full px-4 py-2 text-[12px] md:mx-0 md:size-fit md:text-[1rem]"
                  >
                    더보기 ({serviceCurrentPage}/{serviceTotalPages})
                  </Button>
                )}
              </div>
            </div>

            {/* --- 건의게시판 (리스트형) --- */}
            <div className="w-full">
              <Subtitle title="건의게시판" count={mockSuggestPosts.length} />
              <div className="flex flex-col gap-16 md:items-center">
                <div className="flex w-full flex-col border-t border-t-gray-200">
                  {displayedSuggestPosts.map((post) => (
                    <PostContent
                      key={post.postId}
                      to={`/sug-notice/${post.postId}`}
                      category={{ name: post.category, className: categoryColors[post.category] }}
                      title={post.title}
                      author={post.author}
                      date={post.date}
                    />
                  ))}
                </div>
                {hasMoreSuggest && (
                  <Button
                    onClick={() => setSuggestRows(suggestRows + 1)}
                    className="mx-auto h-[30px] w-[87px] rounded-full px-4 py-2 text-[12px] md:mx-0 md:size-fit md:text-[1rem]"
                  >
                    더보기 ({suggestCurrentPage}/{suggestTotalPages})
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}