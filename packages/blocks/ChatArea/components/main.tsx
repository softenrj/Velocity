// Copyright (c) 2026 Raj
// See LICENSE for details.

"use client";

import React from "react";
import ChatBox from "./ChatBox";

function Main() {
  return (
    <div className="flex flex-col h-full overflow-hidden w-full flex-1 font-lora">
      <ChatBox />
      <span className="whitespace-nowrap w-fit mx-auto text-gray-400 font-lora text-[12px] my-2">
        @copyright {new Date().getFullYear()}
      </span>
    </div>
  );
}

export default Main;
