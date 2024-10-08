import { useResize } from '@/hooks/useResize';
import { useEffect, useState } from 'react';

export function ServiceNoticePostContent() {
  const [contentWidth, setContentWidth] = useState(1520); // 초기값은 1520px로 설정
  const { width } = useResize();

  useEffect(() => {
    if (width >= 1440) {
      setContentWidth(1520);
    } else if (width >= 1080 && width < 1440) {
      setContentWidth(1040);
    } else if (width >= 720 && width < 1080) {
      setContentWidth(936);
    } else if (width >= 390 && width < 720) {
      setContentWidth(596);
    } else {
      setContentWidth(316);
    }
  }, [width]);

  return (
    <div className="flex justify-between items-center h-[64px] border-b-[1px]" style={{ width: `${contentWidth}px` }}>
      <div className='text-[18px] font-[500] font-pretendard ml-[50px]'>[점검] 총학생회 홈페이지 점검으로 인한 기능 제한</div>
      <div>2023/10/02</div>
    </div>
  );
}
