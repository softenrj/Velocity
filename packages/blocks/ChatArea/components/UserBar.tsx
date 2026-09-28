"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@velocity/ui'
import { ChevronsUpDown } from 'lucide-react'
import React from 'react'

function UserBar() {
    return (
        <div className='w-full px-3 py-2 bg-white'>
            <div className='flex items-center justify-between p-2 rounded-sm hover:!bg-black/[0.04] transition-all cursor-pointer group'>
                <div className='flex items-center gap-3 min-w-0'>
                    <Avatar className='h-7 w-7 shrink-0 rounded-full overflow-hidden'>
                        <AvatarImage
                            src="https://api.dicebear.com/10.x/initial-face/svg?tags=animation&seed=m65lv7dy"
                            alt="Raj Sharma"
                        />
                        <AvatarFallback className='font-lora text-xs'>RS</AvatarFallback>
                    </Avatar>
                    <span className='font-lora text-sm font-medium text-black truncate'>
                        Raj Sharma
                    </span>
                </div>
                <ChevronsUpDown size={14} className='text-neutral-400 group-hover:text-black shrink-0 transition-colors' />
            </div>
        </div>
    )
}

export default UserBar