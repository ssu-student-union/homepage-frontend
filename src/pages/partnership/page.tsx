import { Header } from '@/containers/common/Header/Header';

import { State } from '@/containers/common/Header/const/state';
import { HeadLayout } from '@/template/HeadLayout';

import { BodyLayout } from '@/template/BodyLayout';
import { PostCardBasic } from '@/components/PostCard/PostCardBasicMissing';
import { Spacing } from '@/components/Spacing';
import { useResize } from '@/hooks/useResize';
import { Size } from '@/components/PostCard/const/state';
import { BoardSelector } from '@/components/Board/BoardSelector';
import { PartnershipSubcategories } from './const';
import { useBoardSelect } from '@/hooks/useBoardSelect';
import { PartnershipSubcategoriesType } from './type';

export function PartnershipPage() {
  // 임의로
  const partnershipCount = 40;
  const { width } = useResize();

  const { selectedSubcategories, onSubcategorySelect } = useBoardSelect<PartnershipSubcategoriesType>(
    PartnershipSubcategories[0]
  );

  return (
    <>
      <Header state={State.Login} />
      <HeadLayout
        title="제휴안내"
        subtitle={
          <p className="font-bold">
            <span>총 </span>
            <span className="text-primary">{`${partnershipCount}개`}</span>
            <span>{`의 제휴혜택이 있어요!`}</span>
          </p>
        }
      />
      {/* 검색바 / 카테고리 mt 제일 작은 사이즈 반응형 수정하기! */}
      <BodyLayout totalPages={partnershipCount} currentPage={1} onPageChange={() => {}} onWriteClick={() => {}}>
        <BoardSelector
          subcategories={PartnershipSubcategories}
          selectedSubcategory={selectedSubcategories}
          onSubcategorySelect={onSubcategorySelect}
        />
        <Spacing size={40} direction="vertical"></Spacing>
        {/* xs */}
        {width < 720 ? (
          <section className="flex h-fit w-full flex-col justify-between">
            {Array.from({ length: 5 }).map((_) => (
              <PostCardBasic size={Size.small}></PostCardBasic>
            ))}
          </section>
        ) : null}
        {/* sm, md, lg */}
        {width < 1440 && width >= 720 ? (
          <section className="flex h-fit w-full flex-col justify-between">
            {Array.from({ length: 5 }).map((_) => (
              <PostCardBasic size={Size.medium}></PostCardBasic>
            ))}
          </section>
        ) : null}
        {/* xl */}
        {width >= 1440 && width < 1920 ? (
          <section className="flex h-fit w-full flex-col justify-between gap-[40px]">
            {Array.from({ length: 3 }).map((_) => (
              <div className="flex h-fit w-full justify-between">
                <PostCardBasic></PostCardBasic>
                <PostCardBasic></PostCardBasic>
              </div>
            ))}
          </section>
        ) : null}
        {/* xxl */}
        {width >= 1920 ? (
          <section className="flex h-fit w-full flex-col justify-between gap-[40px]">
            {Array.from({ length: 3 }).map((_) => (
              <div className="flex h-fit w-full justify-between">
                <PostCardBasic></PostCardBasic>
                <PostCardBasic></PostCardBasic>
                <PostCardBasic></PostCardBasic>
              </div>
            ))}
          </section>
        ) : null}
      </BodyLayout>
    </>
  );
}
