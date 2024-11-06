export default function ProfilePage() {
  // 자치기구 여부 확인 -> api 완료되면 수정예정
  const [isAssociation] = useState(false);
  // 수정상태 여부
  const [isEditing, setIsEditing] = useState(false);
  // 사용자 정보
  const [userInfo, setUserInfo] = useState({
    email: 'qwer1234@kaka.com',
    name: '김숭실',
    studentId: '20241234',
    phoneNumber: '010-1234-5678',
    college: 'IT대학',
    department: '글로벌미디어학부',
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    try {
      console.log(userInfo);
      setIsEditing(false);
    } catch (error) {
      console.error('fail to update profile : ', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const renderEditPage = () => {
    
  }

  return (
    <main>
      {/* 유저 정보 컨테이너 (자치기구, 일반학우) -> 컴포넌트화*/}
      {isAssociation ? (
        <>
          <div className="my-16 ml-16 mr-10 flex flex-row items-center rounded-lg border-2 border-[#D9D9D9] bg-white p-10 ">
            <img className="mr-8 h-28 w-28" src="/image/mypage/profile_img.png" alt="profile_default_img" />
            <div>
              <div className="mb-4">
                <span className="text-xl font-extrabold">제 19대 글로벌미디어학부 학생회 미리내</span>
              </div>
              <div className="mb-1">
                <span>IT대학 • </span>
                <span>글로벌미디어학부</span>
              </div>
            </div>
          </div>
          <div className="mb-8 pl-16">
            <h3 className="text-lg font-bold">기본정보</h3>
            {/* 코드리뷰 참고해서 수정하기 */}
            <div className="grid grid-cols-[1fr_5fr] gap-y-4 p-6 text-sm">
              <span className="mr-14 font-semibold">아이디</span>
              <span>it-global media</span>

              <span className="mr-16 font-semibold">단위명</span>
              <span>글로벌미디어학부 학생회</span>

              <span className="mr-16 font-semibold">닉네임</span>
              <span>제 19대 글로벌미디어학부 학생회 미리내</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mb-16 ml-16 mr-10 mt-16 flex flex-row items-center rounded-lg border-2 border-[#D9D9D9] bg-white p-10">
            <img className="mr-8 h-28 w-28" src="/image/mypage/profile_img.png" alt="profile_default_img" />
            <div>
              <div className="mb-4">
                <span className="text-xl font-extrabold">김숭실</span>
                <span className="ml-1 mr-1 text-xl font-thin"> | </span>
                <span className="text-xl font-extrabold">20241234</span>
              </div>
              <div className="mb-1">
                <span>IT대학 • </span>
                <span>글로벌미디어학부 • </span>
                <span>재학</span>
              </div>
              <div>
                <span>총학생회비 납부 • </span>
                <span>글로벌미디어학부 학생회비 납부</span>
              </div>
            </div>
          </div>
          <div className="mb-8 pl-16">
            <h3 className="text-lg font-bold">기본정보</h3>
            <div className="grid grid-cols-[1fr_5fr] gap-y-4 p-6 text-sm">
              <span className="font-semibold">아이디</span>
              <span>qwer1234@kakao.com</span>

              <span className="font-semibold">이름</span>
              <span>김숭실</span>

              <span className="font-semibold">학번</span>
              <span>20241234</span>

              <span className="font-semibold">전화번호</span>
              <span>010-1234-5678</span>
            </div>
          </div>
          <div className="pl-16">
            <h3 className="text-lg font-bold">학적정보 - 주전공</h3>
            <div className="grid grid-cols-[1fr_5fr] gap-y-4 p-6 text-sm">
              <span className="mr-9 font-semibold">단과대학</span>
              <span>IT대학</span>

              <span className="mr-10 font-semibold">학과/부</span>
              <span>글로벌미디어학부</span>
            </div>
          </div>
        </>
      )}
      <div className="flex justify-end px-10 pb-10">
        <button className="rounded-sm border border-gray-400 bg-white px-6 py-1 text-center text-gray-700 hover:bg-gray-100 focus:outline-none">
          수정하기
        </button>
      </div>
    </main>
  );
}
