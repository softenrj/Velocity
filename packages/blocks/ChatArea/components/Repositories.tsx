"use client"

import { Archive, ChevronDown, Dot, FolderPlus, ListFilter, Pin } from 'lucide-react'
import React from 'react'

function Repositories() {
    return (
        <div className='w-full px-3 py-3 flex flex-col flex-1 h-full min-h-0 bg-white'>
            <div className='flex justify-between items-center px-2 mb-1 shrink-0'>
                <span className='text-black font-lora text-xs font-medium tracking-wide'>Repositories</span>

                <div className='flex gap-1 items-center'>
                    <button className='p-1 rounded-sm text-black hover:!bg-black/[0.04] active:scale-95 transition-all'>
                        <ListFilter size={13} />
                    </button>
                    <button className='p-1 rounded-sm text-black hover:!bg-black/[0.04] active:scale-95 transition-all'>
                        <FolderPlus size={13} />
                    </button>
                </div>
            </div>

            <div className='flex flex-col gap-0.5 flex-1 min-h-0 overflow-y-auto pr-1 thin-scrollbar'>
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className='group flex items-center justify-between px-1.5 py-1.5 rounded-sm hover:!bg-black/[0.04] transition-all cursor-pointer'
                    >
                        <div className='flex items-center min-w-0 pr-2'>
                            <Dot className='text-[#2e6df7] shrink-0 -ml-1' size={24} />
                            <span className='text-black font-lora text-[12px] truncate font-normal'>
                                Validate Users Dashboard page based on the metadata
                            </span>
                        </div>

                        <div className='flex items-center shrink-0 pl-1'>
                            <span className='text-[11px] font-lora text-neutral-400 group-hover:hidden'>
                                3d
                            </span>
                            <div className='hidden group-hover:flex items-center gap-0.5'>
                                <button className='p-1 rounded-sm text-neutral-500 hover:text-black hover:!bg-black/[0.06] transition-all'>
                                    <Pin size={12} />
                                </button>
                                <button className='p-1 rounded-sm text-neutral-500 hover:text-black hover:!bg-black/[0.06] transition-all'>
                                    <Archive size={12} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button className='-mb-2 px-2.5 text-neutral-500 hover:text-black font-lora text-[12px] mx-auto rounded-sm hover:!bg-black/[0.04] transition-all shrink-0 flex items-center gap-1 cursor-pointer'>
                <span>more</span>
                <ChevronDown size={12} />
            </button>
        </div>
    )
}

export default Repositories