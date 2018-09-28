import { Injectable } from "@angular/core";
import { Room } from "./room.model";
import { ROOMS } from "./mock-rooms";

@Injectable()
export class RoomsService {
    private _selectedId = -1;

    getRooms(): Room[] {
        return ROOMS;
    }

    getRoom(id: number): Room {
        return ROOMS.filter(room => room.id === id)[0];
    }

    setSelectedId(id: number) {
        if (id < ROOMS.length) {
            this._selectedId = id;
        }
    }

    getSelected(): Room {
        return this._selectedId < 0 ? null : this.getRoom(this._selectedId);
    }
}