import { useNavigate } from 'react-router-dom';

export function useNoticeSwitch() {
  const navigate = useNavigate();

  const handleNoticeSwitchClick = (index: number) => {
    if (index === 0) {
      navigate('/notice');
    } else {
      navigate('/notice?category=all');
    }
  };

  return handleNoticeSwitchClick;
}
