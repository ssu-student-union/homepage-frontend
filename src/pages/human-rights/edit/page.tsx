import { Input } from '@/components/ui/input.tsx';
import { Editor } from '@toast-ui/react-editor';
import { RegisterButton } from '@/components/Buttons/BoardActionButtons.tsx';
import { FrontmatterEditor } from '@/pages/human-rights/edit/components/FrontmatterEditor.tsx';
import { cn } from '@/libs/utils.ts';
import { ArticleHeader } from '@/pages/human-rights/containers/ArticleHeader.tsx';
import { Container } from '@/pages/human-rights/containers/Container.tsx';
import { ArticleFooter } from '@/pages/human-rights/containers/ArticleFooter.tsx';
import { MinusCircle, Plus } from '@phosphor-icons/react';
import { useHumanRightsForm } from '@/pages/human-rights/edit/form.ts';
import { FileInputs } from '@/pages/human-rights/edit/components/FileInputs.tsx';
import { useEffect, useRef, useState } from 'react';
import { useContentEditor } from '@/hooks/useContentEditor.ts';
import {
  HumanRightsPostEditForm,
  HumanRightsPostEditRequest,
  HumanRightsPostEditRequestSchema,
} from '@/pages/human-rights/schema.ts';

const disclaimer = `학생인권위원회는 인권침해구제와 관련하여 아래와 같이 개인정보를 수집·이용하고자 합니다.

✔수집 및 이용 대상
학생인권위원회

✔개인정보 수집 및 이용에 대한 목적
학내 인권침해 사례 조사 및 해결을 위한 답변 수집

✔개인정보 수집 항목
이름, 학과, 학번, 전화번호

✔개인정보 보관 일자
2024년 5월 23일 ~ 2024년 12월 31일

` as const;

export function HumanRightsEditPage() {
  // TODO: 수정 기능 추가

  /* Register form hooks */
  const {
    register,
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
    relatedPeople: {
      victims: [
        {
          name: '',
        },
      ],
      attackers: [
        {
          name: '',
        },
      ],
    },
  });
  // 에디터 기능 훅
  const editorRef = useRef<Editor>(null);
  // TODO: 백엔드 구현 시 processContent 추가
  const { register: registerEditor } = useContentEditor('인권신고게시판', editorRef);
  // 파일의 재렌더링은 `FileInputs`에서 처리하고 있으므로 useRef 사용
  const filesRef = useRef<File[]>([]);
  const [disclaimerAgreed, setDisclaimerAgreed] = useState(false);

  function contentChangeHandler() {
    if (editorRef.current) {
      setValue('content', editorRef.current.getInstance().getMarkdown());
    }
  }

  function contentBlurHandler() {
    (async () => await trigger('content'))();
  }

  async function submitForm(formData: HumanRightsPostEditForm) {
    // TODO: Submit post request
    const data: HumanRightsPostEditRequest = HumanRightsPostEditRequestSchema.parse(formData);
    console.log('submit requested', data);
  }

  useEffect(() => {
    (async () => await trigger())();
  }, [trigger]);

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
            register={register}
            items={[
              { id: 'name', term: '성명', required: true, disabled: true, registerPath: 'relatedPeople.reporter.name' },
              {
                id: 'student_id',
                term: '학번',
                required: true,
                disabled: true,
                registerPath: 'relatedPeople.reporter.studentId',
              },
              {
                id: 'major',
                term: '학과/부',
                required: true,
                disabled: true,
                registerPath: 'relatedPeople.reporter.major',
              },
              { id: 'phoneNumber', term: '연락처', required: true, registerPath: 'relatedPeople.reporter.phoneNumber' },
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
                      className="absolute top-1/2 -translate-x-[calc(100%+2px)] -translate-y-1/2 text-[#979797]"
                      onClick={() => victimRemove(index)}
                    >
                      <MinusCircle size="20" />
                    </button>
                  )}
                  <h3 className="text-lg font-semibold text-gray-700">[피침해자{index + 1}]</h3>
                </div>
                <FrontmatterEditor
                  id={field.id}
                  register={register}
                  items={[
                    {
                      id: `${field.id}_name`,
                      term: '성명',
                      required: true,
                      registerPath: `relatedPeople.victims.${index}.name`,
                    },
                    {
                      id: `${field.id}_student_id`,
                      term: '학번',
                      registerPath: `relatedPeople.victims.${index}.studentId`,
                    },
                    {
                      id: `${field.id}_major`,
                      term: '학과/부',
                      registerPath: `relatedPeople.victims.${index}.major`,
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
          <ol className="mb-6">
            {attackerFields.map((field, index) => (
              <li key={field.id}>
                <div className="relative mb-6">
                  {index > 0 && (
                    <button
                      className="absolute top-1/2 -translate-x-[calc(100%+2px)] -translate-y-1/2 text-[#979797]"
                      onClick={() => attackerRemove(index)}
                    >
                      <MinusCircle size="20" />
                    </button>
                  )}
                  <h3 className="text-lg font-semibold text-gray-700">[침해자{index + 1}]</h3>
                </div>
                <FrontmatterEditor
                  id={field.id}
                  register={register}
                  items={[
                    {
                      id: `${field.id}_name`,
                      term: '성명',
                      required: true,
                      registerPath: `relatedPeople.attackers.${index}.name`,
                    },
                    {
                      id: `${field.id}_student_id`,
                      term: '학번',
                      registerPath: `relatedPeople.attackers.${index}.studentId`,
                    },
                    {
                      id: `${field.id}_major`,
                      term: '학과/부',
                      registerPath: `relatedPeople.attackers.${index}.major`,
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
          <Input id="title" type="text" placeholder="제목을 입력하세요." {...register('title')} />
          <Editor
            height="620px"
            initialValue=" "
            placeholder="글을 작성해주세요"
            useCommandShortcut={true}
            onChange={contentChangeHandler}
            onBlur={contentBlurHandler}
            {...registerEditor}
          />
        </section>
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-semibold">증거 및 자료 첨부</h2>
          <FileInputs onChange={(files) => (filesRef.current = files)} />
        </section>
        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">개인정보 수집 및 이용에 관한 동의</h2>
          <pre className="rounded-md border-2 border-[#CDCDCD] px-8 py-6">{disclaimer}</pre>
          <div className="flex justify-between">
            <p className='before:absolute before:-translate-x-full before:text-[#ff0000] before:content-["*"]'>
              위와 같이 개인정보를 수집·이용하는 데 동의하십니까?
            </p>
            <div className="flex items-center gap-2">
              <label htmlFor="agree_disclaimer">동의합니다</label>
              <input
                id="agree_disclaimer"
                type="checkbox"
                checked={disclaimerAgreed}
                onChange={(evt) => setDisclaimerAgreed(evt.target.checked)}
              />
            </div>
          </div>
        </section>
      </Container>
      <ArticleFooter className="pb-6">
        <RegisterButton
          className="self-end"
          disabled={!disclaimerAgreed || Object.keys(errors).length > 0}
          onClick={handleSubmit(submitForm)}
        />
      </ArticleFooter>
    </article>
  );
}
