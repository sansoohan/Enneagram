import { Component, OnInit } from "@angular/core";
import { Friend } from "./friend.model";

@Component({
	selector: "Friendlist",
	moduleId: module.id,
	templateUrl: "./friendlist.component.html",
	styleUrls: ['./friendlist.component.css']
})
export class FriendlistComponent implements OnInit {

	friends = [];

	constructor() {
		this.friends.push(new Friend("Bulbasaur", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"));
		this.friends.push(new Friend("Ivysaur", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"));
		this.friends.push(new Friend("Venusaur", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"));
		this.friends.push(new Friend("Charmander", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"));
		this.friends.push(new Friend("Charmeleon", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png"));
		this.friends.push(new Friend("Charizard", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png"));
		this.friends.push(new Friend("Squirtle", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png"));
		this.friends.push(new Friend("Wartortle", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png"));
		this.friends.push(new Friend("Blastoise", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png"));
		this.friends.push(new Friend("Caterpie", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png"));
		this.friends.push(new Friend("Metapod", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png"));
		this.friends.push(new Friend("Butterfree", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png"));
		this.friends.push(new Friend("Weedle", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/13.png"));
		this.friends.push(new Friend("Kakuna", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png"));
		this.friends.push(new Friend("Beedrill", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/15.png"));
	}

	ngOnInit(): void {
	}

	onItemTap(args) {
		console.log("You tapped: " + this.friends[args.index].name);
	}
}