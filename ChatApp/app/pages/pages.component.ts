import { Component, OnInit } from '@angular/core';
import * as ApplicationSettings from "application-settings";
import { FirebaseService } from '~/services/firebase.service';
import { Page } from "tns-core-modules/ui/page";

@Component({
  moduleId: module.id,
  selector: 'Pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  isLoginState: Boolean = false;
  isRegisterState: Boolean = false;
  isHomeState: Boolean = false;
  page: Page;
  constructor(private firebaseService: FirebaseService) { 
    // if user is logging in, 
    if(ApplicationSettings.getBoolean("authenticated", false)) {
      // this.firebaseService.setCurrentUser();
      this.setPageState("Home");
    }
    // if not
    else{
      // this.page.actionBarHidden = true;
      this.setPageState("Login")
    }
  }
  

  setPageState(page: string){
    this.isLoginState = false;
    this.isRegisterState = false;
    this.isHomeState = false;
    switch(page){
      case "Login":
        this.isLoginState = true;
        break;
      case "Register":
        this.isRegisterState = true;
        break;
      case "Home":
        this.isHomeState = true;
        break;
    }
  }

  loginPageEmit(args){
    var className: Array<any> = args.view.className.split(" ");
    className.forEach((element)=>{
      if(element==="register-tap"){
        this.setPageState("Register");
      }
      else if(element==="login-tap"){
        this.setPageState("Home");
      }
    });
    // this.setPageState("Register");
  }
  registerPageEmit(args){
    this.setPageState("Login");
  }
  homePageEmit(args){
    this.setPageState("Login");
  }

  ngOnInit() {

  }

}
