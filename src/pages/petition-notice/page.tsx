import { PetitionNoticePopularSection } from './containers/PopularSection/PetitionNoticePopularSection';
import { PetitionPostSection } from './containers/PostSection/PetitionPostSection';

export function PetitionNoticePage() {
  return (
    <div>
      <PetitionNoticePopularSection />
      <PetitionPostSection />
    </div>
  );
}
