"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app = require("application");
var ApplicationSettings = require("application-settings");
var router_1 = require("nativescript-angular/router");
var nativescript_ui_sidedrawer_1 = require("nativescript-ui-sidedrawer");
var action_button_component_1 = require("./home/searchresult/action-button/action-button.component");
var firebase_service_1 = require("./services/firebase.service");
var AppComponent = /** @class */ (function () {
    function AppComponent(routerExtensions, firebaseService) {
        this.routerExtensions = routerExtensions;
        this.firebaseService = firebaseService;
        this.profilePicsrc = "~/home/images/user-avatar-main-picture.png";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzQ0FBNkQ7QUFDN0QsaUNBQW1DO0FBQ25DLDBEQUE0RDtBQUM1RCxzREFBK0Q7QUFDL0QseUVBQXlHO0FBQ3pHLHFHQUFrRztBQUNsRyxnRUFBOEQ7QUFPOUQ7SUFTSSxzQkFBb0IsZ0JBQWtDLEVBQzFDLGVBQWdDO1FBRHhCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDMUMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBUnJDLGtCQUFhLEdBQUcsNENBQTRDLENBQUM7UUFDN0QsU0FBSSxHQUFHLE1BQU0sQ0FBQztRQUNkLFVBQUssR0FBRyxZQUFZLENBQUM7UUFReEIsb0RBQW9EO0lBQ3hELENBQUM7SUFFRCwrQkFBUSxHQUFSO1FBQUEsaUJBU0M7UUFSRyxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxtREFBc0IsRUFBRSxDQUFDO1FBQzFELFdBQVcsQ0FBQztZQUNSLEVBQUUsQ0FBQSxDQUFDLEtBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUEsQ0FBQztnQkFDOUIsS0FBSSxDQUFDLGFBQWEsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDbEgsS0FBSSxDQUFDLElBQUksR0FBSSxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDakcsS0FBSSxDQUFDLEtBQUssR0FBSSxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN2RyxDQUFDO1FBQ0wsQ0FBQyxFQUFDLElBQUksQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVELGtDQUFXLEdBQVg7UUFDSSxJQUFNLFVBQVUsR0FBa0IsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3BELFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsZ0NBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxpQ0FBVSxHQUFWO1FBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsbUNBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxnQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDOUIsbUJBQW1CLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBQ0Qsc0JBQUksOENBQW9CO2FBQXhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTtJQXJEMEI7UUFBMUIsZ0JBQVMsQ0FBQyxjQUFjLENBQUM7a0NBQWEsK0NBQXFCO29EQUFDO0lBTHBELFlBQVk7UUFKeEIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRSxvQkFBb0I7U0FDcEMsQ0FBQzt5Q0FVd0MseUJBQWdCO1lBQ3pCLGtDQUFlO09BVm5DLFlBQVksQ0EyRHhCO0lBQUQsbUJBQUM7Q0FBQSxBQTNERCxJQTJEQztBQTNEWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwiYXBwbGljYXRpb25cIjtcclxuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgRHJhd2VyVHJhbnNpdGlvbkJhc2UsIFJhZFNpZGVEcmF3ZXIsIFNsaWRlSW5PblRvcFRyYW5zaXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXJcIjtcclxuaW1wb3J0IHsgQWN0aW9uQnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4vaG9tZS9zZWFyY2hyZXN1bHQvYWN0aW9uLWJ1dHRvbi9hY3Rpb24tYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1hcHBcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcImFwcC5jb21wb25lbnQuaHRtbFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xyXG4gICAgcHVibGljIHByb2ZpbGVQaWNzcmMgPSBcIn4vaG9tZS9pbWFnZXMvdXNlci1hdmF0YXItbWFpbi1waWN0dXJlLnBuZ1wiO1xyXG4gICAgcHVibGljIG5hbWUgPSBcInVzZXJcIjtcclxuICAgIHB1YmxpYyBlbWFpbCA9IFwidXNlckBlbWFpbFwiO1xyXG4gICAgQFZpZXdDaGlsZChcImFjdGlvbkJ1dHRvblwiKSBfYnV0dG9uUmVmOiBBY3Rpb25CdXR0b25Db21wb25lbnQ7XHJcblxyXG4gICAgdXNlcjogT2JzZXJ2YWJsZTxmaXJlYmFzZS5Vc2VyPjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICAgICAgcHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICAgICAgLy8gVXNlIHRoZSBjb21wb25lbnQgY29uc3RydWN0b3IgdG8gaW5qZWN0IHNlcnZpY2VzLlxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uID0gbmV3IFNsaWRlSW5PblRvcFRyYW5zaXRpb24oKTtcclxuICAgICAgICBzZXRJbnRlcnZhbCgoKT0+e1xyXG4gICAgICAgICAgICBpZih0aGlzLmZpcmViYXNlU2VydmljZS5hdXRodXNlcil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2ZpbGVQaWNzcmMgPSB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlclt0aGlzLmZpcmViYXNlU2VydmljZS5hdXRodXNlci51aWRdWydwcm9maWxlJ11bJ3Byb2ZpbGVQaWNzcmMnXTtcclxuICAgICAgICAgICAgICAgIHRoaXMubmFtZSA9ICB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlclt0aGlzLmZpcmViYXNlU2VydmljZS5hdXRodXNlci51aWRdWydwcm9maWxlJ11bJ25hbWUnXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW1haWwgPSAgdGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXJbdGhpcy5maXJlYmFzZVNlcnZpY2UuYXV0aHVzZXIudWlkXVsncHJvZmlsZSddWydlbWFpbCddOyAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sNTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2VEcmF3ZXIoKTogdm9pZHtcclxuICAgICAgICBjb25zdCBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+YXBwLmdldFJvb3RWaWV3KCk7XHJcbiAgICAgICAgc2lkZURyYXdlci5jbG9zZURyYXdlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uSG9tZVRhcCgpOiB2b2lke1xyXG4gICAgICAgIHRoaXMuY2xvc2VEcmF3ZXIoKTtcclxuXHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldF91c2VyX3Bvc3RzKHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmF1dGh1c2VyLnVpZCk7XHJcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvc2VhcmNocmVzdWx0J10sIHsgYW5pbWF0ZWQ6IGZhbHNlIH0pO1xyXG5cdFx0dGhpcy5fYnV0dG9uUmVmLm1ha2VBcnJvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb2ZpbGVUYXAoKTogdm9pZHtcclxuICAgICAgICB0aGlzLmNsb3NlRHJhd2VyKCk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL3Byb2ZpbGUtaW5wdXQnXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XHJcbiAgICAgICAgdGhpcy5fYnV0dG9uUmVmLm1ha2VBcnJvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIGVubmVhZ3JhbVRhcCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNsb3NlRHJhd2VyKCk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2VubmVhZ3JhbSddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcclxuICAgICAgICB0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9nb3V0VGFwKCk6IHZvaWR7XHJcbiAgICAgICAgdGhpcy5jbG9zZURyYXdlcigpO1xyXG4gICAgICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmxvZ291dCgpO1xyXG4gICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0Qm9vbGVhbihcImF1dGhlbnRpY2F0ZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvbG9naW5cIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xyXG4gICAgfVxyXG4gICAgZ2V0IHNpZGVEcmF3ZXJUcmFuc2l0aW9uKCk6IERyYXdlclRyYW5zaXRpb25CYXNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb247XHJcbiAgICB9XHJcbn1cclxuIl19