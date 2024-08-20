import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DataEditBtn({ ...props }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/data/edit');
  };

  return (
    <Button variant={'Write'} {...props} onClick={handleClick}>
      <Pencil />
      <p>글쓰기</p>
    </Button>
  );
}
