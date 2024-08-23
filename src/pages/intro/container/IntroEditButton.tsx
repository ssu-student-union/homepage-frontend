import { EditButton } from '@/components/Buttons/BoardActionButtons';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function IntroEditButton() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleEditClick = () => {
    navigate(`/intro/edit?${searchParams.toString()}`);
  };

  return (
    <div className="flex w-full items-center justify-end px-[200px] py-[60px] xs:px-[30px] xs:pb-[120px] xs:pt-[0px] sm:px-[30px] sm:pb-[80px] sm:pt-[0px] md:px-[60px]">
      <EditButton className="w-[100px] rounded-xs" onClick={handleEditClick} />
    </div>
  );
}
