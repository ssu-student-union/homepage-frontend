import { Switch } from '@/components/Switch';
import { useSwitchHook } from '@/pages/intro/container/hooks/useSwitchHook';

interface AuditSelectorProps {
  paramName: string;
  categories: string[];
  labels: string[];
}

export function AuditSelector({ paramName, categories, labels, ...props }: AuditSelectorProps) {
  const { activeIndex, handleSwitchClick } = useSwitchHook({
    paramName: paramName,
    categories: categories,
  });

  return (
    <div {...props}>
      {labels.map((label, index) => (
        <Switch
          key={index}
          isActive={activeIndex === index}
          onClick={() => handleSwitchClick(index)}
          style={{
            paddingTop: '3px',
            paddingBottom: '3px',
            paddingLeft: '16px',
            paddingRight: '16px',
            marginRight: '6px',
            borderRadius: '20px',
            borderColor: activeIndex === index ? '#2F4BF7' : 'black',
            borderWidth: '2px',
          }}
        >
          {label}
        </Switch>
      ))}
    </div>
  );
}
