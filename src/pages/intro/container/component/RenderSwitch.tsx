import { Switch } from '@/components/Switch';
import { useSwitchHook } from '../hooks/useSwitchHook';
import { subCategory, subName } from '../const/data';
import { useAuditSwitch } from '../utils/switchUtils';

interface MainSwitchProps {
  paramName: string;
  params: string[];
  groupNames: string[];
  isAudit: boolean;
  switchIndex?: number;
}

export function RenderMainSwitch({
  paramName,
  params,
  groupNames,
  isAudit,
  switchIndex = 0,
  ...props
}: MainSwitchProps) {
  const { activeIndex, handleSwitchClick } = useSwitchHook({
    paramName: paramName,
    categories: params,
    initialIndex: switchIndex,
  });
  const handleAuditSwitchClick = useAuditSwitch();

  return (
    <div className="relative mt-[24px] px-[120px] xs:hidden sm:px-[60px]" {...props}>
      <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 transform bg-[#E7E7E7]" />
      <span className="relative z-10 inline-flex items-center rounded-lg border-2 border-[#E7E7E7] bg-white px-[4px] py-[4px]">
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
    <div className="mt-[24px] px-[120px] xs:px-[30px] sm:px-[60px]" {...props}>
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
