export interface QnaPostForm {
  title: string;
  content: string;
  category: string;
  isNotice: boolean;
  postFileList: number[];
  qnaMemberCode: string;
  qnaMajorCode: string;
}
