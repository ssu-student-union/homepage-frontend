import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";

interface PetitionNoticeEditProp {
  editorRef: React.RefObject<Editor> | null;
}

export function PetitionNoticeEditor({ editorRef }: PetitionNoticeEditProp) {
  const initialContent = `*글 작성 가이드라인에 맞춰 글을 작성해주시기 바랍니다. 가이드라인을 준수하지 않을 경우, 게시글이 삭제될 수 있습니다.`;

  return (
    <Editor
      ref={editorRef}
      height="620px"
      initialValue={initialContent}
      previewStyle="vertical"
      initialEditType="wysiwyg"
      useCommandShortcut={true}
      hideModeSwitch={true}
      language="ko-KR"
    />
  );
}
