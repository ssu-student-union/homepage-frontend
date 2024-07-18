import { Button } from "../ui/button";
import { List, Pencil } from "@phosphor-icons/react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabled?: boolean;
}

export function RegisterButton({ isDisabled, ...props }: ButtonProps) {
  const baseStyle =
    "min-[721px]:w-32 min-[391px]:w-[605px] w-[315px] h-10 text-white text-lg text-center font-semibold rounded-[7px]";
  const activeStyle = "bg-primary";
  const disabledStyle = "bg-gray-600 cursor-not-allowed";

  const buttonStyle = `${baseStyle} ${
    isDisabled ? disabledStyle : activeStyle
  }`;

  return (
    <div className="flex">
      <Button className={buttonStyle} disabled={isDisabled} {...props}>
        등록
      </Button>
    </div>
  );
}

const Write_Gap = "pl-5 flex gap-1";
const List_Edit_Gap = "pl-2 flex gap-2";
const commonStyle =
  "pr-6 w-32 h-10 bg-white border border-gray-400 text-lg text-center font-semibold text-gray-700 hover:border-primary hover:bg-white hover:text-primary";

export function ListButton() {
  return (
    <div className="flex">
      <Button className={`${commonStyle} ${List_Edit_Gap}`}>
        <List />
        목록
      </Button>
    </div>
  );
}

export function WriteButton() {
  return (
    <div className="flex">
      <Button className={`${commonStyle} ${Write_Gap}`}>
        <Pencil />
        글쓰기
      </Button>
    </div>
  );
}

export function EditButton() {
  return (
    <div className="flex">
      <Button className={`${commonStyle} ${List_Edit_Gap}`}>
        <Pencil />
        편집
      </Button>
    </div>
  );
}
