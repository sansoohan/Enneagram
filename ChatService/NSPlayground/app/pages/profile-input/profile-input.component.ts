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
  selector: 'ProfileInput',
  templateUrl: './profile-input.component.html',
  styleUrls: ['./profile-input.component.css']
})
export class ProfileInputComponent implements OnInit {
	country: string = "";
	interest: string = "";
	introducing: string = "";
	language: string = "";
    thisUserProfilePicsrc;
    thisUserBackgroundPicsrc;

	genderOptionButtons?: Array<RadioOption>;
	

	constructor(
		private routerExtensions: RouterExtensions,
		private firebaseService: FirebaseService,
		private page: Page
	) { 
		this.page.actionBarHidden = true;
		this.thisUserBackgroundPicsrc = this.firebaseService.currentBackgroundImageFileURL;
		this.thisUserProfilePicsrc = this.firebaseService.currentProfileImageFileURL;

	}
	ngOnInit() { 
	}

	onCloseTap(args: GestureEventData) {
		this.routerExtensions.back();
	}

	getCover(item){
        for(var id in item){
            return item[id]['image'];
        }
    }

  	onAddImageTap(imageType:string): void {
		console.log(imageType);
		if (this.firebaseService.authuser) {
			this.firebaseService.pickImage(imageType);
		} else {
			dialogs.alert("Cannot upload images in offline mode");
		}
	}


	onSaveTap(){
		var userProfileToUpdate = {
			country: this.country,
			interest: this.interest,
			introducing: this.introducing,
			language: this.language,
			backgroundPicsrc: this.firebaseService.currentBackgroundImageFileURL,
			profilePicsrc: this.firebaseService.currentProfileImageFileURL
		}
		this.firebaseService.setThisUserProfile(userProfileToUpdate);
	}
}
