// Copyright (c) 2026 Raj
// See LICENSE for details.

import defaultApi from "./defaultApi";


type ApiRequest = {
    url: string;
    params?: Record<string, string | number>,
    values?: Record<string, string | number | undefined | FormData>
}

export type ApiResponse<T> = {
    success: boolean;
    data: T;
    message: string;
}

const handleApiError = (err: any) => {
    const errorMessage = err?.response?.data?.error || "An error occurred.";
    console.log(err);

    return err?.response?.data || { error: errorMessage };
};

export const getApi = async <T>({ url, params }: ApiRequest): Promise<T | undefined> => {
    try {
        let apiUrl = url;

        if (params) {
            const queryString = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                queryString.append(key, String(value));
            })

            apiUrl += `?${queryString.toString()}`;
        }


        const response = await defaultApi.get<T>(url);
        return response.data;
    } catch (error) {
        return handleApiError(error);
    }
}

export const postApi = async <T>({
    url,
    values
}: ApiRequest): Promise<T | undefined> => {
    try {
        const response = await defaultApi.post<T>(url, values)
        return response.data
    } catch (err) {
        return handleApiError(err)
    }
}

export const patchApi = async <T>({
    url,
    values
}: ApiRequest): Promise<T | undefined> => {
    try {
        const response = await defaultApi.patch<T>(url, values)
        return response.data
    } catch (err) {
        return handleApiError(err)
    }
}

export const deleteApi = async <T>({
    url,
    params,
}: ApiRequest): Promise<T | undefined> => {
    try {
        let apiUrl = url;

        // Append query parameters if provided
        if (params) {
            const queryString = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                queryString.append(key, String(value));
            });
            apiUrl += `?${queryString.toString()}`;
        }

        const response = await defaultApi.delete<T>(apiUrl);
        return response.data;
    } catch (err) {
        return handleApiError(err);
    }
}