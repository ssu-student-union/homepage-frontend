import { useState, useEffect, useRef } from 'react';
import { getBoardDataPosts } from '@/apis/getBoardDataPosts';
import DataEditBtn from './dataEditBtn';
import { Button } from '@/components/ui/button';
import { majorOptions, middleOptions, minorOptions } from './index';
import DropdownSection from './dropDownSecion';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import Pagination from '@/components/Pagination';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { SearchState } from '@/recoil/atoms/atom';
import { getBoardDataPostSearch } from '@/apis/getBoardDataPostSearch';

interface File {
  postFileId: number;
  fileName: string;
  fileUrl: string;
  fileType: string;
}

interface Post {
  postId?: number;
  category: string;
  createdAt: number;
  uploadName: string;
  uploadDate: string;
  fileData: string[];
  fileNames: string[];
  fileUrl: string[];
  fileType: string | never[]; // Allow empty array here
  title?: string;
  date?: string; // Make it optional
  content?: string[];
  files?: File[];
  isNotice?: boolean;
  [key: string]: any;
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
  const [, setData] = useState<any>([]);
  const [selectedMajorOption, setSelectedMajorOption] = useState('');
  const [selectedMiddleOption, setSelectedMiddleOption] = useState('');
  const [selectedMinorOption, setSelectedMinorOption] = useState('');
  const navigate = useNavigate();
  const [totalPage, setTotalPage] = useState(0);
  const searchInput = useRecoilValue(SearchState);
  const [isAuthor, setIsAuthor] = useState(false);
  const [initialTotalElements, setInitialTotalElements] = useState<number | null>(null);
  const [filters, setFilters] = useState<any>({});

  useEffect(() => {
    if (searchInput) {
      handleFetchData();
    }
  }, [currentPage, searchInput]);

  useEffect(() => {
    fetchTotalData();
  }, []);

  const fetchTotalData = async (page: number = 1) => {
    try {
      const TotalResponse = await getBoardDataPosts({ filters, page });

      if (TotalResponse.data?.data?.postListResDto?.length > 0) {
        setInitialTotalElements(TotalResponse.data.data.pageInfo.totalElements);
      }
    } catch (error) {
      ('');
    }
  };

  const fetchLatestSpecialCategory = async (page: number = 1) => {
    try {
      const filters = {
        subCategory: '총학생회칙',
      };
      const latestResponse = await getBoardDataPosts({ filters, page });

      if (latestResponse.data?.data?.postListResDto?.length > 0) {
        const latestPost = latestResponse.data.data.postListResDto[0];
        setLatestDataBox({
          postId: latestPost.postId,
          category: latestPost.category || '기타',
          createdAt: new Date(latestPost.date).setHours(0, 0, 0, 0),
          uploadName: latestPost.title || 'Unnamed Upload',
          uploadDate: latestPost.date || 'Unknown Date',
          date: latestPost.date || new Date().toISOString(), // Include the date property
          fileData: latestPost.files ? latestPost.files.map((file: File) => file.fileName) : [],
          fileNames: latestPost.files ? latestPost.files.map((file: File) => file.fileName) : [],
          fileUrl: latestPost.files ? latestPost.files.map((file: File) => file.fileUrl) : [],
          fileType: latestPost.files ? latestPost.files.map((file: File) => file.fileType) : [],
          isNotice: latestPost.isNotice || false,
          // Add other necessary fields
        });
      }
    } catch (error) {
      ('');
    }
  };

