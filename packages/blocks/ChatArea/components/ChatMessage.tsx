// Copyright (c) 2026 Raj
// See LICENSE for details.

"use client";

import React, { useState } from "react";
import { FileText, ChevronRight, ChevronDown } from "lucide-react";

export interface FileChange {
    name: string;
    additions?: number;
    deletions?: number;
}

export interface StepItem {
    id?: string;
    type?: "action" | "file";
    action?: string;
    target?: string;
    duration?: string;
    details?: string | React.ReactNode;
    fileChange?: FileChange;
}

export interface ChatMessageProps {
    userPrompt?: string;
    steps?: StepItem[];
    content?: string;
}

/** Parse inline backticks into clean monospace code chips */
function renderFormattedText(text: string) {
    const parts = text.split(/(`[^`]+`)/g);
    return parts.map((part, index) => {
        if (part.startsWith("`") && part.endsWith("`")) {
            return (
                <code
                    key={index}
                    className="bg-neutral-200/60 text-neutral-900 border border-neutral-300/50 px-1.5 py-0.5 rounded text-[13px] font-mono"
                >
                    {part.slice(1, -1)}
                </code>
            );
        }
        return part;
    });
}

export function ChatMessage({ userPrompt, steps = [], content }: ChatMessageProps) {
    const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({});

    const toggleStep = (index: number) => {
        setExpandedSteps((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <div className="w-full max-w-2xl mx-auto font-sans space-y-3 text-neutral-800">
            {userPrompt && (
                <div className="w-full bg-[#f8f8f7] border border-neutral-200/80 rounded-2xl p-3.5 text-[14.5px] leading-relaxed text-neutral-900 shadow-2xs">
                    {userPrompt}
                </div>
            )}

            {steps.length > 0 && (
                <div className="flex flex-col gap-1 px-0.5">
                    {steps.map((step, idx) => {
                        const isExpanded = !!expandedSteps[idx];
                        const hasDetails = Boolean(step.details);

                        if (step.type === "file" || step.fileChange) {
                            const file = step.fileChange;
                            return (
                                <div key={step.id || idx} className="py-0.5">
                                    <div className="inline-flex items-center gap-2 bg-[#f8f8f7] border border-neutral-200/80 rounded-xl px-3 py-1.5 text-xs shadow-2xs font-mono">
                                        <FileText className="w-3.5 h-3.5 text-neutral-500 stroke-[1.75]" />
                                        <span className="font-medium text-neutral-800">{file?.name}</span>
                                        {file?.additions !== undefined && (
                                            <span className="text-emerald-600 font-medium">+${file.additions}</span>
                                        )}
                                        {file?.deletions !== undefined && (
                                            <span className="text-rose-600 font-medium">-${file.deletions}</span>
                                        )}
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div key={step.id || idx} className="flex flex-col">
                                <button
                                    type="button"
                                    onClick={() => hasDetails && toggleStep(idx)}
                                    disabled={!hasDetails}
                                    className={`flex items-center gap-1.5 text-[13.5px] leading-snug py-0.5 text-left w-fit select-none ${hasDetails
                                        ? "cursor-pointer hover:text-neutral-900"
                                        : "cursor-default"
                                        }`}
                                >
                                    {hasDetails && (
                                        <span className="text-neutral-400 -ml-1">
                                            {isExpanded ? (
                                                <ChevronDown className="w-3.5 h-3.5" />
                                            ) : (
                                                <ChevronRight className="w-3.5 h-3.5" />
                                            )}
                                        </span>
                                    )}

                                    <span className="font-medium text-neutral-600">{step.action}</span>

                                    {step.target && (
                                        <span className="text-neutral-400 font-normal font-mono text-[13px]">
                                            {step.target}
                                        </span>
                                    )}

                                    {step.duration && (
                                        <span className="text-neutral-400/80 text-xs font-normal">
                                            {step.duration}
                                        </span>
                                    )}
                                </button>

                                {hasDetails && isExpanded && (
                                    <div className="ml-4 mt-1 mb-1 p-2.5 text-xs font-mono text-neutral-700 whitespace-pre-wrap leading-relaxed overflow-x-auto">
                                        {step.details}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}


            {content && (
                <div className="text-[14px] leading-relaxed text-neutral-800 font-normal space-y-2">
                    {content.split("\n").map((line, i) => (
                        <p key={i}>{renderFormattedText(line)}</p>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ChatMessage;