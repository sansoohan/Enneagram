import { Component, OnInit, Input } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { GestureEventData } from "tns-core-modules/ui/gestures";
import { Message } from "../message.model";
import { Room } from "../room.model";
import { FriendChatService } from "../friend-chat.service";
import { UserHomeService } from "../user-home.service";
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';
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
		private userHomeService: UserHomeService,
	){	}

	

    ngOnInit(): void {
		this.str = appSettings.getString("someString", "");
		firebase.init().then(instance => {
			console.log("firebase.init done");
			firebase.push("test","test");
        },
        error => {
			console.log(`firebase.init error: ${error}`);
        }
        );
    }


	onTap(args: GestureEventData) {
		this.routerExtensions.back();
	}

	saveString() {
		
		console.log("test");
        appSettings.setString("someString", this.str);
		console.log("You saved: " + appSettings.getString("someString"));
		var newMessage = new Message();
		newMessage.friend = this.userHomeService.me.index;
		newMessage.contents = appSettings.getString("someString");
		this.friendChatService.getSelectedRoom().messages.push(newMessage);
		this.removeString();
	}
	
    removeString() {
        appSettings.remove("someString");
        this.str = "";
        console.log("You removed the string from app settings!");
    }
}


