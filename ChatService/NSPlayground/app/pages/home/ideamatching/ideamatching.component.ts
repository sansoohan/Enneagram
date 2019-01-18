import { Component, OnInit,ViewChild } from '@angular/core';
import { UploadpostService } from "../uploadpost/uploadpost-service";
import { RouterExtensions } from "nativescript-angular/router";
import { FirebaseService } from "~/services/firebase.service";
import { ActionButtonComponent } from "~/modules/buttons/action-button/action-button.component";
import { alert, confirm, prompt, login, action, inputType } from "tns-core-modules/ui/dialogs";
import { SearchService } from "../searchoption/search-service";

@Component({
  moduleId: module.id,
  selector: 'Ideamatching',
  templateUrl: './ideamatching.component.html',
  styleUrls: ['./ideamatching.component.css']
})
export class IdeamatchingComponent implements OnInit {
  private _buttonRef: ActionButtonComponent;

  constructor(
    private uploadpostService: UploadpostService,
    private routerExtensions: RouterExtensions, 
    private firebaseService: FirebaseService,
    private searchService: SearchService
  ) {}
  ngOnInit() { }

  onStateCheckTap(){
    console.log(this.firebaseService.thisUser);
    for(var uid in this.firebaseService.thisUser){
      switch(this.firebaseService.thisUser[uid]['enneagram']['number']){
        case 1: case 3: case 5: this.stateCheckConfirm("Success","Failure"); break;
        case 7: case 9: case 2: this.stateCheckConfirm("Positive","Negative"); break;
        case 4: case 6: case 8: this.stateCheckConfirm("Trusted","Betrayed"); break;
        default: break;
      }
    }
  }
	stateCheckConfirm(good_state:string, bad_state:string) {
		confirm({
			title: "Choose Your Current State. It helps you to find or share idea.",
			cancelButtonText: bad_state,
			okButtonText: good_state,
		}).then((result) => {
			if (result == true) {
				this.activityCheck("Do you have some good Idea?", result);
      }
      else {
        this.activityCheck("Do you have any worries?", result);
      }
		});
	}
  activityCheck(activityMessage:string, state:boolean) {
		confirm({
			title: "Choose Your Activity",
			message: activityMessage,
      cancelButtonText: "No",
			okButtonText: "Yes",
		}).then((result) => {
      if (result == true && state == true) {this.lastCheck(result, state,"Can you show your idea as a image?")}
      else if (result == false && state == true) {this.lastCheck(result, state,"Can you give some advice?")}
      else if (result == true && state == false) {this.lastCheck(result, state,"Can you show what you are worry about as a image?")}
      else if (result == false && state == false) {this.lastCheck(result, state,"Do you need some idea?")}
		});
  }
  lastCheck(state1, state2, lastCheckMessage:string){
    confirm({
			title: "Choose Your Activity",
			message: lastCheckMessage,
      cancelButtonText: "No",
			okButtonText: "Yes",
		}).then((result) => {
      if(result){
        if (state1 == true && state2 == true) {this.onFollowMeTap();}
        else if (state1 == false && state2 == true) {this.onAdviceTap();}
        else if (state1 == true && state2 == false) {this.onHelpMeTap();}
        else if (state1 == false && state2 == false) {this.onIdeaTap();}
      }
		});
  }

  onIdeaTap(){
		this.searchService.postType = "idea";
		this.routerExtensions.navigate(['/searchoption'], { animated: false });
		this._buttonRef.makeArrow();
  }
  onFollowMeTap(){
    this.uploadpostService.postType = "idea";
    this.routerExtensions.navigate(['/uploadpost'], { animated: false });
    this._buttonRef.makeArrow();
  }
  onAdviceTap(){
		this.searchService.postType = "help";
		this.routerExtensions.navigate(['/searchoption'], { animated: false });
		this._buttonRef.makeArrow();
  }
  onHelpMeTap(){
    this.uploadpostService.postType = "help";
    this.routerExtensions.navigate(['/uploadpost'], { animated: false });
    this._buttonRef.makeArrow();
  }
}