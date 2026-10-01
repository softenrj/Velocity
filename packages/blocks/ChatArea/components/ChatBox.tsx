// Copyright (c) 2026 Raj
// See LICENSE for details.

"use client";

import { useChatContext } from '@velocity/contexts';
import { Field, FieldLabel, FieldDescription, Textarea } from '@velocity/ui';
import { ArrowUp, Asterisk, Bug, Plus } from 'lucide-react';
import { AnimatePresence, motion } from "motion/react";

function ChatBox() {
  const { chatBegin, setChatBegin } = useChatContext();

  return (
    <section className=" flex h-full w-full flex-col items-center justify-center">

      <AnimatePresence>
        {!chatBegin && (
          <motion.div
            initial={{ opacity: 1, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              y: -12,
              scale: 0.96,
              filter: "blur(12px)",
            }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute top-[30%] group flex cursor-pointer items-start justify-center"
          >
            <Asterisk
              size={30}
              className="transition-transform duration-300 ease-out group-hover:rotate-90"
            />

            <p className="font-lora text-5xl" onClick={setChatBegin}>
              Velocity
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        layout
        animate={{
          y: chatBegin ? "calc(40vh - 20px)" : "0px",
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`relative z-10 mx-auto w-full  transition-all duration-500 ease-out ${chatBegin
          ? "max-w-xs sm:max-w-md md:max-w-xl lg:max-w-2xl"
          : "max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl"
          }`}
      >
        <AnimatePresence>
          {!chatBegin && (
            <motion.div
              initial={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0, filter: "blur(8px)" }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
              className="overflow-hidden mb-2 px-1"
            >
              <FieldLabel htmlFor="textarea-message" className="text-sm font-medium sm:text-base">
                Agents
              </FieldLabel>

              <FieldDescription className="text-xs text-neutral-500 sm:text-sm">
                Ready to cook!
              </FieldDescription>
            </motion.div>
          )}
        </AnimatePresence>

        <Field>
          <motion.div
            layout
            className="rounded-2xl border border-black/10 bg-secbg p-2 sm:p-3 shadow-xs"
          >
            <Textarea
              id="textarea-message"
              placeholder="Type your Ticket here."
              className="w-full max-h-36 sm:max-h-48 min-h-[44px] resize-none border-none bg-transparent! text-base sm:text-sm thin-scrollbar focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                aria-label="Add attachment"
                className="flex h-8 w-8 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-[#ECECED] transition-colors hover:bg-[#e0e0e1] active:scale-95"
              >
                <Plus size={18} className="text-black/70" />
              </button>

              <button
                type="button"
                aria-label="Send message"
                className="flex h-8 w-8 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-black transition-transform hover:scale-105 active:scale-95"
              >
                <ArrowUp size={18} className="text-white/90" />
              </button>
            </div>
          </motion.div>
        </Field>
      </motion.div>

      <AnimatePresence>
        {!chatBegin && (
          <motion.div
            initial={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 10, filter: "blur(10px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[60%] flex w-[50%] flex-col py-4 items-start gap-1"
          >
            {suggestions.map((suggestion) => (
              <Suggestion
                key={suggestion}
                text={suggestion}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}

export default ChatBox;

const suggestions = [
  "Test user dashboard and Give me Report",
  "Check authentication flow and find bugs",
  "Review API response handling",
];

function Suggestion({ text }: { text: string }) {
  return (
    <button
      type="button"
      className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-all duration-150 hover:bg-black/[0.035] active:scale-[0.99]"
    >
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-black/[0.04]">
        <Bug
          size={13}
          className="text-black/40 transition-colors group-hover:text-black/80"
        />
      </div>

      <span className="font-lora text-[12px] text-black/50 transition-colors group-hover:text-black/80">
        {text}
      </span>
    </button>
  );
}