// Copyright (c) 2026 Raj
// See LICENSE for details.

"use client";

import React from "react";
import ChatBox from "./ChatBox";
import { motion } from "motion/react";
import ChatMessage from "./ChatMessage";
import { useChatContext } from "@velocity/contexts";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChatServices } from "../service/chat";
import { Asterisk } from "lucide-react";

function Main({ chatId }: { chatId?: string }) {
  const { chatBegin, setChatId, prompt, setRepositorie, repositorie, setChatBegin } = useChatContext();
  const [chat, setChat] = React.useState([]);
  const [sseJobId, setSseJobId] = React.useState<string | null>(null);
  const router = useRouter();

  const { mutate: sendChat, isPending } = useMutation({
    mutationKey: ["chat", chatId],
    mutationFn: (currentPrompt: string) =>
      ChatServices.chat(currentPrompt, chatId || repositorie?._id),
    onSuccess: (data) => {
      if (!data) return;

      if (data.repositorie) {
        setRepositorie(data.repositorie);
        setChatId(data.repositorie._id);
        router.replace(`/chat/${data.repositorie._id}`);
      }

      if (data.jobId) {
        setSseJobId(data.jobId);
        setChatBegin(true);
      }
    }
  });

  React.useEffect(() => {
    if (chatId) setChatId(chatId);
  }, [chatId, setChatId]);

  return (
    <div className="flex flex-col h-full relative overflow-hidden w-full flex-1 font-lora">
      {chatBegin && (
        <div
          className="flex hide-sb flex-col overflow-auto absolute z-1 left-[10%] right-[10%] top-[5%] py-8 h-[76%] pr-2 space-y-6 [mask-image:linear-gradient(to_bottom,transparent_0%,black_6%,black_94%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_6%,black_94%,transparent_100%)]"
        >
          {/* {MOCK_CHAT_MESSAGES.map((msg, idx) => (
            <ChatMessage
              userPrompt={msg.userPrompt}
              steps={msg.steps}
              content={msg.content}
            />
          ))} */}
        </div>
      )}
      <ChatBox sendChat={sendChat} />
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