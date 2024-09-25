import { useState, useEffect } from 'react';

const useTruncateText = (text: string | undefined | null, maxLength: number): string => {
  const [truncatedText, setTruncatedText] = useState('');

  useEffect(() => {
    if (!text) {
      setTruncatedText('');
    } else if (text.length <= maxLength) {
      setTruncatedText(text);
    } else {
      setTruncatedText(text.slice(0, maxLength).trim() + '...');
    }
  }, [text, maxLength]);

  return truncatedText;
};

export default useTruncateText;
