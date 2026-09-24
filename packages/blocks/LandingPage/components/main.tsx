// Copyright (c) 2026 Raj
// See LICENSE for details.
"use client"
import React from 'react'
import { Badge } from "@velocity/ui";
import Navbar from './Navbar';

function main() {
    return (
        <div className='relative min-h-screen w-full bg-white overflow-hidden'>
            <div className='bg-background h-4' />
            <div
                className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_top_right,transparent_20%,black_80%)]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 1px)
                    `,
                    backgroundSize: '42px 42px'
                }}
            />

            <Navbar />
        </div>
    )
}

export default main