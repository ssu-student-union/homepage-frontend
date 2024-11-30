import { RefObject, useRef, useState } from 'react';
import { EditorType, HookMap, PreviewStyle } from '@toast-ui/editor';
import { Editor } from '@toast-ui/react-editor';
import { clientAuth } from '@/apis/client.ts';
import { PostFileResponse, UploadFilesResponse } from '@/pages/human-rights/hooks/mutations/useUploadFiles.ts';
import { ApiResponse } from '@/pages/human-rights/hooks/useStuQuery.ts';
import { FileResponse } from '@/types/apis/get';

interface UseContentEditorReturn {
  register: {
    hooks: HookMap;
    ref: RefObject<Editor>;
    previewStyle: PreviewStyle;
    initialEditType: EditorType;
    hideModeSwitch: boolean;
    language: string;
    autofocus: boolean;
  };
  isImageProcessing: boolean;
  processImages: (uploadedFiles?: FileResponse[]) => Promise<{
    existedImages: FileResponse[];
    newImages: PostFileResponse[];
    content: string;
  }>;
}

async function postBoardImages(boardCode: string, files: FormData) {
  return await clientAuth<ApiResponse<UploadFilesResponse>>({
    url: `/board/${boardCode}/files`,
    method: 'post',
    data: files,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

/**
 * useContentEditor 훅
 *
 * `ContentEditor`의 동작을 정의하는 훅입니다. `Editor` 컴포넌트에 `register` 값을 분해 할당하면 됩니다.
 * 첨부 이미지의 처리는 아래의 단계를 따릅니다.
 * 1. 이미지 첨부 시 이미지의 `Blob`을 `objectUrl`로 변경하여 표시
 * 2. `processImages` 호출 시 로컬의 이미지를 업로드 시도
 * 3. 업로드된 이미지의 URL으로 기존 objectURL을 대체
 * 4. 업로드된 이미지 정보와 대체된 컨텐츠 문자열 반환
 *
 * @param boardCode - 게시판 코드
 * @param ref - `Editor` 컴포넌트의 ref
 * @returns
 * `register` - `Editor` 컴포넌트에 분해 할당하여 에디터를 훅에 등록합니다.
 * `isImageProcessing` - 이미지가 업로드 중이라면 `true`를 반환합니다.
 * `processImages` - 이미지를 업로드하고 처리하는 함수입니다. 이미 업로드된 이미지의 `FileResponse` 배열을 인자로 받아, 최종적으로 에디터에 존재하는 파일 목록을 반환합니다.
 *   반환 값을 그대로 `postFileList`에 넣을 수 있습니다(첨부파일이 있다면 합쳐야 합니다).
 *
 * @example
 * ```tsx
 * const editorRef = useRef<Editor>(null);
 * const { register, processImages, isImageProcessing } = useContentEditor('청원게시판', editorRef);
 * return (<div>
 *   <Editor {...register} />
 *   <p>{isImageProcessing && '이미지 업로드 중...'}</p>
 * </div>);
 * ```
 */
// TODO: Define boardCode as enum
export function useContentEditor(boardCode: string, ref: RefObject<Editor>): UseContentEditorReturn {
  const imageObjectUrlsRef = useRef<[File | Blob, string][]>([]);
  const [isImageProcessing, setIsImageProcessing] = useState(false);

  function addImageBlobHook(file: File | Blob, callback: (url: string, text?: string) => void) {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      imageObjectUrlsRef.current.push([file, objectUrl]);
      if ('name' in file) {
        callback(objectUrl, file.name);
      } else {
        callback(objectUrl, 'image');
      }
    }
    return false;
  }

  async function processImages(existedImages: FileResponse[] = []) {
    setIsImageProcessing(true);
    try {
      const markdownContent = ref.current!.getInstance().getMarkdown();
      const imageUploadPromises = imageObjectUrlsRef.current.map(([image, objectUrl]) => {
        async function uploadImage() {
          const formData = new FormData();
          formData.append('images', image);
          const imageResponse = await postBoardImages(boardCode, formData);
          return {
            objectUrl,
            success: imageResponse.data.isSuccess,
            ...(imageResponse.data.isSuccess ? { files: imageResponse.data.data.postFiles } : {}),
          };
        }

        return uploadImage();
      });
      const uploadedImages = await Promise.all(imageUploadPromises);
      const processedContent = uploadedImages.reduce((content, { objectUrl, success, files }) => {
        if (success && files) {
          URL.revokeObjectURL(objectUrl);
          return content.replace(objectUrl, files[0].url);
        }
        return content;
      }, markdownContent);
      imageObjectUrlsRef.current = [];
      setIsImageProcessing(false);
      return {
        existedImages: existedImages.filter(({ fileUrl }) => processedContent.includes(fileUrl)),
        newImages: uploadedImages.filter(({ files }) => files).flatMap(({ files }) => files as PostFileResponse[]),
        content: processedContent,
      };
    } catch (error) {
      setIsImageProcessing(false);
      throw error;
    }
  }

  return {
    register: {
      hooks: { addImageBlobHook },
      ref: ref,
      previewStyle: 'vertical',
      initialEditType: 'wysiwyg',
      hideModeSwitch: true,
      language: 'ko-KR',
      autofocus: false,
    },
    isImageProcessing,
    processImages,
  };
}
