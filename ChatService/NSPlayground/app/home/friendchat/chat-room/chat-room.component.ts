import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { GestureEventData } from "tns-core-modules/ui/gestures";
import { registerElement } from 'nativescript-angular/element-registry';
import { CardView } from 'nativescript-cardview';
import { FirebaseService } from "../../../services/firebase.service";
import { ScrollView } from "ui/scroll-view";
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
	@ViewChild("scrollView") scrollView: ScrollView;
	constructor(private routerExtensions: RouterExtensions,
		private firebaseService: FirebaseService,
	){	}

    ngOnInit(): void {
		var offset = this.scrollView.scrollableHeight;
		this.scrollView.scrollToVerticalOffset(offset, false);
    }

	onTap(args: GestureEventData) {
		this.routerExtensions.back();
	}

	getMessage(item:any): string{
		return item[Object.keys(item)[0]]['message'];
	}
	getProfilePicsrc(item){
		var user_id = item[Object.keys(item)[0]]['user'];
		return this.firebaseService.getRooms()[this.firebaseService.selectedRoomID]['room_users'][user_id]['messageIcon'];
	}
	pushMessage(): void {
		var room_id = this.firebaseService.selectedRoomID;
		var user = this.firebaseService.thisUser;
		if(this.str==""){
			return;
		}
		this.firebaseService.pushMessageOnRoom(room_id, user, this.str);
		this.removeString();
		var offset = this.scrollView.scrollableHeight;
		this.scrollView.scrollToVerticalOffset(offset, false);
	}
    removeString(): void {        
        this.str = "";
	}
}