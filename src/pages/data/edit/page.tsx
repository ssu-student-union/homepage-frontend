import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArticleFooter } from '@/containers/new/ArticleFooter';
import { ArticleHeader } from '@/containers/new/ArticleHeader';
import { Container } from '@/containers/new/Container';
import { cn } from '@/libs/utils';
import { Editor } from '@toast-ui/react-editor';
import { Loader2 } from 'lucide-react';
import { LocalPostFile, PostFile, UploadedPostFile } from '@/components/BoardNew/edit/FileInput';
import { useEffect, useRef, useState } from 'react';
import { useContentEditor } from '@/hooks/useContentEditor';
import { User } from '@phosphor-icons/react';
import { FilterDropDown } from '@/components/FilterDropDown/FilterDropDown';
import { FileInputsWithType } from '@/components/BoardNew/edit/FileInputsWithType';
import { PostHeader } from '@/components/BoardNew/detail/PostHeader';
import { PostFooter } from '@/components/BoardNew/detail/PostFooter';
import { useNavigate, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { useCreateDataPost, useGetDataPost, usePatchDataPost, useUploadDataFiles } from '@/pages/data/queries';
import { DataPost, DataPostEditForm, DataPostEditFormSchema, DataPostEditRequest } from '@/pages/data/schema';
import { useDataForm } from '@/pages/data/edit/form';
import { userCategories } from '@/pages/data/const/category';

function PageSkeleton() {
  return (
    <article className="mb-20 mt-[120px]">
      <PostHeader.Skeleton />
      <hr className="bg-[#E7E7E7]" />
      <Container.Skeleton />
      <PostFooter.Skeleton />
    </article>
  );
}

function postTransformer({ postId, category, title, fileResponseList, content }: DataPost): DataPostEditForm {
  return {
    postId,
    title,
    category,
    postFileList: fileResponseList.map((file) => file.postFileId),
    notice: false,
    content,
  };
}

export default function DataEditPage() {
  /* Router Props */
  const { id } = useParams<{ id?: string }>();
  const postId = id ? parseInt(id ?? '') || null : null;
  const navigate = useNavigate();

  /* 카테고리 지정 */
  const memberName: string = localStorage.getItem('memberName') || '';
  const categories: string[] = userCategories[memberName];
  const [category, setCategory] = useState<string>('');

  /* Load data by query */
  const queryClient = useQueryClient();
  const {
    data: post,
    isLoading,
    error,
    isError,
  } = useGetDataPost({
    postId: postId ?? 0,
    queryOptions: { enabled: postId !== null },
  });
  const [isPostLoaded, setIsPostLoaded] = useState(false);

  /* Register form hooks */
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useDataForm({
    category: '접수대기',
    notice: false,
    postFileList: [],
  });

  // 에디터 기능 훅
  const editorRef = useRef<Editor>(null);
  const { register: registerEditor, isImageProcessing } = useContentEditor('인권신고게시판', editorRef);
  const [files, setFiles] = useState<PostFile[]>([]);

  /* Mutation hooks */
  const {
    mutate: createPost,
    error: createError,
    isError: isCreateError,
    isPending: isCreatePending,
  } = useCreateDataPost({ fileCategory: category });
  const {
    mutate: patchPost,
    error: patchError,
    isError: isPatchError,
    isPending: isPatchPending,
  } = usePatchDataPost({ fileCategory: category });
  const {
    mutateAsync: uploadFiles,
    error: fileUploadError,
    isError: isFileUploadError,
    isPending: isFileUploadPending,
  } = useUploadDataFiles({ fileType: [] });

  // 기존 데이터 입력
  useEffect(() => {
    if (post && editorRef.current && !isPostLoaded) {
      setIsPostLoaded(false);
      reset(postTransformer(post));
      editorRef.current!.getInstance().setMarkdown(post.content);
      const uploadedFiles = post.fileResponseList
        .filter(({ fileType }) => fileType === 'files')
        .map(
          ({ postFileId, fileName }): UploadedPostFile => ({
            name: fileName,
            isUploaded: true,
            id: postFileId,
          })
        );
      setFiles(uploadedFiles);
      setIsPostLoaded(true);
    }
    if (!postId) {
      setIsPostLoaded(true);
    }
  }, [post, postId, reset, isPostLoaded]);

  function handleContentChange() {
    if (editorRef.current && isPostLoaded) {
      setValue('content', editorRef.current.getInstance().getMarkdown());
    }
  }

  function handleContentBlur() {
    (async () => await trigger('content'))();
  }

  function handleFilesChange(newFiles: PostFile[]) {
    setFiles(newFiles);
  }

  async function submitForm(formData: DataPostEditForm) {
    const postFileList: number[] = files
      .filter((file): file is UploadedPostFile => file.isUploaded)
      .map(({ id }) => id);
    if (files) {
      const localFiles = files.filter((file): file is LocalPostFile => !file.isUploaded).map(({ file }) => file);
      const uploaded = await uploadFiles({ files: localFiles });
      uploaded.postFiles.forEach(({ id }) => postFileList.push(id));
    }
    formData.postFileList = postFileList;
    const data: DataPostEditRequest = DataPostEditFormSchema.parse(formData);
    if (postId) {
      patchPost(
        { id: postId, post: data },
        {
          onSuccess: (data) => {
            queryClient
              .invalidateQueries({ queryKey: ['searchPosts', 'data'] })
              .then(() => queryClient.invalidateQueries({ queryKey: ['getPost', 'data', postId] }))
              .then(() => navigate(`/data/${data}`));
          },
        }
      );
    } else {
      createPost(
        { post: data },
        {
          onSuccess: (data) => {
            queryClient
              .invalidateQueries({ queryKey: ['searchPosts', 'data'] })
              .then(() => navigate(`/data/${data.post_id}`));
          },
        }
      );
    }
  }

  if (isLoading || isCreatePending || isPatchPending) {
    return <PageSkeleton />;
  }

  if ((postId && !post) || isError || isCreateError || isPatchError || isFileUploadError) {
    if (isError) console.log(error);
    if (isCreateError) console.log(createError);
    if (isPatchError) console.log(patchError);
    if (isFileUploadError) console.log(fileUploadError);
    // TODO: 오류 발생 시 세부정보 제공
    return (
      <div className="mt-[120px] flex items-center justify-center py-12">
        <p>오류가 발생하였습니다. 관리자에게 문의하십시오.</p>
      </div>
    );
  }

  const titleError = errors?.title;

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
              optionValue={categories}
              onValueChange={(value) => {
                setCategory(value);
              }}
              value={category}
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
          disabled={Object.keys(errors).length > 0 || isImageProcessing || isFileUploadPending}
          onClick={handleSubmit(submitForm)}
        >
          <Loader2
            className={cn('animate-spin transition-all', isImageProcessing ? 'ml-0 opacity-100' : '-ml-7 opacity-0')}
          />
          <p>등록</p>
        </Button>
      </ArticleFooter>
    </article>
  );
}
