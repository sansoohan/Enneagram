import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { TokenModel } from "nativescript-ui-autocomplete";

import * as dialogs from "ui/dialogs";

import { BlogService } from "./blog-service";
import { FirebaseService } from "../../services/firebase.service";
import { RouterExtensions } from "nativescript-angular/router";
import { GestureEventData } from "tns-core-modules/ui/gestures";
import { RadAutoCompleteTextViewComponent } from "nativescript-ui-autocomplete/angular";
import { ScrollView, ScrollEventData } from "tns-core-modules/ui/scroll-view";

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
  @ViewChild("scrollview") scrollview: ScrollView;
  @ViewChild("types") types: RadAutoCompleteTextViewComponent;



  constructor(private blogService: BlogService,
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
			this.firebaseService.pickImage(imageType);
		} else {
			dialogs.alert("Cannot upload images in offline mode");
		}
	}
  onUploadTap(){
    
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

}
