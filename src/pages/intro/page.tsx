import { Header } from '@/containers/common/Header/Header';
import IntroTitleSection from './container/IntroTitleSection';
import IntroNavSection from './container/IntroNavSection';
import IntroContentSection from './container/IntroContentSection';
import IntroEditButton from './container/IntroEditButton';
import { State } from '@/containers/common/Header/const/state';

export function IntroPage() {
    return (
        <>
            <Header state={State.Login} />
            <IntroTitleSection />
            <IntroNavSection />
            <IntroContentSection />
            <IntroEditButton />
        </>
    )
}
