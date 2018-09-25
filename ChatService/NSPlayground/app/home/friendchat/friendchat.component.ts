import { Component, OnInit } from "@angular/core";
import { Chat } from "./chat.model";

@Component({
	selector: "Friendchat",
	moduleId: module.id,
	templateUrl: "./friendchat.component.html",
	styleUrls: ['./friendchat.component.css']
})
export class FriendchatComponent implements OnInit {
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
}