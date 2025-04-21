import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { CATEGORIES } from '@/pages/data/const/category';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import { cn } from '@/libs/utils';

export type DataCategoryValue = [string?, string?, string?];

export interface CategoryPopoverProps {
  className?: string;
  children?: React.ReactNode;
  value: DataCategoryValue;
  onChange: (value: DataCategoryValue) => void;
}

const firstCategories = Object.keys(CATEGORIES);

export const CategoryPopover = ({ className, children, value, onChange }: CategoryPopoverProps) => {
  const [open, setOpen] = useState(false);
  const depth = value.length;
  const secondCategories = depth > 0 ? Object.keys(CATEGORIES[value[0]!]) : undefined;
  const thirdCategories = depth > 1 ? CATEGORIES[value[0]!][value[1]!] : undefined;
  const currentCategories = depth === 0 ? firstCategories : depth === 1 ? secondCategories : thirdCategories;

  function handleCategoryChange(name: string) {
    if (depth === 0) {
      onChange([name]);
    } else if (depth === 1) {
      onChange([value[0], name]);
    } else if (depth >= 2) {
      onChange([value[0], value[1], name]);
      setOpen(false);
    }
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={className} asChild>
        {children ?? (
          <Button
            variant="outline"
            size="lg"
            className={cn('flex w-full justify-start px-4 text-left active:brightness-95', className)}
          >
            {depth > 0 ? (
              <div className="flex items-center gap-1">
                {value[0] && <span className="text-muted-foreground">{value[0]}</span>}
                {value[1] && (
                  <>
                    <ChevronRight className="size-4" />
                    <span className="font-semibold">{value[1]}</span>
                  </>
                )}
                {value[2] && (
                  <>
                    <ChevronRight className="size-4" />
                    <span className="text-muted-foreground">{value[2]}</span>
                  </>
                )}
              </div>
            ) : (
              '분류 선택'
            )}
            <div className="flex grow items-center justify-end">
              <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} />
            </div>
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64 md:w-96">
        {depth > 0 && (
          <>
            <Button
              variant="ghost"
              className="flex w-full justify-start gap-2 pl-1 text-left"
              onClick={() => onChange(value.slice(0, depth > 2 ? -2 : -1) as DataCategoryValue)}
            >
              <ChevronLeft className="size-4" />
              이전
            </Button>
            <hr className="my-2 border-t border-t-border" />
          </>
        )}
        <ScrollArea className="flex h-48 flex-col gap-0.5">
          {currentCategories?.map((name) => (
            <Button
              key={name}
              variant="ghost"
              className="w-full justify-start text-left"
              onClick={() => handleCategoryChange(name)}
            >
              {name}
            </Button>
          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
