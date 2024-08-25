import { Header } from '@/containers/common/Header/Header';
import { State } from '@/containers/common/Header/const/state';
import DataTitleSection from './containers/DataTitleSection';
import DataNavSection from './containers/dataNavSecion';
import DataBoxSection from './containers/dataBoxSection';
import { useLocation } from 'react-router-dom'; // 경로를 가져오기 위한 useLocation import
import { Search } from '@/components/Search/Search';
import UploadSection from './containers/edit/UploadSection';

export function Data() {
  const location = useLocation();
  const userId = 'ssuoperating1897';

  return (
    <>
      <Header state={State.Login} />
      <DataTitleSection userId="ssutudent1897" />

      {location.pathname === '/data' && (
        <>
          <DataNavSection />

          <DataBoxSection />
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
