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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFnZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBEQUE0RDtBQUM1RCxnRUFBOEQ7QUFTOUQ7SUFLRSx3QkFBb0IsZUFBZ0M7UUFBaEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBSnBELGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBQzlCLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBQ2pDLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBRzNCLDBCQUEwQjtRQUMxQixJQUFHLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLEVBQUU7WUFDekQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzNCO1FBQ0QsU0FBUzthQUNMO1lBQ0Ysb0NBQW9DO1lBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUE7U0FDM0I7SUFDSCxDQUFDO0lBR0QscUNBQVksR0FBWixVQUFhLElBQVk7UUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsUUFBTyxJQUFJLEVBQUM7WUFDVixLQUFLLE9BQU87Z0JBQ1YsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7Z0JBQ3pCLE1BQU07WUFDUixLQUFLLFVBQVU7Z0JBQ2IsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7Z0JBQzVCLE1BQU07WUFDUixLQUFLLE1BQU07Z0JBQ1QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQ3hCLE1BQU07U0FDVDtJQUNILENBQUM7SUFFRCxzQ0FBYSxHQUFiLFVBQWMsSUFBSTtRQUFsQixpQkFXQztRQVZDLElBQUksU0FBUyxHQUFlLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzRCxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTztZQUN4QixJQUFHLE9BQU8sS0FBRyxjQUFjLEVBQUM7Z0JBQzFCLEtBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDL0I7aUJBQ0ksSUFBRyxPQUFPLEtBQUcsV0FBVyxFQUFDO2dCQUM1QixLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzNCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxpQ0FBaUM7SUFDbkMsQ0FBQztJQUNELHlDQUFnQixHQUFoQixVQUFpQixJQUFJO1FBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNELHFDQUFZLEdBQVosVUFBYSxJQUFJO1FBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsaUNBQVEsR0FBUjtJQUVBLENBQUM7SUF6RFUsY0FBYztRQU4xQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7U0FDdEMsQ0FBQzt5Q0FNcUMsa0NBQWU7T0FMekMsY0FBYyxDQTJEMUI7SUFBRCxxQkFBQztDQUFBLEFBM0RELElBMkRDO0FBM0RZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSAnfi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgc2VsZWN0b3I6ICdQYWdlcycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3BhZ2VzLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9wYWdlcy5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQYWdlc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgaXNMb2dpblN0YXRlOiBCb29sZWFuID0gZmFsc2U7XHJcbiAgaXNSZWdpc3RlclN0YXRlOiBCb29sZWFuID0gZmFsc2U7XHJcbiAgaXNIb21lU3RhdGU6IEJvb2xlYW4gPSBmYWxzZTtcclxuICBwYWdlOiBQYWdlO1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UpIHsgXHJcbiAgICAvLyBpZiB1c2VyIGlzIGxvZ2dpbmcgaW4sIFxyXG4gICAgaWYoQXBwbGljYXRpb25TZXR0aW5ncy5nZXRCb29sZWFuKFwiYXV0aGVudGljYXRlZFwiLCBmYWxzZSkpIHtcclxuICAgICAgdGhpcy5maXJlYmFzZVNlcnZpY2Uuc2V0Q3VycmVudFVzZXIoKTtcclxuICAgICAgdGhpcy5zZXRQYWdlU3RhdGUoXCJIb21lXCIpO1xyXG4gICAgfVxyXG4gICAgLy8gaWYgbm90XHJcbiAgICBlbHNle1xyXG4gICAgICAvLyB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcclxuICAgICAgdGhpcy5zZXRQYWdlU3RhdGUoXCJMb2dpblwiKVxyXG4gICAgfVxyXG4gIH1cclxuICBcclxuXHJcbiAgc2V0UGFnZVN0YXRlKHBhZ2U6IHN0cmluZyl7XHJcbiAgICB0aGlzLmlzTG9naW5TdGF0ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc1JlZ2lzdGVyU3RhdGUgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNIb21lU3RhdGUgPSBmYWxzZTtcclxuICAgIHN3aXRjaChwYWdlKXtcclxuICAgICAgY2FzZSBcIkxvZ2luXCI6XHJcbiAgICAgICAgdGhpcy5pc0xvZ2luU3RhdGUgPSB0cnVlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiUmVnaXN0ZXJcIjpcclxuICAgICAgICB0aGlzLmlzUmVnaXN0ZXJTdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJIb21lXCI6XHJcbiAgICAgICAgdGhpcy5pc0hvbWVTdGF0ZSA9IHRydWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsb2dpblBhZ2VFbWl0KGFyZ3Mpe1xyXG4gICAgdmFyIGNsYXNzTmFtZTogQXJyYXk8YW55PiA9IGFyZ3Mudmlldy5jbGFzc05hbWUuc3BsaXQoXCIgXCIpO1xyXG4gICAgY2xhc3NOYW1lLmZvckVhY2goKGVsZW1lbnQpPT57XHJcbiAgICAgIGlmKGVsZW1lbnQ9PT1cInJlZ2lzdGVyLXRhcFwiKXtcclxuICAgICAgICB0aGlzLnNldFBhZ2VTdGF0ZShcIlJlZ2lzdGVyXCIpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYoZWxlbWVudD09PVwibG9naW4tdGFwXCIpe1xyXG4gICAgICAgIHRoaXMuc2V0UGFnZVN0YXRlKFwiSG9tZVwiKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvLyB0aGlzLnNldFBhZ2VTdGF0ZShcIlJlZ2lzdGVyXCIpO1xyXG4gIH1cclxuICByZWdpc3RlclBhZ2VFbWl0KGFyZ3Mpe1xyXG4gICAgdGhpcy5zZXRQYWdlU3RhdGUoXCJMb2dpblwiKTtcclxuICB9XHJcbiAgaG9tZVBhZ2VFbWl0KGFyZ3Mpe1xyXG4gICAgdGhpcy5zZXRQYWdlU3RhdGUoXCJMb2dpblwiKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG5cclxuICB9XHJcblxyXG59XHJcbiJdfQ==