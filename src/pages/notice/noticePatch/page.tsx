import { HeadLayout } from '@/template/HeadLayout';
import { NoticeEditTitleSection } from '../noticeEdit/container/noticeEditTitleSection';
import { NoticeEditContentSection } from '../noticeEdit/container/noticeEditContentSection';
import { NoticeEditSubmitButton } from '../noticeEdit/container/noticeEditSubmitButton';
import { useNoticePatch } from './hook/useNoticePatch';
import { NoticePatchImageSection } from './container/noticePatchImageSection';
import { AuditPatchFilesSection } from '@/pages/audit/auditPatch/container/auditPatchFileSection';

export default function NoticePatchPage() {
  const {
    title,
    content,
    handleTitleChange,
    handleContentChange,
    handleSubmit,
    isLoading,
    imageList,
    fileList,
    thumbnailImage,
    setThumbnailImage,
    handleFileDelete,
    setNewFiles,
  } = useNoticePatch();

  return (
    <>
      <HeadLayout title="공지사항" searchHidden={true} borderOff={true} />
      <NoticeEditTitleSection initialTitle={title} onTitleChange={handleTitleChange} />
      <NoticeEditContentSection initialValue={content} onContentChange={handleContentChange} />
      <NoticePatchImageSection
        imageList={imageList}
        thumbnailImage={thumbnailImage}
        setThumbnailImage={setThumbnailImage}
      />
      <AuditPatchFilesSection fileUrls={fileList} onFileDelete={handleFileDelete} onFilesChange={setNewFiles} />
      <NoticeEditSubmitButton onSubmit={handleSubmit} isLoading={isLoading} />
    </>
  );
}
