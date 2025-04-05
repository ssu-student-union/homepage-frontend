import { EditButton } from '@/components/Buttons/BoardActionButtons';
import { useNavigate, useSearchParams } from 'react-router';

export default function IntroEditButton() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleEditClick = () => {
    navigate(`/intro/edit?${searchParams.toString()}`);
  };

  return (
    <div className="flex w-full items-center justify-end px-[30px] py-[60px] pb-[120px] max-md:pt-0 sm:pb-[80px] md:px-[60px] lg:px-[200px]">
      <EditButton className="w-[100px] rounded-xs" onClick={handleEditClick} />
    </div>
  );
}
