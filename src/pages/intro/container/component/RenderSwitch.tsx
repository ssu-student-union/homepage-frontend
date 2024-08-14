import { Switch } from '@/components/Switch';
import { category, mainName, subCategory, subName } from '../const/data';
import { useSwitchHook } from '../hooks/useSwitchHook';

export function RenderMainSwitch({ ...props }) {
  const { activeIndex, handleSwitchClick } = useSwitchHook({
    paramName: 'category',
    categories: category,
  });

  return (
    <div className="relative px-[120px] xs:hidden sm:hidden sm:px-[60px]" {...props}>
      <div className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 transform bg-[#E7E7E7]" />
      <span className="relative z-10 rounded-lg border-2 border-[#E7E7E7] bg-white px-[4px] py-[10px]">
        {mainName.map((label, index) => (
          <Switch
            key={index}
            isActive={activeIndex === index}
            onClick={() => handleSwitchClick(index)}
            style={{
              paddingTop: '2px',
              paddingBottom: '2px',
              paddingLeft: '16px',
              paddingRight: '16px',
              borderRadius: '8px',
            }}
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
    <div className="px-[120px] xs:px-[30px] sm:px-[60px]" {...props}>
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
