import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { cn } from '@/libs/utils';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSetAtom } from 'jotai';
import { LoginState } from '@/atoms/atom';
import { useState } from 'react';
import { clientAuth } from '@/apis/client';
import { postSsoOnboard } from '@/apis/postSsoOnboard';
import { getClientIdFromToken, postSsoLogout } from '@/apis/postSsoLogout';
import { baseUrl } from '@/pages/register/containers/const/data';
import axios from 'axios';

const SsoOnboardSchema = z.object({
  name: z
    .string()
    .min(1, 'onboarding_validation.name_required')
    .max(50, 'onboarding_validation.name_max')
    .regex(/^[가-힣a-zA-Z]+$/, 'onboarding_validation.name_regex'),
  studentId: z
    .string()
    .length(8, 'onboarding_validation.studentId_length')
    .regex(/^\d+$/, 'onboarding_validation.studentId_regex'),
});

type SsoOnboardForm = z.infer<typeof SsoOnboardSchema>;

export function SsoOnboardingPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isEn = i18n.language === 'en';
  const setLoginState = useSetAtom(LoginState);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting, isValid },
  } = useForm<SsoOnboardForm>({
    resolver: zodResolver(SsoOnboardSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      studentId: '',
    },
  });

  const onSubmit: SubmitHandler<SsoOnboardForm> = async (data) => {
    try {
      // 1. Call POST /auth/onboard to link Cognito sub with existing student record
      await postSsoOnboard({
        student_id: data.studentId,
        student_name: data.name,
      });

      // 2. Call POST /onboarding/academy-information to create member record internally
      const response = await clientAuth({
        method: 'post',
        url: '/onboarding/academy-information',
        data: {},
      });

      if (response.status === 200) {
        setLoginState(true);
        navigate('/');
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        // Student info is already linked to another account
        alert('이전에 온보딩한 계정으로 로그인해주세요.');
      } else {
        setError(true);
        console.error(err);
        alert(
          isEn
            ? 'Login information does not match. Please try again.'
            : '로그인 정보가 일치하지 않습니다. 다시 시도해주세요.'
        );
      }

      // Save values before clearing localStorage
      const refreshToken = localStorage.getItem('refreshToken') ?? '';
      const accessToken = localStorage.getItem('accessToken') ?? '';
      const clientId = getClientIdFromToken(accessToken);

      // Clear local tokens
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setLoginState(false);

      // Cognito logout — form submit triggers browser redirect
      postSsoLogout({
        refreshToken,
        clientId,
        redirectUri: baseUrl,
      });
    }
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
            {...register('name')}
            aria-invalid={isSubmitted ? (errors.name ? 'true' : 'false') : undefined}
          />
          <div className="mt-3"></div>
          {errors.name?.message && <small className="text-[13px] text-red-600">{t(errors.name.message)}</small>}
          <Input
            type="text"
            placeholder={t('onboarding.학번')}
            className={cn('w-[250px] max-sm:min-h-9 max-sm:rounded-xs md:w-[420px]')}
            {...register('studentId')}
            aria-invalid={isSubmitted ? (errors.studentId ? 'true' : 'false') : undefined}
          />
          <div className="mt-3"></div>
          {errors.studentId?.message && (
            <small className="text-[13px] text-red-600">{t(errors.studentId.message)}</small>
          )}
          {error && (
            <div className="mt-[10px] text-xs font-medium text-red-600">
              {t('onboarding.입력하신 정보가 올바르지 않습니다')}
            </div>
          )}
          <Button
            type="submit"
            disabled={isSubmitting || !isValid}
            variant="default"
            size="default"
            className={`mt-4 w-[250px] py-0 max-md:px-4 max-md:py-[0.1rem] max-sm:min-h-[36px] max-sm:rounded-xs md:w-[420px] ${isSubmitting || !isValid ? 'bg-gray-400' : ''}`}
          >
            {t('onboarding.입력 완료')}
          </Button>
        </form>
        <button
          onClick={() => navigate('/register/errorapply')}
          className="mt-[117px] text-lg font-normal text-gray-500"
        >
          {t('onboarding.학생인증이 안 되시나요?')}
        </button>
      </div>
    </div>
  );
}
