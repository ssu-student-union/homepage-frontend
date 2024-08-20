import { RenderMainSwitch, RenderSubSwitch } from './component/RenderSwitch';
import { auditSubCategory, mainName } from './const/data';
import { category as params } from './const/data';

interface IntroNavProps {
  category?: string;
  switchIndex?: number; // switchIndex를 optional로 받음
  mainClassName?: string;
}

export default function IntroNavSection({ category, switchIndex = 0, mainClassName = '' }: IntroNavProps) {
  return (
    <div className="flex h-auto w-full flex-col justify-start">
      {category != params[3] && (
        <RenderMainSwitch
          paramName="category"
          params={params}
          groupNames={mainName}
          isAudit={false}
          switchIndex={switchIndex}
          className={mainClassName}
        />
      )}
      {category != params[3] && <RenderSubSwitch />}
      {category == params[3] && (
        <RenderMainSwitch
          paramName="sub-category"
          params={auditSubCategory}
          groupNames={['소개', '게시판']}
          isAudit={true}
          switchIndex={switchIndex}
          className={mainClassName}
        />
      )}
    </div>
  );
}
