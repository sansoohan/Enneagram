import { Component, OnInit, Input } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { GestureEventData } from "tns-core-modules/ui/gestures";
import { FriendChatService } from "../friend-chat.service";
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';
import { FirebaseService } from "../../../services/firebase.service";
registerElement('CardView', () => CardView);
import * as appSettings from "application-settings";
import firebase = require("nativescript-plugin-firebase");

@Component({
	selector: "ChatRoom",
	moduleId: module.id,
	templateUrl: "./chat-room.component.html",
	styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
	str: string = "";


	constructor(private routerExtensions: RouterExtensions,
		private friendChatService: FriendChatService,
		private firebaseService: FirebaseService,
	){	}

    ngOnInit(): void {
    }

	onTap(args: GestureEventData) {
		this.routerExtensions.back();
	}

	getMessage(item:any): string{
		var ret = "";
		for(var key in item) {
			ret = item[key]['message'];
		}
		console.log(item);
		return ret;
	}

	pushMessage(): void {
		var room_id = this.friendChatService.selectedRoomID;
		var user = this.firebaseService.thisUser;
		if(this.str==""){
			return;
		}
		this.firebaseService.pushMessageOnRoom(room_id, user, this.str);
		this.removeString();
	}
    removeString(): void {        
        this.str = "";
        console.log("You removed the string from app settings!");
	}
}