import { Chat } from "./chat.model";
import { User } from "./user.model";
export class Room {
    public id: number;
    public title: string;
    public messages: Chat[];
    public users: User[];
    public topMessage: string;
    public topUserSrc: string;
}