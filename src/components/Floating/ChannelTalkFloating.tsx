import Channel from '@/assets/image/channel_talk.svg';
import { cn } from '@/libs/utils';

export default function ChannelTalkFloating({ className = '' }: { className?: string }) {
  return (
    <button className={cn('custom-button-1', className)}>
      <img className="h-20 w-20 xs:h-[64px] xs:w-[64px] sm:h-[64px] sm:w-[64px]" src={Channel} />
    </button>
  );
}
