import { BodyLayout } from '@/template/BodyLayout';
import SortLayout from '@/template/data/SortLayout';
import { HeadLayout } from '@/template/HeadLayout';

export default function DataPage() {
  return (
    <>
      <HeadLayout title="자료집"></HeadLayout>
      <SortLayout></SortLayout>
      <BodyLayout></BodyLayout>
    </>
  );
}
