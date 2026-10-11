
'use client'

// Copyright (c) 2026 Raj
// See LICENSE for details.

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { pngBLogo, testingLab } from '@velocity/assets'
import { ArrowRight } from 'lucide-react'
import { ApiResponse, LOGIN, postApi, REGISTER } from '@velocity/axios'
import toast from 'react-hot-toast'
import { useRouter } from "next/navigation";
import { User } from '../../types/user'

function Main() {
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault()
        setIsLoading(true)

        try {
            const formData = new FormData(event.currentTarget)
            const email = formData.get('email')
            const password = formData.get('password')

            const response = await postApi<ApiResponse<{ user: User, accessToken: string }>>({
                url: LOGIN,
                values: { email, password, rm: rememberMe } as any
            })

            if (response?.success) {
                toast.success(response.message);
                localStorage.setItem("@velocity:auth:accessToken", response.data.accessToken);
                router.replace("/chat")
            }


        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="relative flex h-screen w-full flex-col overflow-hidden bg-white select-none">
            <div className="relative z-20 h-1.5 w-full shrink-0 bg-black" />

            <div className="relative flex h-full w-full flex-1 flex-col overflow-hidden lg:flex-row">
                <div className="relative z-10 flex w-full flex-1 items-center justify-center overflow-y-auto bg-white px-5 py-6 sm:px-12 lg:w-1/2 lg:px-16 lg:py-3 xl:px-24">
                    <div className="my-auto flex w-full max-w-[400px] flex-col justify-center">
                        <Link
                            href="/"
                            className="group mb-4 inline-flex shrink-0 items-center gap-2.5 sm:mb-6"
                        >
                            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-black shadow-sm transition-transform group-hover:scale-105 sm:h-10 sm:w-10">
                                <Image
                                    src={pngBLogo}
                                    fill
                                    alt="Velocity"
                                    sizes="40px"
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                            </div>

                            <div>
                                <p className="mb-1 font-lora text-xl font-bold leading-none tracking-tight text-black sm:text-2xl">
                                    Velocity
                                </p>
                                <p className="text-[10px] font-semibold tracking-wider text-neutral-500">
                                    AUTONOMOUS AI QA ENGINEER
                                </p>
                            </div>
                        </Link>

                        <div className="mb-4 shrink-0 sm:mb-5">
                            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 sm:text-xs">
                                YOUR QA WORKSPACE
                            </p>

                            <h1 className="font-lora text-2xl font-bold leading-tight tracking-tight text-black sm:text-3xl lg:text-4xl">
                                Welcome back.
                            </h1>

                            <p className="mt-1 text-xs leading-relaxed text-neutral-600 sm:text-sm">
                                Your AI testing team is ready. Sign in to continue where you left off.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="shrink-0 space-y-3 sm:space-y-3.5"
                        >
                            <div className="space-y-1">
                                <label
                                    htmlFor="email"
                                    className="block text-xs font-medium text-neutral-800 sm:text-sm"
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
                                    className="h-10 w-full rounded-sm border border-neutral-300 bg-white px-3.5 text-xs text-black shadow-sm outline-none transition placeholder:text-neutral-400 hover:border-neutral-500 focus:border-black focus:ring-1 focus:ring-black sm:h-11 sm:text-sm"
                                />
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-xs font-medium text-neutral-800 sm:text-sm"
                                    >
                                        Password
                                    </label>

                                    <Link
                                        href="/forgot-password"
                                        className="text-xs font-medium text-neutral-600 transition hover:text-black hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        required
                                        className="h-10 w-full rounded-sm border border-neutral-300 bg-white px-3.5 pr-14 text-xs text-black shadow-sm outline-none transition placeholder:text-neutral-400 hover:border-neutral-500 focus:border-black focus:ring-1 focus:ring-black sm:h-11 sm:text-sm"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        className="absolute inset-y-0 right-0 px-3.5 text-xs font-medium text-neutral-500 transition hover:text-black focus:outline-none"
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
                                    onChange={(event) => setRememberMe(event.target.checked)}
                                    className="h-4 w-4 cursor-pointer rounded border-neutral-300 accent-black"
                                />

                                <label
                                    htmlFor="remember"
                                    className="cursor-pointer select-none text-xs text-neutral-600 sm:text-sm"
                                >
                                    Remember me
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group mt-1 flex h-10 cursor-pointer w-full items-center justify-center gap-2.5 rounded-sm bg-black px-4 text-xs font-medium text-white shadow-md transition-all hover:bg-neutral-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:h-11 sm:text-sm"
                            >
                                <span>
                                    {isLoading ? 'Signing in...' : 'Sign in'}
                                </span>

                                {!isLoading && (
                                    <ArrowRight size={16} className='group-hover:translate-x-1 transition-all duration-100 ease-linear' />
                                )}
                            </button>
                        </form>

                        <p className="mt-4 shrink-0 text-center text-xs text-neutral-600 sm:mt-5 sm:text-sm">
                            Don't have an account?{' '}
                            <Link
                                href="/register"
                                className="font-semibold text-black underline decoration-neutral-400 underline-offset-4 transition hover:decoration-black"
                            >
                                Get started
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="relative hidden h-full w-1/2 shrink-0 overflow-hidden bg-white lg:block">
                    <Image
                        src={testingLab}
                        alt="Velocity AI testing workspace"
                        fill
                        priority
                        sizes="50vw"
                        className="absolute inset-0 object-cover object-center"
                    />

                    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/4 bg-gradient-to-r from-white/40 to-transparent" />

                </div>
            </div>

            <div className="relative z-20 h-1.5 w-full shrink-0 bg-black" />
        </main>
    )
}

export default Main
