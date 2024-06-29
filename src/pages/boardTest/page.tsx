import { BoardHead } from "@/components/Board/BoardHead";
import { Header } from "@/containers/common/Header/Header";

export function BoardTestPage() {
  return (
    <div>
      <Header />
      <BoardHead title="총학생회" subtitle="제64대 총학생회 US:SUM" />;
    </div>
  );
}
