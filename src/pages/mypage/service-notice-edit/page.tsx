import { NoticeEditContentSection } from '@/pages/notice/edit/container/noticeEditContentSection';
import { NoticeEditFilesSection } from '@/pages/notice/edit/container/noticeEditFilesSection';
import { NoticeEditImageSection } from '@/pages/notice/edit/container/noticeEditImageSection';
import { NoticeEditSubmitButton } from '@/pages/notice/edit/container/noticeEditSubmitButton';
import { NoticeEditTitleSection } from '@/pages/notice/edit/container/noticeEditTitleSection';
import { useNoticeEdit } from '@/pages/notice/edit/hook/useNoticeEdit';
import { HeadLayout } from '@/template/HeadLayout';

export function ServiceNoticeEditPage() {
  const {
    handleTitleChange,
    handleContentChange,
    handleUrgentChange,
    setFiles,
    setImages,
    handleServiceSubmit,
    isPending,
  } = useNoticeEdit();

  return (
    <>
      <HeadLayout title="서비스 공지사항" searchHidden={true} borderOff={true} />
      <NoticeEditTitleSection onTitleChange={handleTitleChange} onUrgentChange={handleUrgentChange} />
      <NoticeEditContentSection onContentChange={handleContentChange} />
      <NoticeEditFilesSection onFilesChange={setFiles} />
      <NoticeEditImageSection onImagesChange={setImages} />
      <NoticeEditSubmitButton onSubmit={handleServiceSubmit} isLoading={isPending} />
    </>
  );
}
