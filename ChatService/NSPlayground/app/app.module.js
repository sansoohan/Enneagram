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
var details_component_1 = require("./pages/home/searchresult/details/details.component");
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
                details_component_1.DetailsComponent,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzREFBdUU7QUFDdkUsc0NBQWtGO0FBQ2xGLGdGQUE4RTtBQUM5RSw4REFBb0Y7QUFDcEYsNERBQWdGO0FBQ2hGLGdFQUFnRztBQUNoRyxvREFBcUU7QUFDckUseURBQWtFO0FBQ2xFLHdDQUE2QztBQUU3QyxnRUFBOEQ7QUFDOUQsbUZBQWlGO0FBQ2pGLGlGQUErRTtBQUMvRSwyRUFBeUU7QUFFekUsMkRBQXdEO0FBQ3hELGtGQUErRTtBQUMvRSxvR0FBaUc7QUFFakcsaURBQStDO0FBQzNDLDJEQUF5RDtBQUNyRCxpRUFBK0Q7QUFDM0QsMEVBQXdFO0FBQzVFLDhEQUE0RDtBQUN4RCxxRkFBbUY7QUFDbkYscUZBQW1GO0FBQ25GLHFGQUFtRjtBQUNuRixpR0FBK0Y7QUFDL0Ysa0ZBQStFO0FBQy9FLDJGQUF5RjtBQUN6RiwyRkFBeUY7QUFDckYseUZBQXVGO0FBQzNGLDJGQUF5RjtBQUN6RixrRkFBZ0Y7QUFDcEYseUZBQXNGO0FBQ3RGLDZFQUEyRTtBQUMzRSx1RUFBcUU7QUFFN0UsZ0dBQTZGO0FBQzdGLG1HQUFnRztBQUNoRyxtR0FBZ0c7QUFDaEcsbUdBQWdHO0FBQ2hHLG1HQUFnRztBQUdoRyxtRUFBaUU7QUFDakUsd0ZBQXNGO0FBQ3RGLGdFQUE4RDtBQUc5RCxtQ0FBcUM7QUFJckMsRUFBRSxDQUFBLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDaEIsV0FBVyxDQUFDLGFBQWEsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0FBQ3pFLENBQUM7QUEwREQ7SUFBQTtJQUVBLENBQUM7SUFGWSxTQUFTO1FBeERyQixlQUFRLENBQUM7WUFDTixTQUFTLEVBQUU7Z0JBQ1AsNEJBQVk7YUFDZjtZQUNELE9BQU8sRUFBRTtnQkFDTCxpQ0FBd0I7Z0JBQ3hCLHdDQUFrQjtnQkFDbEIsd0NBQThCO2dCQUM5QixzQ0FBNEI7Z0JBQzVCLGtEQUF3QztnQkFDeEMsK0JBQXVCO2dCQUN2QiwyQkFBaUI7Z0JBQ2pCLHFDQUFnQjtnQkFDaEIsbUJBQVc7YUFDZDtZQUNELFlBQVksRUFBRTtnQkFDViw0QkFBWTtnQkFDWix5Q0FBa0I7Z0JBQ2xCLHFEQUF3QjtnQkFDeEIsZ0NBQWM7Z0JBQ2QsZ0NBQWM7Z0JBQ2Qsc0NBQWlCO2dCQUNqQiw4QkFBYTtnQkFDYiwwQ0FBbUI7Z0JBQ25CLGtEQUF1QjtnQkFDdkIsMENBQW1CO2dCQUNuQix1Q0FBaUI7Z0JBQ2pCLDhDQUFxQjtnQkFDckIsOENBQXFCO2dCQUNyQixvQ0FBZ0I7Z0JBQ2hCLDhDQUFxQjtnQkFDckIsd0NBQWtCO2dCQUNsQiwwQ0FBbUI7Z0JBQ25CLCtDQUFxQjtnQkFDckIsb0NBQWdCO2dCQUNoQix3Q0FBa0I7Z0JBRWxCLCtDQUFxQjtnQkFDckIsNkNBQW9CO2dCQUNwQiwrQ0FBcUI7Z0JBQ3JCLCtDQUFxQjtnQkFDckIsK0NBQXFCO2dCQUNyQixnQ0FBYztnQkFDZCxnREFBc0I7Z0JBQ3RCLGdDQUFjO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLGtDQUFlO2dCQUNmLHNDQUFpQjtnQkFDakIsc0NBQWlCO2dCQUNqQiw4QkFBYTthQUNoQjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csU0FBUyxDQUVyQjtJQUFELGdCQUFDO0NBQUEsQUFGRCxJQUVDO0FBRlksOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IE5nTW9kdWxlLCBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1saXN0dmlldy9hbmd1bGFyXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJQXV0b0NvbXBsZXRlVGV4dFZpZXdNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWF1dG9jb21wbGV0ZS9hbmd1bGFyXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IFROU0NoZWNrQm94TW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWNoZWNrYm94L2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQW5pbWF0aW9uc1NlcnZpY2UgfSBmcm9tIFwiLi9wYWdlcy9ob21lL3NlYXJjaHJlc3VsdC9hbmltYXRpb25zLXNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVXBsb2FkcG9zdFNlcnZpY2UgfSBmcm9tIFwiLi9wYWdlcy9ob21lL3VwbG9hZHBvc3QvdXBsb2FkcG9zdC1zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNlYXJjaFNlcnZpY2UgfSBmcm9tIFwiLi9wYWdlcy9ob21lL3NlYXJjaG9wdGlvbi9zZWFyY2gtc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC1yb3V0aW5nLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBHb29nbGVNYXBDb21wb25lbnQgfSBmcm9tIFwiLi9tb2R1bGVzL2dvb2dsZS1tYXAvZ29vZ2xlLW1hcC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgR29vZ2xlQW5hbHl0aWNzQ29tcG9uZW50IH0gZnJvbSBcIi4vbW9kdWxlcy9nb29nbGUtYW5hbHl0aWNzL2dvb2dsZS1hbmFseXRpY3MuY29tcG9uZW50XCI7XHJcblxyXG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XHJcbiAgICBpbXBvcnQgeyBQYWdlc0NvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL3BhZ2VzLmNvbXBvbmVudFwiO1xyXG4gICAgICAgIGltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvbG9naW4vbG9naW4uY29tcG9uZW50XCI7XHJcbiAgICAgICAgICAgIGltcG9ydCB7IFJlZ2lzdGVyQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvcmVnaXN0ZXIvcmVnaXN0ZXIuY29tcG9uZW50XCI7XHJcbiAgICAgICAgaW1wb3J0IHsgSG9tZUNvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL2hvbWUvaG9tZS5jb21wb25lbnRcIjtcclxuICAgICAgICAgICAgaW1wb3J0IHsgVXBsb2FkcG9zdENvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL2hvbWUvdXBsb2FkcG9zdC91cGxvYWRwb3N0LmNvbXBvbmVudFwiO1xyXG4gICAgICAgICAgICBpbXBvcnQgeyBGcmllbmRsaXN0Q29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvaG9tZS9mcmllbmRsaXN0L2ZyaWVuZGxpc3QuY29tcG9uZW50XCI7XHJcbiAgICAgICAgICAgIGltcG9ydCB7IEZyaWVuZGNoYXRDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9ob21lL2ZyaWVuZGNoYXQvZnJpZW5kY2hhdC5jb21wb25lbnRcIjtcclxuICAgICAgICAgICAgaW1wb3J0IHsgRnJpZW5kbWF0Y2hpbmdDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9ob21lL2ZyaWVuZG1hdGNoaW5nL2ZyaWVuZG1hdGNoaW5nLmNvbXBvbmVudFwiO1xyXG4gICAgICAgICAgICBpbXBvcnQgeyBDaGF0Um9vbUNvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL2hvbWUvY2hhdC1yb29tL2NoYXQtcm9vbS5jb21wb25lbnRcIjtcclxuICAgICAgICAgICAgaW1wb3J0IHsgSWRlYW1hdGNoaW5nQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvaG9tZS9pZGVhbWF0Y2hpbmcvaWRlYW1hdGNoaW5nLmNvbXBvbmVudFwiO1xyXG4gICAgICAgICAgICBpbXBvcnQgeyBTZWFyY2hSZXN1bHRDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9ob21lL3NlYXJjaHJlc3VsdC9zZWFyY2hyZXN1bHQuY29tcG9uZW50XCI7XHJcbiAgICAgICAgICAgICAgICBpbXBvcnQgeyBEZXRhaWxzQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvaG9tZS9zZWFyY2hyZXN1bHQvZGV0YWlscy9kZXRhaWxzLmNvbXBvbmVudFwiOyBcclxuICAgICAgICAgICAgaW1wb3J0IHsgU2VhcmNoT3B0aW9uQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvaG9tZS9zZWFyY2hvcHRpb24vc2VhcmNob3B0aW9uLmNvbXBvbmVudFwiO1xyXG4gICAgICAgICAgICBpbXBvcnQgeyBGcmllbmRhZGRDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9ob21lL2ZyaWVuZGFkZC9mcmllbmRhZGQuY29tcG9uZW50XCI7XHJcbiAgICAgICAgaW1wb3J0IHsgUHJvZmlsZUlucHV0Q29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvcHJvZmlsZS1pbnB1dC9wcm9maWxlLWlucHV0LmNvbXBvbmVudFwiO1xyXG4gICAgICAgIGltcG9ydCB7IEVubmVhZ3JhbUNvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL2VubmVhZ3JhbS9lbm5lYWdyYW0uY29tcG9uZW50XCI7XHJcbiAgICAgICAgaW1wb3J0IHsgU2V0dGluZ0NvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL3NldHRpbmcvc2V0dGluZy5jb21wb25lbnRcIjtcclxuXHJcbmltcG9ydCB7IEZsb2F0QnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4vbW9kdWxlcy9idXR0b25zL2Zsb2F0LWJ1dHRvbi9mbG9hdC1idXR0b24uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IENoaWxkQnV0dG9uMUNvbXBvbmVudCB9IGZyb20gXCIuL21vZHVsZXMvYnV0dG9ucy9jaGlsZC1idXR0b24xL2NoaWxkLWJ1dHRvbjEuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IENoaWxkQnV0dG9uMkNvbXBvbmVudCB9IGZyb20gXCIuL21vZHVsZXMvYnV0dG9ucy9jaGlsZC1idXR0b24yL2NoaWxkLWJ1dHRvbjIuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IENoaWxkQnV0dG9uM0NvbXBvbmVudCB9IGZyb20gXCIuL21vZHVsZXMvYnV0dG9ucy9jaGlsZC1idXR0b24zL2NoaWxkLWJ1dHRvbjMuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEFjdGlvbkJ1dHRvbkNvbXBvbmVudCB9IGZyb20gXCIuL21vZHVsZXMvYnV0dG9ucy9hY3Rpb24tYnV0dG9uL2FjdGlvbi1idXR0b24uY29tcG9uZW50XCI7XHJcblxyXG5cclxuaW1wb3J0IHsgTW9kYWxDb21wb25lbnQgfSBmcm9tIFwiLi9tb2R1bGVzL21vZGFsL21vZGFsLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBGYWNlZGV0ZWN0aW9uQ29tcG9uZW50IH0gZnJvbSBcIi4vdGVzdC9mYWNlZGV0ZWN0aW9uL2ZhY2VkZXRlY3Rpb24uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEFkbW9iQ29tcG9uZW50IH0gZnJvbSBcIi4vdGVzdC9hZG1vYi9hZG1vYi5jb21wb25lbnRcIjtcclxuXHJcblxyXG5pbXBvcnQgKiBhcyBwbGF0Zm9ybSBmcm9tIFwicGxhdGZvcm1cIjtcclxuXHJcbmRlY2xhcmUgdmFyIEdNU1NlcnZpY2VzOiBhbnk7XHJcblxyXG5pZihwbGF0Zm9ybS5pc0lPUykge1xyXG4gICAgR01TU2VydmljZXMucHJvdmlkZUFQSUtleShcIkFJemFTeUF0UlZ2RzNCZTN4WGlaRlI3eHAtSy05aHk0blo0aE1Gc1wiKTtcclxufVxyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGJvb3RzdHJhcDogW1xyXG4gICAgICAgIEFwcENvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJQXV0b0NvbXBsZXRlVGV4dFZpZXdNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXHJcbiAgICAgICAgVE5TQ2hlY2tCb3hNb2R1bGUsXHJcbiAgICAgICAgQXBwUm91dGluZ01vZHVsZSxcclxuICAgICAgICBGb3Jtc01vZHVsZSxcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBBcHBDb21wb25lbnQsXHJcbiAgICAgICAgR29vZ2xlTWFwQ29tcG9uZW50LFxyXG4gICAgICAgIEdvb2dsZUFuYWx5dGljc0NvbXBvbmVudCxcclxuICAgICAgICBQYWdlc0NvbXBvbmVudCxcclxuICAgICAgICBMb2dpbkNvbXBvbmVudCxcclxuICAgICAgICBSZWdpc3RlckNvbXBvbmVudCxcclxuICAgICAgICBIb21lQ29tcG9uZW50LFxyXG4gICAgICAgIEZyaWVuZGxpc3RDb21wb25lbnQsXHJcbiAgICAgICAgRnJpZW5kbWF0Y2hpbmdDb21wb25lbnQsXHJcbiAgICAgICAgRnJpZW5kY2hhdENvbXBvbmVudCxcclxuICAgICAgICBDaGF0Um9vbUNvbXBvbmVudCxcclxuICAgICAgICBJZGVhbWF0Y2hpbmdDb21wb25lbnQsXHJcbiAgICAgICAgU2VhcmNoUmVzdWx0Q29tcG9uZW50LFxyXG4gICAgICAgIERldGFpbHNDb21wb25lbnQsXHJcbiAgICAgICAgU2VhcmNoT3B0aW9uQ29tcG9uZW50LFxyXG4gICAgICAgIEVubmVhZ3JhbUNvbXBvbmVudCxcclxuICAgICAgICBVcGxvYWRwb3N0Q29tcG9uZW50LFxyXG4gICAgICAgIFByb2ZpbGVJbnB1dENvbXBvbmVudCxcclxuICAgICAgICBTZXR0aW5nQ29tcG9uZW50LFxyXG4gICAgICAgIEZyaWVuZGFkZENvbXBvbmVudCxcclxuXHJcbiAgICAgICAgQWN0aW9uQnV0dG9uQ29tcG9uZW50LFxyXG4gICAgICAgIEZsb2F0QnV0dG9uQ29tcG9uZW50LFxyXG4gICAgICAgIENoaWxkQnV0dG9uMUNvbXBvbmVudCxcclxuICAgICAgICBDaGlsZEJ1dHRvbjJDb21wb25lbnQsXHJcbiAgICAgICAgQ2hpbGRCdXR0b24zQ29tcG9uZW50LFxyXG4gICAgICAgIE1vZGFsQ29tcG9uZW50LFxyXG4gICAgICAgIEZhY2VkZXRlY3Rpb25Db21wb25lbnQsXHJcbiAgICAgICAgQWRtb2JDb21wb25lbnQsXHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgRmlyZWJhc2VTZXJ2aWNlLFxyXG4gICAgICAgIEFuaW1hdGlvbnNTZXJ2aWNlLFxyXG4gICAgICAgIFVwbG9hZHBvc3RTZXJ2aWNlLFxyXG4gICAgICAgIFNlYXJjaFNlcnZpY2UsXHJcbiAgICBdLFxyXG4gICAgc2NoZW1hczogW1xyXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IFxyXG5cclxufVxyXG4iXX0=