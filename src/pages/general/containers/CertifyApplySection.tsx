import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchemaCertify, LoginCertifyType } from './ZodCheck';
import { postOnboardingMail } from '@/apis/postOnboardingMail'; // Import the postOnboardingMail function

export function CertifyApplySection() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
    watch,
  } = useForm<LoginCertifyType>({
    resolver: zodResolver(LoginSchemaCertify),
  });

  const navigate = useNavigate();
  const location = useLocation();

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const isScouncilPath = location.pathname === '/register/scouncil';
  const formValues = watch();

  useEffect(() => {
    localStorage.setItem('formValues', JSON.stringify(formValues));
  }, [formValues]);

  useEffect(() => {
    const isFormValid = isScouncilPath
      ? formValues.id && formValues.email
      : formValues.name && formValues.id && formValues.inquiry;
    setIsButtonDisabled(!isFormValid);
  }, [formValues, isScouncilPath]);

  const onSubmit = async () => {
    try {
      const resBody = {
        name: formValues.name,
        studentId: Number(0),
        email: formValues.email,
        content: formValues.inquiry,
      };

      console.log('Request body being sent:', resBody);

      const response = await postOnboardingMail(resBody);
      console.log('Response from server:', response);

      alert('문의내용이 확인되었습니다.');
      navigate('/register/errorcheck');
    } catch (error) {
      if (error.response) {
        console.error('Server error response:', error.response.status, error.response.data);
        alert(`서버 오류 발생: ${error.response.data.message || '문의 내용을 전송하는데 실패했습니다.'}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        alert('서버로부터 응답을 받을 수 없습니다.');
      } else {
        console.error('Error setting up request:', error.message);
        alert('문의 내용을 전송하는데 문제가 발생했습니다.');
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-md flex-col items-center p-4">
        <div className="pb-4 text-2xl font-bold not-italic leading-[normal] text-[rgb(0,0,0)]">
          학생인증이 안 되시나요?
        </div>
        <div className="w-[540px] text-center text-base font-medium text-gray-700">
          신편입학, 학적 변동의 이유로 학생 인증이 지연될 수 있습니다 <br></br>
          문의를 보내주시면 기입해주신 이메일을 통해 문의 접수를 도와드리겠습니다
        </div>
        <form className="mt-[36px]" noValidate onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="이름"
            className="w-[420px]"
            {...register('name', {
              required: '이름은 필수 입력입니다.',
            })}
            aria-invalid={isSubmitted ? (errors.name ? 'true' : 'false') : undefined}
          />
          <div className="mt-3"></div>
          {errors.name?.message && <small className=" text-[13px] text-red-600">{errors.name?.message}</small>}

          <Input
            type="text"
            placeholder="학번"
            className="mt-5"
            {...register('id', {
              required: '학번은 필수 입력입니다.',
            })}
            aria-invalid={isSubmitted ? (errors.id ? 'true' : 'false') : undefined}
          />
          <div className="mt-3"></div>
          {errors.id?.message && <small className=" text-[13px] text-red-600">{errors.id?.message}</small>}

          <Input
            type="email"
            placeholder="이메일"
            className="mt-3"
            {...register('email', {
              required: '이메일은 필수 입력입니다.',
            })}
            aria-invalid={isSubmitted ? (errors.email ? 'true' : 'false') : undefined}
          />
          <div className="mt-3"></div>
          {errors.email?.message && <small className=" text-[13px] text-red-600">{errors.email.message}</small>}

          <textarea
            className=" mt-5 flex h-24 min-h-[46px] w-full rounded-md border border-black bg-background px-[20px] py-[16px] text-sm font-semibold ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus:border focus:border-primary focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="문의내용"
            {...register('inquiry', {
              required: '문의내용는 필수 입력입니다.',
            })}
            aria-invalid={isSubmitted ? (errors.inquiry ? 'true' : 'false') : undefined}
          />
          <div className="mt-3"></div>
          {errors.inquiry && <small className=" text-[13px] text-red-600">{errors.inquiry.message}</small>}

          <Button
            type="submit"
            disabled={isSubmitting || isButtonDisabled}
            variant="default"
            size="default"
            className={`mt-4 w-[420px] ${isSubmitting || isButtonDisabled ? 'bg-gray-400' : ''}`}
          >
            문의 보내기
          </Button>
        </form>
      </div>
    </div>
  );
}
