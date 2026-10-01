// Copyright (c) 2026 Raj
// See LICENSE for details.

"use client";

import React from "react";
import ChatBox from "./ChatBox";
import { motion } from "motion/react";
import ChatMessage from "./ChatMessage";
import { useChatContext } from "@velocity/contexts";

function Main() {
  const { chatBegin } = useChatContext();
  return (
    <div className="flex flex-col h-full relative overflow-hidden w-full flex-1 font-lora">
      {chatBegin && (
        <div
          className="flex hide-sb flex-col overflow-auto absolute z-1 left-[10%] right-[10%] top-[5%] py-8 h-[76%] pr-2 space-y-6 [mask-image:linear-gradient(to_bottom,transparent_0%,black_6%,black_94%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_6%,black_94%,transparent_100%)]"
        >
          {MOCK_CHAT_MESSAGES.map((msg, idx) => (
            <ChatMessage
              userPrompt={msg.userPrompt}
              steps={msg.steps}
              content={msg.content}
            />
          ))}
        </div>
      )}
      <ChatBox />
      <span className="whitespace-nowrap w-fit mx-auto text-gray-400 font-lora text-[12px] my-2">
        @copyright {new Date().getFullYear()}
      </span>

      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-5 bottom-5 z-2"
      >
        <Asterisk size={30} />
      </motion.div>
    </div>
  );
}

export default Main;


import { ChatMessageProps } from "./ChatMessage";
import { Asterisk } from "lucide-react";

export const MOCK_CHAT_MESSAGES: ChatMessageProps[] = [

  {
    userPrompt: "let's build a mission control interface, similar to the expose-style window manager on macOS",
    steps: [
      {
        action: "Thought",
        duration: "4s",
        details: "Analyzed existing macOS Expose window manager layout specs. Determined that a grid-based CSS layout with Framer Motion transforms will yield the smoothest window scaling animation.",
      },
      { action: "Read", target: "src/components/AppManager.tsx" },
      { action: "Searched", target: "expose patterns and layout grid" },
      {
        type: "file",
        fileChange: { name: "feature-prd.md", additions: 68, deletions: 2 },
      },
    ],
    content: `Drafted implementation steps in \`feature-prd.md\`.
A few quick questions before I start building:`,
  },

  {
    userPrompt: "Build the agentic chat UI with streaming messages interleaved with tool-call rows",
    steps: [
      {
        action: "Read",
        target: "ChatPanel.tsx",
        details: "Checking existing props interface for streaming handlers and turn event order.",
      },
      {
        action: "Grep",
        target: "streaming + tool-call interleave",
        details: "Found 3 references across `useChat.ts` and `MessageStore.ts`.",
      },
      {
        action: "Explorer",
        target: "Map turn event types and rendering order",
        details: "Mapping event sequence:\n1. USER_PROMPT\n2. THOUGHT_CHUNK\n3. TOOL_CALL\n4. FILE_DELTA\n5. RESPONSE_STREAM",
      },
      {
        action: "Designer",
        target: "Tool-call row expand/collapse animation",
      },
      {
        type: "file",
        fileChange: { name: "src/components/ChatMessage.tsx", additions: 124, deletions: 45 },
      },
    ],
    content: "On it. I'll build the streaming chat renderer with collapsible tool-call rows, wire in sub-agent role chips, and add the composer with slash commands and model switching.",
  },

  {
    userPrompt: "Check if the build is passing in CI",
    steps: [
      {
        action: "Executed",
        target: "pnpm run typecheck",
        duration: "1.2s",
        details: "✓ 0 errors found across 42 files.",
      },
    ],
    content: "All TypeScript checks passed clean!",
  },
];