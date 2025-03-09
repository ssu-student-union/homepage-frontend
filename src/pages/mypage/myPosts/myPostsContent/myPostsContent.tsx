import CommentMark from '@/assets/image/comentMark.svg';

interface MyPostsPageProps {
  boardCode: string;
  postId: number;
}
export function MyPostsContent({ boardCode, postId }: MyPostsPageProps) {
  return (
    <div className="mx-16 mt-[14px] flex flex-col border-b-[1px] border-solid border-gray-400 pr-2 text-[14px]">
      <div className="flex cursor-pointer flex-row justify-between xs:flex-col xs:items-end">
        <div className="flex items-center gap-[20px]">
          <div className="ml-[10px] h-[20px] w-[52px] text-[#2F4BF7]">{postId.toString()}</div>
          <div className="text-[#374151]">[{boardCode}] 교수님 종강은 언제하시나요..</div>
        </div>
        <div className="font-[500] text-[#6B7280]">2023/10/02</div>
      </div>
      <div className="mb-[10px] flex flex-col items-end">
        <div className="flex gap-[4px] text-[#2F4BF7]">
          <img src={CommentMark} className="mt-[2px] h-[14px] w-[14px]" />
          32
        </div>
      </div>
    </div>
  );
}
