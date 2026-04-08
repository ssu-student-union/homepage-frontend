import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import { Editor } from '@toast-ui/react-editor';
import { cn } from '@/libs/utils';
import { MinusCircle, Plus } from '@phosphor-icons/react';

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
import { useGetUserInfo } from '@/hooks/new/query/useGetUserInfo';
import { FrontmatterEditor } from '@/pages/human-rights/edit/components/FrontmatterEditor';
import { useHumanRightsForm } from '@/pages/human-rights/edit/form';
import {
  HumanRightsPerson,
  HumanRightsPost,
  HumanRightsPostEditForm,
  HumanRightsPostEditRequest,
  HumanRightsPostEditRequestSchema,
  HumanRightsReporter,
} from '@/pages/human-rights/schema';
import {
  useCreateHumanRightsPost,
  useGetHumanRightsPost,
  usePatchHumanRightsPost,
  useUploadHumanRightsFiles,
} from '@/pages/human-rights/queries';

const BOARD_CODE = '인권신고게시판';

const DISCLAIMER = `학생인권위원회는 인권침해 구제와 관련하여 아래와 같이 개인정보를 수집·이용하고자 합니다.

✔수집 및 이용 대상
학생인권위원회

✔개인정보 수집 및 이용에 대한 목적
학내 인권침해 사례 조사 및 해결을 위한 답변 수집

✔개인정보 수집 항목
이름, 학과, 학번, 전화번호

✔개인정보 보관 일자
접수 후 3년간

` as const;

function postTransformer({
  postId,
  category,
  title,
  postFileList,
  rightsDetailList,
  content,
}: HumanRightsPost): HumanRightsPostEditForm {
  type Victim = HumanRightsPerson & { personType: 'VICTIM' };
  type Attacker = HumanRightsPerson & { personType: 'ATTACKER' };
  const victims = rightsDetailList.filter((person): person is Victim => person.personType === 'VICTIM');
  if (victims.length === 0)
    victims.push({
      name: '',
      studentId: '',
      major: '',
      personType: 'VICTIM',
    });
  const attackers = rightsDetailList.filter((person): person is Attacker => person.personType === 'ATTACKER');
  if (attackers.length === 0)
    attackers.push({
      name: '',
      studentId: '',
      major: '',
      personType: 'ATTACKER',
    });
  return {
    postId,
    title,
    category,
    postFileList: postFileList.map((file) => file.postFileId),
    isNotice: false,
    rightsDetailList: {
      reporter: (rightsDetailList.find(
        (person): person is Victim => person.personType === 'REPORTER'
      ) as HumanRightsReporter) ?? {
        name: '',
        studentId: '',
        major: '',
        phoneNumber: '',
        personType: 'REPORTER',
      },
      victims: victims as [Victim, ...Victim[]],
      attackers: attackers as [Attacker, ...Attacker[]],
    },
    content,
  };
}

