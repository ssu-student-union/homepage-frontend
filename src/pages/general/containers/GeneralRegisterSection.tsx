import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function GeneralRegisterSection({firstInput, secondInput, subSection1,buttonSection}) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-4 flex flex-col items-center">
        <div className="text-[rgb(0,0,0)] text-2xl not-italic font-bold leading-[normal] pb-4">{subSection1}</div>
        <Input type="text" placeholder={firstInput} className="w-[420px] mb-4" />
        <Input type="text" placeholder={secondInput} className="w-[420px] mb-4" />
        <Button variant={"default"} size={"default"} className="w-[420px] mt-[20]">{buttonSection}</Button>
      </div>
    </div>
  );
}
