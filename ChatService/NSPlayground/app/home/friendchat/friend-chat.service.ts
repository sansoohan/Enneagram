import { Injectable } from "@angular/core";
import { Room } from "./room.model";
import { RoomList } from "./mock-rooms";

@Injectable()
export class FriendChatService {
    private selectedRoom: Room;
    private rooms: Room[];
    static nextID: number;
    friends: [
        {
            email: string,
            enneagramNumber: number,
        }
    ]
    constructor() {
        this.rooms = RoomList;
        for (var i = 0; i < this.rooms.length; i++) {
            this.updateBottomMessage(this.rooms[i]);
        }
        FriendChatService.nextID = this.rooms.length;
    }
    updateBottomMessage(room: Room): void {
        room.bottomMessage = room.messages[room.messages.length - 1].contents;
    }
    public addRoom(room: Room): void {
        this.rooms.push(room);
    }
    public getRooms(): Room[] {
        return this.rooms;
    }

    public getSelectedRoom(): Room {
        return this.selectedRoom;
    }

    public setSelectedRoom(room: Room): void {
        this.selectedRoom = room;
    }
}