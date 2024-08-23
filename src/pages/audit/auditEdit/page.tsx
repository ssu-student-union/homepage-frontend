import { useState } from 'react';
import { AuditEditFilesSection } from './container/auditEditFilesSection';
import { AuditEditImageSection } from './container/auditEditImageSection';
import { AuditEditTitleSection } from './container/auditEditTitleSection';
import { AuditEditContentSection } from './container/auditEditContentSection';
import { AuditEditSubmitButton } from './container/auditEditSubmitButton';
import { HeadLayout } from '@/template/HeadLayout';
import { usePostBoardFiles } from '@/hooks/usePostBoardFiles';
import { usePostBoardPosts } from '@/hooks/usePostBoardPosts';
import { useNavigate } from 'react-router-dom';

export function AuditEditPage() {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const { mutateAsync: uploadFiles } = usePostBoardFiles();
  const { mutateAsync: createPost } = usePostBoardPosts();

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSubmit = async () => {
    try {
      const uploadResponse = await uploadFiles({
        boardCode: '감사기구게시판',
        files,
        images,
      });

      const uploadedFiles = uploadResponse.data.data;

      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];

      const thumbnailImage =
        uploadedFiles
          .filter((file) => imageExtensions.some((ext) => file.url.toLowerCase().endsWith(ext)))
          .map((file) => file.url)[0] || null;

      const postFileList = uploadedFiles.map((file) => file.id);

      await createPost({
        boardCode: '감사기구게시판',
        post: {
          title,
          content,
          categoryCode: category,
          thumbNailImage: thumbnailImage,
          isNotice: false,
          postFileList,
        },
      });

      navigate(-1);
      console.log('게시물 작성이 완료되었습니다.');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <HeadLayout title="감사기구" searchHidden={true} borderOff={true} />
      <AuditEditTitleSection onTitleChange={handleTitleChange} onCategoryChange={handleCategoryChange} />
      <AuditEditContentSection onContentChange={handleContentChange} /> {/* Content 상태 전달 */}
      <AuditEditFilesSection onFilesChange={setFiles} />
      <AuditEditImageSection onImagesChange={setImages} />
      <AuditEditSubmitButton onSubmit={handleSubmit} />
    </>
  );
}
