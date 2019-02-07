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
var machine_learning_component_1 = require("./modules/machine-learning/machine-learning.component");
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
var invitation_component_1 = require("./test/invitation/invitation.component");
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
                machine_learning_component_1.MachineLearningComponent,
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
                invitation_component_1.InvitationComponent,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzREFBdUU7QUFDdkUsc0NBQWtGO0FBQ2xGLGdGQUE4RTtBQUM5RSw4REFBb0Y7QUFDcEYsNERBQWdGO0FBQ2hGLGdFQUFnRztBQUNoRyxvREFBcUU7QUFDckUseURBQWtFO0FBQ2xFLHdDQUE2QztBQUU3QyxnRUFBOEQ7QUFDOUQsbUZBQWlGO0FBQ2pGLGlGQUErRTtBQUMvRSwyRUFBeUU7QUFFekUsMkRBQXdEO0FBQ3hELGtGQUErRTtBQUMvRSxvR0FBaUc7QUFDakcsd0ZBQXFGO0FBQ3JGLG9HQUFpRztBQUVqRyxpREFBK0M7QUFDM0MsMkRBQXlEO0FBQ3JELGlFQUErRDtBQUMzRCwwRUFBd0U7QUFDNUUsOERBQTREO0FBQ3hELHFGQUFtRjtBQUNuRixxRkFBbUY7QUFDbkYscUZBQW1GO0FBQ25GLGlHQUErRjtBQUMvRixrRkFBK0U7QUFDL0UsMkZBQXlGO0FBQ3pGLDJGQUF5RjtBQUNyRixzRkFBb0Y7QUFDeEYsMkZBQXlGO0FBQ3pGLGtGQUFnRjtBQUNwRix5RkFBc0Y7QUFDdEYsNkVBQTJFO0FBQzNFLHVFQUFxRTtBQUU3RSxnR0FBNkY7QUFDN0YsbUdBQWdHO0FBQ2hHLG1HQUFnRztBQUNoRyxtR0FBZ0c7QUFDaEcsbUdBQWdHO0FBR2hHLG1FQUFpRTtBQUNqRSx3RkFBc0Y7QUFDdEYsK0VBQTZFO0FBRzdFLG1DQUFxQztBQUlyQyxJQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUU7SUFDZixXQUFXLENBQUMsYUFBYSxDQUFDLHlDQUF5QyxDQUFDLENBQUM7Q0FDeEU7QUE0REQ7SUFBQTtJQUVBLENBQUM7SUFGWSxTQUFTO1FBMURyQixlQUFRLENBQUM7WUFDTixTQUFTLEVBQUU7Z0JBQ1AsNEJBQVk7YUFDZjtZQUNELE9BQU8sRUFBRTtnQkFDTCxpQ0FBd0I7Z0JBQ3hCLHdDQUFrQjtnQkFDbEIsd0NBQThCO2dCQUM5QixzQ0FBNEI7Z0JBQzVCLGtEQUF3QztnQkFDeEMsK0JBQXVCO2dCQUN2QiwyQkFBaUI7Z0JBQ2pCLHFDQUFnQjtnQkFDaEIsbUJBQVc7YUFDZDtZQUNELFlBQVksRUFBRTtnQkFDViw0QkFBWTtnQkFDWix5Q0FBa0I7Z0JBQ2xCLHFEQUF3QjtnQkFDeEIsNkNBQW9CO2dCQUNwQixxREFBd0I7Z0JBQ3hCLGdDQUFjO2dCQUNkLGdDQUFjO2dCQUNkLHNDQUFpQjtnQkFDakIsOEJBQWE7Z0JBQ2IsMENBQW1CO2dCQUNuQixrREFBdUI7Z0JBQ3ZCLDBDQUFtQjtnQkFDbkIsdUNBQWlCO2dCQUNqQiw4Q0FBcUI7Z0JBQ3JCLDhDQUFxQjtnQkFDckIsa0NBQWU7Z0JBQ2YsOENBQXFCO2dCQUNyQix3Q0FBa0I7Z0JBQ2xCLDBDQUFtQjtnQkFDbkIsK0NBQXFCO2dCQUNyQixvQ0FBZ0I7Z0JBQ2hCLHdDQUFrQjtnQkFFbEIsK0NBQXFCO2dCQUNyQiw2Q0FBb0I7Z0JBQ3BCLCtDQUFxQjtnQkFDckIsK0NBQXFCO2dCQUNyQiwrQ0FBcUI7Z0JBQ3JCLGdDQUFjO2dCQUNkLGdEQUFzQjtnQkFDdEIsMENBQW1CO2FBQ3RCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLGtDQUFlO2dCQUNmLHNDQUFpQjtnQkFDakIsc0NBQWlCO2dCQUNqQiw4QkFBYTthQUNoQjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csU0FBUyxDQUVyQjtJQUFELGdCQUFDO0NBQUEsQUFGRCxJQUVDO0FBRlksOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uXCI7XHJcbmltcG9ydCB7IE5nTW9kdWxlLCBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXIvYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1saXN0dmlldy9hbmd1bGFyXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJQXV0b0NvbXBsZXRlVGV4dFZpZXdNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWF1dG9jb21wbGV0ZS9hbmd1bGFyXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IFROU0NoZWNrQm94TW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWNoZWNrYm94L2FuZ3VsYXInO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQW5pbWF0aW9uc1NlcnZpY2UgfSBmcm9tIFwiLi9wYWdlcy9ob21lL3NlYXJjaHJlc3VsdC9hbmltYXRpb25zLXNlcnZpY2VcIjtcclxuaW1wb3J0IHsgVXBsb2FkcG9zdFNlcnZpY2UgfSBmcm9tIFwiLi9wYWdlcy9ob21lL3VwbG9hZHBvc3QvdXBsb2FkcG9zdC1zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNlYXJjaFNlcnZpY2UgfSBmcm9tIFwiLi9wYWdlcy9ob21lL3NlYXJjaG9wdGlvbi9zZWFyY2gtc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC1yb3V0aW5nLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBHb29nbGVNYXBDb21wb25lbnQgfSBmcm9tIFwiLi9tb2R1bGVzL2dvb2dsZS1tYXAvZ29vZ2xlLW1hcC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgR29vZ2xlQW5hbHl0aWNzQ29tcG9uZW50IH0gZnJvbSBcIi4vbW9kdWxlcy9nb29nbGUtYW5hbHl0aWNzL2dvb2dsZS1hbmFseXRpY3MuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEdvb2dsZUFkbW9iQ29tcG9uZW50IH0gZnJvbSBcIi4vbW9kdWxlcy9nb29nbGUtYWRtb2IvZ29vZ2xlLWFkbW9iLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNYWNoaW5lTGVhcm5pbmdDb21wb25lbnQgfSBmcm9tIFwiLi9tb2R1bGVzL21hY2hpbmUtbGVhcm5pbmcvbWFjaGluZS1sZWFybmluZy5jb21wb25lbnRcIjtcclxuXHJcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcclxuICAgIGltcG9ydCB7IFBhZ2VzQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvcGFnZXMuY29tcG9uZW50XCI7XHJcbiAgICAgICAgaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9sb2dpbi9sb2dpbi5jb21wb25lbnRcIjtcclxuICAgICAgICAgICAgaW1wb3J0IHsgUmVnaXN0ZXJDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9yZWdpc3Rlci9yZWdpc3Rlci5jb21wb25lbnRcIjtcclxuICAgICAgICBpbXBvcnQgeyBIb21lQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvaG9tZS9ob21lLmNvbXBvbmVudFwiO1xyXG4gICAgICAgICAgICBpbXBvcnQgeyBVcGxvYWRwb3N0Q29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvaG9tZS91cGxvYWRwb3N0L3VwbG9hZHBvc3QuY29tcG9uZW50XCI7XHJcbiAgICAgICAgICAgIGltcG9ydCB7IEZyaWVuZGxpc3RDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9ob21lL2ZyaWVuZGxpc3QvZnJpZW5kbGlzdC5jb21wb25lbnRcIjtcclxuICAgICAgICAgICAgaW1wb3J0IHsgRnJpZW5kY2hhdENvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL2hvbWUvZnJpZW5kY2hhdC9mcmllbmRjaGF0LmNvbXBvbmVudFwiO1xyXG4gICAgICAgICAgICBpbXBvcnQgeyBGcmllbmRtYXRjaGluZ0NvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL2hvbWUvZnJpZW5kbWF0Y2hpbmcvZnJpZW5kbWF0Y2hpbmcuY29tcG9uZW50XCI7XHJcbiAgICAgICAgICAgIGltcG9ydCB7IENoYXRSb29tQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvaG9tZS9jaGF0LXJvb20vY2hhdC1yb29tLmNvbXBvbmVudFwiO1xyXG4gICAgICAgICAgICBpbXBvcnQgeyBJZGVhbWF0Y2hpbmdDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9ob21lL2lkZWFtYXRjaGluZy9pZGVhbWF0Y2hpbmcuY29tcG9uZW50XCI7XHJcbiAgICAgICAgICAgIGltcG9ydCB7IFNlYXJjaFJlc3VsdENvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL2hvbWUvc2VhcmNocmVzdWx0L3NlYXJjaHJlc3VsdC5jb21wb25lbnRcIjtcclxuICAgICAgICAgICAgICAgIGltcG9ydCB7IERldGFpbENvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL2hvbWUvc2VhcmNocmVzdWx0L2RldGFpbC9kZXRhaWwuY29tcG9uZW50XCI7IFxyXG4gICAgICAgICAgICBpbXBvcnQgeyBTZWFyY2hPcHRpb25Db21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9ob21lL3NlYXJjaG9wdGlvbi9zZWFyY2hvcHRpb24uY29tcG9uZW50XCI7XHJcbiAgICAgICAgICAgIGltcG9ydCB7IEZyaWVuZGFkZENvbXBvbmVudCB9IGZyb20gXCIuL3BhZ2VzL2hvbWUvZnJpZW5kYWRkL2ZyaWVuZGFkZC5jb21wb25lbnRcIjtcclxuICAgICAgICBpbXBvcnQgeyBQcm9maWxlSW5wdXRDb21wb25lbnQgfSBmcm9tIFwiLi9wYWdlcy9wcm9maWxlLWlucHV0L3Byb2ZpbGUtaW5wdXQuY29tcG9uZW50XCI7XHJcbiAgICAgICAgaW1wb3J0IHsgRW5uZWFncmFtQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvZW5uZWFncmFtL2VubmVhZ3JhbS5jb21wb25lbnRcIjtcclxuICAgICAgICBpbXBvcnQgeyBTZXR0aW5nQ29tcG9uZW50IH0gZnJvbSBcIi4vcGFnZXMvc2V0dGluZy9zZXR0aW5nLmNvbXBvbmVudFwiO1xyXG5cclxuaW1wb3J0IHsgRmxvYXRCdXR0b25Db21wb25lbnQgfSBmcm9tIFwiLi9tb2R1bGVzL2J1dHRvbnMvZmxvYXQtYnV0dG9uL2Zsb2F0LWJ1dHRvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ2hpbGRCdXR0b24xQ29tcG9uZW50IH0gZnJvbSBcIi4vbW9kdWxlcy9idXR0b25zL2NoaWxkLWJ1dHRvbjEvY2hpbGQtYnV0dG9uMS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ2hpbGRCdXR0b24yQ29tcG9uZW50IH0gZnJvbSBcIi4vbW9kdWxlcy9idXR0b25zL2NoaWxkLWJ1dHRvbjIvY2hpbGQtYnV0dG9uMi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ2hpbGRCdXR0b24zQ29tcG9uZW50IH0gZnJvbSBcIi4vbW9kdWxlcy9idXR0b25zL2NoaWxkLWJ1dHRvbjMvY2hpbGQtYnV0dG9uMy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQWN0aW9uQnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4vbW9kdWxlcy9idXR0b25zL2FjdGlvbi1idXR0b24vYWN0aW9uLWJ1dHRvbi5jb21wb25lbnRcIjtcclxuXHJcblxyXG5pbXBvcnQgeyBNb2RhbENvbXBvbmVudCB9IGZyb20gXCIuL21vZHVsZXMvbW9kYWwvbW9kYWwuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEZhY2VkZXRlY3Rpb25Db21wb25lbnQgfSBmcm9tIFwiLi90ZXN0L2ZhY2VkZXRlY3Rpb24vZmFjZWRldGVjdGlvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgSW52aXRhdGlvbkNvbXBvbmVudCB9IGZyb20gXCIuL3Rlc3QvaW52aXRhdGlvbi9pbnZpdGF0aW9uLmNvbXBvbmVudFwiO1xyXG5cclxuXHJcbmltcG9ydCAqIGFzIHBsYXRmb3JtIGZyb20gXCJwbGF0Zm9ybVwiO1xyXG5cclxuZGVjbGFyZSB2YXIgR01TU2VydmljZXM6IGFueTtcclxuXHJcbmlmKHBsYXRmb3JtLmlzSU9TKSB7XHJcbiAgICBHTVNTZXJ2aWNlcy5wcm92aWRlQVBJS2V5KFwiQUl6YVN5QXRSVnZHM0JlM3hYaVpGUjd4cC1LLTloeTRuWjRoTUZzXCIpO1xyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgYm9vdHN0cmFwOiBbXHJcbiAgICAgICAgQXBwQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlBdXRvQ29tcGxldGVUZXh0Vmlld01vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcclxuICAgICAgICBUTlNDaGVja0JveE1vZHVsZSxcclxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlLFxyXG4gICAgICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEFwcENvbXBvbmVudCxcclxuICAgICAgICBHb29nbGVNYXBDb21wb25lbnQsXHJcbiAgICAgICAgR29vZ2xlQW5hbHl0aWNzQ29tcG9uZW50LFxyXG4gICAgICAgIEdvb2dsZUFkbW9iQ29tcG9uZW50LFxyXG4gICAgICAgIE1hY2hpbmVMZWFybmluZ0NvbXBvbmVudCxcclxuICAgICAgICBQYWdlc0NvbXBvbmVudCxcclxuICAgICAgICBMb2dpbkNvbXBvbmVudCxcclxuICAgICAgICBSZWdpc3RlckNvbXBvbmVudCxcclxuICAgICAgICBIb21lQ29tcG9uZW50LFxyXG4gICAgICAgIEZyaWVuZGxpc3RDb21wb25lbnQsXHJcbiAgICAgICAgRnJpZW5kbWF0Y2hpbmdDb21wb25lbnQsXHJcbiAgICAgICAgRnJpZW5kY2hhdENvbXBvbmVudCxcclxuICAgICAgICBDaGF0Um9vbUNvbXBvbmVudCxcclxuICAgICAgICBJZGVhbWF0Y2hpbmdDb21wb25lbnQsXHJcbiAgICAgICAgU2VhcmNoUmVzdWx0Q29tcG9uZW50LFxyXG4gICAgICAgIERldGFpbENvbXBvbmVudCxcclxuICAgICAgICBTZWFyY2hPcHRpb25Db21wb25lbnQsXHJcbiAgICAgICAgRW5uZWFncmFtQ29tcG9uZW50LFxyXG4gICAgICAgIFVwbG9hZHBvc3RDb21wb25lbnQsXHJcbiAgICAgICAgUHJvZmlsZUlucHV0Q29tcG9uZW50LFxyXG4gICAgICAgIFNldHRpbmdDb21wb25lbnQsXHJcbiAgICAgICAgRnJpZW5kYWRkQ29tcG9uZW50LFxyXG5cclxuICAgICAgICBBY3Rpb25CdXR0b25Db21wb25lbnQsXHJcbiAgICAgICAgRmxvYXRCdXR0b25Db21wb25lbnQsXHJcbiAgICAgICAgQ2hpbGRCdXR0b24xQ29tcG9uZW50LFxyXG4gICAgICAgIENoaWxkQnV0dG9uMkNvbXBvbmVudCxcclxuICAgICAgICBDaGlsZEJ1dHRvbjNDb21wb25lbnQsXHJcbiAgICAgICAgTW9kYWxDb21wb25lbnQsXHJcbiAgICAgICAgRmFjZWRldGVjdGlvbkNvbXBvbmVudCxcclxuICAgICAgICBJbnZpdGF0aW9uQ29tcG9uZW50LFxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIEZpcmViYXNlU2VydmljZSxcclxuICAgICAgICBBbmltYXRpb25zU2VydmljZSxcclxuICAgICAgICBVcGxvYWRwb3N0U2VydmljZSxcclxuICAgICAgICBTZWFyY2hTZXJ2aWNlLFxyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtcclxuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyBcclxuXHJcbn1cclxuIl19