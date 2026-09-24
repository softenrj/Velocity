// Copyright (c) 2026 Raj
// See LICENSE for details.

"use client"

import React from 'react'
import Image from "next/image";
import { svgLogo } from "@velocity/assets";
import { easeOut, motion } from "motion/react";

function Navbar() {
    return (
        <div className='p-2 relative z-1 flex justify-between items-center'>
            <motion.div
                whileHover="hover"
                initial="initial"
                className='flex items-center gap-1 cursor-pointer w-fit'
            >
                <div className='relative w-[3em] h-[3em] shrink-0'>
                    <Image src={svgLogo} alt='velocity' fill className='absolute inset-0' />
                </div>

                <motion.div
                    className="overflow-hidden whitespace-nowrap flex items-center"
                    variants={{
                        initial: { width: "18px" },
                        hover: { width: "110px" }
                    }}
                    transition={{ type: "keyframes", stiffness: 120, damping: 15 }}
                >
                    <motion.p
                        className='text-black text-2xl font-extrabold tracking-wide font-lora origin-left'
                        transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                        Velocity
                    </motion.p>
                </motion.div>
            </motion.div>


            <div className=' flex gap-2'>

                <button className='p-3 bg-black rounded-xs cursor-pointer'>
                    <p className='text-white font-lora'>See Demo</p>
                </button>

                <button className='p-3 border border-black rounded-xs bg-white cursor-pointer'>
                    <p className='text-black font-lora'>Get Started</p>
                </button>
            </div>
        </div>
    )
}

export default Navbar
