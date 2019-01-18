"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app = require("application");
var ApplicationSettings = require("application-settings");
var router_1 = require("nativescript-angular/router");
var nativescript_ui_sidedrawer_1 = require("nativescript-ui-sidedrawer");
var action_button_component_1 = require("~/modules/buttons/action-button/action-button.component");
var firebase_service_1 = require("./services/firebase.service");
var AppComponent = /** @class */ (function () {
    function AppComponent(routerExtensions, firebaseService) {
        this.routerExtensions = routerExtensions;
        this.firebaseService = firebaseService;
        this.profilePicsrc = "~/pages/home/images/user-avatar-main-picture.png";
        this.name = "user";
        this.email = "user@email";
        // Use the component constructor to inject services.
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._sideDrawerTransition = new nativescript_ui_sidedrawer_1.SlideInOnTopTransition();
        setInterval(function () {
            if (_this.firebaseService.authuser) {
                _this.profilePicsrc = _this.firebaseService.thisUser[_this.firebaseService.authuser.uid]['profile']['profilePicsrc'];
                _this.name = _this.firebaseService.thisUser[_this.firebaseService.authuser.uid]['profile']['name'];
                _this.email = _this.firebaseService.thisUser[_this.firebaseService.authuser.uid]['profile']['email'];
            }
        }, 5000);
    };
    AppComponent.prototype.closeDrawer = function () {
        var sideDrawer = app.getRootView();
        sideDrawer.closeDrawer();
    };
    AppComponent.prototype.onHomeTap = function () {
        this.closeDrawer();
        this.firebaseService.get_user_posts(this.firebaseService.authuser.uid);
        this.routerExtensions.navigate(['/searchresult'], { animated: false });
        this._buttonRef.makeArrow();
    };
    AppComponent.prototype.profileTap = function () {
        this.closeDrawer();
        this.routerExtensions.navigate(['/profile-input'], { animated: false });
        this._buttonRef.makeArrow();
    };
    AppComponent.prototype.enneagramTap = function () {
        this.closeDrawer();
        this.routerExtensions.navigate(['/enneagram'], { animated: false });
        this._buttonRef.makeArrow();
    };
    AppComponent.prototype.logoutTap = function () {
        this.closeDrawer();
        this.firebaseService.logout();
        ApplicationSettings.setBoolean("authenticated", false);
        this.routerExtensions.navigate(["/login"], { clearHistory: true });
    };
    Object.defineProperty(AppComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.ViewChild("actionButton"),
        __metadata("design:type", action_button_component_1.ActionButtonComponent)
    ], AppComponent.prototype, "_buttonRef", void 0);
    AppComponent = __decorate([
        core_1.Component({
            selector: "ns-app",
            templateUrl: "app.component.html"
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            firebase_service_1.FirebaseService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzQ0FBNkQ7QUFDN0QsaUNBQW1DO0FBQ25DLDBEQUE0RDtBQUM1RCxzREFBK0Q7QUFDL0QseUVBQXlHO0FBQ3pHLG1HQUFnRztBQUNoRyxnRUFBOEQ7QUFPOUQ7SUFTSSxzQkFBb0IsZ0JBQWtDLEVBQzFDLGVBQWdDO1FBRHhCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDMUMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBUnJDLGtCQUFhLEdBQUcsa0RBQWtELENBQUM7UUFDbkUsU0FBSSxHQUFHLE1BQU0sQ0FBQztRQUNkLFVBQUssR0FBRyxZQUFZLENBQUM7UUFReEIsb0RBQW9EO0lBQ3hELENBQUM7SUFFRCwrQkFBUSxHQUFSO1FBQUEsaUJBU0M7UUFSRyxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxtREFBc0IsRUFBRSxDQUFDO1FBQzFELFdBQVcsQ0FBQztZQUNSLEVBQUUsQ0FBQSxDQUFDLEtBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUEsQ0FBQztnQkFDOUIsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDbEgsS0FBSSxDQUFDLElBQUksR0FBSSxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDakcsS0FBSSxDQUFDLEtBQUssR0FBSSxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2RyxDQUFDO1FBQ0wsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVELGtDQUFXLEdBQVg7UUFDSSxJQUFNLFVBQVUsR0FBa0IsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BELFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsZ0NBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxpQ0FBVSxHQUFWO1FBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsbUNBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxnQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDOUIsbUJBQW1CLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBQ0Qsc0JBQUksOENBQW9CO2FBQXhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTtJQXJEMEI7UUFBMUIsZ0JBQVMsQ0FBQyxjQUFjLENBQUM7a0NBQWEsK0NBQXFCO29EQUFDO0lBTHBELFlBQVk7UUFKeEIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRSxvQkFBb0I7U0FDcEMsQ0FBQzt5Q0FVd0MseUJBQWdCO1lBQ3pCLGtDQUFlO09BVm5DLFlBQVksQ0EyRHhCO0lBQUQsbUJBQUM7Q0FBQSxBQTNERCxJQTJEQztBQTNEWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwiYXBwbGljYXRpb25cIjtcclxuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgRHJhd2VyVHJhbnNpdGlvbkJhc2UsIFJhZFNpZGVEcmF3ZXIsIFNsaWRlSW5PblRvcFRyYW5zaXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXJcIjtcclxuaW1wb3J0IHsgQWN0aW9uQnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIn4vbW9kdWxlcy9idXR0b25zL2FjdGlvbi1idXR0b24vYWN0aW9uLWJ1dHRvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibnMtYXBwXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJhcHAuY29tcG9uZW50Lmh0bWxcIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHByaXZhdGUgX3NpZGVEcmF3ZXJUcmFuc2l0aW9uOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZTtcclxuICAgIHB1YmxpYyBwcm9maWxlUGljc3JjID0gXCJ+L3BhZ2VzL2hvbWUvaW1hZ2VzL3VzZXItYXZhdGFyLW1haW4tcGljdHVyZS5wbmdcIjtcclxuICAgIHB1YmxpYyBuYW1lID0gXCJ1c2VyXCI7XHJcbiAgICBwdWJsaWMgZW1haWwgPSBcInVzZXJAZW1haWxcIjtcclxuICAgIEBWaWV3Q2hpbGQoXCJhY3Rpb25CdXR0b25cIikgX2J1dHRvblJlZjogQWN0aW9uQnV0dG9uQ29tcG9uZW50O1xyXG5cclxuICAgIHVzZXI6IE9ic2VydmFibGU8ZmlyZWJhc2UuVXNlcj47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgICAgIHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIC8vIFVzZSB0aGUgY29tcG9uZW50IGNvbnN0cnVjdG9yIHRvIGluamVjdCBzZXJ2aWNlcy5cclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbiA9IG5ldyBTbGlkZUluT25Ub3BUcmFuc2l0aW9uKCk7XHJcbiAgICAgICAgc2V0SW50ZXJ2YWwoKCk9PntcclxuICAgICAgICAgICAgaWYodGhpcy5maXJlYmFzZVNlcnZpY2UuYXV0aHVzZXIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9maWxlUGljc3JjID0gdGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXJbdGhpcy5maXJlYmFzZVNlcnZpY2UuYXV0aHVzZXIudWlkXVsncHJvZmlsZSddWydwcm9maWxlUGljc3JjJ107XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hbWUgPSAgdGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXJbdGhpcy5maXJlYmFzZVNlcnZpY2UuYXV0aHVzZXIudWlkXVsncHJvZmlsZSddWyduYW1lJ107XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVtYWlsID0gIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyW3RoaXMuZmlyZWJhc2VTZXJ2aWNlLmF1dGh1c2VyLnVpZF1bJ3Byb2ZpbGUnXVsnZW1haWwnXTsgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LDUwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlRHJhd2VyKCk6IHZvaWR7XHJcbiAgICAgICAgY29uc3Qgc2lkZURyYXdlciA9IDxSYWRTaWRlRHJhd2VyPmFwcC5nZXRSb290VmlldygpO1xyXG4gICAgICAgIHNpZGVEcmF3ZXIuY2xvc2VEcmF3ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkhvbWVUYXAoKTogdm9pZHtcclxuICAgICAgICB0aGlzLmNsb3NlRHJhd2VyKCk7XHJcblx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5nZXRfdXNlcl9wb3N0cyh0aGlzLmZpcmViYXNlU2VydmljZS5hdXRodXNlci51aWQpO1xyXG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL3NlYXJjaHJlc3VsdCddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcclxuXHRcdHRoaXMuX2J1dHRvblJlZi5tYWtlQXJyb3coKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm9maWxlVGFwKCk6IHZvaWR7XHJcbiAgICAgICAgdGhpcy5jbG9zZURyYXdlcigpO1xyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9wcm9maWxlLWlucHV0J10sIHsgYW5pbWF0ZWQ6IGZhbHNlIH0pO1xyXG4gICAgICAgIHRoaXMuX2J1dHRvblJlZi5tYWtlQXJyb3coKTtcclxuICAgIH1cclxuXHJcbiAgICBlbm5lYWdyYW1UYXAoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jbG9zZURyYXdlcigpO1xyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9lbm5lYWdyYW0nXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XHJcbiAgICAgICAgdGhpcy5fYnV0dG9uUmVmLm1ha2VBcnJvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIGxvZ291dFRhcCgpOiB2b2lke1xyXG4gICAgICAgIHRoaXMuY2xvc2VEcmF3ZXIoKTtcclxuICAgICAgICB0aGlzLmZpcmViYXNlU2VydmljZS5sb2dvdXQoKTtcclxuICAgICAgICBBcHBsaWNhdGlvblNldHRpbmdzLnNldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2xvZ2luXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTtcclxuICAgIH1cclxuICAgIGdldCBzaWRlRHJhd2VyVHJhbnNpdGlvbigpOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==