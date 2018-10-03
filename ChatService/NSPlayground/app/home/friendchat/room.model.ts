import { Message } from "./message.model";
import { Friend } from "./Friend.model";
export class Room {
    public id: number;
    public title: string;
    public messages: Message[];
    public bottomMessage: string;
    public friends: Friend[];
    public icon: string;
    public startDate: Date;
    public endDate: Date;
}