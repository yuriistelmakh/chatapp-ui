export interface MessageDto {
    id: number,
    content: string,
    createdAt: Date,
    senderName: string,
    isIncoming: boolean
}