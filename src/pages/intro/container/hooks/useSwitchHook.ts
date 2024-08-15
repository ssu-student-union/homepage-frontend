import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface UseSwitchHookProps {
  paramName: string;
  categories: string[];
}

export function useSwitchHook({ paramName, categories }: UseSwitchHookProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const category = searchParams.get(paramName);
    const index = category ? categories.indexOf(category) : 0;
    if (index >= 0) {
      setActiveIndex(index);
    }
  }, [searchParams, paramName, categories]);

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
