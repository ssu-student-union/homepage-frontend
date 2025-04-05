import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { departments, faculties } from './index';
import { zodResolver } from '@hookform/resolvers/zod';
import { client } from '@/apis/client';
import { LoginSchemaRegister, LoginSchemaScoucil, LoginScoucilType, LoginType } from '../types/onboardingZodCheck';
import { useSetRecoilState } from 'recoil';
import { LoginState } from '@/recoil/atoms/atom';
import ChannelTalkFloating from '@/components/Floating/ChannelTalkFloating';
import { cn } from '@/libs/utils';
import { useTranslation } from 'react-i18next';

interface LoginFormProps {
  subSection1: string;
}

export function GeneralRegisterSection({ subSection1 }: LoginFormProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { sort } = useParams();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const isScouncilPath = location.pathname === '/register/scouncil';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
    watch,
    setValue,
  } = useForm<FieldValues>({
    resolver: zodResolver(isScouncilPath ? LoginSchemaScoucil : LoginSchemaRegister),
    mode: 'onChange',
    defaultValues: isScouncilPath ? ({} as LoginScoucilType) : ({} as LoginType),
  });

  const setLoginState = useSetRecoilState(LoginState);

  const [selectedFaculty, setSelectedFaculty] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [, setInputUserData] = useState(null);
  const [scoucilError, setScoucilError] = useState(false);

  const showSelects = !isScouncilPath;
  const formValues = watch();
  const formValuesScouncil = watch();

  const redirectUrl = localStorage.getItem('redirectUrl');

  useEffect(() => {
    if (sort !== 'scouncil') {
      const storedFormValues = localStorage.getItem('formValues');
      setInputUserData(storedFormValues ? JSON.parse(storedFormValues) : null);

      const kakaoData = localStorage.getItem('kakaoData');
      if (kakaoData) {
        const parsedKakaoData = JSON.parse(kakaoData);
        if (parsedKakaoData.data?.name && parsedKakaoData.data?.studentId) {
          navigate('/');
        }
      }
    }
  }, [navigate, sort]);

  useEffect(() => {
    if (!isScouncilPath) {
      localStorage.setItem('formValues', JSON.stringify(formValues));
    } else {
      localStorage.setItem('formValuesScouncil', JSON.stringify(formValuesScouncil));
    }
  }, [formValues, formValuesScouncil, isScouncilPath]);

  useEffect(() => {
    const isFormValid = Object.keys(errors).length === 0 && Object.values(formValues).every(Boolean);
    setIsButtonDisabled(!isFormValid);
  }, [errors, formValues]);

  useEffect(() => {
    const isFormValidScouncil = Object.keys(errors).length === 0 && Object.values(formValuesScouncil).every(Boolean);
    setIsButtonDisabled(!isFormValidScouncil);
  }, [errors, formValuesScouncil]);

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    if (isSubmitting || isButtonDisabled) {
      return;
    }

    setIsButtonDisabled(true);

    const targetFormValues = isScouncilPath ? formValuesScouncil : formValues;

    try {
      const UserData = localStorage.getItem('kakaoData');
      let accessToken;
      if (UserData) {
        const parsedUserData = JSON.parse(UserData);
        accessToken = parsedUserData?.data?.accessToken;
      }

      const endpoint = isScouncilPath ? '/auth/council-login' : '/onboarding/academy-information';

      // accessToken이 필요한지 여부를 isScouncilPath를 기준으로 결정
      const headers = isScouncilPath
        ? {} // ScouncilPath일 경우 Authorization 없이 요청
        : { Authorization: `Bearer ${accessToken}` }; // 그렇지 않을 경우 accessToken 사용

      // client.post 요청을 실행
      const response = await client.post(endpoint, targetFormValues, {
        headers,
      });

      if (response.status === 200) {
        if (redirectUrl !== null) {
          if (!accessToken) {
            accessToken = response.data?.data?.accessToken;
          }
          const separator = redirectUrl.includes('?') ? '&' : '?';
          const newRedirectUrl = `${redirectUrl}${separator}accessToken=${encodeURIComponent(accessToken)}`;
          localStorage.removeItem('redirectUrl');
          localStorage.removeItem('kakaoData');
          window.location.href = newRedirectUrl;
          return;
        }
        localStorage.setItem('userId', formValuesScouncil.accountId);
        localStorage.setItem('accessToken', response.data?.data?.accessToken);
        if (endpoint === '/auth/council-login') {
          localStorage.setItem('councilData', response.data);
          // groupCodeList는 배열이므로 로컬 저장시 JSON 형태로 변환
          const groupCodeList = response.data?.data?.groupCodeList;
          if (Array.isArray(groupCodeList)) {
            localStorage.setItem('groupCodeList', JSON.stringify(groupCodeList));
          } else {
            console.error('groupCodeList is not an array');
          }
          localStorage.setItem('groupCodeList', JSON.stringify(groupCodeList));
          localStorage.setItem('memberName', response.data?.data?.memberName);
          localStorage.setItem('majorName', response.data?.data?.majorName);
          localStorage.setItem('accessToken', response.data?.data?.accessToken);
        }
        navigate('/');
        setLoginState(true);
      } else {
        alert(
          isEn
            ? 'Login information does not match. Please try again.'
            : '로그인 정보가 일치하지 않습니다. 다시 시도해주세요.'
        );
        setScoucilError(true);
      }
    } catch (error) {
      setScoucilError(true);
      console.error('Error submitting form:', error);
      alert(
        isEn
          ? 'Login information does not match. Please try again.'
          : '로그인 정보가 일치하지 않습니다. 다시 시도해주세요.'
      );
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const handleCertifyError = () => {
    navigate('/register/errorapply');
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex w-full max-w-md flex-col items-center justify-center p-4">
          <div className="pb-8 text-[1.25rem] font-bold not-italic leading-[normal] text-[rgb(0,0,0)] sm:text-[1.4rem]">
            {subSection1}
          </div>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            {isScouncilPath ? (
              <>
                <Input
                  type="text"
                  placeholder={t('onboarding.아이디')}
                  className={cn(
                    'w-[250px] px-[1rem] py-0 max-sm:min-h-[36px] max-sm:rounded-xs sm:py-[0.1rem] md:w-[420px] md:px-0'
                  )}
                  {...register('accountId', {
                    required: t('onboarding.아이디는 필수 입력입니다'),
                  })}
                  aria-invalid={isSubmitted ? (errors.accountId ? 'true' : 'false') : undefined}
                />
                <div className="mt-3"></div>
                {errors.accountId && (
                  <small className="text-[13px] text-red-600">
                    {(errors.accountId as { message?: string }).message || 'Error occurred'}
                  </small>
                )}
                <Input
                  type="password"
                  placeholder={t('onboarding.비밀번호')}
                  className={cn(
                    'w-[250px] px-[1rem] py-0 max-sm:min-h-[36px] max-sm:rounded-xs sm:py-[0.1rem] md:w-[420px] md:px-0'
                  )}
                  {...register('password', {
                    required: t('onboarding.비밀번호는 필수 입력입니다'),
                  })}
                  aria-invalid={isSubmitted ? (errors.password ? 'true' : 'false') : undefined}
                />
                <div className="mt-3"></div>
                {errors.password && (
                  <small className=" text-[13px] text-red-600">
                    {' '}
                    {(errors.password as { message?: string }).message || 'Error occurred'}
                  </small>
                )}
              </>
            ) : (
              <>
                <Input
                  type="text"
                  placeholder={t('onboarding.이름')}
                  className={cn(
                    'w-[250px] px-[1rem] py-0 max-sm:min-h-[36px] max-sm:rounded-xs sm:py-[0.1rem] md:w-[420px] md:px-0'
                  )}
                  {...register('name', {
                    required: t('onboarding.이름은 필수 입력입니다'),
                  })}
                  aria-invalid={isSubmitted ? (errors.name ? 'true' : 'false') : undefined}
                />
                <div className="mt-3"></div>
                {errors.name?.message && (
                  <small className=" text-[13px] text-red-600">
                    {' '}
                    {(errors.name as { message?: string }).message || 'Error occurred'}
                  </small>
                )}
                <Input
                  type="text"
                  placeholder={t('onboarding.학번')}
                  className={cn('mt-4 h-[54px] max-md:w-full max-md:py-[0.1rem] max-sm:rounded-xs')}
                  {...register('studentId', {
                    required: t('onboarding.학번은 필수 입력입니다'),
                  })}
                  aria-invalid={isSubmitted ? (errors.studentId ? 'true' : 'false') : undefined}
                />
                <div className="mt-3"></div>
                {errors.studentId?.message && (
                  <small className=" text-[13px] text-red-600">
                    {' '}
                    {(errors.studentId as { message?: string }).message || 'Error occurred'}
                  </small>
                )}
              </>
            )}

            {showSelects && (
              <>
                <div className="mt-4"></div>
                <Select
                  {...register('memberCode', {
                    required: t('onboarding.옵션을 선택해 주세요'),
                  })}
                  onValueChange={(value) => {
                    setValue('memberCode', value);
                    setSelectedFaculty(value);
                  }}
                  value={formValues.memberCode || ''}
                >
                  <SelectTrigger
                    className={cn(
                      `min-h-[46px] w-full rounded-xs border-gray-500 px-[20px] py-[26px] text-sm font-medium ${
                        formValues.memberCode ? 'font-semibold text-black' : 'text-[#9CA3AF]'
                      }`
                    )}
                  >
                    <SelectValue placeholder={t('onboarding.단과대 선택')} />
                  </SelectTrigger>
                  <SelectContent className={cn('z-20 max-h-48')}>
                    {faculties.map((faculty) => (
                      <SelectItem className={cn('py-3')} key={faculty} value={faculty}>
                        {t(`faculties.${faculty}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="mt-4"></div>
                <Select
                  {...register('majorCode', {
                    required: t('onboarding.학과/부를 선택해 주세요'),
                  })}
                  onValueChange={(value) => {
                    setValue('majorCode', value);
                  }}
                  value={formValues.majorCode || ''}
                  disabled={!selectedFaculty}
                >
                  <SelectTrigger
                    className={`min-h-[46px] w-full rounded-xs border-gray-500 px-[20px] py-[26px] text-sm font-medium`}
                  >
                    <SelectValue placeholder={t('onboarding.학과/부 선택')} />
                  </SelectTrigger>
                  <SelectContent className={cn('z-20 max-h-48')}>
                    {(departments[selectedFaculty] || []).map((department) => (
                      <SelectItem className={cn('py-3')} key={department} value={department}>
                        {t(`departments.${department}`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}

            {scoucilError && (
              <>
                <div className="mt-[10px] text-xs font-medium text-red-600">
                  {t('onboarding.입력하신 정보가 올바르지 않습니다')}
                </div>
              </>
            )}
            <Button
              type="submit"
              disabled={isSubmitting || isButtonDisabled}
              variant="default"
              size="default"
              className={`mt-4 w-[250px] py-0 max-md:px-4 max-md:py-[0.1rem] max-sm:min-h-[36px] max-sm:rounded-xs md:w-[420px] ${isSubmitting || isButtonDisabled ? 'bg-gray-400' : ''}`}
            >
              {t('onboarding.입력 완료')}
            </Button>
          </form>

          {!isScouncilPath && (
            <button onClick={handleCertifyError} className="mt-[117px] text-lg font-normal text-gray-500">
              {t('onboarding.학생인증이 안 되시나요?')}
            </button>
          )}
        </div>
      </div>
      <ChannelTalkFloating className="fixed bottom-10 right-10 z-50" />
    </>
  );
}
