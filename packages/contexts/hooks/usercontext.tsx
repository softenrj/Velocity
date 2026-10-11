// Copyright (c) 2026 Raj
// See LICENSE for details.

"use client"

import React from "react";
import { AuthContext, IAuthContext } from "../context/usercontext";

export const useAuthContext = () => React.useContext<IAuthContext>(AuthContext);