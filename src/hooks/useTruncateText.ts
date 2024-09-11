import { useState, useEffect } from 'react';

const useTruncateText = (text: string, maxLength: number): string => {
  const [truncatedText, setTruncatedText] = useState(text);

  useEffect(() => {
    if (text.length <= maxLength) {
      setTruncatedText(text);
    } else {
      setTruncatedText(text.slice(0, maxLength).trim() + '...');
    }
  }, [text, maxLength]);

  return truncatedText;
};

export default useTruncateText;
