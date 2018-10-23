import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { ListView } from "tns-core-modules/ui/list-view";
import { ChildButton1Component } from "../../buttons/child-button1/child-button1.component";
import { ChildButton2Component } from "../../buttons/child-button2/child-button2.component";
import { ChildButton3Component } from "../../buttons/child-button3/child-button3.component";
import { FriendchatComponent } from "../friendchat/friendchat.component";
import { ModalComponent } from "../../modal/modal.component";
import { FriendListService } from "../friendchat/friend-list.service";
import { FriendChatService } from "../friendchat/friend-chat.service";
import { FirebaseService } from "../../services/firebase.service";

import { RouterExtensions } from "nativescript-angular/router";
@Component({
	selector: "Friendlist",
	moduleId: module.id,
	templateUrl: "./friendlist.component.html",
	styleUrls: ['./friendlist.component.css']
})
export class FriendlistComponent implements OnInit {
	@ViewChild("friendList") friendList: ListView;
	@ViewChild("childButton1") childButton1: ChildButton1Component;
	@ViewChild("childButton2") childButton2: ChildButton2Component;
	@ViewChild("childButton3") childButton3: ChildButton3Component;
	@ViewChild("friendchat") friendchat: FriendchatComponent;
	@ViewChild(ModalComponent) modal: ModalComponent;
	public drawer: boolean;
	constructor(private friendListService: FriendListService,
		private friendChatService: FriendChatService,
		private routerExtensions: RouterExtensions,
		private firebaseService: FirebaseService
	) {
		
	}

	getFriendProfilePicsrc(item):string{
		var ret:string = "";
		for(var friendID in item) {
			ret = item[friendID]['profile']['profilePicsrc'];			
		}
		return ret;
	}
	getFriendName(item):string{
		var ret:string = "";
		for(var friendID in item) {
			ret = item[friendID]['profile']['name'];
		}
		return ret;
	}

	getProfilePicSrcBySelectedFriendID(){
		var selelctedFriendID = this.friendListService.getSelectedFriendID();
		if(selelctedFriendID!= null){
			return this.firebaseService.getFriends()[selelctedFriendID]['profile']['profilePicsrc'];		
		}
		else return null;
	}
	getNameBySelectedFriendID(){
		var selelctedFriendID = this.friendListService.getSelectedFriendID();
		if(selelctedFriendID!=null){
			return this.firebaseService.getFriends()[selelctedFriendID]['profile']['name'];
		}
		else return null;
	}

	ngOnInit(): void {
	}

	onItemTap(args) {
		console.log(this.friendList.items[args.index]);
		for(var selelctedFriendID in this.friendList.items[args.index]){
			this.friendListService.selectedFriendID = selelctedFriendID;
			
		}
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
	}
	makeRoom(): void {
		this.firebaseService.generateRoom(this.firebaseService.thisUser);
		var room_id:string = this.firebaseService.getGeneratedRoomID();
		var friend_id:string = this.friendListService.getSelectedFriendID();
		var friend:any = this.firebaseService.getFriends()[friend_id];
		this.firebaseService.pushFriendOnRoom(friend,room_id);
		this.friendChatService.selectedRoomID = room_id;
		this.gotoChatRoom();
	}
	gotoChatRoom() {
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