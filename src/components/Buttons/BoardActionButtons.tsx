import { Button } from "../ui/button";
import { List, Pencil } from "@phosphor-icons/react";

export function RegisterButton() {
  return (
    <Button variant={"Register"} disabled={false}>
      <p>등록</p>
    </Button>
  );
}

export function ListButton() {
  return (
    <Button variant={"List_Edit"}>
      <List />
      <p>목록</p>
    </Button>
  );
}

export function WriteButton() {
  return (
    <Button variant={"Write"}>
      <Pencil />
      <p>글쓰기</p>
    </Button>
  );
}

export function EditButton() {
  return (
    <Button variant={"List_Edit"}>
      <Pencil />
      <p>편집</p>
    </Button>
  );
}
