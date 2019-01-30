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
        this.profilePicsrc = "res://noprofilepicture";
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
        this.firebaseService.getUserPosts(this.firebaseService.authuser.uid);
        this.routerExtensions.navigate(['/searchresult'], { animated: false });
        this._buttonRef.makeArrow();
    };
    AppComponent.prototype.profileTap = function () {
        this.closeDrawer();
        this.routerExtensions.navigate(['/profile-input'], { animated: false });
        this._buttonRef.makeArrow();
    };
    AppComponent.prototype.settingTap = function () {
        this.closeDrawer();
        this.routerExtensions.navigate(['/setting'], { animated: false });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxzQ0FBNkQ7QUFDN0QsaUNBQW1DO0FBQ25DLDBEQUE0RDtBQUM1RCxzREFBK0Q7QUFDL0QseUVBQXlHO0FBQ3pHLG1HQUFnRztBQUNoRyxnRUFBOEQ7QUFPOUQ7SUFVSSxzQkFBb0IsZ0JBQWtDLEVBQzFDLGVBQWdDO1FBRHhCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDMUMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBVHJDLGtCQUFhLEdBQUcsd0JBQXdCLENBQUM7UUFDekMsU0FBSSxHQUFHLE1BQU0sQ0FBQztRQUNkLFVBQUssR0FBRyxZQUFZLENBQUM7UUFTeEIsb0RBQW9EO0lBQ3hELENBQUM7SUFFRCwrQkFBUSxHQUFSO1FBQUEsaUJBU0M7UUFSRyxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxtREFBc0IsRUFBRSxDQUFDO1FBQzFELFdBQVcsQ0FBQztZQUNSLElBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUM7Z0JBQzdCLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ2xILEtBQUksQ0FBQyxJQUFJLEdBQUksS0FBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2pHLEtBQUksQ0FBQyxLQUFLLEdBQUksS0FBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDdEc7UUFDTCxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDWixDQUFDO0lBRUQsa0NBQVcsR0FBWDtRQUNJLElBQU0sVUFBVSxHQUFrQixHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEQsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxnQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELGlDQUFVLEdBQVY7UUFDSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxpQ0FBVSxHQUFWO1FBQ0ksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVELG1DQUFZLEdBQVo7UUFDSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsZ0NBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzlCLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDdkUsQ0FBQztJQUNELHNCQUFJLDhDQUFvQjthQUF4QjtZQUNJLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDO1FBQ3RDLENBQUM7OztPQUFBO0lBM0QwQjtRQUExQixnQkFBUyxDQUFDLGNBQWMsQ0FBQztrQ0FBYSwrQ0FBcUI7b0RBQUM7SUFOcEQsWUFBWTtRQUp4QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLG9CQUFvQjtTQUNwQyxDQUFDO3lDQVd3Qyx5QkFBZ0I7WUFDekIsa0NBQWU7T0FYbkMsWUFBWSxDQW1FeEI7SUFBRCxtQkFBQztDQUFBLEFBbkVELElBbUVDO0FBbkVZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJhcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBEcmF3ZXJUcmFuc2l0aW9uQmFzZSwgUmFkU2lkZURyYXdlciwgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiO1xyXG5pbXBvcnQgeyBBY3Rpb25CdXR0b25Db21wb25lbnQgfSBmcm9tIFwifi9tb2R1bGVzL2J1dHRvbnMvYWN0aW9uLWJ1dHRvbi9hY3Rpb24tYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1hcHBcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcImFwcC5jb21wb25lbnQuaHRtbFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xyXG4gICAgcHVibGljIHByb2ZpbGVQaWNzcmMgPSBcInJlczovL25vcHJvZmlsZXBpY3R1cmVcIjtcclxuICAgIHB1YmxpYyBuYW1lID0gXCJ1c2VyXCI7XHJcbiAgICBwdWJsaWMgZW1haWwgPSBcInVzZXJAZW1haWxcIjtcclxuXHJcbiAgICBAVmlld0NoaWxkKFwiYWN0aW9uQnV0dG9uXCIpIF9idXR0b25SZWY6IEFjdGlvbkJ1dHRvbkNvbXBvbmVudDtcclxuXHJcbiAgICB1c2VyOiBPYnNlcnZhYmxlPGZpcmViYXNlLlVzZXI+O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgICAgICBwcml2YXRlIGZpcmViYXNlU2VydmljZTogRmlyZWJhc2VTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICAvLyBVc2UgdGhlIGNvbXBvbmVudCBjb25zdHJ1Y3RvciB0byBpbmplY3Qgc2VydmljZXMuXHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb24gPSBuZXcgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbigpO1xyXG4gICAgICAgIHNldEludGVydmFsKCgpPT57XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmF1dGh1c2VyKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZmlsZVBpY3NyYyA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyW3RoaXMuZmlyZWJhc2VTZXJ2aWNlLmF1dGh1c2VyLnVpZF1bJ3Byb2ZpbGUnXVsncHJvZmlsZVBpY3NyYyddO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lID0gIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyW3RoaXMuZmlyZWJhc2VTZXJ2aWNlLmF1dGh1c2VyLnVpZF1bJ3Byb2ZpbGUnXVsnbmFtZSddO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWFpbCA9ICB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlclt0aGlzLmZpcmViYXNlU2VydmljZS5hdXRodXNlci51aWRdWydwcm9maWxlJ11bJ2VtYWlsJ107ICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSw1MDAwKTtcclxuICAgIH1cclxuXHJcbiAgICBjbG9zZURyYXdlcigpOiB2b2lke1xyXG4gICAgICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj5hcHAuZ2V0Um9vdFZpZXcoKTtcclxuICAgICAgICBzaWRlRHJhd2VyLmNsb3NlRHJhd2VyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25Ib21lVGFwKCk6IHZvaWR7XHJcbiAgICAgICAgdGhpcy5jbG9zZURyYXdlcigpO1xyXG5cdFx0dGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0VXNlclBvc3RzKHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmF1dGh1c2VyLnVpZCk7XHJcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvc2VhcmNocmVzdWx0J10sIHsgYW5pbWF0ZWQ6IGZhbHNlIH0pO1xyXG5cdFx0dGhpcy5fYnV0dG9uUmVmLm1ha2VBcnJvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb2ZpbGVUYXAoKTogdm9pZHtcclxuICAgICAgICB0aGlzLmNsb3NlRHJhd2VyKCk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL3Byb2ZpbGUtaW5wdXQnXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XHJcbiAgICAgICAgdGhpcy5fYnV0dG9uUmVmLm1ha2VBcnJvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldHRpbmdUYXAoKTogdm9pZHtcclxuICAgICAgICB0aGlzLmNsb3NlRHJhd2VyKCk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL3NldHRpbmcnXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XHJcbiAgICAgICAgdGhpcy5fYnV0dG9uUmVmLm1ha2VBcnJvdygpO1xyXG4gICAgfVxyXG5cclxuICAgIGVubmVhZ3JhbVRhcCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNsb3NlRHJhd2VyKCk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2VubmVhZ3JhbSddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcclxuICAgICAgICB0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbG9nb3V0VGFwKCk6IHZvaWR7XHJcbiAgICAgICAgdGhpcy5jbG9zZURyYXdlcigpO1xyXG4gICAgICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmxvZ291dCgpO1xyXG4gICAgICAgIEFwcGxpY2F0aW9uU2V0dGluZ3Muc2V0Qm9vbGVhbihcImF1dGhlbnRpY2F0ZWRcIiwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvbG9naW5cIl0sIHsgY2xlYXJIaXN0b3J5OiB0cnVlIH0pO1xyXG4gICAgfVxyXG4gICAgZ2V0IHNpZGVEcmF3ZXJUcmFuc2l0aW9uKCk6IERyYXdlclRyYW5zaXRpb25CYXNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb247XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG4iXX0=