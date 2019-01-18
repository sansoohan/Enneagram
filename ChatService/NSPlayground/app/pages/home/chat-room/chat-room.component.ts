import { Component, OnInit, ViewChild,NgZone } from "@angular/core";
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
	scrollView: ScrollView;
	private scrollIntervalId;
	public onScrollerLoaded(data){
		this.scrollView = data.object;
		this.setScrollToBottom();
	}

	setScrollToBottom(){
		setInterval(()=>{
			// if(this.firebaseService.messageUpdatedToggle){
				this.scrollView.scrollToVerticalOffset(this.scrollView.scrollableHeight, false);
				// this.firebaseService.messageUpdatedToggle = false;
			// }
		},100);
	}

	constructor(private routerExtensions: RouterExtensions,
		private firebaseService: FirebaseService,
		private ngZone: NgZone
	){	}

    ngOnInit(): void {

    }

	onTap(args: GestureEventData) {
		this.routerExtensions.back();
	}


	getProfilePicsrc(item){
		var user_id = item[Object.keys(item)[0]]['user'];
		return this.firebaseService.getRooms()[this.firebaseService.selectedRoomID]['room_users'][user_id]['messageIcon'];
	}
	getProfileName(item){
		var user_id = item[Object.keys(item)[0]]['user'];
		return this.firebaseService.getRooms()[this.firebaseService.selectedRoomID]['room_users'][user_id]['userName'];
	}
	getMessage(item:any): string{
		return item[Object.keys(item)[0]]['message'];
	}
	pushMessage(): void {
		var room_id = this.firebaseService.selectedRoomID;
		var user = this.firebaseService.thisUser;
		if(this.str==""){
			return;
		}
		this.firebaseService.pushMessageOnRoom(room_id, user, this.str);
		this.removeString();
		this.setScrollToBottom();
	}
    removeString(): void {        
        this.str = "";
	}
}