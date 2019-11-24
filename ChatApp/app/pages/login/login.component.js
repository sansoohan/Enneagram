"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var firebase_service_1 = require("~/services/firebase.service");
var page_1 = require("tns-core-modules/ui/page");
var auth_model_1 = require("./auth.model");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, routerExtensions, firebaseService, page) {
        this.router = router;
        this.routerExtensions = routerExtensions;
        this.firebaseService = firebaseService;
        this.page = page;
        this.auth = new auth_model_1.Auth();
        this.tap = new core_1.EventEmitter();
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
    };
    LoginComponent.prototype.loginByEmail = function (auth) {
        this.firebaseService.loginByEmail(auth);
    };
    LoginComponent.prototype.loginByFacebook = function () {
        this.firebaseService.loginByFacebook();
    };
    LoginComponent.prototype.loginByGoogle = function () {
        this.firebaseService.loginByGoogle();
    };
    LoginComponent.prototype.handleInput = function (args) {
    };
    LoginComponent.prototype.onRegisterTap = function (args) {
        this.tap.emit(args);
    };
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], LoginComponent.prototype, "tap", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "Login",
            templateUrl: "login.component.html",
            styleUrls: ['./login.component.css'],
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            router_1.RouterExtensions,
            firebase_service_1.FirebaseService,
            page_1.Page])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXdFO0FBQ3hFLHNEQUErRDtBQUMvRCxnRUFBOEQ7QUFHOUQsaURBQWdEO0FBQ2hELDJDQUFvQztBQVFwQztJQU1JLHdCQUEyQixNQUF3QixFQUN2QyxnQkFBa0MsRUFDbEMsZUFBZ0MsRUFDaEMsSUFBVTtRQUhLLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3ZDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFNBQUksR0FBSixJQUFJLENBQU07UUFSZixTQUFJLEdBQVEsSUFBSSxpQkFBSSxFQUFFLENBQUM7UUFHcEIsUUFBRyxHQUFzQixJQUFJLG1CQUFZLEVBQU8sQ0FBQztJQVEzRCxDQUFDO0lBRU0saUNBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUNyQyxDQUFDO0lBRU0scUNBQVksR0FBbkIsVUFBb0IsSUFBUztRQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0sd0NBQWUsR0FBdEI7UUFDSSxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFTSxzQ0FBYSxHQUFwQjtRQUNJLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVNLG9DQUFXLEdBQWxCLFVBQW1CLElBQUk7SUFFdkIsQ0FBQztJQUdELHNDQUFhLEdBQWIsVUFBYyxJQUFJO1FBQ2QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQWpDWTtRQUFULGFBQU0sRUFBRTtrQ0FBTSxtQkFBWTsrQ0FBZ0M7SUFKbEQsY0FBYztRQU4xQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFdBQVcsRUFBRSxzQkFBc0I7WUFDbkMsU0FBUyxFQUFFLENBQUMsdUJBQXVCLENBQUM7U0FDdkMsQ0FBQzt5Q0FPcUMseUJBQWdCO1lBQ3JCLHlCQUFnQjtZQUNqQixrQ0FBZTtZQUMxQixXQUFJO09BVGIsY0FBYyxDQXNDMUI7SUFBRCxxQkFBQztDQUFBLEFBdENELElBc0NDO0FBdENZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSAnfi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlJztcclxuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XHJcblxyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBBdXRoIH0gZnJvbSBcIi4vYXV0aC5tb2RlbFwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6IFwiTG9naW5cIixcclxuICAgIHRlbXBsYXRlVXJsOiBcImxvZ2luLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9sb2dpbi5jb21wb25lbnQuY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwdWJsaWMgYXV0aDpBdXRoID0gbmV3IEF1dGgoKTtcclxuICAgIHB1YmxpYyBtZXNzYWdlOnN0cmluZztcclxuXHJcbiAgICBAT3V0cHV0KCkgdGFwOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICAgICAgcHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2VcclxuICAgICkge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvZ2luQnlFbWFpbChhdXRoOkF1dGgpIHtcclxuICAgICAgICB0aGlzLmZpcmViYXNlU2VydmljZS5sb2dpbkJ5RW1haWwoYXV0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvZ2luQnlGYWNlYm9vaygpe1xyXG4gICAgICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmxvZ2luQnlGYWNlYm9vaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2dpbkJ5R29vZ2xlKCl7XHJcbiAgICAgICAgdGhpcy5maXJlYmFzZVNlcnZpY2UubG9naW5CeUdvb2dsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYW5kbGVJbnB1dChhcmdzKXtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25SZWdpc3RlclRhcChhcmdzKSB7XHJcbiAgICAgICAgdGhpcy50YXAuZW1pdChhcmdzKTtcclxuXHR9XHJcbn1cclxuIl19