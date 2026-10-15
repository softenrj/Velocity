// Copyright (c) 2026 Raj
// See LICENSE for details.

"use client"

import { Repositories } from "../types/chat";
import React from "react";

export interface IChatContext {
    chatId?: string | null;
    setChatId: (id: string) => void;
    prompt: string;
    setPrompt: (prompt: string) => void;
    chatBegin: boolean;
    setChatBegin: (state: boolean) => void;
    repositorie: Repositories | null;
    setRepositorie: (repositorie: Repositories) => void;
}

export const chatContext = React.createContext<IChatContext>({
    chatId: null,
    setChatId: () => { },
    prompt: "",
    setPrompt: () => { },
    chatBegin: false,
    setChatBegin: () => { },
    repositorie: null,
    setRepositorie: () => { }
})

export function ChatContextProvider({ children }: { children: React.ReactNode }) {
    const [chatBegin, setChatBegin] = React.useState<boolean>(false);
    const [chatId, setChatId] = React.useState<string | null>(null);
    const [prompt, setPrompt] = React.useState<string>("");
    const [repositorie, setRepositorie] = React.useState<Repositories | null>(null);

    const handleChatBegin = React.useCallback((state: boolean) => setChatBegin(state), []);
    const handleChatId = React.useCallback((id: string) => setChatId(id), []);
    const handlePrompt = React.useCallback((prompt: string) => setPrompt(prompt), []);
    const handleRepositorie = React.useCallback((repositorie: Repositories) => setRepositorie(repositorie), []);

    return (
        <chatContext.Provider value={{
            chatId, setChatId: handleChatId, prompt, setPrompt: handlePrompt, chatBegin, setChatBegin: handleChatBegin, repositorie, setRepositorie
        }}>
            {children}
        </chatContext.Provider>
    )
} 