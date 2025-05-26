interface DropdownUserMenuProps {
  selectedMenu: string;
  setIsDropdown: (value: boolean) => void;
  setSelectedMenu: (menu: string) => void;
}

export default function DropdownUserMenu({ selectedMenu, setIsDropdown, setSelectedMenu }: DropdownUserMenuProps) {
  return (
    <div className="rounded-xs border bg-gray-50 p-1 text-xs text-gray-700 shadow-lg marker:w-36 md:text-sm lg:text-base">
      <ul className="flex flex-col">
        <li
          className={`cursor-pointer px-4 py-3 ${
            selectedMenu === 'profile' ? 'bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'
          }`}
          onClick={() => {
            setIsDropdown(false);
            setSelectedMenu('profile');
          }}
        >
          내 정보
        </li>
        <li
          className={`cursor-pointer px-4 py-3 ${
            selectedMenu === 'myPosts' ? 'bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'
          }`}
          onClick={() => {
            setIsDropdown(false);
            setSelectedMenu('myPosts');
          }}
        >
          작성 글 보기
        </li>
        <li
          className={`cursor-pointer px-4 py-3 ${
            selectedMenu === 'service-notice' ? 'bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'
          }`}
          onClick={() => {
            setIsDropdown(false);
            setSelectedMenu('service-notice');
          }}
        >
          서비스 공지사항
        </li>
      </ul>
    </div>
  );
}
