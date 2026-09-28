import { ChatArea } from '@velocity/blocks';
import React from 'react'

async function page({ params }: { params: Promise<{ chatId: string }> }) {
    const param = await params;
    const chatId = param.chatId;

    return (
        <ChatArea chatId={chatId} />
    )
}

export default page