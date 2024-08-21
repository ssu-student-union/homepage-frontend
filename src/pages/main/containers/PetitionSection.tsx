import { PostTextPetition } from '@/components/PostTextPetition';
import { Spacing } from '@/components/Spacing';

const PetitionSection = () => {
  return (
    <section className="w-full">
      <h1 className="text-[2rem] font-bold xs:text-[1.25rem]">인기청원</h1>
      <Spacing size={18} direction="vertical" />
      <div className="flex w-full gap-[1.5rem] overflow-x-scroll xs:pr-[1.5rem] sm:pr-[1.5rem]">
        {Array.from({ length: 2 }).map((_) => (
          <PostTextPetition current="ACTIVE" />
        ))}
      </div>
    </section>
  );
};

export default PetitionSection;
