import {Injectable, NgZone} from "@angular/core";
import { Kinvey } from "kinvey-nativescript-sdk";
import { User } from "./user.model";


import firebase = require("nativescript-plugin-firebase");

@Injectable()
export class FirebaseService {
    constructor(
        private ngZone: NgZone,
    ){

    }

    register(user: User) {
        return firebase.createUser({
            email: user.email,
            password: user.password
        }).then(
            function (result:any) {
            return JSON.stringify(result);
            },
            function (errorMessage:any) {
            alert(errorMessage);
            }
        )
    }

    login(user: User) {
        return firebase.login({
        type: firebase.LoginType.PASSWORD,
        passwordOptions: {
            email: user.email,
            password: user.password
        }
        }).then((result: any) => {
            return JSON.stringify(result);
        }, (errorMessage: any) => {
            alert(errorMessage);
        });
    }
    resetPassword(email) {
        return Kinvey.User.resetPassword(email)
            .catch(this.handleErrors);
    }
    handleErrors(error: Kinvey.BaseError) {
        console.error(error.message);
    }
}




@Injectable()
export class UserService {
    register(user: User) {
        return new Promise((resolve, reject) => {
            Kinvey.User.logout()
                .then(() => {
                    Kinvey.User.signup({ username: user.email, password: user.password })
                        .then(resolve)
                        .catch((error) => { this.handleErrors(error); reject(); })
                })
                .catch((error) => { this.handleErrors(error); reject(); })
        });
    }

    login(user: User) {
        return new Promise((resolve, reject) => {
            Kinvey.User.logout()
                .then(() => {
                    Kinvey.User.login(user.email, user.password)
                        .then(resolve)
                        .catch((error) => { this.handleErrors(error); reject(); })
                })
                .catch((error) => { this.handleErrors(error); reject(); })
        });
    }

    resetPassword(email) {
        return Kinvey.User.resetPassword(email)
            .catch(this.handleErrors);
    }

    handleErrors(error: Kinvey.BaseError) {
        console.error(error.message);
    }
}
