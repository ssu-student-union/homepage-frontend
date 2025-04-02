import { useResize } from '@/hooks/useResize';
import xl from '@/assets/image/campus-map/xl.svg';
import md from '@/assets/image/campus-map/md.svg';
import sm from '@/assets/image/campus-map/sm.svg';
// import { ArrowUpRight } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CampusMapSection = () => {
  const { width } = useResize();
  // const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="mb-8 flex w-full items-center justify-start">
          <h1 className="text-[18px] font-bold md:text-[2rem]">{t('introduction.캠퍼스맵')}</h1>
          {/* <ArrowUpRight
          onClick={() => {
            navigate(`/campus`);
            window.scrollTo(0, 0);
          }}
          className="ml-2 cursor-pointer"
          size={24}
          strokeWidth={1.5}
        /> */}
        </div>
        <img
          src={(() => {
            switch (true) {
              case width < 720:
                return sm;
              case width < 1080:
                return md;
              case width >= 1080:
                return xl;
              default:
                return '';
            }
          })()}
          alt="캠퍼스맵"
        />
      </div>
    </>
  );
};

export default CampusMapSection;
