import { Link } from 'react-router';

interface DropdownUserMenuProps {
  selectedMenu: string;
  setIsDropdown: (value: boolean) => void;
}

export default function DropdownUserMenu({ selectedMenu, setIsDropdown }: DropdownUserMenuProps) {
  return (
    <div className="rounded-xs border bg-gray-50 p-1 text-xs text-gray-700 shadow-lg marker:w-36 md:text-sm lg:text-base">
      <div className="flex flex-col">
        <Link
          to="/mypage"
          className={`cursor-pointer px-4 py-3 ${
            selectedMenu === '/mypage' ? 'bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'
          }`}
          onClick={() => {
            setIsDropdown(false);
          }}
        >
          내 정보
        </Link>
        <Link
          to="/mypage/myPosts"
          className={`cursor-pointer px-4 py-3 ${
            selectedMenu === '/mypage/myPosts' ? 'bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'
          }`}
          onClick={() => {
            setIsDropdown(false);
          }}
        >
          작성 글 보기
        </Link>
        <Link
          to="/mypage/service-notice"
          className={`cursor-pointer px-4 py-3 ${
            selectedMenu === '/mypage/service-notice' ? 'bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'
          }`}
          onClick={() => {
            setIsDropdown(false);
          }}
        >
          서비스 공지사항
        </Link>
      </div>
    </div>
  );
}
