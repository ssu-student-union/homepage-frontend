import { AuditEditContentSection } from '@/pages/audit/edit/container/auditEditContentSection';
import { AuditEditSubmitButton } from '@/pages/audit/edit/container/auditEditSubmitButton';
import { AuditEditTitleSection } from '@/pages/audit/edit/container/auditEditTitleSection';
import { AuditPatchImageSection } from '@/pages/audit/patch/container/auditPatchImageSection';
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
    isPending,
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
      <AuditEditSubmitButton onSubmit={handleSubmit} isLoading={isPending} />
    </>
  );
}
