import { useResize } from '@/hooks/useResize';
import xl from '@/assets/image/campus-map/xl.svg';
import md from '@/assets/image/campus-map/md.svg';
import sm from '@/assets/image/campus-map/sm.svg';

const CampusMapSection = () => {
  const { width } = useResize();
  return (
    <div className="px-[200px] xs:px-[30px] sm:px-[30px] md:px-[30px]">
      <img
        className="h-auto w-full"
        src={(() => {
          switch (true) {
            case width < 720:
              return sm;
            case width < 1080:
              return md;
            case width >= 1440:
              return xl;
            default:
              return '';
          }
        })()}
        alt="캠퍼스맵"
      />
    </div>
  );
};

export default CampusMapSection;
