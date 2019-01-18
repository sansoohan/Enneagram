import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { HomeComponent } from "./pages/home/home.component";
import { ChatRoomComponent } from "./pages/home/chat-room/chat-room.component";
import { IdeamatchingComponent } from "./pages/home/ideamatching/ideamatching.component";
import { SearchResultComponent } from "./pages/home/searchresult/searchresult.component";
import { DetailsComponent } from "./pages/home/searchresult/details/details.component";
import { EnneagramComponent } from "./pages/enneagram/enneagram.component";
import { GoogleMapComponent } from "./modules/google-map/google-map.component";
import { UploadpostComponent } from "./pages/home/uploadpost/uploadpost.component";
import { ProfileInputComponent } from "./pages/profile-input/profile-input.component";
import { SettingComponent } from "./pages/setting/setting.component";
import { SearchOptionComponent } from "./pages/home/searchoption/searchoption.component";
import { FriendaddComponent } from "./pages/home/friendadd/friendadd.component";
import { PagesComponent } from "~/pages/pages.component";

import { FacedetectionComponent } from "./test/facedetection/facedetection.component";
import { AdmobComponent } from "./test/admob/admob.component";
import { GoogleAnalyticsComponent } from "./modules/google-analytics/google-analytics.component";

const routes: Routes = [
    { path: "", redirectTo: "pages", pathMatch: "full" },
    { path: "pages", component: PagesComponent },
    { path: "login", component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: "register", component: RegisterComponent },
    { path: "details", component: DetailsComponent },
    { path: "chatroom", component: ChatRoomComponent },
    { path: 'enneagram', component: EnneagramComponent },
    { path: 'map', component: GoogleMapComponent },
    { path: 'uploadpost', component: UploadpostComponent},
    { path: 'ideamatching', component: IdeamatchingComponent },
    { path: 'searchresult', component: SearchResultComponent },
    { path: 'searchoption', component: SearchOptionComponent },
    { path: 'friendadd', component: FriendaddComponent},
    { path: 'profile-input', component: ProfileInputComponent},
    { path: 'setting', component: SettingComponent}
];


@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
