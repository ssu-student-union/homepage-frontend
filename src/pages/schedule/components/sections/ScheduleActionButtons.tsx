import { Button } from '@/components/ui/button';
import { Pencil } from '@phosphor-icons/react';
import { useNavigate } from 'react-router';

interface ScheduleActionButtonsProps {
  hasSchedulePermission: boolean;
  clickedScheduleId: number | null;
  isDeleting: boolean;
  onDeleteClick: () => void;
  onListClick: () => void;
}

export function ScheduleActionButtons({
  hasSchedulePermission,
  clickedScheduleId,
  isDeleting,
  onDeleteClick,
  onListClick,
}: ScheduleActionButtonsProps) {
  const navigate = useNavigate();

  if (!hasSchedulePermission) {
    return null;
  }

  return (
    <div className="w-full px-8 pt-4">
      <div className="flex justify-end">
        {clickedScheduleId === null ? (
          <Button
            variant="outline"
            onClick={() => navigate(`/schedule/edit`)}
            size={null}
            className="flex h-[2.625rem] min-w-[7.6875rem] items-center gap-2"
          >
            <Pencil className="size-4" />
            <p>글쓰기</p>
          </Button>
        ) : (
          <div className="flex flex-wrap justify-end gap-2">
            <Button
              variant="destructive"
              size={null}
              className="flex h-[2.625rem] min-w-16 items-center justify-center px-3"
              onClick={onDeleteClick}
              isDisabled={isDeleting}
            >
              삭제
            </Button>
            <Button
              variant="outline"
              size={null}
              className="flex h-[2.625rem] min-w-16 items-center justify-center px-3"
              onClick={() => navigate(`/schedule/edit?id=${clickedScheduleId}`)}
            >
              편집
            </Button>
            <Button
              variant="ghost"
              size={null}
              className="flex h-[2.625rem] min-w-16 items-center justify-center px-3"
              onClick={onListClick}
            >
              목록
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

