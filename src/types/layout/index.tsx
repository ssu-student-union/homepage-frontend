export interface HeadLayoutProps {
  title: string;
  subtitle: React.ReactNode;
}

export interface BodyLayoutProps {
  title?: string;
  selector: React.ReactNode;
  content: React.ReactNode;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onWriteClick: () => void;
}

export interface EditLayoutProps {
  children: React.ReactNode;
  title: string;
}
