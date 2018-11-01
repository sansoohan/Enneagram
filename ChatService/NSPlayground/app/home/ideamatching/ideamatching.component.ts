import { Component, OnInit,ViewChild } from '@angular/core';
import { BlogService } from "../blog/blog-service";
import { RouterExtensions } from "nativescript-angular/router";
import { FirebaseService } from "../../services/firebase.service";
import { ActionButtonComponent } from "../searchresult/action-button/action-button.component";
import { alert, confirm, prompt, login, action, inputType } from "tns-core-modules/ui/dialogs";
@Component({
  moduleId: module.id,
  selector: 'IdeaMatching',
  templateUrl: './ideamatching.component.html',
  styleUrls: ['./ideamatching.component.css']
})
export class IdeamatchingComponent implements OnInit {
  private _buttonRef: ActionButtonComponent;

  constructor(private blogService: BlogService,
    private routerExtensions: RouterExtensions, 
    private firebaseService: FirebaseService,
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
				this.activityCheck("Do you have some Idea?", result);
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
      if (result == true && state == true) {this.lastCheck(this.onFollowMeTap,"Can you show your idea as a image?")}
      else if (result == false && state == true) {this.lastCheck(this.onAdviceTap,"Can you give some advice?")}
      else if (result == true && state == false) {this.lastCheck(this.onHelpMeTap,"Can you show what you are worry about as a image?")}
      else if (result == false && state == false) {this.lastCheck(this.onIdeaTap,"Do you need some idea?")}
		});
  }
  lastCheck(activity, lastCheckMessage:string){
    activity().bind(this);
    // confirm({
		// 	title: "Choose Your Activity",
		// 	message: lastCheckMessage,
    //   cancelButtonText: "No",
		// 	okButtonText: "Yes",
		// }).then((result) => {
    //   if(result == true){
    //     activity();
    //   }
		// });
  }

  onIdeaTap(){
      
  }
  onFollowMeTap(){
    this.blogService.postType = "follow me";
    this.routerExtensions.navigate(['/blog'], { animated: false });
    this._buttonRef.makeArrow();
  }
  onAdviceTap(){

  }
  onHelpMeTap(){
    this.blogService.postType = "help me";
    this.routerExtensions.navigate(['/blog'], { animated: false });
    this._buttonRef.makeArrow();
  }
}