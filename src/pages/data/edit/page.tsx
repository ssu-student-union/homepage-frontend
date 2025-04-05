import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArticleFooter } from '@/containers/new/ArticleFooter';
import { ArticleHeader } from '@/containers/new/ArticleHeader';
import { Container } from '@/containers/new/Container';
import { cn } from '@/libs/utils';
import { Editor } from '@toast-ui/react-editor';
import { Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useContentEditor } from '@/hooks/useContentEditor';
import { User } from '@phosphor-icons/react';
import { FilterDropDown } from '@/components/FilterDropDown';
import { PostHeader } from '@/components/detail/PostHeader';
import { PostFooter } from '@/components/detail/PostFooter';
import { useNavigate, useParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { DataPost, DataPostEditForm, DataPostEditFormSchema, DataPostEditRequest } from '@/pages/data/schema';
import { useDataForm } from '@/pages/data/edit/form';
import { userCategories, userFileCategories } from '@/pages/data/const/category';
import { useGetDataPost, useUploadDataFiles } from '@/pages/data/queries';
import { usePatchDataPost } from '@/pages/data/hook/mutation/usePatchDataPost';
import { useCreateDataPost } from '@/pages/data/hook/mutation/useCreateDataPost';
import { FileInputs } from '@/components/edit/FileInputs';
import { LocalPostFile, PostFile, UploadedPostFile } from '@/components/edit/FileInput';

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

function postTransformer({ postId, title, category, fileResponseList, content }: DataPost): DataPostEditForm {
  return {
    postId,
    title,
    category: category ?? '',
    fileCategory: category ?? '',
    postFileList: fileResponseList.map((file) => file.postFileId),
    isNotice: false,
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
  const fileCategories: string[] = userFileCategories[memberName];

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
    category: '',
    isNotice: category === '총학생회칙',
    postFileList: [],
  });

  // 에디터 기능 훅
  const editorRef = useRef<Editor>(null);
  const { register: registerEditor, isImageProcessing } = useContentEditor('자료집', editorRef);
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
  } = useUploadDataFiles();

  // 기존 데이터 입력
  useEffect(() => {
    if (post && editorRef.current && !isPostLoaded) {
      setIsPostLoaded(false);

      reset(postTransformer(post));
      editorRef.current!.getInstance().setMarkdown(post.content);
      setCategory(post.category || '');

      if (post.fileResponseList && post.fileResponseList.length > 0) {
        const uploadedFiles = post.fileResponseList.map(
          ({ postFileId, fileName, fileType }): UploadedPostFile => ({
            name: fileName,
            isUploaded: true,
            id: postFileId,
            category: fileType.replace(/ /g, '_').replace(/·/g, ''),
          })
        );

        setFiles(uploadedFiles);
      } else {
        setFiles([]);
      }

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
    if (category === '') {
      alert('카테고리를 지정해야 합니다.');
    }

    if (files.length === 0) {
      alert('파일을 하나 이상 업로드해야 합니다.');
      return;
    }

    const hasInvalidCategory = files.some((file) => !file.category || file.category.trim() === '');
    if (hasInvalidCategory) {
      alert('모든 파일의 파일종류를 선택해야 합니다.');
      return;
    }

    const postFileList: number[] = files
      .filter((file): file is UploadedPostFile => file.isUploaded)
      .map(({ id }) => id);

    if (files.length > 0) {
      const localFiles = files.filter((file): file is LocalPostFile => !file.isUploaded);

      const uploadedFiles = await Promise.all(
        localFiles.map(async (file) => {
          const { postFiles } = await uploadFiles({
            fileType: file.category!.replace(/·/g, ''),
            files: [file.file],
          });
          return postFiles.map(({ id }) => id);
        })
      );

      uploadedFiles.flat().forEach((id) => postFileList.push(id));
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
          <p>{memberName}</p>
        </div>
      </ArticleHeader>
      <Container className="py-[58px]">
        <section className="mb-[12px] flex flex-col gap-[10px]">
          <div className="flex flex-col gap-[10px] md:flex-row">
            <div className="w-full">
              <Input
                id="title"
                className="w-full rounded-[6px] border-2 border-gray-300 py-[4px] text-[18px] font-medium"
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
              className="flex h-[44px] w-[200px] items-center justify-center border-gray-500 py-0 text-[19px] font-medium lg:w-[346px]"
              defaultValue="카테고리"
              optionValue={categories}
              onValueChange={(value) => {
                setCategory(value);
                setValue('category', value);
                setValue('fileCategory', value);
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
          <FileInputs
            categories={fileCategories}
            files={files}
            onChange={handleFilesChange}
            sizeLimit={1024 * 1024 * 5}
          />
        </section>
      </Container>
      <ArticleFooter className="pb-6">
        <Button
          variant="register"
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
