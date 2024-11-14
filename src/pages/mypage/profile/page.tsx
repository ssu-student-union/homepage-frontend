import { useState } from 'react';
import UserContainer from '../component/UserContainer';

export default function ProfilePage() {
  // 자치기구 여부 확인 -> api 완료되면 수정예정
  const [isAssociation] = useState(false);
  // 수정상태 여부
  const [isEditing, setIsEditing] = useState(false);
  // 사용자 정보
  const [userInfo, setUserInfo] = useState({
    email: 'qwer1234@kakao.com',
    name: '김숭실',
    studentId: '20241234',
    phoneNumber: '010-1234-5678',
    college: 'IT대학',
    department: '글로벌미디어학부',
  });
  // 자치기구 정보
  const [associationInfo, setAssociationInfo] = useState({
    id: 'it-global media',
    name: '글로벌미디어학부 학생회',
    nickname: '제 19대 글로벌미디어학부 학생회 미리내',
    password: 'password',
    college: 'IT대학',
    department: '글로벌미디어학부',
  });

  // 비밀번호
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleInputChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    if (name === 'nickname') {
      setAssociationInfo((prev) => ({
        ...prev,
        nickname: value,
      }));
    } else if (name === 'phoneNumber') {
      setUserInfo((prev) => ({
        ...prev,
        phoneNumber: value,
      }));
    } else if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다');
      return;
    }
    setAssociationInfo((prev) => ({
      ...prev,
      password: newPassword,
    }));
    // 변경 후 초기화
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
    setIsEditing(false);
  };

  return (
    <main>
      {isAssociation ? (
        <>
          <UserContainer isAssociation={isAssociation} userInfo={null} associationInfo={associationInfo} />
          <div className="mb-8 pl-16">
            {isEditing ? (
              <>
                <h3 className="text-lg font-bold">기본정보</h3>
                <div className="grid grid-cols-[1fr_5fr] gap-y-2 p-6 text-sm">
                  <span className="mr-14 font-semibold">아이디</span>
                  <input
                    className="w-64 rounded-sm border border-gray-300 bg-gray-200 px-3 py-0.5"
                    value={associationInfo.id}
                    readOnly
                  />

                  <span className="mr-16 font-semibold">단위명</span>
                  <input
                    className="w-64 rounded-sm border border-gray-300 bg-gray-200 px-3 py-0.5"
                    value={associationInfo.name}
                    readOnly
                  />

                  <span className="mr-16 font-semibold">닉네임</span>
                  <input
                    name="nickname"
                    value={associationInfo.nickname}
                    onChange={handleInputChange}
                    className="w-64 rounded-sm border border-gray-300 px-3 py-0.5"
                  />
                </div>
                <h3 className="mt-10 text-lg font-bold">비밀번호 변경</h3>
                <div className="grid grid-cols-[1fr_5fr] gap-y-2 p-6 text-sm">
                  <span className="mr-10 font-semibold">기존 비밀번호</span>
                  <input
                    type="password"
                    value={associationInfo.password}
                    onChange={handleInputChange}
                    className="w-64 rounded-sm border border-gray-300 px-3 py-0.5"
                  />

                  <span className="mr-10 font-semibold">새 비밀번호</span>
                  <input
                    type="password"
                    name="newPassword"
                    onChange={handleInputChange}
                    className="w-64 rounded-sm border border-gray-300 px-3 py-0.5"
                  />

                  <span className="mr-10 font-semibold">비밀번호 확인</span>
                  <div>
                    <input
                      type="password"
                      name="confirmPassword"
                      onChange={handleInputChange}
                      className="w-64 rounded-sm border border-gray-300 px-3 py-0.5"
                    />
                    {passwordError && <span className="col-span-2 ml-4 text-red-500">{passwordError}</span>}
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold">기본정보</h3>
                <div className="grid grid-cols-[1fr_5fr] gap-y-4 p-6 text-sm">
                  <span className="mr-14 font-semibold">아이디</span>
                  <span>{associationInfo.id}</span>

                  <span className="mr-16 font-semibold">단위명</span>
                  <span>{associationInfo.name}</span>

                  <span className="mr-16 font-semibold">닉네임</span>
                  <span>{associationInfo.nickname}</span>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <UserContainer isAssociation={isAssociation} userInfo={userInfo} associationInfo={null} />
          <div className="mb-8 pl-16">
            <h3 className="text-lg font-bold">기본정보</h3>
            {isEditing ? (
              <div className="grid grid-cols-[1fr_5fr] gap-y-2.5 p-6 text-sm">
                <span className="font-semibold">아이디</span>
                <input
                  className="w-56 rounded-sm border border-gray-300 bg-gray-200 px-3 py-0.5"
                  value={userInfo.email}
                  readOnly
                />

                <span className="font-semibold">이름</span>
                <input
                  className="w-56 rounded-sm border border-gray-300 bg-gray-200 px-3 py-0.5"
                  value={userInfo.name}
                  readOnly
                />

                <span className="font-semibold">학번</span>
                <input
                  className="w-56 rounded-sm border border-gray-300 bg-gray-200 px-3 py-0.5"
                  value={userInfo.studentId}
                  readOnly
                />

                <span className="font-semibold">전화번호</span>
                <input
                  name="phoneNumber"
                  value={userInfo.phoneNumber}
                  onChange={handleInputChange}
                  className="w-56 rounded-sm border border-gray-300 px-3 py-0.5"
                />
              </div>
            ) : (
              <div className="grid grid-cols-[1fr_5fr] gap-y-4 p-6 text-sm">
                <span className="font-semibold">아이디</span>
                <span>{userInfo.email}</span>

                <span className="font-semibold">이름</span>
                <span>{userInfo.name}</span>

                <span className="font-semibold">학번</span>
                <span>{userInfo.studentId}</span>

                <span className="font-semibold">전화번호</span>
                <span>{userInfo.phoneNumber}</span>
              </div>
            )}
          </div>
          <div className="pl-16">
            <h3 className="text-lg font-bold">학적정보 - 주전공</h3>
            <div className="grid grid-cols-[1fr_5fr] gap-y-4 p-6 text-sm">
              <span className="mr-9 font-semibold">단과대학</span>
              <span>{userInfo.college}</span>

              <span className="mr-10 font-semibold">학과/부</span>
              <span>{userInfo.department}</span>
            </div>
          </div>
        </>
      )}
      <div className="flex justify-end px-10 pb-10">
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
            className="rounded-xs border border-gray-400 bg-white px-6 py-1 text-center text-gray-700 hover:bg-gray-100"
          >
            수정하기
          </button>
        )}
      </div>
    </main>
  );
}
