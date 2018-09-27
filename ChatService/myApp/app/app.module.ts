import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { FirebaseService } from "./services/firebase.service";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./components/home/home.component";
import { FriendlistComponent } from "./components/home/friendlist/friendlist.component";
import { FriendmatchingComponent } from "./components/home/friendmatching/friendmatching.component";
import { IdeamatchingComponent } from "./components/home/ideamatching/ideamatching.component";
import { FriendchatComponent } from "./components/home/friendchat/friendchat.component";


@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        FriendlistComponent,
        FriendmatchingComponent,
        IdeamatchingComponent,
        FriendchatComponent,
    ],
    providers: [FirebaseService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
