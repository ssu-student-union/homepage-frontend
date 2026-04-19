import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { Editor } from '@toast-ui/react-editor';

import { Input } from '@/components/ui/input';
import { Container } from '@/containers/new/Container';
import { EditHeader } from '@/components/EditHeader';
import { EditFooter } from '@/components/EditFooter';
import { EditPageSkeleton } from '@/components/EditPageSkeleton';
import { EditPageError } from '@/components/EditPageError';

import { QnaPostForm } from './types';
import { useQnaForm } from './form';
import { useCreateQnaPost } from '../hooks/useCreateQna';
import { usePatchQna } from '../hooks/usePatchQna';
import { useGetQnaDetail } from '../hooks/useGetQnaDetail';
import { useGetUserInfoQna } from '../hooks/useGetUserInfoQna';
import { qnaMemberCodeData, qnaMemberMajor } from '../collegesData';
import { LoginState } from '@/atoms/atom';
import { useAtom } from 'jotai';

export default function QnaEditPage() {
  /* ── 라우트 ── */
  const { id } = useParams<{ id?: string }>();
  const postId = id ? parseInt(id ?? '') || undefined : undefined;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  /* ── 데이터 조회 ── */
  const [isLogin] = useAtom(LoginState);
  const { data: user, isLoading: isUserLoading, isError: isUserError, error: userError } = useGetUserInfoQna(isLogin);
  const {
    data: detail,
    isError: isDetailError,
    error: detailError,
  } = useGetQnaDetail({
    postId: postId ?? 0,
    queryOptions: { enabled: postId !== null },
  });

  /* ── 폼 ── */
  const editorRef = useRef<Editor>(null);
  const { register, handleSubmit, reset, setValue } = useQnaForm();

  /* ── 로컬 상태 ── */
  const [selectedMember, setSelectedMember] = useState<keyof typeof qnaMemberMajor>();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  /* ── 뮤테이션 ── */
  const {
    mutate: createQna,
    error: createError,
    isError: isCreateError,
    isPending: isCreatePending,
  } = useCreateQnaPost({
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['qnaPostsList'] });
      navigate(`/qna/${data.post_id}`);
    },
  });
  const { mutate: patchQna, error: patchError, isError: isPatchError, isPending: isPatchPending } = usePatchQna();

  /* ── 기존 데이터 로드 ── */
  useEffect(() => {
    if (postId) {
      if (!detail || isDetailError) {
        console.log('detail data not fount', detailError);
        return;
      }

      reset({
        title: detail.title,
        content: detail.content,
        category: detail.category,
        isNotice: false,
        postFileList: [],
        qnaMemberCode: detail.college,
        qnaMajorCode: detail.department,
      });

      setSelectedMember(detail.college as keyof typeof qnaMemberMajor);
      setIsEdit(true);

      if (editorRef.current) {
        editorRef.current!.getInstance().setMarkdown(detail.content);
      }
    }
  }, [postId, reset, detail, isDetailError, detailError]);

  /* ── 핸들러 ── */
  function handleEditorChange() {
    const instance = editorRef.current?.getInstance();
    if (instance) {
      setValue('content', instance.getMarkdown());
    }
  }

  /* ── 제출 ── */
  function onSubmit(formData: QnaPostForm) {
    if (editorRef.current) {
      formData.content = editorRef.current.getInstance().getMarkdown();
    }

    if (postId) {
      const patchData: Omit<QnaPostForm, 'qnaMemberCode' | 'qnaMajorCode'> = {
        title: formData.title,
        content: formData.content,
        category: formData.category,
        isNotice: false,
        postFileList: [],
      };

      patchQna(
        { id: postId, post: patchData },
        {
          onSuccess: (data) => {
            queryClient
              .invalidateQueries({ queryKey: ['qnaPostsList'] })
              .then(() => queryClient.invalidateQueries({ queryKey: ['getPost', '질의응답게시판', data] }))
              .then(() => navigate(`/qna/${data}`));
          },
        }
      );
    } else {
      if (formData.qnaMajorCode === '총학생회') {
        formData.qnaMajorCode = '';
      }

      createQna({ post: formData });
    }
  }

  /* ── 가드 ── */
  if (!isLogin) {
    return <EditPageError message="로그인 후 이용해 주세요." />;
  }

  if (isUserLoading || isCreatePending || isPatchPending) {
    return <EditPageSkeleton />;
  }

  if (!user || isUserError || isCreateError || isPatchError) {
    if (isUserError) console.log('user error', userError);
    if (isCreateError) console.log('create error', createError);
    if (isPatchError) console.log('patch error', patchError);
    return <EditPageError />;
  }

  /* ── 렌더 ── */
  return (
    <article className="mt-[200px]">
      <EditHeader>
        <EditHeader.Title>건의게시판</EditHeader.Title>
      </EditHeader>
      <hr className="bg-[#E7E7E7]" />
      <Container>
        {!isEdit && (
          <section className="xs:flex-col mb-4 flex justify-between sm:flex-col">
            <select
              {...register('qnaMemberCode')}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setSelectedMember(e.target.value as keyof typeof qnaMemberMajor)
              }
              className="xs:mb-3 xs:w-auto h-11 w-[49.5%] appearance-none rounded-[0.5rem] border border-gray-600 bg-[url(/image/arrow-down.svg)] bg-[position:calc(100%-3rem)_center] bg-no-repeat text-center text-gray-800 sm:mb-3 sm:w-auto"
              disabled={isEdit}
            >
              <option value="">질문 대상 선택</option>
              {user.memberCode && <option value={user.memberCode}>{user.memberCode}</option>}
              {qnaMemberCodeData
                .filter((opt) => opt !== user.memberCode)
                .map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
            </select>

            <select
              {...register('qnaMajorCode')}
              className="xs:w-auto h-11 w-[49.5%] appearance-none rounded-[0.5rem] border border-gray-600 bg-[url(/image/arrow-down.svg)] bg-[position:calc(100%-3rem)_center] bg-no-repeat text-center text-gray-800 sm:w-auto"
              disabled={selectedMember === undefined || isEdit}
            >
              <option value="">세부 대상 선택</option>
              {selectedMember === user.memberCode && user.majorCode && (
                <option value={user.majorCode}>{user.majorCode}</option>
              )}
              {selectedMember &&
                qnaMemberMajor[selectedMember]
                  .filter((opt) => opt !== user.majorCode)
                  .map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
            </select>
          </section>
        )}
        <section className="mb-3">
          <Input id="title" type="text" placeholder="제목을 입력하세요." {...register('title')} className="mb-[17px]" />

          <Editor
            ref={editorRef}
            height="620px"
            initialValue=""
            placeholder="글을 작성해주세요"
            initialEditType="wysiwyg"
            hideModeSwitch
            onChange={handleEditorChange}
            toolbarItems={[
              ['heading', 'bold', 'italic', 'strike'],
              ['hr', 'quote'],
              ['ul', 'ol', 'task', 'indent', 'outdent'],
              ['table', 'link'],
              ['code', 'codeblock'],
            ]}
          />
        </section>
      </Container>
      <EditFooter
        onSubmit={handleSubmit(onSubmit)}
        disabled={isCreatePending || isPatchPending}
        isLoading={isCreatePending || isPatchPending}
      >
        {postId ? '수정' : '등록'}
      </EditFooter>
    </article>
  );
}
