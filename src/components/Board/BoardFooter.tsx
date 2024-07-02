import { Button } from "../ui/button";

export function BoardFooter() {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        className="px-5 py-4 w-96 h-14 border border-stone-400 rounded-xl text-base font-bold  placeholder:text-stone-300"
        placeholder="원하시는 키워드를 입력하세요"
      ></input>
      <Button className="p-4 w-24 h-14 bg-primary text-white">검색</Button>
    </div>
  );
}
