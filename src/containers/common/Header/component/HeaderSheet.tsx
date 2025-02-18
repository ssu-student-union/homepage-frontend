import { DATA_PATH, MENU_ITEMS, OLD_URL } from '@/containers/common/Header/const/pathData';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CaretDown } from '@phosphor-icons/react';
import { ReactNode, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { State } from '../const/state';
import { useSetRecoilState } from 'recoil';
import { LoginState } from '@/recoil/atoms/atom';
import { useTranslation } from 'react-i18next';

interface HeaderSheetProps {
  trigger: ReactNode;
  state?: State;
}

export function HeaderSheet({ trigger, state: initialState = State.Logout }: HeaderSheetProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<State>(initialState);
  const navigate = useNavigate();
  const setLoginState = useSetRecoilState(LoginState);
  const { t } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setState(token ? State.Login : State.Logout);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleCategory = (category: string) => {
    setExpandedCategory((prevCategory) => (prevCategory === category ? null : category));
  };

  const handleLinkClick = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleLogoutClick = () => {
    localStorage.clear();
    setState(State.Logout);
    setLoginState(false);
    setIsOpen(false);
    navigate('/');
  };

  return (
    <div className="xl:hidden xxl:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent
          className={`left-0 top-[60px] flex w-[260px] items-start justify-start border-0 bg-white px-0 py-0 text-lg font-semibold marker:outline-none focus:outline-none xs:top-[50px] sm:top-[50px] md:top-[50px] `}
        >
          <div className="flex w-full flex-col">
            {Object.entries(MENU_ITEMS).map(([category, items], index) => (
              <div key={index} className="w-full">
                <div
                  className={`flex h-[64px] w-full cursor-pointer flex-row items-center justify-between border-b 
                border-[#E5E7EB]
                pl-10`}
                  onClick={() => toggleCategory(category)}
                >
                  <div className={`flex flex-1 items-center text-gray-800 hover:text-[#6B7280]`}>
                    {t(`header.${category}`)}
                  </div>
                  <CaretDown className="text-[#9CA3AF]" size={20} />
                  <div className="w-4"></div>
                </div>
                {expandedCategory === category && (
                  <div className={`flex-center flex flex-col justify-center border-b border-[#E5E7EB] bg-white py-4`}>
                    {items.map((item) => (
                      <div
                        key={item.path}
                        onClick={() => handleLinkClick(item.path)}
                        className={`flex h-[32px] cursor-pointer items-center px-4 pl-12 text-base font-medium text-[#4B5563] hover:text-[#9CA3AF]`}
                      >
                        {t(`header-items.${item.name}`)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div
              onClick={() => navigate(DATA_PATH)}
              className={`flex h-[64px] cursor-pointer items-center border-b border-[#E5E7EB] pl-10 text-gray-800`}
            >
              {t('header.자료집')}
            </div>
            <a
              href={OLD_URL}
              className={`flex h-[64px] cursor-pointer items-center border-b border-[#E5E7EB] pl-10 text-gray-800`}
              onClick={() => setIsOpen(false)}
            >
              {t('header.이전 홈페이지')}
            </a>
            {state === State.Login ? (
              <div
                className={`flex h-[64px] cursor-pointer items-center border-b border-[#E5E7EB] pl-10 text-gray-800`}
                onClick={handleLogoutClick}
              >
                {t('header.로그아웃')}
              </div>
            ) : (
              <Link
                className={`flex h-[64px] cursor-pointer items-center border-b border-[#E5E7EB] pl-10 text-gray-800`}
                to="/register"
                onClick={() => setIsOpen(false)}
              >
                {t('header.로그인')}
              </Link>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
