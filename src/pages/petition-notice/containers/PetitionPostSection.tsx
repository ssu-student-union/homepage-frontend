import { BoardSelector } from '@/components/Board/BoardSelector';
import { Petition } from '@/types';
import { Partnership } from '@/types';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { WriteButton } from '@/components/Buttons/BoardActionButtons';
import { Search } from '@/components/Search/Search';
import { PetitionPostContent } from './PetitionPostContent';

export function PetitionPostSection() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [selectedSubcategory, setSelectedSubcategory] = useState(() => {
    return searchParams.get('subcategory') || Partnership[0];
  });

  useEffect(() => {
    navigate(`/petition-notice?category=${selectedSubcategory}`);
  }, [selectedSubcategory, navigate]);

  const handleSubcategorySelect = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
  };

  const handleWriteBtnClick = () => {
    navigate('/petition-notice/edit');
  };

  return (
    <div className="mb-20 mt-[70px] px-[200px] text-[28px] font-bold xs:px-10 sm:px-10 md:px-10 lg:px-10">
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
        <div className="flex xs:mt-9 xs:flex-col-reverse sm:mt-9 sm:flex-col-reverse md:mt-8 md:justify-between lg:mt-8 lg:justify-between xl:mt-8 xl:justify-between xxl:mt-8 xxl:justify-between">
          <div className="w-[94px]  "></div>
          <div className="flex justify-center xs:mt-[17px] sm:mt-[17px]">
            <div className="h-[34px] w-[253px] border bg-primary text-center text-sm font-light lg:mt-[66px] xl:mt-[66px] xxl:mt-[66px]">
              pagination components
            </div>
          </div>
          <div className="flex justify-end xs:justify-center sm:justify-center">
            <WriteButton onClick={handleWriteBtnClick} />
          </div>
        </div>
      </div>
      <div className="flex justify-center xs:mt-[17px] sm:mt-[17px] md:mt-[42px] lg:hidden xl:hidden xxl:hidden">
        <Search />
      </div>
    </div>
  );
}
