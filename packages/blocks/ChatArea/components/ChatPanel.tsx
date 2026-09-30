// Copyright (c) 2026 Raj
// See LICENSE for details.

"use client"

import React from 'react'
import QuickPanel from './QuickPanel'
import Repositories from './Repositories'
import UserBar from './UserBar'

function ChatPanel() {
    return (
        <div className='h-full overflow-hidden w-full border-l flex flex-col border-l-black/10'>
            <QuickPanel />

            <div className="bg-black/5 h-px w-5/6 mx-auto" />

            <Repositories />

            <UserBar />

        </div>
    )
}

export default ChatPanel