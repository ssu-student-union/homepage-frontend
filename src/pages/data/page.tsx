import DataTitleSection from './containers/DataTitleSection';
import DataNavSection from './containers/dataNavSecion';
import DataBoxSection from './containers/dataBoxSection';
import { useLocation } from 'react-router-dom';
import { Search } from '@/components/Search/Search';
import UploadSection from './containers/edit/UploadSection';

export function Data() {
  const location = useLocation();
  const userId = localStorage.getItem('userId');

  return (
    <>
      <DataTitleSection userId={userId ?? 'ssutudent1897'} />
      {location.pathname === '/data' && (
        <>
          <DataNavSection />

          <DataBoxSection userId={userId ?? 'ssutudent1897'} />
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
