import { Header, State } from "@/containers/common/Header/Header";
import IntroTitleSection from "./container/IntroTitleSection";
import IntroNavSection from "./container/IntroNavSection";
import IntroContentSection from "./container/IntroContentSection";
import IntroEditButton from "./container/IntroEditButton";

export function IntroPage() {
  return (
    <>
      <Header state={State.Logout} />
      <IntroTitleSection />
      <IntroNavSection />
      <IntroContentSection />
      <IntroEditButton />
    </>
  );
}
