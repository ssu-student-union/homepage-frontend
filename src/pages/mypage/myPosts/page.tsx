import { MyPostsContent } from './myPostsContent/myPostsContent';

function MyPostsPage() {
  return (
    <div className="mt-24">
      <div>
        <h1 className="mb-5 ml-72 text-2xl font-bold">마이페이지</h1>
        <div className="w-full border-b border-[#E7E7E7]"></div>
        <div className="flex flex-row">
          <aside className="my-10 w-64 border-r border-gray-300">
            <div className="p-10 font-bold">
              {/* <h3 className="mb-4 text-lg font-bold text-blue-600">내 정보</h3> */}
              <ul>
                <li className="mb-2 cursor-pointer text-gray-700 hover:text-blue-600">내 정보</li>
                <li className="mb-2 cursor-pointer text-gray-700 hover:text-blue-600">작성 글 보기</li>
                <li className="cursor-pointer text-gray-700 hover:text-blue-600">서비스 공지사항</li>
              </ul>
            </div>
          </aside>
          <div className="flex-grow">
            <div className="mb-16 ml-16 mr-10 mt-16 flex flex-row items-center rounded-lg border-2 border-[#D9D9D9] bg-white p-10">
              <img className="mr-8 h-28 w-28" src="/image/mypage/profile_img.png" alt="profile_default_img" />
              <div>
                <div className="mb-4">
                  <span className="text-xl font-extrabold">김숭실</span>
                  <span className="flex-col gap-1 text-xl font-thin"> | </span>
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
            <div className="mb-[40px]">
              <MyPostsContent boardCode="건의게시판" postId={12345} />
              <MyPostsContent boardCode="건의게시판" postId={13213} />
              <MyPostsContent boardCode="건의게시판" postId={125} />
              <MyPostsContent boardCode="건의게시판" postId={54321} />
              <MyPostsContent boardCode="건의게시판" postId={222} />
              <MyPostsContent boardCode="건의게시판" postId={5658} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPostsPage;
