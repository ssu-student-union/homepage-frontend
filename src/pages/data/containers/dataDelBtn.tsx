import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DataDelBtn({ ...props }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/homepage-frontend/data');
  };

  return (
    <Button
      className="mt-[60px] px-9 py-2 xs:mt-3 xs:h-[32px] xs:w-[186px] xs:bg-[#9CA3AF] xs:text-white  sm:mt-3 sm:h-[44px] sm:w-[315px] sm:bg-[#9CA3AF] sm:text-white md:h-[46px] md:w-[123px] lg:h-[46px] lg:w-[123px] xl:h-[46px] xl:w-[123px] xxl:h-[46px] xxl:w-[123px]"
      variant={'Write'}
      {...props}
      onClick={handleClick}
    >
      <div className="mr-2 hidden md:block lg:block xl:block xxl:block">
        <Trash2 />
      </div>

      <p className="sm: text-sm xs:text-sm">삭제</p>
    </Button>
  );
}
