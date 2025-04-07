import { useQueryUpdater } from '@/hooks/useQueryUpdater';
import { forwardRef, useMemo } from 'react';
import { Link, LinkProps } from 'react-router';

export interface QueryLinkProps {
  query: string;
  value: string | ((prevValue: string) => string);
}

export const QueryLink = forwardRef<HTMLAnchorElement, Omit<LinkProps, 'to'> & QueryLinkProps>(
  ({ query, value, ...props }, ref) => {
    const updater = useQueryUpdater();
    const search = useMemo(() => updater(query, value), [query, value, updater]);
    return <Link ref={ref} {...props} to={{ search }} />;
  }
);
