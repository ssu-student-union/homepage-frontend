import { Search } from '@/components/Search/Search';
import { HeadLayout } from '@/template/HeadLayout';

export function IntegratedSearchPage() {
  return (
    <>
      <div className="flex flex-col justify-center">
        <HeadLayout title="통합검색" searchHidden={true} />
        <div className='flex flex-col items-center justify-center mt-[3.5rem] w-[95rem] mx-auto'>
          <Search placeholderType="검색어" />
          <div className='w-full'>
            <span className='text-[1.5rem] font-[700] text-[#374151]'>게시글</span>
            <div className='w-full border-t border-gray-500 my-[1.25rem]'></div>
          </div>
        </div>
      </div>
    </>
  );
}
