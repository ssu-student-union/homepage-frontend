import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

interface SidebarProps {
  selectedMenu: string | null;
}

export default function Sidebar({ selectedMenu }: SidebarProps) {
  const { t } = useTranslation();
  return (
    <aside className="my-10 hidden w-56 border-r border-[#E7E7E7] md:block">
      <div className="ml-6 p-10 font-bold md:ml-0 md:pr-0 md:text-sm">
        <div className="flex flex-col">
          <Link
            to="/mypage?selectedMenu=profile"
            className={`mb-3 cursor-pointer ${selectedMenu === 'profile' || selectedMenu === null ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
          >
            {t('mypage.내 정보')}
          </Link>
          <Link
            to="/mypage?selectedMenu=myPosts"
            className={`mb-3 cursor-pointer ${selectedMenu === 'myPosts' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
          >
            {t('mypage.작성 글 보기')}
          </Link>
          <Link
            to="/service-notice"
            className={`mb-3 cursor-pointer ${selectedMenu === 'service-notice' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
          >
            {t('mypage.서비스 공지사항')}
          </Link>
        </div>
      </div>
    </aside>
  );
}
