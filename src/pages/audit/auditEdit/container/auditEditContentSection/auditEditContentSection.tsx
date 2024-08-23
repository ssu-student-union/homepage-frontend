import { useState, useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

interface AuditEditContentProps {}

export function AuditEditContentSection({}: AuditEditContentProps) {
  const [editorHeight, setEditorHeight] = useState('500px');

  const handleResize = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 1080) {
      setEditorHeight('300px');
    } else {
      setEditorHeight('500px');
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="audit-edit-content pt-[32px]">
      <Editor
        initialValue=" "
        placeholder="글을 작성해주세요"
        previewStyle="vertical"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        hideModeSwitch={true}
        height={editorHeight}
      />
    </div>
  );
}
