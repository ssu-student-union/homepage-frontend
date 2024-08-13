export function calculateTotalPages(totalItems: number, itemsPerPage: number): number {
  return Math.ceil(totalItems / itemsPerPage);
}

export function getCurrentPosts(posts: any[], currentPage: number, itemsPerPage: number) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return posts.slice(startIndex, endIndex);
}
