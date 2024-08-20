import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { PostPetitionDetailPostSection } from './containers/PostPetitionDetailPostSection';
import { PostPetitionDetailCommentSection } from './containers/PostPetitionDetailCommentSection';

export function PetitionNoticeDetailPage() {
  return (
    <div>
      <PostPetitionDetailPostSection />
      <PostPetitionDetailCommentSection />
    </div>
  );
}
