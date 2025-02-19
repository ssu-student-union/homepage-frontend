import { useState } from 'react';
import UserContainer from '../component/UserContainer';
import { MyPostsContent } from './myPostsContent/myPostsContent';

function MyPostsPage() {
  const [searchText, setSearchText] = useState('');

  const onClickSearch = () => {
    console.log(searchText);
  };

  return (
    <div className="flex flex-col">
      <UserContainer />
      <div>
        <div className="mx-16 flex items-center border-b-[1px] border-solid border-gray-500 pb-1">
          <span className="pl-2">작성 글</span>
          <span className="ml-2 text-center font-semibold">45</span>
        </div>
        <MyPostsContent boardCode="건의게시판" postId={12345} />
        <MyPostsContent boardCode="건의게시판" postId={13213} />
        <MyPostsContent boardCode="건의게시판" postId={125} />
        <MyPostsContent boardCode="건의게시판" postId={54321} />
        <MyPostsContent boardCode="건의게시판" postId={222} />
        <MyPostsContent boardCode="건의게시판" postId={5658} />
      </div>
      <div className="my-16 flex justify-center gap-3">
        <input
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          className="w-[40%] rounded-md border border-gray-300 p-3 text-[13px]"
          placeholder="원하시는 키워드를 입력하세요"
        />
        <button onClick={onClickSearch} className="rounded-md bg-[#2F4BF7] px-7 text-[13px] text-white">
          검색
        </button>
      </div>
    </div>
  );
}

export default MyPostsPage;
