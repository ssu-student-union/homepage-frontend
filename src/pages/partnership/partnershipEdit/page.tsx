import { HeadLayout } from '@/template/HeadLayout';
import { PartnershipEditFilesSection } from './container/PartnershipEditFilesSection';
import { PartnershipEditImageSection } from './container/PartnershipEditImageSection';
import { PartnershipEditTitleSection } from './container/PartnershipEditTitleSection';
import { PartnershipEditContentSection } from './container/PartnershipEditContentSection';
import { PartnershipEditSubmitButton } from './container/PartnershipEditSubmitButton';
import { usePartnershipEdit } from './hook/usePartnershipEdit';
import { useEffect } from 'react';

export function PartnershipEditPage() {
  const {
    handleTitleChange,
    handleCategoryChange,
    handleContentChange,
    handleSubmit,
    setFiles,
    setImages,
    isLoading,
    error,
  } = usePartnershipEdit();

  useEffect(() => {
    if (error) alert((error?.response?.data as { message: string })?.message);
  }, [error]);

  return (
    <>
      <HeadLayout title="제휴안내" searchHidden={true} borderOff={true} />
      <PartnershipEditTitleSection onTitleChange={handleTitleChange} onCategoryChange={handleCategoryChange} />
      <PartnershipEditContentSection onContentChange={handleContentChange} />
      <PartnershipEditFilesSection onFilesChange={setFiles} />
      <PartnershipEditImageSection onImagesChange={setImages} />
      <PartnershipEditSubmitButton onSubmit={handleSubmit} isLoading={isLoading} />
    </>
  );
}
