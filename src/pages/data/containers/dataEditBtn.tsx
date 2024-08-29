import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DataEditBtn({ ...props }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/homepage-frontend/data/edit');
  };

  return (
    <Button className="h-[42px] w-[123px]" variant={'Write'} {...props} onClick={handleClick}>
      <Pencil />
      <p>글쓰기</p>
    </Button>
  );
}
