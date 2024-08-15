import { Header } from '@/containers/common/Header/Header';
import { PetitionNoticeHeadSection } from './containers/PetitionNoticeHeadSection';
import { PetitionNoticePopularSection } from './containers/PetitionNoticePopularSection';
import { PetitionPostSection } from './containers/PetitionPostSection';
import { State } from '@/containers/common/Header/const/state';

export function PetitionNoticePage() {
  return (
    <div>
      <Header state={State.Logout} />
      <PetitionNoticeHeadSection />
      <PetitionNoticePopularSection />
      <PetitionPostSection />
    </div>
  );
}
