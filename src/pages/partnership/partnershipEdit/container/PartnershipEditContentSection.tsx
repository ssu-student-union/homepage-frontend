import { useState, useEffect, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useResize } from '@/hooks/useResize';

interface PartnershipEditContentProps {
  onContentChange: (content: string) => void;
  initialValue?: string;
}

export function PartnershipEditContentSection({ onContentChange, initialValue = '' }: PartnershipEditContentProps) {
  const [editorHeight, setEditorHeight] = useState('500px');

  const editorRef = useRef<Editor>(null);

  const { width } = useResize();

  useEffect(() => {
    if (width <= 1080) {
      setEditorHeight('300px');
    } else {
      setEditorHeight('500px');
    }
  }, [width]);

  const handleContentChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.getInstance().getMarkdown();
      onContentChange(content);
    }
  };

  return (
    <div className="px-[200px] pt-[32px] xs:px-[30px] sm:px-[30px] md:px-[30px] lg:px-[30px]">
      <Editor
        ref={editorRef}
        initialValue={initialValue}
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
