import { BreadCrumb } from "../BreadCrumb/BreadCrumb";
import { BreadCrumbItemType } from "@/types/breadcrumb";
import { Spacing } from "../Spacing/Spacing";
import { User } from "@phosphor-icons/react";
import { formatYYYYMMDDHHMM } from "@/utils/formatYYYYMMDDHHMM";

interface PostHeadProps {
  breadCrumbItems: BreadCrumbItemType[];
  title: string;
  writer: string;
  date: string;
}

export function PostHead({
  breadCrumbItems,
  title,
  writer,
  date,
}: PostHeadProps) {
  return (
    <div>
      <BreadCrumb items={breadCrumbItems} />
      <Spacing direction="vertical" size={30} />
      {/* 색 수정 필요 */}
      <h1 className="text-[32px] font-bold text-[#484848]">{title}</h1>
      <div className="flex items-center text-[#999999]">
        <User size={15} color="#999999" />
        <Spacing direction="horizontal" size={5} />
        <span>{writer}</span>
        <Spacing direction="horizontal" size={6} />
        <span>·</span>
        <Spacing direction="horizontal" size={6} />
        <span>{formatYYYYMMDDHHMM(date)}</span>
      </div>
    </div>
  );
}
