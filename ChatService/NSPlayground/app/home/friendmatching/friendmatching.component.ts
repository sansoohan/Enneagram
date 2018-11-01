import { Component, OnInit, ViewChild } from "@angular/core";
import { BlogService } from "../blog/blog-service";
import { RouterExtensions } from "nativescript-angular/router";
import { ActionButtonComponent } from "../searchresult/action-button/action-button.component";
@Component({
	selector: "Friendmatching",
	moduleId: module.id,
	templateUrl: "./friendmatching.component.html",
	styleUrls: ['./friendmatching.component.css']
})
export class FriendmatchingComponent implements OnInit {
	private _buttonRef: ActionButtonComponent;
	constructor(private blogService: BlogService,
		private routerExtensions: RouterExtensions) {
    }

	ngOnInit(): void {
	}
	onFoodJoinTap(){
		
	}
	onFoodMakeTap(){
		this.blogService.postType = "food";
		this.routerExtensions.navigate(['/blog'], { animated: false });
		this._buttonRef.makeArrow();
	}
	onGameJoinTap(){

	}
	onGameMakeTap(){
		this.blogService.postType = "game";
		this.routerExtensions.navigate(['/blog'], { animated: false });
		this._buttonRef.makeArrow();
	}
	onChatJoinTap(){

	}
	onChatMakeTap(){
		this.blogService.postType = "chat";
		this.routerExtensions.navigate(['/blog'], { animated: false });
		this._buttonRef.makeArrow();
	}
}