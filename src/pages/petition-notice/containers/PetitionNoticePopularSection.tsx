// import { CaretCircleRight } from "@phosphor-icons/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function PetitionNoticePopularSection() {
  return (
    <div className="mt-[70px] font-bold text-[28px] pl-[200px] lg:pl-10 md:pl-10 sm:pl-10 xs:pl-10 overflow-x-hidden">
      <p className="mb-[11px]">인기청원</p>

      <div className="flex gap-6 xs:hidden sm:hidden md:hidden lg:hidden xl:hidden w-max">
        <div className="w-[362px] h-[237px] bg-primary flex-shrink-0"></div>
        <div className="w-[362px] h-[237px] bg-primary/80 flex-shrink-0"></div>
        <div className="w-[362px] h-[237px] bg-primary/60 flex-shrink-0"></div>
        <div className="w-[362px] h-[237px] bg-primary/40 flex-shrink-0 "></div>
      </div>

      <Carousel className="xxl:hidden w-max">
        <CarouselContent className="-ml-1">
          <CarouselItem className="basis-1/4 w-[362px] h-[237px] bg-primary mr-6 flex-shrink-0" />
          <CarouselItem className="basis-1/4 w-[362px] h-[237px] bg-primary/80 mr-6 flex-shrink-0" />
          <CarouselItem className="basis-1/4 w-[362px] h-[237px] bg-primary/60 mr-6 flex-shrink-0" />
          <CarouselItem className="basis-1/4 w-[362px] h-[237px] bg-primary/40 flex-shrink-0" />
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
