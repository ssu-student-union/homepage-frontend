import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

export default function IntroEditButton() {
  return (
    <div className="flex h-[200px] w-full items-center justify-end px-[30px] xs:px-[50px] md:px-[70px] lg:px-[80px] xl:px-[100px]">
      <Button variant="edit">
        <Pencil size="15px" />
        <div className="pl-1 font-bold">글쓰기</div>
      </Button>
    </div>
  );
}
