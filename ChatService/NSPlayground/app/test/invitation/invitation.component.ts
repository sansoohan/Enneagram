import { Component, OnInit } from '@angular/core';
import firebase = require("nativescript-plugin-firebase");
@Component({
    moduleId: module.id,
    selector: 'Invitation',
    templateUrl: './invitation.component.html',
    styleUrls: ['./invitation.component.css']
})
export class InvitationComponent implements OnInit {
    constructor() {

    }
    ngOnInit() {
        this.getInvitation();
        // this.invite();
    }
    invite(){
        firebase.invites.sendInvitation({
        title: "Invite title here",
        message: "Invite message here",
        customImage: "./test/images/qrcode.png",
        deepLink: "https://friendlibrary.page.link/welcome"
        }).then(
            function (result) { // SendInvitationResult
            console.log(result.count + "invitations sent, ID's: " + JSON.stringify(result.invitationIds));
            },
            function (error) {
                console.log("sendInvitation error: " + error);
            }
        );
    }
    getInvitation(){
        firebase.invites.getInvitation().then(
            function (result) { // GetInvitationResult
              console.log("deepLink: " + result.deepLink + ", invitationId: " + result.invitationId+ ", matchType: "+ result.matchType);
            },
            function (error) {
              console.log("getInvitation error: " + error);
            }
        );
    }
}
