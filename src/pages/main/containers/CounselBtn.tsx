import Channel from '@/assets/image/channel_talk.svg';
import { InstaFloating, KakaoFloating, YoutubeFloating } from '@/components/Floating/Floating';
import { Spacing } from '@/components/Spacing';

export function CounselBtn() {
  return (
    <div className="relative ">
      <div className="absolute right-0 h-20 bg-transparent pr-11 xs:pr-5 sm:pr-5">
        <Spacing size={86} direction="vertical" />
        <KakaoFloating />
        <Spacing direction={'vertical'} size={13} />
        <InstaFloating />
        <Spacing direction={'vertical'} size={13} />
        <YoutubeFloating />
        <Spacing direction={'vertical'} size={13} />
        <button className="custom-button-1">
          <img className="h-[78px] w-[78px] xs:w-[60px] sm:w-[60px]" src={Channel} />
        </button>
      </div>
    </div>
  );
}
