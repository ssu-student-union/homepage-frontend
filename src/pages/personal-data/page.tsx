import { HeadLayout } from '@/template/HeadLayout';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { NavSection } from './container/navSection';
import { useCategory } from './hook/useCategory';
import { category } from './const/data';
import ContentSection from './container/contentSection';

export default function PersonalDataPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const categoryParam = searchParams.get('category') || category[0];

  const { handleSelection } = useCategory({
    setSearchParams,
    navigate,
  });

  const selectedIndex = category.indexOf(categoryParam);
  const validIndex = selectedIndex !== -1 ? selectedIndex : 0;

  return (
    <>
      <HeadLayout title="개인정보 및 이용약관" borderOff={true} searchHidden={true} />
      <NavSection onCategoryChange={handleSelection} selectedCategoryIndex={validIndex} />
      <ContentSection categoryParam={categoryParam} />
    </>
  );
}