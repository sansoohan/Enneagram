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
        this.androidBannerId = "ca-app-pub-5445779750154576/7005154644";
        // private androidInterstitialId: string = "ca-app-pub-3940256099942544/6300978111";
        // private iosBannerId: string = "ca-app-pub-RRRR/TTTT";
        // private iosInterstitialId: string = "ca-app-pub-GGGG/HHHH";
        this.tap = new core_1.EventEmitter();
        // this.showBanner();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXdFO0FBQ3hFLHNEQUErRDtBQUUvRCxnRUFBOEQ7QUFHOUQsaURBQWdEO0FBQ2hELDJDQUFvQztBQVdwQztJQVVJLHdCQUEyQixNQUF3QixFQUN2QyxnQkFBa0MsRUFDbEMsZUFBZ0MsRUFDaEMsSUFBVTtRQUhLLFdBQU0sR0FBTixNQUFNLENBQWtCO1FBQ3ZDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFNBQUksR0FBSixJQUFJLENBQU07UUFaZixTQUFJLEdBQVEsSUFBSSxpQkFBSSxFQUFFLENBQUM7UUFFdEIsb0JBQWUsR0FBVyx3Q0FBd0MsQ0FBQztRQUMzRSxvRkFBb0Y7UUFDcEYsd0RBQXdEO1FBQ3hELDhEQUE4RDtRQUVwRCxRQUFHLEdBQXNCLElBQUksbUJBQVksRUFBTyxDQUFDO1FBT3ZELHFCQUFxQjtJQUN6QixDQUFDO0lBRU0saUNBQVEsR0FBZjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUNyQyxDQUFDO0lBRU0scUNBQVksR0FBbkIsVUFBb0IsSUFBUztRQUN6QixJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0sd0NBQWUsR0FBdEI7UUFDSSxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFTSxzQ0FBYSxHQUFwQjtRQUNJLElBQUksQ0FBQyxlQUFlLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVNLG9DQUFXLEdBQWxCLFVBQW1CLElBQUk7SUFFdkIsQ0FBQztJQUdELHNDQUFhLEdBQWIsVUFBYyxJQUFJO1FBQ2QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQWpDWTtRQUFULGFBQU0sRUFBRTtrQ0FBTSxtQkFBWTsrQ0FBZ0M7SUFSbEQsY0FBYztRQU4xQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFdBQVcsRUFBRSxzQkFBc0I7WUFDbkMsU0FBUyxFQUFFLENBQUMsdUJBQXVCLENBQUM7U0FDdkMsQ0FBQzt5Q0FXcUMseUJBQWdCO1lBQ3JCLHlCQUFnQjtZQUNqQixrQ0FBZTtZQUMxQixXQUFJO09BYmIsY0FBYyxDQTJHMUI7SUFBRCxxQkFBQztDQUFBLEFBM0dELElBMkdDO0FBM0dZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSAnfi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlJztcclxuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XHJcblxyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBBdXRoIH0gZnJvbSBcIi4vYXV0aC5tb2RlbFwiO1xyXG5cclxuLy8gaW1wb3J0ICogYXMgQWRtb2IgZnJvbSBcIm5hdGl2ZXNjcmlwdC1hZG1vYlwiO1xyXG5pbXBvcnQgeyBpc0lPUyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICBzZWxlY3RvcjogXCJMb2dpblwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwibG9naW4uY29tcG9uZW50Lmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogWycuL2xvZ2luLmNvbXBvbmVudC5jc3MnXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHB1YmxpYyBhdXRoOkF1dGggPSBuZXcgQXV0aCgpO1xyXG4gICAgcHVibGljIG1lc3NhZ2U6c3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBhbmRyb2lkQmFubmVySWQ6IHN0cmluZyA9IFwiY2EtYXBwLXB1Yi01NDQ1Nzc5NzUwMTU0NTc2LzcwMDUxNTQ2NDRcIjtcclxuICAgIC8vIHByaXZhdGUgYW5kcm9pZEludGVyc3RpdGlhbElkOiBzdHJpbmcgPSBcImNhLWFwcC1wdWItMzk0MDI1NjA5OTk0MjU0NC82MzAwOTc4MTExXCI7XHJcbiAgICAvLyBwcml2YXRlIGlvc0Jhbm5lcklkOiBzdHJpbmcgPSBcImNhLWFwcC1wdWItUlJSUi9UVFRUXCI7XHJcbiAgICAvLyBwcml2YXRlIGlvc0ludGVyc3RpdGlhbElkOiBzdHJpbmcgPSBcImNhLWFwcC1wdWItR0dHRy9ISEhIXCI7XHJcblxyXG4gICAgQE91dHB1dCgpIHRhcDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXI6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgICAgIHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlXHJcbiAgICApIHtcclxuICAgICAgICAvLyB0aGlzLnNob3dCYW5uZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvZ2luQnlFbWFpbChhdXRoOkF1dGgpIHtcclxuICAgICAgICB0aGlzLmZpcmViYXNlU2VydmljZS5sb2dpbkJ5RW1haWwoYXV0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvZ2luQnlGYWNlYm9vaygpe1xyXG4gICAgICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmxvZ2luQnlGYWNlYm9vaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2dpbkJ5R29vZ2xlKCl7XHJcbiAgICAgICAgdGhpcy5maXJlYmFzZVNlcnZpY2UubG9naW5CeUdvb2dsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYW5kbGVJbnB1dChhcmdzKXtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgb25SZWdpc3RlclRhcChhcmdzKSB7XHJcbiAgICAgICAgdGhpcy50YXAuZW1pdChhcmdzKTtcclxuXHR9XHJcbiAgICAvLyBwdWJsaWMgY3JlYXRlQmFubmVyKCkge1xyXG4gICAgLy8gICAgIEFkbW9iLmNyZWF0ZUJhbm5lcih7XHJcbiAgICAvLyAgICAgICAgIHRlc3Rpbmc6IHRydWUsXHJcbiAgICAvLyAgICAgICAgIHNpemU6IEFkbW9iLkFEX1NJWkUuU01BUlRfQkFOTkVSLFxyXG4gICAgLy8gICAgICAgICBpb3NCYW5uZXJJZDogdGhpcy5pb3NCYW5uZXJJZCxcclxuICAgIC8vICAgICAgICAgYW5kcm9pZEJhbm5lcklkOiB0aGlzLmFuZHJvaWRCYW5uZXJJZCxcclxuICAgIC8vICAgICAgICAgaW9zVGVzdERldmljZUlkczogW1wieW91clRlc3REZXZpY2VVRElEc1wiXSxcclxuICAgIC8vICAgICAgICAgbWFyZ2luczoge1xyXG4gICAgLy8gICAgICAgICAgICAgYm90dG9tOiAwXHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9KS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcImFkbW9iIGNyZWF0ZUJhbm5lciBkb25lXCIpO1xyXG4gICAgLy8gICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRtb2IgY3JlYXRlQmFubmVyIGVycm9yOiBcIiArIGVycm9yKTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBwdWJsaWMgc2hvd0Jhbm5lcigpe1xyXG4gICAgLy8gICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgLy8gICAgICAgICBmaXJlYmFzZS5hZG1vYi5zaG93QmFubmVyKHtcclxuICAgIC8vICAgICAgICAgICAgIHNpemU6IGZpcmViYXNlLmFkbW9iLkFEX1NJWkUuU01BUlRfQkFOTkVSLCAvLyBzZWUgZmlyZWJhc2UuYWRtb2IuQURfU0laRSBmb3IgYWxsIG9wdGlvbnNcclxuICAgIC8vICAgICAgICAgICAgIG1hcmdpbnM6IHsgLy8gb3B0ZnNkZmlvbmFsIG5yIG9mIGRldmljZSBpbmRlcGVuZGVudCBwaXhlbHMgZnJvbSB0aGUgdG9wIG9yIGJvdHRvbSAoZG9uJ3Qgc2V0IGJvdGgpXHJcbiAgICAvLyAgICAgICAgICAgICAvLyBib3R0b206IDEwLFxyXG4gICAgLy8gICAgICAgICAgICAgdG9wOiAwXHJcbiAgICAvLyAgICAgICAgICAgICB9LFxyXG4gICAgLy8gICAgICAgICAgICAgYW5kcm9pZEJhbm5lcklkOiBcImNhLWFwcC1wdWItNTQ0NTc3OTc1MDE1NDU3Ni83MDA1MTU0NjQ0XCIsXHJcbiAgICAvLyAgICAgICAgICAgICAvLyBpb3NCYW5uZXJJZDogXCJjYS1hcHAtcHViLTk1MTczNDYwMDMwMTE2NTIvMzk4NTM2OTcyMVwiLFxyXG4gICAgLy8gICAgICAgICAgICAgdGVzdGluZzogZmFsc2UsIC8vIHdoZW4gbm90IHJ1bm5pbmcgaW4gcHJvZHVjdGlvbiBzZXQgdGhpcyB0byB0cnVlLCBHb29nbGUgZG9lc24ndCBsaWtlIGl0IGFueSBvdGhlciB3YXlcclxuICAgIC8vICAgICAgICAgICAgIC8vIGlvc1Rlc3REZXZpY2VJZHM6IFsgLy9BbmRyb2lkIGF1dG9tYXRpY2FsbHkgYWRkcyB0aGUgY29ubmVjdGVkIGRldmljZSBhcyB0ZXN0IGRldmljZSB3aXRoIHRlc3Rpbmc6dHJ1ZSwgaU9TIGRvZXMgbm90XHJcbiAgICAvLyAgICAgICAgICAgICAvLyAgICAgXCI0NWQ3N2JmNTEzZGZhYmMyOTQ5YmEwNTNkYTgzYzBjN2I3ZTg3NzE1XCIsIC8vIEVkZHkncyBpUGhvbmUgNnNcclxuICAgIC8vICAgICAgICAgICAgIC8vICAgICBcImZlZTRjZjMxOWEyNDJlYWI0NzAxNTQzZTRjMTZkYjg5YzcyMjczMWZcIiAgLy8gRWRkeSdzIGlQYWQgUHJvXHJcbiAgICAvLyAgICAgICAgICAgICAvLyBdLFxyXG4gICAgLy8gICAgICAgICAgICAga2V5d29yZHM6IFtcImtleXdvcmQxXCIsIFwia2V5d29yZDJcIl0gLy8gYWRkIGtleXdvcmRzIGZvciBhZCB0YXJnZXRpbmdcclxuICAgIC8vICAgICAgICAgfSkudGhlbihcclxuICAgIC8vICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQWRNb2IgYmFubmVyIHNob3dpbmdcIik7XHJcbiAgICAvLyAgICAgICAgICAgICB9LFxyXG4gICAgLy8gICAgICAgICAgICAgZnVuY3Rpb24gKGVycm9yTWVzc2FnZSkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGFsZXJ0KFwiYWRtb2IgZXJyb3JcIik7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIClcclxuICAgIC8vICAgICB9LFxyXG4gICAgLy8gICAgIDEwMDApO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHB1YmxpYyBoaWRlQmFubmVyKCkge1xyXG4gICAgLy8gICAgIEFkbW9iLmhpZGVCYW5uZXIoKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcImFkbW9iIGhpZGVCYW5uZXIgZG9uZVwiKTtcclxuICAgIC8vICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcImFkbW9iIGhpZGVCYW5uZXIgZXJyb3I6IFwiICsgZXJyb3IpO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIHB1YmxpYyBjcmVhdGVJbnRlcnN0aXRpYWwoKSB7XHJcbiAgICAvLyAgICAgQWRtb2IuY3JlYXRlSW50ZXJzdGl0aWFsKHtcclxuICAgIC8vICAgICAgICAgdGVzdGluZzogdHJ1ZSxcclxuICAgIC8vICAgICAgICAgaW9zSW50ZXJzdGl0aWFsSWQ6IHRoaXMuaW9zSW50ZXJzdGl0aWFsSWQsXHJcbiAgICAvLyAgICAgICAgIGFuZHJvaWRJbnRlcnN0aXRpYWxJZDogdGhpcy5hbmRyb2lkSW50ZXJzdGl0aWFsSWQsXHJcbiAgICAvLyAgICAgICAgIGlvc1Rlc3REZXZpY2VJZHM6IFtcInlvdXJUZXN0RGV2aWNlVURJRHNcIl1cclxuICAgIC8vICAgICB9KS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcImFkbW9iIGNyZWF0ZUludGVyc3RpdGlhbCBkb25lXCIpO1xyXG4gICAgLy8gICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRtb2IgY3JlYXRlSW50ZXJzdGl0aWFsIGVycm9yOiBcIiArIGVycm9yKTtcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH1cclxufVxyXG4iXX0=