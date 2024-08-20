import { Header } from '@/containers/common/Header/Header';
import { State } from '@/containers/common/Header/const/state';
import DataTitleSection from './containers/DataTitleSection';
import DataNavSection from './containers/dataNavSecion';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { DropdownSection } from './containers/dropDownSecion';
import DataBoxSection from './containers/dataBoxSection';
import { useLocation } from 'react-router-dom'; // 경로를 가져오기 위한 useLocation import
import { majorOptions, middleOptions, minorOptions } from './containers';
import { Search } from '@/components/Search/Search';
import { Button } from '@/components/ui/button';
import UploadSection from './containers/edit/UploadSection';

export function Data() {
  const location = useLocation();
  const userId = 'ssutudent1897';

  return (
    <>
      <Header state={State.Login} />
      <DataTitleSection userId="ssutudent1897" />

      {location.pathname === '/data' && (
        <>
          <DataNavSection />
          <DropdownSection majorOptions={majorOptions} middleOptions={middleOptions} minorOptions={minorOptions} />
          <DropdownMenu />
          <div className="flex w-full justify-center">
            <Button className="ml-80 mt-[16px] h-[41px] w-[94px] px-9 py-2 xs:ml-52 sm:ml-60">조회</Button>
          </div>

          <div className="flex justify-center">
            <DataBoxSection />
          </div>
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
