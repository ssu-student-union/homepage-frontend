import { useState, useEffect } from 'react';

export function useVeritasDay(targetDate: string) {
  const [daysLeft, setDaysLeft] = useState<number>(0);

  useEffect(() => {
    const calculateDaysLeft = () => {
      const today = new Date();
      const koreaTime = new Date(today.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
      const target = new Date(targetDate);
      const diffTime = target.getTime() - koreaTime.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      setDaysLeft(diffDays);
    };

    calculateDaysLeft();
  }, [targetDate]);

  return daysLeft;
}
