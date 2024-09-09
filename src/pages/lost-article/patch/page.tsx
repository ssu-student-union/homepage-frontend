import { AuditEditContentSection } from '@/pages/audit/auditEdit/container/auditEditContentSection';
import { AuditEditSubmitButton } from '@/pages/audit/auditEdit/container/auditEditSubmitButton';
import { AuditEditTitleSection } from '@/pages/audit/auditEdit/container/auditEditTitleSection';
import { AuditPatchImageSection } from '@/pages/audit/auditPatch/container/auditPatchImageSection';
import { HeadLayout } from '@/template/HeadLayout';
import { useLostPatch } from './hook/useLostPatch';

export function LostPatchPage() {
  const {
    title,
    content,
    handleTitleChange,
    handleCategoryChange,
    handleContentChange,
    handleSubmit,
    isLoading,
    imageList,
    thumbnailImage,
    setThumbnailImage,
  } = useLostPatch();

  return (
    <>
      <HeadLayout title="분실물 게시판" searchHidden={true} borderOff={true} />
      <AuditEditTitleSection
        initialTitle={title}
        onTitleChange={handleTitleChange}
        onCategoryChange={handleCategoryChange}
        categoryList={['분실물현황', '분실신고']}
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
