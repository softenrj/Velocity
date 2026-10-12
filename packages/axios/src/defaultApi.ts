// Copyright (c) 2026 Raj
// See LICENSE for details.

import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

const BASE_API_URL = process.env.BASE_API_URL ?? "http://localhost:8000/api/v1";

const defaultApi = axios.create({ baseURL: BASE_API_URL, withCredentials: true });
let unauthorizedRedirectScheduled = false;

type RetriableRequestConfig = InternalAxiosRequestConfig & {
    _retry?: boolean;
};

type RefreshResponse = {
    success: boolean;
    data?: {
        accessToken?: string;
    };
};

let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = (): Promise<string> => {
    if (!refreshPromise) {
        refreshPromise = axios
            .post<RefreshResponse>(`${BASE_API_URL}/user/auth/refresh`, null, { withCredentials: true })
            .then(({ data }) => {
                const accessToken = data.data?.accessToken;
                if (!data.success || !accessToken) {
                    throw new Error("Refresh endpoint did not return an access token.");
                }

                localStorage.setItem("@velocity:auth:accessToken", accessToken);
                return accessToken;
            })
            .finally(() => {
                refreshPromise = null;
            });
    }

    return refreshPromise;
};

const isAuthEndpoint = (url?: string): boolean =>
    url?.includes("/user/auth/login") === true ||
    url?.includes("/user/auth/register") === true ||
    url?.includes("/user/auth/refresh") === true;


const getErrorMessage = (error: AxiosError<unknown>): string => {
    const responseData = error.response?.data;

    if (typeof responseData === "string" && responseData.trim()) {
        return responseData;
    }

    if (typeof responseData === "object" && responseData !== null) {
        if ("message" in responseData && typeof responseData.message === "string") {
            return responseData.message;
        }
        if ("error" in responseData && typeof responseData.error === "string") {
            return responseData.error;
        }
    }

    if (!error.response) {
        return "Unable to reach the server. Check your connection and try again.";
    }

    return error.message || "The request failed. Please try again.";
};

const isPublicAuthPage = (): boolean => {
    if (typeof window === "undefined") return false;

    const pathname = window.location.pathname.replace(/\/+$/, "") || "/";

    return pathname === "/login" || pathname === "/register";
};


defaultApi.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("@velocity:auth:accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

defaultApi.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error: AxiosError) => {
        const isUnauthorized = error.response?.status === 401;
        const originalRequest = error.config as RetriableRequestConfig | undefined;

        if (
            isUnauthorized &&
            originalRequest &&
            !originalRequest._retry &&
            !isAuthEndpoint(originalRequest.url) &&
            typeof window !== "undefined"
        ) {
            originalRequest._retry = true;

            try {
                const accessToken = await refreshAccessToken();
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return await defaultApi(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem("@velocity:auth:accessToken");

                const currentPage = window.location.pathname.split("/").pop();
                if (currentPage !== "login" && currentPage !== "register") {
                    toast.error(
                        axios.isAxiosError(refreshError)
                            ? getErrorMessage(refreshError)
                            : refreshError instanceof Error
                                ? refreshError.message
                                : "Unable to refresh your session."
                    );

                    if (!unauthorizedRedirectScheduled) {

                        unauthorizedRedirectScheduled = true;
                        window.location.href = "/";
                    }
                }

                return Promise.reject(refreshError);
            }
        }

        if (isUnauthorized && typeof window !== "undefined") {
            const isAuthPage = isPublicAuthPage();

            if (isAuthEndpoint(originalRequest?.url) || isAuthPage) {
                return Promise.reject(error);
            }

            localStorage.removeItem("@velocity:auth:accessToken");

            if (!unauthorizedRedirectScheduled) {
                unauthorizedRedirectScheduled = true;
                window.location.href = "/login";
            }
        }

        if (typeof window !== 'undefined') {
            const currentPage = window.location.pathname.split('/').pop();
            if (currentPage !== 'login' && currentPage !== 'register') {
                toast.error(getErrorMessage(error));
            }
        }

        return Promise.reject(error);
    }
);

export default defaultApi