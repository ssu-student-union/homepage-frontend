import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export default function IntroEditButton() {
  return (
    <div className="h-[200px] w-full xl:px-[100px] lg:px-[80px] md:px-[70px] xs:px-[50px] px-[30px] flex items-center justify-end">
      <Button variant="edit">
        <Pencil size="15px" />
        <div className="pl-1 font-bold">글쓰기</div>
      </Button>
    </div>
  );
}
