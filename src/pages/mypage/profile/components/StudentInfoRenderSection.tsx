import { GetUserProfileResponse } from '@/types/apis/get';
import { useTranslation } from 'react-i18next';
interface StudentInfoRenderSectionProps {
  userData: GetUserProfileResponse;
}

export default function StudentInfoRenderSection({ userData }: StudentInfoRenderSectionProps) {
  const { t } = useTranslation();
  return (
    <div className="mx-[22%] flex flex-col items-start md:mx-16">
      <h3 className="text-lg font-bold sm:text-base">{t('mypage.기본정보')}</h3>
      <div className="mb-14 grid grid-cols-[2fr_5fr] gap-x-6 gap-y-3 py-6 text-xs md:ml-6 md:text-sm lg:grid-cols-[1fr_5fr]">
        <span className="font-semibold">{t('mypage.이름')}</span>
        <span>{userData?.name}</span>
        <span className="font-semibold">{t('mypage.학번')}</span>
        <span>{userData?.studentId}</span>
      </div>
      <h3 className="text-lg font-bold sm:text-base">{t('mypage.학적정보 - 주전공')}</h3>
      <div className="mb-14 grid grid-cols-[2fr_5fr] gap-x-6 gap-y-3 py-6 text-xs md:ml-6 md:text-sm lg:grid-cols-[1fr_5fr]">
        <span className="font-semibold">{t('mypage.단과대학')}</span>
        <span>{userData?.memberCode}</span>

        <span className="font-semibold">{t('mypage.학과/부')}</span>
        <span>{userData?.majorCode}</span>
      </div>
    </div>
  );
}
