import { useNavigate, useSearchParams } from 'react-router';

export function useCategory() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';

  return {
    navigate,
    category,
  };
}