  const searchFetchData = async (filters: any = {}, page: number = 0) => {
    console.log('Fetching search data with filters:', filters);
    try {
      const searchResponse = await getBoardDataPostSearch({
        page,
        take: 5,
        groupCode: filters.majorCategory,
        memberCode: filters.middleCategory,
        category: filters.subCategory,
        q: searchInput,
      });

      if (searchResponse?.data?.postListResDto) {
        const currentTotalElements = searchResponse.data.pageInfo.totalElements;

        if (
          (initialTotalElements !== null && currentTotalElements > initialTotalElements) ||
          currentTotalElements === 0
        ) {
          alert('조회결과가 없습니다.');
          window.location.reload();
          return;
        }

        const categorizedDataBoxes: Post[] = searchResponse.data.postListResDto.map((post: any) => ({
          ...post,
          category: post.category || '기타',
          createdAt: new Date(post.date).setHours(0, 0, 0, 0),
          uploadName: post.title || 'Unnamed Upload',
          uploadDate: post.date || 'Unknown Date',
          fileData: post.files ? post.files.map((file: File) => file.fileName) : [],
          fileNames: post.files ? post.files.map((file: File) => file.fileName) : [],
          fileUrl: post.files ? post.files.map((file: File) => file.fileUrl) : [],
          fileType: post.files ? post.files.map((file: File) => file.fileType) : [],
        }));

        setDataBoxes(categorizedDataBoxes);
        setTotalPage(searchResponse.data.pageInfo.totalPages);
      } else {
        setDataBoxes([]);
      }
    } catch (error) {
      setDataBoxes([]);
    }
  };

  const fetchData = async (filters: any = {}, page: number = 1) => {
    try {
      const response = await getBoardDataPosts({ filters, page });
      setData(response.data);

      if (response.data?.data?.postListResDto?.length > 0) {
        const currentTotalElements = response.data.data.pageInfo.totalElements;

        if (
          (initialTotalElements !== null && currentTotalElements > initialTotalElements) ||
          currentTotalElements === 0
        ) {
          alert('조회결과가 없습니다.');
          window.location.reload();
          return;
        }

        const categorizedDataBoxes: Post[] = response.data.data.postListResDto.map((post: any) => ({
          ...post,
          category: post.category || '기타',
          createdAt: new Date(post.date).setHours(0, 0, 0, 0),
          uploadName: post.title || 'Unnamed Upload',
          uploadDate: post.date || 'Unknown Date',
          fileData: post.files ? post.files.map((file: File) => file) : [],
          fileNames: post.files ? post.files.map((file: File) => file.fileName) : [],
          fileUrl: post.files ? post.files.map((file: File) => file.fileUrl) : [],
          fileType: post.files ? post.files.map((file: File) => file.fileType) : [],
        }));

        setDataBoxes(categorizedDataBoxes);
        setTotalPage(response.data.data.pageInfo.totalPages);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchLatestSpecialCategory();
  }, []);

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
    }
  };

  useEffect(() => {
    if (searchInput) {
      // Optionally handle search input changes
    } else {
      fetchData(filters, currentPage);
    }
  }, [currentPage, filters]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleDownload = (fileUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSendData = (post: Post) => {
    if (post.category === userId) {
      navigate('/data/edit', { state: { post } });
    }
  };

  useEffect(() => {
    if (authority && authority.includes('WRITE')) {
      setIsAuthor(true);
    }
  }, [authority]);

  // Transform latestDataBox into a Post object
  const latestData: Post | null = latestDataBox
    ? {
        postId: latestDataBox.postId,
        category: latestDataBox.category || '기타',
        createdAt: latestDataBox.createdAt,
        uploadName: latestDataBox.uploadName || 'Unnamed Upload',
        uploadDate: latestDataBox.uploadDate || 'Unknown Date',
        fileData: latestDataBox.fileData || [],
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
                    className={`flex ${latestData && index === 0 ? '' : 'pl-16 xs:pl-8 sm:pl-2'} text-lg font-medium text-black xs:text-sm sm:text-sm`}
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
                      const fileType = data.fileType[fileIndex].split(',')[fileIndex] || '';
                      const fileName = data.fileNames[fileIndex] || 'Unknown File';
                      return (
                        <button
                          key={fileIndex}
                          onClick={() => handleDownload(fileUrl, fileName)}
                          className="h-[27px] w-[150px] cursor-pointer truncate rounded-[9px] border-none bg-[#f0f0f0] px-6 text-sm xs:text-[0.6rem] sm:text-[0.6rem] md:text-xs"
                        >
                          {fileType.trim()}
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
              <div className="hidden  lg:block xl:block xxl:block">
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
