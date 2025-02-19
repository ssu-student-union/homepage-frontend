import { NoticeEditContentSection } from '@/pages/notice/noticeEdit/container/noticeEditContentSection';
import { NoticeEditFilesSection } from '@/pages/notice/noticeEdit/container/noticeEditFilesSection';
import { NoticeEditImageSection } from '@/pages/notice/noticeEdit/container/noticeEditImageSection';
import { NoticeEditSubmitButton } from '@/pages/notice/noticeEdit/container/noticeEditSubmitButton';
import { NoticeEditTitleSection } from '@/pages/notice/noticeEdit/container/noticeEditTitleSection';
import { useNoticeEdit } from '@/pages/notice/noticeEdit/hook/useNoticeEdit';
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
