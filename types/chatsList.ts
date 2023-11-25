export type chatItem = {
        chatId: string;
        chatName: string | "Chat + number",
        skinTone: string;
        MBTI: string | null;
        keyword: string[] | null;
        createAt: string;
}
export type chatList = chatItem[];

export type chatBox = {
    id: string;
    userId: string;
    conversation: {
        botChat_1: string[],
        user_1: string[],
        botChat_2: string[],
        user_2: string[],
    },
    createAt: string
}

export type postConversation = {
    userId: string;
    conversation: {
        botChat_1: string[],
        user_1: string[],
        botChat_2: string[],
        user_2: string[],
    },
}