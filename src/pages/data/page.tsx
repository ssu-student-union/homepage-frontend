import DataTitleSection from './containers/DataTitleSection';
import DataNavSection from './containers/dataNavSecion';
import DataBoxSection from './containers/dataBoxSection';
import { useLocation } from 'react-router-dom';
import { Search } from '@/components/Search/Search';
import UploadSection from './containers/edit/UploadSection';
import { getBoardDataPosts } from '@/apis/getBoardDataPosts';
import { useEffect, useState } from 'react';

interface Post {
  category: string;
  createdAt: number;
  uploadName: string;
  uploadDate: string;
  fileData: string[];
  fileNames: string[];
  title?: string;
  date: string;
  content?: string[];
  files?: string[];
  [key: string]: any;
}

export function Data() {
  const location = useLocation();
  const userId = localStorage.getItem('memberName');
  const [datas, setDatas] = useState<any>({});
  const [postDetail, setPostDetail] = useState<any>({});

  const fetchData = async (filters: any = {}, page: number = 1) => {
    console.log('Fetching data with filters:', filters);
    try {
      const response = await getBoardDataPosts({ filters, page });
      console.log('API Response:', response);
      setDatas(response); // 상태 업데이트
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    console.log('datas', datas);
    setPostDetail(datas?.data?.data);
  }, [datas]); // datas가 변경될 때마다 실행

  useEffect(() => {
    // 검색어가 변경될 때마다 데이터를 다시 불러오기
    fetchData();
  }, []);

  return (
    <>
      <DataTitleSection userId={userId ?? ''} />
      {location.pathname === '/data' && (
        <>
          <DataNavSection />

          <DataBoxSection authority={postDetail?.allowedAuthorities} userId={userId ?? ''} />
          <div className="flex justify-center sm:mt-[16px] md:mt-[62px] lg:hidden xl:hidden xxl:hidden">
            <Search />
          </div>
          <div className="mb-6"></div>
        </>
      )}
      {location.pathname === '/data/edit' && userId && (
        <>
          <div className="mt-8 grid place-items-center">
            <UploadSection userId={userId} />
            <div className="mb-6"></div>
          </div>
        </>
      )}
    </>
  );
}
