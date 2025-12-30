import { DATA_PATH, MENU_ITEMS } from '@/containers/common/Header/const/pathData';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Globe } from '@phosphor-icons/react';
import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router';
import { State } from '../const/state';
import { useTranslation } from 'react-i18next';
import { Button, buttonVariants } from '@/components/ui/button';
import CouncilLogo from '@/components/logo/CouncilLogo';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/libs/utils';

interface HeaderSheetProps {
  onLogout?: () => void;
  trigger: ReactNode;
  state?: State;
}

export function HeaderSheet({ trigger, state, onLogout }: HeaderSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n, t } = useTranslation();

  const buttonText = i18n.language === 'ko' ? 'EN' : 'KO';

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

  const handleLogout = () => {
    onLogout?.();
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <CouncilLogo className="h-4 w-auto object-contain invert xl:h-6" />
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
          <Link className={cn(buttonVariants({ variant: 'sheet-item' }), 'px-0 py-7')} to={DATA_PATH}>
            {t('header.자료집')}
          </Link>
          {state === State.Login ? (
            // <Link className={cn(buttonVariants({ variant: 'sheet-item' }), 'px-0 py-7')} to="/mypage">
            //   {t('introduction.마이페이지')}
            // </Link>
            <Button variant="sheet-item" className="w-full px-0 py-7" onClick={handleLogout}>
              {t('header.로그아웃')}
            </Button>
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
