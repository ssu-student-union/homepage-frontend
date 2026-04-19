import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { Editor } from '@toast-ui/react-editor';
import { cn } from '@/libs/utils';

import { Input } from '@/components/ui/input';
import { FileInputs } from '@/components/edit/FileInputs';
import { FilterDropDown } from '@/components/FilterDropDown';
import { Container } from '@/containers/new/Container';
import { EditHeader } from '@/components/EditHeader';
import { EditFooter } from '@/components/EditFooter';
import { EditPageSkeleton } from '@/components/EditPageSkeleton';
import { EditPageError } from '@/components/EditPageError';

import { useEditableContent } from '@/hooks/editor/useEditableContent';
import { useFileAttachments } from '@/hooks/editor/useFileAttachments';
import { LocalPostFile, UploadedPostFile } from '@/components/edit/FileInput';
import { DataPost, DataPostEditForm, DataPostEditFormSchema, DataPostEditRequest } from '@/pages/data/schema';
import { useDataForm } from '@/pages/data/edit/form';
import { userFileCategories } from '@/pages/data/const/category';
import { resolveDataCategories } from '@/pages/data/hook/utils/useDataCategory';
import { useGetDataPost, useUploadDataFiles } from '@/pages/data/queries';
import { useGetDataFileCategories } from '@/pages/data/hook/query/useGetDataFileCategories';
import { usePatchDataPost } from '@/pages/data/hook/mutation/usePatchDataPost';
import { useCreateDataPost } from '@/pages/data/hook/mutation/useCreateDataPost';

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
  } = useGetDataPost({
    postId: postId ?? 0,
    queryOptions: { enabled: postId !== null },
  });

  /* ── 로컬 상태 ── */
  const memberName: string = localStorage.getItem('memberName') || '';
  const majorName: string = localStorage.getItem('majorName') || '';
  const { majorCategory, middleCategory } = resolveDataCategories(memberName, majorName);
  const { data: categories } = useGetDataFileCategories({ majorCategory, middleCategory });
  const [category, setCategory] = useState<string>('');
  const fileCategories: string[] = userFileCategories[memberName];

  /* ── 폼 ── */
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useDataForm({
    category: '',
    isNotice: category === '총학생회칙',
    postFileList: [],
  });

  /* ── 에디터 ── */
  const editor = useEditableContent({ boardCode: '자료집', setValue, trigger });
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

  /* ── 기존 데이터 로드 ── */
  useEffect(() => {
    if (post && editorRef.current && !isPostLoaded) {
      reset(postTransformer(post));
      loadContent(post.content);
      setCategory(post.category || '');
      loadFiles(post.fileResponseList, { filter: () => true, withCategory: true });
      markLoaded();
    }

    if (!postId) {
      markLoaded();
    }
  }, [post, postId, reset, editorRef, isPostLoaded, loadContent, loadFiles, markLoaded]);

  /* ── 제출 ── */
  async function submitForm(formData: DataPostEditForm) {
    if (category === '') {
      alert('카테고리를 지정해야 합니다.');
      return;
    }

    if (attachments.files.length === 0) {
      alert('파일을 하나 이상 업로드해야 합니다.');
      return;
    }

    const hasInvalidCategory = attachments.files.some((file) => !file.category || file.category.trim() === '');
    if (hasInvalidCategory) {
      alert('모든 파일의 파일종류를 선택해야 합니다.');
      return;
    }

    const postFileList: number[] = attachments.files
      .filter((file): file is UploadedPostFile => file.isUploaded)
      .map(({ id }) => id);

    if (attachments.files.length > 0) {
      const localFiles = attachments.files.filter((file): file is LocalPostFile => !file.isUploaded);

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
    <article className="mt-[123px]">
      <EditHeader>
        <EditHeader.Title>자료집</EditHeader.Title>
        {(majorName || memberName) && <EditHeader.Member>{majorName || memberName}</EditHeader.Member>}
      </EditHeader>
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
              optionValue={Array.isArray(categories) ? categories : []}
              onValueChange={(value) => {
                setCategory(value);
                setValue('category', value, { shouldValidate: true });
                setValue('fileCategory', value, { shouldValidate: true });
              }}
              value={category}
            />
          </div>
          <Editor
            height="620px"
            initialValue=""
            placeholder="글을 작성해주세요"
            useCommandShortcut={true}
            {...editor.editorProps}
          />
        </section>
        <section className="mb-16">
          <FileInputs
            categories={fileCategories}
            files={attachments.files}
            onChange={attachments.handleChange}
            sizeLimit={1024 * 1024 * 5}
          />
        </section>
      </Container>
      <EditFooter
        onSubmit={handleSubmit(submitForm)}
        disabled={
          !watch('title')?.trim() ||
          !watch('content')?.trim() ||
          !category ||
          attachments.files.length === 0 ||
          attachments.files.some((f) => !f.category || f.category.trim() === '') ||
          Object.keys(errors).length > 0 ||
          editor.isImageProcessing ||
          isFileUploadPending
        }
        isLoading={editor.isImageProcessing}
      />
    </article>
  );
}
