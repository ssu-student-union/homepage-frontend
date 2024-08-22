import { PetitionNoticeHeadSection } from './containers/PetitionNoticeHeadSection';
import { PetitionNoticePopularSection } from './containers/PetitionNoticePopularSection';
import { PetitionPostSection } from './containers/PetitionPostSection';

export function PetitionNoticePage() {
  return (
    <div>
      <PetitionNoticeHeadSection />
      <PetitionNoticePopularSection />
      <PetitionPostSection />
    </div>
  );
}
