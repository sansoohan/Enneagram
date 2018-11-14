import { Component, OnInit, ViewChild } from "@angular/core";
import { BlogService } from "../blog/blog-service";
import { RouterExtensions } from "nativescript-angular/router";
import { SearchService } from "../searchoption/search-service";

import { ActionButtonComponent } from "../searchresult/action-button/action-button.component";
@Component({
	selector: "Friendmatching",
	moduleId: module.id,
	templateUrl: "./friendmatching.component.html",
	styleUrls: ['./friendmatching.component.css']
})
export class FriendmatchingComponent implements OnInit {
	private _buttonRef: ActionButtonComponent;
	constructor(
		private blogService: BlogService,
		private routerExtensions: RouterExtensions,
		private searchService: SearchService
	) {
    }

	ngOnInit(): void {
	}
	onFoodJoinTap(){
		this.searchService.postType = "food";
		this.routerExtensions.navigate(['/searchoption'], { animated: false });
		this._buttonRef.makeArrow();
	}
	onFoodMakeTap(){
		this.blogService.postType = "food";
		this.routerExtensions.navigate(['/blog'], { animated: false });
		this._buttonRef.makeArrow();
	}
	onGameJoinTap(){
		this.searchService.postType = "game";
		this.routerExtensions.navigate(['/searchoption'], { animated: false });
		this._buttonRef.makeArrow();
	}
	onGameMakeTap(){
		this.blogService.postType = "game";
		this.routerExtensions.navigate(['/blog'], { animated: false });
		this._buttonRef.makeArrow();
	}
	onChatJoinTap(){
		this.searchService.postType = "chat";
		this.routerExtensions.navigate(['/searchoption'], { animated: false });
		this._buttonRef.makeArrow();
	}
	onChatMakeTap(){
		this.blogService.postType = "chat";
		this.routerExtensions.navigate(['/blog'], { animated: false });
		this._buttonRef.makeArrow();
	}
}