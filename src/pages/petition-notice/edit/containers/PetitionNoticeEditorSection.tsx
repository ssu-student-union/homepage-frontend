import { Input } from '@/components/ui/input';
import { RegisterButton } from '@/components/Buttons/BoardActionButtons';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { useEffect, useRef, useState } from 'react';
import { EditLayout } from '@/template/EditLayout';
import { postBoardImages } from '@/apis/postBoardImages';
import { postBoardPosts } from '@/apis/postBoardPosts';
import { useNavigate } from 'react-router-dom';

const GUIDE_LINE = `  *글 작성 가이드라인에 맞춰 글을 작성해주시기 바랍니다. 가이드라인을 준수하지 않을 경우, 게시글이 삭제될 수 있습니다.
###
  ### 청원취지
######
청원취지를 작성해주세요.
###
  ### 청원내용
######
청원내용을 작성해주세요.
###
  ### 청원대안
######
청원대안을 작성해주세요.
`;

type HookMap = {
  addImageBlobHook?: (blob: File, callback: HookCallback) => void;
};

type HookCallback = (url: string, text?: string) => void;

export function PetitionNoticeEditorSection() {
  const titleRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<Editor>(null);
  const [initialContent, setInitialContent] = useState<string | null>(GUIDE_LINE);
  const navigate = useNavigate();

  const onClickEnrollBtn = async () => {
    if (!titleRef.current) return;
    const title = titleRef.current.value;
    console.log(title);

    if (!editorRef.current) return;
    const content = editorRef.current.getInstance().getHTML();
    const extractedContent = JSON.stringify(content.replace(/^<p>.*?<\/p>/, '').trim());
    console.log(extractedContent);

    const posts = {
      boardCode: '청원게시판',
      post: {
        title: title,
        content: extractedContent,
        categoryCode: '진행중',
        thumbNailImage: null,
        isNotice: false,
        postFileList: [313],
      },
    };

    try {
      const response = await postBoardPosts(posts);
      console.log(response);
      navigate('/petition-notice');
    } catch (err) {
      console.log(err);
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
          console.log(res);
          const url = res.data.data.postFiles[0].url;
          callback(url, 'alt text');
        } catch (err) {
          console.log(err);
        }
      }
      return false;
    },
  };

  return (
    <EditLayout title="청원글 작성">
      <section>
        <Input
          ref={titleRef}
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
        <div className="mt-12 text-[1.125rem] font-bold xs:text-[0.75rem] sm:text-[0.75rem]">
          <p className="mb-8 text-[#767676]">※ 청원 게시판 안내</p>
          <p className="text-[#A4A4A4]">
            학생청원게시판은 학생이 함께 만들어가는 학생자치를 위해, 학우분들의 의견을 반영하고자 개설한 게시판입니다.
            <br />
            <br /> 청원 게시글 등록 후 30일 이내 100명 이상 동의를 얻은 청원의 경우 중앙운영위원회에서 안건 상정 및 답변
            의무를 가집니다.
            <br />
            <br /> * 중앙운영위원회는? <br />
            총학생회장, 부총학생회장, 8개 단과대학생회장, 융합특성화자유전공학부 학생회장, 동아리연합회장 등으로 구성된
            총학생회 의결기구입니다.
            <br />
            <br />
            학생청원의 처리 절차는 다음과 같습니다 <br />
            1. 청원 글을 등록하면 [진행중] 청원으로 분류 <br />
            2. 30일 이내 100명 이상 동의 시, [접수 완료] 청원으로 분류 30일 이내 100명 이상 동의를 얻지 못한 경우
            [종료됨] 청원으로 분류 <br />
            3. [접수 완료] 청원으로 분류된 게시글은 중앙운영위원회 안건으로 상정 <br />
            4. 중앙운영위원회 논의 후 게시글에 답변 등록. [답변 완료] 청원으로 분류 <br />
            <br />
            아래와 같은 내용의 청원은 사전 고지 없이 삭제되거나, 사유를 안내하고 안건 상정 및 처리를 진행하지 않을 수
            있습니다.
            <br /> 1. 총학생회 및 자치 기구, 특정 대상을 모독하는 내용의 청원 <br />
            2. 욕설 및 비속어의 사용, 폭력적, 선정적, 특정 집단에 대한 혐오 표현 및 개인정보, 허위사실, 명예훼손이
            우려되는 내용이 포함되는 내용의 청원 <br />
            3. 이미 사업 진행 중인 내용에 대한 청원 <br />
            4. 중복으로 올라온 청원 <br />
            5. 총학생회의 권한 및 책임 범위를 벗어나거나, 현실적으로 실현 불가능한 청원 <br />
            6. 글 작성 가이드라인을 준수하지 않은 청원
          </p>
        </div>
      </section>
      <div className="mb-10 mt-14 flex justify-end">
        <RegisterButton onClick={onClickEnrollBtn} />
      </div>
    </EditLayout>
  );
}
