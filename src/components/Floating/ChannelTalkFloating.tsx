import Channel from '@/assets/image/channel_talk.svg';
import { cn } from '@/libs/utils';

export default function ChannelTalkFloating({ className = '' }: { className?: string }) {
  return (
    <button className={cn('custom-button-1', className)}>
      <img className="size-[64px] md:size-20" src={Channel} />
    </button>
  );
}
