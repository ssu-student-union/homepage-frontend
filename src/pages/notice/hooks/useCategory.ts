import { useNavigate, useSearchParams } from 'react-router-dom';

export function useCategory() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';

  return {
    navigate,
    categoryParam,
  };
}
