interface RenderIntroProps {
  category: string;
}

export function RenderIntro({ category }: RenderIntroProps) {
  switch (category) {
    case 'president':
      return <img src="https://picsum.photos/id/221/1800/1200" className="h-auto w-full" />;
    case 'central_executive_committee':
      return <img src="https://picsum.photos/id/222/1800/1200" className="h-auto w-full" />;
    case 'central_operating_committee':
      return <img src="https://picsum.photos/id/223/1800/1200" className="h-auto w-full" />;
    case 'audit':
      return <img src="https://picsum.photos/id/260/1800/1200" className="h-auto w-full" />;
    default:
      return '쿼리가 잘못되었습니다.';
  }
}

interface RenderOrgProps {
  category: string;
}

export function RenderOrg({ category }: RenderOrgProps) {
  switch (category) {
    case 'president':
      return <img src="https://picsum.photos/id/228/1800/1200" className="h-auto w-full" />;
    case 'central_executive_committee':
      return <img src="https://picsum.photos/id/225/1800/1200" className="h-auto w-full" />;
    case 'central_operating_committee':
      return <img src="https://picsum.photos/id/230/1800/1200" className="h-auto w-full" />;
    case 'audit':
      return <img src="https://picsum.photos/id/264/1800/1200" className="h-auto w-full" />;
    default:
      return '쿼리가 잘못되었습니다.';
  }
}
