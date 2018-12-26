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
var blog_service_1 = require("./home/blog/blog-service");
var search_service_1 = require("./home/searchoption/search-service");
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
var searchoption_component_1 = require("./home/searchoption/searchoption.component");
var enneagram_component_1 = require("./home/enneagram/enneagram.component");
var blog_component_1 = require("./home/blog/blog.component");
var profile_input_component_1 = require("./home/profile-input/profile-input.component");
var setting_component_1 = require("./home/setting/setting.component");
var friendadd_component_1 = require("./home/friendadd/friendadd.component");
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
                searchoption_component_1.SearchOptionComponent,
                enneagram_component_1.EnneagramComponent,
                blog_component_1.BlogComponent,
                profile_input_component_1.ProfileInputComponent,
                setting_component_1.SettingComponent,
                friendadd_component_1.FriendaddComponent,
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
                blog_service_1.BlogService,
                search_service_1.SearchService,
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzREFBdUU7QUFDdkUsc0NBQWtGO0FBQ2xGLGdGQUE4RTtBQUM5RSw4REFBb0Y7QUFDcEYsNERBQWdGO0FBQ2hGLGdFQUFnRztBQUNoRyxvREFBcUU7QUFDckUseURBQWtFO0FBQ2xFLHdDQUE2QztBQUU3QyxnRUFBOEQ7QUFDOUQsNkVBQTJFO0FBQzNFLHlEQUF1RDtBQUN2RCxxRUFBbUU7QUFFbkUsMkRBQXdEO0FBQ3hELGlEQUErQztBQUUvQywyREFBeUQ7QUFDekQsb0VBQWtFO0FBQ2xFLHdEQUFzRDtBQUNsRCwrRUFBNkU7QUFDN0UsMkZBQXlGO0FBQ3JGLGlHQUE4RjtBQUM5RixvR0FBa0c7QUFDdEcsdUZBQW9GO0FBQ3BGLHFGQUFtRjtBQUNuRixxRkFBbUY7QUFDL0UsbUZBQWlGO0FBQ3JGLHFGQUFtRjtBQUV2Riw0RUFBMEU7QUFDMUUsNkRBQTJEO0FBQzNELHdGQUFxRjtBQUNyRixzRUFBb0U7QUFDcEUsNEVBQTBFO0FBSTFFLHdGQUFxRjtBQUNyRiwyRkFBd0Y7QUFDeEYsMkZBQXdGO0FBQ3hGLDJGQUF3RjtBQUN4RiwrRUFBNkU7QUFDN0UscUdBQWtHO0FBQ2xHLDJEQUF5RDtBQUV6RCxtQ0FBcUM7QUFHckMsRUFBRSxDQUFBLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDaEIsV0FBVyxDQUFDLGFBQWEsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0FBQ3pFLENBQUM7QUF1REQ7SUFBQTtJQUF5QixDQUFDO0lBQWIsU0FBUztRQXJEckIsZUFBUSxDQUFDO1lBQ04sU0FBUyxFQUFFO2dCQUNQLDRCQUFZO2FBQ2Y7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsaUNBQXdCO2dCQUN4Qix3Q0FBa0I7Z0JBQ2xCLHdDQUE4QjtnQkFDOUIsc0NBQTRCO2dCQUM1QixrREFBd0M7Z0JBQ3hDLCtCQUF1QjtnQkFDdkIsMkJBQWlCO2dCQUNqQixxQ0FBZ0I7Z0JBQ2hCLG1CQUFXO2FBQ2Q7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsNEJBQVk7Z0JBQ1osZ0NBQWM7Z0JBQ2Qsc0NBQWlCO2dCQUNqQiw4QkFBYTtnQkFDYiwwQ0FBbUI7Z0JBQ25CLGtEQUF1QjtnQkFDdkIsMkNBQW1CO2dCQUNuQiw4Q0FBcUI7Z0JBQ3JCLDBDQUFtQjtnQkFDbkIsdUNBQWlCO2dCQUNqQiw4Q0FBcUI7Z0JBQ3JCLDhDQUFxQjtnQkFDckIsb0NBQWdCO2dCQUNoQiw4Q0FBcUI7Z0JBQ3JCLHdDQUFrQjtnQkFDbEIsOEJBQWE7Z0JBQ2IsK0NBQXFCO2dCQUNyQixvQ0FBZ0I7Z0JBQ2hCLHdDQUFrQjtnQkFFbEIsK0NBQXFCO2dCQUNyQiw2Q0FBb0I7Z0JBQ3BCLCtDQUFxQjtnQkFDckIsK0NBQXFCO2dCQUNyQiwrQ0FBcUI7Z0JBQ3JCLGdDQUFjO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLGtDQUFlO2dCQUNmLHNDQUFpQjtnQkFDakIsMEJBQVc7Z0JBQ1gsOEJBQWE7YUFDaEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9jb21tb25cIjtcclxuaW1wb3J0IHsgTmdNb2R1bGUsIE5nTW9kdWxlRmFjdG9yeUxvYWRlciwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3L2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlBdXRvQ29tcGxldGVUZXh0Vmlld01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktYXV0b2NvbXBsZXRlL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcclxuaW1wb3J0IHsgVE5TQ2hlY2tCb3hNb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtY2hlY2tib3gvYW5ndWxhcic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBBbmltYXRpb25zU2VydmljZSB9IGZyb20gXCIuL2hvbWUvc2VhcmNocmVzdWx0L2FuaW1hdGlvbnMtc2VydmljZVwiO1xyXG5pbXBvcnQgeyBCbG9nU2VydmljZSB9IGZyb20gXCIuL2hvbWUvYmxvZy9ibG9nLXNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gXCIuL2hvbWUvc2VhcmNob3B0aW9uL3NlYXJjaC1zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgeyBBcHBSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vYXBwLXJvdXRpbmcubW9kdWxlXCI7XHJcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcclxuXHJcbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSBcIi4vbG9naW4vbG9naW4uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFJlZ2lzdGVyQ29tcG9uZW50IH0gZnJvbSBcIi4vcmVnaXN0ZXIvcmVnaXN0ZXIuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEhvbWVDb21wb25lbnQgfSBmcm9tIFwiLi9ob21lL2hvbWUuY29tcG9uZW50XCI7XHJcbiAgICBpbXBvcnQgeyBGcmllbmRsaXN0Q29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9mcmllbmRsaXN0L2ZyaWVuZGxpc3QuY29tcG9uZW50XCI7XHJcbiAgICBpbXBvcnQgeyBGcmllbmRtYXRjaGluZ0NvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvZnJpZW5kbWF0Y2hpbmcvZnJpZW5kbWF0Y2hpbmcuY29tcG9uZW50XCI7XHJcbiAgICAgICAgaW1wb3J0IHsgTWFwRXhhbXBsZUNvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvZnJpZW5kbWF0Y2hpbmcvbWFwLWV4YW1wbGUvbWFwLWV4YW1wbGUuY29tcG9uZW50XCI7XHJcbiAgICAgICAgaW1wb3J0IHsgRm9vZE1hdGNoaW5nQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9mcmllbmRtYXRjaGluZy9mb29kbWF0Y2hpbmcvZm9vZG1hdGNoaW5nLmNvbXBvbmVudFwiO1xyXG4gICAgaW1wb3J0IHsgQ2hhdFJvb21Db21wb25lbnQgfSBmcm9tIFwiLi9ob21lL2ZyaWVuZGNoYXQvY2hhdC1yb29tL2NoYXQtcm9vbS5jb21wb25lbnRcIjtcclxuICAgIGltcG9ydCB7IElkZWFtYXRjaGluZ0NvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvaWRlYW1hdGNoaW5nL2lkZWFtYXRjaGluZy5jb21wb25lbnRcIjtcclxuICAgIGltcG9ydCB7IFNlYXJjaFJlc3VsdENvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvc2VhcmNocmVzdWx0L3NlYXJjaHJlc3VsdC5jb21wb25lbnRcIjtcclxuICAgICAgICBpbXBvcnQgeyBEZXRhaWxzQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9zZWFyY2hyZXN1bHQvZGV0YWlscy9kZXRhaWxzLmNvbXBvbmVudFwiOyBcclxuICAgIGltcG9ydCB7IFNlYXJjaE9wdGlvbkNvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvc2VhcmNob3B0aW9uL3NlYXJjaG9wdGlvbi5jb21wb25lbnRcIjtcclxuXHJcbmltcG9ydCB7IEVubmVhZ3JhbUNvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvZW5uZWFncmFtL2VubmVhZ3JhbS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQmxvZ0NvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvYmxvZy9ibG9nLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBQcm9maWxlSW5wdXRDb21wb25lbnQgfSBmcm9tIFwiLi9ob21lL3Byb2ZpbGUtaW5wdXQvcHJvZmlsZS1pbnB1dC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgU2V0dGluZ0NvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvc2V0dGluZy9zZXR0aW5nLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBGcmllbmRhZGRDb21wb25lbnQgfSBmcm9tIFwiLi9ob21lL2ZyaWVuZGFkZC9mcmllbmRhZGQuY29tcG9uZW50XCI7XHJcblxyXG5cclxuXHJcbmltcG9ydCB7IEZsb2F0QnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4vYnV0dG9ucy9mbG9hdC1idXR0b24vZmxvYXQtYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjFDb21wb25lbnQgfSBmcm9tIFwiLi9idXR0b25zL2NoaWxkLWJ1dHRvbjEvY2hpbGQtYnV0dG9uMS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ2hpbGRCdXR0b24yQ29tcG9uZW50IH0gZnJvbSBcIi4vYnV0dG9ucy9jaGlsZC1idXR0b24yL2NoaWxkLWJ1dHRvbjIuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IENoaWxkQnV0dG9uM0NvbXBvbmVudCB9IGZyb20gXCIuL2J1dHRvbnMvY2hpbGQtYnV0dG9uMy9jaGlsZC1idXR0b24zLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBGcmllbmRjaGF0Q29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9mcmllbmRjaGF0L2ZyaWVuZGNoYXQuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEFjdGlvbkJ1dHRvbkNvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvc2VhcmNocmVzdWx0L2FjdGlvbi1idXR0b24vYWN0aW9uLWJ1dHRvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTW9kYWxDb21wb25lbnQgfSBmcm9tIFwiLi9tb2RhbC9tb2RhbC5jb21wb25lbnRcIjtcclxuXHJcbmltcG9ydCAqIGFzIHBsYXRmb3JtIGZyb20gXCJwbGF0Zm9ybVwiO1xyXG5kZWNsYXJlIHZhciBHTVNTZXJ2aWNlczogYW55O1xyXG5cclxuaWYocGxhdGZvcm0uaXNJT1MpIHtcclxuICAgIEdNU1NlcnZpY2VzLnByb3ZpZGVBUElLZXkoXCJBSXphU3lBdFJWdkczQmUzeFhpWkZSN3hwLUstOWh5NG5aNGhNRnNcIik7XHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBib290c3RyYXA6IFtcclxuICAgICAgICBBcHBDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRVSUF1dG9Db21wbGV0ZVRleHRWaWV3TW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIFROU0NoZWNrQm94TW9kdWxlLFxyXG4gICAgICAgIEFwcFJvdXRpbmdNb2R1bGUsXHJcbiAgICAgICAgRm9ybXNNb2R1bGUsXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgQXBwQ29tcG9uZW50LFxyXG4gICAgICAgIExvZ2luQ29tcG9uZW50LFxyXG4gICAgICAgIFJlZ2lzdGVyQ29tcG9uZW50LFxyXG4gICAgICAgIEhvbWVDb21wb25lbnQsXHJcbiAgICAgICAgRnJpZW5kbGlzdENvbXBvbmVudCxcclxuICAgICAgICBGcmllbmRtYXRjaGluZ0NvbXBvbmVudCxcclxuICAgICAgICBNYXBFeGFtcGxlQ29tcG9uZW50LFxyXG4gICAgICAgIEZvb2RNYXRjaGluZ0NvbXBvbmVudCxcclxuICAgICAgICBGcmllbmRjaGF0Q29tcG9uZW50LFxyXG4gICAgICAgIENoYXRSb29tQ29tcG9uZW50LFxyXG4gICAgICAgIElkZWFtYXRjaGluZ0NvbXBvbmVudCxcclxuICAgICAgICBTZWFyY2hSZXN1bHRDb21wb25lbnQsXHJcbiAgICAgICAgRGV0YWlsc0NvbXBvbmVudCxcclxuICAgICAgICBTZWFyY2hPcHRpb25Db21wb25lbnQsXHJcbiAgICAgICAgRW5uZWFncmFtQ29tcG9uZW50LFxyXG4gICAgICAgIEJsb2dDb21wb25lbnQsXHJcbiAgICAgICAgUHJvZmlsZUlucHV0Q29tcG9uZW50LFxyXG4gICAgICAgIFNldHRpbmdDb21wb25lbnQsXHJcbiAgICAgICAgRnJpZW5kYWRkQ29tcG9uZW50LFxyXG5cclxuICAgICAgICBBY3Rpb25CdXR0b25Db21wb25lbnQsXHJcbiAgICAgICAgRmxvYXRCdXR0b25Db21wb25lbnQsXHJcbiAgICAgICAgQ2hpbGRCdXR0b24xQ29tcG9uZW50LFxyXG4gICAgICAgIENoaWxkQnV0dG9uMkNvbXBvbmVudCxcclxuICAgICAgICBDaGlsZEJ1dHRvbjNDb21wb25lbnQsXHJcbiAgICAgICAgTW9kYWxDb21wb25lbnQsXHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgRmlyZWJhc2VTZXJ2aWNlLFxyXG4gICAgICAgIEFuaW1hdGlvbnNTZXJ2aWNlLFxyXG4gICAgICAgIEJsb2dTZXJ2aWNlLFxyXG4gICAgICAgIFNlYXJjaFNlcnZpY2UsXHJcbiAgICBdLFxyXG4gICAgc2NoZW1hczogW1xyXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cclxuIl19