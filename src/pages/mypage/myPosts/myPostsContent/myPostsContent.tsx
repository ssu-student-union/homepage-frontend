import CommentMark from "@/assets/image/comentMark.svg";

interface MyPostsPageProps {
  boardCode: string;
  postId: Number;
}
export function MyPostsContent({boardCode, postId}: MyPostsPageProps) {
  return (
    <div className='ml-24 w-[1320px] h-[92px] flex justify-between items-center border-solid border-b-2 cursor-pointer'>
      <div className='flex gap-[20px] items-center'>
        <div className='ml-[10px] text-[#2F4BF7] text-[18px] w-[52px] h-[20px]'>{postId.toString()}</div>
        <div className='font-[500] text-[18px] text-[#374151]'>[{boardCode}] 교수님 종강은 언제하시나요..</div>
      </div>
      <div className='flex flex-col items-end'>
        <div className='font-[500] text-[18px] text-[#6B7280]'>
          2023/10/02
        </div>
        <div className='text-[#2F4BF7] flex gap-[6px] font-[500] text-[18px]'>
          <img src={CommentMark} /> 32
        </div>
      </div>
    </div>
  )
}