import { ReactNode } from 'react';
import { Editor } from '@toast-ui/react-editor';

import { useEditContext } from '@/containers/edit/useEditContext';

import { cn } from '@/libs/utils';
import { Input } from '@/components/ui/input';

interface EditEditorSectionRootProps {
  children: ReactNode;
  className?: string;
}

/**
 * 게시글 작성/수정 화면에서 사용하는 에디터 section 컴포넌트입니다.
 *
 * 사용예시를 보면 알 수 있듯이 필요한 컴포넌트를 선택적으로 사용하면 됩니다.
 *
 * @example 사용 예시
 * ```tsx
 * <EditEditorSection>
 *  <EditEditorSection.Title essential>피해 사실 기술</EditEditorSection.Title>
 *
 *  <EditEditorSection.InputArea>
 *    <EditEditorSection.Input
 *      placeholder="제목을 입력하세요."
 *    />
 *    <EditEditorSection.SideSlot position="right">
 *      <FilterDropDown
 *        className="flex h-[44px] w-full items-center justify-center border-gray-500 py-0 text-[19px] font-medium"
 *        defaultValue="카테고리"
 *        optionValue={categories}
 *        onValueChange={(value) => {
 *          setCategory(value);
 *          setValue('category', value);
 *        }}
 *        value={category}
 *      />
 *    </EditEditorSection.SideSlot>
 *  </EditEditorSection.InputArea>
 *
 *  <EditEditorSection.Editor />
 * </EditEditorSection>
 * ```
 */
function EditEditorSectionRoot({ children, className = '' }: EditEditorSectionRootProps) {
  return <section className={cn('mb-16 flex flex-col gap-6', className)}>{children}</section>;
}

function EditEditorSectionTitle({ children, essential = false }: { children: ReactNode; essential?: boolean }) {
  return (
    <h2
      className={cn(
        'text-2xl font-semibold',
        essential && 'before:absolute before:-translate-x-full before:text-[#ff0000] before:content-["*"]'
      )}
    >
      {children}
    </h2>
  );
}

function EditEditorSectionInputArea({
  children,
  validityArea = false,
}: {
  children: ReactNode;
  validityArea?: boolean;
}) {
  return <div className={cn(validityArea && 'flex flex-col gap-[10px] md:flex-row')}>{children}</div>;
}

function EditEditorSectionInput({
  placeholder = '제목을 입력하세요.',
  className = '',
}: {
  placeholder?: string;
  className?: string;
}) {
  const { form } = useEditContext();
  const {
    register,
    formState: { errors },
  } = form;

  const titleError = errors?.title;

  return (
    <div className="w-full">
      <Input id="title" type="text" placeholder={placeholder} className={cn(className)} {...register('title')} />
      <p
        className={cn(
          'mt-1 text-sm text-red-700 transition-all',
          titleError ? 'h-5 translate-y-0 opacity-100' : 'h-0 -translate-y-2 opacity-0'
        )}
      >
        {titleError && titleError.type === 'too_big' ? '제목은 50자 이내이여야 합니다.' : '이 값은 필수입니다.'}
      </p>
    </div>
  );
}

/**
 * PC 해상도에서는 Input의 왼쪽 혹은 오른쪽,
 * 모바일 해상도에서는 Input의 위 혹은 아래에 위치하는 컴포넌트입니다.
 *
 * @example 사용 예시
 * ```tsx
 * <EditEditorSection.InputArea>
 *   <EditEditorSection.Input
 *     placeholder="제목을 입력하세요."
 *     {...register('title')}
 *   />
 *     <EditEditorSection.SubSlot position="right">
 *     <FilterDropDown
 *       className="flex h-[44px] w-full items-center justify-center border-gray-500 py-0 text-[19px] font-medium"
 *       defaultValue="카테고리"
 *       optionValue={categories}
 *       onValueChange={(value) => {
 *         setCategory(value);
 *         setValue('category', value);
 *       }}
 *       value={category}
 *     />
 *   </EditEditorSection.SubSlot>
 * </EditEditorSection.InputArea>
 * ```
 */
function EditEditorSectionSubSlot({
  children,
  position = 'right_down',
}: {
  children: ReactNode;
  position?: 'left_top' | 'right_down';
}) {
  return (
    <div className={cn('flex-shrink-0', 'w-full', position === 'left_top' ? 'md:order-first' : 'md:order-last')}>
      {children}
    </div>
  );
}

function EditEditorSectionEditor() {
  const { handleContentChange, handleContentBlur, register: registerEditor } = useEditContext();

  return (
    <Editor
      height="620px"
      initialValue=""
      placeholder="글을 작성해주세요"
      useCommandShortcut={true}
      onChange={handleContentChange}
      onBlur={handleContentBlur}
      {...registerEditor}
    />
  );
}

export const EditEditorSection = Object.assign(EditEditorSectionRoot, {
  Title: EditEditorSectionTitle,
  InputArea: EditEditorSectionInputArea,
  Input: EditEditorSectionInput,
  SubSlot: EditEditorSectionSubSlot,
  Editor: EditEditorSectionEditor,
});
