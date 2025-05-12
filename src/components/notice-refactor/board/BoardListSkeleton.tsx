import { HeadLayout } from '@/template/HeadLayout';
import { BodyLayout } from '@/template/BodyLayout';
import { PostContent } from '@/components/PostContent';
import { BoardSelector } from '@/components/deprecated/Board/BoardSelector';

interface BoardListSkeletonProps {
  boardType: string;
  subtitle: JSX.Element;
}

export function BoardListSkeleton({ boardType, subtitle }: BoardListSkeletonProps) {
  return (
    <>
      <HeadLayout title={boardType} subtitle={subtitle} searchHidden={true} />
      <BodyLayout.Skeleton>
        <BoardSelector.Skeleton />
        {Array.from(Array(10).keys()).map((_, i) => (
          <PostContent.Skeleton key={i} />
        ))}
      </BodyLayout.Skeleton>
    </>
  );
}
