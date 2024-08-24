import { UseMutationResult } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface DeleteHandlerProps {
  boardCode: string;
  postId: string;
  mutation: UseMutationResult;
}

export const deleteHandler = ({ boardCode, postId, mutation } : DeleteHandlerProps) {
  
  const navigate = useNavigate();

  mutation.mutate({boardCode, postId},{
    onSuccess: () => {
      navigate(-1);
    },
    onError: () => {
      alert('삭제 권한이 없습니다.');
    }
  });

}