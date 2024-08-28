import { HeadLayout } from '@/template/HeadLayout';
import { AuditEditTitleSection } from '../auditEdit/container/auditEditTitleSection';
import { AuditEditContentSection } from '../auditEdit/container/auditEditContentSection';
import { AuditEditSubmitButton } from '../auditEdit/container/auditEditSubmitButton';
import { AuditEditImageSection } from '../auditEdit/container/auditEditImageSection';
import { useAuditEdit } from '../auditEdit/hook/useAuditEdit';

export default function AuditPatchPage() {
  const { handleTitleChange, handleCategoryChange, handleContentChange, handleSubmit, setImages, isLoading } =
    useAuditEdit();

  return (
    <>
      <HeadLayout title="감사기구" searchHidden={true} borderOff={true} />
      <AuditEditTitleSection onTitleChange={handleTitleChange} onCategoryChange={handleCategoryChange} />
      <AuditEditContentSection onContentChange={handleContentChange} />
      <AuditEditImageSection onImagesChange={setImages} />
      <AuditEditSubmitButton onSubmit={handleSubmit} isLoading={isLoading} />
    </>
  );
}
