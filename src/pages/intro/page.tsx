import { BoardHeader } from '@/components/BoardHeader';
import { BoardTabsList, BoardTabsQueryLink } from '@/components/BoardTabs';
import { LinkCategories } from '@/components/LinkCategories';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Container } from '@/containers/new/Container';
import { useResize } from '@/hooks/useResize';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';

export default function IntroPage() {
  const [searchParams] = useSearchParams();
  const category = useMemo(() => searchParams.get('category') ?? '총학생회', [searchParams]);
  const subCategory = useMemo(() => searchParams.get('sub') ?? '소개', [searchParams]);
  const { width: screenWidth } = useResize();
  const [size, setSize] = useState<string>('lg');
  useEffect(() => {
    if (screenWidth <= 389) {
      setSize('xs');
    } else if (screenWidth >= 390 && screenWidth <= 719) {
      setSize('sm');
    } else if (screenWidth >= 720 && screenWidth <= 1079) {
      setSize('md');
    } else if (screenWidth >= 1080 && screenWidth <= 1439) {
      setSize('lg');
    } else if (screenWidth >= 1440) {
      setSize('xl');
    } else {
      setSize('lg');
    }
  }, [screenWidth]);

  const subtitle: Record<string, string> = {
    총학생회: '제64대 총학생회 US:SUM',
    중앙운영위원회: '제64대 중앙운영위원회',
    중앙집행위원회: '제64대 중앙집행위원회',
  };

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
      <BoardHeader title={category}>
        <span className="text-gray-700">{subtitle[category] ?? '총학생회'}</span>
      </BoardHeader>
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
            <div className="flex w-full items-center justify-center overflow-hidden">
              <img
                className="h-auto max-w-full object-contain"
                src={`/intro/${category}/${subCategory}/${size}.webp`}
              />
            </div>
          </Container>
        </div>
      </Tabs>
    </>
  );
}
