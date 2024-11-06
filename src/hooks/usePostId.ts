import { useLocation } from 'react-router-dom';

export function usePostId(): number {
  const location = useLocation();
  let postId: number = location.state?.postId;

  if (!postId) {
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    postId = Number(lastSegment) || -1;
  }

  return postId;
}
