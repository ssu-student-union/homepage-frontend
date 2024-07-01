import { BoardHead } from "@/components/Board/BoardHead";
import { BoardSelector } from "@/components/Board/BoardSelector";
import { Header } from "@/containers/common/Header/Header";
// import { useParams } from "react-router-dom";

// const LIST = ["총학생회", "중앙집행위원회", "중앙운영위원회"];
const LIST = ["중앙", "단과대"];

export function BoardTestPage() {
  // const { category } = useParams() as { category: string };

  return (
    <div>
      <Header />
      <BoardHead title="공지사항" subtitle="오늘 총 5개의 공지가 올라왔어요!" />
      <BoardSelector category={LIST} />
    </div>
  );
}
