import { Component, OnInit, ViewChild } from "@angular/core";
import { ListView } from "tns-core-modules/ui/list-view";
import { ChildButton1Component } from "../../buttons/child-button1/child-button1.component";
import { ChildButton2Component } from "../../buttons/child-button2/child-button2.component";
import { ChildButton3Component } from "../../buttons/child-button3/child-button3.component";
import { ActionButtonComponent } from "../ideamatching/action-button/action-button.component";
import { RouterExtensions } from "nativescript-angular/router";
import { FriendChatService } from "./friend-chat.service";
import { FirebaseService } from "../../services/firebase.service";
import { ngDevModeResetPerfCounters } from "@angular/core/src/render3/ng_dev_mode";
import { last } from "@angular/router/src/utils/collection";


@Component({
	selector: "Friendchat",
	moduleId: module.id,
	templateUrl: "./friendchat.component.html",
	styleUrls: ['./friendchat.component.css']
})
export class FriendchatComponent implements OnInit {
	@ViewChild("roomList") roomList: ListView;
	@ViewChild("actionButton") _buttonRef: ActionButtonComponent;

	public drawer: boolean;
	@ViewChild("childButton1") childButton1: ChildButton1Component;
	@ViewChild("childButton2") childButton2: ChildButton2Component;
	@ViewChild("childButton3") childButton3: ChildButton3Component;
    currentDay: number = new Date().getDate();
    currentMonth: number = new Date().getMonth() + 1;
    currentYear: number = new Date().getFullYear();

	


	constructor(private routerExtensions: RouterExtensions,
		private friendChatService: FriendChatService,
		private firebaseService: FirebaseService) {
	}

	ngOnInit(): void {
	}



	getRoomIconsrc(item):string{
		var ret:string = "";
		// console.log(item);
		if(item!=null){
			for(var roomID in item) {
				ret = item[roomID]['iconsrc'];
			}
		}
		return ret;
	}
	getRoomTitle(item):string{
		var ret:string = "";
		for(var roomID in item) {
			ret = item[roomID]['title'];
		}
		return ret;
	}
	getRoomLastMessage(item):string{
		var ret:string = "";
		var last_timestamp = 0;
		for(var roomID in item){
			var messages = item[roomID]['messages'];
			for(var messageID in messages){
				var messagePack = messages[messageID];
				if(messagePack['timestamp']['time']>last_timestamp){
					last_timestamp = messagePack['timestamp']['time'];
					ret = messagePack['message'];
				}
			}
		}
		return ret;
	}

	onItemTap(args) {
		console.log(this.roomList.items[args.index]);
		for(var selelctedRoomID in this.roomList.items[args.index]){
			this.friendChatService.selectedRoomID = selelctedRoomID;
			this.friendChatService.selectedRoomTitle = this.firebaseService.getRooms()[selelctedRoomID]['title'];
			var messages = this.firebaseService.getRooms()[selelctedRoomID]['messages']
			this.friendChatService.messageArray = this.firebaseService.jsonToArray(messages);
			this.friendChatService.users = this.firebaseService.getRooms()[selelctedRoomID]['room_users'];
		}
		this.routerExtensions.navigate(['/chatroom'], { animated: false });
	}
	public onTap(args): void {
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

}