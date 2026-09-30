// Copyright (c) 2026 Raj
// See LICENSE for details.

"use client"

import React from 'react'
import Main from "./components/main";
import SideNavbar from './components/SideNavbar';
import ChatPanel from './components/ChatPanel';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@velocity/ui';
import { ChatContextProvider } from "@velocity/contexts";

function index({ chatId }: { chatId?: string }) {
    return (
        <div className='h-screen w-full bg-background flex flex-col overflow-hidden'>
            <div className='bg-black h-4 shrink-0' />
            <ChatContextProvider>
                <section className='flex flex-1 min-h-0 w-full'>

                <SideNavbar />

                <ResizablePanelGroup>
                    <ResizablePanel maxSize={"24%"} minSize={"12%"} defaultSize={"20%"}>
                        <ChatPanel />
                    </ResizablePanel>

                    <ResizableHandle className='bg-black/10 w-px' />

                    <ResizablePanel>
                        <Main />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </section>
            </ChatContextProvider>
        </div>
    )
}

export default index