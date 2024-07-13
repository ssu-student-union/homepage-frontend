import { BoardNavigator } from "@/components/Board/BoardNavigator";
import { BoardSelector } from "@/components/Board/BoardSelector";
import { StudentUnion } from "@/components/Board/const";
import { useState } from "react";

interface SelectedState {
  category: string;
  subcategory: string;
}

export function BoardPage() {
  const [selected, setSelected] = useState<SelectedState>(() => {
    const initialCategory = Object.keys(StudentUnion)[0];
    return {
      category: initialCategory,
      subcategory: StudentUnion[initialCategory][0],
    };
  });

  const handleCategorySelect = (category: string) => {
    setSelected({
      category,
      subcategory: StudentUnion[category][0],
    });
  };

  const handleSubcategorySelect = (subcategory: string) => {
    setSelected((prev) => ({
      ...prev,
      subcategory,
    }));
  };

  return (
    <div className="p-4">
      <BoardNavigator
        categories={Object.keys(StudentUnion)}
        selectedCategory={selected.category}
        onCategorySelect={handleCategorySelect}
      />
      <div className="mt-4">
        <BoardSelector
          subcategories={StudentUnion[selected.category]}
          selectedSubcategory={selected.subcategory}
          onSubcategorySelect={handleSubcategorySelect}
        />
      </div>
    </div>
  );
}
