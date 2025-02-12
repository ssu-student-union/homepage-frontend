import useGetDataDetail from '@/pages/data/test-api/useGetDataDetail';

export default function TestPage() {
  const { data, error, isLoading } = useGetDataDetail({ postId: 134 });
  if (isLoading) {
    return <></>;
  }
  if (error) {
    return <></>;
  }

  console.log(data);
  return <div></div>;
}
