import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { TokenModel } from "nativescript-ui-autocomplete";
import { ScrollView, ScrollEventData } from "tns-core-modules/ui/scroll-view";
import * as dialogs from "ui/dialogs";

import { UploadpostService } from "./uploadpost-service";
import { FirebaseService } from "~/services/firebase.service";
import { RouterExtensions } from "nativescript-angular/router";
import { GestureEventData } from "tns-core-modules/ui/gestures";
import { RadAutoCompleteTextViewComponent } from "nativescript-ui-autocomplete/angular";

import { GoogleMapComponent } from "~/modules/google-map/google-map.component";

@Component({
  moduleId: module.id,
  selector: 'Uploadpost',
  templateUrl: './uploadpost.component.html',
  styleUrls: ['./uploadpost.component.scss']
})
export class UploadpostComponent implements OnInit {
  selectedLocation;
  selectedListPickerIndex: number = 0;
  locationCollapsed:string = "[close]";
  locationHeight:number = 300; 
  imageCollapsed:string = "[close]";
  imageHeight:number = 300;
  isUploaded:boolean = false;
  titleValue:string = "";
  descriptionValue:string = "";
  @ViewChild("scrollview") scrollview: ScrollView;
  @ViewChild("types") types: RadAutoCompleteTextViewComponent;
  @ViewChild("googleMapComponent") googleMapComponent: GoogleMapComponent;
  constructor(
    private uploadpostService: UploadpostService,
    private firebaseService: FirebaseService,
    private routerExtensions: RouterExtensions,
  ) {

  }

  ngOnInit() {

  }

  onTap(args: GestureEventData) {
    this.routerExtensions.back();
	}

  selectLocation() {

  }
  selectImage(imageType:string): void {
		if (this.firebaseService.thisUser) {
      this.isUploaded = true;
      this.firebaseService.pickImage(imageType);
		} else {
			dialogs.alert("Cannot upload images in offline mode");
		}
	}
  onLacationToggleTap(){
    if(this.locationCollapsed == "[close]"){
      this.locationCollapsed = "[open]";
      this.locationHeight = 0;
    }else{
      this.locationCollapsed = "[close]";
      this.locationHeight = 300;
    }    
  }
  
  onImageToggleTap(){
    if(this.imageCollapsed == "[close]"){
      this.imageCollapsed = "[open]";
      this.imageHeight = 0;
    }else{
      this.imageCollapsed = "[close]";
      this.imageHeight = 300;
    }
  }
  onMapScroll(args: ScrollEventData){
    this.scrollview.isUserInteractionEnabled = false;
  }
  onUploadTap(){
    if(!this.isUploaded){
      dialogs.alert("Please Select a image for post.");
      return;
    }
    else if(this.titleValue===""){
      dialogs.alert("Please Enter a title for post.");
      return;
    }

    var userEnneagramNum;
    var userEnneagramBehavior;
    var userEnneagramEmotion;
    var userEnneagramThought;
    var userEnneagramState;
    var postRoles = {};
    for(var userID in this.firebaseService.thisUser){
      userEnneagramNum = this.firebaseService.thisUser[userID]['enneagram']['number'];
      userEnneagramBehavior = this.firebaseService.thisUser[userID]['enneagram']['behavior'];
      userEnneagramEmotion = this.firebaseService.thisUser[userID]['enneagram']['emotion'];
      userEnneagramThought = this.firebaseService.thisUser[userID]['enneagram']['thought'];
      userEnneagramState = this.firebaseService.thisUser[userID]['enneagram']['state'];
      postRoles[userID] = "owner";
    }

    console.log(this.firebaseService.thisUser);
    console.log(userEnneagramNum);
    var uploadData = {
      behavior : userEnneagramBehavior,
      emotion : userEnneagramEmotion,
      number : userEnneagramNum,
      state : userEnneagramState,
      thought : userEnneagramThought,
      description : this.descriptionValue,
      image : this.firebaseService.currentBlogImageFileURL,
      isOpen : true,
      likes : "",
      favorites : "",
      comments : "",
      name : this.titleValue,
      openTime : Date.now(),
      closeTime : "",
      roles : postRoles,
      latitude: this.uploadpostService.postLocation.position.latitude,
      longitude: this.uploadpostService.postLocation.position.longitude,
      type : this.uploadpostService.postType
    }
    this.firebaseService.addPost(uploadData);
    this.routerExtensions.navigate(['/'], { animated: false });
  }
}
