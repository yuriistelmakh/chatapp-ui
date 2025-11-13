import { ChatDto } from "./ChatDto";
import { UserDto } from "./UserDto";

export interface AddUserToChatDto {
    chat: ChatDto,
    user: UserDto
}