import { Header } from "@/containers/common/Header/Header";
import { Input } from "@/components/ui/input";
import { PetitionNoticeEditor } from "./containers/PetitionNoticeEditor";
import { RegisterButton } from "@/components/Buttons/BoardActionButtons";
import { useCallback, useRef } from "react";
import { Editor } from "@toast-ui/react-editor";

export function PetitionNoticeEditPage() {
  const editorRef = useRef<Editor>(null);

  const onClickEnrollBtn = useCallback(() => {
    if (!editorRef.current) return;
    const html = editorRef.current.getInstance().getHTML();
    console.log("html", html);
  }, []);

  return (
    <div>
      <Header />
      <div className="flex flex-col mt-[201px] mb-14 px-[200px] md:px-[72px] sm:px-[34px] xs:px-[34px]">
        <div className="mb-[29px] text-[34px] font-bold whitespace-nowrap">
          청원글 작성
        </div>
        <Input
          type="text"
          placeholder="제목을 입력하세요."
          className="mb-[26px] rounded-[6px] border-gray-300 text-lg placeholder:font-medium placeholder:text-[#BFBFBF]"
        />
        <PetitionNoticeEditor editorRef={editorRef} />
      </div>
      <RegisterButton onClick={onClickEnrollBtn} />
    </div>
  );
}
