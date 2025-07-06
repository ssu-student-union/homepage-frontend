import { Button } from '../../ui/button';
import { List, Pencil, Trash } from '@phosphor-icons/react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

/**
 * @deprecated 권장하지 않음, `Button` 컴포넌트의 `register` variant를 사용하세요.
 * @description 너무 간단한 컴포넌트, 버튼의 속성을 그대로 사용할 수 있도록 `forwardRef` 등 사용 필요
 */
export function RegisterButton({ ...props }) {
  return (
    <Button variant="register" disabled={false} {...props}>
      <p>등록</p>
    </Button>
  );
}

/**
 * @deprecated 권장하지 않음, `Button` 컴포넌트의 `list-edit` variant와 `lucide-react/List` 아이콘을 사용하세요.
 * @description 너무 간단한 컴포넌트, 버튼의 속성을 그대로 사용할 수 있도록 `forwardRef` 등 사용 필요
 */
export function ListButton({ className, ...props }: ButtonProps) {
  return (
    <Button variant="list-edit" className={clsx(className)} {...props}>
      <List />
      <p>목록</p>
    </Button>
  );
}

/**
 * @deprecated 권장하지 않음, `Button` 컴포넌트의 `list-edit` variant와 `lucide-react/Pencil` 아이콘을 사용하세요.
 * @description 너무 간단한 컴포넌트, 버튼의 속성을 그대로 사용할 수 있도록 `forwardRef` 등 사용 필요
 */
export function WriteButton({ ...props }) {
  return (
    <Button variant="write" {...props}>
      <Pencil />
      <p>글쓰기</p>
    </Button>
  );
}

/**
 * @deprecated 권장하지 않음, `Button` 컴포넌트의 `list-edit` variant와 `lucide-react/Pencil` 아이콘을 사용하세요.
 * @description 너무 간단한 컴포넌트, 버튼의 속성을 그대로 사용할 수 있도록 `forwardRef` 등 사용 필요
 */
export function EditButton({ className, ...props }: ButtonProps) {
  return (
    <Button variant="list-edit" className={clsx(className)} {...props}>
      <Pencil />
      <p>편집</p>
    </Button>
  );
}

/**
 * @deprecated 권장하지 않음, `Button` 컴포넌트의 `list-edit` variant와 `lucide-react/Trash` 아이콘을 사용하세요.
 * @description 너무 간단한 컴포넌트, 버튼의 속성을 그대로 사용할 수 있도록 `forwardRef` 등 사용 필요
 */
export function DeleteButton({ className, ...props }: ButtonProps) {
  return (
    <Button variant="list-edit" className={clsx(className)} {...props}>
      <Trash />
      <p>삭제</p>
    </Button>
  );
}
