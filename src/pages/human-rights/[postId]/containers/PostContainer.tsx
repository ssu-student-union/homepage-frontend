import { ReactNode } from 'react';

interface PostContentProps {
  children: ReactNode;
}

export function PostContainer({ children }: PostContentProps) {
  return (
    <section className="flex justify-center px-10 md:px-[72px] lg:px-[200px] xl:px-[200px] xxl:px-[200px]">
      <div className="w-full max-w-[1040px] py-20">{children}</div>
    </section>
  );
}
