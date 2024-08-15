import Breadcrumb from '@/components/Breadcrumb';
import { PostHead } from '@/components/PostHead';

export function PostPetitionDetailHeadSection() {
  const breadcrumbItems = new Map<string, string | null>([
    ['소통', null],
    ['청원게시판', '/petition-notice'],
  ]);
  return (
    <>
      <div className="mb-[25px] mt-[182px] px-[200px] xs:px-[35px] sm:px-[35px] md:px-[70px] lg:px-[70px]">
        <Breadcrumb items={breadcrumbItems} />
        <PostHead
          title="[답변완료] 대동체 축제 때 에스파 불러주세요"
          writer="20****03"
          date="2021-11-08T11:44:30.327959"
        />
      </div>
      <hr />
    </>
  );
}
