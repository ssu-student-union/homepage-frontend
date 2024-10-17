import { Editor, EditorProps } from '@toast-ui/react-editor';
import { useRef } from 'react';

interface ContentEditorProps
  extends Omit<EditorProps, 'ref' | 'previewStyle' | 'initialEditType' | 'hideModeSwitch' | 'language'> {}

export function ContentEditor(props: ContentEditorProps) {
  // TODO: Intercept adding image and push to blob array, then replace image url to objectUrl
  // TODO: react-hook-form support with compatible ref and onChange, onBlur events.
  const editorRef = useRef<Editor>(null);
  return <Editor ref={editorRef} {...props} />;
}
