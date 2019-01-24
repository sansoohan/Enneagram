import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptUIAutoCompleteTextViewModule } from "nativescript-ui-autocomplete/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';
import { FormsModule } from '@angular/forms';

import { FirebaseService } from "./services/firebase.service";
import { AnimationsService } from "./pages/home/searchresult/animations-service";
import { UploadpostService } from "./pages/home/uploadpost/uploadpost-service";
import { SearchService } from "./pages/home/searchoption/search-service";

import { AppRoutingModule } from "./app-routing.module";
import { GoogleMapComponent } from "./modules/google-map/google-map.component";
import { GoogleAnalyticsComponent } from "./modules/google-analytics/google-analytics.component";

import { AppComponent } from "./app.component";
    import { PagesComponent } from "./pages/pages.component";
        import { LoginComponent } from "./pages/login/login.component";
            import { RegisterComponent } from "./pages/register/register.component";
        import { HomeComponent } from "./pages/home/home.component";
            import { UploadpostComponent } from "./pages/home/uploadpost/uploadpost.component";
            import { FriendlistComponent } from "./pages/home/friendlist/friendlist.component";
            import { FriendchatComponent } from "./pages/home/friendchat/friendchat.component";
            import { FriendmatchingComponent } from "./pages/home/friendmatching/friendmatching.component";
            import { ChatRoomComponent } from "./pages/home/chat-room/chat-room.component";
            import { IdeamatchingComponent } from "./pages/home/ideamatching/ideamatching.component";
            import { SearchResultComponent } from "./pages/home/searchresult/searchresult.component";
                import { DetailComponent } from "./pages/home/searchresult/detail/detail.component"; 
            import { SearchOptionComponent } from "./pages/home/searchoption/searchoption.component";
            import { FriendaddComponent } from "./pages/home/friendadd/friendadd.component";
        import { ProfileInputComponent } from "./pages/profile-input/profile-input.component";
        import { EnneagramComponent } from "./pages/enneagram/enneagram.component";
        import { SettingComponent } from "./pages/setting/setting.component";

import { FloatButtonComponent } from "./modules/buttons/float-button/float-button.component";
import { ChildButton1Component } from "./modules/buttons/child-button1/child-button1.component";
import { ChildButton2Component } from "./modules/buttons/child-button2/child-button2.component";
import { ChildButton3Component } from "./modules/buttons/child-button3/child-button3.component";
import { ActionButtonComponent } from "./modules/buttons/action-button/action-button.component";


import { ModalComponent } from "./modules/modal/modal.component";
import { FacedetectionComponent } from "./test/facedetection/facedetection.component";
import { AdmobComponent } from "./test/admob/admob.component";


import * as platform from "platform";

declare var GMSServices: any;

if(platform.isIOS) {
    GMSServices.provideAPIKey("AIzaSyAtRVvG3Be3xXiZFR7xp-K-9hy4nZ4hMFs");
}

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        NativeScriptUIListViewModule,
        NativeScriptUIAutoCompleteTextViewModule,
        NativeScriptFormsModule,
        TNSCheckBoxModule,
        AppRoutingModule,
        FormsModule,
    ],
    declarations: [
        AppComponent,
        GoogleMapComponent,
        GoogleAnalyticsComponent,
        PagesComponent,
        LoginComponent,
        RegisterComponent,
        HomeComponent,
        FriendlistComponent,
        FriendmatchingComponent,
        FriendchatComponent,
        ChatRoomComponent,
        IdeamatchingComponent,
        SearchResultComponent,
        DetailComponent,
        SearchOptionComponent,
        EnneagramComponent,
        UploadpostComponent,
        ProfileInputComponent,
        SettingComponent,
        FriendaddComponent,

        ActionButtonComponent,
        FloatButtonComponent,
        ChildButton1Component,
        ChildButton2Component,
        ChildButton3Component,
        ModalComponent,
        FacedetectionComponent,
        AdmobComponent,
    ],
    providers: [
        FirebaseService,
        AnimationsService,
        UploadpostService,
        SearchService,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { 

}
