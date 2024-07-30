import { Button } from "../ui/button";
import { List, Pencil } from "@phosphor-icons/react";

export function RegisterButton({ ...props }) {
  return (
    <Button variant={"Register"} disabled={false} {...props}>
      <p>등록</p>
    </Button>
  );
}

export function ListButton({ ...props }) {
  return (
    <Button variant={"List_Edit"} {...props}>
      <List />
      <p>목록</p>
    </Button>
  );
}

export function WriteButton({ ...props }) {
  return (
    <Button variant={"Write"} {...props}>
      <Pencil />
      <p>글쓰기</p>
    </Button>
  );
}

export function EditButton({ ...props }) {
  return (
    <Button variant={"List_Edit"} {...props}>
      <Pencil />
      <p>편집</p>
    </Button>
  );
}
