import { AuditEditContentSection } from '@/pages/audit/edit/container/auditEditContentSection';
import { AuditEditImageSection } from '@/pages/audit/edit/container/auditEditImageSection';
import { AuditEditSubmitButton } from '@/pages/audit/edit/container/auditEditSubmitButton';
import { AuditEditTitleSection } from '@/pages/audit/edit/container/auditEditTitleSection';
import { HeadLayout } from '@/template/HeadLayout';
import { useLostEdit } from './hook/useLostEdit';

export function LostArticleEditPage() {
  const { handleTitleChange, handleCategoryChange, handleContentChange, handleSubmit, setImages, isPending } =
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
      <AuditEditSubmitButton onSubmit={handleSubmit} isLoading={isPending} />
    </>
  );
}
