import { Component, OnInit,NgZone } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { FirebaseService } from "~/services/firebase.service";

import { GestureEventData } from "tns-core-modules/ui/gestures";
import { ImageSource } from "image-source";
import { ImageAsset } from "tns-core-modules/image-asset";
import { Subscription } from "rxjs";
import * as imagePicker from "nativescript-imagepicker";
import * as dialogs from "ui/dialogs";
import { android, ios } from "tns-core-modules/application";
import { knownFolders, path } from "file-system";
import { RadioOption } from "~/modules/buttons/radio-option";
import { Page } from "ui/page";
@Component({
  moduleId: module.id,
  selector: 'Setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
	email: string = "";
	name: string =""
	gender: string = "";

	genderOptionButtons?: Array<RadioOption>;
	
	constructor(
		private routerExtensions: RouterExtensions,
		private firebaseService: FirebaseService,
		private page: Page
	) { 
		this.page.actionBarHidden = true;
	}
	ngOnInit() { 
		this.genderOptionButtons = [
			new RadioOption("Gender", "male"),
			new RadioOption("Gender", "female"),
		];
		this.email = this.firebaseService.thisUser[this.firebaseService.authuser.uid]['profile']['email'];
		this.name = this.firebaseService.thisUser[this.firebaseService.authuser.uid]['profile']['name'];
		this.gender = this.firebaseService.thisUser[this.firebaseService.authuser.uid]['profile']['gender'];
		if(this.gender === 'male'){
			this.changeCheckedRadio(this.genderOptionButtons[0]);
		}
		else if(this.gender === 'female'){
			this.changeCheckedRadio(this.genderOptionButtons[1]);
		}
	}

	onTap(args: GestureEventData) {
		this.routerExtensions.back();
	}

	changeCheckedRadio(radioOption: RadioOption): void {
		radioOption.selected = !radioOption.selected;

		if (!radioOption.selected) {
			return;
		}


		switch (radioOption.group) {
			case "Gender":
				this.gender = radioOption.text;
				this.genderOptionButtons.forEach(option => {
					if (option.text !== radioOption.text) {
						option.selected = false;
					}
				});
				break;
		}
	}

	onSaveTap(){
		var userProfileToUpdate = {
			email: this.email,
			gender: this.gender,
			name: this.name,
		}
		this.firebaseService.setThisUserProfile(userProfileToUpdate);
	}
}
