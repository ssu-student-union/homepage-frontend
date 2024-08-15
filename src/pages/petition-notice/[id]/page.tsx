import { Header } from '@/containers/common/Header/Header';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { State } from '@/containers/common/Header/const/state';
import { PostPetitionDetailPostSection } from './containers/PostPetitionDetailPostSection';
import { PostPetitionDetailCommentSection } from './containers/PostPetitionDetailCommentSection';

export function PetitionNoticeDetailPage() {
  return (
    <div>
      <Header state={State.Login} />
      <PostPetitionDetailPostSection />
      <PostPetitionDetailCommentSection />
    </div>
  );
}
