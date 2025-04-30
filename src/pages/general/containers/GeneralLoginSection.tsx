import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { client } from '@/apis/client';
import { LoginSchemaScouncil, LoginScouncilType } from '../types/onboardingZodCheck';
import { LoginState } from '@/atoms/atom';
import ChannelTalkFloating from '@/components/deprecated/Floating/ChannelTalkFloating';
import { cn } from '@/libs/utils';
import { useTranslation } from 'react-i18next';
import { useSetAtom } from 'jotai';

export function GeneralLoginSection() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
    watch,
  } = useForm<FieldValues>({
    resolver: zodResolver(LoginSchemaScouncil),
    mode: 'onChange',
    defaultValues: {} as LoginScouncilType,
  });

  const setLoginState = useSetAtom(LoginState);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [ScouncilError, setScouncilError] = useState(false);

  const formValues = watch();

  // const redirectUrl = localStorage.getItem('redirectUrl');

  useEffect(() => {
    const isFormValid = Object.keys(errors).length === 0 && Object.values(formValues).every(Boolean);
    setIsButtonDisabled(!isFormValid);
  }, [errors, formValues]);

  const setDataInLocalStorage = (data: {
    data: { groupCodeList: string[]; memberName: string; majorName: string };
  }) => {
    localStorage.setItem('groupCodeList', JSON.stringify(data?.data?.groupCodeList));
    localStorage.setItem('memberName', data?.data?.memberName);
    localStorage.setItem('majorName', data?.data?.majorName);
  };

  const onSubmit: SubmitHandler<FieldValues> = async () => {
    if (isSubmitting || isButtonDisabled) {
      return;
    }

    try {
      // client.post 요청을 실행
      const response = await client.post('/auth/council-login', formValues);
      if (response.status === 200) {
        // passu에서 자치기구 로그인 해야한다고 하면 주석 해제 아니면 주석 삭제
        // if (redirectUrl !== null) {
        //   const separator = redirectUrl.includes('?') ? '&' : '?';
        //   const newRedirectUrl = `${redirectUrl}${separator}accessToken=${encodeURIComponent(accessToken)}`;
        //   localStorage.removeItem('redirectUrl');
        //   localStorage.removeItem('kakaoData');
        //   window.location.href = newRedirectUrl;
        //   return;
        // }
        localStorage.setItem('accessToken', response.data?.data?.accessToken);
        setDataInLocalStorage(response.data);
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

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex w-full max-w-md flex-col items-center justify-center p-4">
          <div className="pb-8 text-[1.25rem] font-bold not-italic leading-[normal] text-[rgb(0,0,0)] sm:text-[1.4rem]">
            {t('onboarding.학생자치기구 로그인')}
          </div>
          <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              placeholder={t('onboarding.아이디')}
              className={cn('w-[250px] max-sm:min-h-9 max-sm:rounded-xs md:w-[420px]')}
              {...register('accountId', {
                required: t('onboarding.아이디는 필수 입력입니다'),
              })}
              aria-invalid={isSubmitted ? (errors.accountId ? 'true' : 'false') : undefined}
            />
            <div className="mt-3"></div>
            {errors.accountId && (
              <small className="text-[13px] text-red-600">{t(errors.accountId?.message as string)}</small>
            )}
            <Input
              type="password"
              placeholder={t('onboarding.비밀번호')}
              className={cn('w-[250px] max-sm:min-h-9 max-sm:rounded-xs md:w-[420px]')}
              {...register('password', {
                required: t('onboarding.비밀번호는 필수 입력입니다'),
              })}
              aria-invalid={isSubmitted ? (errors.password ? 'true' : 'false') : undefined}
            />
            <div className="mt-3"></div>
            {errors.password && (
              <small className="text-[13px] text-red-600">{t(errors.password?.message as string)}</small>
            )}
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
        </div>
      </div>
      <ChannelTalkFloating className="fixed bottom-10 right-10 z-50" />
    </>
  );
}
