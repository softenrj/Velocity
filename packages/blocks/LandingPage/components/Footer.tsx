// Copyright (c) 2026 Raj
// See LICENSE for details.

"use client"

import React from 'react'

function Footer() {
    return (
        <div className="bg-black flex h-4 w-full items-center justify-center">
            <p className="font-lora text-[8px] text-white">
                {new Date().toISOString()}
            </p>
        </div>
    )
}

export default Footer