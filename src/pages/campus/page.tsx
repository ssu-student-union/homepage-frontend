import { HeadLayout } from '@/template/HeadLayout';
import CampusMapSection from './container/CampusMapSection';

export default function CampusPage() {
  return (
    <>
      <HeadLayout title="캠퍼스맵" searchHidden={true} />
      <CampusMapSection />
    </>
  );
}
