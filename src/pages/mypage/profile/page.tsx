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
    const { nickname, currentPassword, newPassword, confirmNewPassword } = formData;

    if (newPassword == '') {
      mutation.mutate({
        nickname: nickname,
        currentPassword: currentPassword,
        newPassword: currentPassword,
        confirmNewPassword: currentPassword,
      });
    } else {
      if (newPassword !== confirmNewPassword) {
        alert('비밀번호가 일치하지 않습니다.');
        return;
      }

      mutation.mutate({
        nickname: nickname,
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword,
      });
    }

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
          <div className="mb-8 sm:pl-0 md:pl-16">
            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col sm:items-center md:items-start">
                  <h3 className="pr-52 font-bold sm:text-base md:text-lg">기본정보</h3>
                  <div className="xs:mx-16 grid items-center gap-y-2.5 py-4 sm:grid-cols-[2fr_5fr] sm:text-xs md:ml-6 md:grid-cols-[1fr_5fr] md:text-sm">
                    <span className="mt-1 font-semibold">단위명</span>
                    <Input
                      className="rounded-md border border-gray-300 bg-gray-200 px-3 py-1 sm:w-40 md:w-64"
                      value={userData?.name}
                      readOnly
                    />

                    <span className="mt-1 font-semibold">닉네임</span>
                    <Input
                      {...register('nickname')}
                      className="rounded-md border border-gray-300 px-3 py-1 sm:w-40 md:w-64"
                    />
                  </div>
                  <h3 className="mt-10 pr-44 font-bold sm:text-base md:text-lg">비밀번호 변경</h3>
                  <div className="grid items-center gap-x-3 gap-y-2.5 py-4 sm:grid-cols-[2fr_5fr] sm:text-xs md:ml-6 md:grid-cols-[1fr_5fr] md:text-sm">
                    <span className="mt-1 font-semibold">기존 비밀번호</span>
                    <div className="flex sm:flex-col md:flex-row lg:items-center">
                      <Input
                        type="password"
                        {...register('currentPassword', {
                          required: '현재 비밀번호를 입력하세요.',
                        })}
                        className="rounded-md border border-gray-300 px-3 py-1 sm:w-40 md:w-56"
                      />
                      {errors.currentPassword && (
                        <span className=" text-red-500 sm:mt-2 md:mt-2 lg:ml-3">
                          {errors.currentPassword.message}
                        </span>
                      )}
                    </div>

                    <span className="mt-1 font-semibold">새 비밀번호</span>
                    <div className="flex md:flex-col lg:flex-row lg:items-center">
                      <Input
                        type="password"
                        {...register('newPassword')}
                        className="rounded-md border border-gray-300 px-3 py-1 sm:w-40 md:w-56"
                      />
                      {errors.newPassword && (
                        <span className="text-red-500 sm:mt-2 md:mt-2 lg:ml-3">
                          {errors.newPassword.message}
                        </span>
                      )}
                    </div>

                    <span className="mt-1 font-semibold">비밀번호 확인</span>
                    <div className="flex md:flex-col lg:flex-row lg:items-center">
                      <Input
                        type="password"
                        {...register('confirmNewPassword', {
                          validate: {
                            requiredIfNewPassword: (value) =>
                              watch('newPassword') ? !!value || '비밀번호를 확인해주세요.' : true,
                            matchesNewPassword: (value) =>
                              watch('newPassword') && value !== watch('newPassword')
                                ? '비밀번호가 일치하지 않습니다.'
                                : true,
                          },
                        })}
                        className="rounded-md border border-gray-300 px-3 py-1 sm:w-40 md:w-56"
                      />
                      {errors.confirmNewPassword && (
                        <span className=" text-red-500 sm:mt-2 md:mt-2 lg:ml-3 xl:ml-3 xxl:ml-3">
                          {errors.confirmNewPassword.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="my-16 flex sm:mr-0 sm:self-center md:mr-10 md:self-end">
                    <Button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="mr-2 rounded-xs border border-gray-400 bg-white px-6 py-1 text-center text-gray-700 hover:bg-gray-100 sm:text-xs md:text-sm"
                    >
                      취소
                    </Button>
                    <Button
                      type="submit"
                      className="mr-2 rounded-xs border border-blue-600 bg-blue-600 px-6 py-1 text-center text-white hover:bg-blue-700 sm:text-xs md:text-sm"
                    >
                      완료
                    </Button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-center md:items-start">
                <h3 className="pr-28 font-bold sm:text-base md:text-lg">기본정보</h3>
                <div className="mb-14 grid gap-x-6 gap-y-3 py-6 sm:text-xs md:ml-6 md:grid-cols-[2fr_5fr] md:text-sm lg:grid-cols-[1fr_5fr]">
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
            <div className="grid gap-y-4 p-6 sm:grid-cols-[2fr_4fr] sm:text-xs md:grid-cols-[2fr_5fr] md:text-sm lg:grid-cols-[1fr_5fr]">
              <span className="font-semibold">이름</span>
              <span>{userData?.name}</span>

              <span className="font-semibold">학번</span>
              <span>{userData?.studentId}</span>
            </div>
          </div>
          <div className="mb-40 pl-16">
            <h3 className="font-bold sm:text-base md:text-lg">학적정보 - 주전공</h3>
            <div className="grid gap-y-4 p-6 sm:grid-cols-[2fr_4fr] sm:text-xs md:grid-cols-[2fr_5fr] md:text-sm lg:grid-cols-[1fr_5fr]">
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
