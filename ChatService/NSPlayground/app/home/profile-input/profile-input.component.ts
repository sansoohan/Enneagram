import { Component, OnInit,NgZone } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { FirebaseService } from "../../services/firebase.service";

import { GestureEventData } from "tns-core-modules/ui/gestures";
import { ImageSource } from "image-source";
import { ImageAsset } from "tns-core-modules/image-asset";
import { Subscription } from "rxjs";
import * as imagePicker from "nativescript-imagepicker";
import * as dialogs from "ui/dialogs";
import { android, ios } from "tns-core-modules/application";
import { knownFolders, path } from "file-system";
import { RadioOption } from "../enneagram/radio-option";

@Component({
  moduleId: module.id,
  selector: 'ProfileInput',
  templateUrl: './profile-input.component.html',
  styleUrls: ['./profile-input.component.css']
})
export class ProfileInputComponent implements OnInit {
	email: string = "";
	name: string =""
	gender: string = "";
	country: string = "";
	interest: string = "";
	introducing: string = "";
	language: string = "";

  	statusChangeSubscr: Subscription;
  
	private isUpdating: boolean = false;
	private isAddingNew: boolean = false;

	private removedImageUrl: string;
	genderOptionButtons?: Array<RadioOption>;
	

	constructor(private routerExtensions: RouterExtensions,
		private firebaseService: FirebaseService,
		
	) { 

	}
	ngOnInit() { 
		this.genderOptionButtons = [
			new RadioOption("Gender", "male"),
			new RadioOption("Gender", "female"),
		];
		this.email = this.firebaseService.thisUser[this.firebaseService.authuser.uid]['profile']['email'];
		this.name = this.firebaseService.thisUser[this.firebaseService.authuser.uid]['profile']['name'];
	}

	onTap(args: GestureEventData) {
		this.routerExtensions.back();
	}

  	onAddImageTap(imageType:string): void {
		if (this.firebaseService.authuser) {
			this.firebaseService.pickImage(imageType);
		} else {
			dialogs.alert("Cannot upload images in offline mode");
		}
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
			backgroundPicsrc: this.firebaseService.currentBackgroundImageFileURL,
			country: this.country,
			email: this.email,
			gender: this.gender,
			interest: this.interest,
			introducing: this.introducing,
			language: this.language,
			name: this.name,
			profilePicsrc: this.firebaseService.currentProfileImageFileURL
		}
		this.firebaseService.setThisUserProfile(userProfileToUpdate);
	}
}
