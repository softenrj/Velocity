// Copyright (c) 2026 Raj
// See LICENSE for details.

"use client"

import { useAuthContext } from '@velocity/contexts'
import { Avatar, AvatarFallback, AvatarImage } from '@velocity/ui'
import { ChevronsUpDown } from 'lucide-react'
import React from 'react'

function UserBar() {
    const { user } = useAuthContext();
    return (
        <div className='w-full px-3 py-2 bg-background'>
            <div className='flex items-center justify-between p-2 rounded-sm hover:!bg-black/[0.04] transition-all cursor-pointer group'>
                <div className='flex items-center gap-3 min-w-0'>
                    <Avatar className='h-7 w-7 shrink-0 rounded-full overflow-hidden'>
                        <AvatarImage
                            src={`https://api.dicebear.com/10.x/initial-face/svg?tags=animation&seed=${user?.username}`}
                            alt={user?.username}
                        />
                        <AvatarFallback className='font-lora text-xs'>{user?.username?.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className='font-lora text-sm font-medium text-black truncate'>
                        {user?.username}
                    </span>
                </div>
                <ChevronsUpDown size={14} className='text-neutral-400 group-hover:text-black shrink-0 transition-colors' />
            </div>
        </div>
    )
}

export default UserBar