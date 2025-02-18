import { useResize } from '@/hooks/useResize';
import xxl from '@/assets/image/xxl_campusMap.svg';
import xl from '@/assets/image/xl_campusMap.svg';
import lg from '@/assets/image/lg_campusMap.svg';
import sm from '@/assets/image/sm_campusMap.svg';
import xs from '@/assets/image/xs_campusMap.svg';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CampusMapSection = () => {
  const { width } = useResize();
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <div className="flex items-center justify-start">
        <h1 className="text-[2rem] font-bold xs:text-[1.25rem]">{t('introduction.캠퍼스맵')}</h1>
        <ArrowUpRight
          onClick={() => {
            navigate(`/campus`);
            window.scrollTo(0, 0);
          }}
          className="ml-2 cursor-pointer"
          size={24}
          strokeWidth={1.5}
        />
      </div>

      <img
        className="flex h-auto w-full flex-col items-center justify-center overflow-hidden"
        src={(() => {
          switch (true) {
            case width < 390:
              return xs;
            case width < 1080:
              return sm;
            case width < 1440:
              return lg;
            case width < 1920:
              return xl;
            case width >= 1920:
              return xxl;
            default:
              return '';
          }
        })()}
        alt="캠퍼스맵"
      />
    </>
  );
};

export default CampusMapSection;
