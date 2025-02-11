import { HeadLayout } from '@/template/HeadLayout';
import { NoticeEditTitleSection } from '../noticeEdit/container/noticeEditTitleSection';
import { NoticeEditContentSection } from '../noticeEdit/container/noticeEditContentSection';
import { NoticeEditSubmitButton } from '../noticeEdit/container/noticeEditSubmitButton';
import { useNoticePatch } from './hook/useNoticePatch';
import { NoticePatchImageSection } from './container/noticePatchImageSection';
import { AuditPatchFilesSection } from '@/pages/audit/auditPatch/container/auditPatchFileSection';
import { useParams } from 'react-router-dom';

export default function NoticePatchPage() {
  const { id } = useParams();
  const postId = Number(id);
  const {
    title,
    content,
    handleTitleChange,
    handleContentChange,
    handleUrgentChange,
    handleSubmit,
    isPending,
    imageList,
    fileList,
    fileNames,
    thumbnailImage,
    setThumbnailImage,
    handleFileDelete,
    setNewFiles,
    isUrgent,
  } = useNoticePatch({ boardCode: '공지사항게시판', postId });

  return (
    <>
      <HeadLayout title="공지사항" searchHidden={true} borderOff={true} />
      <NoticeEditTitleSection
        initialTitle={title}
        state={isUrgent}
        onTitleChange={handleTitleChange}
        onUrgentChange={handleUrgentChange}
      />
      <NoticeEditContentSection initialValue={content} onContentChange={handleContentChange} />
      <NoticePatchImageSection
        imageList={imageList}
        thumbnailImage={thumbnailImage}
        setThumbnailImage={setThumbnailImage}
      />
      <AuditPatchFilesSection
        fileUrls={fileList}
        fileNames={fileNames}
        onFileDelete={handleFileDelete}
        onFilesChange={setNewFiles}
      />
      <NoticeEditSubmitButton onSubmit={handleSubmit} isLoading={isPending} />
    </>
  );
}
