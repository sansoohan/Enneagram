import { Component, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { ActionButtonComponent } from "~/modules/buttons/action-button/action-button.component";
import { FriendlistComponent } from "./friendlist/friendlist.component";
import { FriendchatComponent } from "./friendchat/friendchat.component";
import { FriendmatchingComponent } from "./friendmatching/friendmatching.component";
import { IdeamatchingComponent } from "./ideamatching/ideamatching.component";

import { SelectedIndexChangedEventData } from "tns-core-modules/ui/tab-view";
import { View } from "tns-core-modules/ui/core/view";
import { alert, confirm, prompt, login, action, inputType } from "tns-core-modules/ui/dialogs";
import firebase = require("nativescript-plugin-firebase");
import firebaseWeb = require("nativescript-plugin-firebase/app");

var fs = require("tns-core-modules/file-system");
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

import { FirebaseService} from "../../services/firebase.service";
@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})

export class HomeComponent implements OnInit {
    @ViewChild("actionButton") _buttonRef: ActionButtonComponent;
    @ViewChild("friendlistComponent") friendlistComponent: FriendlistComponent;
    @ViewChild("friendchatComponent") friendchatComponent: FriendchatComponent;
    @ViewChild("friendmatchingComponent") friendmatchingComponent: FriendmatchingComponent;
    @ViewChild("ideamatchingComponent") ideamatchingComponent: IdeamatchingComponent;
    public tabSelectedIndex: number;
    public tabSelectedIndexResult: string;
    thisUser: any;
    title: string;
    friendlistIcon: string;
    friendchatIcon: string;
    friendmatchingIcon: string;
    ideamatchingIcon: string;
    constructor(
        private routerExtensions: RouterExtensions,
        private activeRoute: ActivatedRoute,
        private firebaseServices: FirebaseService,
    ) {
        // Use the component constructor to inject providers.
        this.friendlistIcon = '~/pages/home/images/user-avatar-main-picture.png';
        this.friendchatIcon = '~/pages/home/images/speech-bubble.png';
        this.friendmatchingIcon = '~/pages/home/images/magnifier-with-a-heart.png';
        this.ideamatchingIcon = '~/pages/home/images/magnifier-with-a-star.png';
    }



    onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
        if (args.oldIndex !== -1) {
            const newIndex = args.newIndex;
            if (newIndex === 0) {
            } else if (newIndex === 1) {
            } else if (newIndex === 2) {
                if (this.firebaseServices.thisUser.enneagram.number === 0) {
                    this.enneagramConfirm();
                }
            } else if (newIndex === 3) {
                if (this.firebaseServices.thisUser.enneagram.number === 0) {
                    this.enneagramConfirm();
                }
            }
        }
        if(args.oldIndex == 0){
            this.friendlistComponent.closeModal();
            this.friendlistComponent.closeModal();
            if(this.friendlistComponent.drawer){
                this.friendlistComponent.onFloatButtonTap();
                this.friendlistComponent.floatButton.button.className ="float-btn down";
            }
        }
    }
    enneagramConfirm() {
        confirm({
            title: "Matching Friend",
            message: "You can get new friends. \n Please fill your enneagram status.",
            cancelButtonText: "Later",
            okButtonText: "Go Enneagram",
        }).then((result) => {
            if (result === true) {
                this.routerExtensions.navigate(['/enneagram'], { animated: false });
                this._buttonRef.makeArrow();
            }
        });
    }
    ideamatchingTap() {
        if (this.ideamatchingIcon = '~/pages/home/images/magnifier-with-a-star-locked.png') {

        }
    }


    ngOnInit(): void {

    }

    afterLogin(): void{
        // Init your component properties here.
        if (this.firebaseServices.thisUser.enneagram.number === 0) {
            this.friendmatchingIcon = '~/pages/home/images/magnifier-with-a-heart-locked.png';
        }
        if (this.firebaseServices.thisUser.enneagram.number === 0) {
            this.ideamatchingIcon = '~/pages/home/images/magnifier-with-a-star-locked.png';
        }
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
