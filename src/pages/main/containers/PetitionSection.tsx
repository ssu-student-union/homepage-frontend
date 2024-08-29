import { PostTextPetition } from '@/components/PostTextPetition';
import { Spacing } from '@/components/Spacing';
import { useGetPetitionTopLiked } from '@/hooks/useGetPetitionPostsTopLiked';

const PetitionSection = () => {
  const { data } = useGetPetitionTopLiked({ page: 0, take: 2 });

  return (
    <section className="w-full">
      <h1 className="text-[2rem] font-bold xs:text-[1.25rem]">인기청원</h1>
      <Spacing size={18} direction="vertical" />
      <div className="scrollbar-hide flex w-full gap-[1.5rem] overflow-x-scroll xs:pr-[1.5rem] sm:pr-[1.5rem]">
        {data?.data.postListResDto.map((petitionData) => (
          <PostTextPetition
            data={petitionData}
            key={petitionData.postId}
            onClick={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default PetitionSection;
