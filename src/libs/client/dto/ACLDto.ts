export class ACLDto {
  id: string;
  target:
    | "everyone"
    | "anonymous"
    | "user"
    | `user:${string}` // userId
    | `group:${string}`; // groupCode
  type: "allow" | "deny";
  action:
    | "list"
    | "read"
    | "edit"
    | "edit_properties"
    | "delete"
    | "comment"
    | "edit_comment_properties"
    | "reaction"
    | "acl_read"
    | "acl_control";
  order: number;

  constructor(data: ACLDto) {
    this.id = data.id;
    this.target = data.target;
    this.type = data.type;
    this.action = data.action;
    this.order = data.order;
  }
}
