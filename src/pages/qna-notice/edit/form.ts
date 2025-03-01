import { useForm } from 'react-hook-form';
import { QnaPostForm } from './types';

const defaultValues: QnaPostForm = {
  title: '',
  content: '',
  category: '답변대기',
  isNotice: false,
  postFileList: [],
  qnaMemberCode: '',
  qnaMajorCode: '',
};

export function useQnaForm() {
  const form = useForm<QnaPostForm>({
    defaultValues,
  });

  return {
    ...form,
  };
}
