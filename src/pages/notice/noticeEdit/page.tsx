import { HeadLayout } from '@/template/HeadLayout';
import { NoticeEditFilesSection } from './container/noticeEditFilesSection';
import { NoticeEditImageSection } from './container/noticeEditImageSection';
import { NoticeEditTitleSection } from './container/noticeEditTitleSection';
import { NoticeEditContentSection } from './container/noticeEditContentSection';
import { NoticeEditSubmitButton } from './container/noticeEditSubmitButton';
import { useNoticeEdit } from './hook/useNoticeEdit';

export function NoticeEditPage() {
  const { handleTitleChange, handleContentChange, handleUrgentChange, handleSubmit, setFiles, setImages, isPending } =
    useNoticeEdit();

  return (
    <>
      <HeadLayout title="공지사항" searchHidden={true} borderOff={true} />
      <NoticeEditTitleSection onTitleChange={handleTitleChange} onUrgentChange={handleUrgentChange} />
      <NoticeEditContentSection onContentChange={handleContentChange} />
      <NoticeEditFilesSection onFilesChange={setFiles} />
      <NoticeEditImageSection onImagesChange={setImages} />
      <NoticeEditSubmitButton onSubmit={handleSubmit} isLoading={isPending} />
    </>
  );
}
