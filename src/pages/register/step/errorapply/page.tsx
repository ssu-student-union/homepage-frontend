import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { LoginSchemaCertify, LoginCertifyType } from '../types/onboardingZodCheck';
import { postOnboardingMail } from '@/apis/postOnboardingMail';
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { cn } from '@/libs/utils';

export function CertifyApplyPage() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginCertifyType>({
    resolver: zodResolver(LoginSchemaCertify),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      id: '',
      email: '',
      inquiry: '',
    },
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginCertifyType> = async (data) => {
    try {
      const reqBody = {
        name: data.name,
        studentId: data.id,
        email: data.email,
        content: data.inquiry,
      };

      const response = await postOnboardingMail(reqBody);
      if (response.status === 200) {
        navigate('/register/errorcheck');
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.error('Server error response:', error.response.status, error.response.data);
          alert(`서버 오류 발생: ${error.response.data.message || '문의 내용을 전송하는데 실패했습니다.'}`);
        } else if (error.request) {
          console.error('No response received:', error.request);
          alert('서버로부터 응답을 받을 수 없습니다.');
        }
      } else {
        console.error('Error setting up request:', (error as Error).message);
        alert('문의 내용을 전송하는데 문제가 발생했습니다.');
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-md flex-col items-center">
        <h1 className="max-w-[300px] pb-4 text-center text-2xl font-bold not-italic leading-[normal] text-black md:text-3xl">
          {t('onboarding.학생인증이 안 되시나요?')}
        </h1>
        <p className="whitespace-pre-line text-center text-xs font-medium text-gray-700 md:w-[540px] md:text-base">
          {t('onboarding.error_apply_description')}
        </p>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-[36px] flex w-[300px] flex-col gap-4 md:w-[420px]">
            <Input
              type="text"
              placeholder={t('onboarding.이름')}
              className="w-[300px] md:w-[420px]"
              {...register('name')}
              isInvalid={!!errors.name}
            />
            {errors.name?.message && <small className="text-[13px] text-red-600">{t(errors.name?.message)}</small>}

            <Input
              type="text"
              inputMode="numeric"
              placeholder={t('onboarding.학번')}
              className="w-[300px] md:w-[420px]"
              {...register('id')}
              isInvalid={!!errors.id}
            />
            {errors.id?.message && <small className="text-[13px] text-red-600">{t(errors.id?.message)}</small>}

            <Input
              type="email"
              placeholder={t('onboarding.이메일')}
              className="w-[300px] md:w-[420px]"
              {...register('email')}
              isInvalid={!!errors.email}
            />
            {errors.email?.message && <small className="text-[13px] text-red-600">{t(errors.email?.message)}</small>}

            <textarea
              className={`flex h-24 min-h-[46px] w-[300px] rounded-md border bg-background px-[20px] py-[16px] text-sm font-semibold ring-offset-background placeholder:text-gray-400 focus:border focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:w-[420px] ${
                errors.inquiry ? 'border-red-400 focus:border-red-400' : 'border-gray-500 focus:border-primary'
              }`}
              placeholder={t('onboarding.문의내용')}
              {...register('inquiry')}
            />
            {errors.inquiry?.message && (
              <small className="text-[13px] text-red-600">{t(errors.inquiry?.message)}</small>
            )}

            <Button
              type="submit"
              disabled={isSubmitting || !isValid}
              variant="default"
              size="default"
              className={`w-[300px] md:w-[420px] ${isSubmitting || !isValid ? 'bg-gray-400' : ''}`}
            >
              {isSubmitting ? <Loader2 className={cn('animate-spin')} /> : t('onboarding.error_apply_button')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
