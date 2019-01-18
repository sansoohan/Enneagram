"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ApplicationSettings = require("application-settings");
var firebase_service_1 = require("~/services/firebase.service");
var PagesComponent = /** @class */ (function () {
    function PagesComponent(firebaseService) {
        this.firebaseService = firebaseService;
        this.isLoginState = false;
        this.isRegisterState = false;
        this.isHomeState = false;
        // if user is logging in, 
        if (ApplicationSettings.getBoolean("authenticated", false)) {
            this.firebaseService.setCurrentUser();
            this.setPageState("Home");
        }
        else {
            // this.page.actionBarHidden = true;
            this.setPageState("Login");
        }
    }
    PagesComponent.prototype.setPageState = function (page) {
        this.isLoginState = false;
        this.isRegisterState = false;
        this.isHomeState = false;
        switch (page) {
            case "Login":
                this.isLoginState = true;
                break;
            case "Register":
                this.isRegisterState = true;
                break;
            case "Home":
                this.isHomeState = true;
                break;
        }
    };
    PagesComponent.prototype.loginPageEmit = function (args) {
        var _this = this;
        var className = args.view.className.split(" ");
        className.forEach(function (element) {
            if (element === "register-tap") {
                _this.setPageState("Register");
            }
            else if (element === "login-tap") {
                _this.setPageState("Home");
            }
        });
        // this.setPageState("Register");
    };
    PagesComponent.prototype.registerPageEmit = function (args) {
        this.setPageState("Login");
    };
    PagesComponent.prototype.homePageEmit = function (args) {
        this.setPageState("Login");
    };
    PagesComponent.prototype.ngOnInit = function () {
    };
    PagesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'Pages',
            templateUrl: './pages.component.html',
            styleUrls: ['./pages.component.scss']
        }),
        __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
    ], PagesComponent);
    return PagesComponent;
}());
exports.PagesComponent = PagesComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFnZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBEQUE0RDtBQUM1RCxnRUFBOEQ7QUFTOUQ7SUFLRSx3QkFBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBSnBELGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBQ2pDLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBRzNCLDBCQUEwQjtRQUMxQixFQUFFLENBQUEsQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxRCxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUIsQ0FBQztRQUVELElBQUksQ0FBQSxDQUFDO1lBQ0gsb0NBQW9DO1lBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDNUIsQ0FBQztJQUNILENBQUM7SUFHRCxxQ0FBWSxHQUFaLFVBQWEsSUFBWTtRQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixNQUFNLENBQUEsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQ1gsS0FBSyxPQUFPO2dCQUNWLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2dCQUN6QixLQUFLLENBQUM7WUFDUixLQUFLLFVBQVU7Z0JBQ2IsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7Z0JBQzVCLEtBQUssQ0FBQztZQUNSLEtBQUssTUFBTTtnQkFDVCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDeEIsS0FBSyxDQUFDO1FBQ1YsQ0FBQztJQUNILENBQUM7SUFFRCxzQ0FBYSxHQUFiLFVBQWMsSUFBSTtRQUFsQixpQkFXQztRQVZDLElBQUksU0FBUyxHQUFlLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzRCxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTztZQUN4QixFQUFFLENBQUEsQ0FBQyxPQUFPLEtBQUcsY0FBYyxDQUFDLENBQUEsQ0FBQztnQkFDM0IsS0FBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNoQyxDQUFDO1lBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLE9BQU8sS0FBRyxXQUFXLENBQUMsQ0FBQSxDQUFDO2dCQUM3QixLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzVCLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILGlDQUFpQztJQUNuQyxDQUFDO0lBQ0QseUNBQWdCLEdBQWhCLFVBQWlCLElBQUk7UUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QscUNBQVksR0FBWixVQUFhLElBQUk7UUFDZixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxpQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQXpEVSxjQUFjO1FBTjFCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLE9BQU87WUFDakIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztTQUN0QyxDQUFDO3lDQU1xQyxrQ0FBZTtPQUx6QyxjQUFjLENBMkQxQjtJQUFELHFCQUFDO0NBQUEsQUEzREQsSUEyREM7QUEzRFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gJ34vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdQYWdlcycsXG4gIHRlbXBsYXRlVXJsOiAnLi9wYWdlcy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3BhZ2VzLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUGFnZXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBpc0xvZ2luU3RhdGU6IEJvb2xlYW4gPSBmYWxzZTtcbiAgaXNSZWdpc3RlclN0YXRlOiBCb29sZWFuID0gZmFsc2U7XG4gIGlzSG9tZVN0YXRlOiBCb29sZWFuID0gZmFsc2U7XG4gIHBhZ2U6IFBhZ2U7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UpIHsgXG4gICAgLy8gaWYgdXNlciBpcyBsb2dnaW5nIGluLCBcbiAgICBpZihBcHBsaWNhdGlvblNldHRpbmdzLmdldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIGZhbHNlKSkge1xuICAgICAgdGhpcy5maXJlYmFzZVNlcnZpY2Uuc2V0Q3VycmVudFVzZXIoKTtcbiAgICAgIHRoaXMuc2V0UGFnZVN0YXRlKFwiSG9tZVwiKTtcbiAgICB9XG4gICAgLy8gaWYgbm90XG4gICAgZWxzZXtcbiAgICAgIC8vIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgICAgdGhpcy5zZXRQYWdlU3RhdGUoXCJMb2dpblwiKVxuICAgIH1cbiAgfVxuICBcblxuICBzZXRQYWdlU3RhdGUocGFnZTogc3RyaW5nKXtcbiAgICB0aGlzLmlzTG9naW5TdGF0ZSA9IGZhbHNlO1xuICAgIHRoaXMuaXNSZWdpc3RlclN0YXRlID0gZmFsc2U7XG4gICAgdGhpcy5pc0hvbWVTdGF0ZSA9IGZhbHNlO1xuICAgIHN3aXRjaChwYWdlKXtcbiAgICAgIGNhc2UgXCJMb2dpblwiOlxuICAgICAgICB0aGlzLmlzTG9naW5TdGF0ZSA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIlJlZ2lzdGVyXCI6XG4gICAgICAgIHRoaXMuaXNSZWdpc3RlclN0YXRlID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiSG9tZVwiOlxuICAgICAgICB0aGlzLmlzSG9tZVN0YXRlID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgbG9naW5QYWdlRW1pdChhcmdzKXtcbiAgICB2YXIgY2xhc3NOYW1lOiBBcnJheTxhbnk+ID0gYXJncy52aWV3LmNsYXNzTmFtZS5zcGxpdChcIiBcIik7XG4gICAgY2xhc3NOYW1lLmZvckVhY2goKGVsZW1lbnQpPT57XG4gICAgICBpZihlbGVtZW50PT09XCJyZWdpc3Rlci10YXBcIil7XG4gICAgICAgIHRoaXMuc2V0UGFnZVN0YXRlKFwiUmVnaXN0ZXJcIik7XG4gICAgICB9XG4gICAgICBlbHNlIGlmKGVsZW1lbnQ9PT1cImxvZ2luLXRhcFwiKXtcbiAgICAgICAgdGhpcy5zZXRQYWdlU3RhdGUoXCJIb21lXCIpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIHRoaXMuc2V0UGFnZVN0YXRlKFwiUmVnaXN0ZXJcIik7XG4gIH1cbiAgcmVnaXN0ZXJQYWdlRW1pdChhcmdzKXtcbiAgICB0aGlzLnNldFBhZ2VTdGF0ZShcIkxvZ2luXCIpO1xuICB9XG4gIGhvbWVQYWdlRW1pdChhcmdzKXtcbiAgICB0aGlzLnNldFBhZ2VTdGF0ZShcIkxvZ2luXCIpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG5cbiAgfVxuXG59XG4iXX0=