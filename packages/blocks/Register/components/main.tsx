'use client'

// Copyright (c) 2026 Raj
// See LICENSE for details.

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { pngBLogo, testingLab } from '@velocity/assets'

function Main() {
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault()
        setIsLoading(true)

        try {
            const formData = new FormData(event.currentTarget)
            const username = formData.get('username')
            const email = formData.get('email')
            const password = formData.get('password')

            console.log({ username, email, password, rememberMe })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="relative flex h-screen w-full flex-col overflow-hidden bg-white select-none">
            <div className="relative z-20 h-1.5 w-full bg-black shrink-0" />

            <div className="relative flex flex-1 flex-col lg:flex-row w-full h-full overflow-hidden">
                <div className="relative flex flex-1 items-center justify-center w-full lg:w-1/2 px-5 sm:px-12 lg:px-16 xl:px-24 py-3 bg-white z-15 overflow-hidden">
                    <div className="w-full max-w-[400px] flex flex-col justify-center h-full">
                        <Link
                            href="/"
                            className="mb-4 sm:mb-6 inline-flex items-center gap-2.5 group shrink-0"
                        >
                            <div className="flex h-9 w-9 sm:h-10 sm:w-10 relative items-center justify-center bg-black rounded-sm overflow-hidden shadow-sm transition-transform group-hover:scale-105 shrink-0">
                                <Image src={pngBLogo} fill className='absolute inset-0 w-full h-full object-cover' alt='velocity' />
                            </div>

                            <div>
                                <p className="font-lora text-xl sm:text-2xl font-bold tracking-tight text-black leading-none mb-1">
                                    Velocity
                                </p>
                                <p className="text-[10px] tracking-wider text-neutral-500 font-semibold">
                                    AUTONOMOUS AI QA ENGINEER
                                </p>
                            </div>
                        </Link>

                        <div className="mb-4 sm:mb-6 shrink-0">
                            <p className="mb-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
                                YOUR QA WORKSPACE
                            </p>

                            <h1 className="font-lora text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-black leading-tight">
                                Create account.
                            </h1>

                            <p className="mt-1 text-xs sm:text-sm leading-relaxed text-neutral-600">
                                Your AI testing team is ready. Get started today.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-3 sm:space-y-3.5 shrink-0"
                        >
                            <div className="space-y-1">
                                <label
                                    htmlFor="username"
                                    className="block text-xs sm:text-sm font-medium text-neutral-800"
                                >
                                    Username
                                </label>

                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    placeholder="johndoe"
                                    required
                                    className="h-10 sm:h-11 w-full rounded-sm border border-neutral-300 bg-white px-3.5 text-xs sm:text-sm text-black outline-none transition placeholder:text-neutral-400 hover:border-neutral-500 focus:border-black focus:ring-1 focus:ring-black shadow-sm"
                                />
                            </div>

                            <div className="space-y-1">
                                <label
                                    htmlFor="email"
                                    className="block text-xs sm:text-sm font-medium text-neutral-800"
                                >
                                    Email address
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="you@company.com"
                                    required
                                    className="h-10 sm:h-11 w-full rounded-sm border border-neutral-300 bg-white px-3.5 text-xs sm:text-sm text-black outline-none transition placeholder:text-neutral-400 hover:border-neutral-500 focus:border-black focus:ring-1 focus:ring-black shadow-sm"
                                />
                            </div>

                            <div className="space-y-1">
                                <label
                                    htmlFor="password"
                                    className="block text-xs sm:text-sm font-medium text-neutral-800"
                                >
                                    Password
                                </label>

                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="new-password"
                                        placeholder="Create a password"
                                        required
                                        className="h-10 sm:h-11 w-full rounded-sm border border-neutral-300 bg-white px-3.5 pr-14 text-xs sm:text-sm text-black outline-none transition placeholder:text-neutral-400 hover:border-neutral-500 focus:border-black focus:ring-1 focus:ring-black shadow-sm"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute inset-y-0 right-0 px-3.5 text-xs font-medium text-neutral-500 transition hover:text-black focus:outline-none"
                                        aria-label={
                                            showPassword
                                                ? 'Hide password'
                                                : 'Show password'
                                        }
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-0.5">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(event) =>
                                        setRememberMe(event.target.checked)
                                    }
                                    className="h-4 w-4 rounded border-neutral-300 cursor-pointer accent-black"
                                />

                                <label
                                    htmlFor="remember"
                                    className="cursor-pointer text-xs sm:text-sm text-neutral-600 select-none"
                                >
                                    Remember me
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group flex h-10 sm:h-11 w-full items-center justify-center gap-2.5 rounded-sm bg-black px-4 text-xs sm:text-sm font-medium text-white transition-all hover:bg-neutral-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 shadow-md mt-1"
                            >
                                <span>
                                    {isLoading ? 'Creating account...' : 'Get started'}
                                </span>

                                {!isLoading && (
                                    <svg
                                        viewBox="0 0 20 20"
                                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                                        fill="none"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M4 10H16M10 4L16 10L10 16"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                )}
                            </button>
                        </form>

                        <p className="mt-4 sm:mt-5 text-center text-xs sm:text-sm text-neutral-600 shrink-0">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="font-semibold text-black underline decoration-neutral-400 underline-offset-4 transition hover:decoration-black"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="relative hidden lg:block w-1/2 h-full overflow-hidden bg-neutral-900 shrink-0">
                    <Image
                        src={testingLab}
                        alt="Velocity AI testing workspace"
                        fill
                        priority
                        sizes="50vw"
                        className="absolute inset-0 object-cover object-center"
                    />

                    <div className="pointer-events-none absolute bottom-8 right-8 z-10 text-right xl:block">
                        <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/80 drop-shadow-md">
                            Autonomous testing. Intelligent results.
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative z-20 h-1.5 w-full bg-black shrink-0" />
        </main>
    )
}

export default Main