import { EndpointClient } from "endpoint-client";
import {
  DeleteUser,
  EditUser,
  GetUser,
  ListUsers,
  PostAuthOAuth,
} from "./endpoint";

export class UnionClient extends EndpointClient {
  readonly postAuthOAuth = this.endpointBuilder(PostAuthOAuth);

  readonly listUsers = this.endpointBuilder(ListUsers);
  readonly getUser = this.endpointBuilder(GetUser);
  readonly editUser = this.endpointBuilder(EditUser);
  readonly deleteUser = this.endpointBuilder(DeleteUser);
}

export const client = new UnionClient({
  baseUrl: import.meta.env.VITE_API_URL,
  auth: localStorage.getItem("token") || "",
});
