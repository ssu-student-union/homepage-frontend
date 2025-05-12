import { HeadLayout } from '@/template/HeadLayout';
import { AuditEditFilesSection } from './container/auditEditFilesSection';
import { AuditEditImageSection } from './container/auditEditImageSection';
import { AuditEditTitleSection } from './container/auditEditTitleSection';
import { AuditEditContentSection } from './container/auditEditContentSection';
import { AuditEditSubmitButton } from './container/auditEditSubmitButton';
import { useAuditEdit } from './hook/useAuditEdit';

// 제휴게시판과 연결돼있는 (구)감사기구페이지 게시글작성페이지입니다. 추후에 제휴게시판 리팩 시 삭제될 예정입니다.
export function AuditEditPage() {
  const { handleTitleChange, handleCategoryChange, handleContentChange, handleSubmit, setFiles, setImages, isPending } =
    useAuditEdit();

  return (
    <>
      <HeadLayout title="감사기구" searchHidden={true} borderOff={true} />
      <AuditEditTitleSection
        onTitleChange={handleTitleChange}
        onCategoryChange={handleCategoryChange}
        categoryList={['감사계획', '감사결과', '기타']}
      />
      <AuditEditContentSection onContentChange={handleContentChange} />
      <AuditEditImageSection onImagesChange={setImages} />
      <AuditEditFilesSection onFilesChange={setFiles} />
      <AuditEditSubmitButton onSubmit={handleSubmit} isLoading={isPending} />
    </>
  );
}
