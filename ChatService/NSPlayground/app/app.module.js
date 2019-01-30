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
var animations_service_1 = require("./pages/home/searchresult/animations-service");
var uploadpost_service_1 = require("./pages/home/uploadpost/uploadpost-service");
var search_service_1 = require("./pages/home/searchoption/search-service");
var app_routing_module_1 = require("./app-routing.module");
var google_map_component_1 = require("./modules/google-map/google-map.component");
var google_analytics_component_1 = require("./modules/google-analytics/google-analytics.component");
var google_admob_component_1 = require("./modules/google-admob/google-admob.component");
var app_component_1 = require("./app.component");
var pages_component_1 = require("./pages/pages.component");
var login_component_1 = require("./pages/login/login.component");
var register_component_1 = require("./pages/register/register.component");
var home_component_1 = require("./pages/home/home.component");
var uploadpost_component_1 = require("./pages/home/uploadpost/uploadpost.component");
var friendlist_component_1 = require("./pages/home/friendlist/friendlist.component");
var friendchat_component_1 = require("./pages/home/friendchat/friendchat.component");
var friendmatching_component_1 = require("./pages/home/friendmatching/friendmatching.component");
var chat_room_component_1 = require("./pages/home/chat-room/chat-room.component");
var ideamatching_component_1 = require("./pages/home/ideamatching/ideamatching.component");
var searchresult_component_1 = require("./pages/home/searchresult/searchresult.component");
var detail_component_1 = require("./pages/home/searchresult/detail/detail.component");
var searchoption_component_1 = require("./pages/home/searchoption/searchoption.component");
var friendadd_component_1 = require("./pages/home/friendadd/friendadd.component");
var profile_input_component_1 = require("./pages/profile-input/profile-input.component");
var enneagram_component_1 = require("./pages/enneagram/enneagram.component");
var setting_component_1 = require("./pages/setting/setting.component");
var float_button_component_1 = require("./modules/buttons/float-button/float-button.component");
var child_button1_component_1 = require("./modules/buttons/child-button1/child-button1.component");
var child_button2_component_1 = require("./modules/buttons/child-button2/child-button2.component");
var child_button3_component_1 = require("./modules/buttons/child-button3/child-button3.component");
var action_button_component_1 = require("./modules/buttons/action-button/action-button.component");
var modal_component_1 = require("./modules/modal/modal.component");
var facedetection_component_1 = require("./test/facedetection/facedetection.component");
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
                google_map_component_1.GoogleMapComponent,
                google_analytics_component_1.GoogleAnalyticsComponent,
                google_admob_component_1.GoogleAdmobComponent,
                pages_component_1.PagesComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                home_component_1.HomeComponent,
                friendlist_component_1.FriendlistComponent,
                friendmatching_component_1.FriendmatchingComponent,
                friendchat_component_1.FriendchatComponent,
                chat_room_component_1.ChatRoomComponent,
                ideamatching_component_1.IdeamatchingComponent,
                searchresult_component_1.SearchResultComponent,
                detail_component_1.DetailComponent,
                searchoption_component_1.SearchOptionComponent,
                enneagram_component_1.EnneagramComponent,
                uploadpost_component_1.UploadpostComponent,
                profile_input_component_1.ProfileInputComponent,
                setting_component_1.SettingComponent,
                friendadd_component_1.FriendaddComponent,
                action_button_component_1.ActionButtonComponent,
                float_button_component_1.FloatButtonComponent,
                child_button1_component_1.ChildButton1Component,
                child_button2_component_1.ChildButton2Component,
                child_button3_component_1.ChildButton3Component,
                modal_component_1.ModalComponent,
                facedetection_component_1.FacedetectionComponent,
            ],
            providers: [
                firebase_service_1.FirebaseService,
                animations_service_1.AnimationsService,
                uploadpost_service_1.UploadpostService,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzREFBdUU7QUFDdkUsc0NBQWtGO0FBQ2xGLGdGQUE4RTtBQUM5RSw4REFBb0Y7QUFDcEYsNERBQWdGO0FBQ2hGLGdFQUFnRztBQUNoRyxvREFBcUU7QUFDckUseURBQWtFO0FBQ2xFLHdDQUE2QztBQUU3QyxnRUFBOEQ7QUFDOUQsbUZBQWlGO0FBQ2pGLGlGQUErRTtBQUMvRSwyRUFBeUU7QUFFekUsMkRBQXdEO0FBQ3hELGtGQUErRTtBQUMvRSxvR0FBaUc7QUFDakcsd0ZBQXFGO0FBRXJGLGlEQUErQztBQUMzQywyREFBeUQ7QUFDckQsaUVBQStEO0FBQzNELDBFQUF3RTtBQUM1RSw4REFBNEQ7QUFDeEQscUZBQW1GO0FBQ25GLHFGQUFtRjtBQUNuRixxRkFBbUY7QUFDbkYsaUdBQStGO0FBQy9GLGtGQUErRTtBQUMvRSwyRkFBeUY7QUFDekYsMkZBQXlGO0FBQ3JGLHNGQUFvRjtBQUN4RiwyRkFBeUY7QUFDekYsa0ZBQWdGO0FBQ3BGLHlGQUFzRjtBQUN0Riw2RUFBMkU7QUFDM0UsdUVBQXFFO0FBRTdFLGdHQUE2RjtBQUM3RixtR0FBZ0c7QUFDaEcsbUdBQWdHO0FBQ2hHLG1HQUFnRztBQUNoRyxtR0FBZ0c7QUFHaEcsbUVBQWlFO0FBQ2pFLHdGQUFzRjtBQUl0RixtQ0FBcUM7QUFJckMsSUFBRyxRQUFRLENBQUMsS0FBSyxFQUFFO0lBQ2YsV0FBVyxDQUFDLGFBQWEsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0NBQ3hFO0FBMEREO0lBQUE7SUFFQSxDQUFDO0lBRlksU0FBUztRQXhEckIsZUFBUSxDQUFDO1lBQ04sU0FBUyxFQUFFO2dCQUNQLDRCQUFZO2FBQ2Y7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsaUNBQXdCO2dCQUN4Qix3Q0FBa0I7Z0JBQ2xCLHdDQUE4QjtnQkFDOUIsc0NBQTRCO2dCQUM1QixrREFBd0M7Z0JBQ3hDLCtCQUF1QjtnQkFDdkIsMkJBQWlCO2dCQUNqQixxQ0FBZ0I7Z0JBQ2hCLG1CQUFXO2FBQ2Q7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsNEJBQVk7Z0JBQ1oseUNBQWtCO2dCQUNsQixxREFBd0I7Z0JBQ3hCLDZDQUFvQjtnQkFDcEIsZ0NBQWM7Z0JBQ2QsZ0NBQWM7Z0JBQ2Qsc0NBQWlCO2dCQUNqQiw4QkFBYTtnQkFDYiwwQ0FBbUI7Z0JBQ25CLGtEQUF1QjtnQkFDdkIsMENBQW1CO2dCQUNuQix1Q0FBaUI7Z0JBQ2pCLDhDQUFxQjtnQkFDckIsOENBQXFCO2dCQUNyQixrQ0FBZTtnQkFDZiw4Q0FBcUI7Z0JBQ3JCLHdDQUFrQjtnQkFDbEIsMENBQW1CO2dCQUNuQiwrQ0FBcUI7Z0JBQ3JCLG9DQUFnQjtnQkFDaEIsd0NBQWtCO2dCQUVsQiwrQ0FBcUI7Z0JBQ3JCLDZDQUFvQjtnQkFDcEIsK0NBQXFCO2dCQUNyQiwrQ0FBcUI7Z0JBQ3JCLCtDQUFxQjtnQkFDckIsZ0NBQWM7Z0JBQ2QsZ0RBQXNCO2FBQ3pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLGtDQUFlO2dCQUNmLHNDQUFpQjtnQkFDakIsc0NBQWlCO2dCQUNqQiw4QkFBYTthQUNoQjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csU0FBUyxDQUVyQjtJQUFELGdCQUFDO0NBQUEsQUFGRCxJQUVDO0FBRlksOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IE5nTW9kdWxlLCBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1saXN0dmlldy9hbmd1bGFyXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJQXV0b0NvbXBsZXRlVGV4dFZpZXdNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWF1dG9jb21wbGV0ZS9hbmd1bGFyXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IFROU0NoZWNrQm94TW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWNoZWNrYm94L2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQW5pbWF0aW9uc1NlcnZpY2UgfSBmcm9tIFwiLi9wYWdlcy9ob21lL3NlYXJjaHJlc3VsdC9hbmltYXRpb25zLXNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVXBsb2FkcG9zdFNlcnZpY2UgfSBmcm9tIFwiLi9wYWdlcy9ob21lL3VwbG9hZHBvc3QvdXBsb2FkcG9zdC1zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNlYXJjaFNlcnZpY2UgfSBmcm9tIFwiLi9wYWdlcy9ob21lL3NlYXJjaG9wdGlvbi9zZWFyY2gtc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC1yb3V0aW5nLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBHb29nbGVNYXBDb21wb25lbnQgfSBmcm9tIFwiLi9tb2R1bGVzL2dvb2dsZS1tYXAvZ29vZ2xlLW1hcC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgR29vZ2xlQW5hbHl0aWNzQ29tcG9uZW50IH0gZnJvbSBcIi4vbW9kdWxlcy9nb29nbGUtYW5hbHl0aWNzL2dvb2dsZS1hbmFseXRpY3MuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEdvb2dsZUFkbW9iQ29tcG9uZW50IH0gZnJvbSBcIi4vbW9kdWxlcy9nb29nbGUtYWRtb2IvZ29vZ2xlLWFkbW9iLmNvbXBvbmVudFwiO1xyXG5cclxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xyXG4gICAgaW1wb3J0IHsgUGFnZXNDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9wYWdlcy5jb21wb25lbnRcIjtcclxuICAgICAgICBpbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL2xvZ2luL2xvZ2luLmNvbXBvbmVudFwiO1xyXG4gICAgICAgICAgICBpbXBvcnQgeyBSZWdpc3RlckNvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudFwiO1xyXG4gICAgICAgIGltcG9ydCB7IEhvbWVDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9ob21lL2hvbWUuY29tcG9uZW50XCI7XHJcbiAgICAgICAgICAgIGltcG9ydCB7IFVwbG9hZHBvc3RDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9ob21lL3VwbG9hZHBvc3QvdXBsb2FkcG9zdC5jb21wb25lbnRcIjtcclxuICAgICAgICAgICAgaW1wb3J0IHsgRnJpZW5kbGlzdENvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL2hvbWUvZnJpZW5kbGlzdC9mcmllbmRsaXN0LmNvbXBvbmVudFwiO1xyXG4gICAgICAgICAgICBpbXBvcnQgeyBGcmllbmRjaGF0Q29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvaG9tZS9mcmllbmRjaGF0L2ZyaWVuZGNoYXQuY29tcG9uZW50XCI7XHJcbiAgICAgICAgICAgIGltcG9ydCB7IEZyaWVuZG1hdGNoaW5nQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvaG9tZS9mcmllbmRtYXRjaGluZy9mcmllbmRtYXRjaGluZy5jb21wb25lbnRcIjtcclxuICAgICAgICAgICAgaW1wb3J0IHsgQ2hhdFJvb21Db21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9ob21lL2NoYXQtcm9vbS9jaGF0LXJvb20uY29tcG9uZW50XCI7XHJcbiAgICAgICAgICAgIGltcG9ydCB7IElkZWFtYXRjaGluZ0NvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL2hvbWUvaWRlYW1hdGNoaW5nL2lkZWFtYXRjaGluZy5jb21wb25lbnRcIjtcclxuICAgICAgICAgICAgaW1wb3J0IHsgU2VhcmNoUmVzdWx0Q29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvaG9tZS9zZWFyY2hyZXN1bHQvc2VhcmNocmVzdWx0LmNvbXBvbmVudFwiO1xyXG4gICAgICAgICAgICAgICAgaW1wb3J0IHsgRGV0YWlsQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvaG9tZS9zZWFyY2hyZXN1bHQvZGV0YWlsL2RldGFpbC5jb21wb25lbnRcIjsgXHJcbiAgICAgICAgICAgIGltcG9ydCB7IFNlYXJjaE9wdGlvbkNvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL2hvbWUvc2VhcmNob3B0aW9uL3NlYXJjaG9wdGlvbi5jb21wb25lbnRcIjtcclxuICAgICAgICAgICAgaW1wb3J0IHsgRnJpZW5kYWRkQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvaG9tZS9mcmllbmRhZGQvZnJpZW5kYWRkLmNvbXBvbmVudFwiO1xyXG4gICAgICAgIGltcG9ydCB7IFByb2ZpbGVJbnB1dENvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL3Byb2ZpbGUtaW5wdXQvcHJvZmlsZS1pbnB1dC5jb21wb25lbnRcIjtcclxuICAgICAgICBpbXBvcnQgeyBFbm5lYWdyYW1Db21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9lbm5lYWdyYW0vZW5uZWFncmFtLmNvbXBvbmVudFwiO1xyXG4gICAgICAgIGltcG9ydCB7IFNldHRpbmdDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9zZXR0aW5nL3NldHRpbmcuY29tcG9uZW50XCI7XHJcblxyXG5pbXBvcnQgeyBGbG9hdEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gXCIuL21vZHVsZXMvYnV0dG9ucy9mbG9hdC1idXR0b24vZmxvYXQtYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjFDb21wb25lbnQgfSBmcm9tIFwiLi9tb2R1bGVzL2J1dHRvbnMvY2hpbGQtYnV0dG9uMS9jaGlsZC1idXR0b24xLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjJDb21wb25lbnQgfSBmcm9tIFwiLi9tb2R1bGVzL2J1dHRvbnMvY2hpbGQtYnV0dG9uMi9jaGlsZC1idXR0b24yLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjNDb21wb25lbnQgfSBmcm9tIFwiLi9tb2R1bGVzL2J1dHRvbnMvY2hpbGQtYnV0dG9uMy9jaGlsZC1idXR0b24zLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBBY3Rpb25CdXR0b25Db21wb25lbnQgfSBmcm9tIFwiLi9tb2R1bGVzL2J1dHRvbnMvYWN0aW9uLWJ1dHRvbi9hY3Rpb24tYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5cclxuXHJcbmltcG9ydCB7IE1vZGFsQ29tcG9uZW50IH0gZnJvbSBcIi4vbW9kdWxlcy9tb2RhbC9tb2RhbC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRmFjZWRldGVjdGlvbkNvbXBvbmVudCB9IGZyb20gXCIuL3Rlc3QvZmFjZWRldGVjdGlvbi9mYWNlZGV0ZWN0aW9uLmNvbXBvbmVudFwiO1xyXG5cclxuXHJcblxyXG5pbXBvcnQgKiBhcyBwbGF0Zm9ybSBmcm9tIFwicGxhdGZvcm1cIjtcclxuXHJcbmRlY2xhcmUgdmFyIEdNU1NlcnZpY2VzOiBhbnk7XHJcblxyXG5pZihwbGF0Zm9ybS5pc0lPUykge1xyXG4gICAgR01TU2VydmljZXMucHJvdmlkZUFQSUtleShcIkFJemFTeUF0UlZ2RzNCZTN4WGlaRlI3eHAtSy05aHk0blo0aE1Gc1wiKTtcclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGJvb3RzdHJhcDogW1xyXG4gICAgICAgIEFwcENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJQXV0b0NvbXBsZXRlVGV4dFZpZXdNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXHJcbiAgICAgICAgVE5TQ2hlY2tCb3hNb2R1bGUsXHJcbiAgICAgICAgQXBwUm91dGluZ01vZHVsZSxcclxuICAgICAgICBGb3Jtc01vZHVsZSxcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBBcHBDb21wb25lbnQsXHJcbiAgICAgICAgR29vZ2xlTWFwQ29tcG9uZW50LFxyXG4gICAgICAgIEdvb2dsZUFuYWx5dGljc0NvbXBvbmVudCxcclxuICAgICAgICBHb29nbGVBZG1vYkNvbXBvbmVudCxcclxuICAgICAgICBQYWdlc0NvbXBvbmVudCxcclxuICAgICAgICBMb2dpbkNvbXBvbmVudCxcclxuICAgICAgICBSZWdpc3RlckNvbXBvbmVudCxcclxuICAgICAgICBIb21lQ29tcG9uZW50LFxyXG4gICAgICAgIEZyaWVuZGxpc3RDb21wb25lbnQsXHJcbiAgICAgICAgRnJpZW5kbWF0Y2hpbmdDb21wb25lbnQsXHJcbiAgICAgICAgRnJpZW5kY2hhdENvbXBvbmVudCxcclxuICAgICAgICBDaGF0Um9vbUNvbXBvbmVudCxcclxuICAgICAgICBJZGVhbWF0Y2hpbmdDb21wb25lbnQsXHJcbiAgICAgICAgU2VhcmNoUmVzdWx0Q29tcG9uZW50LFxyXG4gICAgICAgIERldGFpbENvbXBvbmVudCxcclxuICAgICAgICBTZWFyY2hPcHRpb25Db21wb25lbnQsXHJcbiAgICAgICAgRW5uZWFncmFtQ29tcG9uZW50LFxyXG4gICAgICAgIFVwbG9hZHBvc3RDb21wb25lbnQsXHJcbiAgICAgICAgUHJvZmlsZUlucHV0Q29tcG9uZW50LFxyXG4gICAgICAgIFNldHRpbmdDb21wb25lbnQsXHJcbiAgICAgICAgRnJpZW5kYWRkQ29tcG9uZW50LFxyXG5cclxuICAgICAgICBBY3Rpb25CdXR0b25Db21wb25lbnQsXHJcbiAgICAgICAgRmxvYXRCdXR0b25Db21wb25lbnQsXHJcbiAgICAgICAgQ2hpbGRCdXR0b24xQ29tcG9uZW50LFxyXG4gICAgICAgIENoaWxkQnV0dG9uMkNvbXBvbmVudCxcclxuICAgICAgICBDaGlsZEJ1dHRvbjNDb21wb25lbnQsXHJcbiAgICAgICAgTW9kYWxDb21wb25lbnQsXHJcbiAgICAgICAgRmFjZWRldGVjdGlvbkNvbXBvbmVudCxcclxuICAgIF0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBGaXJlYmFzZVNlcnZpY2UsXHJcbiAgICAgICAgQW5pbWF0aW9uc1NlcnZpY2UsXHJcbiAgICAgICAgVXBsb2FkcG9zdFNlcnZpY2UsXHJcbiAgICAgICAgU2VhcmNoU2VydmljZSxcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbXHJcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgXHJcblxyXG59XHJcbiJdfQ==