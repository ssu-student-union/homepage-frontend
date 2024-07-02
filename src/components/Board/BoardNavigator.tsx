import { useState } from "react";
import { Button } from "../ui/button";

interface BoardNavigatorProp {
  subcategory: string[];
}

export function BoardNavigator({ subcategory }: BoardNavigatorProp) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const baseButtonStyle = "h-[37px] px-4 py-2 border rounded-[32px] font-bold";
  const unselectedStyle = `${baseButtonStyle} border-black bg-white text-black hover:bg-primary hover:text-white hover:border-primary`;
  const selectedStyle = `${baseButtonStyle} border-primary bg-primary text-white`;

  const handleClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="ml-[85px] mt-10 flex gap-2">
      {subcategory.map((title, index) => {
        const isSelected = index === selectedIndex;
        return (
          <Button
            key={title}
            className={isSelected ? selectedStyle : unselectedStyle}
            onClick={() => handleClick(index)}
          >
            {title}
          </Button>
        );
      })}
    </div>
  );
}
