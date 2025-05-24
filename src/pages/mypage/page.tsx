import { useState, useEffect } from 'react';
import Sidebar from './component/Sidebar';
import DropdownUserMenu from './component/DropdownUserMenu';
import { ChevronDown } from 'lucide-react';
import { Outlet } from 'react-router';
import { useLocation } from 'react-router';
export default function MyPage() {
  const [selectedMenu, setSelectedMenu] = useState('');
  const [isDropdown, setIsDropdown] = useState(false);

  const path = useLocation();

  useEffect(() => {
    setSelectedMenu(path.pathname ?? '');
  }, [path]);

  console.log('selectedMenu', selectedMenu);

  return (
    <div className="mt-24">
      <div>
        <div className="relative flex justify-center md:ml-52 md:justify-start lg:ml-72">
          <h1 className="mb-5 text-2xl font-bold">마이페이지</h1>
          <button className="mb-5 ml-3 block items-center md:hidden" onClick={() => setIsDropdown(!isDropdown)}>
            <ChevronDown className="h-4 w-6" color="#9CA3AF" />
          </button>
          {isDropdown && (
            <div className="absolute top-10 z-50">
              <DropdownUserMenu selectedMenu={selectedMenu} setIsDropdown={setIsDropdown} />
            </div>
          )}
        </div>
        <div className="w-full border-b border-[#E7E7E7]"></div>
        <div className="flex">
          <Sidebar selectedMenu={selectedMenu} />
          <div className="grow">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
