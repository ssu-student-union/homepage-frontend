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
      <div className="mt-11">
        <div className="relative">
          <PetitionPostContent />
          <PetitionPostContent />
          <PetitionPostContent />
          <PetitionPostContent />
          <PetitionPostContent />
          <PetitionPostContent />
          <PetitionPostContent />
          <PetitionPostContent />
        </div>
        <div className="flex sm:flex-col-reverse sm:mt-9 xs:flex-col-reverse xs:mt-9 md:justify-between md:mt-8 lg:justify-between lg:mt-8 xl:justify-between xl:mt-8 xxl:justify-between xxl:mt-8">
          <div className="w-[94px]  "></div>
          <div className="flex justify-center sm:mt-[17px] xs:mt-[17px]">
            <div className="w-[253px] h-[34px] border bg-primary text-center text-sm font-light lg:mt-[66px] xl:mt-[66px] xxl:mt-[66px]">
              pagination components
            </div>
          </div>
          <div className="flex sm:justify-center xs:justify-center justify-end">
            <WriteButton onClick={handleWriteBtnClick} />
          </div>
        </div>
      </div>
      <div className="sm:mt-[17px] xs:mt-[17px] md:mt-[42px] lg:hidden xl:hidden xxl:hidden flex justify-center">
        <Search />
      </div>
    </div>
  );
}
