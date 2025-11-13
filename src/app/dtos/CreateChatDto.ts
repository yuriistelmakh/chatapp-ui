import { ChatDto } from "./ChatDto";

export interface CreateChatDto {
    chat: ChatDto,
    memberIds: number[]
}