import { HeadLayout } from '@/template/HeadLayout';
import { AuditEditFilesSection } from './container/auditEditFilesSection';
import { AuditEditImageSection } from './container/auditEditImageSection';
import { AuditEditTitleSection } from './container/auditEditTitleSection';
import { AuditEditContentSection } from './container/auditEditContentSection';
import { AuditEditSubmitButton } from './container/auditEditSubmitButton';
import { useAuditEdit } from './hook/useAuditEdit';

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
