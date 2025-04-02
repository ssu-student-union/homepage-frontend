import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import UserContainer from '../component/UserContainer';
import { useGetUserProfile } from './hooks/useGetUserProfile';
import { usePatchUserProfile } from './hooks/usePatchUserProfile';
import { PatchUserProfileRequest } from '@/types/apis/get';
import { Skeleton } from '@/components/ui/skeleton';
import { useQueryClient } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ProfileLoadingSkeleton = () => (
  <div className="my-4 mr-16 p-4">
    <div className="flex gap-4">
      <div className="flex-col space-y-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-20" />
      </div>
      <div className="flex-col space-y-2">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-5 w-48" />
      </div>
    </div>
  </div>
);

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useGetUserProfile();
  const userData = data;

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  useEffect(() => {
    if (userData?.nickname) {
      setValue('nickname', userData.nickname);
    }
  }, [userData, isEditing, setValue]);

  const mutation = usePatchUserProfile({
    mutationOptions: {
      onSuccess: () => {
        alert('성공적으로 업데이트되었습니다.');
        setIsEditing(false);
        queryClient.invalidateQueries({ queryKey: ['get-user-profile'] });
      },
      onError: (error) => {
        if (error.response?.status === 500) {
          alert('해당 비밀번호로 사용자를 찾을 수 없습니다.');
        } else {
          alert(`프로필 업데이트 실패: ${error?.message}`);
        }
      },
    },
  });

  const onSubmit = (formData: PatchUserProfileRequest) => {
    if (formData.newPassword !== formData.confirmNewPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    mutation.mutate({
      nickname: formData.nickname,
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword,
      confirmNewPassword: formData.confirmNewPassword,
    });

    reset();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <UserContainer />
        <div className="xs:items-center flex flex-col items-start pl-20 sm:items-center">
          <ProfileLoadingSkeleton />
        </div>
      </div>
    );
  }

  if (error || !userData) {
    console.log('error : ', error);
    return <div className="p-20">오류가 발생하였습니다.</div>;
  }

  return (
    <main>
      {userData?.isUnion ? (
        <>
          <UserContainer />
          <div className="xs:pl-0 mb-8 pl-16 sm:pl-0">
            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="xs:items-center flex flex-col items-start sm:items-center">
                  <h3 className="xs:text-base pr-52 text-lg font-bold sm:text-base">기본정보</h3>
                  <div className="xs:mx-16 xs:grid-cols-[2fr_5fr] xs:text-xs grid grid-cols-[1fr_5fr] items-center gap-y-2.5 py-4 text-sm sm:grid-cols-[2fr_5fr] sm:text-xs md:ml-6 lg:ml-6 xl:ml-6 xxl:md:ml-6">
                    <span className="mt-1 font-semibold">단위명</span>
                    <Input
                      className="xs:w-40 w-64 rounded-md border border-gray-300 bg-gray-200 px-3 py-1 sm:w-40"
                      value={userData?.name}
                      readOnly
                    />

                    <span className="mt-1 font-semibold">닉네임</span>
                    <Input
                      {...register('nickname')}
                      className="xs:w-40 w-64 rounded-md border border-gray-300 px-3 py-1 sm:w-40"
                    />
                  </div>
                  <h3 className="xs:text-base mt-10 pr-44 text-lg font-bold sm:text-base">비밀번호 변경</h3>
                  <div className="xs:grid-cols-[2fr_5fr] xs:text-xs grid grid-cols-[1fr_5fr] items-center gap-x-3 gap-y-2.5 py-4 text-sm sm:grid-cols-[2fr_5fr] sm:text-xs md:ml-6 lg:ml-6 xl:ml-6 xxl:md:ml-6">
                    <span className="mt-1 font-semibold">기존 비밀번호</span>
                    <div className="xs:flex-col flex flex-row sm:flex-col md:flex-col lg:items-center xl:items-center xxl:items-center">
                      <Input
                        type="password"
                        {...register('currentPassword', { required: '현재 비밀번호를 입력하세요.' })}
                        className="xs:w-40 w-56 rounded-md border border-gray-300 px-3 py-1 sm:w-40"
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
                        {...register('newPassword', { required: '새 비밀번호를 입력하세요.' })}
                        className="xs:w-40 w-56 rounded-md border border-gray-300 px-3 py-1 sm:w-40"
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
                          required: '비밀번호를 확인해주세요.',
                          validate: (value) => value === watch('newPassword') || '비밀번호가 일치하지 않습니다.',
                        })}
                        className="xs:w-40 w-56 rounded-md border border-gray-300 px-3 py-1 sm:w-40"
                      />
                      {errors.confirmNewPassword && (
                        <span className="xs:mt-2 text-red-500 sm:mt-2 md:mt-2 lg:ml-3 xl:ml-3 xxl:ml-3">
                          {errors.confirmNewPassword.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="xs:mr-0 xs:self-center my-16 mr-10 flex self-end sm:mr-0 sm:self-center">
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
              </form>
            ) : (
              <div className="flex flex-col items-center md:items-start">
                <h3 className="pr-28 text-base font-bold md:text-lg">기본정보</h3>
                <div className="mb-14 grid grid-cols-[2fr_5fr] gap-x-6 gap-y-3 py-6 text-xs md:ml-6 md:text-sm lg:grid-cols-[1fr_5fr]">
                  <span className="font-semibold">단위명</span>
                  <span>{userData?.memberCode}</span>

                  <span className="font-semibold">닉네임</span>
                  <span>{userData?.nickname}</span>
                </div>
                <Button
                  onClick={() => setIsEditing(true)}
                  className="mb-10 mr-0 self-center rounded-xs border border-gray-400 bg-white px-5 py-1.5 text-center text-xs text-gray-700 hover:bg-gray-100 md:mr-10 md:self-end md:text-sm"
                >
                  수정하기
                </Button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          <UserContainer />
          <div className="mb-8 pl-16">
            <h3 className="text-lg font-bold sm:text-base">기본정보</h3>
            <div className="grid grid-cols-[2fr_4fr] gap-y-4 p-6 text-xs md:grid-cols-[2fr_5fr] md:text-sm lg:grid-cols-[1fr_5fr]">
              <span className="font-semibold">이름</span>
              <span>{userData?.name}</span>

              <span className="font-semibold">학번</span>
              <span>{userData?.studentId}</span>
            </div>
          </div>
          <div className="mb-40 pl-16">
            <h3 className="text-lg font-bold sm:text-base">학적정보 - 주전공</h3>
            <div className="grid grid-cols-[1fr_5fr] gap-y-4 p-6 text-sm sm:grid-cols-[2fr_4fr] sm:text-xs md:grid-cols-[2fr_5fr]">
              <span className="mr-9 font-semibold">단과대학</span>
              <span>{userData?.memberCode}</span>

              <span className="mr-10 font-semibold">학과/부</span>
              <span>{userData?.majorCode}</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
