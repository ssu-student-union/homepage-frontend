import { PostTextPetition } from '@/components/deprecated/PostTextPetition';
import { Spacing } from '@/components/Spacing';
import { useGetPetitionTopLiked } from '@/hooks/api/get/useGetPetitionPostsTopLiked';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const PetitionSection = () => {
  const navigate = useNavigate();
  const { data } = useGetPetitionTopLiked({ page: 0, take: 2 });
  const handlePostDetail = (id: number) => {
    navigate(`/petition-notice/${id}`);
    window.scrollTo(0, 0);
  };

  const { t } = useTranslation();

  return (
    <section className="w-full">
      <div className="flex items-center">
        <h1 className="text-[1.25rem] font-bold sm:text-[2rem]">{t('introduction.인기청원')}</h1>
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
      <div className="flex w-full gap-6 overflow-x-scroll pr-6 scrollbar-hide md:pr-0">
        {data?.data.pageInfo.totalElements ? (
          <>
            {data?.data.postListResDto.map((petitionData) => (
              <PostTextPetition data={petitionData} key={petitionData.postId} onClick={handlePostDetail} />
            ))}
          </>
        ) : (
          <p className="flex h-[24.25rem] w-full items-center justify-center text-gray-600">
            등록된 게시물이 없습니다.
          </p>
        )}
      </div>
    </section>
  );
};

export default PetitionSection;
