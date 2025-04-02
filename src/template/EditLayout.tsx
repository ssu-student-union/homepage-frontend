import { EditLayoutProps } from '@/types/layout';

export function EditLayout({ children, title }: EditLayoutProps) {
  return (
    <div className="mb-14 mt-[150px] flex flex-col px-[34px] md:px-[72px] lg:px-[200px]">
      <div className="mb-[29px] whitespace-nowrap text-[2.125rem] font-bold">{title}</div>
      <main>{children}</main>
    </div>
  );
}
