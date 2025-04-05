import { Viewer } from '@toast-ui/react-editor';
import { useRef } from 'react';

interface ContentViewerProps {
  content?: string;
}

export function ContentViewer({ content }: ContentViewerProps) {
  const viewerRef = useRef<Viewer>(null);
  return <Viewer ref={viewerRef} initialValue={content} />;
}
