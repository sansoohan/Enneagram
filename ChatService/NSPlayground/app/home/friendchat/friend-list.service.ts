import { Injectable } from "@angular/core";
import { User } from "./user.model";
import { Friend } from "./friend.model";
import { FriendList, USER } from "./mock-rooms";
import { ObservableArray } from "data/observable-array";
@Injectable()
export class FriendListService {
    thisUser: User;
    friends: Friend[];
    selectedFriend: Friend = new Friend();

    constructor() {
        this.friends = FriendList;
        this.thisUser = USER;
        this.selectedFriend.email = "";
        this.selectedFriend.name = "";
        this.selectedFriend.profilePicsrc = "";
        this.selectedFriend.backgroundPicsrc = "";
        this.selectedFriend.enneagramNumber = 0;
        this.selectedFriend.enneagramState = "";
    }
    
    public getFriends(): Friend[] {
        return this.friends;
    }
    
    setSelectedFriend(selectedFriend: Friend): void {
        this.selectedFriend = selectedFriend;
    }
    getSelectedFriend(): Friend {
        return this.selectedFriend;
    }
}