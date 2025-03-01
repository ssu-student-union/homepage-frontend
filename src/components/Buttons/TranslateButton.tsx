import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

// Header에서 언어를 바꿀 수 있는 버튼입니다.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  onToggleLanguage?: () => void;
}

export function TranslateButton({ onToggleLanguage, ...props }: ButtonProps) {
  const { i18n } = useTranslation();

  const buttonText = i18n.language === 'ko' ? 'English' : '한국어';

  return (
    <Button variant={'translate'} disabled={false} onClick={onToggleLanguage} {...props}>
      <p>{buttonText}</p>
    </Button>
  );
}
