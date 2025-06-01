import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetUserProfile } from './hooks/useGetUserProfile';
import { usePatchUserProfile } from './hooks/usePatchUserProfile';
import { PatchUserProfileRequest } from '@/types/apis/get';
import { useQueryClient } from '@tanstack/react-query';
import UserContainerSkeleton from './components/UserContainerSkeleton';
import ProfileLoadingSkeleton from './components/ProfileLoadingSkeleton';
import ScouncilInfoRenderSection from './components/ScouncilInfoRenderSection';
import StudentInfoRenderSection from './components/StudentInfoRenderSection';
import InfoEditSection from './components/InfoEditSection';

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
        <UserContainerSkeleton />
        <ProfileLoadingSkeleton />
      </div>
    );
  }

  if (error || !userData) {
    console.log('error : ', error);
    return <div className="p-20">오류가 발생하였습니다.</div>;
  }

  return (
    <>
      {userData?.isUnion ? (
        <div className="mb-8">
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <InfoEditSection
                userData={userData}
                register={register}
                watch={watch}
                errors={errors}
                setIsEditing={setIsEditing}
              />
            </form>
          ) : (
            <ScouncilInfoRenderSection userData={userData} setIsEditing={setIsEditing} />
          )}
        </div>
      ) : (
        <StudentInfoRenderSection userData={userData} />
      )}
    </>
  );
}
