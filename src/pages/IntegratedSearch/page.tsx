import { BoardHeader } from '@/components/BoardHeader';
import { useSearchParams } from 'react-router';
import { Subtitle } from './component/Subtitle';

export function IntegratedSearch() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('q') || '';

  return (
    <>
      <BoardHeader title="통합검색" className="border-b-neutral-200 max-md:px-5 md:border-b" />
      <div className="w-full max-w-[1530px] md:px-[72px] lg:px-[200px]">
        <div className="flex w-full text-3xl font-bold">
          <span className="text-[#2F4BF7]">"{keyword}"</span>에 대한 검색 결과
        </div>
        <div className='flex flex-col gap-[120px] mt-32'>
          <Subtitle title="중앙/단과대 공지사항" count={0} />
          
          <Subtitle title="자료집" count={0} />
          <Subtitle title="서비스 공지사항" count={0} />
          <Subtitle title="건의게시판" count={0} />
        </div>
      </div>
    </>
  );
}
