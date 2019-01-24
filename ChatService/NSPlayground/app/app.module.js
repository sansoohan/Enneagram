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
var admob_component_1 = require("./test/admob/admob.component");
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
                admob_component_1.AdmobComponent,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzREFBdUU7QUFDdkUsc0NBQWtGO0FBQ2xGLGdGQUE4RTtBQUM5RSw4REFBb0Y7QUFDcEYsNERBQWdGO0FBQ2hGLGdFQUFnRztBQUNoRyxvREFBcUU7QUFDckUseURBQWtFO0FBQ2xFLHdDQUE2QztBQUU3QyxnRUFBOEQ7QUFDOUQsbUZBQWlGO0FBQ2pGLGlGQUErRTtBQUMvRSwyRUFBeUU7QUFFekUsMkRBQXdEO0FBQ3hELGtGQUErRTtBQUMvRSxvR0FBaUc7QUFFakcsaURBQStDO0FBQzNDLDJEQUF5RDtBQUNyRCxpRUFBK0Q7QUFDM0QsMEVBQXdFO0FBQzVFLDhEQUE0RDtBQUN4RCxxRkFBbUY7QUFDbkYscUZBQW1GO0FBQ25GLHFGQUFtRjtBQUNuRixpR0FBK0Y7QUFDL0Ysa0ZBQStFO0FBQy9FLDJGQUF5RjtBQUN6RiwyRkFBeUY7QUFDckYsc0ZBQW9GO0FBQ3hGLDJGQUF5RjtBQUN6RixrRkFBZ0Y7QUFDcEYseUZBQXNGO0FBQ3RGLDZFQUEyRTtBQUMzRSx1RUFBcUU7QUFFN0UsZ0dBQTZGO0FBQzdGLG1HQUFnRztBQUNoRyxtR0FBZ0c7QUFDaEcsbUdBQWdHO0FBQ2hHLG1HQUFnRztBQUdoRyxtRUFBaUU7QUFDakUsd0ZBQXNGO0FBQ3RGLGdFQUE4RDtBQUc5RCxtQ0FBcUM7QUFJckMsRUFBRSxDQUFBLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDaEIsV0FBVyxDQUFDLGFBQWEsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0FBQ3pFLENBQUM7QUEwREQ7SUFBQTtJQUVBLENBQUM7SUFGWSxTQUFTO1FBeERyQixlQUFRLENBQUM7WUFDTixTQUFTLEVBQUU7Z0JBQ1AsNEJBQVk7YUFDZjtZQUNELE9BQU8sRUFBRTtnQkFDTCxpQ0FBd0I7Z0JBQ3hCLHdDQUFrQjtnQkFDbEIsd0NBQThCO2dCQUM5QixzQ0FBNEI7Z0JBQzVCLGtEQUF3QztnQkFDeEMsK0JBQXVCO2dCQUN2QiwyQkFBaUI7Z0JBQ2pCLHFDQUFnQjtnQkFDaEIsbUJBQVc7YUFDZDtZQUNELFlBQVksRUFBRTtnQkFDViw0QkFBWTtnQkFDWix5Q0FBa0I7Z0JBQ2xCLHFEQUF3QjtnQkFDeEIsZ0NBQWM7Z0JBQ2QsZ0NBQWM7Z0JBQ2Qsc0NBQWlCO2dCQUNqQiw4QkFBYTtnQkFDYiwwQ0FBbUI7Z0JBQ25CLGtEQUF1QjtnQkFDdkIsMENBQW1CO2dCQUNuQix1Q0FBaUI7Z0JBQ2pCLDhDQUFxQjtnQkFDckIsOENBQXFCO2dCQUNyQixrQ0FBZTtnQkFDZiw4Q0FBcUI7Z0JBQ3JCLHdDQUFrQjtnQkFDbEIsMENBQW1CO2dCQUNuQiwrQ0FBcUI7Z0JBQ3JCLG9DQUFnQjtnQkFDaEIsd0NBQWtCO2dCQUVsQiwrQ0FBcUI7Z0JBQ3JCLDZDQUFvQjtnQkFDcEIsK0NBQXFCO2dCQUNyQiwrQ0FBcUI7Z0JBQ3JCLCtDQUFxQjtnQkFDckIsZ0NBQWM7Z0JBQ2QsZ0RBQXNCO2dCQUN0QixnQ0FBYzthQUNqQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxrQ0FBZTtnQkFDZixzQ0FBaUI7Z0JBQ2pCLHNDQUFpQjtnQkFDakIsOEJBQWE7YUFDaEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztPQUNXLFNBQVMsQ0FFckI7SUFBRCxnQkFBQztDQUFBLEFBRkQsSUFFQztBQUZZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSwgTmdNb2R1bGVGYWN0b3J5TG9hZGVyLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktbGlzdHZpZXcvYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUF1dG9Db21wbGV0ZVRleHRWaWV3TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1hdXRvY29tcGxldGUvYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBUTlNDaGVja0JveE1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1jaGVja2JveC9hbmd1bGFyJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbnNTZXJ2aWNlIH0gZnJvbSBcIi4vcGFnZXMvaG9tZS9zZWFyY2hyZXN1bHQvYW5pbWF0aW9ucy1zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFVwbG9hZHBvc3RTZXJ2aWNlIH0gZnJvbSBcIi4vcGFnZXMvaG9tZS91cGxvYWRwb3N0L3VwbG9hZHBvc3Qtc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTZWFyY2hTZXJ2aWNlIH0gZnJvbSBcIi4vcGFnZXMvaG9tZS9zZWFyY2hvcHRpb24vc2VhcmNoLXNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hcHAtcm91dGluZy5tb2R1bGVcIjtcclxuaW1wb3J0IHsgR29vZ2xlTWFwQ29tcG9uZW50IH0gZnJvbSBcIi4vbW9kdWxlcy9nb29nbGUtbWFwL2dvb2dsZS1tYXAuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEdvb2dsZUFuYWx5dGljc0NvbXBvbmVudCB9IGZyb20gXCIuL21vZHVsZXMvZ29vZ2xlLWFuYWx5dGljcy9nb29nbGUtYW5hbHl0aWNzLmNvbXBvbmVudFwiO1xyXG5cclxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xyXG4gICAgaW1wb3J0IHsgUGFnZXNDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9wYWdlcy5jb21wb25lbnRcIjtcclxuICAgICAgICBpbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL2xvZ2luL2xvZ2luLmNvbXBvbmVudFwiO1xyXG4gICAgICAgICAgICBpbXBvcnQgeyBSZWdpc3RlckNvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudFwiO1xyXG4gICAgICAgIGltcG9ydCB7IEhvbWVDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9ob21lL2hvbWUuY29tcG9uZW50XCI7XHJcbiAgICAgICAgICAgIGltcG9ydCB7IFVwbG9hZHBvc3RDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9ob21lL3VwbG9hZHBvc3QvdXBsb2FkcG9zdC5jb21wb25lbnRcIjtcclxuICAgICAgICAgICAgaW1wb3J0IHsgRnJpZW5kbGlzdENvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL2hvbWUvZnJpZW5kbGlzdC9mcmllbmRsaXN0LmNvbXBvbmVudFwiO1xyXG4gICAgICAgICAgICBpbXBvcnQgeyBGcmllbmRjaGF0Q29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvaG9tZS9mcmllbmRjaGF0L2ZyaWVuZGNoYXQuY29tcG9uZW50XCI7XHJcbiAgICAgICAgICAgIGltcG9ydCB7IEZyaWVuZG1hdGNoaW5nQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvaG9tZS9mcmllbmRtYXRjaGluZy9mcmllbmRtYXRjaGluZy5jb21wb25lbnRcIjtcclxuICAgICAgICAgICAgaW1wb3J0IHsgQ2hhdFJvb21Db21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9ob21lL2NoYXQtcm9vbS9jaGF0LXJvb20uY29tcG9uZW50XCI7XHJcbiAgICAgICAgICAgIGltcG9ydCB7IElkZWFtYXRjaGluZ0NvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL2hvbWUvaWRlYW1hdGNoaW5nL2lkZWFtYXRjaGluZy5jb21wb25lbnRcIjtcclxuICAgICAgICAgICAgaW1wb3J0IHsgU2VhcmNoUmVzdWx0Q29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvaG9tZS9zZWFyY2hyZXN1bHQvc2VhcmNocmVzdWx0LmNvbXBvbmVudFwiO1xyXG4gICAgICAgICAgICAgICAgaW1wb3J0IHsgRGV0YWlsQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvaG9tZS9zZWFyY2hyZXN1bHQvZGV0YWlsL2RldGFpbC5jb21wb25lbnRcIjsgXHJcbiAgICAgICAgICAgIGltcG9ydCB7IFNlYXJjaE9wdGlvbkNvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL2hvbWUvc2VhcmNob3B0aW9uL3NlYXJjaG9wdGlvbi5jb21wb25lbnRcIjtcclxuICAgICAgICAgICAgaW1wb3J0IHsgRnJpZW5kYWRkQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvaG9tZS9mcmllbmRhZGQvZnJpZW5kYWRkLmNvbXBvbmVudFwiO1xyXG4gICAgICAgIGltcG9ydCB7IFByb2ZpbGVJbnB1dENvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL3Byb2ZpbGUtaW5wdXQvcHJvZmlsZS1pbnB1dC5jb21wb25lbnRcIjtcclxuICAgICAgICBpbXBvcnQgeyBFbm5lYWdyYW1Db21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9lbm5lYWdyYW0vZW5uZWFncmFtLmNvbXBvbmVudFwiO1xyXG4gICAgICAgIGltcG9ydCB7IFNldHRpbmdDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9zZXR0aW5nL3NldHRpbmcuY29tcG9uZW50XCI7XHJcblxyXG5pbXBvcnQgeyBGbG9hdEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gXCIuL21vZHVsZXMvYnV0dG9ucy9mbG9hdC1idXR0b24vZmxvYXQtYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjFDb21wb25lbnQgfSBmcm9tIFwiLi9tb2R1bGVzL2J1dHRvbnMvY2hpbGQtYnV0dG9uMS9jaGlsZC1idXR0b24xLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjJDb21wb25lbnQgfSBmcm9tIFwiLi9tb2R1bGVzL2J1dHRvbnMvY2hpbGQtYnV0dG9uMi9jaGlsZC1idXR0b24yLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjNDb21wb25lbnQgfSBmcm9tIFwiLi9tb2R1bGVzL2J1dHRvbnMvY2hpbGQtYnV0dG9uMy9jaGlsZC1idXR0b24zLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBBY3Rpb25CdXR0b25Db21wb25lbnQgfSBmcm9tIFwiLi9tb2R1bGVzL2J1dHRvbnMvYWN0aW9uLWJ1dHRvbi9hY3Rpb24tYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5cclxuXHJcbmltcG9ydCB7IE1vZGFsQ29tcG9uZW50IH0gZnJvbSBcIi4vbW9kdWxlcy9tb2RhbC9tb2RhbC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRmFjZWRldGVjdGlvbkNvbXBvbmVudCB9IGZyb20gXCIuL3Rlc3QvZmFjZWRldGVjdGlvbi9mYWNlZGV0ZWN0aW9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBBZG1vYkNvbXBvbmVudCB9IGZyb20gXCIuL3Rlc3QvYWRtb2IvYWRtb2IuY29tcG9uZW50XCI7XHJcblxyXG5cclxuaW1wb3J0ICogYXMgcGxhdGZvcm0gZnJvbSBcInBsYXRmb3JtXCI7XHJcblxyXG5kZWNsYXJlIHZhciBHTVNTZXJ2aWNlczogYW55O1xyXG5cclxuaWYocGxhdGZvcm0uaXNJT1MpIHtcclxuICAgIEdNU1NlcnZpY2VzLnByb3ZpZGVBUElLZXkoXCJBSXphU3lBdFJWdkczQmUzeFhpWkZSN3hwLUstOWh5NG5aNGhNRnNcIik7XHJcbn1cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBib290c3RyYXA6IFtcclxuICAgICAgICBBcHBDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRVSUF1dG9Db21wbGV0ZVRleHRWaWV3TW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIFROU0NoZWNrQm94TW9kdWxlLFxyXG4gICAgICAgIEFwcFJvdXRpbmdNb2R1bGUsXHJcbiAgICAgICAgRm9ybXNNb2R1bGUsXHJcbiAgICBdLFxyXG4gICAgZGVjbGFyYXRpb25zOiBbXHJcbiAgICAgICAgQXBwQ29tcG9uZW50LFxyXG4gICAgICAgIEdvb2dsZU1hcENvbXBvbmVudCxcclxuICAgICAgICBHb29nbGVBbmFseXRpY3NDb21wb25lbnQsXHJcbiAgICAgICAgUGFnZXNDb21wb25lbnQsXHJcbiAgICAgICAgTG9naW5Db21wb25lbnQsXHJcbiAgICAgICAgUmVnaXN0ZXJDb21wb25lbnQsXHJcbiAgICAgICAgSG9tZUNvbXBvbmVudCxcclxuICAgICAgICBGcmllbmRsaXN0Q29tcG9uZW50LFxyXG4gICAgICAgIEZyaWVuZG1hdGNoaW5nQ29tcG9uZW50LFxyXG4gICAgICAgIEZyaWVuZGNoYXRDb21wb25lbnQsXHJcbiAgICAgICAgQ2hhdFJvb21Db21wb25lbnQsXHJcbiAgICAgICAgSWRlYW1hdGNoaW5nQ29tcG9uZW50LFxyXG4gICAgICAgIFNlYXJjaFJlc3VsdENvbXBvbmVudCxcclxuICAgICAgICBEZXRhaWxDb21wb25lbnQsXHJcbiAgICAgICAgU2VhcmNoT3B0aW9uQ29tcG9uZW50LFxyXG4gICAgICAgIEVubmVhZ3JhbUNvbXBvbmVudCxcclxuICAgICAgICBVcGxvYWRwb3N0Q29tcG9uZW50LFxyXG4gICAgICAgIFByb2ZpbGVJbnB1dENvbXBvbmVudCxcclxuICAgICAgICBTZXR0aW5nQ29tcG9uZW50LFxyXG4gICAgICAgIEZyaWVuZGFkZENvbXBvbmVudCxcclxuXHJcbiAgICAgICAgQWN0aW9uQnV0dG9uQ29tcG9uZW50LFxyXG4gICAgICAgIEZsb2F0QnV0dG9uQ29tcG9uZW50LFxyXG4gICAgICAgIENoaWxkQnV0dG9uMUNvbXBvbmVudCxcclxuICAgICAgICBDaGlsZEJ1dHRvbjJDb21wb25lbnQsXHJcbiAgICAgICAgQ2hpbGRCdXR0b24zQ29tcG9uZW50LFxyXG4gICAgICAgIE1vZGFsQ29tcG9uZW50LFxyXG4gICAgICAgIEZhY2VkZXRlY3Rpb25Db21wb25lbnQsXHJcbiAgICAgICAgQWRtb2JDb21wb25lbnQsXHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgRmlyZWJhc2VTZXJ2aWNlLFxyXG4gICAgICAgIEFuaW1hdGlvbnNTZXJ2aWNlLFxyXG4gICAgICAgIFVwbG9hZHBvc3RTZXJ2aWNlLFxyXG4gICAgICAgIFNlYXJjaFNlcnZpY2UsXHJcbiAgICBdLFxyXG4gICAgc2NoZW1hczogW1xyXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IFxyXG5cclxufVxyXG4iXX0=