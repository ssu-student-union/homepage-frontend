import { PostHeader } from '@/components/detail/PostHeader';
import { PostFooter } from '@/components/detail/PostFooter';
import { Container } from '@/containers/new/Container';

export function EditPageSkeleton() {
  return (
    <article className="mb-20 mt-16">
      <PostHeader.Skeleton />
      <hr className="bg-[#E7E7E7]" />
      <Container.Skeleton />
      <PostFooter.Skeleton />
    </article>
  );
}
