export default function UserContainer() {
  return (
    // props ? api ?
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
    </>
  );
}
