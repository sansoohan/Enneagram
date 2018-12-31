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
var facedetection_component_1 = require("./facedetection/facedetection.component");
var admob_component_1 = require("./admob/admob.component");
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
                facedetection_component_1.FacedetectionComponent,
                admob_component_1.AdmobComponent,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzREFBdUU7QUFDdkUsc0NBQWtGO0FBQ2xGLGdGQUE4RTtBQUM5RSw4REFBb0Y7QUFDcEYsNERBQWdGO0FBQ2hGLGdFQUFnRztBQUNoRyxvREFBcUU7QUFDckUseURBQWtFO0FBQ2xFLHdDQUE2QztBQUU3QyxnRUFBOEQ7QUFDOUQsNkVBQTJFO0FBQzNFLHlEQUF1RDtBQUN2RCxxRUFBbUU7QUFFbkUsMkRBQXdEO0FBQ3hELGlEQUErQztBQUUvQywyREFBeUQ7QUFDekQsb0VBQWtFO0FBQ2xFLHdEQUFzRDtBQUNsRCwrRUFBNkU7QUFDN0UsMkZBQXlGO0FBQ3JGLGlHQUE4RjtBQUM5RixvR0FBa0c7QUFDdEcsdUZBQW9GO0FBQ3BGLHFGQUFtRjtBQUNuRixxRkFBbUY7QUFDL0UsbUZBQWlGO0FBQ3JGLHFGQUFtRjtBQUV2Riw0RUFBMEU7QUFDMUUsNkRBQTJEO0FBQzNELHdGQUFxRjtBQUNyRixzRUFBb0U7QUFDcEUsNEVBQTBFO0FBRTFFLHdGQUFxRjtBQUNyRiwyRkFBd0Y7QUFDeEYsMkZBQXdGO0FBQ3hGLDJGQUF3RjtBQUN4RiwrRUFBNkU7QUFDN0UscUdBQWtHO0FBQ2xHLDJEQUF5RDtBQUN6RCxtRkFBaUY7QUFDakYsMkRBQXlEO0FBRXpELG1DQUFxQztBQUlyQyxFQUFFLENBQUEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNoQixXQUFXLENBQUMsYUFBYSxDQUFDLHlDQUF5QyxDQUFDLENBQUM7QUFDekUsQ0FBQztBQXlERDtJQUFBO0lBRUEsQ0FBQztJQUZZLFNBQVM7UUF2RHJCLGVBQVEsQ0FBQztZQUNOLFNBQVMsRUFBRTtnQkFDUCw0QkFBWTthQUNmO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLGlDQUF3QjtnQkFDeEIsd0NBQWtCO2dCQUNsQix3Q0FBOEI7Z0JBQzlCLHNDQUE0QjtnQkFDNUIsa0RBQXdDO2dCQUN4QywrQkFBdUI7Z0JBQ3ZCLDJCQUFpQjtnQkFDakIscUNBQWdCO2dCQUNoQixtQkFBVzthQUNkO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLDRCQUFZO2dCQUNaLGdDQUFjO2dCQUNkLHNDQUFpQjtnQkFDakIsOEJBQWE7Z0JBQ2IsMENBQW1CO2dCQUNuQixrREFBdUI7Z0JBQ3ZCLDJDQUFtQjtnQkFDbkIsOENBQXFCO2dCQUNyQiwwQ0FBbUI7Z0JBQ25CLHVDQUFpQjtnQkFDakIsOENBQXFCO2dCQUNyQiw4Q0FBcUI7Z0JBQ3JCLG9DQUFnQjtnQkFDaEIsOENBQXFCO2dCQUNyQix3Q0FBa0I7Z0JBQ2xCLDhCQUFhO2dCQUNiLCtDQUFxQjtnQkFDckIsb0NBQWdCO2dCQUNoQix3Q0FBa0I7Z0JBRWxCLCtDQUFxQjtnQkFDckIsNkNBQW9CO2dCQUNwQiwrQ0FBcUI7Z0JBQ3JCLCtDQUFxQjtnQkFDckIsK0NBQXFCO2dCQUNyQixnQ0FBYztnQkFDZCxnREFBc0I7Z0JBQ3RCLGdDQUFjO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLGtDQUFlO2dCQUNmLHNDQUFpQjtnQkFDakIsMEJBQVc7Z0JBQ1gsOEJBQWE7YUFDaEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztPQUNXLFNBQVMsQ0FFckI7SUFBRCxnQkFBQztDQUFBLEFBRkQsSUFFQztBQUZZLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSwgTmdNb2R1bGVGYWN0b3J5TG9hZGVyLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktbGlzdHZpZXcvYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUF1dG9Db21wbGV0ZVRleHRWaWV3TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1hdXRvY29tcGxldGUvYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBUTlNDaGVja0JveE1vZHVsZSB9IGZyb20gJ25hdGl2ZXNjcmlwdC1jaGVja2JveC9hbmd1bGFyJztcclxuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbnNTZXJ2aWNlIH0gZnJvbSBcIi4vaG9tZS9zZWFyY2hyZXN1bHQvYW5pbWF0aW9ucy1zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEJsb2dTZXJ2aWNlIH0gZnJvbSBcIi4vaG9tZS9ibG9nL2Jsb2ctc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTZWFyY2hTZXJ2aWNlIH0gZnJvbSBcIi4vaG9tZS9zZWFyY2hvcHRpb24vc2VhcmNoLXNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7IEFwcFJvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9hcHAtcm91dGluZy5tb2R1bGVcIjtcclxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xyXG5cclxuaW1wb3J0IHsgTG9naW5Db21wb25lbnQgfSBmcm9tIFwiLi9sb2dpbi9sb2dpbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUmVnaXN0ZXJDb21wb25lbnQgfSBmcm9tIFwiLi9yZWdpc3Rlci9yZWdpc3Rlci5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgSG9tZUNvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvaG9tZS5jb21wb25lbnRcIjtcclxuICAgIGltcG9ydCB7IEZyaWVuZGxpc3RDb21wb25lbnQgfSBmcm9tIFwiLi9ob21lL2ZyaWVuZGxpc3QvZnJpZW5kbGlzdC5jb21wb25lbnRcIjtcclxuICAgIGltcG9ydCB7IEZyaWVuZG1hdGNoaW5nQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9mcmllbmRtYXRjaGluZy9mcmllbmRtYXRjaGluZy5jb21wb25lbnRcIjtcclxuICAgICAgICBpbXBvcnQgeyBNYXBFeGFtcGxlQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9mcmllbmRtYXRjaGluZy9tYXAtZXhhbXBsZS9tYXAtZXhhbXBsZS5jb21wb25lbnRcIjtcclxuICAgICAgICBpbXBvcnQgeyBGb29kTWF0Y2hpbmdDb21wb25lbnQgfSBmcm9tIFwiLi9ob21lL2ZyaWVuZG1hdGNoaW5nL2Zvb2RtYXRjaGluZy9mb29kbWF0Y2hpbmcuY29tcG9uZW50XCI7XHJcbiAgICBpbXBvcnQgeyBDaGF0Um9vbUNvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvZnJpZW5kY2hhdC9jaGF0LXJvb20vY2hhdC1yb29tLmNvbXBvbmVudFwiO1xyXG4gICAgaW1wb3J0IHsgSWRlYW1hdGNoaW5nQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9pZGVhbWF0Y2hpbmcvaWRlYW1hdGNoaW5nLmNvbXBvbmVudFwiO1xyXG4gICAgaW1wb3J0IHsgU2VhcmNoUmVzdWx0Q29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9zZWFyY2hyZXN1bHQvc2VhcmNocmVzdWx0LmNvbXBvbmVudFwiO1xyXG4gICAgICAgIGltcG9ydCB7IERldGFpbHNDb21wb25lbnQgfSBmcm9tIFwiLi9ob21lL3NlYXJjaHJlc3VsdC9kZXRhaWxzL2RldGFpbHMuY29tcG9uZW50XCI7IFxyXG4gICAgaW1wb3J0IHsgU2VhcmNoT3B0aW9uQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9zZWFyY2hvcHRpb24vc2VhcmNob3B0aW9uLmNvbXBvbmVudFwiO1xyXG5cclxuaW1wb3J0IHsgRW5uZWFncmFtQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9lbm5lYWdyYW0vZW5uZWFncmFtLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBCbG9nQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9ibG9nL2Jsb2cuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IFByb2ZpbGVJbnB1dENvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvcHJvZmlsZS1pbnB1dC9wcm9maWxlLWlucHV0LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBTZXR0aW5nQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9zZXR0aW5nL3NldHRpbmcuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEZyaWVuZGFkZENvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvZnJpZW5kYWRkL2ZyaWVuZGFkZC5jb21wb25lbnRcIjtcclxuXHJcbmltcG9ydCB7IEZsb2F0QnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4vYnV0dG9ucy9mbG9hdC1idXR0b24vZmxvYXQtYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjFDb21wb25lbnQgfSBmcm9tIFwiLi9idXR0b25zL2NoaWxkLWJ1dHRvbjEvY2hpbGQtYnV0dG9uMS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ2hpbGRCdXR0b24yQ29tcG9uZW50IH0gZnJvbSBcIi4vYnV0dG9ucy9jaGlsZC1idXR0b24yL2NoaWxkLWJ1dHRvbjIuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IENoaWxkQnV0dG9uM0NvbXBvbmVudCB9IGZyb20gXCIuL2J1dHRvbnMvY2hpbGQtYnV0dG9uMy9jaGlsZC1idXR0b24zLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBGcmllbmRjaGF0Q29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9mcmllbmRjaGF0L2ZyaWVuZGNoYXQuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEFjdGlvbkJ1dHRvbkNvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvc2VhcmNocmVzdWx0L2FjdGlvbi1idXR0b24vYWN0aW9uLWJ1dHRvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTW9kYWxDb21wb25lbnQgfSBmcm9tIFwiLi9tb2RhbC9tb2RhbC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRmFjZWRldGVjdGlvbkNvbXBvbmVudCB9IGZyb20gXCIuL2ZhY2VkZXRlY3Rpb24vZmFjZWRldGVjdGlvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQWRtb2JDb21wb25lbnQgfSBmcm9tIFwiLi9hZG1vYi9hZG1vYi5jb21wb25lbnRcIjtcclxuXHJcbmltcG9ydCAqIGFzIHBsYXRmb3JtIGZyb20gXCJwbGF0Zm9ybVwiO1xyXG5cclxuZGVjbGFyZSB2YXIgR01TU2VydmljZXM6IGFueTtcclxuXHJcbmlmKHBsYXRmb3JtLmlzSU9TKSB7XHJcbiAgICBHTVNTZXJ2aWNlcy5wcm92aWRlQVBJS2V5KFwiQUl6YVN5QXRSVnZHM0JlM3hYaVpGUjd4cC1LLTloeTRuWjRoTUZzXCIpO1xyXG59XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgYm9vdHN0cmFwOiBbXHJcbiAgICAgICAgQXBwQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlBdXRvQ29tcGxldGVUZXh0Vmlld01vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcclxuICAgICAgICBUTlNDaGVja0JveE1vZHVsZSxcclxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlLFxyXG4gICAgICAgIEZvcm1zTW9kdWxlLFxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEFwcENvbXBvbmVudCxcclxuICAgICAgICBMb2dpbkNvbXBvbmVudCxcclxuICAgICAgICBSZWdpc3RlckNvbXBvbmVudCxcclxuICAgICAgICBIb21lQ29tcG9uZW50LFxyXG4gICAgICAgIEZyaWVuZGxpc3RDb21wb25lbnQsXHJcbiAgICAgICAgRnJpZW5kbWF0Y2hpbmdDb21wb25lbnQsXHJcbiAgICAgICAgTWFwRXhhbXBsZUNvbXBvbmVudCxcclxuICAgICAgICBGb29kTWF0Y2hpbmdDb21wb25lbnQsXHJcbiAgICAgICAgRnJpZW5kY2hhdENvbXBvbmVudCxcclxuICAgICAgICBDaGF0Um9vbUNvbXBvbmVudCxcclxuICAgICAgICBJZGVhbWF0Y2hpbmdDb21wb25lbnQsXHJcbiAgICAgICAgU2VhcmNoUmVzdWx0Q29tcG9uZW50LFxyXG4gICAgICAgIERldGFpbHNDb21wb25lbnQsXHJcbiAgICAgICAgU2VhcmNoT3B0aW9uQ29tcG9uZW50LFxyXG4gICAgICAgIEVubmVhZ3JhbUNvbXBvbmVudCxcclxuICAgICAgICBCbG9nQ29tcG9uZW50LFxyXG4gICAgICAgIFByb2ZpbGVJbnB1dENvbXBvbmVudCxcclxuICAgICAgICBTZXR0aW5nQ29tcG9uZW50LFxyXG4gICAgICAgIEZyaWVuZGFkZENvbXBvbmVudCxcclxuXHJcbiAgICAgICAgQWN0aW9uQnV0dG9uQ29tcG9uZW50LFxyXG4gICAgICAgIEZsb2F0QnV0dG9uQ29tcG9uZW50LFxyXG4gICAgICAgIENoaWxkQnV0dG9uMUNvbXBvbmVudCxcclxuICAgICAgICBDaGlsZEJ1dHRvbjJDb21wb25lbnQsXHJcbiAgICAgICAgQ2hpbGRCdXR0b24zQ29tcG9uZW50LFxyXG4gICAgICAgIE1vZGFsQ29tcG9uZW50LFxyXG4gICAgICAgIEZhY2VkZXRlY3Rpb25Db21wb25lbnQsXHJcbiAgICAgICAgQWRtb2JDb21wb25lbnQsXHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgRmlyZWJhc2VTZXJ2aWNlLFxyXG4gICAgICAgIEFuaW1hdGlvbnNTZXJ2aWNlLFxyXG4gICAgICAgIEJsb2dTZXJ2aWNlLFxyXG4gICAgICAgIFNlYXJjaFNlcnZpY2UsXHJcbiAgICBdLFxyXG4gICAgc2NoZW1hczogW1xyXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IFxyXG5cclxufVxyXG4iXX0=