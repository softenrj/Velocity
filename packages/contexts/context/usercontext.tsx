// Copyright (c) 2026 Raj
// See LICENSE for details.
"use client"

import React, { use } from "react";
import { User } from "../types/user";
import { ApiResponse, getApi, REFRESH, USER } from "@velocity/axios";
import { useRouter } from "next/navigation";

type AuthStatus = | 'loading' | 'authenticated' | 'unauthenticated'

export interface IAuthContext {
    user: User | null;
    status: AuthStatus;
    initialize: (f?: boolean) => Promise<void>;
    logout: () => Promise<void>;
    logoutAll: () => Promise<void>;
}

export const AuthContext = React.createContext<IAuthContext>({
    user: null, status: "loading", initialize: async () => { }, logout: async () => { }, logoutAll: async () => { }
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = React.useState<User | null>(null)
    const [accessToken, setAccessToken] = React.useState<string | null>(null)
    const [status, setStatus] = React.useState<AuthStatus>('loading')

    const router = useRouter();


    const initialize = React.useCallback(async (f: boolean = false) => {
        setStatus('loading');

        if (!f && (typeof window !== 'undefined' && window.location.href)) {
            const herf = window.location.href.split('/').pop();
            if (herf === "") return;
        }

        try {
            const response = await getApi<ApiResponse<{ accessToken: string }>>({
                url: REFRESH
            });

            if (response?.success) {
                localStorage.setItem("@velocity:auth:accessToken", response.data.accessToken);
                const result = await getApi<ApiResponse<{ user: User }>>({
                    url: USER
                })


                if (result?.success) {
                    setUser(result.data.user);
                    setStatus("authenticated");
                    router.push("/chat");
                } else {
                    setStatus('unauthenticated');
                }

            } else {
                setStatus('unauthenticated');

            }
        } catch (error) {
            setStatus('unauthenticated');
        }
    }, [])

    const logout = React.useCallback(async () => { }, []);
    const logoutAll = React.useCallback(async () => { }, []);

    React.useEffect(() => {
        void initialize();
    }, [initialize])


    return <AuthContext.Provider value={{ user: user, initialize: initialize, logout, logoutAll, status }}>
        {children}
    </AuthContext.Provider>
}