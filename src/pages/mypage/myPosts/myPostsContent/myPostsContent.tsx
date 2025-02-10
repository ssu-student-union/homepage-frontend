import CommentMark from '@/assets/image/comentMark.svg';

interface MyPostsPageProps {
  boardCode: string;
  postId: number;
}
export function MyPostsContent({ boardCode, postId }: MyPostsPageProps) {
  return (
    <div className="ml-24 flex h-[92px] w-[1320px] cursor-pointer items-center justify-between border-b-2 border-solid">
      <div className="flex items-center gap-[20px]">
        <div className="ml-[10px] h-[20px] w-[52px] text-[18px] text-[#2F4BF7]">{postId.toString()}</div>
        <div className="text-[18px] font-[500] text-[#374151]">[{boardCode}] 교수님 종강은 언제하시나요..</div>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-[18px] font-[500] text-[#6B7280]">2023/10/02</div>
        <div className="flex gap-[6px] text-[18px] font-[500] text-[#2F4BF7]">
          <img src={CommentMark} /> 32
        </div>
      </div>
    </div>
  );
}
