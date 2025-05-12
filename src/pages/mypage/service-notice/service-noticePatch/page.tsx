import { HeadLayout } from '@/template/HeadLayout';
import { AuditPatchFilesSection } from '@/pages/audit/patch/container/auditPatchFileSection';
import { NoticeEditTitleSection } from '@/pages/notice/noticeEdit/container/noticeEditTitleSection';
import { NoticeEditContentSection } from '@/pages/notice/noticeEdit/container/noticeEditContentSection';
import { NoticePatchImageSection } from '@/pages/notice/noticePatch/container/noticePatchImageSection';
import { NoticeEditSubmitButton } from '@/pages/notice/noticeEdit/container/noticeEditSubmitButton';
import { useNoticePatch } from '@/pages/notice/noticePatch/hook/useNoticePatch';
import { useParams } from 'react-router';

export default function ServiceNoticePatchPage() {
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
  } = useNoticePatch({ boardCode: '서비스공지사항', postId: postId });

  return (
    <>
      <HeadLayout title="서비스 공지사항" searchHidden={true} borderOff={true} />
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
