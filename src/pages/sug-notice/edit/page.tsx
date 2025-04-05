import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Input } from '@/components/ui/input';
import { FileInputs } from '@/components/edit/FileInputs';
import { Editor } from '@toast-ui/react-editor';
import { cn } from '@/libs/utils.ts';
import { PostHeader } from '@/components/detail/PostHeader';
import { Container } from '@/containers/new/Container';
import { PostFooter } from '@/components/detail/PostFooter';
import { LocalPostFile, PostFile, UploadedPostFile } from '@/components/edit/FileInput';
import { ArticleHeader } from '@/containers/new/ArticleHeader';
import { ArticleFooter } from '@/containers/new/ArticleFooter';
import { useContentEditor } from '@/hooks/useContentEditor';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useSuggestForm } from './form';
import { useCreateSuggestPost, useGetSuggestPost, usePatchSuggestPost, useUploadSuggestFiles } from '../queries';
import { SuggestPostEditRequest, SuggestPostEditRequestSchema, SuggestPostWriteForm } from '../schema';
import { FileResponse } from '@/schemas/post';

const BOARD_CODE = '건의게시판';

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

export function SuggestWritePage() {
  const { id } = useParams<{ id?: string }>();
  const postId = id ? parseInt(id ?? '') || null : null;
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {
    data: post,
    isLoading,
    error,
    isError,
  } = useGetSuggestPost({
    postId: postId ?? NaN,
    queryOptions: { enabled: Number.isFinite(postId) },
  });

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useSuggestForm({
    category: '답변대기',
    postFileList: [],
  });

  //에디터 기능 훅
  const editorRef = useRef<Editor>(null);
  const { register: registerEditor, processImages, isImageProcessing } = useContentEditor(BOARD_CODE, editorRef);
  const [files, setFiles] = useState<PostFile[]>([]);
  const [isPostLoaded, setIsPostLoaded] = useState(false);

  // mutation hooks
  const {
    mutate: createPost,
    error: createError,
    isError: isCreateError,
    isPending: isCreatePending,
  } = useCreateSuggestPost();
  const {
    mutate: patchPost,
    error: patchError,
    isError: isPatchError,
    isPending: isPatchPending,
  } = usePatchSuggestPost();
  const {
    mutateAsync: uploadFiles,
    error: fileUploadError,
    isError: isFileUploadError,
    isPending: isFileUploadPending,
  } = useUploadSuggestFiles();

  useEffect(() => {
    if (post && editorRef.current && !isPostLoaded) {
      setIsPostLoaded(false);
      reset(post);
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

  async function submitForm(formData: SuggestPostWriteForm) {
    const postFileList: number[] = files
      .filter((file): file is UploadedPostFile => file.isUploaded)
      .map(({ id }) => id);

    if (files) {
      const localFiles = files.filter((file): file is LocalPostFile => !file.isUploaded).map(({ file }) => file);
      const uploaded = await uploadFiles({ files: localFiles });
      uploaded.postFiles.forEach(({ id }) => postFileList.push(id));
    }

    const uploadedImages: FileResponse[] =
      post?.fileResponseList?.filter(({ fileType }) => fileType === 'images') ?? [];
    const { existedImages, newImages, content } = await processImages(uploadedImages);
    existedImages.forEach(({ postFileId }) => postFileList.push(postFileId));
    newImages.forEach(({ id }) => postFileList.push(id));
    formData.postFileList = postFileList;
    formData.content = content;
    const data: SuggestPostEditRequest = SuggestPostEditRequestSchema.parse(formData);
    if (postId) {
      patchPost(
        { id: postId, post: data },
        {
          onSuccess: (data) => {
            queryClient
              .invalidateQueries({ queryKey: ['searchPosts', BOARD_CODE] })
              .then(() => queryClient.invalidateQueries({ queryKey: ['getPost', BOARD_CODE, postId] }))
              .then(() => navigate(`/sug-notice/${data}`));
          },
        }
      );
    } else {
      createPost(
        { post: data },
        {
          onSuccess: (data) => {
            queryClient
              .invalidateQueries({ queryKey: ['searchPosts', BOARD_CODE] })
              .then(() => navigate(`/sug-notice/${data.post_id}`));
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

    return (
      <div className="mt-[120px] flex items-center justify-center py-12">
        <p>오류가 발생하였습니다. 관리자에게 문의하십시오.</p>
      </div>
    );
  }

  const titleError = errors?.title;

  return (
    <article className="mt-[200px]">
      <ArticleHeader>
        <h1 className="text-5xl font-bold">건의게시판</h1>
      </ArticleHeader>
      <hr className="bg-[#E7E7E7]" />
      <Container>
        <section className="mb-16 flex flex-col gap-6">
          <div>
            <Input id="title" type="text" placeholder="제목을 입력하세요." {...register('title')} />
            <p
              className={cn(
                'mt-1 text-sm text-red-700 transition-all',
                titleError ? 'h-5 translate-y-0 opacity-100' : 'h-0 -translate-y-2 opacity-0'
              )}
            >
              {titleError && titleError.type === 'too_big' ? '제목은 50자 이내이여야 합니다.' : '이 값은 필수입니다.'}
            </p>
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
        <section>
          <FileInputs files={files} onChange={handleFilesChange} sizeLimit={1024 * 1024 * 5} />
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
            className={cn(
              'animate-spin transition-all',
              isImageProcessing || isFileUploadPending ? 'ml-0 opacity-100' : '-ml-7 opacity-0'
            )}
          />
          <p>등록</p>
        </Button>
      </ArticleFooter>
    </article>
  );
}
