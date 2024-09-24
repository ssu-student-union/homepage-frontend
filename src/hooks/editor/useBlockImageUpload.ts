import { useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';

export const useBlockImageUpload = (editorRef: React.MutableRefObject<Editor | null>) => {
  useEffect(() => {
    if (editorRef.current) {
      const instance = editorRef.current.getInstance();

      // 이미지 업로드를 막는 훅 등록
      instance.addHook('addImageBlobHook', () => {
        alert('글 작성만 가능합니다.');
        return false; // 이미지 업로드 중단
      });

      // 클린업 함수: 컴포넌트 언마운트 시 훅 제거
      return () => {
        instance.removeHook('addImageBlobHook');
      };
    }
  }, [editorRef]);
};
