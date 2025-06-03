import { HeadLayout } from '@/template/HeadLayout';
import { NoticeEditTitleSection } from '../edit/container/noticeEditTitleSection';
import { NoticeEditContentSection } from '../edit/container/noticeEditContentSection';
import { NoticeEditSubmitButton } from '../edit/container/noticeEditSubmitButton';
import { useNoticePatch } from './hook/useNoticePatch';
import { NoticePatchImageSection } from './container/noticePatchImageSection';
import { AuditPatchFilesSection } from '@/pages/audit/patch/container/auditPatchFileSection';
import { useParams } from 'react-router';

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
    setIsUrgent,
  } = useNoticePatch({ boardCode: '공지사항게시판', postId });

  return (
    <>
      <HeadLayout title="공지사항" searchHidden={true} borderOff={true} />
      <NoticeEditTitleSection
        initialTitle={title}
        isUrgent={isUrgent}
        setIsUrgent={setIsUrgent}
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
