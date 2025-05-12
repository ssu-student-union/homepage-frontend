import { BoardHeader } from '@/components/BoardHeader';
import { BoardTabsList, BoardTabsQueryLink } from '@/components/BoardTabs';
import { LinkCategories } from '@/components/LinkCategories';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Container } from '@/containers/new/Container';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { SUBTITLE } from '@/pages/intro/const';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router';

export default function IntroPage() {
  const [searchParams] = useSearchParams();
  const category = useMemo(() => searchParams.get('category') ?? '총학생회', [searchParams]);
  const subCategory = useMemo(() => searchParams.get('sub') ?? '소개', [searchParams]);

  const breakpoint = useBreakpoints();
  const size = (() => {
    switch (breakpoint) {
      case 'xxl':
        return 'xl';
      default:
        return breakpoint;
    }
  })();

  const subCategories = [
    {
      id: '소개',
      name: '소개',
      to: `/intro?category=${category}&sub=소개`,
    },
    {
      id: '조직도',
      name: '조직도',
      to: `/intro?category=${category}&sub=조직도`,
    },
  ];

  return (
    <>
      <BoardHeader
        title={category}
        subtitle={<span className="text-gray-700">{SUBTITLE[category] ?? '총학생회'}</span>}
      />
      <Tabs defaultValue={category} className="w-full">
        <BoardTabsList>
          <BoardTabsQueryLink query="category" value="총학생회">
            총학생회
          </BoardTabsQueryLink>
          <BoardTabsQueryLink query="category" value="중앙운영위원회">
            중앙운영위원회
          </BoardTabsQueryLink>
          <BoardTabsQueryLink query="category" value="중앙집행위원회">
            중앙집행위원회
          </BoardTabsQueryLink>
        </BoardTabsList>
        <div className="px-4">
          <Container className="pt-0 max-md:px-0">
            <TabsContent value="총학생회">
              <LinkCategories value={subCategory} categories={subCategories} />
            </TabsContent>
            <TabsContent value="중앙운영위원회">
              <LinkCategories value={subCategory} categories={subCategories} />
            </TabsContent>
            <TabsContent value="중앙집행위원회">
              <LinkCategories value={subCategory} categories={subCategories} />
            </TabsContent>
            <div className="my-8 flex w-full items-center justify-center overflow-hidden">
              <img
                className="h-auto max-w-full object-contain"
                src={`/intro/${category}/${subCategory}/${size ?? 'md'}.webp`}
              />
            </div>
          </Container>
        </div>
      </Tabs>
    </>
  );
}
