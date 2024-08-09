import { BoardSelector } from '@/components/Board/BoardSelector';
import { Petition } from '@/types';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PetitionPostContent } from '../../../containers/common/PostContent/PetitionPostContent';
import { useCurrentPage } from '@/hooks/useCurrentPage';
import { PAGE_PER_GROUP } from '@/components/Pagination/const';
import { BodyLayout } from '@/template/BodyLayout';

const TEST_DATA = [
  {
    state: '종료됨',
    title: '학내 카페 영업시간 연장 요청',
    date: '2024/07/29',
  },
  {
    state: '진행중',
    title: '도서관 24시간 개방 정책 도입',
    date: '2024/07/29',
  },
  {
    state: '접수완료',
    title: '학생 건강검진 프로그램 확대',
    date: '2024/07/29',
  },
  {
    state: '답변완료',
    title: '교내 자전거 대여 시스템 구축',
    date: '2024/07/29',
  },
  {
    state: '종료됨',
    title: '강의실 냉난방 시설 개선',
    date: '2024/07/29',
  },
  {
    state: '진행중',
    title: '학생회관 내 휴게공간 확충',
    date: '2024/07/29',
  },
  {
    state: '접수완료',
    title: '학내 채식 메뉴 다양화',
    date: '2024/07/29',
  },
  {
    state: '답변완료',
    title: '재활용 쓰레기통 설치 확대',
    date: '2024/07/29',
  },
  {
    state: '종료됨',
    title: '온라인 강의 자료 접근성 개선',
    date: '2024/07/29',
  },
  {
    state: '진행중',
    title: '장애학생 지원 시설 확충',
    date: '2024/07/29',
  },
  {
    state: '접수완료',
    title: '학내 무료 심리상담 서비스 확대',
    date: '2024/07/29',
  },
  {
    state: '답변완료',
    title: '학생 창업 지원 프로그램 강화',
    date: '2024/07/29',
  },
  {
    state: '종료됨',
    title: '캠퍼스 내 안전 시설 보강',
    date: '2024/07/29',
  },
  {
    state: '진행중',
    title: '학생식당 메뉴 다양화 및 품질 개선',
    date: '2024/07/29',
  },
  {
    state: '접수완료',
    title: '교내 와이파이 속도 개선',
    date: '2024/07/29',
  },
  {
    state: '답변완료',
    title: '학생 기숙사 수용 인원 확대',
    date: '2024/07/29',
  },
  {
    state: '종료됨',
    title: '외국어 교육 프로그램 다양화',
    date: '2024/07/29',
  },
  {
    state: '진행중',
    title: '학내 전기차 충전소 설치',
    date: '2024/07/29',
  },
  {
    state: '접수완료',
    title: '학생 동아리 활동 공간 확충',
    date: '2024/07/29',
  },
  {
    state: '답변완료',
    title: '학과 간 교류 프로그램 활성화',
    date: '2024/07/29',
  },
];

export function PetitionPostSection() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentPage, handlePageChange } = useCurrentPage(1);
  const [selectedSubcategory, setSelectedSubcategory] = useState(() => {
    return searchParams.get('subcategory') || Petition[0];
  });

  useEffect(() => {
    navigate(`/petition-notice?category=${selectedSubcategory}`);
  }, [selectedSubcategory, navigate]);

  const handleSubcategorySelect = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
  };

  const filteredData = useMemo(() => {
    if (selectedSubcategory === '전체') {
      return TEST_DATA;
    }
    return TEST_DATA.filter((item) => item.state === selectedSubcategory);
  }, [selectedSubcategory]);

  const displayedPostContent = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_PER_GROUP;
    return filteredData.slice(startIndex, startIndex + PAGE_PER_GROUP);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / PAGE_PER_GROUP);

  const handleWriteBtnClick = () => {
    navigate('/petition-notice/edit');
  };

  // BoardSelector 컴포넌트 들어가는 자리
  const selectorComponent = (
    <BoardSelector
      subcategories={Petition}
      selectedSubcategory={selectedSubcategory}
      onSubcategorySelect={handleSubcategorySelect}
    />
  );

  // Page 메인 컨텐츠 들어가는 자리
  const movePostContentDetail = (id: number) => {
    navigate(`/petition-notice/${id}`);
  };

  const contentComponent = (
    <>
      {displayedPostContent.map((data, index) => (
        <PetitionPostContent data={data} key={index} onClick={movePostContentDetail} />
      ))}
    </>
  );

  return (
    <BodyLayout
      title="청원글"
      selector={selectorComponent}
      content={contentComponent}
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      onWriteClick={handleWriteBtnClick}
    />
  );
}
