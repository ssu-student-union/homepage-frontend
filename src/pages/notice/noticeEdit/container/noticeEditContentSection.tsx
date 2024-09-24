import { useState, useEffect, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useBlockImageUpload } from '@/hooks/editor/useBlockImageUpload';

interface NoticeEditContentProps {
  onContentChange: (content: string) => void;
  initialValue?: string | null;
}

export function NoticeEditContentSection({ onContentChange, initialValue = '' }: NoticeEditContentProps) {
  const [editorHeight, setEditorHeight] = useState('500px');
  const editorRef = useRef<Editor>(null);

  const handleResize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 1080) {
      setEditorHeight('300px');
    } else {
      setEditorHeight('500px');
    }
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.getInstance().getMarkdown();
      onContentChange(content);
    }
  };

  useBlockImageUpload(editorRef);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="audit-edit-content px-[200px] pt-[1rem] xs:px-[30px] xs:pt-[1rem] sm:px-[30px] sm:pt-[1rem] md:px-[30px] lg:px-[30px]">
      <Editor
        ref={editorRef}
        initialValue={initialValue || ' '}
        placeholder="글을 작성해주세요"
        previewStyle="vertical"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        hideModeSwitch={true}
        height={editorHeight}
        onChange={handleContentChange}
      />
    </div>
  );
}
