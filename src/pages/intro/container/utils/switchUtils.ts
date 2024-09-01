import { useNavigate } from 'react-router-dom';

export function useAuditSwitch() {
  const navigate = useNavigate();

  const handleAuditSwitchClick = (index: number) => {
    if (index === 0) {
      navigate('/homepage-frontend/intro?category=audit&sub-category=intro');
    } else {
      navigate('/homepage-frontend/audit?category=all');
    }
  };

  return handleAuditSwitchClick;
}
