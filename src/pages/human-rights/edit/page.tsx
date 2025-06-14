import { Input } from '@/components/ui/input.tsx';
import { Editor } from '@toast-ui/react-editor';
import { FrontmatterEditor } from '@/pages/human-rights/edit/components/FrontmatterEditor.tsx';
import { cn } from '@/libs/utils.ts';
import { ArticleHeader } from '@/containers/new/ArticleHeader.tsx';
import { Container } from '@/containers/new/Container.tsx';
import { ArticleFooter } from '@/containers/new/ArticleFooter.tsx';
import { MinusCircle, Plus } from '@phosphor-icons/react';
import { useHumanRightsForm } from '@/pages/human-rights/edit/form.ts';
import { FileInputs } from '@/components/edit/FileInputs';
import { useEffect, useRef, useState } from 'react';
import { useContentEditor } from '@/hooks/useContentEditor.ts';
import {
  HumanRightsPerson,
  HumanRightsPost,
  HumanRightsPostEditForm,
  HumanRightsPostEditRequest,
  HumanRightsPostEditRequestSchema,
  HumanRightsReporter,
} from '@/pages/human-rights/schema.ts';
import {
  useCreateHumanRightsPost,
  useGetHumanRightsPost,
  usePatchHumanRightsPost,
  useUploadHumanRightsFiles,
} from '@/pages/human-rights/queries.ts';
import { useNavigate, useParams } from 'react-router';
import { PostHeader } from '@/components/detail/PostHeader';
import { PostFooter } from '@/components/detail/PostFooter';
import { Button } from '@/components/ui/button.tsx';
import { Loader2 } from 'lucide-react';
import { LocalPostFile, PostFile, UploadedPostFile } from '@/components/edit/FileInput';
import { useGetUserInfo } from '@/hooks/new/query/useGetUserInfo.ts';
import { useQueryClient } from '@tanstack/react-query';
import { FileResponse } from '@/schemas/post';

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

function PageSkeleton() {
  return (
    <article className="mb-20 mt-16">
      <PostHeader.Skeleton />
      <hr className="bg-[#E7E7E7]" />
      <Container.Skeleton />
      <PostFooter.Skeleton />
    </article>
  );
}

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
  /* Router Props */
  const { id } = useParams<{ id?: string }>();
  const postId = id ? parseInt(id ?? '') || null : null;
  const navigate = useNavigate();

  /* Load data by query */
  const queryClient = useQueryClient();
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
  const [isPostLoaded, setIsPostLoaded] = useState(false);

  /* Register form hooks */
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

  // 에디터 기능 훅
  const editorRef = useRef<Editor>(null);
  const { register: registerEditor, processImages, isImageProcessing } = useContentEditor('인권신고게시판', editorRef);
  const [files, setFiles] = useState<PostFile[]>([]);
  const [disclaimerAgreed, setDisclaimerAgreed] = useState(false);

  /* Mutation hooks */
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

  // 기존 데이터 입력
  useEffect(() => {
    if (post && editorRef.current && !isPostLoaded) {
      setIsPostLoaded(false);
      reset(postTransformer(post));
      editorRef.current!.getInstance().setMarkdown(post.content);
      const uploadedFiles = post.postFileList
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

  // 사용자 정보 입력
  useEffect(() => {
    if (userInfo && isPostLoaded) {
      setValue('rightsDetailList.reporter.name', userInfo.name);
      setValue('rightsDetailList.reporter.studentId', userInfo.studentId);
      setValue('rightsDetailList.reporter.major', userInfo.major);
    }
  }, [userInfo, isPostLoaded, setValue]);

  // 디버그: 폼 검증 결과
  // useEffect(() => {
  //   console.log(errors);
  // }, [errors]);

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

  async function submitForm(formData: HumanRightsPostEditForm) {
    const postFileList: number[] = files
      .filter((file): file is UploadedPostFile => file.isUploaded)
      .map(({ id }) => id);
    if (files) {
      const localFiles = files.filter((file): file is LocalPostFile => !file.isUploaded).map(({ file }) => file);
      const uploaded = await uploadFiles({ files: localFiles });
      uploaded.postFiles.forEach(({ id }) => postFileList.push(id));
    }
    const uploadedImages: FileResponse[] = post?.postFileList?.filter(({ fileType }) => fileType === 'images') ?? [];
    const { existedImages, newImages, content } = await processImages(uploadedImages);
    existedImages.forEach(({ postFileId }) => postFileList.push(postFileId));
    newImages.forEach(({ id }) => postFileList.push(id));
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

  if (isLoading || isCreatePending || isPatchPending || isUserInfoLoading) {
    return <PageSkeleton />;
  }

  if ((postId && !post) || isError || isCreateError || isPatchError || isFileUploadError || isUserInfoError) {
    if (isError) console.log(error);
    if (isCreateError) console.log(createError);
    if (isPatchError) console.log(patchError);
    if (isFileUploadError) console.log(fileUploadError);
    if (isUserInfoError) console.log(userInfoError);
    // TODO: 오류 발생 시 세부정보 제공
    return (
      <div className="mt-16 flex items-center justify-center py-12">
        <p>오류가 발생하였습니다. 관리자에게 문의하십시오.</p>
      </div>
    );
  }

  const titleError = errors?.title;

  return (
    <article className="mt-[200px]">
      {/* TODO: EditLayout에 `className` property 추가 필요, divider 추가 필요 */}
      <ArticleHeader>
        <h1 className="text-5xl font-bold">인권신고게시판</h1>
      </ArticleHeader>
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
            onChange={handleContentChange}
            onBlur={handleContentBlur}
            {...registerEditor}
          />
        </section>
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-semibold">증거 및 자료 첨부</h2>
          {/* Limit file size to 5MB */}
          <FileInputs files={files} onChange={handleFilesChange} sizeLimit={1024 * 1024 * 5} />
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
      <ArticleFooter className="pb-6">
        <Button
          variant="register"
          className="flex items-center justify-center gap-1 self-end px-2"
          disabled={!disclaimerAgreed || Object.keys(errors).length > 0 || isImageProcessing || isFileUploadPending}
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
