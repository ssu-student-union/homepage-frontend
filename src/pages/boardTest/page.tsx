import { BoardHead } from "@/components/Board/BoardHead";
import { BoardNavigator } from "@/components/Board/BoardNavigator";
import { BoardSelector } from "@/components/Board/BoardSelector";
import { Header } from "@/containers/common/Header/Header";
import { useParams } from "react-router-dom";

// const LIST = ["총학생회", "중앙집행위원회", "중앙운영위원회"];

interface ListType {
  [prop: string]: string[];
}
const LIST: ListType = {
  중앙: [
    "전체",
    "조직도",
    "중앙집행위원회",
    "중앙운영위원회",
    "선거관리위원회",
    "동아리연합회",
  ],
  단과대: [
    "전체",
    "경영",
    "경제통상",
    "공과",
    "법과",
    "사회과학",
    "인문",
    "자연과학",
    "IT",
    "융특",
  ],
};

export function BoardTestPage() {
  const { category } = useParams() as { category: string };
  return (
    <div className="relative">
      <Header />
      <BoardHead title="공지사항" subtitle="오늘 총 5개의 공지가 올라왔어요!" />
      <BoardSelector category={Object.keys(LIST)} />
      <BoardNavigator subcategory={Object.values(LIST[category])} />
    </div>
  );
}
