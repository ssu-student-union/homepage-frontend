import { useState, useEffect } from 'react';
import {
  PaginationContainer,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationTenNext,
  PaginationTenPrevious,
} from '@/components/ui/pagination';
import { getBoardDataPosts } from '@/apis/getBoardDataPosts';
import DataEditBtn from './dataEditBtn';
import { Button } from '@/components/ui/button';
import { majorOptions, middleOptions, minorOptions } from './index';
import { DropdownSection } from './dropDownSecion';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { useRecoilValue } from 'recoil';
import { SearchState } from '@/recoil/atoms/SearchState';

const ITEMS_PER_PAGE = 5;

export default function DataBoxSection({ userId }: { userId: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataBoxes, setDataBoxes] = useState([]);
  const [selectedMajorOption, setSelectedMajorOption] = useState('');
  const [selectedMiddleOption, setSelectedMiddleOption] = useState('');
  const [selectedMinorOption, setSelectedMinorOption] = useState('');

  const searchInput = useRecoilValue(SearchState); // 전역 상태로부터 검색어 불러오기

  const fetchData = async (filters: any = {}) => {
    console.log('Fetching data with filters:', filters);
    try {
      const response = await getBoardDataPosts(filters);
      console.log('API Response:', response);

      if (response.data && response.data.data && response.data.data.postListResDto) {
        const categorizedDataBoxes = response.data.data.postListResDto.map((post: any) => ({
          ...post,
          category: post.category || '기타',
          createdAt: new Date(post.date).getTime(),
          uploadName: post.title,
          uploadDate: post.date,
          fileData: post.files || [],
          fileNames: post.fileNames || [],
          fileName: post.content || [],
        }));

        // 검색어에 따른 필터링 (최소 두 글자 이상 일치)
        const filteredDataBoxes = categorizedDataBoxes.filter((data) => {
          if (!searchInput) return true; // 검색어가 없으면 모든 데이터 반환
          const searchPattern = new RegExp(searchInput.split('').join('.*'), 'i'); // 패턴 생성
          return searchPattern.test(data.uploadName);
        });

        const specialCategoryData = filteredDataBoxes
          .filter((data) => data.fileNames.includes('총학생회칙'))
          .sort((a, b) => b.createdAt - a.createdAt)
          .slice(0, 1);

        const regularData = filteredDataBoxes.filter((data) => !data.fileNames.includes('총학생회칙'));

        const sortedRegularData = regularData.sort((a, b) => b.createdAt - a.createdAt);

        const combinedData = [...specialCategoryData, ...sortedRegularData];
        setDataBoxes(combinedData);
      } else {
        console.error('API 응답 데이터가 예상과 다릅니다. 응답 구조:', response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // 검색어가 변경될 때마다 데이터를 다시 불러와영
    fetchData();
  }, [searchInput]);

  const handleFetchData = () => {
    const filters: any = {};
    if (selectedMajorOption) filters.majorCategory = selectedMajorOption;
    if (selectedMiddleOption) filters.middleCategory = selectedMiddleOption;
    if (selectedMinorOption) filters.minorCategory = selectedMinorOption;

    fetchData(filters);
  };

  const totalPages = Math.ceil(dataBoxes.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleTenNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 10, totalPages));
  };

  const handleTenPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 10, 1));
  };

  const currentData = dataBoxes.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleDownload = (fileData: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = fileData;
    link.download = fileName;
    link.click();
  };

  return (
    <>
      <DropdownSection
        majorOptions={majorOptions}
        middleOptions={middleOptions}
        minorOptions={minorOptions}
        onMajorOptionChange={(value) => setSelectedMajorOption(value)}
        onMiddleOptionChange={(value) => setSelectedMiddleOption(value)}
        onMinorOptionChange={(value) => setSelectedMinorOption(value)}
      />
      <DropdownMenu />
      <div className="flex w-full justify-center">
        <Button className="ml-80 mt-[16px] h-[41px] w-[94px] px-9 py-2 xs:ml-52 sm:ml-60" onClick={handleFetchData}>
          조회
        </Button>
      </div>

      <div className="flex justify-center">
        <div className="mt-8 grid place-items-center border-t border-black sm:w-[364px] md:w-[630px] lg:w-[963px] xl:w-[1040px] xxl:w-[1533px]">
          {currentData.length > 0 ? (
            currentData.map((data, index) => {
              const hasSpecialCategory = data.fileNames.includes('총학생회칙');
              return (
                <div
                  key={index}
                  className="h-[100px] border-b border-[#C2C2C2] py-4 sm:w-[344px] md:w-[630px] lg:w-[963px] xl:w-[1040px] xxl:w-[1533px]"
                >
                  <div className="flex justify-between">
                    <div
                      className={`flex ${hasSpecialCategory ? '' : 'pl-16'} text-lg font-medium text-black xs:text-sm sm:text-sm`}
                    >
                      {hasSpecialCategory && <div className="mr-5">[공지]</div>}
                      {data.uploadName || 'Unnamed Upload'}
                    </div>
                    <div className="text-lg font-medium text-[#888888] xs:text-sm sm:text-sm">
                      {data.uploadDate || 'Unknown Date'}
                    </div>
                  </div>

                  <div className="mt-[5px] flex justify-end space-x-2">
                    {data.fileData.map((fileData: string, fileIndex: number) => (
                      <button
                        key={fileIndex}
                        onClick={() => handleDownload(fileData, data.fileNames[fileIndex])}
                        className="h-[31px] w-auto cursor-pointer rounded-[5px] border-none bg-[#f0f0f0] px-6 text-base xs:text-xs sm:text-xs md:text-sm"
                      >
                        {data.fileName}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-lg font-medium text-gray-500">No data available</div>
          )}

          <div className="mt-[34px] hidden xs:block sm:block md:block">{userId && <DataEditBtn />}</div>

          <div className="mt-[109px] flex w-full justify-between sm:mt-[34px] md:mt-[34px] lg:mt-[49px] xl:mt-[49px]">
            {userId && (
              <PaginationContainer className="ml-[89px] xs:ml-0 sm:ml-0 md:ml-0">
                <PaginationContent>
                  <PaginationTenPrevious onClick={handleTenPreviousPage} />
                  <PaginationPrevious onClick={handlePreviousPage} />
                  {[...Array(totalPages)].map((_, index) => (
                    <PaginationItem
                      key={index}
                      isActive={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </PaginationItem>
                  ))}
                  <PaginationNext onClick={handleNextPage} />
                  <PaginationTenNext onClick={handleTenNextPage} />
                </PaginationContent>
              </PaginationContainer>
            )}
            {!userId && (
              <PaginationContainer className="ml-[0px] xs:ml-0 sm:ml-0 md:ml-0">
                <PaginationContent>
                  <PaginationTenPrevious onClick={handleTenPreviousPage} />
                  <PaginationPrevious onClick={handlePreviousPage} />
                  {[...Array(totalPages)].map((_, index) => (
                    <PaginationItem
                      key={index}
                      isActive={index + 1 === currentPage}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </PaginationItem>
                  ))}
                  <PaginationNext onClick={handleNextPage} />
                  <PaginationTenNext onClick={handleTenNextPage} />
                </PaginationContent>
              </PaginationContainer>
            )}
            {userId && (
              <div className="hidden lg:block xl:block xxl:block">
                <DataEditBtn />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
