import { Search } from '@/components/Search/Search';
import { useLocation } from 'react-router-dom';

export default function DataTitleSection() {
  const location = useLocation();

  return (
    <div className="mt-[123px] flex h-auto w-full justify-between px-[25px] xs:justify-center xs:px-[50px] sm:justify-center md:justify-center  md:px-[100px]">
      <div className="xl: ml-[199px] text-[34px] font-bold text-black sm:ml-0 sm:text-2xl md:ml-0 lg:ml-[109px] xxl:ml-[199px]">
        자료집
      </div>
      {location.pathname === '/data' && (
        <div className="block xs:hidden sm:hidden md:hidden">
          <Search />
        </div>
      )}
    </div>
  );
}
