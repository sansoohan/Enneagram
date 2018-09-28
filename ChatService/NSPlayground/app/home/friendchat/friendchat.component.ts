import { Component, OnInit, ViewChild } from "@angular/core";
import { Chat } from "./chat.model";
import { Room } from "./room.model";
import { ROOMS } from "./mock-rooms";
import { ChildButton1Component } from "../../buttons/child-button1/child-button1.component";
import { ChildButton2Component } from "../../buttons/child-button2/child-button2.component";
import { ChildButton3Component } from "../../buttons/child-button3/child-button3.component";
import { ActionButtonComponent } from "../ideamatching/action-button/action-button.component";
import { RouterExtensions } from "nativescript-angular/router";
import { RoomsService } from "./rooms-service";
@Component({
	selector: "Friendchat",
	moduleId: module.id,
	templateUrl: "./friendchat.component.html",
	styleUrls: ['./friendchat.component.css']
})
export class FriendchatComponent implements OnInit {
	@ViewChild("actionButton") _buttonRef: ActionButtonComponent;

	public drawer: boolean;
	@ViewChild("childButton1") childButton1: ChildButton1Component;
	@ViewChild("childButton2") childButton2: ChildButton2Component;
	@ViewChild("childButton3") childButton3: ChildButton3Component;
    currentDay: number = new Date().getDate();
    currentMonth: number = new Date().getMonth() + 1;
    currentYear: number = new Date().getFullYear();

	rooms: Room[];
	constructor(private routerExtensions: RouterExtensions,
		private roomsService: RoomsService,) {
		this.rooms = ROOMS;
	}

	ngOnInit(): void {
	}

	onItemTap(args) {
		console.log("You tapped: " + this.rooms[args.index].title);
		this.roomsService.setSelectedId(args.index);
		this.routerExtensions.navigate(['/chatroom'], { animated: false });
		this._buttonRef.makeArrow();
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
}