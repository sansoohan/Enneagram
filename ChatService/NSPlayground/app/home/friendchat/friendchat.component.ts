import { Component, OnInit, ViewChild } from "@angular/core";
import { Chat } from "./chat.model";
import { ChildButton1Component } from "../../buttons/child-button1/child-button1.component";
import { ChildButton2Component } from "../../buttons/child-button2/child-button2.component";
import { ChildButton3Component } from "../../buttons/child-button3/child-button3.component";
@Component({
	selector: "Friendchat",
	moduleId: module.id,
	templateUrl: "./friendchat.component.html",
	styleUrls: ['./friendchat.component.css']
})
export class FriendchatComponent implements OnInit {
	public drawer: boolean;
	@ViewChild("childButton1") childButton1: ChildButton1Component;
	@ViewChild("childButton2") childButton2: ChildButton2Component;
	@ViewChild("childButton3") childButton3: ChildButton3Component;
    currentDay: number = new Date().getDate();
    currentMonth: number = new Date().getMonth() + 1;
    currentYear: number = new Date().getFullYear();

	chats = [];

	constructor() {
		this.chats.push(new Chat("Hi", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"));
		this.chats.push(new Chat("Hello", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"));
		this.chats.push(new Chat("Class 201", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"));
		this.chats.push(new Chat("Come here", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"));
		this.chats.push(new Chat("Hurry", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png"));
		this.chats.push(new Chat("Hey, how's going?", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"));
		this.chats.push(new Chat("What was homework in the C programming class?", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"));
	}

	ngOnInit(): void {
	}

	onItemTap(args) {
		console.log("You tapped: " + this.chats[args.index].name);
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