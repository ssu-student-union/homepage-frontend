import { useState, useEffect } from 'react';

import { getBoardDataPosts } from '@/apis/getBoardDataPosts';
import DataEditBtn from './dataEditBtn';
import { Button } from '@/components/ui/button';
import { majorOptions, middleOptions, minorOptions } from './index';
import { DropdownSection } from './dropDownSecion';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { useRecoilValue } from 'recoil';
import { SearchState } from '@/recoil/atoms/SearchState';
import Pagination from '@/components/Pagination';

const ITEMS_PER_PAGE = 5;

export default function DataBoxSection({ userId }: { userId: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataBoxes, setDataBoxes] = useState([]);
  const [data, setData] = useState([]);
  const [selectedMajorOption, setSelectedMajorOption] = useState('');
  const [selectedMiddleOption, setSelectedMiddleOption] = useState('');
  const [selectedMinorOption, setSelectedMinorOption] = useState('');
  const [latestSpecialCategory, setLatestSpecialCategory] = useState<any>(null); // State to store the latest "총학생회칙" entry across all pages

  const searchInput = useRecoilValue(SearchState); // 전역 상태로부터 검색어 불러오기

  const fetchLatestSpecialCategory = async () => {
    try {
      const response = await getBoardDataPosts({ filters: {}, page: 1 });
      if (response.data && response.data.data && response.data.data.postListResDto) {
        const allData = response.data.data.postListResDto.map((post: any) => ({
          ...post,
          createdAt: new Date(post.date).getTime(),
          fileNames: post.fileNames || [],
        }));

        // Find the latest entry with "총학생회칙"
        const specialCategoryData = allData
          .filter((data) => data.fileNames.includes('총학생회칙'))
          .sort((a, b) => b.createdAt - a.createdAt);

        const latestSpecialCategoryData = specialCategoryData[0]; // Get the most recent "총학생회칙" entry
        setLatestSpecialCategory(latestSpecialCategoryData); // Store it in state
      }
    } catch (error) {
      console.error('Error fetching latest special category:', error);
    }
  };

  const fetchData = async (filters: any = {}, page: number = 1) => {
    console.log('Fetching data with filters:', filters);
    try {
      const response = await getBoardDataPosts({ filters, page });
      console.log('API Response:', response);
      setData(response.data);

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

        setDataBoxes(filteredDataBoxes); // Set the filtered data
      } else {
        console.error('API 응답 데이터가 예상과 다릅니다. 응답 구조:', response.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchLatestSpecialCategory(); // Fetch the latest special category when the component mounts
  }, []);

  useEffect(() => {
    // 검색어가 변경될 때마다 데이터를 다시 불러오기
    fetchData({}, currentPage);
  }, [searchInput, currentPage]);

  const handleFetchData = () => {
    const filters: any = {};
    if (selectedMajorOption) filters.majorCategory = selectedMajorOption;
    if (selectedMiddleOption) filters.middleCategory = selectedMiddleOption;
    if (selectedMinorOption) filters.minorCategory = selectedMinorOption;

    fetchData(filters, currentPage);
  };

  const currentData = dataBoxes;

  const handleDownload = (fileData: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = fileData;
    link.download = fileName;
    link.click();
  };

  const totalPage = data?.data?.pageInfo?.totalPages;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
            currentData
              .sort((a, b) => {
                // Compare by createdAt to ensure the latest "총학생회칙" entry comes first
                const isALatest = latestSpecialCategory?.createdAt === a.createdAt;
                const isBLatest = latestSpecialCategory?.createdAt === b.createdAt;

                if (isALatest && !isBLatest) return -1; // `a` should come before `b`
                if (!isALatest && isBLatest) return 1; // `b` should come before `a`

                // For items that are not the latest "총학생회칙", sort by createdAt descending
                return b.createdAt - a.createdAt;
              })
              .map((data, index) => {
                // Determine if the current data entry is the latest "총학생회칙" entry across all pages
                const isLatestSpecialCategory = latestSpecialCategory?.createdAt === data.createdAt;

                return (
                  <div
                    key={index}
                    className="h-[100px] border-b border-[#C2C2C2] py-4 sm:w-[344px] md:w-[630px] lg:w-[963px] xl:w-[1040px] xxl:w-[1533px]"
                  >
                    <div className="flex justify-between">
                      <div
                        className={`flex ${
                          isLatestSpecialCategory ? '' : 'pl-16'
                        } text-lg font-medium text-black xs:text-sm sm:text-sm`}
                      >
                        {isLatestSpecialCategory && <div className="mr-5">[공지]</div>}
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
            {userId && <Pagination totalPages={totalPage} currentPage={currentPage} onPageChange={handlePageChange} />}
            {!userId && <Pagination totalPages={totalPage} currentPage={currentPage} onPageChange={handlePageChange} />}
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
