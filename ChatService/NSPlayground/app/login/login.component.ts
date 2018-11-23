import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import * as ApplicationSettings from "application-settings";
import {FirebaseService} from '../services/firebase.service';

import {User} from '../models/user.model';
import {Auth} from "./auth.model";
@Component({
    moduleId: module.id,
    selector: "rr-login",
    templateUrl: "login.component.html",
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    public auth:Auth = new Auth();

    
    public constructor(private router: RouterExtensions,
        private routerExtensions: RouterExtensions,
        private firebaseService: FirebaseService) {
            
    }

    public ngOnInit() {
        if(ApplicationSettings.getBoolean("authenticated", false)) {
            this.router.navigate(["/home"], { clearHistory: true });
            this.firebaseService.setCurrentUser();
        }
    }

    public login(auth:Auth) {
        this.firebaseService.login(auth);
    }

    public handleInput(args){
        
    }
}
