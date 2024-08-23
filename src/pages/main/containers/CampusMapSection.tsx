import { useResize } from '@/hooks/useResize';
import xxl from '@/assets/image/xxl_campusMap.svg';
import xl from '@/assets/image/xl_campusMap.svg';
import lg from '@/assets/image/lg_campusMap.svg';
import sm from '@/assets/image/sm_campusMap.svg';
import xs from '@/assets/image/xs_campusMap.svg';

const CampusMapSection = () => {
  const { width } = useResize();
  return (
    <section className="flex w-full flex-col overflow-hidden">
      <h1 className="text-[2rem] font-bold xs:text-[1.25rem]">캠퍼스맵</h1>
      <div className="w-full self-center overflow-hidden">
        <img
          className="h-fit w-fit"
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
      </div>
    </section>
  );
};

export default CampusMapSection;
