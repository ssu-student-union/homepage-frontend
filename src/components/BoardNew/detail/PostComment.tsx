import { ReactNode, useState } from 'react';
import { cn } from '@/libs/utils.ts';
import { DotsThree, User } from '@phosphor-icons/react';
import dayjs from 'dayjs';
import { DropdownButton } from '@/components/BoardNew/detail/DropdownButton.tsx';
import { PostCommentEditor } from '@/components/BoardNew/detail/PostCommentEditor.tsx';
import { Skeleton } from '@/components/ui/skeleton.tsx';

interface PostCommentProps {
  children?: ReactNode;
  author: string;
  commentType?: 'GENERAL' | 'OFFICIAL';
  createdAt: Date;
  lastEditedAt?: Date;
  editable?: boolean;
  deletable?: boolean;
  deleted?: boolean;
  onEdit?: (value: string) => void;
  onDelete?: () => void;
}

export function PostComment({
  author,
  createdAt,
  commentType = 'GENERAL',
  lastEditedAt,
  editable,
  deletable,
  deleted,
  children,
  onEdit,
  onDelete,
}: PostCommentProps) {
  const [editing, setEditing] = useState(false);
  const formattedDate = dayjs(lastEditedAt ? lastEditedAt : createdAt).format('YYYY-MM-DD HH:mm');

  function onItemClick(id: string) {
    if (id === 'edit') {
      setEditing(true);
    } else if (id === 'delete' && onDelete) {
      onDelete();
    }
  }

  return (
    <article
      className={cn(
        'flex flex-col gap-3 rounded-lg bg-gray-50 px-5 py-7 font-medium',
        commentType === 'OFFICIAL' && 'border border-primary'
      )}
    >
      <section className="flex items-center justify-between">
        <address
          className={cn(
            'flex items-center gap-2 font-bold not-italic',
            commentType === 'OFFICIAL' ? 'text-primary' : 'text-gray-400'
          )}
        >
          <User />
          {deleted ? '삭제된 댓글' : author}
        </address>
        {(editable || deletable) && !deleted && !editing && (
          <DropdownButton
            items={[
              ...(deletable ? [{ id: 'delete', text: '삭제하기' }] : []),
              ...(editable ? [{ id: 'edit', text: '수정하기' }] : []),
            ]}
            onItemClick={onItemClick}
          >
            {/* TODO: Breakpoint 수정 후 변경 */}
            <DotsThree className="hidden sm:block md:block lg:block xl:block xxl:block" size="24px" />
            <DotsThree className="hidden xs:block" size="14px" />
          </DropdownButton>
        )}
      </section>
      {editing ? (
        <PostCommentEditor
          placeholder="댓글 수정하기"
          value={children as string}
          maxLength={2000}
          editing
          onSubmit={onEdit}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <section className={cn(deleted && 'italic text-gray-400')}>{deleted ? '삭제된 댓글입니다.' : children}</section>
      )}
      <time
        className={cn('text-gray-400', deleted && 'hidden')}
        dateTime={lastEditedAt ? lastEditedAt.toString() : createdAt.toString()}
      >
        {formattedDate} {lastEditedAt && '(수정됨)'}
      </time>
    </article>
  );
}

PostComment.Skeleton = () => {
  return (
    <article className={cn('flex flex-col gap-3 rounded-lg bg-gray-50 px-5 py-7')}>
      <section className="flex items-center justify-between">
        <div className={cn('flex items-center gap-2')}>
          <User />
          <Skeleton className="h-6 w-[5ch]" />
        </div>
      </section>
      <Skeleton className="h-12 w-[70ch]" />
      <Skeleton className="h-6 w-[16ch]" />
    </article>
  );
};
