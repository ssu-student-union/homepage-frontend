import { PostTextPetition } from '@/components/PostTextPetition';
import { Spacing } from '@/components/Spacing';
import { useGetPetitionTopLiked } from '@/hooks/useGetPetitionPostsTopLiked';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PetitionSection = () => {
  const navigate = useNavigate();
  const { data } = useGetPetitionTopLiked({ page: 0, take: 2 });
  const handlePostDetail = (id: number) => {
    navigate(`/petition-notice/${id}`);
    window.scrollTo(0, 0);
  };
  console.log('청원' + data);

  return (
    <section className="w-full">
      <div className="flex items-center">
        <h1 className="text-[2rem] font-bold xs:text-[1.25rem]">인기청원</h1>
        <ArrowUpRight
          onClick={() => {
            navigate(`/petition-notice/`);
            window.scrollTo(0, 0);
          }}
          className="ml-2 cursor-pointer"
          size={24}
          strokeWidth={1.5}
        />
      </div>
      <Spacing size={18} direction="vertical" />
      <div className="flex w-full gap-[1.5rem] overflow-x-scroll scrollbar-hide xs:pr-[1.5rem] sm:pr-[1.5rem]">
        {data?.data.postListResDto.map((petitionData) => (
          <PostTextPetition data={petitionData} key={petitionData.postId} onClick={handlePostDetail} />
        ))}
      </div>
    </section>
  );
};

export default PetitionSection;
