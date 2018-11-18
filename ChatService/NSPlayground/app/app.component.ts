import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from "@angular/core";
import * as app from "application";
import * as ApplicationSettings from "application-settings";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { ActionButtonComponent } from "./home/searchresult/action-button/action-button.component";
import { FirebaseService } from "./services/firebase.service";
import firebase = require("nativescript-plugin-firebase");

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
    private _sideDrawerTransition: DrawerTransitionBase;
    public profilePicsrc = "~/home/images/user-avatar-main-picture.png";
    public name = "user";
    @ViewChild("actionButton") _buttonRef: ActionButtonComponent;

    user: Observable<firebase.User>;

    constructor(private routerExtensions: RouterExtensions,
        private firebaseService: FirebaseService
    ) {
        // Use the component constructor to inject services.

    }

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    closeDrawer(): void{
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    onHomeTap(): void{
        this.closeDrawer();
		this.firebaseService.get_user_posts(this.firebaseService.authuser.uid);
		this.routerExtensions.navigate(['/searchresult'], { animated: false });
		this._buttonRef.makeArrow();
    }

    profileTap(): void{
        this.closeDrawer();
        this.routerExtensions.navigate(['/profile'], { animated: false });
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
