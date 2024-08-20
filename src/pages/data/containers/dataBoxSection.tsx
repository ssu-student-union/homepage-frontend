import { useState, useEffect, SetStateAction } from 'react';
import {
  PaginationContainer,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationTenNext,
  PaginationTenPrevious,
} from '@/components/ui/pagination';

import { majorOptions } from './index';
import DataEditBtn from './dataEditBtn';

const ITEMS_PER_PAGE = 5;

export default function DataBoxSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataBoxes, setDataBoxes] = useState([]);

  useEffect(() => {
    let fileData = JSON.parse(localStorage.getItem('fileData')) || [];

    fileData = fileData.reverse();

    const categorizedDataBoxes = fileData.map((file: any) => ({
      ...file,
      category: majorOptions[Math.floor(Math.random() * majorOptions.length)],
      createdAt: file.createdAt ? new Date(file.createdAt).getTime() : new Date().getTime(),
    }));

    const sortedData = categorizedDataBoxes.sort((a, b) => b.createdAt - a.createdAt);
    setDataBoxes(sortedData);
  }, []);

  const totalPages = Math.ceil(dataBoxes.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: SetStateAction<number>) => {
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
    <div className="mt-8 grid place-items-center border-t border-black sm:w-[364px] md:w-[630px] lg:w-[963px] xl:w-[1040px] xxl:w-[1533px]">
      {currentData.map((data, index) => (
        <div
          key={index}
          className="h-[100px] border-b border-[#C2C2C2] py-4 sm:w-[344px] md:w-[630px] lg:w-[963px] xl:w-[1040px] xxl:w-[1533px]"
        >
          <div className="flex justify-between">
            <div className="text-lg font-medium text-black xs:text-sm sm:text-sm">
              {data.uploadName || 'Unnamed Upload'}
            </div>
            <div className="text-lg font-medium text-[#888888] xs:text-sm sm:text-sm">
              {data.uploadDate || 'Unknown Date'}
            </div>
          </div>
          <div className="mt-[5px] flex justify-end space-x-2">
            {Array.isArray(data.fileData) &&
              Array.isArray(data.fileName) &&
              data.fileData.map((fileData: string, fileIndex: number) => (
                <button
                  key={fileIndex}
                  onClick={() => handleDownload(fileData, data.fileName[fileIndex])}
                  className="h-[31px] w-auto cursor-pointer rounded-[5px] border-none bg-[#f0f0f0] px-6 text-[16px]"
                >
                  {data.fileName[fileIndex]}
                </button>
              ))}
          </div>
        </div>
      ))}

      <div className="mt-[34px] hidden xs:block sm:block md:block">
        <DataEditBtn />
      </div>

      <div className="mt-[109px] flex w-full justify-between sm:mt-[34px] md:mt-[34px] lg:mt-[49px] xl:mt-[49px]">
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

        <div className="hidden lg:block xl:block xxl:block">
          <DataEditBtn />
        </div>
      </div>
    </div>
  );
}
