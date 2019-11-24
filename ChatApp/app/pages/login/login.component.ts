import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { FirebaseService } from '~/services/firebase.service';
const firebase = require("nativescript-plugin-firebase");

import { Page } from "tns-core-modules/ui/page";
import { Auth } from "./auth.model";

@Component({
    moduleId: module.id,
    selector: "Login",
    templateUrl: "login.component.html",
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    public auth:Auth = new Auth();
    public message:string;

    @Output() tap: EventEmitter<any> = new EventEmitter<any>();

    public constructor(private router: RouterExtensions,
        private routerExtensions: RouterExtensions,
        private firebaseService: FirebaseService,
        private page: Page
    ) {

    }

    public ngOnInit() {
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


    onRegisterTap(args) {
        this.tap.emit(args);
	}
}
