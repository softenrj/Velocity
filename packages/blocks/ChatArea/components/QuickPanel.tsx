"use client"

import { Button } from '@velocity/ui'
import { Bot, Grid2X2Plus, Search, Send } from 'lucide-react'
import React from 'react'

function QuickPanel() {
    return (
        <div className='w-full px-3 flex flex-col gap-2 py-4 bg-background'>
            <Button
                variant="ghost"
                className="group flex items-center justify-start gap-3 w-full px-3 py-2.5 rounded-sm bg-neutral-900 text-white hover:bg-neutral-800 focus:bg-neutral-900 active:bg-neutral-900 transition-all shadow-sm"
            >
                <Send className='w-4 h-4 text-white transition-transform group-hover:translate-x-0.5' />
                <span className='font-lora text-sm font-medium tracking-wide'>New Chat</span>
            </Button>

            <Button
                variant="ghost"
                style={{ backgroundColor: 'transparent' }}
                className="group flex items-center justify-start gap-3 w-full px-3 py-2.5 rounded-sm text-black hover:!bg-black/[0.04] focus:!bg-black/[0.04] active:!bg-black/[0.04] hover:text-black transition-all"
            >
                <Search className='w-4 h-4 text-black transition-colors' />
                <span className='font-lora text-sm font-medium'>Search</span>
            </Button>

            <Button
                variant="ghost"
                style={{ backgroundColor: 'transparent' }}
                className="group flex items-center justify-start gap-3 w-full px-3 py-2.5 rounded-sm text-black hover:!bg-black/[0.04] focus:!bg-black/[0.04] active:!bg-black/[0.04] hover:text-black transition-all"
            >
                <Bot className='w-4 h-4 text-black transition-colors' />
                <span className='font-lora text-sm font-medium'>Automation</span>
            </Button>

            <Button
                variant="ghost"
                style={{ backgroundColor: 'transparent' }}
                className="group flex items-center justify-start gap-3 w-full px-3 py-2.5 rounded-sm text-black hover:!bg-black/[0.04] focus:!bg-black/[0.04] active:!bg-black/[0.04] hover:text-black transition-all"
            >
                <Grid2X2Plus className='w-4 h-4 text-black transition-colors' />
                <span className='font-lora text-sm font-medium'>Customization</span>
            </Button>
        </div>
    )
}

export default QuickPanel