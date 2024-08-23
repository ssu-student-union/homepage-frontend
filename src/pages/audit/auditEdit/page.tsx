import { AuditEditTopSection } from './container/auditEditTopSection';
import { AuditEditTitleSection } from './container/auditEditTitleSection';
import { AuditEditContentSection } from './container/auditEditContentSection/auditEditContentSection';
import { AuditEditSubmitButton } from './container/auditEditSubmitButton';
import { AuditEditFilesSection } from './container/auditEditFilesSection';
import { AuditEditImageSection } from './container/auditEditImageSection';

export function AuditEditPage() {
  return (
    <div className="px-[120px] xs:px-[30px] sm:px-[30px] md:px-[60px] lg:px-[60px]">
      <AuditEditTopSection title="감사기구" />
      <AuditEditTitleSection />
      <AuditEditContentSection />
      <AuditEditImageSection />
      <AuditEditFilesSection />
      <AuditEditSubmitButton />
    </div>
  );
}
