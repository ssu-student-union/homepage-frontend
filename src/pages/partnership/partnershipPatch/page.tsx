import { HeadLayout } from '@/template/HeadLayout';

import { PartnershipEditTitleSection } from '../partnershipEdit/container/PartnershipEditTitleSection';
import { PartnershipEditContentSection } from '../partnershipEdit/container/PartnershipEditContentSection';
import { PartnershipEditSubmitButton } from '../partnershipEdit/container/PartnershipEditSubmitButton';
import { usePartnershipPatch } from './hook/usePartnershipPatch';
import { PartnershipPatchImageSection } from './container/PartnershipPatchImageSection';

export default function PartnershipPatchPage() {
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
  } = usePartnershipPatch();

  return (
    <>
      <HeadLayout title="제휴게시판" searchHidden={true} borderOff={true} />
      <PartnershipEditTitleSection
        initialValue={title}
        onTitleChange={handleTitleChange}
        onCategoryChange={handleCategoryChange}
      />
      <PartnershipEditContentSection initialValue={content} onContentChange={handleContentChange} />
      <PartnershipPatchImageSection
        imageList={imageList}
        thumbnailImage={thumbnailImage}
        setThumbnailImage={setThumbnailImage}
      />
      <PartnershipEditSubmitButton onSubmit={handleSubmit} isLoading={isLoading} />
    </>
  );
}
