import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from "@angular/core";
import * as app from "application";
import * as ApplicationSettings from "application-settings";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { ActionButtonComponent } from "~/modules/buttons/action-button/action-button.component";
import { FirebaseService } from "./services/firebase.service";
import firebase = require("nativescript-plugin-firebase");

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    private _sideDrawerTransition: DrawerTransitionBase;
    public profilePicsrc = "res://noprofilepicture";
    public name = "user";
    public email = "user@email";
    @ViewChild("actionButton") _buttonRef: ActionButtonComponent;

    user: Observable<firebase.User>;

    constructor(private routerExtensions: RouterExtensions,
        private firebaseService: FirebaseService
    ) {
        // Use the component constructor to inject services.
    }

    ngOnInit(): void {
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
