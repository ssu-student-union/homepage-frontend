import EmailContent from '../component/emailContent';
import PersonalDataContent from '../component/personalDataContent';
import TermsOfServiceContent from '../component/termsOfServiceContent';
import { category } from '../const/data';

interface ContentSectionProps {
  categoryParam: string;
}

export default function ContentSection({ categoryParam }: ContentSectionProps) {
  return <div className="px-[200px] xs:px-10 sm:px-10 md:px-10 lg:px-10">{getContentByCategory(categoryParam)}</div>;
}

function getContentByCategory(categoryParam: string) {
  switch (categoryParam) {
    case category[0]:
      return <PersonalDataContent />;
    case category[1]:
      return <TermsOfServiceContent />;
    case category[2]:
      return <EmailContent />;
    default:
      return <p>해당하는 콘텐츠가 없습니다.</p>;
  }
}
