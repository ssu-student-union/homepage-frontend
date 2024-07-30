import { type CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { MainHeroSection } from "@/pages/main/containers/MainHeroSection";
import { useEffect, useState } from "react";
import { Counter, CounterItem } from "./components/counter";
import { IMAGE_COUNT } from "./const";

const MainCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <Carousel setApi={setApi} className="h-full w-full overflow-hidden">
        <CarouselContent>
          {Array.from({ length: IMAGE_COUNT }).map((_, index) => (
            <CarouselItem className="h-screen w-full">
              <Counter>
                <CounterItem isActive={1 === current} />
                <CounterItem isActive={2 === current} />
                <CounterItem isActive={3 === current} />
              </Counter>
              <MainHeroSection />
              <div className="size-full z-10 bg-black absolute opacity-20" />
              <img
                src={`/image/${index + 1}.jpeg`}
                draggable={false}
                alt="landscape"
                className="z-0 size-screen"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};

export default MainCarousel;
