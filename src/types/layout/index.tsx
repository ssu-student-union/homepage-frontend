export interface HeadLayoutProps {
  title: string;
  subtitle: React.ReactNode;
  className?: string;
  borderOff?: boolean; // 감사페이지에 선이 필요 없기에 제거할 수 있게 추가했습니다.
  searchHidden?: string; // 페이지마다 search바 hidden 기준이 달라서 추가했습니다.
}

export interface BodyLayoutProps {
  title?: string;
  selector: React.ReactNode;
  content: React.ReactNode;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onWriteClick: () => void;
  className?: string;
}

export interface EditLayoutProps {
  children: React.ReactNode;
  title: string;
}
