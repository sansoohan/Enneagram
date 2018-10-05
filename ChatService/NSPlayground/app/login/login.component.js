"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var ApplicationSettings = require("application-settings");
var firebase_service_1 = require("../services/firebase.service");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, firebaseService) {
        this.router = router;
        this.firebaseService = firebaseService;
        this.isAuthenticating = false;
        this.user = {
            "email": "",
            "password": "",
            "confirmPassword": ""
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (ApplicationSettings.getBoolean("authenticated", false)) {
            this.router.navigate(["/home"], { clearHistory: true });
        }
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.firebaseService.login(this.user)
            .then(function () {
            _this.isAuthenticating = true;
            ApplicationSettings.setBoolean("authenticated", true);
            _this.router.navigate(["/home"], { clearHistory: true });
        })
            .catch(function (message) {
            _this.isAuthenticating = false;
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "rr-login",
            templateUrl: "login.component.html",
            styleUrls: ['./login.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions, firebase_service_1.FirebaseService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUErRDtBQUMvRCwwREFBNEQ7QUFDNUQsaUVBQTZEO0FBUTdEO0lBSUksd0JBQTJCLE1BQXdCLEVBQVUsZUFBZ0M7UUFBbEUsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFIN0YscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBSXJCLElBQUksQ0FBQyxJQUFJLEdBQUc7WUFDVixPQUFPLEVBQUMsRUFBRTtZQUNWLFVBQVUsRUFBQyxFQUFFO1lBQ2IsaUJBQWlCLEVBQUMsRUFBRTtTQUNyQixDQUFBO0lBQ0wsQ0FBQztJQUVNLGlDQUFRLEdBQWY7UUFDSSxFQUFFLENBQUEsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFDNUQsQ0FBQztJQUNMLENBQUM7SUFFTSw4QkFBSyxHQUFaO1FBQUEsaUJBV0Q7UUFWRSxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ25DLElBQUksQ0FBQztZQUNKLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7WUFDN0IsbUJBQW1CLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN0RCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFFLENBQUM7UUFFM0QsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUMsT0FBVztZQUNqQixLQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQTdCVSxjQUFjO1FBTjFCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsV0FBVyxFQUFFLHNCQUFzQjtZQUNuQyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztTQUN2QyxDQUFDO3lDQUtxQyx5QkFBZ0IsRUFBMkIsa0NBQWU7T0FKcEYsY0FBYyxDQStCMUI7SUFBRCxxQkFBQztDQUFBLEFBL0JELElBK0JDO0FBL0JZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQge0ZpcmViYXNlU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZSc7XHJcbmltcG9ydCB7VXNlcn0gZnJvbSAnLi4vbW9kZWxzL3VzZXIubW9kZWwnO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogXCJyci1sb2dpblwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwibG9naW4uY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogWycuL2xvZ2luLmNvbXBvbmVudC5jc3MnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGlzQXV0aGVudGljYXRpbmcgPSBmYWxzZTtcclxuICAgIHB1YmxpYyB1c2VyOiBVc2VyO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucywgcHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMudXNlciA9IHtcclxuICAgICAgICAgIFwiZW1haWxcIjpcIlwiLFxyXG4gICAgICAgICAgXCJwYXNzd29yZFwiOlwiXCIsXHJcbiAgICAgICAgICBcImNvbmZpcm1QYXNzd29yZFwiOlwiXCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGlmKEFwcGxpY2F0aW9uU2V0dGluZ3MuZ2V0Qm9vbGVhbihcImF1dGhlbnRpY2F0ZWRcIiwgZmFsc2UpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9ob21lXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvZ2luKCkge1xyXG4gICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmxvZ2luKHRoaXMudXNlcilcclxuICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuaXNBdXRoZW50aWNhdGluZyA9IHRydWU7XHJcbiAgICAgICAgQXBwbGljYXRpb25TZXR0aW5ncy5zZXRCb29sZWFuKFwiYXV0aGVudGljYXRlZFwiLCB0cnVlKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvaG9tZVwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSApO1xyXG5cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChtZXNzYWdlOmFueSkgPT4ge1xyXG4gICAgICAgIHRoaXMuaXNBdXRoZW50aWNhdGluZyA9IGZhbHNlO1xyXG4gICAgICB9KTtcclxuICB9XHJcblxyXG59XHJcbiJdfQ==