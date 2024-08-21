import { Search } from '@/components/Search/Search';
import { useLocation } from 'react-router-dom';
import { UserRound } from 'lucide-react';
import { userNameMapping } from './index';

export default function DataTitleSection({ userId }) {
  const location = useLocation();

  const userName = userNameMapping[userId] || 'Unknown';

  return (
    <>
      {location.pathname === '/data' && (
        <div className="mt-[123px] flex h-auto w-full justify-between px-[25px] xs:justify-center xs:px-[50px] sm:justify-center md:justify-center md:px-[100px]">
          <div className="text-[34px] font-bold text-black sm:ml-0 sm:text-2xl md:ml-0 lg:ml-[109px] xl:ml-[199px] xxl:ml-[199px]">
            <div>자료집</div>
          </div>

          <div className="block xs:hidden sm:hidden md:hidden">
            <Search />
          </div>
        </div>
      )}

      {location.pathname === '/data/edit' && (
        <div className="mt-[123px] flex h-auto w-full justify-between px-[25px] md:px-[100px]">
          <div className="text-[34px] font-bold text-black sm:ml-0 sm:text-2xl md:ml-0 lg:ml-[109px] xl:ml-[199px] xxl:ml-[199px]">
            <div>자료집</div>

            <div className="flex text-[16px] font-normal text-[#999] sm:text-sm">
              <UserRound />
              &nbsp;
              {userName}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
