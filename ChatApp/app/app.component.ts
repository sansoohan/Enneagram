import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from "@angular/core";
import * as app from "application";
import * as ApplicationSettings from "application-settings";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { ActionButtonComponent } from "./modules/buttons/action-button/action-button.component";
import { FirebaseService } from "./services/firebase.service";
import * as firebase from "nativescript-plugin-firebase";

@Component({
  selector: "ns-app",
  templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
  private _sideDrawerTransition: DrawerTransitionBase;
  public profilePicsrc = "res://noprofilepicture";
  public name = "user";
  public email = "user@email";

  @ViewChild("actionButton",{static: false}) _buttonRef: ActionButtonComponent;

  user: Observable<firebase.User>;

  constructor(private routerExtensions: RouterExtensions,
    private firebaseService: FirebaseService
  ) {
    // Use the component constructor to inject services.
  }

  ngOnInit(): void {
    firebase.init({
      onPushTokenReceivedCallback: function(token) {
          console.log("Firebase push token: " + token);
      },
      onMessageReceivedCallback: (message) => {
          console.log(`Title: ${message.title}`);
          console.log(`Body: ${message.body}`);
          // if your server passed a custom property called 'foo', then do this:
          console.log(`Value of 'foo': ${message.data.foo}`);
      },
      //persist should be set to false as otherwise numbers aren't returned during livesync
      persist: true,
      onAuthStateChanged: function(data) { // optional but useful to immediately re-logon the user when he re-visits your app
          // console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
          if (data.loggedIn) {
          //   console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
          }
      },
      onDynamicLinkCallback: function (result) {
          console.log("Dynamic Link: " + result.url);
      },
      //storageBucket: 'gs://yowwlr.appspot.com',
    }).then(
      () => {
        console.log("firebase.init done");
      },
      error => {
        console.log(`firebase.init error: ${error}`);
      }
    );


    this._sideDrawerTransition = new SlideInOnTopTransition();
    setInterval(()=>{
      if(this.firebaseService.authuser){
        this.profilePicsrc = this.firebaseService.thisUser[this.firebaseService.authuser.uid]['profile']['profilePicsrc'];
        this.name =  this.firebaseService.thisUser[this.firebaseService.authuser.uid]['profile']['name'];
        this.email =  this.firebaseService.thisUser[this.firebaseService.authuser.uid]['profile']['email'];  
      }
    },5000);
  }

  closeDrawer(): void{
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.closeDrawer();
  }

  onHomeTap(): void{
    this.closeDrawer();
		this.firebaseService.getUserPosts(this.firebaseService.authuser.uid);
		this.routerExtensions.navigate(['/searchresult'], { animated: false });
		this._buttonRef.makeArrow();
  }

  profileTap(): void{
    this.closeDrawer();
    this.routerExtensions.navigate(['/profile-input'], { animated: false });
    this._buttonRef.makeArrow();
  }

  settingTap(): void{
    this.closeDrawer();
    this.routerExtensions.navigate(['/setting'], { animated: false });
    this._buttonRef.makeArrow();
  }

  enneagramTap(): void {
    this.closeDrawer();
    this.routerExtensions.navigate(['/enneagram'], { animated: false });
    this._buttonRef.makeArrow();
  }

  logoutTap(): void{
    this.closeDrawer();
    this.firebaseService.logout();
    ApplicationSettings.setBoolean("authenticated", false);
    this.routerExtensions.navigate(["/login"], { clearHistory: true });
  }
  get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }  
}
