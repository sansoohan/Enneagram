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
var animations_service_1 = require("./home/ideamatching/animations-service");
var landmarks_service_1 = require("./home/ideamatching/landmarks-service");
var friend_chat_service_1 = require("./home/friendchat/friend-chat.service");
var friend_list_service_1 = require("./home/friendchat/friend-list.service");
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
var blog_component_1 = require("./home/blog/blog.component");
var profile_component_1 = require("./home/profile/profile.component");
var setting_component_1 = require("./home/setting/setting.component");
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
                friendchat_component_1.FriendchatComponent,
                chat_room_component_1.ChatRoomComponent,
                ideamatching_component_1.IdeamatchingComponent,
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
                friend_chat_service_1.FriendChatService,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzREFBdUU7QUFDdkUsc0NBQWtGO0FBQ2xGLGdGQUE4RTtBQUM5RSw4REFBb0Y7QUFDcEYsNERBQWdGO0FBQ2hGLGdFQUFnRztBQUNoRyxvREFBcUU7QUFDckUseURBQWtFO0FBQ2xFLHdDQUE2QztBQUU3QyxnRUFBOEQ7QUFDOUQsNkVBQTJFO0FBQzNFLDJFQUF5RTtBQUN6RSw2RUFBMEU7QUFDMUUsNkVBQTBFO0FBRTFFLDJEQUF3RDtBQUN4RCxpREFBK0M7QUFFL0MsMkRBQXlEO0FBQ3pELG9FQUFrRTtBQUNsRSx3REFBc0Q7QUFDdEQsK0VBQTZFO0FBQzdFLDJGQUF5RjtBQUN6RixpR0FBOEY7QUFDOUYsdUZBQW9GO0FBQ3BGLHFGQUFtRjtBQUNuRixtRkFBaUY7QUFDakYsNEVBQTBFO0FBQzFFLDZEQUEyRDtBQUMzRCxzRUFBb0U7QUFDcEUsc0VBQW9FO0FBRXBFLHdGQUFxRjtBQUNyRiwyRkFBd0Y7QUFDeEYsMkZBQXdGO0FBQ3hGLDJGQUF3RjtBQUN4RiwrRUFBNkU7QUFDN0UscUdBQWtHO0FBQ2xHLDJEQUF5RDtBQUV6RCxtQ0FBcUM7QUFHckMsRUFBRSxDQUFBLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDaEIsV0FBVyxDQUFDLGFBQWEsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0FBQ3pFLENBQUM7QUFvREQ7SUFBQTtJQUF5QixDQUFDO0lBQWIsU0FBUztRQWxEckIsZUFBUSxDQUFDO1lBQ04sU0FBUyxFQUFFO2dCQUNQLDRCQUFZO2FBQ2Y7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsaUNBQXdCO2dCQUN4Qix3Q0FBa0I7Z0JBQ2xCLHdDQUE4QjtnQkFDOUIsc0NBQTRCO2dCQUM1QixrREFBd0M7Z0JBQ3hDLCtCQUF1QjtnQkFDdkIsMkJBQWlCO2dCQUNqQixxQ0FBZ0I7Z0JBQ2hCLG1CQUFXO2FBQ2Q7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsNEJBQVk7Z0JBQ1osZ0NBQWM7Z0JBQ2Qsc0NBQWlCO2dCQUNqQiw4QkFBYTtnQkFDYiwwQ0FBbUI7Z0JBQ25CLGtEQUF1QjtnQkFDdkIsMkNBQW1CO2dCQUNuQiwwQ0FBbUI7Z0JBQ25CLHVDQUFpQjtnQkFDakIsOENBQXFCO2dCQUNyQixvQ0FBZ0I7Z0JBQ2hCLHdDQUFrQjtnQkFDbEIsOEJBQWE7Z0JBQ2Isb0NBQWdCO2dCQUNoQixvQ0FBZ0I7Z0JBRWhCLCtDQUFxQjtnQkFDckIsNkNBQW9CO2dCQUNwQiwrQ0FBcUI7Z0JBQ3JCLCtDQUFxQjtnQkFDckIsK0NBQXFCO2dCQUNyQixnQ0FBYzthQUNqQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxrQ0FBZTtnQkFDZixzQ0FBaUI7Z0JBQ2pCLG9DQUFnQjtnQkFDaEIsdUNBQWlCO2dCQUNqQix1Q0FBaUI7YUFDcEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IE5nTW9kdWxlLCBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1saXN0dmlldy9hbmd1bGFyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUF1dG9Db21wbGV0ZVRleHRWaWV3TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1hdXRvY29tcGxldGUvYW5ndWxhclwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IFROU0NoZWNrQm94TW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWNoZWNrYm94L2FuZ3VsYXInO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2VcIjtcbmltcG9ydCB7IEFuaW1hdGlvbnNTZXJ2aWNlIH0gZnJvbSBcIi4vaG9tZS9pZGVhbWF0Y2hpbmcvYW5pbWF0aW9ucy1zZXJ2aWNlXCI7XG5pbXBvcnQgeyBMYW5kbWFya3NTZXJ2aWNlIH0gZnJvbSBcIi4vaG9tZS9pZGVhbWF0Y2hpbmcvbGFuZG1hcmtzLXNlcnZpY2VcIjtcbmltcG9ydCB7IEZyaWVuZENoYXRTZXJ2aWNlIH0gZnJvbSBcIi4vaG9tZS9mcmllbmRjaGF0L2ZyaWVuZC1jaGF0LnNlcnZpY2VcIjtcbmltcG9ydCB7IEZyaWVuZExpc3RTZXJ2aWNlIH0gZnJvbSBcIi4vaG9tZS9mcmllbmRjaGF0L2ZyaWVuZC1saXN0LnNlcnZpY2VcIjtcblxuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC1yb3V0aW5nLm1vZHVsZVwiO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuXG5pbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gXCIuL2xvZ2luL2xvZ2luLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgUmVnaXN0ZXJDb21wb25lbnQgfSBmcm9tIFwiLi9yZWdpc3Rlci9yZWdpc3Rlci5jb21wb25lbnRcIjtcbmltcG9ydCB7IEhvbWVDb21wb25lbnQgfSBmcm9tIFwiLi9ob21lL2hvbWUuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBGcmllbmRsaXN0Q29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9mcmllbmRsaXN0L2ZyaWVuZGxpc3QuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBGcmllbmRtYXRjaGluZ0NvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvZnJpZW5kbWF0Y2hpbmcvZnJpZW5kbWF0Y2hpbmcuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNYXBFeGFtcGxlQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9mcmllbmRtYXRjaGluZy9tYXAtZXhhbXBsZS9tYXAtZXhhbXBsZS5jb21wb25lbnRcIjtcbmltcG9ydCB7IENoYXRSb29tQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9mcmllbmRjaGF0L2NoYXQtcm9vbS9jaGF0LXJvb20uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBJZGVhbWF0Y2hpbmdDb21wb25lbnQgfSBmcm9tIFwiLi9ob21lL2lkZWFtYXRjaGluZy9pZGVhbWF0Y2hpbmcuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBEZXRhaWxzQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9pZGVhbWF0Y2hpbmcvZGV0YWlscy9kZXRhaWxzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgRW5uZWFncmFtQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9lbm5lYWdyYW0vZW5uZWFncmFtLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQmxvZ0NvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvYmxvZy9ibG9nLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgUHJvZmlsZUNvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvcHJvZmlsZS9wcm9maWxlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgU2V0dGluZ0NvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvc2V0dGluZy9zZXR0aW5nLmNvbXBvbmVudFwiO1xuXG5pbXBvcnQgeyBGbG9hdEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gXCIuL2J1dHRvbnMvZmxvYXQtYnV0dG9uL2Zsb2F0LWJ1dHRvbi5jb21wb25lbnRcIjtcbmltcG9ydCB7IENoaWxkQnV0dG9uMUNvbXBvbmVudCB9IGZyb20gXCIuL2J1dHRvbnMvY2hpbGQtYnV0dG9uMS9jaGlsZC1idXR0b24xLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQ2hpbGRCdXR0b24yQ29tcG9uZW50IH0gZnJvbSBcIi4vYnV0dG9ucy9jaGlsZC1idXR0b24yL2NoaWxkLWJ1dHRvbjIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjNDb21wb25lbnQgfSBmcm9tIFwiLi9idXR0b25zL2NoaWxkLWJ1dHRvbjMvY2hpbGQtYnV0dG9uMy5jb21wb25lbnRcIjtcbmltcG9ydCB7IEZyaWVuZGNoYXRDb21wb25lbnQgfSBmcm9tIFwiLi9ob21lL2ZyaWVuZGNoYXQvZnJpZW5kY2hhdC5jb21wb25lbnRcIjtcbmltcG9ydCB7IEFjdGlvbkJ1dHRvbkNvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvaWRlYW1hdGNoaW5nL2FjdGlvbi1idXR0b24vYWN0aW9uLWJ1dHRvbi5jb21wb25lbnRcIjtcbmltcG9ydCB7IE1vZGFsQ29tcG9uZW50IH0gZnJvbSBcIi4vbW9kYWwvbW9kYWwuY29tcG9uZW50XCI7XG5cbmltcG9ydCAqIGFzIHBsYXRmb3JtIGZyb20gXCJwbGF0Zm9ybVwiO1xuZGVjbGFyZSB2YXIgR01TU2VydmljZXM6IGFueTtcblxuaWYocGxhdGZvcm0uaXNJT1MpIHtcbiAgICBHTVNTZXJ2aWNlcy5wcm92aWRlQVBJS2V5KFwiQUl6YVN5QXRSVnZHM0JlM3hYaVpGUjd4cC1LLTloeTRuWjRoTUZzXCIpO1xufVxuXG5ATmdNb2R1bGUoe1xuICAgIGJvb3RzdHJhcDogW1xuICAgICAgICBBcHBDb21wb25lbnRcbiAgICBdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlBdXRvQ29tcGxldGVUZXh0Vmlld01vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgICAgIFROU0NoZWNrQm94TW9kdWxlLFxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBBcHBDb21wb25lbnQsXG4gICAgICAgIExvZ2luQ29tcG9uZW50LFxuICAgICAgICBSZWdpc3RlckNvbXBvbmVudCxcbiAgICAgICAgSG9tZUNvbXBvbmVudCxcbiAgICAgICAgRnJpZW5kbGlzdENvbXBvbmVudCxcbiAgICAgICAgRnJpZW5kbWF0Y2hpbmdDb21wb25lbnQsXG4gICAgICAgIE1hcEV4YW1wbGVDb21wb25lbnQsXG4gICAgICAgIEZyaWVuZGNoYXRDb21wb25lbnQsXG4gICAgICAgIENoYXRSb29tQ29tcG9uZW50LFxuICAgICAgICBJZGVhbWF0Y2hpbmdDb21wb25lbnQsXG4gICAgICAgIERldGFpbHNDb21wb25lbnQsXG4gICAgICAgIEVubmVhZ3JhbUNvbXBvbmVudCxcbiAgICAgICAgQmxvZ0NvbXBvbmVudCxcbiAgICAgICAgUHJvZmlsZUNvbXBvbmVudCxcbiAgICAgICAgU2V0dGluZ0NvbXBvbmVudCxcblxuICAgICAgICBBY3Rpb25CdXR0b25Db21wb25lbnQsXG4gICAgICAgIEZsb2F0QnV0dG9uQ29tcG9uZW50LFxuICAgICAgICBDaGlsZEJ1dHRvbjFDb21wb25lbnQsXG4gICAgICAgIENoaWxkQnV0dG9uMkNvbXBvbmVudCxcbiAgICAgICAgQ2hpbGRCdXR0b24zQ29tcG9uZW50LFxuICAgICAgICBNb2RhbENvbXBvbmVudCxcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBGaXJlYmFzZVNlcnZpY2UsXG4gICAgICAgIEFuaW1hdGlvbnNTZXJ2aWNlLFxuICAgICAgICBMYW5kbWFya3NTZXJ2aWNlLFxuICAgICAgICBGcmllbmRDaGF0U2VydmljZSxcbiAgICAgICAgRnJpZW5kTGlzdFNlcnZpY2UsXG4gICAgXSxcbiAgICBzY2hlbWFzOiBbXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cbiJdfQ==