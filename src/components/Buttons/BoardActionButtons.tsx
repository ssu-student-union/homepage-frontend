import { Button } from '../ui/button';
import { List, Pencil, Trash } from '@phosphor-icons/react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function RegisterButton({ ...props }) {
  return (
    <Button variant={'Register'} disabled={false} {...props}>
      <p>등록</p>
    </Button>
  );
}

export function CancelButton({ ...props }) {
  return (
    <Button variant={'Register'} {...props}>
      <p>취소</p>
    </Button>
  );
}

export function ListButton({ className, ...props }: ButtonProps) {
  return (
    <Button variant="List_Edit" className={clsx(className)} {...props}>
      <List />
      <p>목록</p>
    </Button>
  );
}

export function WriteButton({ ...props }) {
  return (
    <Button variant={'Write'} {...props}>
      <Pencil />
      <p>글쓰기</p>
    </Button>
  );
}

export function EditButton({ className, ...props }: ButtonProps) {
  return (
    <Button variant="List_Edit" className={clsx(className)} {...props}>
      <Pencil />
      <p>편집</p>
    </Button>
  );
}

export function DeleteButton({ className, ...props }: ButtonProps) {
  return (
    <Button variant="List_Edit" className={clsx(className)} {...props}>
      <Trash />
      <p>삭제</p>
    </Button>
  );
}
