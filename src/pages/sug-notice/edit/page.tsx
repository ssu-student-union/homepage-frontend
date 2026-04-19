import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { Editor } from '@toast-ui/react-editor';
import { cn } from '@/libs/utils';

import { Input } from '@/components/ui/input';
import { FileInputs } from '@/components/edit/FileInputs';
import { Container } from '@/containers/new/Container';
import { EditHeader } from '@/components/EditHeader';
import { EditFooter } from '@/components/EditFooter';
import { EditPageSkeleton } from '@/components/EditPageSkeleton';
import { EditPageError } from '@/components/EditPageError';

import { useEditableContent } from '@/hooks/editor/useEditableContent';
import { useFileAttachments } from '@/hooks/editor/useFileAttachments';
import { collectPostFiles } from '@/hooks/editor/collectPostFiles';
import { useSuggestForm } from './form';
import { useCreateSuggestPost, useGetSuggestPost, usePatchSuggestPost, useUploadSuggestFiles } from '../queries';
import { SuggestPostEditRequest, SuggestPostEditRequestSchema, SuggestPostWriteForm } from '../schema';

const BOARD_CODE = '건의게시판';

export function SuggestWritePage() {
  /* ── 라우트 ── */
  const { id } = useParams<{ id?: string }>();
  const postId = id ? parseInt(id ?? '') || null : null;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  /* ── 데이터 조회 ── */
  const {
    data: post,
    isLoading,
    error,
    isError,
  } = useGetSuggestPost({
    postId: postId ?? NaN,
    queryOptions: { enabled: Number.isFinite(postId) },
  });

  /* ── 폼 ── */
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

  /* ── 에디터 ── */
  const editor = useEditableContent({ boardCode: BOARD_CODE, setValue, trigger });
  const { ref: editorRef, isPostLoaded, loadContent, markLoaded } = editor;

  /* ── 파일 상태 ── */
  const attachments = useFileAttachments();
  const { loadFiles } = attachments;

  /* ── 뮤테이션 ── */
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

  /* ── 기존 데이터 로드 ── */
  useEffect(() => {
    if (post && editorRef.current && !isPostLoaded) {
      reset(post);
      loadContent(post.content);
      loadFiles(post.fileResponseList);
      markLoaded();
    }
    if (!postId) {
      markLoaded();
    }
  }, [post, postId, reset, editorRef, isPostLoaded, loadContent, loadFiles, markLoaded]);

  /* ── 제출 ── */
  async function submitForm(formData: SuggestPostWriteForm) {
    const existingImages = post?.fileResponseList?.filter(({ fileType }) => fileType === 'images') ?? [];
    const { postFileList, content } = await collectPostFiles({
      files: attachments.files,
      uploadFiles,
      processImages: editor.processImages,
      existingImages,
    });

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

  /* ── 가드 ── */
  if (isLoading || isCreatePending || isPatchPending) {
    return <EditPageSkeleton />;
  }

  if ((postId && !post) || isError || isCreateError || isPatchError || isFileUploadError) {
    if (isError) console.log(error);
    if (isCreateError) console.log(createError);
    if (isPatchError) console.log(patchError);
    if (isFileUploadError) console.log(fileUploadError);
    return <EditPageError />;
  }

  const titleError = errors?.title;

  /* ── 렌더 ── */
  return (
    <article className="mt-[200px]">
      <EditHeader>
        <EditHeader.Title>건의게시판</EditHeader.Title>
      </EditHeader>
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
            {...editor.editorProps}
          />
        </section>
        <section>
          <FileInputs files={attachments.files} onChange={attachments.handleChange} sizeLimit={1024 * 1024 * 5} />
        </section>
      </Container>
      <EditFooter
        onSubmit={handleSubmit(submitForm)}
        disabled={Object.keys(errors).length > 0 || editor.isImageProcessing || isFileUploadPending}
        isLoading={editor.isImageProcessing || isFileUploadPending}
      />
    </article>
  );
}
