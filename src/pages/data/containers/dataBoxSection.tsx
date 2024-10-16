import { useState, useEffect, useRef } from 'react';
import { getBoardDataPosts } from '@/apis/getBoardDataPosts';
import { getBoardDataPostSearch } from '@/apis/getBoardDataPostSearch';
import DataEditBtn from './dataEditBtn';
import { Button } from '@/components/ui/button';
import { majorOptions, middleOptions, minorOptions } from './index';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import Pagination from '@/components/Pagination';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { SearchState } from '@/recoil/atoms/atom';
import DropdownSection from './dropDownSecion';

interface PostFile {
  postFileId: number;
  fileName: string;
  fileUrl: string;
  fileType: string;
}

interface Post {
  postId?: number;
  category: string;
  createdAt: string;
  uploadName: string;
  uploadDate: string;
  fileNames: string[];
  fileUrl: string[];
  fileType: string[];
  title?: string;
  date?: string;
  content?: string[];
  files?: PostFile[];
  isNotice?: boolean;
  [key: string]: any;
}

interface PostListResDto {
  postId: number;
  category: string;
  date: string;
  title: string;
  files: PostFile[];
  isNotice?: boolean;
  // Add other properties as needed based on the API response
}

interface DataBoxSectionProps {
  userId: string;
  authority?: string[];
}

