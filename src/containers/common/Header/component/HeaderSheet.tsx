import { DATA_PATH, MENU_ITEMS, OLD_URL } from '@/containers/common/Header/const/pathData';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Globe } from '@phosphor-icons/react';
import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { State } from '../const/state';
// import { useSetRecoilState } from 'recoil';
// import { LoginState } from '@/recoil/atoms/atom';
import { useTranslation } from 'react-i18next';
import { Button, buttonVariants } from '@/components/ui/button';
import SsureLogo from '@/components/Logo/SsureLogo';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/libs/utils';

interface HeaderSheetProps {
  trigger: ReactNode;
  state?: State;
}

export function HeaderSheet({ trigger, state: initialState = State.Logout }: HeaderSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<State>(initialState);
  const { i18n, t } = useTranslation();

  const buttonText = i18n.language === 'ko' ? 'EN' : 'KO';

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

  const closeSheet = () => {
    setIsOpen(false);
  };

  // 언어 변경 함수
  const handleToggleLanguage = () => {
    const newLang = i18n.language === 'ko' ? 'en' : 'ko';
    i18n.changeLanguage(newLang);
    localStorage.setItem('lang', newLang);
  };

  // const handleLogoutClick = () => {
  //   localStorage.clear();
  //   setState(State.Logout);
  //   setLoginState(false);
  //   setIsOpen(false);
  //   navigate('/');
  // };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <SsureLogo className="h-4 object-contain invert xl:h-6" />
          </SheetTitle>
          <SheetDescription />
        </SheetHeader>
        <Accordion type="single" collapsible className="w-full">
          {Object.entries(MENU_ITEMS).map(([category, items]) => (
            <AccordionItem value={category} key={category} className="w-full">
              <AccordionTrigger>{t(`header.${category}`)}</AccordionTrigger>
              <AccordionContent>
                {items.map((item) => (
                  <Link
                    key={item.path}
                    onClick={closeSheet}
                    to={item.path}
                    className={cn(buttonVariants({ variant: 'ghost' }), 'flex w-full justify-start')}
                  >
                    {t(`header-items.${item.name}`)}
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
          <Link onClick={closeSheet} className={cn(buttonVariants({ variant: 'sheet-item' }), 'px-0 py-7')} to="/qna">
            {t('header.질의응답게시판')}
          </Link>
          <Link className={cn(buttonVariants({ variant: 'sheet-item' }), 'px-0 py-7')} to={DATA_PATH}>
            {t('header.자료집')}
          </Link>
          <a className={cn(buttonVariants({ variant: 'sheet-item' }), 'px-0 py-7')} target="_blank" href={OLD_URL}>
            {t('header.이전 홈페이지')}
          </a>
          {state === State.Login ? (
            <Link className={cn(buttonVariants({ variant: 'sheet-item' }), 'px-0 py-7')} to="/mypage">
              {t('introduction.마이페이지')}
            </Link>
          ) : (
            <Link
              className={cn(buttonVariants({ variant: 'sheet-item' }), 'px-0 py-7')}
              to="/register"
              onClick={() => setIsOpen(false)}
            >
              {t('header.로그인')}
            </Link>
          )}
        </Accordion>
        <Button variant="ghost" className="mt-4 flex w-full justify-start" onClick={handleToggleLanguage}>
          <Globe className="mr-2 size-4" />
          {buttonText}
        </Button>
      </SheetContent>
    </Sheet>
  );
}
