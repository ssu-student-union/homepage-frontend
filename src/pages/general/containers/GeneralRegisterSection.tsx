import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { faculties, departments } from './index';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { client } from '@/apis/client'; // axios client import

const nameRegex = new RegExp(/^[ㄱ-ㅎ|가-힣]+$/);

interface LoginFormProps {
  subSection1: string;
  buttonSection: string;
}

const LoginSchema = z.object({
  name: z
    .string()
    .min(1, '이름을 입력해주세요')
    .max(10, '이름은 10자 이내여야 합니다.')
    .regex(nameRegex, '잘못된 입력입니다.'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
  studentId: z.string().length(8, '학번은 8자리여야 합니다.'),
});

type LoginType = z.infer<typeof LoginSchema>;

export function GeneralRegisterSection({ subSection1, buttonSection }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
    watch,
    setValue,
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  const navigate = useNavigate();
  const location = useLocation();

  const [inputUserData, setInputUserData] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const isScouncilPath = location.pathname === '/register/scouncil';
  const showSelects = !isScouncilPath;
  const formValues = watch();

  useEffect(() => {
    const storedFormValues = localStorage.getItem('formValues');
    setInputUserData(storedFormValues ? JSON.parse(storedFormValues) : null);

    const kakaoData = localStorage.getItem('kakaoData');
    if (kakaoData) {
      const parsedKakaoData = JSON.parse(kakaoData);
      if (parsedKakaoData.data?.name && parsedKakaoData.data?.studentId) {
        navigate('/');
      }
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem('formValues', JSON.stringify(formValues));
  }, [formValues]);

  useEffect(() => {
    setSelectedFaculty(formValues.memberCode || '');
    if (!formValues.memberCode) {
      setValue('majorCode', ''); // 상위 카테고리가 선택되지 않으면 하위 카테고리를 선택할 수 없음
    }
  }, [formValues.memberCode]);

  useEffect(() => {
    const isFormValid = isScouncilPath
      ? formValues.studentId && formValues.password
      : formValues.name && formValues.studentId && formValues.memberCode && formValues.majorCode;
    setIsButtonDisabled(!isFormValid);
  }, [formValues, isScouncilPath]);

  const onSubmit = async () => {
    try {
      // localStorage에서 formValues 가져오기
      const UserData = localStorage.getItem('kakaoData');

      if (UserData) {
        const parsedUserData = JSON.parse(UserData);
        const accessToken = parsedUserData?.data?.accessToken; // 안전하게 accessToken 추출

        if (accessToken) {
          // API 요청
          const response = await client.post(`/onboarding/academy-information`, formValues, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          // 응답 상태 코드 처리
          if (response.status === 200) {
            alert('학생 정보가 확인되었습니다');
            if (typeof navigate === 'function') {
              navigate('/'); // navigate 함수가 존재하는 경우에만 호출
            } else {
              console.warn('navigate 함수가 정의되지 않았습니다.');
            }
          } else {
            alert('오류가 발생했습니다. 다시 시도해주세요.');
          }
        } else {
          alert('AccessToken이 없습니다.');
        }
      } else {
        alert('UserData가 localStorage에 없습니다.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleCertifyError = () => {
    navigate('/register/errorcheck');
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-md flex-col items-center p-4">
        <div className="pb-4 text-2xl font-bold not-italic leading-[normal] text-[rgb(0,0,0)]">{subSection1}</div>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          {isScouncilPath ? (
            <>
              <Input
                type="text"
                placeholder="아이디"
                className="w-[420px]"
                {...register('id', {
                  required: '아이디는 필수 입력입니다.',
                })}
                aria-invalid={isSubmitted ? (errors.id ? 'true' : 'false') : undefined}
              />
              {errors.id && <small>{errors.id.message}</small>}
              <Input
                type="password"
                placeholder="비밀번호"
                className="mt-4"
                {...register('password', {
                  required: '비밀번호는 필수 입력입니다.',
                })}
                aria-invalid={isSubmitted ? (errors.password ? 'true' : 'false') : undefined}
              />
              {errors.password && <small>{errors.password.message}</small>}
            </>
          ) : (
            <>
              <Input
                type="text"
                placeholder="이름"
                className="w-[420px]"
                {...register('name', {
                  required: '이름은 필수 입력입니다.',
                })}
                aria-invalid={isSubmitted ? (errors.name ? 'true' : 'false') : undefined}
              />
              {errors.name?.message && <small>{errors.name?.message}</small>}
              <Input
                type="text"
                placeholder="학번"
                className="mt-4"
                {...register('studentId', {
                  required: '학번은 필수 입력입니다.',
                })}
                aria-invalid={isSubmitted ? (errors.studentId ? 'true' : 'false') : undefined}
              />
              {errors.studentId?.message && <small>{errors.studentId?.message}</small>}
            </>
          )}

          {showSelects && (
            <>
              <div className="mt-4"></div>
              <Select
                {...register('memberCode', {
                  required: '옵션을 선택해 주세요.',
                })}
                onValueChange={(value) => {
                  setValue('memberCode', value);
                  setSelectedFaculty(value);
                }}
                value={formValues.memberCode || ''}
              >
                <SelectTrigger
                  className={`min-h-[46px] w-full border-gray-500 px-[20px] py-[26px] text-sm font-medium ${
                    formValues.memberCode ? 'font-semibold text-black' : 'text-[#9CA3AF]'
                  }`}
                >
                  <SelectValue placeholder="단과대 선택" />
                </SelectTrigger>
                <SelectContent>
                  {faculties.map((faculty) => (
                    <SelectItem key={faculty} value={faculty}>
                      {faculty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-4"></div>
              <Select
                {...register('majorCode', {
                  required: '학과/부를 선택해 주세요.',
                })}
                onValueChange={(value) => {
                  setValue('majorCode', value);
                }}
                value={formValues.majorCode || ''}
                disabled={!selectedFaculty}
              >
                <SelectTrigger
                  className={`min-h-[46px] w-full border-gray-500 px-[20px] py-[26px] text-sm font-medium`}
                >
                  <SelectValue placeholder="학과/부 선택" />
                </SelectTrigger>
                <SelectContent>
                  {(departments[selectedFaculty] || []).map((department) => (
                    <SelectItem key={department} value={department}>
                      {department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </>
          )}
          <Button
            type="submit"
            onClick={onSubmit}
            disabled={isSubmitting || isButtonDisabled}
            variant="default"
            size="default"
            className={`mt-4 w-[420px] ${isSubmitting || isButtonDisabled ? 'bg-gray-400' : ''}`}
          >
            {buttonSection}
          </Button>
        </form>

        <button onClick={handleCertifyError} className="mt-[117px] text-lg font-normal text-gray-500">
          학생인증이 안 되시나요?
        </button>
      </div>
    </div>
  );
}
