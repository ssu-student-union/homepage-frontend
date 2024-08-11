import { EditButton } from '@/components/Buttons/BoardActionButtons';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function IntroEditButton() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleEditClick = () => {
    navigate(`/intro/edit?${searchParams.toString()}`);
  };

  return (
    <div className="flex w-full items-center justify-end px-[120px] pt-[120px] xs:px-[30px] xs:pt-[5px] sm:px-[60px] sm:pt-[40px] md:pt-[60px] lg:pt-[60px]">
      <EditButton className="w-[110px] rounded-xs" onClick={handleEditClick} />
    </div>
  );
}
