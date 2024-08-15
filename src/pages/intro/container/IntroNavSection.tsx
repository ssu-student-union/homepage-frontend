import { RenderMainSwitch, RenderSubSwitch } from './component/RenderSwitch';

export default function IntroNavSection() {
  return (
    <div className="sm: flex h-[150px] w-full flex-col justify-evenly xs:h-[100px] sm:h-[100px]">
      <RenderMainSwitch />
      <RenderSubSwitch />
    </div>
  );
}
