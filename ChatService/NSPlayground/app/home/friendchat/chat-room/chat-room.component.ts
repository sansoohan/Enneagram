import { Component, OnInit, Input } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { GestureEventData } from "tns-core-modules/ui/gestures";
import { Chat } from "../chat.model";
import { Room } from "../room.model";
import { RoomsService } from "../rooms-service";
@Component({
	selector: "ChatRoom",
	moduleId: module.id,
	templateUrl: "./chat-room.component.html",
	styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
	@Input() room: Room;
	messages: Chat[];
	constructor(private routerExtensions: RouterExtensions,
		private roomsService: RoomsService,
	) {
		this.room = this.roomsService.getSelected();
		this.messages = this.room.messages;
	}

	ngOnInit(): void {
	}

	onTap(args: GestureEventData) {
		this.routerExtensions.back();
	}
}