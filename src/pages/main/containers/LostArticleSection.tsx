import { Size } from '@/components/PostCard/const/state';
import { PostCardMissing } from '@/components/PostCard/PostCardBasicMissing';
import { Spacing } from '@/components/Spacing';
import { useResize } from '@/hooks/useResize';

const LostArticleSection = () => {
  const { width } = useResize();
  return (
    <section>
      <h1 className="text-[2rem] font-bold xs:text-[1.25rem]">분실물 현황</h1>
      <Spacing size={18} direction="vertical" />
      {/* xs */}
      {width < 390 ? (
        <div className="flex w-[calc(100dvw-3.125rem)] gap-[1.063rem] overflow-x-scroll pr-[1.063rem] scrollbar-hide">
          {Array.from({ length: 3 }).map((_) => (
            <PostCardMissing size={Size.view}></PostCardMissing>
          ))}
        </div>
      ) : null}
      {/* sm, md */}
      {width < 1080 && width >= 390 ? (
        <div className="flex w-[calc(100dvw-3.125rem)] gap-[1.063rem] overflow-x-scroll pr-[1.063rem] scrollbar-hide">
          {Array.from({ length: 2 }).map((_) => (
            <PostCardMissing></PostCardMissing>
          ))}
        </div>
      ) : null}
      {/* xxl, xl, lg */}
      {width >= 1080 ? (
        <div className="flex h-fit w-full justify-between">
          <PostCardMissing></PostCardMissing>
        </div>
      ) : null}
    </section>
  );
};

export default LostArticleSection;
