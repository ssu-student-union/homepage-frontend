import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArticleFooter } from '@/containers/new/ArticleFooter';
import { ArticleHeader } from '@/containers/new/ArticleHeader';
import { Container } from '@/containers/new/Container';
import { cn } from '@/libs/utils';
import { Editor } from '@toast-ui/react-editor';
import { Loader2 } from 'lucide-react';
import { useDataForm } from './hooks/useDataform';
import { PostFile } from '@/components/BoardNew/edit/FileInput';
import { useRef, useState } from 'react';
import { useContentEditor } from '@/hooks/useContentEditor';
import { User } from '@phosphor-icons/react';
import { FilterDropDown } from '@/components/FilterDropDown/FilterDropDown';
import { FileInputsWithType } from '@/components/BoardNew/edit/FileInputsWithType';

// function PageSkeleton() {
//   return (
//     <article className="mb-20 mt-[120px]">
//       <PostHeader.Skeleton />
//       <hr className="bg-[#E7E7E7]" />
//       <Container.Skeleton />
//       <PostFooter.Skeleton />
//     </article>
//   );
// }

export default function DataEditPage() {
  /* Router Props */
  // const { id } = useParams<{ id?: string }>();
  // const postId = id ? parseInt(id ?? '') || null : null;
  // const navigate = useNavigate();

  // /* Load data by query */
  // const queryClient = useQueryClient();
  // const [isPostLoaded, setIsPostLoaded] = useState(false);

  const category: string[] = ['결산안', '활동보고']; // mockup

  const {
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useDataForm(category, {
    category: '결산안',
    isNotice: false,
    postFileList: [],
  });

  // 에디터 기능 훅
  const editorRef = useRef<Editor>(null);
  // const { register: registerEditor, processImages, isImageProcessing } = useContentEditor('자료집', editorRef);
  // const [disclaimerAgreed, setDisclaimerAgreed] = useState(false);
  const [files, setFiles] = useState<PostFile[]>([]);

  /* Mutation hooks */

  // 기존 데이터 입력

  const { register: registerEditor, isImageProcessing } = useContentEditor('자료집', editorRef);

  const titleError = errors?.title;

  const [selectedCategory, setSelectedCategory] = useState<string>(''); // 카테고리 선택 상태

  return (
    <article className="mt-[123px]">
      <ArticleHeader className="">
        <h1 className="text-[34px] font-bold">자료집</h1>
        <div className="flex flex-row items-center gap-[5px] text-[16px] font-medium text-[#999999]">
          <User className="size-[16px]" />
          <p>총학생회</p>
        </div>
      </ArticleHeader>
      <Container className="py-[58px]">
        <section className="mb-[12px] flex flex-col gap-[10px]">
          <div className="flex flex-row gap-[10px] xs:flex-col sm:flex-col">
            <div className="w-full">
              <Input
                id="title"
                className="w-full rounded-[6px] border-[2px] border-gray-300 py-[4px] text-[18px] font-medium"
                type="text"
                placeholder="제목을 입력하세요."
                {...register('title')}
              />
              <p
                className={cn(
                  'mt-1 text-sm text-red-700 transition-all',
                  titleError ? 'h-5 translate-y-0 opacity-100' : 'h-0 -translate-y-2 opacity-0'
                )}
              >
                {titleError && titleError.type === 'too_big' ? '제목은 50자 이내이여야 합니다.' : '이 값은 필수입니다.'}
              </p>
            </div>
            <FilterDropDown
              className="flex h-[44px] w-[346px] items-center justify-center border-gray-500 py-0 text-[19px] font-medium xs:w-[200px] sm:w-[200px] md:w-[200px]"
              defaultValue="카테고리"
              optionValue={category}
              onValueChange={(value) => {
                setSelectedCategory(value);
              }}
              value={selectedCategory}
            />
          </div>
          <Editor
            height="620px"
            initialValue=""
            placeholder="글을 작성해주세요"
            useCommandShortcut={true}
            onChange={handleContentChange}
            onBlur={handleContentBlur}
            {...registerEditor}
          />
        </section>
        <section className="mb-16">
          <FileInputsWithType files={files} onChange={handleFilesChange} sizeLimit={1024 * 1024 * 5} />
        </section>
      </Container>
      <ArticleFooter className="pb-6">
        <Button
          variant={'Register'}
          className="flex items-center justify-center gap-1 self-end px-2"
          onClick={() => {}}
        >
          <Loader2
            className={cn('animate-spin transition-all', isImageProcessing ? 'ml-0 opacity-100' : '-ml-7 opacity-0')}
          />
          <p>등록</p>
        </Button>
      </ArticleFooter>
    </article>
  );
  function handleContentBlur() {
    (async () => await trigger('content'))();
  }

  function handleContentChange() {
    if (editorRef.current) {
      setValue('content', editorRef.current.getInstance().getMarkdown());
    }
  }

  function handleFilesChange(newFiles: PostFile[]) {
    setFiles(newFiles);
  }
}
