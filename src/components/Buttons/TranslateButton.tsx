import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  onToggleLanguage?: () => void;
}

export function TranslateButton({ onToggleLanguage, ...props }: ButtonProps) {
  const { i18n } = useTranslation();

  const buttonText = i18n.language === 'ko' ? 'EN' : '한국어';

  return (
    <Button variant={'ghost'} disabled={false} onClick={onToggleLanguage} {...props}>
      <Globe className="mr-2 size-4" />
      {buttonText}
    </Button>
  );
}
