interface DropdownUserMenuProps {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
  setIsDropdown: (value: boolean) => void;
}

export default function DropdownUserMenu({ selectedMenu, setSelectedMenu, setIsDropdown }: DropdownUserMenuProps) {
  return (
    <div className="w-36 rounded-xs border bg-gray-50 px-1 py-1 text-gray-700 shadow-lg xs:text-xs sm:text-xs md:text-sm">
      <ul>
        <li
          className={`cursor-pointer px-4 py-3 ${
            selectedMenu === '내 정보' ? 'bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'
          }`}
          onClick={() => {
            setSelectedMenu('내 정보');
            setIsDropdown(false); // 메뉴 선택 후 닫기
          }}
        >
          내 정보
        </li>
        <li
          className={`cursor-pointer px-4 py-3 ${
            selectedMenu === '작성 글 보기' ? 'bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'
          }`}
          onClick={() => {
            setSelectedMenu('작성 글 보기');
            setIsDropdown(false);
          }}
        >
          작성 글 보기
        </li>
        <li
          className={`cursor-pointer px-4 py-3 ${
            selectedMenu === '서비스 공지사항' ? 'bg-gray-100' : 'bg-gray-50 hover:bg-gray-100'
          }`}
          onClick={() => {
            setSelectedMenu('서비스 공지사항');
            setIsDropdown(false);
          }}
        >
          서비스 공지사항
        </li>
      </ul>
    </div>
  );
}
