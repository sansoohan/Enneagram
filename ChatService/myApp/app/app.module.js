"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var forms_1 = require("nativescript-angular/forms");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var firebase_service_1 = require("./services/firebase.service");
var login_component_1 = require("./components/login/login.component");
var register_component_1 = require("./components/register/register.component");
var home_component_1 = require("./components/home/home.component");
var friendlist_component_1 = require("./components/home/friendlist/friendlist.component");
var friendmatching_component_1 = require("./components/home/friendmatching/friendmatching.component");
var ideamatching_component_1 = require("./components/home/ideamatching/ideamatching.component");
var friendchat_component_1 = require("./components/home/friendchat/friendchat.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            imports: [
                nativescript_module_1.NativeScriptModule,
                forms_1.NativeScriptFormsModule,
                app_routing_1.AppRoutingModule
            ],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                register_component_1.RegisterComponent,
                home_component_1.HomeComponent,
                friendlist_component_1.FriendlistComponent,
                friendmatching_component_1.FriendmatchingComponent,
                ideamatching_component_1.IdeamatchingComponent,
                friendchat_component_1.FriendchatComponent,
            ],
            providers: [firebase_service_1.FirebaseService],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLG9EQUFxRTtBQUNyRSw2Q0FBaUQ7QUFDakQsaURBQStDO0FBQy9DLGdFQUE4RDtBQUM5RCxzRUFBb0U7QUFDcEUsK0VBQTZFO0FBQzdFLG1FQUFpRTtBQUNqRSwwRkFBd0Y7QUFDeEYsc0dBQW9HO0FBQ3BHLGdHQUE4RjtBQUM5RiwwRkFBd0Y7QUEyQnhGO0lBQUE7SUFBeUIsQ0FBQztJQUFiLFNBQVM7UUF4QnJCLGVBQVEsQ0FBQztZQUNOLFNBQVMsRUFBRTtnQkFDUCw0QkFBWTthQUNmO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHdDQUFrQjtnQkFDbEIsK0JBQXVCO2dCQUN2Qiw4QkFBZ0I7YUFDbkI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsNEJBQVk7Z0JBQ1osZ0NBQWM7Z0JBQ2Qsc0NBQWlCO2dCQUNqQiw4QkFBYTtnQkFDYiwwQ0FBbUI7Z0JBQ25CLGtEQUF1QjtnQkFDdkIsOENBQXFCO2dCQUNyQiwwQ0FBbUI7YUFDdEI7WUFDRCxTQUFTLEVBQUUsQ0FBQyxrQ0FBZSxDQUFDO1lBQzVCLE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csU0FBUyxDQUFJO0lBQUQsZ0JBQUM7Q0FBQSxBQUExQixJQUEwQjtBQUFiLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBBcHBSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vYXBwLnJvdXRpbmdcIjtcclxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IExvZ2luQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUmVnaXN0ZXJDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBIb21lQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9ob21lL2hvbWUuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEZyaWVuZGxpc3RDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2hvbWUvZnJpZW5kbGlzdC9mcmllbmRsaXN0LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBGcmllbmRtYXRjaGluZ0NvbXBvbmVudCB9IGZyb20gXCIuL2NvbXBvbmVudHMvaG9tZS9mcmllbmRtYXRjaGluZy9mcmllbmRtYXRjaGluZy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgSWRlYW1hdGNoaW5nQ29tcG9uZW50IH0gZnJvbSBcIi4vY29tcG9uZW50cy9ob21lL2lkZWFtYXRjaGluZy9pZGVhbWF0Y2hpbmcuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEZyaWVuZGNoYXRDb21wb25lbnQgfSBmcm9tIFwiLi9jb21wb25lbnRzL2hvbWUvZnJpZW5kY2hhdC9mcmllbmRjaGF0LmNvbXBvbmVudFwiO1xyXG5cclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBib290c3RyYXA6IFtcclxuICAgICAgICBBcHBDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIEFwcFJvdXRpbmdNb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBBcHBDb21wb25lbnQsXHJcbiAgICAgICAgTG9naW5Db21wb25lbnQsXHJcbiAgICAgICAgUmVnaXN0ZXJDb21wb25lbnQsXHJcbiAgICAgICAgSG9tZUNvbXBvbmVudCxcclxuICAgICAgICBGcmllbmRsaXN0Q29tcG9uZW50LFxyXG4gICAgICAgIEZyaWVuZG1hdGNoaW5nQ29tcG9uZW50LFxyXG4gICAgICAgIElkZWFtYXRjaGluZ0NvbXBvbmVudCxcclxuICAgICAgICBGcmllbmRjaGF0Q29tcG9uZW50LFxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW0ZpcmViYXNlU2VydmljZV0sXHJcbiAgICBzY2hlbWFzOiBbXHJcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwTW9kdWxlIHsgfVxyXG4iXX0=