import { BoardHeader } from '@/components/BoardHeader';
import { useSearchParams } from 'react-router';

export function IntegratedSearch() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('q') || '';

  return (
    <>
      <BoardHeader title="통합검색" className="border-b-neutral-200 max-md:px-5 md:border-b" />
      <div className="w-full max-w-[1330px] px-[64px]">
        <div className="text-4xl font-bold">
          <span className='text-[#2F4BF7]'>"{keyword}"</span>
          에 대한 검색 결과
        </div>
      </div>
    </>
  );
}
