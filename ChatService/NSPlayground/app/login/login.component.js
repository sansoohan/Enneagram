"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var ApplicationSettings = require("application-settings");
var firebase_service_1 = require("../services/firebase.service");
var auth_model_1 = require("./auth.model");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, routerExtensions, firebaseService) {
        this.router = router;
        this.routerExtensions = routerExtensions;
        this.firebaseService = firebaseService;
        this.auth = new auth_model_1.Auth();
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (ApplicationSettings.getBoolean("authenticated", false)) {
            this.router.navigate(["/home"], { clearHistory: true });
            this.firebaseService.setCurrentUser();
        }
    };
    LoginComponent.prototype.login = function (auth) {
        this.firebaseService.login(auth);
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "rr-login",
            templateUrl: "login.component.html",
            styleUrls: ['./login.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            router_1.RouterExtensions,
            firebase_service_1.FirebaseService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUErRDtBQUMvRCwwREFBNEQ7QUFDNUQsaUVBQTZEO0FBRzdELDJDQUFrQztBQU9sQztJQUlJLHdCQUEyQixNQUF3QixFQUN2QyxnQkFBa0MsRUFDbEMsZUFBZ0M7UUFGakIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDdkMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFMckMsU0FBSSxHQUFRLElBQUksaUJBQUksRUFBRSxDQUFDO0lBTzlCLENBQUM7SUFFTSxpQ0FBUSxHQUFmO1FBQ0ksRUFBRSxDQUFBLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDMUMsQ0FBQztJQUNMLENBQUM7SUFFTSw4QkFBSyxHQUFaLFVBQWEsSUFBUztRQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBbkJRLGNBQWM7UUFOMUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsc0JBQXNCO1lBQ25DLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO1NBQ3ZDLENBQUM7eUNBS3FDLHlCQUFnQjtZQUNyQix5QkFBZ0I7WUFDakIsa0NBQWU7T0FObkMsY0FBYyxDQW9CMUI7SUFBRCxxQkFBQztDQUFBLEFBcEJELElBb0JDO0FBcEJZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQge0ZpcmViYXNlU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZSc7XHJcblxyXG5pbXBvcnQge1VzZXJ9IGZyb20gJy4uL21vZGVscy91c2VyLm1vZGVsJztcclxuaW1wb3J0IHtBdXRofSBmcm9tIFwiLi9hdXRoLm1vZGVsXCI7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHNlbGVjdG9yOiBcInJyLWxvZ2luXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJsb2dpbi5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbJy4vbG9naW4uY29tcG9uZW50LmNzcyddLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcHVibGljIGF1dGg6QXV0aCA9IG5ldyBBdXRoKCk7XHJcblxyXG4gICAgXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgICAgIHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UpIHtcclxuICAgICAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGlmKEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0Qm9vbGVhbihcImF1dGhlbnRpY2F0ZWRcIiwgZmFsc2UpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9ob21lXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcclxuICAgICAgICAgICAgdGhpcy5maXJlYmFzZVNlcnZpY2Uuc2V0Q3VycmVudFVzZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvZ2luKGF1dGg6QXV0aCkge1xyXG4gICAgICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmxvZ2luKGF1dGgpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==