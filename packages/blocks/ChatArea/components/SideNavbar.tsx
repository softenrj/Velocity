"use client"

import { svgLogo } from '@velocity/assets'
import Image from 'next/image'
import React from 'react'
import { Cog } from "lucide-react";

function SideNavbar() {
    return (
        <div className='h-full flex flex-col items-center w-12 gap-4'>
            <div className='h-10 w-10 relative'>
                <Image src={svgLogo} alt='logo' className='absolute inset-0 object-cover' fill />
            </div>

            <div className='flex flex-1'></div>

            <div className='py-4'>
                <Cog className='text-black' />
            </div>
        </div>
    )
}

export default SideNavbar