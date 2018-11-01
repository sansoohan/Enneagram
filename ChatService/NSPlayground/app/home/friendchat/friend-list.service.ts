import { Injectable } from "@angular/core";
// import { FriendList, USER } from "./mock-rooms";

@Injectable()
export class FriendListService {
    public selectedFriendID: string;

    constructor() {
        // this.selectedFriend.profile.email = "";
        // this.selectedFriend.profile.name = "";
        // this.selectedFriend.profile.profilePicsrc = "";
        // this.selectedFriend.profile.backgroundPicsrc = "";
        // this.selectedFriend.enneagram.number = 0;
        // this.selectedFriend.enneagram.state = "";
    }

    setSelectedFriendID(selectedFriendID: string): void {
        this.selectedFriendID = selectedFriendID;
    }
    getSelectedFriendID(): string {
        return this.selectedFriendID;
    }
}