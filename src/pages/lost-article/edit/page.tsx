import { AuditEditContentSection } from '@/pages/audit/auditEdit/container/auditEditContentSection';
import { AuditEditImageSection } from '@/pages/audit/auditEdit/container/auditEditImageSection';
import { AuditEditSubmitButton } from '@/pages/audit/auditEdit/container/auditEditSubmitButton';
import { AuditEditTitleSection } from '@/pages/audit/auditEdit/container/auditEditTitleSection';
import { HeadLayout } from '@/template/HeadLayout';
import { useLostEdit } from './hook/useLostEdit';

export function LostArticleEditPage() {
  const { handleTitleChange, handleCategoryChange, handleContentChange, handleSubmit, setImages, isLoading } =
    useLostEdit();

  return (
    <>
      <HeadLayout title="분실물 게시판" searchHidden={true} borderOff={true} />
      <AuditEditTitleSection
        onTitleChange={handleTitleChange}
        onCategoryChange={handleCategoryChange}
        categoryList={['분실물현황', '분실신고']}
      />
      <AuditEditContentSection onContentChange={handleContentChange} />
      <AuditEditImageSection onImagesChange={setImages} />
      <AuditEditSubmitButton onSubmit={handleSubmit} isLoading={isLoading} />
    </>
  );
}
