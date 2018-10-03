import { Component, OnInit, Input } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { GestureEventData } from "tns-core-modules/ui/gestures";
import { Message } from "../message.model";
import { Room } from "../room.model";
import { FriendChatService } from "../friend-chat.service";


@Component({
	selector: "ChatRoom",
	moduleId: module.id,
	templateUrl: "./chat-room.component.html",
	styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
	
	constructor(private routerExtensions: RouterExtensions,
		private friendChatService: FriendChatService,
	) {

	}

	ngOnInit(): void {
	}

	onTap(args: GestureEventData) {
		this.routerExtensions.back();
	}
}