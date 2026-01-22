import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ScheduleDeleteDialogProps {
  isOpen: boolean;
  isDeleting: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function ScheduleDeleteDialog({ isOpen, isDeleting, onOpenChange, onConfirm }: ScheduleDeleteDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="pt-10 sm:max-w-[425px] [&>button]:hidden">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-semibold">일정 삭제</DialogTitle>
        </DialogHeader>
        <DialogDescription className="mt-2 text-sm text-gray-600">
          정말 이 일정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
        </DialogDescription>
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)} isDisabled={isDeleting}>
            취소
          </Button>
          <Button variant="destructive" onClick={onConfirm} isDisabled={isDeleting}>
            {isDeleting ? '삭제 중...' : '삭제'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
