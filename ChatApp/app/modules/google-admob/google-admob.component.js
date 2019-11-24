"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page");
var firebase = require("nativescript-plugin-firebase");
var GoogleAdmobComponent = /** @class */ (function () {
    function GoogleAdmobComponent(page) {
        this.page = page;
        this.androidBannerId = "	ca-app-pub-3940256099942544/2934735716";
        this.androidBannerTestId = "ca-app-pub-3940256099942544/6300978111";
        this.androidInterstitialId = "ca-app-pub-5445779750154576/2145420061";
        this.androidInterstitialTestId = "ca-app-pub-3940256099942544/6300978111";
        this.iosBannerId = "ca-app-pub-RRRR/TTTT";
        this.iosInterstitialId = "ca-app-pub-GGGG/HHHH";
    }
    GoogleAdmobComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.page.actionBarHidden = true;
        setTimeout(function () {
            _this.createBanner();
        }, 5000);
        setInterval(function () {
            _this.createBanner();
        }, 60000);
    };
    GoogleAdmobComponent.prototype.createBanner = function () {
        firebase.admob.showBanner({
            size: firebase.admob.AD_SIZE.SMART_BANNER,
            margins: {
                bottom: 0,
            },
            androidBannerId: this.androidBannerTestId,
            iosBannerId: "ca-app-pub-9517346003011652/3985369721",
            testing: false,
            iosTestDeviceIds: [
                "45d77bf513dfabc2949ba053da83c0c7b7e87715",
                "fee4cf319a242eab4701543e4c16db89c722731f" // Eddy's iPad Pro
            ],
            keywords: ["keyword1", "keyword2"] // add keywords for ad targeting
        }).then(function () {
            console.log("AdMob banner showing");
        }, function (errorMessage) {
            alert({
                title: "AdMob error",
                message: errorMessage,
                okButtonText: "Hmmkay"
            });
        });
    };
    GoogleAdmobComponent.prototype.hideBanner = function () {
        firebase.admob.hideBanner().then(function () {
            console.log("admob hideBanner done");
        }, function (error) {
            console.log("admob hideBanner error: " + error);
        });
    };
    GoogleAdmobComponent.prototype.createInterstitial = function () {
        firebase.admob.showInterstitial({
            iosInterstitialId: "ca-app-pub-9517346003011652/6938836122",
            androidInterstitialId: this.androidInterstitialTestId,
            testing: true,
            // Android automatically adds the connected device as test device with testing:true, iOS does not
            iosTestDeviceIds: [
                "45d77bf513dfabc2949ba053da83c0c7b7e87715",
                "fee4cf319a242eab4701543e4c16db89c722731f" // Eddy's iPad Pro
            ],
            onAdClosed: function () { return console.log("Interstitial closed"); }
        }).then(function () {
            console.log("AdMob interstitial showing");
        }, function (errorMessage) {
            alert({
                title: "AdMob error",
                message: errorMessage,
                okButtonText: "Hmmkay"
            });
        });
    };
    GoogleAdmobComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'GoogleAdmob',
            templateUrl: './google-admob.component.html',
            styleUrls: ['./google-admob.component.scss']
        }),
        __metadata("design:paramtypes", [page_1.Page])
    ], GoogleAdmobComponent);
    return GoogleAdmobComponent;
}());
exports.GoogleAdmobComponent = GoogleAdmobComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWFkbW9iLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdvb2dsZS1hZG1vYi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsaURBQWdEO0FBQ2hELHVEQUF5RDtBQVN6RDtJQU9FLDhCQUNVLElBQVU7UUFBVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBUFosb0JBQWUsR0FBVyx5Q0FBeUMsQ0FBQztRQUNwRSx3QkFBbUIsR0FBVyx3Q0FBd0MsQ0FBQztRQUN2RSwwQkFBcUIsR0FBVyx3Q0FBd0MsQ0FBQztRQUN6RSw4QkFBeUIsR0FBVyx3Q0FBd0MsQ0FBQztRQUM3RSxnQkFBVyxHQUFXLHNCQUFzQixDQUFDO1FBQzdDLHNCQUFpQixHQUFXLHNCQUFzQixDQUFDO0lBSTNELENBQUM7SUFFRCx1Q0FBUSxHQUFSO1FBQUEsaUJBUUM7UUFQQyxvQ0FBb0M7UUFDcEMsVUFBVSxDQUFDO1lBQ1QsS0FBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RCLENBQUMsRUFBQyxJQUFJLENBQUMsQ0FBQztRQUNSLFdBQVcsQ0FBQztZQUNWLEtBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QixDQUFDLEVBQUMsS0FBSyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU0sMkNBQVksR0FBbkI7UUFDRSxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztZQUN4QixJQUFJLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWTtZQUN6QyxPQUFPLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFLENBQUM7YUFFVjtZQUNELGVBQWUsRUFBRSxJQUFJLENBQUMsbUJBQW1CO1lBQ3pDLFdBQVcsRUFBRSx3Q0FBd0M7WUFDckQsT0FBTyxFQUFFLEtBQUs7WUFDZCxnQkFBZ0IsRUFBRTtnQkFDZCwwQ0FBMEM7Z0JBQzFDLDBDQUEwQyxDQUFFLGtCQUFrQjthQUNqRTtZQUNELFFBQVEsRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxnQ0FBZ0M7U0FDcEUsQ0FBQyxDQUFDLElBQUksQ0FDSDtZQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUN0QyxDQUFDLEVBQ0QsVUFBVSxZQUFZO1lBQ3BCLEtBQUssQ0FBQztnQkFDSixLQUFLLEVBQUUsYUFBYTtnQkFDcEIsT0FBTyxFQUFFLFlBQVk7Z0JBQ3JCLFlBQVksRUFBRSxRQUFRO2FBQ3ZCLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FDSixDQUFDO0lBQ0osQ0FBQztJQUVNLHlDQUFVLEdBQWpCO1FBQ0UsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsRUFBRSxVQUFTLEtBQUs7WUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLGlEQUFrQixHQUF6QjtRQUNFLFFBQVEsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7WUFDOUIsaUJBQWlCLEVBQUUsd0NBQXdDO1lBQzNELHFCQUFxQixFQUFFLElBQUksQ0FBQyx5QkFBeUI7WUFDckQsT0FBTyxFQUFFLElBQUk7WUFDYixpR0FBaUc7WUFDakcsZ0JBQWdCLEVBQUU7Z0JBQ2hCLDBDQUEwQztnQkFDMUMsMENBQTBDLENBQUUsa0JBQWtCO2FBQy9EO1lBQ0QsVUFBVSxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLEVBQWxDLENBQWtDO1NBQ3JELENBQUMsQ0FBQyxJQUFJLENBQ0g7WUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLENBQUM7UUFDNUMsQ0FBQyxFQUNELFVBQUEsWUFBWTtZQUNWLEtBQUssQ0FBQztnQkFDSixLQUFLLEVBQUUsYUFBYTtnQkFDcEIsT0FBTyxFQUFFLFlBQVk7Z0JBQ3JCLFlBQVksRUFBRSxRQUFRO2FBQ3ZCLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FDSixDQUFDO0lBQ0osQ0FBQztJQWxGVSxvQkFBb0I7UUFOaEMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsYUFBYTtZQUN2QixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO1NBQzdDLENBQUM7eUNBU2dCLFdBQUk7T0FSVCxvQkFBb0IsQ0FtRmhDO0lBQUQsMkJBQUM7Q0FBQSxBQW5GRCxJQW1GQztBQW5GWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xyXG5pbXBvcnQgKiBhcyBmaXJlYmFzZSBmcm9tIFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiO1xyXG5pbXBvcnQgeyBpc0lPUyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHNlbGVjdG9yOiAnR29vZ2xlQWRtb2InLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9nb29nbGUtYWRtb2IuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2dvb2dsZS1hZG1vYi5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHb29nbGVBZG1vYkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcHJpdmF0ZSBhbmRyb2lkQmFubmVySWQ6IHN0cmluZyA9IFwiXHRjYS1hcHAtcHViLTM5NDAyNTYwOTk5NDI1NDQvMjkzNDczNTcxNlwiO1xyXG4gIHByaXZhdGUgYW5kcm9pZEJhbm5lclRlc3RJZDogc3RyaW5nID0gXCJjYS1hcHAtcHViLTM5NDAyNTYwOTk5NDI1NDQvNjMwMDk3ODExMVwiO1xyXG4gIHByaXZhdGUgYW5kcm9pZEludGVyc3RpdGlhbElkOiBzdHJpbmcgPSBcImNhLWFwcC1wdWItNTQ0NTc3OTc1MDE1NDU3Ni8yMTQ1NDIwMDYxXCI7XHJcbiAgcHJpdmF0ZSBhbmRyb2lkSW50ZXJzdGl0aWFsVGVzdElkOiBzdHJpbmcgPSBcImNhLWFwcC1wdWItMzk0MDI1NjA5OTk0MjU0NC82MzAwOTc4MTExXCI7XHJcbiAgcHJpdmF0ZSBpb3NCYW5uZXJJZDogc3RyaW5nID0gXCJjYS1hcHAtcHViLVJSUlIvVFRUVFwiO1xyXG4gIHByaXZhdGUgaW9zSW50ZXJzdGl0aWFsSWQ6IHN0cmluZyA9IFwiY2EtYXBwLXB1Yi1HR0dHL0hISEhcIjtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgcGFnZTogUGFnZVxyXG4gICkgeyBcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkgeyBcclxuICAgIC8vIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xyXG4gICAgc2V0VGltZW91dCgoKT0+e1xyXG4gICAgICB0aGlzLmNyZWF0ZUJhbm5lcigpO1xyXG4gICAgfSw1MDAwKTtcclxuICAgIHNldEludGVydmFsKCgpPT57XHJcbiAgICAgIHRoaXMuY3JlYXRlQmFubmVyKCk7XHJcbiAgICB9LDYwMDAwKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBjcmVhdGVCYW5uZXIoKSB7XHJcbiAgICBmaXJlYmFzZS5hZG1vYi5zaG93QmFubmVyKHtcclxuICAgICAgc2l6ZTogZmlyZWJhc2UuYWRtb2IuQURfU0laRS5TTUFSVF9CQU5ORVIsIC8vIHNlZSBmaXJlYmFzZS5hZG1vYi5BRF9TSVpFIGZvciBhbGwgb3B0aW9uc1xyXG4gICAgICBtYXJnaW5zOiB7IC8vIG9wdGlvbmFsIG5yIG9mIGRldmljZSBpbmRlcGVuZGVudCBwaXhlbHMgZnJvbSB0aGUgdG9wIG9yIGJvdHRvbSAoZG9uJ3Qgc2V0IGJvdGgpXHJcbiAgICAgICAgYm90dG9tOiAwLFxyXG4gICAgICAgIC8vIHRvcDogMzAwXHJcbiAgICAgIH0sXHJcbiAgICAgIGFuZHJvaWRCYW5uZXJJZDogdGhpcy5hbmRyb2lkQmFubmVyVGVzdElkLFxyXG4gICAgICBpb3NCYW5uZXJJZDogXCJjYS1hcHAtcHViLTk1MTczNDYwMDMwMTE2NTIvMzk4NTM2OTcyMVwiLFxyXG4gICAgICB0ZXN0aW5nOiBmYWxzZSwgLy8gd2hlbiBub3QgcnVubmluZyBpbiBwcm9kdWN0aW9uIHNldCB0aGlzIHRvIHRydWUsIEdvb2dsZSBkb2Vzbid0IGxpa2UgaXQgYW55IG90aGVyIHdheVxyXG4gICAgICBpb3NUZXN0RGV2aWNlSWRzOiBbIC8vQW5kcm9pZCBhdXRvbWF0aWNhbGx5IGFkZHMgdGhlIGNvbm5lY3RlZCBkZXZpY2UgYXMgdGVzdCBkZXZpY2Ugd2l0aCB0ZXN0aW5nOnRydWUsIGlPUyBkb2VzIG5vdFxyXG4gICAgICAgICAgXCI0NWQ3N2JmNTEzZGZhYmMyOTQ5YmEwNTNkYTgzYzBjN2I3ZTg3NzE1XCIsIC8vIEVkZHkncyBpUGhvbmUgNnNcclxuICAgICAgICAgIFwiZmVlNGNmMzE5YTI0MmVhYjQ3MDE1NDNlNGMxNmRiODljNzIyNzMxZlwiICAvLyBFZGR5J3MgaVBhZCBQcm9cclxuICAgICAgXSxcclxuICAgICAga2V5d29yZHM6IFtcImtleXdvcmQxXCIsIFwia2V5d29yZDJcIl0gLy8gYWRkIGtleXdvcmRzIGZvciBhZCB0YXJnZXRpbmdcclxuICAgIH0pLnRoZW4oXHJcbiAgICAgICAgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJBZE1vYiBiYW5uZXIgc2hvd2luZ1wiKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZ1bmN0aW9uIChlcnJvck1lc3NhZ2UpIHtcclxuICAgICAgICAgIGFsZXJ0KHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiQWRNb2IgZXJyb3JcIixcclxuICAgICAgICAgICAgbWVzc2FnZTogZXJyb3JNZXNzYWdlLFxyXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiSG1ta2F5XCJcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaGlkZUJhbm5lcigpIHtcclxuICAgIGZpcmViYXNlLmFkbW9iLmhpZGVCYW5uZXIoKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWRtb2IgaGlkZUJhbm5lciBkb25lXCIpO1xyXG4gICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImFkbW9iIGhpZGVCYW5uZXIgZXJyb3I6IFwiICsgZXJyb3IpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY3JlYXRlSW50ZXJzdGl0aWFsKCkge1xyXG4gICAgZmlyZWJhc2UuYWRtb2Iuc2hvd0ludGVyc3RpdGlhbCh7XHJcbiAgICAgIGlvc0ludGVyc3RpdGlhbElkOiBcImNhLWFwcC1wdWItOTUxNzM0NjAwMzAxMTY1Mi82OTM4ODM2MTIyXCIsXHJcbiAgICAgIGFuZHJvaWRJbnRlcnN0aXRpYWxJZDogdGhpcy5hbmRyb2lkSW50ZXJzdGl0aWFsVGVzdElkLFxyXG4gICAgICB0ZXN0aW5nOiB0cnVlLFxyXG4gICAgICAvLyBBbmRyb2lkIGF1dG9tYXRpY2FsbHkgYWRkcyB0aGUgY29ubmVjdGVkIGRldmljZSBhcyB0ZXN0IGRldmljZSB3aXRoIHRlc3Rpbmc6dHJ1ZSwgaU9TIGRvZXMgbm90XHJcbiAgICAgIGlvc1Rlc3REZXZpY2VJZHM6IFtcclxuICAgICAgICBcIjQ1ZDc3YmY1MTNkZmFiYzI5NDliYTA1M2RhODNjMGM3YjdlODc3MTVcIiwgLy8gRWRkeSdzIGlQaG9uZSA2c1xyXG4gICAgICAgIFwiZmVlNGNmMzE5YTI0MmVhYjQ3MDE1NDNlNGMxNmRiODljNzIyNzMxZlwiICAvLyBFZGR5J3MgaVBhZCBQcm9cclxuICAgICAgXSxcclxuICAgICAgb25BZENsb3NlZDogKCkgPT4gY29uc29sZS5sb2coXCJJbnRlcnN0aXRpYWwgY2xvc2VkXCIpXHJcbiAgICB9KS50aGVuKFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiQWRNb2IgaW50ZXJzdGl0aWFsIHNob3dpbmdcIik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvck1lc3NhZ2UgPT4ge1xyXG4gICAgICAgICAgYWxlcnQoe1xyXG4gICAgICAgICAgICB0aXRsZTogXCJBZE1vYiBlcnJvclwiLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvck1lc3NhZ2UsXHJcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJIbW1rYXlcIlxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19