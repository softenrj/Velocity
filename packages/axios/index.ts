// Copyright (c) 2026 Raj
// See LICENSE for details.

export { deleteApi, getApi, patchApi, postApi } from "./src/common";
export type { ApiResponse } from "./src/common";

// auth
export const LOGIN: string = "/user/auth/login"
export const REGISTER: string = "/user/auth/register"
export const REFRESH: string = "/user/auth/refresh"