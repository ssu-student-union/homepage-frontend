import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchemaCertify, LoginCertifyType } from '../types/onboardingZodCheck';
import { postOnboardingMail } from '@/apis/postOnboardingMail'; // Import the postOnboardingMail function
import { AxiosError } from 'axios';
import { useTranslation } from 'react-i18next';

export function CertifyApplySection() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
    watch,
  } = useForm<LoginCertifyType>({
    resolver: zodResolver(LoginSchemaCertify),
  });

  const navigate = useNavigate();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const formValues = watch();

  useEffect(() => {
    const isFormValid = formValues.name && formValues.id && formValues.inquiry && formValues.email;
    setIsButtonDisabled(!isFormValid);
  }, [formValues]);

  const onSubmit: SubmitHandler<LoginCertifyType> = async () => {
    try {
      const reqBody = {
        name: formValues.name || '', // Ensure `name` is a string
        studentId: Number(formValues.id) || 0, // Ensure `studentId` is a number
        email: formValues.email || '', // Ensure `email` is a string
        content: formValues.inquiry || '', // Ensure `content` is a string
      };

      console.log('Request body being sent:', reqBody);

      const response = await postOnboardingMail(reqBody);
      console.log('Response from server:', response);

      alert('문의내용이 확인되었습니다.');
      navigate('/register/errorcheck');
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
      <div className="flex w-full max-w-md flex-col items-center p-4">
        <div className="max-w-[300px] pb-4 text-center text-2xl font-bold not-italic leading-[normal] text-[rgb(0,0,0)] md:text-3xl">
          {t('onboarding.학생인증이 안 되시나요?')}
        </div>
        <div className="text-center text-xs font-medium text-gray-700 md:w-[510px] md:text-base">
          {t('onboarding.error_apply_description')
            .split('.')
            .map((line, index) => (
              <div key={index}>
                {line}.{index < t('onboarding.error_apply_description').split('.').length - 1 && <br />}
              </div>
            ))}
        </div>
        <form className="mt-[36px] w-[300px] md:w-[420px]" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder={t('onboarding.이름')}
            className="w-[300px] md:w-[420px]"
            {...register('name', {
              required: t('onboarding.이름은 필수 입력입니다'),
            })}
            aria-invalid={isSubmitted ? (errors.name ? 'true' : 'false') : undefined}
          />
          <div className="mt-3"></div>
          {errors.name?.message && <small className="text-[13px] text-red-600">{t(errors.name?.message)}</small>}

          <Input
            type="text"
            placeholder={t('onboarding.학번')}
            className="mt-5 w-[300px] md:w-[420px]"
            {...register('id', {
              required: t('onboarding.학번은 필수 입력입니다'),
            })}
            aria-invalid={isSubmitted ? (errors.id ? 'true' : 'false') : undefined}
          />
          <div className="mt-3"></div>
          {errors.id?.message && <small className="text-[13px] text-red-600">{t(errors.id?.message)}</small>}

          <Input
            type="email"
            placeholder={t('onboarding.이메일')}
            className="mt-3 w-[300px] md:w-[420px]"
            {...register('email', {
              required: t('onboarding_validation.email_required'),
            })}
            aria-invalid={isSubmitted ? (errors.email ? 'true' : 'false') : undefined}
          />
          <div className="mt-3"></div>
          {errors.email?.message && <small className="text-[13px] text-red-600">{t(errors.email?.message)}</small>}

          <textarea
            className="mt-5 flex h-24 min-h-[46px] w-[300px] rounded-md border border-gray-500 bg-background px-[20px] py-[16px] text-sm font-semibold ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus:border focus:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:w-[420px]"
            placeholder={t('onboarding.문의내용')}
            {...register('inquiry', {
              required: t('onboarding_validation.inquiry_required'),
            })}
            aria-invalid={isSubmitted ? (errors.inquiry ? 'true' : 'false') : undefined}
          />
          <div className="mt-3"></div>
          {errors.inquiry?.message && <small className="text-[13px] text-red-600">{t(errors.inquiry?.message)}</small>}

          <Button
            type="submit"
            disabled={isSubmitting || isButtonDisabled}
            variant="default"
            size="default"
            className={`mt-4 w-[300px] md:w-[420px] ${isSubmitting || isButtonDisabled ? 'bg-gray-400' : ''}`}
          >
            {t('onboarding.error_apply_button')}
          </Button>
        </form>
      </div>
    </div>
  );
}
