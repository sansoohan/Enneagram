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
var friend_list_service_1 = require("./home/friendchat/friend-list.service");
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
                searchoption_component_1.SearchOptionComponent,
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
                friend_list_service_1.FriendListService,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzREFBdUU7QUFDdkUsc0NBQWtGO0FBQ2xGLGdGQUE4RTtBQUM5RSw4REFBb0Y7QUFDcEYsNERBQWdGO0FBQ2hGLGdFQUFnRztBQUNoRyxvREFBcUU7QUFDckUseURBQWtFO0FBQ2xFLHdDQUE2QztBQUU3QyxnRUFBOEQ7QUFDOUQsNkVBQTJFO0FBQzNFLDZFQUEwRTtBQUMxRSx5REFBdUQ7QUFDdkQscUVBQW1FO0FBRW5FLDJEQUF3RDtBQUN4RCxpREFBK0M7QUFFL0MsMkRBQXlEO0FBQ3pELG9FQUFrRTtBQUNsRSx3REFBc0Q7QUFDbEQsK0VBQTZFO0FBQzdFLDJGQUF5RjtBQUNyRixpR0FBOEY7QUFDOUYsb0dBQWtHO0FBQ3RHLHVGQUFvRjtBQUNwRixxRkFBbUY7QUFDbkYscUZBQW1GO0FBQy9FLG1GQUFpRjtBQUNyRixxRkFBbUY7QUFFdkYsNEVBQTBFO0FBQzFFLDZEQUEyRDtBQUMzRCxzRUFBb0U7QUFDcEUsc0VBQW9FO0FBS3BFLHdGQUFxRjtBQUNyRiwyRkFBd0Y7QUFDeEYsMkZBQXdGO0FBQ3hGLDJGQUF3RjtBQUN4RiwrRUFBNkU7QUFDN0UscUdBQWtHO0FBQ2xHLDJEQUF5RDtBQUV6RCxtQ0FBcUM7QUFHckMsRUFBRSxDQUFBLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDaEIsV0FBVyxDQUFDLGFBQWEsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO0FBQ3pFLENBQUM7QUF1REQ7SUFBQTtJQUF5QixDQUFDO0lBQWIsU0FBUztRQXJEckIsZUFBUSxDQUFDO1lBQ04sU0FBUyxFQUFFO2dCQUNQLDRCQUFZO2FBQ2Y7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsaUNBQXdCO2dCQUN4Qix3Q0FBa0I7Z0JBQ2xCLHdDQUE4QjtnQkFDOUIsc0NBQTRCO2dCQUM1QixrREFBd0M7Z0JBQ3hDLCtCQUF1QjtnQkFDdkIsMkJBQWlCO2dCQUNqQixxQ0FBZ0I7Z0JBQ2hCLG1CQUFXO2FBQ2Q7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsNEJBQVk7Z0JBQ1osZ0NBQWM7Z0JBQ2Qsc0NBQWlCO2dCQUNqQiw4QkFBYTtnQkFDYiwwQ0FBbUI7Z0JBQ25CLGtEQUF1QjtnQkFDdkIsMkNBQW1CO2dCQUNuQiw4Q0FBcUI7Z0JBQ3JCLDBDQUFtQjtnQkFDbkIsdUNBQWlCO2dCQUNqQiw4Q0FBcUI7Z0JBQ3JCLDhDQUFxQjtnQkFDckIsb0NBQWdCO2dCQUNoQiw4Q0FBcUI7Z0JBQ3JCLHdDQUFrQjtnQkFDbEIsOEJBQWE7Z0JBQ2Isb0NBQWdCO2dCQUNoQixvQ0FBZ0I7Z0JBRWhCLCtDQUFxQjtnQkFDckIsNkNBQW9CO2dCQUNwQiwrQ0FBcUI7Z0JBQ3JCLCtDQUFxQjtnQkFDckIsK0NBQXFCO2dCQUNyQixnQ0FBYzthQUNqQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxrQ0FBZTtnQkFDZixzQ0FBaUI7Z0JBQ2pCLHVDQUFpQjtnQkFDakIsMEJBQVc7Z0JBQ1gsOEJBQWE7YUFDaEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsdUJBQWdCO2FBQ25CO1NBQ0osQ0FBQztPQUNXLFNBQVMsQ0FBSTtJQUFELGdCQUFDO0NBQUEsQUFBMUIsSUFBMEI7QUFBYiw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IE5nTW9kdWxlLCBOZ01vZHVsZUZhY3RvcnlMb2FkZXIsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL25hdGl2ZXNjcmlwdC5tb2R1bGVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1saXN0dmlldy9hbmd1bGFyXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUF1dG9Db21wbGV0ZVRleHRWaWV3TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1hdXRvY29tcGxldGUvYW5ndWxhclwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IFROU0NoZWNrQm94TW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWNoZWNrYm94L2FuZ3VsYXInO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2VcIjtcbmltcG9ydCB7IEFuaW1hdGlvbnNTZXJ2aWNlIH0gZnJvbSBcIi4vaG9tZS9zZWFyY2hyZXN1bHQvYW5pbWF0aW9ucy1zZXJ2aWNlXCI7XG5pbXBvcnQgeyBGcmllbmRMaXN0U2VydmljZSB9IGZyb20gXCIuL2hvbWUvZnJpZW5kY2hhdC9mcmllbmQtbGlzdC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBCbG9nU2VydmljZSB9IGZyb20gXCIuL2hvbWUvYmxvZy9ibG9nLXNlcnZpY2VcIjtcbmltcG9ydCB7IFNlYXJjaFNlcnZpY2UgfSBmcm9tIFwiLi9ob21lL3NlYXJjaG9wdGlvbi9zZWFyY2gtc2VydmljZVwiO1xuXG5pbXBvcnQgeyBBcHBSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vYXBwLXJvdXRpbmcubW9kdWxlXCI7XG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5cbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSBcIi4vbG9naW4vbG9naW4uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBSZWdpc3RlckNvbXBvbmVudCB9IGZyb20gXCIuL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgSG9tZUNvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvaG9tZS5jb21wb25lbnRcIjtcbiAgICBpbXBvcnQgeyBGcmllbmRsaXN0Q29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9mcmllbmRsaXN0L2ZyaWVuZGxpc3QuY29tcG9uZW50XCI7XG4gICAgaW1wb3J0IHsgRnJpZW5kbWF0Y2hpbmdDb21wb25lbnQgfSBmcm9tIFwiLi9ob21lL2ZyaWVuZG1hdGNoaW5nL2ZyaWVuZG1hdGNoaW5nLmNvbXBvbmVudFwiO1xuICAgICAgICBpbXBvcnQgeyBNYXBFeGFtcGxlQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9mcmllbmRtYXRjaGluZy9tYXAtZXhhbXBsZS9tYXAtZXhhbXBsZS5jb21wb25lbnRcIjtcbiAgICAgICAgaW1wb3J0IHsgRm9vZE1hdGNoaW5nQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9mcmllbmRtYXRjaGluZy9mb29kbWF0Y2hpbmcvZm9vZG1hdGNoaW5nLmNvbXBvbmVudFwiO1xuICAgIGltcG9ydCB7IENoYXRSb29tQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9mcmllbmRjaGF0L2NoYXQtcm9vbS9jaGF0LXJvb20uY29tcG9uZW50XCI7XG4gICAgaW1wb3J0IHsgSWRlYW1hdGNoaW5nQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9pZGVhbWF0Y2hpbmcvaWRlYW1hdGNoaW5nLmNvbXBvbmVudFwiO1xuICAgIGltcG9ydCB7IFNlYXJjaFJlc3VsdENvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvc2VhcmNocmVzdWx0L3NlYXJjaHJlc3VsdC5jb21wb25lbnRcIjtcbiAgICAgICAgaW1wb3J0IHsgRGV0YWlsc0NvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvc2VhcmNocmVzdWx0L2RldGFpbHMvZGV0YWlscy5jb21wb25lbnRcIjsgXG4gICAgaW1wb3J0IHsgU2VhcmNoT3B0aW9uQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9zZWFyY2hvcHRpb24vc2VhcmNob3B0aW9uLmNvbXBvbmVudFwiO1xuXG5pbXBvcnQgeyBFbm5lYWdyYW1Db21wb25lbnQgfSBmcm9tIFwiLi9ob21lL2VubmVhZ3JhbS9lbm5lYWdyYW0uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBCbG9nQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9ibG9nL2Jsb2cuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBQcm9maWxlQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9wcm9maWxlL3Byb2ZpbGUuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBTZXR0aW5nQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9zZXR0aW5nL3NldHRpbmcuY29tcG9uZW50XCI7XG5cblxuXG5cbmltcG9ydCB7IEZsb2F0QnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4vYnV0dG9ucy9mbG9hdC1idXR0b24vZmxvYXQtYnV0dG9uLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQ2hpbGRCdXR0b24xQ29tcG9uZW50IH0gZnJvbSBcIi4vYnV0dG9ucy9jaGlsZC1idXR0b24xL2NoaWxkLWJ1dHRvbjEuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjJDb21wb25lbnQgfSBmcm9tIFwiLi9idXR0b25zL2NoaWxkLWJ1dHRvbjIvY2hpbGQtYnV0dG9uMi5jb21wb25lbnRcIjtcbmltcG9ydCB7IENoaWxkQnV0dG9uM0NvbXBvbmVudCB9IGZyb20gXCIuL2J1dHRvbnMvY2hpbGQtYnV0dG9uMy9jaGlsZC1idXR0b24zLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgRnJpZW5kY2hhdENvbXBvbmVudCB9IGZyb20gXCIuL2hvbWUvZnJpZW5kY2hhdC9mcmllbmRjaGF0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQWN0aW9uQnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9zZWFyY2hyZXN1bHQvYWN0aW9uLWJ1dHRvbi9hY3Rpb24tYnV0dG9uLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTW9kYWxDb21wb25lbnQgfSBmcm9tIFwiLi9tb2RhbC9tb2RhbC5jb21wb25lbnRcIjtcblxuaW1wb3J0ICogYXMgcGxhdGZvcm0gZnJvbSBcInBsYXRmb3JtXCI7XG5kZWNsYXJlIHZhciBHTVNTZXJ2aWNlczogYW55O1xuXG5pZihwbGF0Zm9ybS5pc0lPUykge1xuICAgIEdNU1NlcnZpY2VzLnByb3ZpZGVBUElLZXkoXCJBSXphU3lBdFJWdkczQmUzeFhpWkZSN3hwLUstOWh5NG5aNGhNRnNcIik7XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgYm9vdHN0cmFwOiBbXG4gICAgICAgIEFwcENvbXBvbmVudFxuICAgIF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRVSUF1dG9Db21wbGV0ZVRleHRWaWV3TW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICAgICAgVE5TQ2hlY2tCb3hNb2R1bGUsXG4gICAgICAgIEFwcFJvdXRpbmdNb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEFwcENvbXBvbmVudCxcbiAgICAgICAgTG9naW5Db21wb25lbnQsXG4gICAgICAgIFJlZ2lzdGVyQ29tcG9uZW50LFxuICAgICAgICBIb21lQ29tcG9uZW50LFxuICAgICAgICBGcmllbmRsaXN0Q29tcG9uZW50LFxuICAgICAgICBGcmllbmRtYXRjaGluZ0NvbXBvbmVudCxcbiAgICAgICAgTWFwRXhhbXBsZUNvbXBvbmVudCxcbiAgICAgICAgRm9vZE1hdGNoaW5nQ29tcG9uZW50LFxuICAgICAgICBGcmllbmRjaGF0Q29tcG9uZW50LFxuICAgICAgICBDaGF0Um9vbUNvbXBvbmVudCxcbiAgICAgICAgSWRlYW1hdGNoaW5nQ29tcG9uZW50LFxuICAgICAgICBTZWFyY2hSZXN1bHRDb21wb25lbnQsXG4gICAgICAgIERldGFpbHNDb21wb25lbnQsXG4gICAgICAgIFNlYXJjaE9wdGlvbkNvbXBvbmVudCxcbiAgICAgICAgRW5uZWFncmFtQ29tcG9uZW50LFxuICAgICAgICBCbG9nQ29tcG9uZW50LFxuICAgICAgICBQcm9maWxlQ29tcG9uZW50LFxuICAgICAgICBTZXR0aW5nQ29tcG9uZW50LFxuXG4gICAgICAgIEFjdGlvbkJ1dHRvbkNvbXBvbmVudCxcbiAgICAgICAgRmxvYXRCdXR0b25Db21wb25lbnQsXG4gICAgICAgIENoaWxkQnV0dG9uMUNvbXBvbmVudCxcbiAgICAgICAgQ2hpbGRCdXR0b24yQ29tcG9uZW50LFxuICAgICAgICBDaGlsZEJ1dHRvbjNDb21wb25lbnQsXG4gICAgICAgIE1vZGFsQ29tcG9uZW50LFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEZpcmViYXNlU2VydmljZSxcbiAgICAgICAgQW5pbWF0aW9uc1NlcnZpY2UsXG4gICAgICAgIEZyaWVuZExpc3RTZXJ2aWNlLFxuICAgICAgICBCbG9nU2VydmljZSxcbiAgICAgICAgU2VhcmNoU2VydmljZSxcbiAgICBdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxuIl19