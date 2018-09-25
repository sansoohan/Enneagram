import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { HomeComponent } from "./components/home/home.component";
import { FriendlistComponent } from "./components/home/friendlist/friendlist.component";
import { FriendmatchingComponent } from "./components/home/friendmatching/friendmatching.component";
import { IdeamatchingComponent } from "./components/home/ideamatching/ideamatching.component";
import { FriendchatComponent } from "./components/home/friendchat/friendchat.component";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "home", redirectTo: "/home/(friendlistoutlet:friendlist//friendmatchingoutlet:friendmatching)", pathMatch: "full" },
    {
        path: 'home', component: HomeComponent, children: [
            { path: 'friendlist', component: FriendlistComponent, outlet: 'friendlistoutlet' },
            { path: 'friendmatching', component: FriendmatchingComponent, outlet: 'friendmatchingoutlet' },
            { path: 'ideamatching', component: IdeamatchingComponent, outlet: 'ideamatchingoutlet' },
            { path: 'friendchat', component: FriendchatComponent, outlet: 'friendchatoutlet' },
        ]
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
