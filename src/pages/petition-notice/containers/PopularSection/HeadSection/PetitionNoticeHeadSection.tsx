import { HeadLayout } from '@/template/HeadLayout';

export function PetitionNoticeHeadSection() {
  return (
    <HeadLayout
      title="학생청원게시판"
      subtitle={
        <>
          100인 이상의 동의를 받으면,{' '}
          <span className="block md:inline">
            <span className="font-pretendard text-primary">중앙운영위원회의 안건</span>으로 상정됩니다.
          </span>
        </>
      }
      borderOff={false}
    />
  );
}
