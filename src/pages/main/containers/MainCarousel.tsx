import Slider from 'react-slick';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { LoginState } from '@/atoms/atom';
import CouncilLogo from '@/components/logo/CouncilLogo';
import { useTranslation } from 'react-i18next';
import { cn } from '@/libs/utils';
import { useAtom } from 'jotai';
import { STUDENT_COUNCIL_NUMBER } from '@/const/studentCouncil';

const CounterItem = ({ isActive }: { isActive: boolean }) => (
  <span className={`block h-[7px] w-[45px] rounded-[15px] ${isActive ? 'bg-[#B8B8B8]' : 'bg-[#E4E4E4]'}`} />
);

const Counter = ({ slideCount, currentSlide }: { slideCount: number; currentSlide: number }) => (
  <div className="absolute bottom-4 flex w-full justify-center gap-[6px] pb-[57px]">
    {Array.from({ length: slideCount }).map((_, i) => (
      <CounterItem key={i} isActive={i === currentSlide} />
    ))}
  </div>
);

const images = ['/image/main/main-1.webp', '/image/main/main-2.webp', '/image/main/main-3.webp'];

const MainCarousel = ({ id, className = '' }: { id: string; className: string }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLogin] = useAtom(LoginState);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    afterChange: (index: number) => setCurrentSlide(index),
    touchThreshold: 100,
    swipeToSlide: true,
    draggable: true,
    pauseOnHover: false,
    pauseOnFocus: false,
    pauseOnDotsHover: false,
  };

  return (
    <div id={id} className={cn('relative h-screen w-full overflow-hidden', className)}>
      <Slider {...settings} className="absolute inset-0 z-0 size-full">
        {images.map((src, i) => (
          <div key={i} className="h-screen w-full overflow-hidden">
            <img className="size-full object-cover" src={src} alt={`슬라이드 ${i + 1}`} />
          </div>
        ))}
      </Slider>

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white">
        <div className="pointer-events-auto text-xl font-bold">
          {t('main.총학생회', { count: STUDENT_COUNCIL_NUMBER, ordinal: true })}
        </div>
        <CouncilLogo className="h-[97.92px] w-[310.62px]" />
        {!isLogin && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate('/register');
            }}
            className="pointer-events-auto mt-4 h-[46px] w-[173px] rounded-full border border-white bg-transparent transition duration-500 ease-in-out hover:bg-white hover:text-gray-700"
          >
            <p className="font-bold">{t('main.로그인하러 가기')}</p>
          </button>
        )}
        {isLogin && <div className="mt-4 h-[46px]"></div>}
      </div>

      <Counter slideCount={images.length} currentSlide={currentSlide} />
    </div>
  );
};

export default MainCarousel;