export default function DataBoxSection({ userId, authority }: DataBoxSectionProps) {
  const dropdownRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataBoxes, setDataBoxes] = useState<Post[]>([]);
  const [latestDataBox, setLatestDataBox] = useState<Post | null>(null);
  const [selectedMajorOption, setSelectedMajorOption] = useState('');
  const [selectedMiddleOption, setSelectedMiddleOption] = useState('');
  const [selectedMinorOption, setSelectedMinorOption] = useState('');
  const navigate = useNavigate();
  const [totalPage, setTotalPage] = useState(0);
  const searchInput = useRecoilValue(SearchState);
  const [isAuthor, setIsAuthor] = useState(false);
  const [initialTotalElements, setInitialTotalElements] = useState<number | null>(null);
  const [filters, setFilters] = useState<any>({});

  // Fetch total data on component mount
  useEffect(() => {
    fetchTotalData();
  }, []);

  // Fetch latest special category on component mount
  useEffect(() => {
    fetchLatestSpecialCategory();
  }, []);

  // Fetch data whenever currentPage or searchInput changes
  useEffect(() => {
    if (searchInput) {
      handleFetchData();
    } else {
      fetchData(filters, currentPage);
    }
  }, [currentPage, searchInput, filters]);

  // Determine author status based on authority prop
  useEffect(() => {
    if (authority && authority.includes('WRITE')) {
      setIsAuthor(true);
    }
  }, [authority]);

  // Function to fetch total data (for initial totalElements)
  const fetchTotalData = async (page: number = 1) => {
    try {
      const TotalResponse = await getBoardDataPosts({ filters, page });

      console.log('TotalResponse', TotalResponse);
      if (TotalResponse.data.postListResDto.length > 0) {
        setInitialTotalElements(TotalResponse.data.pageInfo.totalElements);
      }
    } catch (error) {
      console.error('Error fetching total data:', error);
    }
  };

  // Helper function to format date (YYYY/MM/DD)
  const formatDate = (dateString: string): string => {
    return dateString.split(' ')[0]; // 'YYYY/MM/DD' 형식으로 변환
  };

  // Function to fetch the latest special category
  const fetchLatestSpecialCategory = async (page: number = 1) => {
    try {
      const latestResponse = await getBoardDataPosts({ filters: { subCategory: '총학생회칙' }, page });

      if (latestResponse.data.postListResDto.length > 0) {
        const latestPost = latestResponse.data.postListResDto[0];
        setLatestDataBox({
          postId: latestPost.postId,
          category: latestPost.category || '기타',
          createdAt: new Date(latestPost.date).toDateString(),
          uploadName: latestPost.title || 'Unnamed Upload',
          uploadDate: formatDate(latestPost.date) || 'Unknown Date', // Use formatted date (YYYY/MM/DD)
          date: latestPost.date || new Date().toISOString(),
          fileNames: latestPost.files ? latestPost.files.map((file: PostFile) => file.fileName) : [],
          fileUrl: latestPost.files ? latestPost.files.map((file: PostFile) => file.fileUrl) : [],
          fileType: latestPost.files ? latestPost.files.map((file: PostFile) => file.fileType) : [],
          isNotice: latestPost.isNotice || false,
        });
      }
    } catch (error) {
      console.error('Error fetching latest special category:', error);
    }
  };

  // Function to search and fetch data based on filters and search input
  const searchFetchData = async (filters: any = {}, page: number = 1) => {
    console.log('Fetching search data with filters:', filters);
    try {
      const searchResponse = await getBoardDataPostSearch({
        page: page - 1, // Assuming 0-based pagination
        take: 5,
        groupCode: filters.majorCategory,
        memberCode: filters.middleCategory,
        category: filters.subCategory,
        q: searchInput,
      });

      if (searchResponse.data.postListResDto) {
        const currentTotalElements = searchResponse.data.pageInfo.totalElements;

        if (
          (initialTotalElements !== null && currentTotalElements > initialTotalElements) ||
          currentTotalElements === 0
        ) {
          alert('조회결과가 없습니다.');
          window.location.reload();
          return;
        }

        const categorizedDataBoxes: Post[] = searchResponse.data.postListResDto.map((post: PostListResDto) => ({
          ...post,
          category: post.category || '기타',
          createdAt: new Date(post.date).toDateString(),
          uploadName: post.title || 'Unnamed Upload',
          uploadDate: formatDate(post.date) || 'Unknown Date', // Use formatted date (YYYY/MM/DD)
          fileNames: post.files ? post.files.map((file: PostFile) => file.fileName) : [],
          fileUrl: post.files ? post.files.map((file: PostFile) => file.fileUrl) : [],
          fileType: post.files ? post.files.map((file: PostFile) => file.fileType) : [],
        }));

        setDataBoxes(categorizedDataBoxes);
        setTotalPage(searchResponse.data.pageInfo.totalPages);
      } else {
        setDataBoxes([]);
      }
    } catch (error) {
      console.error('Error fetching search data:', error);
      setDataBoxes([]);
    }
  };

  // Function to fetch data based on filters and page
  const fetchData = async (filters: any = {}, page: number = 1) => {
    try {
      const response = await getBoardDataPosts({ filters, page });
      console.log('res', response);

      if (response.data.postListResDto.length > 0) {
        const currentTotalElements = response.data.pageInfo.totalElements;

        if (
          (initialTotalElements !== null && currentTotalElements > initialTotalElements) ||
          currentTotalElements === 0
        ) {
          alert('조회결과가 없습니다.');
          window.location.reload();
          return;
        }

        const categorizedDataBoxes: Post[] = response.data.postListResDto.map((post: PostListResDto) => ({
          ...post,
          category: post.category || '기타',
          createdAt: new Date(post.date).toDateString(),
          uploadName: post.title || 'Unnamed Upload',
          uploadDate: formatDate(post.date) || 'Unknown Date', // Use formatted date (YYYY/MM/DD)
          fileNames: post.files ? post.files.map((file: PostFile) => file.fileName) : [],
          fileUrl: post.files ? post.files.map((file: PostFile) => file.fileUrl) : [],
          fileType: post.files ? post.files.map((file: PostFile) => file.fileType) : [],
        }));

        setDataBoxes(categorizedDataBoxes);
        console.log('categorizedDataBoxes', categorizedDataBoxes);
        setTotalPage(response.data.pageInfo.totalPages);
      } else {
        setDataBoxes([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to handle data fetching based on dropdown selections and search input
  const handleFetchData = () => {
    if (dropdownRef.current) {
      dropdownRef.current.resetDropdowns();
    }

    const newFilters: any = {};
    if (selectedMajorOption) newFilters.majorCategory = selectedMajorOption;
    if (selectedMiddleOption) newFilters.middleCategory = selectedMiddleOption;
    if (selectedMinorOption) newFilters.subCategory = selectedMinorOption;

    setFilters(newFilters);

    if (searchInput) {
      searchFetchData(newFilters, currentPage);
    } else {
      fetchData(newFilters, currentPage);
    }
  };

  // Function to handle file downloads
  const handleDownload = (fileUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  // Function to handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Function to navigate to edit page
  const handleSendData = (post: Post) => {
    if (post.category === userId) {
      navigate('/data/edit', { state: { post } });
    }
  };

  // Transform latestDataBox into a Post object
  const latestData: Post | null = latestDataBox
    ? {
        postId: latestDataBox.postId,
        category: latestDataBox.category || '기타',
        createdAt: latestDataBox.createdAt,
        uploadName: latestDataBox.uploadName || 'Unnamed Upload',
        uploadDate: latestDataBox.uploadDate || 'Unknown Date',
        fileNames: latestDataBox.fileNames || [],
        fileUrl: latestDataBox.fileUrl || [],
        fileType: latestDataBox.fileType || [],
        isNotice: latestDataBox.isNotice || false,
        // Add any other necessary fields
      }
    : null;

  // Combine latestData with dataBoxes
  const displayedData = latestData ? [latestData, ...dataBoxes.slice(0, 4)] : dataBoxes;

  return (
    <>
      <DropdownSection
        ref={dropdownRef}
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
        <div className="place-item-center mt-8 grid border-t border-black xs:w-[344px] sm:w-[364px] md:w-[630px] lg:w-[963px] xl:w-[1040px] xxl:w-[1533px]">
          {displayedData.length > 0 ? (
            displayedData.map((data, index) => (
              <div
                key={data.postId || index}
                onClick={() => handleSendData(data)}
                className="h-[100px] border-b border-[#C2C2C2] py-4 xs:w-[341px] sm:w-[344px] md:w-[630px] lg:w-[963px] xl:w-[1040px] xxl:w-[1533px]"
              >
                <div className="flex justify-between xs:justify-between">
                  <div
                    className={`flex ${
                      latestData && index === 0 ? '' : 'pl-16 xs:pl-8 sm:pl-2'
                    } text-lg font-medium text-black xs:text-sm sm:text-sm`}
                  >
                    {latestData && index === 0 && <div className="mr-5">[공지]</div>}
                    {data.uploadName || 'Unnamed Upload'}
                  </div>
                  <div className="text-lg font-medium text-[#888888] xs:text-sm sm:text-sm">
                    {data.uploadDate || 'Unknown Date'}
                  </div>
                </div>

                <div className="mt-[5px] flex justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
                  {Array.isArray(data.fileUrl) && data.fileUrl.length > 0 ? (
                    data.fileUrl.map((fileUrl: string, fileIndex: number) => {
                      const rawFileType = data.fileType[fileIndex] || '';
                      const fileType = rawFileType.includes(',')
                        ? rawFileType.split(',')[fileIndex]
                        : rawFileType.trim();
                      const fileName = data.fileNames[fileIndex] || 'Unknown File';

                      return (
                        <button
                          key={fileIndex}
                          onClick={() => handleDownload(fileUrl, fileName)}
                          className="h-[27px] w-[150px] cursor-pointer truncate rounded-[9px] border-none bg-[#f0f0f0] px-6 text-sm xs:text-[0.6rem] sm:text-[0.6rem] md:text-xs"
                        >
                          {fileType}
                        </button>
                      );
                    })
                  ) : (
                    <span className="text-sm text-gray-500">등록된 게시물이 없습니다</span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="mb-72 mt-72 text-center text-lg font-medium text-gray-500">등록된 게시물이 없습니다</div>
          )}

          <div className="mt-[34px] xs:flex xs:justify-center sm:flex sm:justify-center md:flex md:justify-center lg:hidden xl:hidden xxl:hidden">
            {isAuthor ? <DataEditBtn /> : null}
          </div>

          {isAuthor && (
            <div className="mt-[109px] flex w-full justify-between text-lg xs:mt-[34px] sm:mt-[34px] md:mt-[34px] lg:mt-[49px] lg:pl-[123px] xl:mt-[49px] xl:pl-[123px] xxl:pl-[123px]">
              <Pagination totalPages={totalPage} currentPage={currentPage} onPageChange={handlePageChange} />
              <div className="hidden lg:block xl:block xxl:block">
                <DataEditBtn />
              </div>
            </div>
          )}

          {!isAuthor && (
            <div className="mt-[109px] flex w-full justify-between text-lg xs:mt-[34px] sm:mt-[34px] md:mt-[34px] lg:mt-[49px] xl:mt-[49px] ">
              <Pagination totalPages={totalPage} currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
