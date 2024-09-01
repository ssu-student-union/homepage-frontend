import { HeadLayout } from '@/template/HeadLayout';
import { PartnershipEditFilesSection } from './container/PartnershipEditFilesSection';
import { PartnershipEditTitleSection } from './container/PartnershipEditTitleSection';
import { PartnershipEditContentSection } from './container/PartnershipEditContentSection';
import { PartnershipEditSubmitButton } from './container/PartnershipEditSubmitButton';
import { usePartnershipEdit } from './hook/usePartnershipEdit';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetBoardDetail } from '@/hooks/useGetBoardDetail';
import { PartnershipEditImageSection } from './container/PartnershipEditImageSection';

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

  const location = useLocation();
  const postId: number = location.state?.postId;
  const boardCode: string = '제휴게시판';
  const { data: resp } = useGetBoardDetail({ boardCode, postId });
  const postDetail = resp?.data.postDetailResDto;

  return (
    <>
      <HeadLayout title="제휴안내" searchHidden={true} borderOff={true} />
      <PartnershipEditTitleSection
        onTitleChange={handleTitleChange}
        onCategoryChange={handleCategoryChange}
        initialValue={postDetail?.title}
      />
      <PartnershipEditContentSection onContentChange={handleContentChange} initialValue={postDetail?.content} />
      <PartnershipEditFilesSection onFilesChange={setFiles} />
      <PartnershipEditImageSection onImagesChange={setImages} />
      <PartnershipEditSubmitButton onSubmit={handleSubmit} isLoading={isLoading} />
    </>
  );
}
