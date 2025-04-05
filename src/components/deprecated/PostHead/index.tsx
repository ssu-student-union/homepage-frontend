import { Spacing } from '../../Spacing';
import { User } from '@phosphor-icons/react';
import { formatYYYYMMDDHHMM } from '@/utils/formatYYYYMMDDHHMM';

interface PostHeadProps {
  title: string;
  writer: string;
  date: string | null;
}
/**
 * @deprecated `components/detail/PostHeader`를 사용하세요.
 */
export function PostHead({ title, writer, date }: PostHeadProps) {
  return (
    <section>
      <Spacing direction="vertical" size={30} />
      <h1 className="text-[32px] font-bold text-[#484848]">{title}</h1>
      <div className="flex items-center text-[#999999]">
        <User size={15} color="#999999" />
        <Spacing direction="horizontal" size={5} />
        <span>{writer}</span>
        <Spacing direction="horizontal" size={6} />
        <span>·</span>
        <Spacing direction="horizontal" size={6} />
        <span>{formatYYYYMMDDHHMM(date!)}</span>
      </div>
    </section>
  );
}
