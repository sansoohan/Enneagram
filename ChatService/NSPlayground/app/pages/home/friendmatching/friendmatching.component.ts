import { Component, OnInit, ViewChild } from "@angular/core";
import { UploadpostService } from "../uploadpost/uploadpost-service";
import { RouterExtensions } from "nativescript-angular/router";
import { SearchService } from "../searchoption/search-service";
import { FirebaseService } from "~/services/firebase.service";

import { ActionButtonComponent } from "~/modules/buttons/action-button/action-button.component";
@Component({
	selector: "Friendmatching",
	moduleId: module.id,
	templateUrl: "./friendmatching.component.html",
	styleUrls: ['./friendmatching.component.css']
})
export class FriendmatchingComponent implements OnInit {
	private _buttonRef: ActionButtonComponent;
	constructor(
		private firebaseService: FirebaseService,
		private uploadpostService: UploadpostService,
		private routerExtensions: RouterExtensions,
		private searchService: SearchService
	) {
    }

	ngOnInit(): void {
	}
	onFoodJoinTap(){
		this.searchService.postType = "food";
		this.firebaseService.analyticsCount("foodSearchTap");
		this.routerExtensions.navigate(['/searchoption'], { animated: false });
		this._buttonRef.makeArrow();
	}
	onFoodMakeTap(){
		this.uploadpostService.postType = "food";
		this.firebaseService.analyticsCount("foodPostTap");
		this.routerExtensions.navigate(['/uploadpost'], { animated: false });
		this._buttonRef.makeArrow();
	}
	onGameJoinTap(){
		this.searchService.postType = "game";
		this.firebaseService.analyticsCount("gameSearchTap");
		this.routerExtensions.navigate(['/searchoption'], { animated: false });
		this._buttonRef.makeArrow();
	}
	onGameMakeTap(){
		this.uploadpostService.postType = "game";
		this.firebaseService.analyticsCount("gamePostTap");
		this.routerExtensions.navigate(['/uploadpost'], { animated: false });
		this._buttonRef.makeArrow();
	}
	onChatJoinTap(){
		this.searchService.postType = "chat";
		this.firebaseService.analyticsCount("chatSearchTap");
		this.routerExtensions.navigate(['/searchoption'], { animated: false });
		this._buttonRef.makeArrow();
	}
	onChatMakeTap(){
		this.uploadpostService.postType = "chat";
		this.firebaseService.analyticsCount("chatPostTap");
		this.routerExtensions.navigate(['/uploadpost'], { animated: false });
		this._buttonRef.makeArrow();
	}
}