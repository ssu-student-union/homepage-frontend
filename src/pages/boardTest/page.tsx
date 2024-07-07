// import { BoardNavigator } from "@/components/Board/BoardNavigator";
import { BoardSelector } from "@/components/Board/BoardSelector";
import { MainNotices } from "@/components/Board/const";
// import { useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// import { StudentUnion } from "@/components/Board/const";

export function BoardPage() {
  // const { category = "총학생회", subcategory } = useParams();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!subcategory) {
  //     navigate(`/board/${category}/${StudentUnion[category][0]}`, {
  //       replace: true,
  //     });
  //   }
  // }, [category, subcategory, navigate]);

  const handleSelector = (content: string) => {
    console.log(content);
  };

  return (
    <div className="p-4">
      {/* <BoardNavigator categories={Object.keys(StudentUnion)} baseUrl="/board" /> */}
      <BoardSelector
        subcategories={MainNotices}
        baseUrl={`/board`}
        onSelect={handleSelector}
      />
    </div>
  );
}
