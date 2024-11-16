import { useParams } from "react-router-dom";
import { ServiceNoticeData } from '../MockData';

export function ServiceNoticeDetailPage() {
    const { id } = useParams();
    
    // id에 해당하는 게시글 데이터 찾기
    const post = ServiceNoticeData.data.postListResDto.find((item) => item.postId === Number(id));

    // post가 존재하는 경우 title과 date를 가져오고, 없으면 빈 값으로 처리
    const title = post ? post.title : "게시글을 찾을 수 없습니다.";
    const date = post ? post.date : "";

    return (
        <div className="mt-[200px]">
            <h1>{title}</h1>
            <p>{date}</p>
        </div>
    );
}
