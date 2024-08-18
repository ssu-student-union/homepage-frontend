import { Switch } from '@/components/Switch';
import { useSwitchHook } from '../hooks/useSwitchHook';
import { subCategory, subName } from '../const/data';
import { useAuditSwitch } from '../utils/switchUtils';
import { cn } from '@/libs/utils';

interface MainSwitchProps {
  paramName: string;
  params: string[];
  groupNames: string[];
  isAudit: boolean;
  switchIndex?: number;
  className?: string;
}

export function RenderMainSwitch({
  paramName,
  params,
  groupNames,
  isAudit,
  switchIndex = 0,
  className = '',
  ...props
}: MainSwitchProps) {
  const { activeIndex, handleSwitchClick } = useSwitchHook({
    paramName: paramName,
    categories: params,
    initialIndex: switchIndex,
  });
  const handleAuditSwitchClick = useAuditSwitch();

  return (
    <div className="relative mt-[24px] xs:hidden" {...props}>
      <div className={cn(`absolute top-1/2 h-[2px] w-full -translate-y-1/2 transform bg-[#E7E7E7]`)} />
      <span
        className={cn(
          `relative z-10 ml-[120px] inline-flex items-center rounded-lg border-2 border-[#E7E7E7] bg-white px-[4px] py-[4px] xs:ml-[30px] sm:ml-[30px] md:ml-[60px]`,
          className
        )}
      >
        {groupNames.map((label, index) => (
          <Switch
            key={index}
            isActive={activeIndex === index}
            onClick={() => {
              if (isAudit) {
                handleAuditSwitchClick(index);
              } else {
                handleSwitchClick(index);
              }
            }}
            className={`text-semibold rounded-xs px-[16px] py-[2px] ${activeIndex === index ? 'text-white' : 'text-black'}`}
          >
            {label}
          </Switch>
        ))}
      </span>
    </div>
  );
}

export function RenderSubSwitch({ ...props }) {
  const { activeIndex, handleSwitchClick } = useSwitchHook({
    paramName: 'sub-category',
    categories: subCategory,
  });

  return (
    <div className="mt-[24px] pl-[120px] xs:pl-[30px] sm:pl-[30px] md:pl-[60px]" {...props}>
      {subName.map((label, index) => (
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
