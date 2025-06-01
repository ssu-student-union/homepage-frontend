import { Link } from 'react-router';

interface DropdownUserMenuProps {
  selectedMenu: string | null;
  setIsDropdown: (value: boolean) => void;
}

export default function DropdownUserMenu({ selectedMenu, setIsDropdown }: DropdownUserMenuProps) {
  return (
    <div className="rounded-xs border bg-gray-50 p-1 text-xs text-gray-700 shadow-lg marker:w-36 md:text-sm lg:text-base">
      <div className="flex flex-col">
        <Link
          to="/mypage?selectedMenu=profile"
          className={`cursor-pointer px-4 py-3 ${
            selectedMenu === 'profile' ? 'bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'
          }`}
          onClick={() => {
            setIsDropdown(false);
          }}
        >
          내 정보
        </Link>
        <Link
          to="/mypage?selectedMenu=myPosts"
          className={`cursor-pointer px-4 py-3 ${
            selectedMenu === 'myPosts' ? 'bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'
          }`}
          onClick={() => {
            setIsDropdown(false);
          }}
        >
          작성 글 보기
        </Link>
        <Link
          to="/service-notice"
          className={`cursor-pointer px-4 py-3 ${
            selectedMenu === 'service-notice' ? 'bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'
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
