import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { cn } from '@/libs/utils';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchemaRegister, LoginType } from '../types/onboardingZodCheck';
import { FieldValues } from 'react-hook-form';
import { useSetAtom } from 'jotai';
import { LoginState } from '@/atoms/atom';
import { useState, useEffect } from 'react';
import { client } from '@/apis/client';
import { faculties, departments } from './index';
import { SubmitHandler } from 'react-hook-form';
import { moveToPASSU } from '@/pages/kakao/containers/utils/moveToPASSU';
export function OnboardingSection() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
    watch,
    setValue,
  } = useForm<FieldValues>({
    resolver: zodResolver(LoginSchemaRegister),
    mode: 'onChange',
    defaultValues: {} as LoginType,
  });

  const setLoginState = useSetAtom(LoginState);

  const [selectedFaculty, setSelectedFaculty] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [ScouncilError, setScouncilError] = useState(false);

  const formValues = watch();

  const redirectUrl = localStorage.getItem('redirectUrl');

  // 카카오 로그인 시 response 객체에 name과 studentId가 있다면
  // 그건 애초에 isFirst === true한 유저가 아니니 이전에 메인으로 갔을 것이기에
  // 이 부분 논의 후 수정할 필요 있음
  useEffect(() => {
    const kakaoData = localStorage.getItem('kakaoData');
    if (kakaoData) {
      const parsedKakaoData = JSON.parse(kakaoData);
      if (parsedKakaoData.data?.name && parsedKakaoData.data?.studentId) {
        navigate('/');
      }
    }
  }, [navigate]);

  useEffect(() => {
    const isFormValid = Object.keys(errors).length === 0 && Object.values(formValues).every(Boolean);
    setIsButtonDisabled(!isFormValid);
  }, [errors, formValues]);

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    if (isSubmitting || isButtonDisabled) {
      return;
    }

    try {
      const UserData = localStorage.getItem('kakaoData');
      let accessToken;
      if (UserData) {
        const parsedUserData = JSON.parse(UserData);
        accessToken = parsedUserData?.data?.accessToken;
      }
      // client.post 요청을 실행
      const response = await client.post('/onboarding/academy-information', formValues, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (response.status === 200) {
        if (redirectUrl !== null) {
          if (!accessToken) {
            accessToken = response.data?.data?.accessToken;
          }
          moveToPASSU(redirectUrl, accessToken);
        }
        localStorage.setItem('accessToken', response.data?.data?.accessToken);
        navigate('/');
        setLoginState(true);
      } else {
        alert(
          isEn
            ? 'Login information does not match. Please try again.'
            : '로그인 정보가 일치하지 않습니다. 다시 시도해주세요.'
        );
        setScouncilError(true);
      }
    } catch (error) {
      setScouncilError(true);
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
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-md flex-col items-center justify-center p-4">
        <div className="pb-8 text-[1.25rem] font-bold not-italic leading-[normal] text-[rgb(0,0,0)] sm:text-[1.4rem]">
          {t('onboarding.학생 정보 입력')}
        </div>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder={t('onboarding.이름')}
            className={cn('w-[250px] max-sm:min-h-9 max-sm:rounded-xs md:w-[420px]')}
            {...register('name', {
              required: t('onboarding.이름은 필수 입력입니다'),
            })}
            aria-invalid={isSubmitted ? (errors.name ? 'true' : 'false') : undefined}
          />
          <div className="mt-3"></div>
          {errors.name?.message && (
            <small className="text-[13px] text-red-600">{t(errors.name?.message as string)}</small>
          )}
          <Input
            type="text"
            placeholder={t('onboarding.학번')}
            className={cn('h-13 mt-4 max-md:w-full max-sm:rounded-xs')}
            {...register('studentId', {
              required: t('onboarding.학번은 필수 입력입니다'),
            })}
            aria-invalid={isSubmitted ? (errors.studentId ? 'true' : 'false') : undefined}
          />
          <div className="mt-3"></div>
          {errors.studentId?.message && (
            <small className="text-[13px] text-red-600">{t(errors.studentId?.message as string)}</small>
          )}
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
          {ScouncilError && (
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
        <button onClick={handleCertifyError} className="mt-[117px] text-lg font-normal text-gray-500">
          {t('onboarding.학생인증이 안 되시나요?')}
        </button>
      </div>
    </div>
  );
}
