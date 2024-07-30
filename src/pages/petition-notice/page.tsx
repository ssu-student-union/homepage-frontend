import { Header } from "@/containers/common/Header/Header";
import { PetitionNoticeHeadSection } from "./containers/PetitionNoticeHeadSection";
import { PetitionNoticePopularSection } from "./containers/PetitionNoticePopularSection";
import { PetitionPostSection } from "./containers/PetitionPostSection";

export function PetitionNoticePage() {
  return (
    <div>
      <Header />
      <PetitionNoticeHeadSection />
      <PetitionNoticePopularSection />
      <PetitionPostSection />
    </div>
  );
}
