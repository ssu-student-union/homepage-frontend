import { Header } from '@/containers/common/Header/Header';
import { PetitionNoticeEditorSection } from './containers/PetitionNoticeEditorSection';
import { State } from '@/containers/common/Header/const/state';

export function PetitionNoticeEditPage() {
  return (
    <div>
      <Header state={State.Login} />
      <PetitionNoticeEditorSection />
    </div>
  );
}
