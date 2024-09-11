import { HeadLayout } from '@/template/HeadLayout';
import { AuditEditTitleSection } from '../auditEdit/container/auditEditTitleSection';
import { AuditEditContentSection } from '../auditEdit/container/auditEditContentSection';
import { AuditEditSubmitButton } from '../auditEdit/container/auditEditSubmitButton';
import { AuditPatchImageSection } from './container/auditPatchImageSection';
import { AuditPatchFilesSection } from './container/auditPatchFileSection';
import { useAuditPatch } from './hook/useAuditPatch';

export function AuditPatchPage() {
  const {
    title,
    content,
    handleTitleChange,
    handleCategoryChange,
    handleContentChange,
    handleSubmit,
    isLoading,
    imageList,
    fileList,
    thumbnailImage,
    setThumbnailImage,
    handleFileDelete,
    setNewFiles,
  } = useAuditPatch();

  return (
    <>
      <HeadLayout title="감사기구" searchHidden={true} borderOff={true} />
      <AuditEditTitleSection
        initialTitle={title}
        onTitleChange={handleTitleChange}
        onCategoryChange={handleCategoryChange}
        categoryList={['감사계확', '감사결과', '기타']}
      />
      <AuditEditContentSection initialValue={content} onContentChange={handleContentChange} />
      <AuditPatchImageSection
        imageList={imageList}
        thumbnailImage={thumbnailImage}
        setThumbnailImage={setThumbnailImage}
      />
      <AuditPatchFilesSection fileUrls={fileList} onFileDelete={handleFileDelete} onFilesChange={setNewFiles} />
      <AuditEditSubmitButton onSubmit={handleSubmit} isLoading={isLoading} />
    </>
  );
}
