import { Injectable } from "@angular/core";
// import { RoomList } from "./mock-rooms";

@Injectable()
export class FriendChatService {
    public selectedRoomID: string;
    public selectedRoomTitle: string;
    public messageArray: Array<any>;
    public users :any;
    constructor() {
        // this.selectedFriend.profile.email = "";
        // this.selectedFriend.profile.name = "";
        // this.selectedFriend.profile.profilePicsrc = "";
        // this.selectedFriend.profile.backgroundPicsrc = "";
        // this.selectedFriend.enneagram.number = 0;
        // this.selectedFriend.enneagram.state = "";
    }
}