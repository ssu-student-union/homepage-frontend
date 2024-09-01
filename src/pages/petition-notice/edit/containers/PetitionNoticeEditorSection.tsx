import { Input } from '@/components/ui/input';
import { RegisterButton } from '@/components/Buttons/BoardActionButtons';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { useEffect, useRef, useState } from 'react';
import { EditLayout } from '@/template/EditLayout';
import { postBoardImages } from '@/apis/postBoardImages';
import { useNavigate } from 'react-router-dom';
import { client } from '@/apis/client';
import { GuideMessage } from '../components/GuidMessage';
import { usePatchBoardPosts } from '@/hooks/usePatchBoardPosts';
import history from '@/hooks/useHistory';
import { GUIDE_LINE } from '../components/GuideLine';
import { usePostBoardPosts } from '@/hooks/usePostBoardPosts';

type HookMap = {
  addImageBlobHook?: (blob: File, callback: HookCallback) => void;
};

type HookCallback = (url: string, text?: string) => void;

export function PetitionNoticeEditorSection() {
  const titleRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<Editor>(null);
  const [initialContent, setInitialContent] = useState<string | null>(GUIDE_LINE);
  const [initialTitle, setInitialTitle] = useState('');
  const [initialCategoryName, setInitialCategoryName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [imageId, setImageId] = useState<number>();
  const navigate = useNavigate();

  const postID = localStorage.getItem('edit-post');
  const userID = JSON.parse(localStorage.getItem('kakaoData') as string).data.id!;

  useEffect(() => {
    if (postID) {
      const response = client.get(`/board/청원게시판/posts/${postID}`, {
        params: {
          userId: userID,
        },
      });
      response.then((result) => {
        const postDetailResDto = result.data.data.postDetailResDto;
        setInitialTitle(postDetailResDto.title);
        setInitialContent(JSON.parse(postDetailResDto.content));
        setInitialCategoryName(postDetailResDto.categoryName);
        setIsEditing(true);
      });
    }
  }, []);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitialTitle(e.target.value);
  };

  const postPostMutation = usePostBoardPosts();
  const patchPostMutation = usePatchBoardPosts();

  const onClickEnrollBtn = async () => {
    if (!titleRef.current) return;
    const title = titleRef.current.value;

    if (!editorRef.current) return;
    const content = editorRef.current.getInstance().getHTML();

    if (!isEditing) {
      const extractedContent = JSON.stringify(content.replace(/^<p>.*?<\/p><h3><br><\/h3>/, '').trim());
      const posts = {
        boardCode: '청원게시판',
        post: {
          title: title,
          content: extractedContent,
          categoryCode: '진행중',
          thumbNailImage: null,
          isNotice: false,
          postFileList: [imageId!],
        },
      };

      try {
        if (title) {
          const check = window.confirm('청원 글을 등록하시겠습니까?');
          if (check) {
            await postPostMutation.mutateAsync(posts);
            navigate('/petition-notice');
          } else {
            return;
          }
        } else {
          window.alert('청원 글 제목을 입력해주세요!');
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      const patch_posts = {
        boardCode: '청원게시판',
        postId: Number(postID),
        posts: {
          title: title,
          content: JSON.stringify(content),
          categoryCode: initialCategoryName,
          thumbnailImage: null,
          postFileList: [imageId!],
        },
      };
      try {
        await patchPostMutation.mutateAsync(patch_posts);
        localStorage.removeItem('edit-post');
        const check = window.confirm('편집하시겠습니까?');
        if (check) {
          navigate('/homepage-frontend/petition-notice');

          // 이미지 수정 시 원본 컨텐츠와 비교하여 바뀐 이미지는 삭제하는 로직 필요
          console.log(initialContent);
          console.log(JSON.stringify(content));
        } else {
          return;
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (editorRef!.current) {
      editorRef!.current.getInstance().focus();
      if (initialContent === '') {
        editorRef!.current.getInstance().reset();
      } else {
        editorRef!.current.getInstance().setMarkdown(initialContent);
        setInitialContent(initialContent);
      }
    }
  }, [initialContent]);

  const hooks: HookMap = {
    addImageBlobHook: async (blob: File, callback: HookCallback) => {
      if (blob !== null) {
        const file = new FormData();
        file.append('images', blob);
        try {
          const res = await postBoardImages(file);
          const url = res.data.data.postFiles[0].url;
          const id = res.data.data.postFiles[0].id;
          setImageId(id);
          callback(url, 'alt text');
        } catch (err) {
          console.log(err);
        }
      }
      return false;
    },
  };

  const [locationKeys, setLocationKeys] = useState<string[]>([]);

  useEffect(() => {
    return history.listen((location) => {
      if (history.action === 'POP') {
        if (locationKeys[1] === location.location.key) {
          setLocationKeys(([_, ...keys]) => keys);
          localStorage.removeItem('edit-post');
        } else {
          setLocationKeys((keys) => [location.location.key, ...keys]);
          const check = window.confirm('작성 또는 편집한 내용은 저장되지 않습니다. 페이지를 나가시겠습니까?');
          if (check) {
            localStorage.removeItem('edit-post');
          }
        }
      }
    });
  }, [locationKeys, history]);

  return (
    <EditLayout title="청원글 작성">
      <section>
        <Input
          ref={titleRef}
          value={initialTitle}
          onChange={handleTitleChange}
          type="text"
          placeholder="제목을 입력하세요."
          className="mb-[26px] rounded-[6px] border-gray-300 text-[1.125rem] placeholder:font-medium placeholder:text-[#BFBFBF]"
        />
        <div className="z-0">
          <Editor
            ref={editorRef}
            height="620px"
            initialValue={initialContent}
            previewStyle="vertical"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            hideModeSwitch={true}
            language="ko-KR"
            hooks={hooks}
          />
        </div>
      </section>
      <section>
        <GuideMessage />
      </section>
      <div className="mb-10 mt-14 flex justify-end">
        <RegisterButton onClick={onClickEnrollBtn} />
      </div>
    </EditLayout>
  );
}
