// Copyright (c) 2026 Raj
// See LICENSE for details.

import { Repositories } from "@velocity/database"

export class InitializeChat {
    public static initilize = async (userId: string, prompt: string) => {
        // TODO - get title from the prompt

        const repositorie = await Repositories.create({
            userId: userId,
            title: "Not yet but soon!",
        })

        return repositorie;
    }
}