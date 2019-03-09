import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { TokenModel } from "nativescript-ui-autocomplete";
import { ScrollView, ScrollEventData } from "tns-core-modules/ui/scroll-view";
import * as dialogs from "ui/dialogs";
import firebase = require("nativescript-plugin-firebase");

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
  isOpened:boolean;
  openTime:any;
  closeTime:any;
  postRoles:any;
  descriptionValue:string = "";
  @ViewChild("scrollview") scrollview: ScrollView;
  @ViewChild("types") types: RadAutoCompleteTextViewComponent;
  @ViewChild("googleMapComponent") googleMapComponent: GoogleMapComponent;


  private userEnneagramNum;
  private userEnneagramBehavior;
  private userEnneagramEmotion;
  private userEnneagramThought;
  private userEnneagramState;

  loadedData: any;
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
  loadPost(){
    this.loadedData = this.firebaseService.getPost();
    this.loadedData = JSON.parse(JSON.stringify(this.loadedData));
    this.userEnneagramBehavior = this.loadedData['behavior'];
    this.userEnneagramEmotion = this.loadedData['emotion'];
    this.userEnneagramNum = this.loadedData['number'];
    this.userEnneagramState = this.loadedData['state'];
    this.userEnneagramThought = this.loadedData['thought'];
    this.descriptionValue = this.loadedData['description'];
    this.firebaseService.currentBlogImageFileURL = this.loadedData['image'];
    this.isOpened = this.loadedData['isOpen'];
    this.titleValue = this.loadedData['name'];
    this.openTime = this.loadedData['openTime'];
    this.closeTime = this.loadedData['closeTime'];
    this.postRoles = this.loadedData['roles'];
    this.uploadpostService.postLocation.position.latitude = this.loadedData['latitude'];
    this.uploadpostService.postLocation.position.longitude = this.loadedData['longitude'];
    this.uploadpostService.postType = this.loadedData['type'];
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

    // Default Data for the First Posting.
    if(this.loadedData == null){
      this.postRoles = {};
      for(var userID in this.firebaseService.thisUser){
        this.userEnneagramNum = this.firebaseService.thisUser[userID]['enneagram']['number'];
        this.userEnneagramBehavior = this.firebaseService.thisUser[userID]['enneagram']['behavior'];
        this.userEnneagramEmotion = this.firebaseService.thisUser[userID]['enneagram']['emotion'];
        this.userEnneagramThought = this.firebaseService.thisUser[userID]['enneagram']['thought'];
        this.userEnneagramState = this.firebaseService.thisUser[userID]['enneagram']['state'];
        this.postRoles[userID] = "owner";
      }
      this.openTime = firebase.firestore.FieldValue.serverTimestamp();
      this.isOpened = true;
    }
    else{
      // Use loaded Data.
    }

    console.log(this.firebaseService.thisUser);
    console.log(this.userEnneagramNum);
    var uploadData = {
      behavior : this.userEnneagramBehavior,
      emotion : this.userEnneagramEmotion,
      number : this.userEnneagramNum,
      state : this.userEnneagramState,
      thought : this.userEnneagramThought,
      description : this.descriptionValue,
      image : this.firebaseService.currentBlogImageFileURL,
      isOpened : this.isOpened,
      name : this.titleValue,
      openTime : this.openTime,
      closeTime : this.closeTime,
      roles : this.postRoles,
      latitude: this.uploadpostService.postLocation.position.latitude,
      longitude: this.uploadpostService.postLocation.position.longitude,
      type : this.uploadpostService.postType
    }
    this.firebaseService.addPost(uploadData);
    this.routerExtensions.navigate(['/'], { animated: false });
  }
  setCloseTime() {
    this.closeTime = firebase.firestore.FieldValue.serverTimestamp();
  }
  toggleOpened(){
    this.isOpened = !this.isOpened;
  }
}
