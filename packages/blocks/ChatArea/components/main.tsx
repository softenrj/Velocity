// Copyright (c) 2026 Raj
// See LICENSE for details.

"use client";

import React from "react";
import { Field, FieldDescription, FieldLabel, Textarea } from "@velocity/ui";
import { ArrowUp, Asterisk, Bug, Plus } from "lucide-react";

const suggestions = [
  "Test user dashboard and Give me Report",
  "Check authentication flow and find bugs",
  "Review API response handling",
];

function Suggestion({ text }: { text: string }) {
  return (
    <button type="button"
      className=" group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left transition-all duration-150 hover:bg-black/[0.035] active:scale-[0.99]"
    >
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-black/[0.04]" >
        <Bug size={13} className=" text-black/40 transition-colors group-hover:text-black/80 " />
      </div>

      <span className=" font-lora text-[12px] text-black/50 transition-colors group-hover:text-black/80" >
        {text}
      </span>
    </button>
  );
}

function Main() {
  return (
    <div className="flex h-full min-h-screen w-full flex-1 font-lora">
      <section className="flex h-full w-full flex-col items-center justify-center gap-10">
        <div className="group flex cursor-pointer items-start justify-center">
          <Asterisk size={30} className=" transition-all duration-200 ease-in-out group-hover:rotate-90" />

          <p className="font-lora text-5xl">Velocity</p>
        </div>

        <Field className="w-[50%]">
          <FieldLabel htmlFor="textarea-message">
            Agents
          </FieldLabel>

          <FieldDescription>
            Ready to cook!
          </FieldDescription>

          <div className=" rounded-xl border border-black/10 bg-white p-2">
            <Textarea id="textarea-message" placeholder="Type your Ticket here." className=" max-h-48 resize-none border-none thin-scrollbar focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" />

            <div className="flex items-center justify-between pt-1">
              <button type="button" className=" flex h-7 w-7 items-center justify-center rounded-full bg-[#ECECED] transition-colors hover:bg-[#e0e0e1]">
                <Plus size={17} className="text-black/70" />
              </button>

              <button type="button" className=" flex h-7 w-7 items-center justify-center rounded-full bg-black transition-transform hover:scale-105 active:scale-95">
                <ArrowUp
                  size={17}
                  className="text-white/90"
                />
              </button>
            </div>
          </div>
        </Field>

        <div className="flex w-[50%] flex-col items-start gap-1">
          {suggestions.map((suggestion) => (
            <Suggestion
              key={suggestion}
              text={suggestion}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Main;