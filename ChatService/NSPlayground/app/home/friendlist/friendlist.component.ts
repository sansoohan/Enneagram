import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { Friend } from "../friendchat/Friend.model";
import { Room } from "../friendchat/room.model";
import { FriendList } from "../friendchat/mock-rooms";
import { ChildButton1Component } from "../../buttons/child-button1/child-button1.component";
import { ChildButton2Component } from "../../buttons/child-button2/child-button2.component";
import { ChildButton3Component } from "../../buttons/child-button3/child-button3.component";
import { FriendchatComponent } from "../friendchat/friendchat.component";
import { ModalComponent } from "../../modal/modal.component";
import { FriendListService } from "../friendchat/friend-list.service";
import { FriendChatService } from "../friendchat/friend-chat.service";
import { ListView } from "ui/list-view";

import { RouterExtensions } from "nativescript-angular/router";
@Component({
	selector: "Friendlist",
	moduleId: module.id,
	templateUrl: "./friendlist.component.html",
	styleUrls: ['./friendlist.component.css']
})
export class FriendlistComponent implements OnInit {
	public drawer: boolean;
	selectedRoom: Room;
	@ViewChild("childButton1") childButton1: ChildButton1Component;
	@ViewChild("childButton2") childButton2: ChildButton2Component;
	@ViewChild("childButton3") childButton3: ChildButton3Component;
	@ViewChild("friendchat") friendchat: FriendchatComponent;
	
	@ViewChild(ModalComponent) modal: ModalComponent;
	
	constructor(private friendListService: FriendListService,
		private friendChatService: FriendChatService,
		private routerExtensions: RouterExtensions,
	) {
		
	}

	ngOnInit(): void {
	}

	onItemTap(args) {
		this.friendListService.setSelectedFriend(this.friendListService.getFriends()[args.index]);
		this.openModal();
	}
	public onTap(args) {
		if (this.drawer) {
			this.drawer = false;
			this.childButton1.drawerOpen(this.drawer);
			this.childButton2.drawerOpen(this.drawer);
			this.childButton3.drawerOpen(this.drawer);
		}
		else {
			this.drawer = true;
			this.childButton1.drawerOpen(this.drawer);
			this.childButton2.drawerOpen(this.drawer);
			this.childButton3.drawerOpen(this.drawer);
		}
	}
	onChatTap(): void {
		this.makeRoom();
		this.gotoChatRoom();
	}
	makeRoom(): void {
		var rooms = this.friendChatService.getRooms();
		var selectedFriend = this.friendListService.getSelectedFriend();
		for (var i = 0; i < rooms.length; i++) {
			if (rooms[i].title === selectedFriend.name) {
				this.selectedRoom = rooms[i];
				return;
			}
		}
		var newRoom = new Room();
		newRoom.id = FriendChatService.nextID;
		newRoom.icon = selectedFriend.profilePicsrc;
		newRoom.startDate = null;
		newRoom.endDate = null;
		newRoom.messages = [];
		newRoom.title = selectedFriend.name;
		newRoom.friends = [this.friendListService.thisUser.index, selectedFriend];
		this.friendChatService.addRoom(newRoom);
		this.selectedRoom = newRoom;
		FriendChatService.nextID++;
	}
	gotoChatRoom() {
		this.friendChatService.setSelectedRoom(this.selectedRoom);
		this.routerExtensions.navigate(['/chatroom'], { animated: false });
	}
	onModalTap() {
		alert("clicked an item");
	}

	openModal() {
		this.modal.show();
	}

	closeModal() {
		this.modal.hide();
	}

	onOpenModal() {
		console.log("opened modal");
	}

	onCloseModal() {
		console.log("closed modal");
	}
}