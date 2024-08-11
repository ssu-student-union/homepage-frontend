// 소개 페이지, 공지사항 페이지와 같이 BoardNavigator, BoardSelector 두 컴포넌트 모두 활용하는 페이지 예시

import { BoardNavigator } from '@/components/Board/BoardNavigator';
import { BoardSelector } from '@/components/Board/BoardSelector';
import { Notices } from '@/types';

import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface SelectedState {
  category: string;
  subcategory: string;
}

export function BoardPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [selected, setSelected] = useState<SelectedState>(() => {
    const categoryFromUrl = searchParams.get('category') || Object.keys(Notices)[0];
    const subcategoryFromUrl = searchParams.get('subcategory') || Notices[categoryFromUrl][0];
    return {
      category: categoryFromUrl,
      subcategory: subcategoryFromUrl,
    };
  });

  useEffect(() => {
    navigate(`/board?category=${selected.category}&subcategory=${selected.subcategory}`);
  }, [selected, navigate]);

  const handleCategorySelect = (category: string) => {
    setSelected({
      category,
      subcategory: Notices[category][0],
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
        categories={Object.keys(Notices)}
        selectedCategory={selected.category}
        onCategorySelect={handleCategorySelect}
      />
      <div className="mt-4">
        <BoardSelector
          subcategories={Notices[selected.category]}
          selectedSubcategory={selected.subcategory}
          onSubcategorySelect={handleSubcategorySelect}
        />
      </div>
    </div>
  );
}

// 제휴안내 페이지, 분실문 게시판 페이지와 같이 BoardSelector 컴포넌트만 활용하는 페이지 예시

// import { BoardSelector } from "@/components/Board/BoardSelector";
// import { Partnership } from "@/types";
// import { useState, useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";

// export function BoardPage() {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();

//   const [selectedSubcategory, setSelectedSubcategory] = useState(() => {
//     return searchParams.get("subcategory") || Partnership[0];
//   });

//   useEffect(() => {
//     navigate(`/board?subcategory=${selectedSubcategory}`);
//   }, [selectedSubcategory, navigate]);

//   const handleSubcategorySelect = (subcategory: string) => {
//     setSelectedSubcategory(subcategory);
//   };

//   return (
//     <div className="p-4">
//       <BoardSelector
//         subcategories={Partnership}
//         selectedSubcategory={selectedSubcategory}
//         onSubcategorySelect={handleSubcategorySelect}
//       />
//     </div>
//   );
// }
