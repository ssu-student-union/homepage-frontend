import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { faculties, departments } from './index';
import { zodResolver } from '@hookform/resolvers/zod';
import { client } from '@/apis/client';
import { LoginSchemaRegister, LoginType, LoginSchemaScoucil, LoginScoucilType } from './ZodCheck';

interface LoginFormProps {
  subSection1: string;
  buttonSection: string;
}

export function GeneralRegisterSection({ subSection1, buttonSection }: LoginFormProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { sort } = useParams();

  const isScouncilPath = location.pathname === '/homepage-frontend/register/scouncil';

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

  const [selectedFaculty, setSelectedFaculty] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [, setInputUserData] = useState<any | null>(null);
  const [scoucilError, setScoucilError] = useState(false);

  const showSelects = !isScouncilPath;
  const formValues = watch();
  const formValuesScouncil = watch();

  useEffect(() => {
    if (sort !== 'scouncil') {
      const storedFormValues = localStorage.getItem('formValues');
      setInputUserData(storedFormValues ? JSON.parse(storedFormValues) : null);

      const kakaoData = localStorage.getItem('kakaoData');
      if (kakaoData) {
        const parsedKakaoData = JSON.parse(kakaoData);
        if (parsedKakaoData.data?.name && parsedKakaoData.data?.studentId) {
          navigate('/homepage-frontend');
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
        alert('학생 정보가 확인되었습니다');
        localStorage.setItem('userId', formValuesScouncil.accountId);
        localStorage.setItem('councilData', response.data);
        localStorage.setItem('accessToken', response.data?.data?.accessToken);
        navigate('/homepage-frontend');
      } else {
        alert('오류가 발생했습니다. 다시 시도해주세요.');
        setScoucilError(true);
      }
    } catch (error) {
      setScoucilError(true);
      console.error('Error submitting form:', error);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const handleCertifyError = () => {
    navigate('/homepage-frontend/register/errorapply');
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
                {...register('accountId', {
                  required: '아이디는 필수 입력입니다.',
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
                placeholder="비밀번호"
                className="mt-4"
                {...register('password', {
                  required: '비밀번호는 필수 입력입니다.',
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
                placeholder="이름"
                className="w-[420px]"
                {...register('name', {
                  required: '이름은 필수 입력입니다.',
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
                placeholder="학번"
                className="mt-4"
                {...register('studentId', {
                  required: '학번은 필수 입력입니다.',
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

          {scoucilError && (
            <>
              <div className="mt-[10px] text-xs font-medium text-red-600">입력하신 정보가 올바르지 않습니다</div>
            </>
          )}
          <Button
            type="submit"
            disabled={isSubmitting || isButtonDisabled}
            variant="default"
            size="default"
            className={`mt-4 w-[420px] ${isSubmitting || isButtonDisabled ? 'bg-gray-400' : ''}`}
          >
            {buttonSection}
          </Button>
        </form>

        {!isScouncilPath && (
          <button onClick={handleCertifyError} className="mt-[117px] text-lg font-normal text-gray-500">
            학생인증이 안 되시나요?
          </button>
        )}
      </div>
    </div>
  );
}
