import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Editor } from '@toast-ui/react-editor';
import { cn } from '@/libs/utils.ts';
import { ArticleHeader } from '@/containers/new/ArticleHeader';
import { Container } from '@/containers/new/Container.tsx';
import { ArticleFooter } from '@/containers/new/ArticleFooter';
import { PostHeader } from '@/components/BoardNew/detail/PostHeader';
import { PostFooter } from '@/components/BoardNew/detail/PostFooter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { QnaPostForm } from './types';
import { useQnaForm } from './form';
import { useCreateQnaPost } from '../hooks/useCreateQna';
import { usePatchQna } from '../hooks/usePatchQna';
import { useGetQnaDetail } from '../hooks/useGetQnaDetail';
import { useGetUserInfoQna } from '../hooks/useGetUserInfoQna';
import { qnaMemberCodeData } from '../collegesData';
import { qnaMemberMajor } from '../collegesData';
import { useRecoilValue } from 'recoil';
import { LoginState } from '@/recoil/atoms/atom';

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

export default function QnaEditPage() {
  const { id } = useParams<{ id?: string }>();
  const postId = id ? parseInt(id ?? '') || undefined : undefined;

  // 사용자의 단과대 학과를 가져오기 위해 로그인 확인 후 유저 데이터 페칭
  const isLogin = useRecoilValue(LoginState);
  const { data: user, isLoading: isUserLoading, isError: isUserError, error: userError } = useGetUserInfoQna(isLogin);

  // form과 Editor 사용
  const editorRef = useRef<Editor>(null);
  const { register, handleSubmit, reset, setValue } = useQnaForm();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

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

  // 단과대 선택에 따른 학과 선택 드롭다운 관리를 위해 단과대 선택 값 감시
  const [selectedMember, setSelectedMember] = useState<keyof typeof qnaMemberMajor>();

  // 수정의 경우 질문 대상 선택 불가 판정을 위해 state 사용
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const {
    data: detail,
    isError: isDetailError,
    error: detailError,
  } = useGetQnaDetail({
    postId: postId ?? 0,
    queryOptions: { enabled: postId !== null },
  });

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

  if (!isLogin) {
    return (
      <div className="mt-[120px] flex items-center justify-center">
        <p>로그인 후 이용해 주세요.</p>
      </div>
    );
  }

  if (isUserLoading || isCreatePending || isPatchPending) {
    return <PageSkeleton />;
  }

  if (!user || isUserError || isCreateError || isPatchError) {
    if (isUserError) console.log('user error', userError);
    if (isCreateError) console.log('create error', createError);
    if (isPatchError) console.log('patch error', patchError);
    return (
      <div className="mt-[120px] flex items-center justify-center">
        <p>오류가 발생하였습니다. 관리자에게 문의하십시오.</p>
      </div>
    );
  }

  function handleEditorChange() {
    const instance = editorRef.current?.getInstance();
    if (instance) {
      setValue('content', instance.getMarkdown());
    }
  }

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

  return (
    <article className="mt-[200px]">
      <ArticleHeader>
        <h1 className="text-5xl font-bold">질의응답게시판</h1>
      </ArticleHeader>
      <hr className="bg-[#E7E7E7]" />
      <Container>
        {!isEdit && (
          <section className="mb-4 flex justify-between xs:flex-col sm:flex-col">
            {/* 질문 대상 선택 드롭다운 */}
            <select
              {...register('qnaMemberCode')}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setSelectedMember(e.target.value as keyof typeof qnaMemberMajor)
              }
              className="
              h-11 w-[49.5%] appearance-none
              rounded-[0.5rem]
              border border-gray-600  
              bg-[url(/image/arrow-down.svg)] bg-[position:calc(100%-3rem)_center] bg-no-repeat
              text-center text-gray-800
              xs:mb-3 xs:w-auto sm:mb-3 sm:w-auto
            "
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

            {/* 세부 대상 선택 드롭다운 */}
            <select
              {...register('qnaMajorCode')}
              className="
            h-11 w-[49.5%] appearance-none
            rounded-[0.5rem]
            border border-gray-600  
            bg-[url(/image/arrow-down.svg)] bg-[position:calc(100%-3rem)_center] bg-no-repeat
            text-center text-gray-800
            xs:w-auto sm:w-auto
            "
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
      <ArticleFooter>
        <Button
          variant={'Register'}
          className="mb-10 flex items-center justify-center gap-1 self-end px-2"
          disabled={isCreatePending || isPatchPending}
          onClick={handleSubmit(onSubmit)}
        >
          <Loader2
            className={cn(
              'animate-spin transition-all',
              isCreatePending || isPatchPending ? 'ml-0 opacity-100' : '-ml-7 opacity-0'
            )}
          />
          {postId ? '수정' : '등록'}
        </Button>
      </ArticleFooter>
    </article>
  );
}
