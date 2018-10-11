import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";
import { FriendlistComponent } from "./home/friendlist/friendlist.component";
import { FriendmatchingComponent } from "./home/friendmatching/friendmatching.component";
import { FriendchatComponent } from "./home/friendchat/friendchat.component";
import { ChatRoomComponent } from "./home/friendchat/chat-room/chat-room.component";
import { IdeamatchingComponent } from "./home/ideamatching/ideamatching.component";
import { DetailsComponent } from "./home/ideamatching/details/details.component";
import { EnneagramComponent } from "./home/enneagram/enneagram.component";
import { MapExampleComponent } from "./home/friendmatching/map-example/map-example.component";
const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "home", redirectTo: "/home/(friendlistoutlet:friendlist//friendchatoutlet:friendchat//friendmatchingoutlet:friendmatching//ideamatchingoutlet:ideamatching)", pathMatch: "full" },
    {
        path: 'home', component: HomeComponent, children: [
            { path: 'friendlist', component: FriendlistComponent, outlet: 'friendlistoutlet' },
            { path: 'friendchat', component: FriendchatComponent, outlet: 'friendchatoutlet' },
            { path: 'friendmatching', component: FriendmatchingComponent, outlet: 'friendmatchingoutlet' },
            // { path: 'ideamatching', component: IdeamatchingComponent, outlet: 'ideamatchingoutlet' },
            { path: 'ideamatching', component: MapExampleComponent, outlet: 'ideamatchingoutlet' },
        ]
    },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "details", component: DetailsComponent },
    { path: "chatroom", component: ChatRoomComponent },
    { path: 'enneagram', component: EnneagramComponent },
    { path: 'map', component: MapExampleComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
