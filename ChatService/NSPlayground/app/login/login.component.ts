import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import * as ApplicationSettings from "application-settings";
import {FirebaseService} from '../services/firebase.service';
import firebase = require("nativescript-plugin-firebase");

import { Page } from "tns-core-modules/ui/page";

import {User} from '../models/user.model';
import {Auth} from "./auth.model";

// import * as Admob from "nativescript-admob";
import { isIOS } from "tns-core-modules/platform";

@Component({
    moduleId: module.id,
    selector: "rr-login",
    templateUrl: "login.component.html",
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    public auth:Auth = new Auth();
    public message:string;
    private androidBannerId: string = "ca-app-pub-5445779750154576/7005154644";
    // private androidInterstitialId: string = "ca-app-pub-3940256099942544/6300978111";
    // private iosBannerId: string = "ca-app-pub-RRRR/TTTT";
    // private iosInterstitialId: string = "ca-app-pub-GGGG/HHHH";

    public constructor(private router: RouterExtensions,
        private routerExtensions: RouterExtensions,
        private firebaseService: FirebaseService,
        private page: Page
    ) {
        this.showBanner();
    }

    public ngOnInit() {
        if(ApplicationSettings.getBoolean("authenticated", false)) {
            this.router.navigate(["/home"], { clearHistory: true });
            this.firebaseService.setCurrentUser();
        }

        this.page.actionBarHidden = true;
    }

    public loginByEmail(auth:Auth) {
        this.firebaseService.loginByEmail(auth);
    }

    public loginByFacebook(){
        this.firebaseService.loginByFacebook();
    }

    public loginByGoogle(){
        this.firebaseService.loginByGoogle();
    }

    public handleInput(args){
        
    }

    // public createBanner() {
    //     Admob.createBanner({
    //         testing: true,
    //         size: Admob.AD_SIZE.SMART_BANNER,
    //         iosBannerId: this.iosBannerId,
    //         androidBannerId: this.androidBannerId,
    //         iosTestDeviceIds: ["yourTestDeviceUDIDs"],
    //         margins: {
    //             bottom: 0
    //         }
    //     }).then(function() {
    //         console.log("admob createBanner done");
    //     }, function(error) {
    //         console.log("admob createBanner error: " + error);
    //     });
    // }

    public showBanner(){
        setTimeout(() => {
            firebase.admob.showBanner({
                size: firebase.admob.AD_SIZE.SMART_BANNER, // see firebase.admob.AD_SIZE for all options
                margins: { // optfsdfional nr of device independent pixels from the top or bottom (don't set both)
                // bottom: 10,
                top: 0
                },
                androidBannerId: "ca-app-pub-5445779750154576/7005154644",
                // iosBannerId: "ca-app-pub-9517346003011652/3985369721",
                testing: false, // when not running in production set this to true, Google doesn't like it any other way
                // iosTestDeviceIds: [ //Android automatically adds the connected device as test device with testing:true, iOS does not
                //     "45d77bf513dfabc2949ba053da83c0c7b7e87715", // Eddy's iPhone 6s
                //     "fee4cf319a242eab4701543e4c16db89c722731f"  // Eddy's iPad Pro
                // ],
                keywords: ["keyword1", "keyword2"] // add keywords for ad targeting
            }).then(
                function () {
                console.log("AdMob banner showing");
                },
                function (errorMessage) {
                    alert("admob error");
                }
            )
        },
        1000);
    }

    // public hideBanner() {
    //     Admob.hideBanner().then(function() {
    //         console.log("admob hideBanner done");
    //     }, function(error) {
    //         console.log("admob hideBanner error: " + error);
    //     });
    // }

    // public createInterstitial() {
    //     Admob.createInterstitial({
    //         testing: true,
    //         iosInterstitialId: this.iosInterstitialId,
    //         androidInterstitialId: this.androidInterstitialId,
    //         iosTestDeviceIds: ["yourTestDeviceUDIDs"]
    //     }).then(function() {
    //         console.log("admob createInterstitial done");
    //     }, function(error) {
    //         console.log("admob createInterstitial error: " + error);
    //     });
    // }
}
