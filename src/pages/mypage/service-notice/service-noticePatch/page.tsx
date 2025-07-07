import { HeadLayout } from '@/template/HeadLayout';
import { AuditPatchFilesSection } from '@/pages/audit/patch/container/auditPatchFileSection';
import { NoticeEditTitleSection } from '@/pages/notice/edit/container/noticeEditTitleSection';
import { NoticeEditContentSection } from '@/pages/notice/edit/container/noticeEditContentSection';
import { NoticePatchImageSection } from '@/pages/notice/patch/container/noticePatchImageSection';
import { NoticeEditSubmitButton } from '@/pages/notice/edit/container/noticeEditSubmitButton';
import { useNoticePatch } from '@/pages/notice/patch/hook/useNoticePatch';
import { useLocation, useParams } from 'react-router';
import { dataType } from '@/pages/notice/[id]/utils/locationHandler';

export default function ServiceNoticePatchPage() {
  const { id } = useParams();
  const postId = Number(id);
  const location = useLocation() as { state: dataType };
  const postDetail = location.state?.data?.postDetail;
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
  } = useNoticePatch({ boardCode: '서비스공지사항', postId: postId, postDetail });

  console.log(postDetail);

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
