import CommentMark from "@/assets/image/comentMark.svg";

function MyPostsContent() {
  return (
    <div className='ml-[97px] w-[1320px] h-[92px] flex justify-between items-center border-solid border-b-2'>
      <div className='flex gap-[20px] items-center'>
        <div className='ml-[10px] text-[#2F4BF7] text-[18px]'>23423</div>
        <div className='font-[500] text-[18px] text-[#374151]'>[건의게시판] 교수님 종강은 언제하시나요..</div>
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


export default MyPostsContent;