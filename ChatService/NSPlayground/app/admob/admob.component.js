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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtb2IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRtb2IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELGlEQUFnRDtBQUNoRCx1REFBeUQ7QUFTekQ7SUFLRSx3QkFDVSxJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUxaLG9CQUFlLEdBQVcsd0NBQXdDLENBQUM7UUFDbkUsMEJBQXFCLEdBQVcsd0NBQXdDLENBQUM7UUFDekUsZ0JBQVcsR0FBVyxzQkFBc0IsQ0FBQztRQUM3QyxzQkFBaUIsR0FBVyxzQkFBc0IsQ0FBQztJQUkzRCxDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUVFLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBRU0scUNBQVksR0FBbkI7UUFDRSxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztZQUN4QixJQUFJLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWTtZQUN6QyxPQUFPLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsR0FBRyxFQUFFLEdBQUc7YUFDVDtZQUNELGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxXQUFXLEVBQUUsd0NBQXdDO1lBQ3JELE9BQU8sRUFBRSxLQUFLO1lBQ2QsZ0JBQWdCLEVBQUU7Z0JBQ2QsMENBQTBDO2dCQUMxQywwQ0FBMEMsQ0FBRSxrQkFBa0I7YUFDakU7WUFDRCxRQUFRLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsZ0NBQWdDO1NBQ3BFLENBQUMsQ0FBQyxJQUFJLENBQ0g7WUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDdEMsQ0FBQyxFQUNELFVBQVUsWUFBWTtZQUNwQixLQUFLLENBQUM7Z0JBQ0osS0FBSyxFQUFFLGFBQWE7Z0JBQ3BCLE9BQU8sRUFBRSxZQUFZO2dCQUNyQixZQUFZLEVBQUUsUUFBUTthQUN2QixDQUFDLENBQUM7UUFDTCxDQUFDLENBQ0osQ0FBQztJQUNKLENBQUM7SUFFTSxtQ0FBVSxHQUFqQjtRQUNFLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDO1lBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUN6QyxDQUFDLEVBQUUsVUFBUyxLQUFLO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSwyQ0FBa0IsR0FBekI7UUFDRSxRQUFRLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO1lBQzlCLGlCQUFpQixFQUFFLHdDQUF3QztZQUMzRCxxQkFBcUIsRUFBRSxJQUFJLENBQUMscUJBQXFCO1lBQ2pELE9BQU8sRUFBRSxJQUFJO1lBQ2IsaUdBQWlHO1lBQ2pHLGdCQUFnQixFQUFFO2dCQUNoQiwwQ0FBMEM7Z0JBQzFDLDBDQUEwQyxDQUFFLGtCQUFrQjthQUMvRDtZQUNELFVBQVUsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFsQyxDQUFrQztTQUNyRCxDQUFDLENBQUMsSUFBSSxDQUNIO1lBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQzVDLENBQUMsRUFDRCxVQUFBLFlBQVk7WUFDVixLQUFLLENBQUM7Z0JBQ0osS0FBSyxFQUFFLGFBQWE7Z0JBQ3BCLE9BQU8sRUFBRSxZQUFZO2dCQUNyQixZQUFZLEVBQUUsUUFBUTthQUN2QixDQUFDLENBQUM7UUFDTCxDQUFDLENBQ0osQ0FBQztJQUNKLENBQUM7SUEzRVUsY0FBYztRQU4xQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7U0FDdEMsQ0FBQzt5Q0FPZ0IsV0FBSTtPQU5ULGNBQWMsQ0E0RTFCO0lBQUQscUJBQUM7Q0FBQSxBQTVFRCxJQTRFQztBQTVFWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0ICogYXMgZmlyZWJhc2UgZnJvbSBcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIjtcbmltcG9ydCB7IGlzSU9TIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm1cIjtcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnQWRtb2InLFxuICB0ZW1wbGF0ZVVybDogJy4vYWRtb2IuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9hZG1vYi5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEFkbW9iQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHJpdmF0ZSBhbmRyb2lkQmFubmVySWQ6IHN0cmluZyA9IFwiY2EtYXBwLXB1Yi01NDQ1Nzc5NzUwMTU0NTc2LzcwMDUxNTQ2NDRcIjtcbiAgcHJpdmF0ZSBhbmRyb2lkSW50ZXJzdGl0aWFsSWQ6IHN0cmluZyA9IFwiY2EtYXBwLXB1Yi01NDQ1Nzc5NzUwMTU0NTc2LzIxNDU0MjAwNjFcIjtcbiAgcHJpdmF0ZSBpb3NCYW5uZXJJZDogc3RyaW5nID0gXCJjYS1hcHAtcHViLVJSUlIvVFRUVFwiO1xuICBwcml2YXRlIGlvc0ludGVyc3RpdGlhbElkOiBzdHJpbmcgPSBcImNhLWFwcC1wdWItR0dHRy9ISEhIXCI7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcGFnZTogUGFnZVxuICApIHsgXG4gIH1cblxuICBuZ09uSW5pdCgpIHsgXG5cbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVCYW5uZXIoKSB7XG4gICAgZmlyZWJhc2UuYWRtb2Iuc2hvd0Jhbm5lcih7XG4gICAgICBzaXplOiBmaXJlYmFzZS5hZG1vYi5BRF9TSVpFLlNNQVJUX0JBTk5FUiwgLy8gc2VlIGZpcmViYXNlLmFkbW9iLkFEX1NJWkUgZm9yIGFsbCBvcHRpb25zXG4gICAgICBtYXJnaW5zOiB7IC8vIG9wdGlvbmFsIG5yIG9mIGRldmljZSBpbmRlcGVuZGVudCBwaXhlbHMgZnJvbSB0aGUgdG9wIG9yIGJvdHRvbSAoZG9uJ3Qgc2V0IGJvdGgpXG4gICAgICAgIGJvdHRvbTogMTAsXG4gICAgICAgIHRvcDogMzAwXG4gICAgICB9LFxuICAgICAgYW5kcm9pZEJhbm5lcklkOiB0aGlzLmFuZHJvaWRCYW5uZXJJZCxcbiAgICAgIGlvc0Jhbm5lcklkOiBcImNhLWFwcC1wdWItOTUxNzM0NjAwMzAxMTY1Mi8zOTg1MzY5NzIxXCIsXG4gICAgICB0ZXN0aW5nOiBmYWxzZSwgLy8gd2hlbiBub3QgcnVubmluZyBpbiBwcm9kdWN0aW9uIHNldCB0aGlzIHRvIHRydWUsIEdvb2dsZSBkb2Vzbid0IGxpa2UgaXQgYW55IG90aGVyIHdheVxuICAgICAgaW9zVGVzdERldmljZUlkczogWyAvL0FuZHJvaWQgYXV0b21hdGljYWxseSBhZGRzIHRoZSBjb25uZWN0ZWQgZGV2aWNlIGFzIHRlc3QgZGV2aWNlIHdpdGggdGVzdGluZzp0cnVlLCBpT1MgZG9lcyBub3RcbiAgICAgICAgICBcIjQ1ZDc3YmY1MTNkZmFiYzI5NDliYTA1M2RhODNjMGM3YjdlODc3MTVcIiwgLy8gRWRkeSdzIGlQaG9uZSA2c1xuICAgICAgICAgIFwiZmVlNGNmMzE5YTI0MmVhYjQ3MDE1NDNlNGMxNmRiODljNzIyNzMxZlwiICAvLyBFZGR5J3MgaVBhZCBQcm9cbiAgICAgIF0sXG4gICAgICBrZXl3b3JkczogW1wia2V5d29yZDFcIiwgXCJrZXl3b3JkMlwiXSAvLyBhZGQga2V5d29yZHMgZm9yIGFkIHRhcmdldGluZ1xuICAgIH0pLnRoZW4oXG4gICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkFkTW9iIGJhbm5lciBzaG93aW5nXCIpO1xuICAgICAgICB9LFxuICAgICAgICBmdW5jdGlvbiAoZXJyb3JNZXNzYWdlKSB7XG4gICAgICAgICAgYWxlcnQoe1xuICAgICAgICAgICAgdGl0bGU6IFwiQWRNb2IgZXJyb3JcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVycm9yTWVzc2FnZSxcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJIbW1rYXlcIlxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBoaWRlQmFubmVyKCkge1xuICAgIGZpcmViYXNlLmFkbW9iLmhpZGVCYW5uZXIoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImFkbW9iIGhpZGVCYW5uZXIgZG9uZVwiKTtcbiAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhcImFkbW9iIGhpZGVCYW5uZXIgZXJyb3I6IFwiICsgZXJyb3IpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZUludGVyc3RpdGlhbCgpIHtcbiAgICBmaXJlYmFzZS5hZG1vYi5zaG93SW50ZXJzdGl0aWFsKHtcbiAgICAgIGlvc0ludGVyc3RpdGlhbElkOiBcImNhLWFwcC1wdWItOTUxNzM0NjAwMzAxMTY1Mi82OTM4ODM2MTIyXCIsXG4gICAgICBhbmRyb2lkSW50ZXJzdGl0aWFsSWQ6IHRoaXMuYW5kcm9pZEludGVyc3RpdGlhbElkLFxuICAgICAgdGVzdGluZzogdHJ1ZSxcbiAgICAgIC8vIEFuZHJvaWQgYXV0b21hdGljYWxseSBhZGRzIHRoZSBjb25uZWN0ZWQgZGV2aWNlIGFzIHRlc3QgZGV2aWNlIHdpdGggdGVzdGluZzp0cnVlLCBpT1MgZG9lcyBub3RcbiAgICAgIGlvc1Rlc3REZXZpY2VJZHM6IFtcbiAgICAgICAgXCI0NWQ3N2JmNTEzZGZhYmMyOTQ5YmEwNTNkYTgzYzBjN2I3ZTg3NzE1XCIsIC8vIEVkZHkncyBpUGhvbmUgNnNcbiAgICAgICAgXCJmZWU0Y2YzMTlhMjQyZWFiNDcwMTU0M2U0YzE2ZGI4OWM3MjI3MzFmXCIgIC8vIEVkZHkncyBpUGFkIFByb1xuICAgICAgXSxcbiAgICAgIG9uQWRDbG9zZWQ6ICgpID0+IGNvbnNvbGUubG9nKFwiSW50ZXJzdGl0aWFsIGNsb3NlZFwiKVxuICAgIH0pLnRoZW4oXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIkFkTW9iIGludGVyc3RpdGlhbCBzaG93aW5nXCIpO1xuICAgICAgICB9LFxuICAgICAgICBlcnJvck1lc3NhZ2UgPT4ge1xuICAgICAgICAgIGFsZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkFkTW9iIGVycm9yXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBlcnJvck1lc3NhZ2UsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiSG1ta2F5XCJcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICk7XG4gIH1cbn1cbiJdfQ==