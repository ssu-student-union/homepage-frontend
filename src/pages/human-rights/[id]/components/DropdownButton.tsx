import { ButtonHTMLAttributes, forwardRef, RefObject, useEffect, useRef, useState } from 'react';
import { cn } from '@/libs/utils.ts';

export interface DropdownButtonItem {
  id: string;
  text: string;
}

interface DropdownButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  items: DropdownButtonItem[];
  onItemClick: (id: string) => void;
}

function useOutsideClick<T extends Node>(ref: RefObject<T>, onOutsideClick: () => void) {
  useEffect(() => {
    const handler = (evt: MouseEvent) => {
      if (ref.current && !ref.current.contains(evt.target as Node)) {
        onOutsideClick();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, [onOutsideClick, ref]);
}

const DropdownMenu = forwardRef<HTMLUListElement, Pick<DropdownButtonProps, 'items' | 'onItemClick' | 'className'>>(
  ({ items, onItemClick, className }, ref) => {
    return (
      <ul
        ref={ref}
        className={cn('absolute right-0 top-0 min-w-fit rounded-md bg-white text-[#374151] drop-shadow', className)}
      >
        {items.map((item) => (
          <li
            className="text-nowrap px-8 py-2 text-center text-xs font-medium first:rounded-t-md last:rounded-b-md hover:bg-gray-200 active:bg-gray-300"
            key={item.id}
            onClick={() => onItemClick(item.id)}
          >
            {item.text}
          </li>
        ))}
      </ul>
    );
  }
);

export function DropdownButton({ items, onItemClick, children, className, ...props }: DropdownButtonProps) {
  const ref = useRef<HTMLUListElement>(null);
  const [opened, setOpened] = useState(false);

  useOutsideClick<HTMLUListElement>(ref, () => opened && setOpened(false));
  return (
    <button className={cn('relative', className)} {...props}>
      <DropdownMenu
        ref={ref}
        className={opened ? 'block' : 'hidden'}
        items={items}
        onItemClick={(id) => {
          setOpened(false);
          onItemClick(id);
        }}
      />
      <div onClick={() => setOpened(true)}>{children}</div>
    </button>
  );
}
