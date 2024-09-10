import { category } from '../const/data';

interface ContentSectionProps {
  categoryParam: string;
}

export default function ContentSection({ categoryParam }: ContentSectionProps) {
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

function PersonalDataContent() {
  return <div>개인정보처리방침 내용</div>;
}

function TermsOfServiceContent() {
  return <div>이용약관 내용</div>;
}

function EmailContent() {
  return <div>이메일 무단 수집 거부 내용</div>;
}
