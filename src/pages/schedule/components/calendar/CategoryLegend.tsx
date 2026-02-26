import { CATEGORY_COLORS } from '../../const/const';

/**
 * 카테고리 범례 컴포넌트
 * 각 카테고리의 색상을 표시합니다.
 */
export function CategoryLegend() {
  return (
    <div className="flex flex-row items-center justify-end gap-3.5 self-stretch">
      {Object.entries(CATEGORY_COLORS).map(([label, color]) => (
        <div
          key={label}
          className="flex flex-row items-center justify-end gap-1 text-xs font-normal text-[#6B7280] md:text-sm lg:text-base"
        >
          <span>{label}</span>
          <div className="size-2 rounded-full lg:size-3" style={{ backgroundColor: color }} />
        </div>
      ))}
    </div>
  );
}
