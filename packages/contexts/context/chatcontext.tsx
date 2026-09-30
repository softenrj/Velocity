// Copyright (c) 2026 Raj
// See LICENSE for details.

"use client"

import React from "react";

export interface IChatContext {
    chatBegin: boolean;
    setChatBegin: () => void;
}

export const chatContext = React.createContext<IChatContext>({
    chatBegin: false,
    setChatBegin: () => {}
})

export function ChatContextProvider({children}: { children: React.ReactNode}) {
    const [chatBegin, setChatBegin] = React.useState<boolean>(false);

    const handleChatBegin = React.useCallback(() => setChatBegin((prev) => !prev),[]);

    return (
        <chatContext.Provider value={{
            chatBegin, setChatBegin: handleChatBegin
        }}>
            {children}
        </chatContext.Provider>
    )
} 