export function HumanRightsEditPage() {
  /* ── 라우트 ── */
  const { id } = useParams<{ id?: string }>();
  const postId = id ? parseInt(id ?? '') || null : null;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  /* ── 데이터 조회 ── */
  const {
    data: userInfo,
    isLoading: isUserInfoLoading,
    error: userInfoError,
    isError: isUserInfoError,
  } = useGetUserInfo();
  const {
    data: post,
    isLoading,
    error,
    isError,
  } = useGetHumanRightsPost({
    postId: postId ?? 0,
    queryOptions: { enabled: postId !== null },
  });

  /* ── 폼 ── */
  const {
    register,
    reset,
    handleSubmit,
    victimFields,
    victimAppend,
    victimRemove,
    attackerFields,
    attackerAppend,
    attackerRemove,
    setValue,
    trigger,
    formState: { errors },
  } = useHumanRightsForm({
    category: '접수대기',
    isNotice: false,
    postFileList: [],
    rightsDetailList: {
      reporter: {
        personType: 'REPORTER',
      },
      victims: [
        {
          name: '',
          personType: 'VICTIM',
        },
      ],
      attackers: [
        {
          name: '',
          personType: 'ATTACKER',
        },
      ],
    },
  });

  /* ── 에디터 ── */
  const editor = useEditableContent({ boardCode: BOARD_CODE, setValue, trigger });
  const { ref: editorRef, isPostLoaded, loadContent, markLoaded } = editor;

  /* ── 파일 상태 ── */
  const attachments = useFileAttachments();
  const { loadFiles } = attachments;

  /* ── 로컬 상태 ── */
  const [disclaimerAgreed, setDisclaimerAgreed] = useState(false);

  /* ── 뮤테이션 ── */
  const {
    mutate: createPost,
    error: createError,
    isError: isCreateError,
    isPending: isCreatePending,
  } = useCreateHumanRightsPost();
  const {
    mutate: patchPost,
    error: patchError,
    isError: isPatchError,
    isPending: isPatchPending,
  } = usePatchHumanRightsPost();
  const {
    mutateAsync: uploadFiles,
    error: fileUploadError,
    isError: isFileUploadError,
    isPending: isFileUploadPending,
  } = useUploadHumanRightsFiles();

  /* ── 기존 데이터 로드 ── */
  useEffect(() => {
    if (post && editorRef.current && !isPostLoaded) {
      reset(postTransformer(post));
      loadContent(post.content);
      loadFiles(post.postFileList);
      markLoaded();
    }
    if (!postId) {
      markLoaded();
    }
  }, [post, postId, reset, editorRef, isPostLoaded, loadContent, loadFiles, markLoaded]);

  useEffect(() => {
    if (userInfo && isPostLoaded) {
      setValue('rightsDetailList.reporter.name', userInfo.name);
      setValue('rightsDetailList.reporter.studentId', userInfo.studentId);
      setValue('rightsDetailList.reporter.major', userInfo.major);
    }
  }, [userInfo, isPostLoaded, setValue]);

  /* ── 제출 ── */
  async function submitForm(formData: HumanRightsPostEditForm) {
    const existingImages = post?.postFileList?.filter(({ fileType }) => fileType === 'images') ?? [];
    const { postFileList, content } = await collectPostFiles({
      files: attachments.files,
      uploadFiles,
      processImages: editor.processImages,
      existingImages,
    });

    formData.postFileList = postFileList;
    formData.content = content;
    const data: HumanRightsPostEditRequest = HumanRightsPostEditRequestSchema.parse(formData);

    if (postId) {
      patchPost(
        { id: postId, post: data },
        {
          onSuccess: (data) => {
            queryClient
              .invalidateQueries({ queryKey: ['searchPosts', BOARD_CODE] })
              .then(() => queryClient.invalidateQueries({ queryKey: ['getPost', BOARD_CODE, postId] }))
              .then(() => navigate(`/human-rights/${data}`));
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
              .then(() => navigate(`/human-rights/${data.post_id}`));
          },
        }
      );
    }
  }

  /* ── 가드 ── */
  if (isLoading || isCreatePending || isPatchPending || isUserInfoLoading) {
    return <EditPageSkeleton />;
  }

  if ((postId && !post) || isError || isCreateError || isPatchError || isFileUploadError || isUserInfoError) {
    if (isError) console.log(error);
    if (isCreateError) console.log(createError);
    if (isPatchError) console.log(patchError);
    if (isFileUploadError) console.log(fileUploadError);
    if (isUserInfoError) console.log(userInfoError);
    return <EditPageError />;
  }

  const titleError = errors?.title;

  /* ── 렌더 ── */
  return (
    <article className="mt-[200px]">
      <EditHeader>
        <EditHeader.Title>인권신고게시판</EditHeader.Title>
      </EditHeader>
      <hr className="bg-[#E7E7E7]" />
      <Container>
        <section className="mb-16">
          <h2
            className={cn(
              'mb-6 text-2xl font-semibold',
              'before:absolute before:-translate-x-full before:text-[#ff0000] before:content-["*"]'
            )}
          >
            신고자 정보 입력
          </h2>
          <FrontmatterEditor
            id="reporter"
            errors={errors}
            register={register}
            items={[
              {
                id: 'name',
                term: '성명',
                required: true,
                disabled: true,
                errorMessage: '서버 오류입니다.',
                registerPath: 'rightsDetailList.reporter.name',
              },
              {
                id: 'student_id',
                term: '학번',
                required: true,
                disabled: true,
                errorMessage: '서버 오류입니다.',
                registerPath: 'rightsDetailList.reporter.studentId',
              },
              {
                id: 'major',
                term: '학과/부',
                required: true,
                disabled: true,
                errorMessage: '서버 오류입니다.',
                registerPath: 'rightsDetailList.reporter.major',
              },
              {
                id: 'phoneNumber',
                term: '연락처',
                required: true,
                errorMessage: '이 값은 필수입니다.',
                registerPath: 'rightsDetailList.reporter.phoneNumber',
              },
            ]}
          />
        </section>
        <section className="mb-16">
          <h2 className="text-2xl font-semibold">피침해자 정보 입력</h2>
          <p className="mb-6 text-[#979797]">빈칸을 모두 채우지 않아도 되며,알고 있는 정보를 기입하여 주세요.</p>
          <ol className="mb-6 flex flex-col gap-6">
            {victimFields.map((field, index) => (
              <li key={field.id}>
                <div className="relative mb-6">
                  {index > 0 && (
                    <button
                      className="absolute top-1/2 -translate-y-1/2 translate-x-[calc(-100%-2px)] text-[#979797]"
                      onClick={() => victimRemove(index)}
                    >
                      <MinusCircle size="20" />
                    </button>
                  )}
                  <h3 className="text-lg font-semibold text-gray-700">[피침해자{index + 1}]</h3>
                </div>
                <FrontmatterEditor
                  id={field.id}
                  errors={errors}
                  register={register}
                  items={[
                    {
                      id: `${field.id}_name`,
                      term: '성명',
                      required: true,
                      errorMessage: '이 값은 필수입니다.',
                      registerPath: `rightsDetailList.victims.${index}.name`,
                    },
                    {
                      id: `${field.id}_student_id`,
                      term: '학번',
                      registerPath: `rightsDetailList.victims.${index}.studentId`,
                    },
                    {
                      id: `${field.id}_major`,
                      term: '학과/부',
                      registerPath: `rightsDetailList.victims.${index}.major`,
                    },
                  ]}
                />
              </li>
            ))}
          </ol>
          <button
            className="flex items-center gap-2 text-[#979797]"
            onClick={() => victimAppend({ name: '', studentId: '', major: '', personType: 'VICTIM' })}
          >
            <Plus />
            피침해자 정보 추가하기
          </button>
        </section>
        <section className="mb-16">
          <h2 className="text-2xl font-semibold">침해자(신고 대상자) 정보 입력</h2>
          <p className="mb-6 text-[#979797]">빈칸을 모두 채우지 않아도 되며,알고 있는 정보를 기입하여 주세요.</p>
          <ol className="mb-6 flex flex-col gap-6">
            {attackerFields.map((field, index) => (
              <li key={field.id}>
                <div className="relative mb-6">
                  {index > 0 && (
                    <button
                      className="absolute top-1/2 -translate-y-1/2 translate-x-[calc(-100%-2px)] text-[#979797]"
                      onClick={() => attackerRemove(index)}
                    >
                      <MinusCircle size="20" />
                    </button>
                  )}
                  <h3 className="text-lg font-semibold text-gray-700">[침해자{index + 1}]</h3>
                </div>
                <FrontmatterEditor
                  id={field.id}
                  errors={errors}
                  register={register}
                  items={[
                    {
                      id: `${field.id}_name`,
                      term: '성명',
                      required: true,
                      errorMessage: '이 값은 필수입니다.',
                      registerPath: `rightsDetailList.attackers.${index}.name`,
                    },
                    {
                      id: `${field.id}_student_id`,
                      term: '학번',
                      registerPath: `rightsDetailList.attackers.${index}.studentId`,
                    },
                    {
                      id: `${field.id}_major`,
                      term: '학과/부',
                      registerPath: `rightsDetailList.attackers.${index}.major`,
                    },
                  ]}
                />
              </li>
            ))}
          </ol>
          <button
            className="flex items-center gap-2 text-[#979797]"
            onClick={() => attackerAppend({ name: '', studentId: '', major: '', personType: 'ATTACKER' })}
          >
            <Plus />
            침해자 정보 추가하기
          </button>
        </section>
        <section className="mb-16 flex flex-col gap-6">
          <h2
            className={cn(
              'text-2xl font-semibold',
              'before:absolute before:-translate-x-full before:text-[#ff0000] before:content-["*"]'
            )}
          >
            피해 사실 기술
          </h2>
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
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-semibold">증거 및 자료 첨부</h2>
          <FileInputs files={attachments.files} onChange={attachments.handleChange} sizeLimit={1024 * 1024 * 5} />
        </section>
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">개인정보 수집 및 이용에 관한 동의</h2>
          <pre className="whitespace-pre-wrap rounded-md border-2 border-[#CDCDCD] px-8 py-6">{DISCLAIMER}</pre>
          <div className="flex flex-wrap justify-between">
            <p className='before:absolute before:-translate-x-full before:text-[#ff0000] before:content-["*"]'>
              위와 같이 개인정보를 수집·이용하는 데 동의하십니까?
            </p>
            <div className="flex grow items-center justify-end gap-2">
              <label htmlFor="agree_disclaimer">동의합니다</label>
              <input
                id="agree_disclaimer"
                type="checkbox"
                checked={disclaimerAgreed}
                onChange={(evt) => setDisclaimerAgreed(evt.target.checked)}
              />
            </div>
          </div>
          <p
            className={cn(
              'mt-1 text-end text-sm text-red-700 transition-all',
              !disclaimerAgreed ? 'h-5 translate-y-0 opacity-100' : 'h-0 -translate-y-2 opacity-0'
            )}
          >
            동의 후 등록하실 수 있습니다.
          </p>
        </section>
      </Container>
      <EditFooter
        onSubmit={handleSubmit(submitForm)}
        disabled={!disclaimerAgreed || Object.keys(errors).length > 0 || editor.isImageProcessing || isFileUploadPending}
        isLoading={editor.isImageProcessing || isFileUploadPending}
      />
    </article>
  );
}
