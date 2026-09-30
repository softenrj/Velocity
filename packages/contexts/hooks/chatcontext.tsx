// Copyright (c) 2026 Raj
// See LICENSE for details.

"use client"

import React from "react";
import { chatContext, IChatContext } from "../context/chatcontext";

export const useChatContext = () => React.useContext<IChatContext>(chatContext);