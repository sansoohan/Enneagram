"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var ApplicationSettings = require("application-settings");
var firebase_service_1 = require("../services/firebase.service");
var firebase = require("nativescript-plugin-firebase");
var page_1 = require("tns-core-modules/ui/page");
var auth_model_1 = require("./auth.model");
var LoginComponent = /** @class */ (function () {
    // private androidInterstitialId: string = "ca-app-pub-3940256099942544/6300978111";
    // private iosBannerId: string = "ca-app-pub-RRRR/TTTT";
    // private iosInterstitialId: string = "ca-app-pub-GGGG/HHHH";
    function LoginComponent(router, routerExtensions, firebaseService, page) {
        this.router = router;
        this.routerExtensions = routerExtensions;
        this.firebaseService = firebaseService;
        this.page = page;
        this.auth = new auth_model_1.Auth();
        this.androidBannerId = "ca-app-pub-5445779750154576/7005154644";
        this.showBanner();
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (ApplicationSettings.getBoolean("authenticated", false)) {
            this.router.navigate(["/home"], { clearHistory: true });
            this.firebaseService.setCurrentUser();
        }
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
    // public createBanner() {
    //     Admob.createBanner({
    //         testing: true,
    //         size: Admob.AD_SIZE.SMART_BANNER,
    //         iosBannerId: this.iosBannerId,
    //         androidBannerId: this.androidBannerId,
    //         iosTestDeviceIds: ["yourTestDeviceUDIDs"],
    //         margins: {
    //             bottom: 0
    //         }
    //     }).then(function() {
    //         console.log("admob createBanner done");
    //     }, function(error) {
    //         console.log("admob createBanner error: " + error);
    //     });
    // }
    LoginComponent.prototype.showBanner = function () {
        setTimeout(function () {
            firebase.admob.showBanner({
                size: firebase.admob.AD_SIZE.SMART_BANNER,
                margins: {
                    // bottom: 10,
                    top: 0
                },
                androidBannerId: "ca-app-pub-5445779750154576/7005154644",
                // iosBannerId: "ca-app-pub-9517346003011652/3985369721",
                testing: false,
                // iosTestDeviceIds: [ //Android automatically adds the connected device as test device with testing:true, iOS does not
                //     "45d77bf513dfabc2949ba053da83c0c7b7e87715", // Eddy's iPhone 6s
                //     "fee4cf319a242eab4701543e4c16db89c722731f"  // Eddy's iPad Pro
                // ],
                keywords: ["keyword1", "keyword2"] // add keywords for ad targeting
            }).then(function () {
                console.log("AdMob banner showing");
            }, function (errorMessage) {
                alert("admob error");
            });
        }, 1000);
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
            firebase_service_1.FirebaseService,
            page_1.Page])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUErRDtBQUMvRCwwREFBNEQ7QUFDNUQsaUVBQTZEO0FBQzdELHVEQUEwRDtBQUUxRCxpREFBZ0Q7QUFHaEQsMkNBQWtDO0FBV2xDO0lBSUksb0ZBQW9GO0lBQ3BGLHdEQUF3RDtJQUN4RCw4REFBOEQ7SUFFOUQsd0JBQTJCLE1BQXdCLEVBQ3ZDLGdCQUFrQyxFQUNsQyxlQUFnQyxFQUNoQyxJQUFVO1FBSEssV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDdkMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQVZmLFNBQUksR0FBUSxJQUFJLGlCQUFJLEVBQUUsQ0FBQztRQUV0QixvQkFBZSxHQUFXLHdDQUF3QyxDQUFDO1FBVXZFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRU0saUNBQVEsR0FBZjtRQUNJLEVBQUUsQ0FBQSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzFDLENBQUM7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDckMsQ0FBQztJQUVNLHFDQUFZLEdBQW5CLFVBQW9CLElBQVM7UUFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVNLHdDQUFlLEdBQXRCO1FBQ0ksSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBRU0sc0NBQWEsR0FBcEI7UUFDSSxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFTSxvQ0FBVyxHQUFsQixVQUFtQixJQUFJO0lBRXZCLENBQUM7SUFFRCwwQkFBMEI7SUFDMUIsMkJBQTJCO0lBQzNCLHlCQUF5QjtJQUN6Qiw0Q0FBNEM7SUFDNUMseUNBQXlDO0lBQ3pDLGlEQUFpRDtJQUNqRCxxREFBcUQ7SUFDckQscUJBQXFCO0lBQ3JCLHdCQUF3QjtJQUN4QixZQUFZO0lBQ1osMkJBQTJCO0lBQzNCLGtEQUFrRDtJQUNsRCwyQkFBMkI7SUFDM0IsNkRBQTZEO0lBQzdELFVBQVU7SUFDVixJQUFJO0lBRUcsbUNBQVUsR0FBakI7UUFDSSxVQUFVLENBQUM7WUFDUCxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztnQkFDdEIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVk7Z0JBQ3pDLE9BQU8sRUFBRTtvQkFDVCxjQUFjO29CQUNkLEdBQUcsRUFBRSxDQUFDO2lCQUNMO2dCQUNELGVBQWUsRUFBRSx3Q0FBd0M7Z0JBQ3pELHlEQUF5RDtnQkFDekQsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsdUhBQXVIO2dCQUN2SCxzRUFBc0U7Z0JBQ3RFLHFFQUFxRTtnQkFDckUsS0FBSztnQkFDTCxRQUFRLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsZ0NBQWdDO2FBQ3RFLENBQUMsQ0FBQyxJQUFJLENBQ0g7Z0JBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ3BDLENBQUMsRUFDRCxVQUFVLFlBQVk7Z0JBQ2xCLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN6QixDQUFDLENBQ0osQ0FBQTtRQUNMLENBQUMsRUFDRCxJQUFJLENBQUMsQ0FBQztJQUNWLENBQUM7SUFwRlEsY0FBYztRQU4xQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSxzQkFBc0I7WUFDbkMsU0FBUyxFQUFFLENBQUMsdUJBQXVCLENBQUM7U0FDdkMsQ0FBQzt5Q0FTcUMseUJBQWdCO1lBQ3JCLHlCQUFnQjtZQUNqQixrQ0FBZTtZQUMxQixXQUFJO09BWGIsY0FBYyxDQTBHMUI7SUFBRCxxQkFBQztDQUFBLEFBMUdELElBMEdDO0FBMUdZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgKiBhcyBBcHBsaWNhdGlvblNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xyXG5pbXBvcnQge0ZpcmViYXNlU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZSc7XHJcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xyXG5cclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcclxuXHJcbmltcG9ydCB7VXNlcn0gZnJvbSAnLi4vbW9kZWxzL3VzZXIubW9kZWwnO1xyXG5pbXBvcnQge0F1dGh9IGZyb20gXCIuL2F1dGgubW9kZWxcIjtcclxuXHJcbi8vIGltcG9ydCAqIGFzIEFkbW9iIGZyb20gXCJuYXRpdmVzY3JpcHQtYWRtb2JcIjtcclxuaW1wb3J0IHsgaXNJT1MgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6IFwicnItbG9naW5cIixcclxuICAgIHRlbXBsYXRlVXJsOiBcImxvZ2luLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFsnLi9sb2dpbi5jb21wb25lbnQuY3NzJ10sXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMb2dpbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwdWJsaWMgYXV0aDpBdXRoID0gbmV3IEF1dGgoKTtcclxuICAgIHB1YmxpYyBtZXNzYWdlOnN0cmluZztcclxuICAgIHByaXZhdGUgYW5kcm9pZEJhbm5lcklkOiBzdHJpbmcgPSBcImNhLWFwcC1wdWItNTQ0NTc3OTc1MDE1NDU3Ni83MDA1MTU0NjQ0XCI7XHJcbiAgICAvLyBwcml2YXRlIGFuZHJvaWRJbnRlcnN0aXRpYWxJZDogc3RyaW5nID0gXCJjYS1hcHAtcHViLTM5NDAyNTYwOTk5NDI1NDQvNjMwMDk3ODExMVwiO1xyXG4gICAgLy8gcHJpdmF0ZSBpb3NCYW5uZXJJZDogc3RyaW5nID0gXCJjYS1hcHAtcHViLVJSUlIvVFRUVFwiO1xyXG4gICAgLy8gcHJpdmF0ZSBpb3NJbnRlcnN0aXRpYWxJZDogc3RyaW5nID0gXCJjYS1hcHAtcHViLUdHR0cvSEhISFwiO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICAgICAgcHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSxcclxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2VcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuc2hvd0Jhbm5lcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBuZ09uSW5pdCgpIHtcclxuICAgICAgICBpZihBcHBsaWNhdGlvblNldHRpbmdzLmdldEJvb2xlYW4oXCJhdXRoZW50aWNhdGVkXCIsIGZhbHNlKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvaG9tZVwiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnNldEN1cnJlbnRVc2VyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9naW5CeUVtYWlsKGF1dGg6QXV0aCkge1xyXG4gICAgICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmxvZ2luQnlFbWFpbChhdXRoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9naW5CeUZhY2Vib29rKCl7XHJcbiAgICAgICAgdGhpcy5maXJlYmFzZVNlcnZpY2UubG9naW5CeUZhY2Vib29rKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGxvZ2luQnlHb29nbGUoKXtcclxuICAgICAgICB0aGlzLmZpcmViYXNlU2VydmljZS5sb2dpbkJ5R29vZ2xlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhhbmRsZUlucHV0KGFyZ3Mpe1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8vIHB1YmxpYyBjcmVhdGVCYW5uZXIoKSB7XHJcbiAgICAvLyAgICAgQWRtb2IuY3JlYXRlQmFubmVyKHtcclxuICAgIC8vICAgICAgICAgdGVzdGluZzogdHJ1ZSxcclxuICAgIC8vICAgICAgICAgc2l6ZTogQWRtb2IuQURfU0laRS5TTUFSVF9CQU5ORVIsXHJcbiAgICAvLyAgICAgICAgIGlvc0Jhbm5lcklkOiB0aGlzLmlvc0Jhbm5lcklkLFxyXG4gICAgLy8gICAgICAgICBhbmRyb2lkQmFubmVySWQ6IHRoaXMuYW5kcm9pZEJhbm5lcklkLFxyXG4gICAgLy8gICAgICAgICBpb3NUZXN0RGV2aWNlSWRzOiBbXCJ5b3VyVGVzdERldmljZVVESURzXCJdLFxyXG4gICAgLy8gICAgICAgICBtYXJnaW5zOiB7XHJcbiAgICAvLyAgICAgICAgICAgICBib3R0b206IDBcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH0pLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRtb2IgY3JlYXRlQmFubmVyIGRvbmVcIik7XHJcbiAgICAvLyAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJhZG1vYiBjcmVhdGVCYW5uZXIgZXJyb3I6IFwiICsgZXJyb3IpO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIHB1YmxpYyBzaG93QmFubmVyKCl7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGZpcmViYXNlLmFkbW9iLnNob3dCYW5uZXIoe1xyXG4gICAgICAgICAgICAgICAgc2l6ZTogZmlyZWJhc2UuYWRtb2IuQURfU0laRS5TTUFSVF9CQU5ORVIsIC8vIHNlZSBmaXJlYmFzZS5hZG1vYi5BRF9TSVpFIGZvciBhbGwgb3B0aW9uc1xyXG4gICAgICAgICAgICAgICAgbWFyZ2luczogeyAvLyBvcHRmc2RmaW9uYWwgbnIgb2YgZGV2aWNlIGluZGVwZW5kZW50IHBpeGVscyBmcm9tIHRoZSB0b3Agb3IgYm90dG9tIChkb24ndCBzZXQgYm90aClcclxuICAgICAgICAgICAgICAgIC8vIGJvdHRvbTogMTAsXHJcbiAgICAgICAgICAgICAgICB0b3A6IDBcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhbmRyb2lkQmFubmVySWQ6IFwiY2EtYXBwLXB1Yi01NDQ1Nzc5NzUwMTU0NTc2LzcwMDUxNTQ2NDRcIixcclxuICAgICAgICAgICAgICAgIC8vIGlvc0Jhbm5lcklkOiBcImNhLWFwcC1wdWItOTUxNzM0NjAwMzAxMTY1Mi8zOTg1MzY5NzIxXCIsXHJcbiAgICAgICAgICAgICAgICB0ZXN0aW5nOiBmYWxzZSwgLy8gd2hlbiBub3QgcnVubmluZyBpbiBwcm9kdWN0aW9uIHNldCB0aGlzIHRvIHRydWUsIEdvb2dsZSBkb2Vzbid0IGxpa2UgaXQgYW55IG90aGVyIHdheVxyXG4gICAgICAgICAgICAgICAgLy8gaW9zVGVzdERldmljZUlkczogWyAvL0FuZHJvaWQgYXV0b21hdGljYWxseSBhZGRzIHRoZSBjb25uZWN0ZWQgZGV2aWNlIGFzIHRlc3QgZGV2aWNlIHdpdGggdGVzdGluZzp0cnVlLCBpT1MgZG9lcyBub3RcclxuICAgICAgICAgICAgICAgIC8vICAgICBcIjQ1ZDc3YmY1MTNkZmFiYzI5NDliYTA1M2RhODNjMGM3YjdlODc3MTVcIiwgLy8gRWRkeSdzIGlQaG9uZSA2c1xyXG4gICAgICAgICAgICAgICAgLy8gICAgIFwiZmVlNGNmMzE5YTI0MmVhYjQ3MDE1NDNlNGMxNmRiODljNzIyNzMxZlwiICAvLyBFZGR5J3MgaVBhZCBQcm9cclxuICAgICAgICAgICAgICAgIC8vIF0sXHJcbiAgICAgICAgICAgICAgICBrZXl3b3JkczogW1wia2V5d29yZDFcIiwgXCJrZXl3b3JkMlwiXSAvLyBhZGQga2V5d29yZHMgZm9yIGFkIHRhcmdldGluZ1xyXG4gICAgICAgICAgICB9KS50aGVuKFxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBZE1vYiBiYW5uZXIgc2hvd2luZ1wiKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZXJyb3JNZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJhZG1vYiBlcnJvclwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHVibGljIGhpZGVCYW5uZXIoKSB7XHJcbiAgICAvLyAgICAgQWRtb2IuaGlkZUJhbm5lcigpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRtb2IgaGlkZUJhbm5lciBkb25lXCIpO1xyXG4gICAgLy8gICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRtb2IgaGlkZUJhbm5lciBlcnJvcjogXCIgKyBlcnJvcik7XHJcbiAgICAvLyAgICAgfSk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gcHVibGljIGNyZWF0ZUludGVyc3RpdGlhbCgpIHtcclxuICAgIC8vICAgICBBZG1vYi5jcmVhdGVJbnRlcnN0aXRpYWwoe1xyXG4gICAgLy8gICAgICAgICB0ZXN0aW5nOiB0cnVlLFxyXG4gICAgLy8gICAgICAgICBpb3NJbnRlcnN0aXRpYWxJZDogdGhpcy5pb3NJbnRlcnN0aXRpYWxJZCxcclxuICAgIC8vICAgICAgICAgYW5kcm9pZEludGVyc3RpdGlhbElkOiB0aGlzLmFuZHJvaWRJbnRlcnN0aXRpYWxJZCxcclxuICAgIC8vICAgICAgICAgaW9zVGVzdERldmljZUlkczogW1wieW91clRlc3REZXZpY2VVRElEc1wiXVxyXG4gICAgLy8gICAgIH0pLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRtb2IgY3JlYXRlSW50ZXJzdGl0aWFsIGRvbmVcIik7XHJcbiAgICAvLyAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coXCJhZG1vYiBjcmVhdGVJbnRlcnN0aXRpYWwgZXJyb3I6IFwiICsgZXJyb3IpO1xyXG4gICAgLy8gICAgIH0pO1xyXG4gICAgLy8gfVxyXG59XHJcbiJdfQ==