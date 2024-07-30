import { BoardSelector } from "@/components/Board/BoardSelector";
import { Petition } from "@/types";
import { Partnership } from "@/types";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { WriteButton } from "@/components/Buttons/BoardActionButtons";
import { Search } from "@/components/Search/Search";
import { PetitionPostContent } from "./PetitionPostContent";

export function PetitionPostSection() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [selectedSubcategory, setSelectedSubcategory] = useState(() => {
    return searchParams.get("subcategory") || Partnership[0];
  });

  useEffect(() => {
    navigate(`/petition-notice?category=${selectedSubcategory}`);
  }, [selectedSubcategory, navigate]);

  const handleSubcategorySelect = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
  };

  const handleWriteBtnClick = () => {
    navigate("/petition-notice/edit");
  };

  return (
    <div className="mt-[70px] mb-20 font-bold text-[28px] px-[200px] lg:px-10 md:px-10 sm:px-10 xs:px-10">
      <p className="mb-6">청원글</p>
      <BoardSelector
        subcategories={Petition}
        selectedSubcategory={selectedSubcategory}
        onSubcategorySelect={handleSubcategorySelect}
      />
      <div className="mt-11 relative">
        <PetitionPostContent />
        <PetitionPostContent />
        <PetitionPostContent />
        <PetitionPostContent />
        <PetitionPostContent />
        <PetitionPostContent />
        <PetitionPostContent />
        <PetitionPostContent />
        <div className="absolute bottom-[-70px] right-0">
          <WriteButton onClick={handleWriteBtnClick} />
        </div>
      </div>
      <div className="mt-[92px] text-center">
        <div>페이지네이션 들어갈 자리</div>
      </div>
      <div className="mt-[116px] lg:hidden xl:hidden xxl:hidden flex justify-center">
        <Search />
      </div>
    </div>
  );
}
