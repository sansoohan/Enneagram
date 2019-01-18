import { Component, EventEmitter, Output } from "@angular/core";
import { Location } from "@angular/common";
import { FirebaseService } from '~/services/firebase.service';

@Component({
    moduleId: module.id,
    selector: "Register",
    templateUrl: "register.component.html",
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
    email:string;
    passwd:string;
    passwdConfirm:string;

    @Output() tap: EventEmitter<any> = new EventEmitter<any>();
    public constructor(private location: Location, private firebaseService: FirebaseService) {
    }

    public goBack() {
        this.location.back();
    }
    signUp() {
        if(this.passwd !== this.passwdConfirm){
            alert("Password confirm error. Please retype passwd and passwdConfirm");
            this.passwd = null;
            this.passwdConfirm = null;
        }
        this.firebaseService.register(this.email, this.passwd)
        .then(() => {
            this.location.back();
        })
        .catch((message:any) => {
            alert(message);
        });
    }

    onBackTap(args) {
        this.tap.emit(args);
	}
}
