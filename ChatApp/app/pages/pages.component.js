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
            // this.firebaseService.setCurrentUser();
            this.setPageState("Home");
        }
        // if not
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFnZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBEQUE0RDtBQUM1RCxnRUFBOEQ7QUFTOUQ7SUFLRSx3QkFBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBSnBELGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBQ2pDLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBRzNCLDBCQUEwQjtRQUMxQixJQUFHLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLEVBQUU7WUFDekQseUNBQXlDO1lBQ3pDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDM0I7UUFDRCxTQUFTO2FBQ0w7WUFDRixvQ0FBb0M7WUFDcEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQTtTQUMzQjtJQUNILENBQUM7SUFHRCxxQ0FBWSxHQUFaLFVBQWEsSUFBWTtRQUN2QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixRQUFPLElBQUksRUFBQztZQUNWLEtBQUssT0FBTztnQkFDVixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztnQkFDekIsTUFBTTtZQUNSLEtBQUssVUFBVTtnQkFDYixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztnQkFDNUIsTUFBTTtZQUNSLEtBQUssTUFBTTtnQkFDVCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztnQkFDeEIsTUFBTTtTQUNUO0lBQ0gsQ0FBQztJQUVELHNDQUFhLEdBQWIsVUFBYyxJQUFJO1FBQWxCLGlCQVdDO1FBVkMsSUFBSSxTQUFTLEdBQWUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNELFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxPQUFPO1lBQ3hCLElBQUcsT0FBTyxLQUFHLGNBQWMsRUFBQztnQkFDMUIsS0FBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUMvQjtpQkFDSSxJQUFHLE9BQU8sS0FBRyxXQUFXLEVBQUM7Z0JBQzVCLEtBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDM0I7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILGlDQUFpQztJQUNuQyxDQUFDO0lBQ0QseUNBQWdCLEdBQWhCLFVBQWlCLElBQUk7UUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0QscUNBQVksR0FBWixVQUFhLElBQUk7UUFDZixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxpQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQXpEVSxjQUFjO1FBTjFCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLE9BQU87WUFDakIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztTQUN0QyxDQUFDO3lDQU1xQyxrQ0FBZTtPQUx6QyxjQUFjLENBMkQxQjtJQUFELHFCQUFDO0NBQUEsQUEzREQsSUEyREM7QUEzRFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tICd+L3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICBzZWxlY3RvcjogJ1BhZ2VzJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vcGFnZXMuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3BhZ2VzLmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFBhZ2VzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBpc0xvZ2luU3RhdGU6IEJvb2xlYW4gPSBmYWxzZTtcclxuICBpc1JlZ2lzdGVyU3RhdGU6IEJvb2xlYW4gPSBmYWxzZTtcclxuICBpc0hvbWVTdGF0ZTogQm9vbGVhbiA9IGZhbHNlO1xyXG4gIHBhZ2U6IFBhZ2U7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSkgeyBcclxuICAgIC8vIGlmIHVzZXIgaXMgbG9nZ2luZyBpbiwgXHJcbiAgICBpZihBcHBsaWNhdGlvblNldHRpbmdzLmdldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIGZhbHNlKSkge1xyXG4gICAgICAvLyB0aGlzLmZpcmViYXNlU2VydmljZS5zZXRDdXJyZW50VXNlcigpO1xyXG4gICAgICB0aGlzLnNldFBhZ2VTdGF0ZShcIkhvbWVcIik7XHJcbiAgICB9XHJcbiAgICAvLyBpZiBub3RcclxuICAgIGVsc2V7XHJcbiAgICAgIC8vIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xyXG4gICAgICB0aGlzLnNldFBhZ2VTdGF0ZShcIkxvZ2luXCIpXHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG5cclxuICBzZXRQYWdlU3RhdGUocGFnZTogc3RyaW5nKXtcclxuICAgIHRoaXMuaXNMb2dpblN0YXRlID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzUmVnaXN0ZXJTdGF0ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc0hvbWVTdGF0ZSA9IGZhbHNlO1xyXG4gICAgc3dpdGNoKHBhZ2Upe1xyXG4gICAgICBjYXNlIFwiTG9naW5cIjpcclxuICAgICAgICB0aGlzLmlzTG9naW5TdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJSZWdpc3RlclwiOlxyXG4gICAgICAgIHRoaXMuaXNSZWdpc3RlclN0YXRlID0gdHJ1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIkhvbWVcIjpcclxuICAgICAgICB0aGlzLmlzSG9tZVN0YXRlID0gdHJ1ZTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxvZ2luUGFnZUVtaXQoYXJncyl7XHJcbiAgICB2YXIgY2xhc3NOYW1lOiBBcnJheTxhbnk+ID0gYXJncy52aWV3LmNsYXNzTmFtZS5zcGxpdChcIiBcIik7XHJcbiAgICBjbGFzc05hbWUuZm9yRWFjaCgoZWxlbWVudCk9PntcclxuICAgICAgaWYoZWxlbWVudD09PVwicmVnaXN0ZXItdGFwXCIpe1xyXG4gICAgICAgIHRoaXMuc2V0UGFnZVN0YXRlKFwiUmVnaXN0ZXJcIik7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZihlbGVtZW50PT09XCJsb2dpbi10YXBcIil7XHJcbiAgICAgICAgdGhpcy5zZXRQYWdlU3RhdGUoXCJIb21lXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8vIHRoaXMuc2V0UGFnZVN0YXRlKFwiUmVnaXN0ZXJcIik7XHJcbiAgfVxyXG4gIHJlZ2lzdGVyUGFnZUVtaXQoYXJncyl7XHJcbiAgICB0aGlzLnNldFBhZ2VTdGF0ZShcIkxvZ2luXCIpO1xyXG4gIH1cclxuICBob21lUGFnZUVtaXQoYXJncyl7XHJcbiAgICB0aGlzLnNldFBhZ2VTdGF0ZShcIkxvZ2luXCIpO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcblxyXG4gIH1cclxuXHJcbn1cclxuIl19