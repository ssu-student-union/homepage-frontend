import { EditLayoutProps } from '@/types/layout';

export function EditLayout({ children, title }: EditLayoutProps) {
  return (
    <div className="mb-14 mt-[150px] flex flex-col px-[200px] xs:px-[34px] sm:px-[34px] md:px-[72px]">
      <div className="mb-[29px] whitespace-nowrap text-[34px] font-bold">{title}</div>
      <main>{children}</main>
    </div>
  );
}
