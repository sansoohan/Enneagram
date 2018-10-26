"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("nativescript-angular/common");
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var angular_1 = require("nativescript-ui-sidedrawer/angular");
var angular_2 = require("nativescript-ui-listview/angular");
var angular_3 = require("nativescript-ui-autocomplete/angular");
var forms_1 = require("nativescript-angular/forms");
var angular_4 = require("nativescript-checkbox/angular");
var forms_2 = require("@angular/forms");
var firebase_service_1 = require("./services/firebase.service");
var animations_service_1 = require("./home/searchresult/animations-service");
var landmarks_service_1 = require("./home/searchresult/landmarks-service");
var friend_list_service_1 = require("./home/friendchat/friend-list.service");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var home_component_1 = require("./home/home.component");
var friendlist_component_1 = require("./home/friendlist/friendlist.component");
var friendmatching_component_1 = require("./home/friendmatching/friendmatching.component");
var map_example_component_1 = require("./home/friendmatching/map-example/map-example.component");
var foodmatching_component_1 = require("./home/friendmatching/foodmatching/foodmatching.component");
var chat_room_component_1 = require("./home/friendchat/chat-room/chat-room.component");
var ideamatching_component_1 = require("./home/ideamatching/ideamatching.component");
var searchresult_component_1 = require("./home/searchresult/searchresult.component");
var details_component_1 = require("./home/searchresult/details/details.component");
var enneagram_component_1 = require("./home/enneagram/enneagram.component");
var blog_component_1 = require("./home/blog/blog.component");
var profile_component_1 = require("./home/profile/profile.component");
var setting_component_1 = require("./home/setting/setting.component");
var float_button_component_1 = require("./buttons/float-button/float-button.component");
var child_button1_component_1 = require("./buttons/child-button1/child-button1.component");
var child_button2_component_1 = require("./buttons/child-button2/child-button2.component");
var child_button3_component_1 = require("./buttons/child-button3/child-button3.component");
var friendchat_component_1 = require("./home/friendchat/friendchat.component");
var action_button_component_1 = require("./home/searchresult/action-button/action-button.component");
var modal_component_1 = require("./modal/modal.component");
var platform = require("platform");
if (platform.isIOS) {
    GMSServices.provideAPIKey("AIzaSyAtRVvG3Be3xXiZFR7xp-K-9hy4nZ4hMFs");
}
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            imports: [
                common_1.NativeScriptCommonModule,
                nativescript_module_1.NativeScriptModule,
                angular_1.NativeScriptUISideDrawerModule,
                angular_2.NativeScriptUIListViewModule,
                angular_3.NativeScriptUIAutoCompleteTextViewModule,
                forms_1.NativeScriptFormsModule,
                angular_4.TNSCheckBoxModule,
                app_routing_module_1.AppRoutingModule,
                forms_2.FormsModule,
            ],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                home_component_1.HomeComponent,
                friendlist_component_1.FriendlistComponent,
                friendmatching_component_1.FriendmatchingComponent,
                map_example_component_1.MapExampleComponent,
                foodmatching_component_1.FoodMatchingComponent,
                friendchat_component_1.FriendchatComponent,
                chat_room_component_1.ChatRoomComponent,
                ideamatching_component_1.IdeamatchingComponent,
                searchresult_component_1.SearchResultComponent,
                details_component_1.DetailsComponent,
                enneagram_component_1.EnneagramComponent,
                blog_component_1.BlogComponent,
                profile_component_1.ProfileComponent,
                setting_component_1.SettingComponent,
                action_button_component_1.ActionButtonComponent,
                float_button_component_1.FloatButtonComponent,
                child_button1_component_1.ChildButton1Component,
                child_button2_component_1.ChildButton2Component,
                child_button3_component_1.ChildButton3Component,
                modal_component_1.ModalComponent,
            ],
            providers: [
                firebase_service_1.FirebaseService,
                animations_service_1.AnimationsService,
                landmarks_service_1.LandmarksService,
                friend_list_service_1.FriendListService,
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzREFBdUU7QUFDdkUsc0NBQWtGO0FBQ2xGLGdGQUE4RTtBQUM5RSw4REFBb0Y7QUFDcEYsNERBQWdGO0FBQ2hGLGdFQUFnRztBQUNoRyxvREFBcUU7QUFDckUseURBQWtFO0FBQ2xFLHdDQUE2QztBQUU3QyxnRUFBOEQ7QUFDOUQsNkVBQTJFO0FBQzNFLDJFQUF5RTtBQUN6RSw2RUFBMEU7QUFFMUUsMkRBQXdEO0FBQ3hELGlEQUErQztBQUUvQywyREFBeUQ7QUFDekQsb0VBQWtFO0FBQ2xFLHdEQUFzRDtBQUNsRCwrRUFBNkU7QUFDN0UsMkZBQXlGO0FBQ3JGLGlHQUE4RjtBQUM5RixvR0FBa0c7QUFDdEcsdUZBQW9GO0FBQ3BGLHFGQUFtRjtBQUNuRixxRkFBbUY7QUFDL0UsbUZBQWlGO0FBRXpGLDRFQUEwRTtBQUMxRSw2REFBMkQ7QUFDM0Qsc0VBQW9FO0FBQ3BFLHNFQUFvRTtBQUtwRSx3RkFBcUY7QUFDckYsMkZBQXdGO0FBQ3hGLDJGQUF3RjtBQUN4RiwyRkFBd0Y7QUFDeEYsK0VBQTZFO0FBQzdFLHFHQUFrRztBQUNsRywyREFBeUQ7QUFFekQsbUNBQXFDO0FBR3JDLEVBQUUsQ0FBQSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ2hCLFdBQVcsQ0FBQyxhQUFhLENBQUMseUNBQXlDLENBQUMsQ0FBQztBQUN6RSxDQUFDO0FBcUREO0lBQUE7SUFBeUIsQ0FBQztJQUFiLFNBQVM7UUFuRHJCLGVBQVEsQ0FBQztZQUNOLFNBQVMsRUFBRTtnQkFDUCw0QkFBWTthQUNmO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLGlDQUF3QjtnQkFDeEIsd0NBQWtCO2dCQUNsQix3Q0FBOEI7Z0JBQzlCLHNDQUE0QjtnQkFDNUIsa0RBQXdDO2dCQUN4QywrQkFBdUI7Z0JBQ3ZCLDJCQUFpQjtnQkFDakIscUNBQWdCO2dCQUNoQixtQkFBVzthQUNkO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLDRCQUFZO2dCQUNaLGdDQUFjO2dCQUNkLHNDQUFpQjtnQkFDakIsOEJBQWE7Z0JBQ2IsMENBQW1CO2dCQUNuQixrREFBdUI7Z0JBQ3ZCLDJDQUFtQjtnQkFDbkIsOENBQXFCO2dCQUNyQiwwQ0FBbUI7Z0JBQ25CLHVDQUFpQjtnQkFDakIsOENBQXFCO2dCQUNyQiw4Q0FBcUI7Z0JBQ3JCLG9DQUFnQjtnQkFDaEIsd0NBQWtCO2dCQUNsQiw4QkFBYTtnQkFDYixvQ0FBZ0I7Z0JBQ2hCLG9DQUFnQjtnQkFFaEIsK0NBQXFCO2dCQUNyQiw2Q0FBb0I7Z0JBQ3BCLCtDQUFxQjtnQkFDckIsK0NBQXFCO2dCQUNyQiwrQ0FBcUI7Z0JBQ3JCLGdDQUFjO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLGtDQUFlO2dCQUNmLHNDQUFpQjtnQkFDakIsb0NBQWdCO2dCQUNoQix1Q0FBaUI7YUFDcEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IE5nTW9kdWxlLCBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1saXN0dmlldy9hbmd1bGFyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUF1dG9Db21wbGV0ZVRleHRWaWV3TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1hdXRvY29tcGxldGUvYW5ndWxhclwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IFROU0NoZWNrQm94TW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWNoZWNrYm94L2FuZ3VsYXInO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2VcIjtcbmltcG9ydCB7IEFuaW1hdGlvbnNTZXJ2aWNlIH0gZnJvbSBcIi4vaG9tZS9zZWFyY2hyZXN1bHQvYW5pbWF0aW9ucy1zZXJ2aWNlXCI7XG5pbXBvcnQgeyBMYW5kbWFya3NTZXJ2aWNlIH0gZnJvbSBcIi4vaG9tZS9zZWFyY2hyZXN1bHQvbGFuZG1hcmtzLXNlcnZpY2VcIjtcbmltcG9ydCB7IEZyaWVuZExpc3RTZXJ2aWNlIH0gZnJvbSBcIi4vaG9tZS9mcmllbmRjaGF0L2ZyaWVuZC1saXN0LnNlcnZpY2VcIjtcblxuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC1yb3V0aW5nLm1vZHVsZVwiO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuXG5pbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gXCIuL2xvZ2luL2xvZ2luLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgUmVnaXN0ZXJDb21wb25lbnQgfSBmcm9tIFwiLi9yZWdpc3Rlci9yZWdpc3Rlci5jb21wb25lbnRcIjtcbmltcG9ydCB7IEhvbWVDb21wb25lbnQgfSBmcm9tIFwiLi9ob21lL2hvbWUuY29tcG9uZW50XCI7XG4gICAgaW1wb3J0IHsgRnJpZW5kbGlzdENvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvZnJpZW5kbGlzdC9mcmllbmRsaXN0LmNvbXBvbmVudFwiO1xuICAgIGltcG9ydCB7IEZyaWVuZG1hdGNoaW5nQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9mcmllbmRtYXRjaGluZy9mcmllbmRtYXRjaGluZy5jb21wb25lbnRcIjtcbiAgICAgICAgaW1wb3J0IHsgTWFwRXhhbXBsZUNvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvZnJpZW5kbWF0Y2hpbmcvbWFwLWV4YW1wbGUvbWFwLWV4YW1wbGUuY29tcG9uZW50XCI7XG4gICAgICAgIGltcG9ydCB7IEZvb2RNYXRjaGluZ0NvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvZnJpZW5kbWF0Y2hpbmcvZm9vZG1hdGNoaW5nL2Zvb2RtYXRjaGluZy5jb21wb25lbnRcIjtcbiAgICBpbXBvcnQgeyBDaGF0Um9vbUNvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvZnJpZW5kY2hhdC9jaGF0LXJvb20vY2hhdC1yb29tLmNvbXBvbmVudFwiO1xuICAgIGltcG9ydCB7IElkZWFtYXRjaGluZ0NvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvaWRlYW1hdGNoaW5nL2lkZWFtYXRjaGluZy5jb21wb25lbnRcIjtcbiAgICBpbXBvcnQgeyBTZWFyY2hSZXN1bHRDb21wb25lbnQgfSBmcm9tIFwiLi9ob21lL3NlYXJjaHJlc3VsdC9zZWFyY2hyZXN1bHQuY29tcG9uZW50XCI7XG4gICAgICAgIGltcG9ydCB7IERldGFpbHNDb21wb25lbnQgfSBmcm9tIFwiLi9ob21lL3NlYXJjaHJlc3VsdC9kZXRhaWxzL2RldGFpbHMuY29tcG9uZW50XCI7XG5cbmltcG9ydCB7IEVubmVhZ3JhbUNvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvZW5uZWFncmFtL2VubmVhZ3JhbS5jb21wb25lbnRcIjtcbmltcG9ydCB7IEJsb2dDb21wb25lbnQgfSBmcm9tIFwiLi9ob21lL2Jsb2cvYmxvZy5jb21wb25lbnRcIjtcbmltcG9ydCB7IFByb2ZpbGVDb21wb25lbnQgfSBmcm9tIFwiLi9ob21lL3Byb2ZpbGUvcHJvZmlsZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IFNldHRpbmdDb21wb25lbnQgfSBmcm9tIFwiLi9ob21lL3NldHRpbmcvc2V0dGluZy5jb21wb25lbnRcIjtcblxuXG5cblxuaW1wb3J0IHsgRmxvYXRCdXR0b25Db21wb25lbnQgfSBmcm9tIFwiLi9idXR0b25zL2Zsb2F0LWJ1dHRvbi9mbG9hdC1idXR0b24uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjFDb21wb25lbnQgfSBmcm9tIFwiLi9idXR0b25zL2NoaWxkLWJ1dHRvbjEvY2hpbGQtYnV0dG9uMS5jb21wb25lbnRcIjtcbmltcG9ydCB7IENoaWxkQnV0dG9uMkNvbXBvbmVudCB9IGZyb20gXCIuL2J1dHRvbnMvY2hpbGQtYnV0dG9uMi9jaGlsZC1idXR0b24yLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQ2hpbGRCdXR0b24zQ29tcG9uZW50IH0gZnJvbSBcIi4vYnV0dG9ucy9jaGlsZC1idXR0b24zL2NoaWxkLWJ1dHRvbjMuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBGcmllbmRjaGF0Q29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9mcmllbmRjaGF0L2ZyaWVuZGNoYXQuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBBY3Rpb25CdXR0b25Db21wb25lbnQgfSBmcm9tIFwiLi9ob21lL3NlYXJjaHJlc3VsdC9hY3Rpb24tYnV0dG9uL2FjdGlvbi1idXR0b24uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNb2RhbENvbXBvbmVudCB9IGZyb20gXCIuL21vZGFsL21vZGFsLmNvbXBvbmVudFwiO1xuXG5pbXBvcnQgKiBhcyBwbGF0Zm9ybSBmcm9tIFwicGxhdGZvcm1cIjtcbmRlY2xhcmUgdmFyIEdNU1NlcnZpY2VzOiBhbnk7XG5cbmlmKHBsYXRmb3JtLmlzSU9TKSB7XG4gICAgR01TU2VydmljZXMucHJvdmlkZUFQSUtleShcIkFJemFTeUF0UlZ2RzNCZTN4WGlaRlI3eHAtSy05aHk0blo0aE1Gc1wiKTtcbn1cblxuQE5nTW9kdWxlKHtcbiAgICBib290c3RyYXA6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50XG4gICAgXSxcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJQXV0b0NvbXBsZXRlVGV4dFZpZXdNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuICAgICAgICBUTlNDaGVja0JveE1vZHVsZSxcbiAgICAgICAgQXBwUm91dGluZ01vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50LFxuICAgICAgICBMb2dpbkNvbXBvbmVudCxcbiAgICAgICAgUmVnaXN0ZXJDb21wb25lbnQsXG4gICAgICAgIEhvbWVDb21wb25lbnQsXG4gICAgICAgIEZyaWVuZGxpc3RDb21wb25lbnQsXG4gICAgICAgIEZyaWVuZG1hdGNoaW5nQ29tcG9uZW50LFxuICAgICAgICBNYXBFeGFtcGxlQ29tcG9uZW50LFxuICAgICAgICBGb29kTWF0Y2hpbmdDb21wb25lbnQsXG4gICAgICAgIEZyaWVuZGNoYXRDb21wb25lbnQsXG4gICAgICAgIENoYXRSb29tQ29tcG9uZW50LFxuICAgICAgICBJZGVhbWF0Y2hpbmdDb21wb25lbnQsXG4gICAgICAgIFNlYXJjaFJlc3VsdENvbXBvbmVudCxcbiAgICAgICAgRGV0YWlsc0NvbXBvbmVudCxcbiAgICAgICAgRW5uZWFncmFtQ29tcG9uZW50LFxuICAgICAgICBCbG9nQ29tcG9uZW50LFxuICAgICAgICBQcm9maWxlQ29tcG9uZW50LFxuICAgICAgICBTZXR0aW5nQ29tcG9uZW50LFxuXG4gICAgICAgIEFjdGlvbkJ1dHRvbkNvbXBvbmVudCxcbiAgICAgICAgRmxvYXRCdXR0b25Db21wb25lbnQsXG4gICAgICAgIENoaWxkQnV0dG9uMUNvbXBvbmVudCxcbiAgICAgICAgQ2hpbGRCdXR0b24yQ29tcG9uZW50LFxuICAgICAgICBDaGlsZEJ1dHRvbjNDb21wb25lbnQsXG4gICAgICAgIE1vZGFsQ29tcG9uZW50LFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEZpcmViYXNlU2VydmljZSxcbiAgICAgICAgQW5pbWF0aW9uc1NlcnZpY2UsXG4gICAgICAgIExhbmRtYXJrc1NlcnZpY2UsXG4gICAgICAgIEZyaWVuZExpc3RTZXJ2aWNlLFxuICAgIF0sXG4gICAgc2NoZW1hczogW1xuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XG4iXX0=