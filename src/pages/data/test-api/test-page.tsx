import useGetDataSearch from '@/pages/data/test-api/useGetDataSearch';

export default function TestPage() {
  const { data, error, isLoading } = useGetDataSearch({ take: 15 });
  if (isLoading) {
    return <></>;
  }
  if (error) {
    return <></>;
  }

  console.log(data);
  return <div></div>;
}
