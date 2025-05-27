import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GetUserProfileResponse } from '@/types/apis/get';
import { UseFormRegister, UseFormWatch, FieldErrors } from 'react-hook-form';

interface EditFormType {
  nickname: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function InfoEditSection({
  userData,
  register,
  watch,
  errors,
  setIsEditing,
}: {
  userData: GetUserProfileResponse;
  register: UseFormRegister<EditFormType>;
  watch: UseFormWatch<EditFormType>;
  errors: FieldErrors<EditFormType>;
  setIsEditing: (isEditing: boolean) => void;
}) {
  return (
    <div className="flex flex-col items-center md:ml-20 md:items-start">
      <div className="flex flex-col">
        <h3 className="pr-52 text-base font-bold">기본정보</h3>
        <div className="xs:mx-16 grid grid-cols-[2fr_5fr] items-center gap-x-3 gap-y-2.5 py-4 text-xs md:ml-6">
          <span className="mt-1 font-semibold">단위명</span>
          <Input
            className="w-40 rounded-md border border-gray-300 bg-gray-200 px-3 py-1 md:w-64"
            value={userData?.memberCode}
            readOnly
          />

          <span className="mt-1 font-semibold">닉네임</span>
          <Input
            {...register('nickname')}
            className="w-40 rounded-md border border-gray-300 bg-gray-200 px-3 py-1 md:w-64"
          />
        </div>
      </div>
      <div className="flex flex-col max-md:ml-6">
        <h3 className="mt-10 pr-52 text-base font-bold">비밀번호 변경</h3>
        <div className="xs:text-xs grid grid-cols-[2fr_5fr] items-center gap-x-3 gap-y-2.5 py-4 text-sm sm:text-xs md:ml-6">
          <span className="mt-1 font-semibold">기존 비밀번호</span>
          <div className="flex flex-col md:flex-row">
            <Input
              type="password"
              {...register('currentPassword', {
                required: '현재 비밀번호를 입력하세요.',
              })}
              className="w-40 rounded-md border border-gray-300 px-3 py-1 md:w-64"
            />
            {errors.currentPassword && (
              <span className="xs:mt-2 text-red-500 sm:mt-2 md:mt-2 lg:ml-3 xl:ml-3 xxl:ml-3">
                {errors.currentPassword.message}
              </span>
            )}
          </div>

          <span className="mt-1 font-semibold">새 비밀번호</span>
          <div className="xs:flex-col flex flex-row sm:flex-col md:flex-col lg:items-center xl:items-center xxl:items-center">
            <Input
              type="password"
              {...register('newPassword')}
              className="w-40 rounded-md border border-gray-300 px-3 py-1 md:w-64"
            />
            {errors.newPassword && (
              <span className="xs:mt-2 text-red-500 sm:mt-2 md:mt-2 lg:ml-3 xl:ml-3 xxl:ml-3">
                {errors.newPassword.message}
              </span>
            )}
          </div>

          <span className="mt-1 font-semibold">비밀번호 확인</span>
          <div className="xs:flex-col flex flex-row sm:flex-col md:flex-col lg:items-center xl:items-center xxl:items-center">
            <Input
              type="password"
              {...register('confirmNewPassword', {
                validate: {
                  requiredIfNewPassword: (value) =>
                    watch('newPassword') ? !!value || '비밀번호를 확인해주세요.' : true,
                  matchesNewPassword: (value) =>
                    watch('newPassword') && value !== watch('newPassword') ? '비밀번호가 일치하지 않습니다.' : true,
                },
              })}
              className="w-40 rounded-md border border-gray-300 px-3 py-1 md:w-64"
            />
            {errors.confirmNewPassword && (
              <span className="xs:mt-2 text-red-500 sm:mt-2 md:mt-2 lg:ml-3 xl:ml-3 xxl:ml-3">
                {errors.confirmNewPassword.message}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="my-16 flex self-center">
        <Button
          type="button"
          onClick={() => setIsEditing(false)}
          className="xs:text-xs mr-2 rounded-xs border border-gray-400 bg-white px-6 py-1 text-center text-gray-700 hover:bg-gray-100 sm:text-xs md:text-sm"
        >
          취소
        </Button>
        <Button
          type="submit"
          className="xs:text-xs mr-2 rounded-xs border border-blue-600 bg-blue-600 px-6 py-1 text-center text-white hover:bg-blue-700 sm:text-xs md:text-sm"
        >
          완료
        </Button>
      </div>
    </div>
  );
}
