import { Endpoint } from "endpoint-client";
import { UserDto } from "../../dto";

/**
 * GET /users
 */
export const ListUsers: Endpoint<ListUsersReq, ListUsersRes> = {
  method: "GET",
  path: "/users",
  pathParams: [],
  bodyParams: [],
  queryParams: ["page", "take"],
};
export type ListUserReqQuery = {
  page?: number;
  take?: number;
};
export type ListUsersReq = ListUserReqQuery;
export type ListUsersRes = {
  users: UserDto[];
  total: number;
};

/**
 * GET /users/:userId
 */
export const GetUser: Endpoint<GetUserReq, GetUserRes> = {
  method: "GET",
  path: (e) => `/users/${e.userId}`,
  pathParams: ["userId"],
  bodyParams: [],
  queryParams: [],
};
export type GetUserReqPath = {
  userId: string | "me";
};
export type GetUserReq = GetUserReqPath;
export type GetUserRes = {
  user: UserDto;
};

/**
 * PATCH /users/:userId
 */
export const EditUser: Endpoint<EditUserReq, EditUserRes> = {
  method: "PATCH",
  path: (e) => `/users/${e.userId}`,
  pathParams: ["userId"],
  bodyParams: ["profileImage"],
  queryParams: [],
};
export type EditUserReqPath = {
  userId: string | "me";
};
export type EditUserReqBody = {
  profileImage?: string;
};
export type EditUserReq = EditUserReqPath & EditUserReqBody;
export type EditUserRes = {
  user: UserDto;
};

/**
 * DELETE /users/:userId
 */
export const DeleteUser: Endpoint<DeleteUserReq, DeleteUserRes> = {
  method: "DELETE",
  path: (e) => `/users/${e.userId}`,
  pathParams: ["userId"],
  bodyParams: [],
  queryParams: [],
};
export type DeleteUserReqPath = {
  userId: string;
};
export type DeleteUserReq = DeleteUserReqPath;
export type DeleteUserRes = {
  user: UserDto;
};
