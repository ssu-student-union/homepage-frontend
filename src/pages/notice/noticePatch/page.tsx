import { HeadLayout } from '@/template/HeadLayout';
import { NoticeEditTitleSection } from '../noticeEdit/container/noticeEditTitleSection';
import { NoticeEditContentSection } from '../noticeEdit/container/noticeEditContentSection';
import { NoticeEditSubmitButton } from '../noticeEdit/container/noticeEditSubmitButton';
import { useNoticePatch } from './hook/useNoticePatch';
import { NoticePatchImageSection } from './container/noticePatchImageSection';

export default function NoticePatchPage() {
  const {
    title,
    content,
    handleTitleChange,
    handleContentChange,
    handleSubmit,
    handleUrgentChange,
    isLoading,
    imageList,
    thumbnailImage,
    setThumbnailImage,
  } = useNoticePatch();

  return (
    <>
      <HeadLayout title="감사기구" searchHidden={true} borderOff={true} />
      <NoticeEditTitleSection
        initialTitle={title}
        onTitleChange={handleTitleChange}
        onUrgentChange={handleUrgentChange}
      />
      <NoticeEditContentSection initialValue={content} onContentChange={handleContentChange} />
      <NoticePatchImageSection
        imageList={imageList}
        thumbnailImage={thumbnailImage}
        setThumbnailImage={setThumbnailImage}
      />
      <NoticeEditSubmitButton onSubmit={handleSubmit} isLoading={isLoading} />
    </>
  );
}
