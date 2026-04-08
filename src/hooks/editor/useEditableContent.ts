import { RefObject, useCallback, useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import { useContentEditor } from '@/hooks/useContentEditor';

interface UseEditableContentOptions {
  boardCode: string;
  setValue: (field: 'content', value: string, options?: { shouldValidate?: boolean }) => void;
  trigger: (field: 'content') => Promise<boolean>;
}

/**
 * 에디터 관련 관심사를 묶는 훅.
 *
 * `useContentEditor` + `editorRef` + `isPostLoaded` + content 핸들러를 하나로 그룹화합니다.
 * 뮤테이션, 파일, 네비게이션 등 에디터와 무관한 관심사는 포함하지 않습니다.
 *
 * @example
 * ```tsx
 * const editor = useEditableContent({
 *   boardCode: '건의게시판',
 *   setValue,   // from react-hook-form
 *   trigger,    // from react-hook-form
 * });
 *
 * <Editor {...editor.editorProps} />
 * ```
 */
export function useEditableContent({ boardCode, setValue, trigger }: UseEditableContentOptions) {
  const editorRef = useRef<Editor>(null);
  const { register: registerEditor, processImages, isImageProcessing } = useContentEditor(boardCode, editorRef);
  const [isPostLoaded, setIsPostLoaded] = useState(false);

  const handleContentChange = useCallback(() => {
    if (editorRef.current && isPostLoaded) {
      setValue('content', editorRef.current.getInstance().getMarkdown(), { shouldValidate: true });
    }
  }, [isPostLoaded, setValue]);

  const handleContentBlur = useCallback(() => {
    (async () => await trigger('content'))();
  }, [trigger]);

  /** 기존 게시글의 content를 에디터에 로드합니다. useEffect 안에서 호출하세요. */
  const loadContent = useCallback((content: string) => {
    if (editorRef.current) {
      editorRef.current.getInstance().setMarkdown(content);
    }
  }, []);

  const markLoaded = useCallback(() => {
    setIsPostLoaded(true);
  }, []);

  return {
    ref: editorRef as RefObject<Editor>,
    isPostLoaded,
    isImageProcessing,
    processImages,
    loadContent,
    markLoaded,
    editorProps: {
      ...registerEditor,
      onChange: handleContentChange,
      onBlur: handleContentBlur,
    },
  };
}
