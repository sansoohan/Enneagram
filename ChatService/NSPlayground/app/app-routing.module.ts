import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { HomeComponent } from "./home/home.component";
import { FriendlistComponent } from "./home/friendlist/friendlist.component";
import { FriendmatchingComponent } from "./home/friendmatching/friendmatching.component";
import { FriendchatComponent } from "./home/friendchat/friendchat.component";
import { ChatRoomComponent } from "./home/friendchat/chat-room/chat-room.component";
import { IdeamatchingComponent } from "./home/ideamatching/ideamatching.component";
import { DetailsComponent } from "./home/ideamatching/details/details.component";

const routes: Routes = [
    { path: "", redirectTo: "/home/(friendlistoutlet:friendlist//friendchatoutlet:friendchat//friendmatchingoutlet:friendmatching//ideamatchingoutlet:ideamatching)", pathMatch: "full" },
    {
        path: 'home', component: HomeComponent, children: [
            { path: 'friendlist', component: FriendlistComponent, outlet: 'friendlistoutlet' },
            { path: 'friendchat', component: FriendchatComponent, outlet: 'friendchatoutlet' },
            { path: 'friendmatching', component: FriendmatchingComponent, outlet: 'friendmatchingoutlet' },
            { path: 'ideamatching', component: IdeamatchingComponent, outlet: 'ideamatchingoutlet' },
        ]
    },
    { path: "details", component: DetailsComponent },
    { path: "chatroom", component: ChatRoomComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
