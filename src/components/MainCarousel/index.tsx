import Slider from 'react-slick';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRecoilValue } from 'recoil';
import { LoginState } from '@/recoil/atoms/atom';
import { Logo } from '../Logo/Logo';

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

const images = ['/image/main/1.jpeg', '/image/main/2.jpeg', '/image/main/3.jpeg'];

const MainCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isLogin = useRecoilValue(LoginState);
  const navigate = useNavigate();

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
    <div className="relative h-screen w-full overflow-hidden">
      <Slider {...settings} className="absolute inset-0 z-0 h-full w-full">
        {images.map((src, i) => (
          <div key={i} className="h-screen w-full overflow-hidden">
            <img className="h-full w-full object-cover" src={src} alt={`슬라이드 ${i + 1}`} />
          </div>
        ))}
      </Slider>

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white">
        <div className="pointer-events-auto text-xl font-bold">제65대 총학생회</div>
        <h1 className="pointer-events-auto text-[80px] font-black leading-none"></h1>
        <Logo className="pointer-events-auto h-[97.92px] w-[310.62px] xs:h-[57.8px] xs:w-[165.65px] sm:h-[57.8px] sm:w-[165.65px]" />
        {!isLogin && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate('/register');
            }}
            className="pointer-events-auto mt-[1rem] h-[46px] w-[173px] rounded-full border-[1px] border-white bg-transparent transition duration-500 ease-in-out hover:bg-white hover:text-gray-700"
          >
            <p className="font-bold">로그인 하러가기</p>
          </button>
        )}
        {isLogin && <div className="mt-[1rem] h-[46px]"></div>}
      </div>

      <Counter slideCount={images.length} currentSlide={currentSlide} />
    </div>
  );
};

export default MainCarousel;
