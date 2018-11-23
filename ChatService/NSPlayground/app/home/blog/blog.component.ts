import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { TokenModel } from "nativescript-ui-autocomplete";
import { ScrollView, ScrollEventData } from "tns-core-modules/ui/scroll-view";
import * as dialogs from "ui/dialogs";

import { BlogService } from "./blog-service";
import { FirebaseService } from "../../services/firebase.service";
import { RouterExtensions } from "nativescript-angular/router";
import { GestureEventData } from "tns-core-modules/ui/gestures";
import { RadAutoCompleteTextViewComponent } from "nativescript-ui-autocomplete/angular";

import { MapExampleComponent } from "../friendmatching/map-example/map-example.component";

@Component({
  moduleId: module.id,
  selector: 'Blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  selectedLocation;
  selectedListPickerIndex: number = 0;
  location_collapsed:string = "[close]";
  location_height:number = 300; 
  image_collapsed:string = "[close]";
  image_height:number = 300;
  isUploaded:boolean = false;
  titleValue:string = "";
  descriptionValue:string = "";
  @ViewChild("scrollview") scrollview: ScrollView;
  @ViewChild("types") types: RadAutoCompleteTextViewComponent;
  @ViewChild("mapExampleComponent") mapExampleComponent: MapExampleComponent;
  constructor(
    private blogService: BlogService,
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
    if(this.location_collapsed == "[close]"){
      this.location_collapsed = "[open]";
      this.location_height = 0;
    }else{
      this.location_collapsed = "[close]";
      this.location_height = 300;
    }    
  }
  onImageToggleTap(){
    if(this.image_collapsed == "[close]"){
      this.image_collapsed = "[open]";
      this.image_height = 0;
    }else{
      this.image_collapsed = "[close]";
      this.image_height = 300;
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
    var post_roles = {};
    for(var user_id in this.firebaseService.thisUser){
      userEnneagramNum = this.firebaseService.thisUser[user_id]['enneagram']['number'];
      userEnneagramBehavior = this.firebaseService.thisUser[user_id]['enneagram']['behavior'];
      userEnneagramEmotion = this.firebaseService.thisUser[user_id]['enneagram']['emotion'];
      userEnneagramThought = this.firebaseService.thisUser[user_id]['enneagram']['thought'];
      userEnneagramState = this.firebaseService.thisUser[user_id]['enneagram']['state'];
      post_roles[user_id] = "owner";
    }

    console.log(this.firebaseService.thisUser);
    console.log(userEnneagramNum);
    var data_for_upload = {
      behavior : userEnneagramBehavior,
      emotion : userEnneagramEmotion,
      number : userEnneagramNum,
      state : userEnneagramState,
      thought : userEnneagramThought,
      closeTime : "",
      description : this.descriptionValue,
      image : this.firebaseService.currentBlogImageFileURL,
      isOpen : true,
      likes : 0,
      latitude: this.blogService.postLocation.position.latitude,
      longitude: this.blogService.postLocation.position.longitude,
      name : this.titleValue,
      openTime : Date.now(),
      roles : post_roles,
      type : this.blogService.postType
    }
    this.firebaseService.add_post(data_for_upload);
    this.routerExtensions.navigate(['/'], { animated: false });
  }
}
