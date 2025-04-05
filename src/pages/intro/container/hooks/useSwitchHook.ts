import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

interface UseSwitchHookProps {
  paramName: string;
  categories: string[];
  initialIndex?: number;
}

export function useSwitchHook({ paramName, categories, initialIndex = 0 }: UseSwitchHookProps) {
  const [activeIndex, setActiveIndex] = useState<number>(initialIndex);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const category = searchParams.get(paramName);
    const index = category ? categories.indexOf(category) : initialIndex;
    if (index >= 0) {
      setActiveIndex(index);
    }
  }, [searchParams, paramName, categories, initialIndex]);

  const handleSwitchClick = (index: number) => {
    setActiveIndex(index);
    const newParams = new URLSearchParams(searchParams);
    newParams.set(paramName, categories[index]);
    navigate({ search: newParams.toString() }, { replace: true });
  };

  return {
    activeIndex,
    handleSwitchClick,
  };
}
