import { HeadLayout } from '@/template/HeadLayout';
import { AuditEditTitleSection } from '../auditEdit/container/auditEditTitleSection';
import { AuditEditContentSection } from '../auditEdit/container/auditEditContentSection';
import { AuditEditSubmitButton } from '../auditEdit/container/auditEditSubmitButton';
import { useAuditPatch } from './hook/useAuditPatch';
import { AuditPatchImageSection } from './container/auditPatchImageSection';

export default function AuditPatchPage() {
  const {
    title,
    category,
    content,
    handleTitleChange,
    handleCategoryChange,
    handleContentChange,
    handleSubmit,
    isLoading,
    imageList,
    thumbnailImage,
    setThumbnailImage,
  } = useAuditPatch();

  return (
    <>
      <HeadLayout title="감사기구" searchHidden={true} borderOff={true} />
      <AuditEditTitleSection
        initialTitle={title}
        initialCategory={category}
        onTitleChange={handleTitleChange}
        onCategoryChange={handleCategoryChange}
      />
      <AuditEditContentSection initialValue={content} onContentChange={handleContentChange} />
      <AuditPatchImageSection
        imageList={imageList}
        thumbnailImage={thumbnailImage}
        setThumbnailImage={setThumbnailImage}
      />
      <AuditEditSubmitButton onSubmit={handleSubmit} isLoading={isLoading} />
    </>
  );
}
