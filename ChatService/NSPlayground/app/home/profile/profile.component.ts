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
  selector: 'Profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	isOnline: boolean;
  	statusChangeSubscr: Subscription;
  
	private isUpdating: boolean = false;
	private isAddingNew: boolean = false;

	private removedImageUrl: string;
	genderOptionButtons?: Array<RadioOption>;
	gender: string = "";

	constructor(private routerExtensions: RouterExtensions,
		private firebaseService: FirebaseService,
		
	) { 
		this.isOnline = true;
	}
	ngOnInit() { 
		this.genderOptionButtons = [
			new RadioOption("Gender", "male"),
			new RadioOption("Gender", "female"),
		];
	}

	onTap(args: GestureEventData) {
		this.routerExtensions.back();
	}
	counter(i: number) {
		return new Array(i);
	}

  	onAddImageTap(imageType:string): void {
		if (this.isOnline) {
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
}
