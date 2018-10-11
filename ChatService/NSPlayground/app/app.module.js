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
var firebase_service_1 = require("./services/firebase.service");
var animations_service_1 = require("./home/ideamatching/animations-service");
var landmarks_service_1 = require("./home/ideamatching/landmarks-service");
var friend_chat_service_1 = require("./home/friendchat/friend-chat.service");
var friend_list_service_1 = require("./home/friendchat/friend-list.service");
var user_home_service_1 = require("./home/friendchat/user-home.service");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var login_component_1 = require("./login/login.component");
var register_component_1 = require("./register/register.component");
var home_component_1 = require("./home/home.component");
var friendlist_component_1 = require("./home/friendlist/friendlist.component");
var friendmatching_component_1 = require("./home/friendmatching/friendmatching.component");
var map_example_component_1 = require("./home/friendmatching/map-example/map-example.component");
var chat_room_component_1 = require("./home/friendchat/chat-room/chat-room.component");
var ideamatching_component_1 = require("./home/ideamatching/ideamatching.component");
var details_component_1 = require("./home/ideamatching/details/details.component");
var enneagram_component_1 = require("./home/enneagram/enneagram.component");
var float_button_component_1 = require("./buttons/float-button/float-button.component");
var child_button1_component_1 = require("./buttons/child-button1/child-button1.component");
var child_button2_component_1 = require("./buttons/child-button2/child-button2.component");
var child_button3_component_1 = require("./buttons/child-button3/child-button3.component");
var friendchat_component_1 = require("./home/friendchat/friendchat.component");
var action_button_component_1 = require("./home/ideamatching/action-button/action-button.component");
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
                app_routing_module_1.AppRoutingModule
            ],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                home_component_1.HomeComponent,
                friendlist_component_1.FriendlistComponent,
                friendmatching_component_1.FriendmatchingComponent,
                map_example_component_1.MapExampleComponent,
                friendchat_component_1.FriendchatComponent,
                chat_room_component_1.ChatRoomComponent,
                ideamatching_component_1.IdeamatchingComponent,
                details_component_1.DetailsComponent,
                enneagram_component_1.EnneagramComponent,
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
                friend_chat_service_1.FriendChatService,
                friend_list_service_1.FriendListService,
                user_home_service_1.UserHomeService,
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzREFBdUU7QUFDdkUsc0NBQWtGO0FBQ2xGLGdGQUE4RTtBQUM5RSw4REFBb0Y7QUFDcEYsNERBQWdGO0FBQ2hGLGdFQUFnRztBQUNoRyxvREFBcUU7QUFDckUseURBQWtFO0FBRWxFLGdFQUE4RDtBQUM5RCw2RUFBMkU7QUFDM0UsMkVBQXlFO0FBQ3pFLDZFQUEwRTtBQUMxRSw2RUFBMEU7QUFDMUUseUVBQXNFO0FBRXRFLDJEQUF3RDtBQUN4RCxpREFBK0M7QUFFL0MsMkRBQXlEO0FBQ3pELG9FQUFrRTtBQUNsRSx3REFBc0Q7QUFDdEQsK0VBQTZFO0FBQzdFLDJGQUF5RjtBQUN6RixpR0FBOEY7QUFDOUYsdUZBQW9GO0FBQ3BGLHFGQUFtRjtBQUNuRixtRkFBaUY7QUFDakYsNEVBQTBFO0FBRTFFLHdGQUFxRjtBQUNyRiwyRkFBd0Y7QUFDeEYsMkZBQXdGO0FBQ3hGLDJGQUF3RjtBQUN4RiwrRUFBNkU7QUFDN0UscUdBQWtHO0FBQ2xHLDJEQUF5RDtBQUV6RCxtQ0FBcUM7QUFHckMsRUFBRSxDQUFBLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDaEIsV0FBVyxDQUFDLGFBQWEsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0FBQ3pFLENBQUM7QUFpREQ7SUFBQTtJQUF5QixDQUFDO0lBQWIsU0FBUztRQS9DckIsZUFBUSxDQUFDO1lBQ04sU0FBUyxFQUFFO2dCQUNQLDRCQUFZO2FBQ2Y7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsaUNBQXdCO2dCQUN4Qix3Q0FBa0I7Z0JBQ2xCLHdDQUE4QjtnQkFDOUIsc0NBQTRCO2dCQUM1QixrREFBd0M7Z0JBQ3hDLCtCQUF1QjtnQkFDdkIsMkJBQWlCO2dCQUNqQixxQ0FBZ0I7YUFDbkI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsNEJBQVk7Z0JBQ1osZ0NBQWM7Z0JBQ2Qsc0NBQWlCO2dCQUNqQiw4QkFBYTtnQkFDYiwwQ0FBbUI7Z0JBQ25CLGtEQUF1QjtnQkFDdkIsMkNBQW1CO2dCQUNuQiwwQ0FBbUI7Z0JBQ25CLHVDQUFpQjtnQkFDakIsOENBQXFCO2dCQUNyQixvQ0FBZ0I7Z0JBQ2hCLHdDQUFrQjtnQkFFbEIsK0NBQXFCO2dCQUNyQiw2Q0FBb0I7Z0JBQ3BCLCtDQUFxQjtnQkFDckIsK0NBQXFCO2dCQUNyQiwrQ0FBcUI7Z0JBQ3JCLGdDQUFjO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLGtDQUFlO2dCQUNmLHNDQUFpQjtnQkFDakIsb0NBQWdCO2dCQUNoQix1Q0FBaUI7Z0JBQ2pCLHVDQUFpQjtnQkFDakIsbUNBQWU7YUFDbEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IE5nTW9kdWxlLCBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1saXN0dmlldy9hbmd1bGFyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUF1dG9Db21wbGV0ZVRleHRWaWV3TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1hdXRvY29tcGxldGUvYW5ndWxhclwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IFROU0NoZWNrQm94TW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWNoZWNrYm94L2FuZ3VsYXInO1xuXG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBBbmltYXRpb25zU2VydmljZSB9IGZyb20gXCIuL2hvbWUvaWRlYW1hdGNoaW5nL2FuaW1hdGlvbnMtc2VydmljZVwiO1xuaW1wb3J0IHsgTGFuZG1hcmtzU2VydmljZSB9IGZyb20gXCIuL2hvbWUvaWRlYW1hdGNoaW5nL2xhbmRtYXJrcy1zZXJ2aWNlXCI7XG5pbXBvcnQgeyBGcmllbmRDaGF0U2VydmljZSB9IGZyb20gXCIuL2hvbWUvZnJpZW5kY2hhdC9mcmllbmQtY2hhdC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBGcmllbmRMaXN0U2VydmljZSB9IGZyb20gXCIuL2hvbWUvZnJpZW5kY2hhdC9mcmllbmQtbGlzdC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBVc2VySG9tZVNlcnZpY2UgfSBmcm9tIFwiLi9ob21lL2ZyaWVuZGNoYXQvdXNlci1ob21lLnNlcnZpY2VcIjtcblxuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC1yb3V0aW5nLm1vZHVsZVwiO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuXG5pbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gXCIuL2xvZ2luL2xvZ2luLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgUmVnaXN0ZXJDb21wb25lbnQgfSBmcm9tIFwiLi9yZWdpc3Rlci9yZWdpc3Rlci5jb21wb25lbnRcIjtcbmltcG9ydCB7IEhvbWVDb21wb25lbnQgfSBmcm9tIFwiLi9ob21lL2hvbWUuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBGcmllbmRsaXN0Q29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9mcmllbmRsaXN0L2ZyaWVuZGxpc3QuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBGcmllbmRtYXRjaGluZ0NvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvZnJpZW5kbWF0Y2hpbmcvZnJpZW5kbWF0Y2hpbmcuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNYXBFeGFtcGxlQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9mcmllbmRtYXRjaGluZy9tYXAtZXhhbXBsZS9tYXAtZXhhbXBsZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IENoYXRSb29tQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9mcmllbmRjaGF0L2NoYXQtcm9vbS9jaGF0LXJvb20uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBJZGVhbWF0Y2hpbmdDb21wb25lbnQgfSBmcm9tIFwiLi9ob21lL2lkZWFtYXRjaGluZy9pZGVhbWF0Y2hpbmcuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBEZXRhaWxzQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9pZGVhbWF0Y2hpbmcvZGV0YWlscy9kZXRhaWxzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgRW5uZWFncmFtQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9lbm5lYWdyYW0vZW5uZWFncmFtLmNvbXBvbmVudFwiO1xuXG5pbXBvcnQgeyBGbG9hdEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gXCIuL2J1dHRvbnMvZmxvYXQtYnV0dG9uL2Zsb2F0LWJ1dHRvbi5jb21wb25lbnRcIjtcbmltcG9ydCB7IENoaWxkQnV0dG9uMUNvbXBvbmVudCB9IGZyb20gXCIuL2J1dHRvbnMvY2hpbGQtYnV0dG9uMS9jaGlsZC1idXR0b24xLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQ2hpbGRCdXR0b24yQ29tcG9uZW50IH0gZnJvbSBcIi4vYnV0dG9ucy9jaGlsZC1idXR0b24yL2NoaWxkLWJ1dHRvbjIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjNDb21wb25lbnQgfSBmcm9tIFwiLi9idXR0b25zL2NoaWxkLWJ1dHRvbjMvY2hpbGQtYnV0dG9uMy5jb21wb25lbnRcIjtcbmltcG9ydCB7IEZyaWVuZGNoYXRDb21wb25lbnQgfSBmcm9tIFwiLi9ob21lL2ZyaWVuZGNoYXQvZnJpZW5kY2hhdC5jb21wb25lbnRcIjtcbmltcG9ydCB7IEFjdGlvbkJ1dHRvbkNvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvaWRlYW1hdGNoaW5nL2FjdGlvbi1idXR0b24vYWN0aW9uLWJ1dHRvbi5jb21wb25lbnRcIjtcbmltcG9ydCB7IE1vZGFsQ29tcG9uZW50IH0gZnJvbSBcIi4vbW9kYWwvbW9kYWwuY29tcG9uZW50XCI7XG5cbmltcG9ydCAqIGFzIHBsYXRmb3JtIGZyb20gXCJwbGF0Zm9ybVwiO1xuZGVjbGFyZSB2YXIgR01TU2VydmljZXM6IGFueTtcblxuaWYocGxhdGZvcm0uaXNJT1MpIHtcbiAgICBHTVNTZXJ2aWNlcy5wcm92aWRlQVBJS2V5KFwiQUl6YVN5QXRSVnZHM0JlM3hYaVpGUjd4cC1LLTloeTRuWjRoTUZzXCIpO1xufVxuXG5ATmdNb2R1bGUoe1xuICAgIGJvb3RzdHJhcDogW1xuICAgICAgICBBcHBDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlBdXRvQ29tcGxldGVUZXh0Vmlld01vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgICAgIFROU0NoZWNrQm94TW9kdWxlLFxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50LFxuICAgICAgICBMb2dpbkNvbXBvbmVudCxcbiAgICAgICAgUmVnaXN0ZXJDb21wb25lbnQsXG4gICAgICAgIEhvbWVDb21wb25lbnQsXG4gICAgICAgIEZyaWVuZGxpc3RDb21wb25lbnQsXG4gICAgICAgIEZyaWVuZG1hdGNoaW5nQ29tcG9uZW50LFxuICAgICAgICBNYXBFeGFtcGxlQ29tcG9uZW50LFxuICAgICAgICBGcmllbmRjaGF0Q29tcG9uZW50LFxuICAgICAgICBDaGF0Um9vbUNvbXBvbmVudCxcbiAgICAgICAgSWRlYW1hdGNoaW5nQ29tcG9uZW50LFxuICAgICAgICBEZXRhaWxzQ29tcG9uZW50LFxuICAgICAgICBFbm5lYWdyYW1Db21wb25lbnQsXG5cbiAgICAgICAgQWN0aW9uQnV0dG9uQ29tcG9uZW50LFxuICAgICAgICBGbG9hdEJ1dHRvbkNvbXBvbmVudCxcbiAgICAgICAgQ2hpbGRCdXR0b24xQ29tcG9uZW50LFxuICAgICAgICBDaGlsZEJ1dHRvbjJDb21wb25lbnQsXG4gICAgICAgIENoaWxkQnV0dG9uM0NvbXBvbmVudCxcbiAgICAgICAgTW9kYWxDb21wb25lbnQsXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgRmlyZWJhc2VTZXJ2aWNlLFxuICAgICAgICBBbmltYXRpb25zU2VydmljZSxcbiAgICAgICAgTGFuZG1hcmtzU2VydmljZSxcbiAgICAgICAgRnJpZW5kQ2hhdFNlcnZpY2UsXG4gICAgICAgIEZyaWVuZExpc3RTZXJ2aWNlLFxuICAgICAgICBVc2VySG9tZVNlcnZpY2UsXG4gICAgXSxcbiAgICBzY2hlbWFzOiBbXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cbiJdfQ==