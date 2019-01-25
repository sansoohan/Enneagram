"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("tns-core-modules/ui/page");
var firebase = require("nativescript-plugin-firebase");
var AdmobComponent = /** @class */ (function () {
    function AdmobComponent(page) {
        this.page = page;
        this.androidBannerId = "ca-app-pub-5445779750154576/7005154644";
        this.androidInterstitialId = "ca-app-pub-5445779750154576/2145420061";
        this.iosBannerId = "ca-app-pub-RRRR/TTTT";
        this.iosInterstitialId = "ca-app-pub-GGGG/HHHH";
    }
    AdmobComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
    };
    AdmobComponent.prototype.createBanner = function () {
        firebase.admob.showBanner({
            size: firebase.admob.AD_SIZE.SMART_BANNER,
            margins: {
                bottom: 10,
                top: 300
            },
            androidBannerId: this.androidBannerId,
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
    AdmobComponent.prototype.hideBanner = function () {
        firebase.admob.hideBanner().then(function () {
            console.log("admob hideBanner done");
        }, function (error) {
            console.log("admob hideBanner error: " + error);
        });
    };
    AdmobComponent.prototype.createInterstitial = function () {
        firebase.admob.showInterstitial({
            iosInterstitialId: "ca-app-pub-9517346003011652/6938836122",
            androidInterstitialId: this.androidInterstitialId,
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
    AdmobComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'Admob',
            templateUrl: './admob.component.html',
            styleUrls: ['./admob.component.scss']
        }),
        __metadata("design:paramtypes", [page_1.Page])
    ], AdmobComponent);
    return AdmobComponent;
}());
exports.AdmobComponent = AdmobComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtb2IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRtb2IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELGlEQUFnRDtBQUNoRCx1REFBeUQ7QUFTekQ7SUFLRSx3QkFDVSxJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUxaLG9CQUFlLEdBQVcsd0NBQXdDLENBQUM7UUFDbkUsMEJBQXFCLEdBQVcsd0NBQXdDLENBQUM7UUFDekUsZ0JBQVcsR0FBVyxzQkFBc0IsQ0FBQztRQUM3QyxzQkFBaUIsR0FBVyxzQkFBc0IsQ0FBQztJQUkzRCxDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUVFLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBRU0scUNBQVksR0FBbkI7UUFDRSxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztZQUN4QixJQUFJLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWTtZQUN6QyxPQUFPLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsR0FBRyxFQUFFLEdBQUc7YUFDVDtZQUNELGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxXQUFXLEVBQUUsd0NBQXdDO1lBQ3JELE9BQU8sRUFBRSxLQUFLO1lBQ2QsZ0JBQWdCLEVBQUU7Z0JBQ2QsMENBQTBDO2dCQUMxQywwQ0FBMEMsQ0FBRSxrQkFBa0I7YUFDakU7WUFDRCxRQUFRLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsZ0NBQWdDO1NBQ3BFLENBQUMsQ0FBQyxJQUFJLENBQ0g7WUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDdEMsQ0FBQyxFQUNELFVBQVUsWUFBWTtZQUNwQixLQUFLLENBQUM7Z0JBQ0osS0FBSyxFQUFFLGFBQWE7Z0JBQ3BCLE9BQU8sRUFBRSxZQUFZO2dCQUNyQixZQUFZLEVBQUUsUUFBUTthQUN2QixDQUFDLENBQUM7UUFDTCxDQUFDLENBQ0osQ0FBQztJQUNKLENBQUM7SUFFTSxtQ0FBVSxHQUFqQjtRQUNFLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUN6QyxDQUFDLEVBQUUsVUFBUyxLQUFLO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSwyQ0FBa0IsR0FBekI7UUFDRSxRQUFRLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO1lBQzlCLGlCQUFpQixFQUFFLHdDQUF3QztZQUMzRCxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCO1lBQ2pELE9BQU8sRUFBRSxJQUFJO1lBQ2IsaUdBQWlHO1lBQ2pHLGdCQUFnQixFQUFFO2dCQUNoQiwwQ0FBMEM7Z0JBQzFDLDBDQUEwQyxDQUFFLGtCQUFrQjthQUMvRDtZQUNELFVBQVUsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFsQyxDQUFrQztTQUNyRCxDQUFDLENBQUMsSUFBSSxDQUNIO1lBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQzVDLENBQUMsRUFDRCxVQUFBLFlBQVk7WUFDVixLQUFLLENBQUM7Z0JBQ0osS0FBSyxFQUFFLGFBQWE7Z0JBQ3BCLE9BQU8sRUFBRSxZQUFZO2dCQUNyQixZQUFZLEVBQUUsUUFBUTthQUN2QixDQUFDLENBQUM7UUFDTCxDQUFDLENBQ0osQ0FBQztJQUNKLENBQUM7SUEzRVUsY0FBYztRQU4xQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7U0FDdEMsQ0FBQzt5Q0FPZ0IsV0FBSTtPQU5ULGNBQWMsQ0E0RTFCO0lBQUQscUJBQUM7Q0FBQSxBQTVFRCxJQTRFQztBQTVFWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XHJcbmltcG9ydCAqIGFzIGZpcmViYXNlIGZyb20gXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCI7XHJcbmltcG9ydCB7IGlzSU9TIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm1cIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgc2VsZWN0b3I6ICdBZG1vYicsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FkbW9iLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9hZG1vYi5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBZG1vYkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcHJpdmF0ZSBhbmRyb2lkQmFubmVySWQ6IHN0cmluZyA9IFwiY2EtYXBwLXB1Yi01NDQ1Nzc5NzUwMTU0NTc2LzcwMDUxNTQ2NDRcIjtcclxuICBwcml2YXRlIGFuZHJvaWRJbnRlcnN0aXRpYWxJZDogc3RyaW5nID0gXCJjYS1hcHAtcHViLTU0NDU3Nzk3NTAxNTQ1NzYvMjE0NTQyMDA2MVwiO1xyXG4gIHByaXZhdGUgaW9zQmFubmVySWQ6IHN0cmluZyA9IFwiY2EtYXBwLXB1Yi1SUlJSL1RUVFRcIjtcclxuICBwcml2YXRlIGlvc0ludGVyc3RpdGlhbElkOiBzdHJpbmcgPSBcImNhLWFwcC1wdWItR0dHRy9ISEhIXCI7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHBhZ2U6IFBhZ2VcclxuICApIHsgXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHsgXHJcblxyXG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY3JlYXRlQmFubmVyKCkge1xyXG4gICAgZmlyZWJhc2UuYWRtb2Iuc2hvd0Jhbm5lcih7XHJcbiAgICAgIHNpemU6IGZpcmViYXNlLmFkbW9iLkFEX1NJWkUuU01BUlRfQkFOTkVSLCAvLyBzZWUgZmlyZWJhc2UuYWRtb2IuQURfU0laRSBmb3IgYWxsIG9wdGlvbnNcclxuICAgICAgbWFyZ2luczogeyAvLyBvcHRpb25hbCBuciBvZiBkZXZpY2UgaW5kZXBlbmRlbnQgcGl4ZWxzIGZyb20gdGhlIHRvcCBvciBib3R0b20gKGRvbid0IHNldCBib3RoKVxyXG4gICAgICAgIGJvdHRvbTogMTAsXHJcbiAgICAgICAgdG9wOiAzMDBcclxuICAgICAgfSxcclxuICAgICAgYW5kcm9pZEJhbm5lcklkOiB0aGlzLmFuZHJvaWRCYW5uZXJJZCxcclxuICAgICAgaW9zQmFubmVySWQ6IFwiY2EtYXBwLXB1Yi05NTE3MzQ2MDAzMDExNjUyLzM5ODUzNjk3MjFcIixcclxuICAgICAgdGVzdGluZzogZmFsc2UsIC8vIHdoZW4gbm90IHJ1bm5pbmcgaW4gcHJvZHVjdGlvbiBzZXQgdGhpcyB0byB0cnVlLCBHb29nbGUgZG9lc24ndCBsaWtlIGl0IGFueSBvdGhlciB3YXlcclxuICAgICAgaW9zVGVzdERldmljZUlkczogWyAvL0FuZHJvaWQgYXV0b21hdGljYWxseSBhZGRzIHRoZSBjb25uZWN0ZWQgZGV2aWNlIGFzIHRlc3QgZGV2aWNlIHdpdGggdGVzdGluZzp0cnVlLCBpT1MgZG9lcyBub3RcclxuICAgICAgICAgIFwiNDVkNzdiZjUxM2RmYWJjMjk0OWJhMDUzZGE4M2MwYzdiN2U4NzcxNVwiLCAvLyBFZGR5J3MgaVBob25lIDZzXHJcbiAgICAgICAgICBcImZlZTRjZjMxOWEyNDJlYWI0NzAxNTQzZTRjMTZkYjg5YzcyMjczMWZcIiAgLy8gRWRkeSdzIGlQYWQgUHJvXHJcbiAgICAgIF0sXHJcbiAgICAgIGtleXdvcmRzOiBbXCJrZXl3b3JkMVwiLCBcImtleXdvcmQyXCJdIC8vIGFkZCBrZXl3b3JkcyBmb3IgYWQgdGFyZ2V0aW5nXHJcbiAgICB9KS50aGVuKFxyXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiQWRNb2IgYmFubmVyIHNob3dpbmdcIik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmdW5jdGlvbiAoZXJyb3JNZXNzYWdlKSB7XHJcbiAgICAgICAgICBhbGVydCh7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIkFkTW9iIGVycm9yXCIsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yTWVzc2FnZSxcclxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIkhtbWtheVwiXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGhpZGVCYW5uZXIoKSB7XHJcbiAgICBmaXJlYmFzZS5hZG1vYi5oaWRlQmFubmVyKCkudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImFkbW9iIGhpZGVCYW5uZXIgZG9uZVwiKTtcclxuICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhZG1vYiBoaWRlQmFubmVyIGVycm9yOiBcIiArIGVycm9yKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNyZWF0ZUludGVyc3RpdGlhbCgpIHtcclxuICAgIGZpcmViYXNlLmFkbW9iLnNob3dJbnRlcnN0aXRpYWwoe1xyXG4gICAgICBpb3NJbnRlcnN0aXRpYWxJZDogXCJjYS1hcHAtcHViLTk1MTczNDYwMDMwMTE2NTIvNjkzODgzNjEyMlwiLFxyXG4gICAgICBhbmRyb2lkSW50ZXJzdGl0aWFsSWQ6IHRoaXMuYW5kcm9pZEludGVyc3RpdGlhbElkLFxyXG4gICAgICB0ZXN0aW5nOiB0cnVlLFxyXG4gICAgICAvLyBBbmRyb2lkIGF1dG9tYXRpY2FsbHkgYWRkcyB0aGUgY29ubmVjdGVkIGRldmljZSBhcyB0ZXN0IGRldmljZSB3aXRoIHRlc3Rpbmc6dHJ1ZSwgaU9TIGRvZXMgbm90XHJcbiAgICAgIGlvc1Rlc3REZXZpY2VJZHM6IFtcclxuICAgICAgICBcIjQ1ZDc3YmY1MTNkZmFiYzI5NDliYTA1M2RhODNjMGM3YjdlODc3MTVcIiwgLy8gRWRkeSdzIGlQaG9uZSA2c1xyXG4gICAgICAgIFwiZmVlNGNmMzE5YTI0MmVhYjQ3MDE1NDNlNGMxNmRiODljNzIyNzMxZlwiICAvLyBFZGR5J3MgaVBhZCBQcm9cclxuICAgICAgXSxcclxuICAgICAgb25BZENsb3NlZDogKCkgPT4gY29uc29sZS5sb2coXCJJbnRlcnN0aXRpYWwgY2xvc2VkXCIpXHJcbiAgICB9KS50aGVuKFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiQWRNb2IgaW50ZXJzdGl0aWFsIHNob3dpbmdcIik7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvck1lc3NhZ2UgPT4ge1xyXG4gICAgICAgICAgYWxlcnQoe1xyXG4gICAgICAgICAgICB0aXRsZTogXCJBZE1vYiBlcnJvclwiLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvck1lc3NhZ2UsXHJcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJIbW1rYXlcIlxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19