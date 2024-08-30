import { HeadLayout } from '@/template/HeadLayout';
import { AuditEditTitleSection } from '../auditEdit/container/auditEditTitleSection';
import { AuditEditContentSection } from '../auditEdit/container/auditEditContentSection';
import { AuditEditSubmitButton } from '../auditEdit/container/auditEditSubmitButton';
import { useAuditPatch } from './hook/useAuditPatch';
import { AuditPatchImageSection } from './container/auditPatchImageSection';
import { useLocation } from 'react-router-dom';
import { AuditEditFilesSection } from '../auditEdit/container/auditEditFilesSection';

export default function AuditPatchPage() {
  const location = useLocation();
  const data = location.state?.data || {};

  const { postId, imageUrls, title, category, content, thumbnailImage } = data;

  const {
    setFiles,
    handleTitleChange,
    handleCategoryChange,
    handleContentChange,
    handleSubmit,
    handleThumbnailImage,
    isLoading,
    newThumbnailImage,
  } = useAuditPatch({
    postId,
    imageList: imageUrls,
    initialTitle: title,
    initialCategory: category,
    initialContent: content,
    initialThumbnailImage: thumbnailImage,
  });

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
        imageList={imageUrls}
        thumbnailImage={newThumbnailImage}
        setThumbnailImage={handleThumbnailImage}
      />
      <AuditEditFilesSection onFilesChange={setFiles} />
      <AuditEditSubmitButton onSubmit={handleSubmit} isLoading={isLoading} />
    </>
  );
}
