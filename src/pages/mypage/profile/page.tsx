import { useEffect, useState } from 'react';
import UserContainer from '../component/UserContainer';
import { useGetUserProfile } from './hooks/useGetUserProfile';
import { usePatchUserProfile } from './hooks/usePatchUserProfile';

export default function ProfilePage() {
  // 수정상태 여부
  const [isEditing, setIsEditing] = useState(false);

  const { data, isLoading, error } = useGetUserProfile();
  const userData = data?.data;

  if (isLoading) console.log('loading');
  if (error) console.log(error);

  // 비밀번호
  const [nickname, setNickname] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (userData?.nickname) setNickname(userData.nickname);
  }, [userData, isEditing]);

  const mutation = usePatchUserProfile();

  const handleInputChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    if (name === 'nickname') {
      setNickname(value);
      console.log(nickname);
    } else if (name === 'currentPassword') {
      setCurrentPassword(value);
      console.log(currentPassword);
    } else if (name === 'newPassword') {
      setNewPassword(value);
      console.log(newPassword);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
      console.log(confirmPassword);
    }
  };

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다');
      return;
    }
    mutation.mutate(
      {
        nickname,
        currentPassword,
        newPassword,
        confirmNewPassword: confirmPassword,
      },
      {
        onSuccess: () => {
          alert('성공적으로 업데이트되었습니다.');
          setIsEditing(false);
        },
        onError: (error) => {
          if (error.response?.status === 500) {
            alert('해당 비밀번호로 사용자를 찾을 수 없습니다.');
          } else {
            alert(`프로필 업데이트 실패: ${error?.message}`);
          }
        },
      }
    );
    // 변경 후 초기화
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
    setIsEditing(false);
  };

  return (
    <main>
      {userData?.isUnion ? (
        <>
          <UserContainer />
          <div className="mb-8 pl-16 xs:pl-0 sm:pl-0">
            {isEditing ? (
              <div className="flex flex-col items-start xs:items-center sm:items-center">
                <h3 className="pr-52 text-lg font-bold xs:text-base sm:text-base">기본정보</h3>
                <div className="grid grid-cols-[1fr_5fr] gap-y-2.5 py-4 text-sm xs:mx-16 xs:grid-cols-[2fr_5fr] xs:text-xs sm:grid-cols-[2fr_5fr] sm:text-xs md:ml-6 lg:ml-6 xl:ml-6 xxl:md:ml-6">
                  <span className="mt-1 font-semibold">단위명</span>
                  <input
                    className="w-[260px] rounded-sm border border-gray-300 bg-gray-200 px-3 py-1 xs:w-40 sm:w-40"
                    value={userData?.name}
                    readOnly
                  />

                  <span className="mt-1 font-semibold">닉네임</span>
                  <input
                    name="nickname"
                    className="border-gray-30 w-[260px] rounded-sm border px-3 py-1 xs:w-40 sm:w-40"
                    onChange={handleInputChange}
                    value={nickname}
                  />
                </div>
                <h3 className="mt-10 pr-44 text-lg font-bold xs:text-base sm:text-base">비밀번호 변경</h3>
                <div className="grid grid-cols-[1fr_5fr] gap-x-3 gap-y-2.5 py-4 text-sm xs:grid-cols-[2fr_5fr] xs:text-xs sm:grid-cols-[2fr_5fr] sm:text-xs md:ml-6 lg:ml-6 xl:ml-6 xxl:md:ml-6">
                  <span className="mt-1 font-semibold">기존 비밀번호</span>
                  <input
                    type="password"
                    name="currentPassword"
                    onChange={handleInputChange}
                    className="w-56 rounded-sm border border-gray-300 px-3 py-1 xs:w-40 sm:w-40"
                  />

                  <span className="mt-1 font-semibold">새 비밀번호</span>
                  <input
                    type="password"
                    name="newPassword"
                    onChange={handleInputChange}
                    className="w-56 rounded-sm border border-gray-300 px-3 py-1 xs:w-40 sm:w-40"
                  />

                  <span className="mt-1 font-semibold">비밀번호 확인</span>
                  <input
                    type="password"
                    name="confirmPassword"
                    onChange={handleInputChange}
                    className="w-56 rounded-sm border border-gray-300 px-3 py-1 xs:w-40 sm:w-40"
                  />
                  {passwordError && <span className="col-span-2 ml-4 text-red-500">{passwordError}</span>}
                </div>
                <div className="my-16 mr-10 flex self-end xs:mr-0 xs:self-center sm:mr-0 sm:self-center">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="mr-2 rounded-xs border border-gray-400 bg-white px-6 py-1 text-center text-gray-700 hover:bg-gray-100 xs:text-xs sm:text-xs md:text-sm"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="mr-2 rounded-xs border border-blue-600 bg-blue-600 px-6 py-1 text-center text-white hover:bg-blue-700 xs:text-xs sm:text-xs md:text-sm"
                    // className="rounded-xs bg-blue-600 px-6 py-1 text-center text-white hover:bg-blue-700 sm:text-xs md:text-sm"
                  >
                    완료
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-start xs:items-center sm:items-center">
                <h3 className="pr-28 text-lg font-bold xs:text-base sm:text-base">기본정보</h3>
                <div className="mb-14 grid grid-cols-[1fr_5fr] gap-x-6 gap-y-3 py-6 text-sm xs:grid-cols-[2fr_5fr] xs:text-xs sm:grid-cols-[2fr_5fr] sm:text-xs md:ml-6 md:grid-cols-[2fr_5fr] lg:ml-6 xl:ml-6 xxl:md:ml-6">
                  <span className="font-semibold">단위명</span>
                  <span>{userData?.memberCode}</span>

                  <span className="font-semibold">닉네임</span>
                  <span>{userData?.nickname}</span>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mb-10 mr-10 self-end rounded-xs border border-gray-400 bg-white px-5 py-1.5 text-center text-gray-700 hover:bg-gray-100 xs:mr-0 xs:self-center xs:text-xs sm:mr-0 sm:self-center sm:text-xs md:text-sm"
                >
                  수정하기
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          <UserContainer />
          <div className="mb-8 pl-16">
            <h3 className="text-lg font-bold sm:text-base">기본정보</h3>
            <div className="grid grid-cols-[1fr_5fr] gap-y-4 p-6 text-sm sm:grid-cols-[2fr_4fr] sm:text-xs md:grid-cols-[2fr_5fr]">
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
      {/* <div className="flex justify-end px-10 pb-10 sm:justify-center sm:pt-8 md:pt-8">
        {isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className="mr-2 rounded-sm border border-gray-400 bg-white px-6 py-1 text-center text-gray-700 hover:bg-gray-100"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              className="rounded-sm bg-blue-600 px-6 py-1 text-center text-white hover:bg-blue-700"
            >
              완료
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="rounded-xs border border-gray-400 bg-white px-5 py-1.5 text-center text-gray-700 hover:bg-gray-100 sm:text-xs md:text-sm"
          >
            수정하기
          </button>
        )}
      </div> */}
    </main>
  );
}
