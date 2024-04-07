import { Endpoint } from "endpoint-client";

// TODO: 추후 명세 확정시 수정
/**
 * POST /auth/oauth
 */
export const PostAuthOAuth: Endpoint<PostAuthOAuthReq, PostAuthOAuthRes> = {
  method: "POST",
  path: "/auth/oauth",
  pathParams: [],
  bodyParams: [],
  queryParams: [],
};
export type PostAuthOAuthReq = Record<string, never>;
export type PostAuthOAuthRes = {
  token: string;
};
