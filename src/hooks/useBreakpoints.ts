import { useEffect, useMemo, useState } from 'react';
import { breakpoints } from 'tailwind:breakpoints';

const registerBreakpoint = (breakpoint: `${number}px`, onChange: (matches: boolean) => void) => {
  const mql = window.matchMedia(`(min-width: ${breakpoint})`);
  const listener = (e: MediaQueryListEvent) => {
    onChange(e.matches);
  };
  onChange(mql.matches);
  mql.addEventListener('change', listener);
  return () => mql.removeEventListener('change', listener);
};

const keys = Object.keys(breakpoints) as Array<keyof typeof breakpoints>;
const values = Object.values(breakpoints) as Array<`${number}px`>;

export const useBreakpoints = () => {
  const [breakpointIdx, setBreakpointIdx] = useState<number>(0);
  const breakpoint = useMemo(() => keys[breakpointIdx] ?? null, [breakpointIdx]);
  useEffect(() => {
    const removal = values.map((width, idx) => {
      const breakpoint = width as `${number}px`;
      return registerBreakpoint(breakpoint, (matches) => {
        if (matches) {
          setBreakpointIdx(idx);
        } else {
          setBreakpointIdx((prev) => (prev > idx - 1 ? idx - 1 : prev));
        }
      });
    });
    return () => {
      removal.forEach((remove) => remove());
    };
  }, []);
  return breakpoint;
};
