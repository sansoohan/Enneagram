import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { GestureEventData } from "tns-core-modules/ui/gestures";
import { alert, confirm, prompt, login, action, inputType } from "tns-core-modules/ui/dialogs";
import { ActionButtonComponent } from "../searchresult/action-button/action-button.component";
import { FirebaseService } from "../../services/firebase.service";
@Component({
	selector: "Friendadd",
	moduleId: module.id,
	templateUrl: "./friendadd.component.html",
	styleUrls: ['./friendadd.component.css']
})
export class FriendaddComponent implements OnInit {

	constructor(private routerExtensions: RouterExtensions,
		private firebaseService: FirebaseService
	) {
	}

	ngOnInit(): void {

	}
	
	onTap(args: GestureEventData) {
		this.routerExtensions.back();
	}
}