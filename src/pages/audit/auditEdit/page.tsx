import { State } from '@/containers/common/Header/const/state';
import { Header } from '@/containers/common/Header/Header';
import { AuditEditTopSection } from './container/auditEditTopSection';
import { AuditEditTitleSection } from './container/auditEditTitleSection';
import { AuditEditContentSection } from './container/auditEditContentSection/auditEditContentSection';
import { AuditEditSubmitButton } from './container/auditEditSubmitButton';
import { AuditEditFilesSection } from './container/auditEditFilesSection';

export function AuditEditPage() {
  return (
    <div className="px-[120px] xs:px-[30px] sm:px-[30px] md:px-[60px] lg:px-[60px]">
      <Header state={State.Logout} />
      <AuditEditTopSection title="감사기구" />
      <AuditEditTitleSection />
      <AuditEditContentSection />
      <AuditEditFilesSection />
      <AuditEditSubmitButton />
    </div>
  );
}
