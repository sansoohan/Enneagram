"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var router_2 = require("@angular/router");
var action_button_component_1 = require("~/modules/buttons/action-button/action-button.component");
var friendlist_component_1 = require("./friendlist/friendlist.component");
var friendchat_component_1 = require("./friendchat/friendchat.component");
var friendmatching_component_1 = require("./friendmatching/friendmatching.component");
var ideamatching_component_1 = require("./ideamatching/ideamatching.component");
var nativescript_local_notifications_1 = require("nativescript-local-notifications");
var color_1 = require("tns-core-modules/color");
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var fs = require("tns-core-modules/file-system");
var app = require("application");
var firebase_service_1 = require("../../services/firebase.service");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(routerExtensions, activeRoute, firebaseServices) {
        this.routerExtensions = routerExtensions;
        this.activeRoute = activeRoute;
        this.firebaseServices = firebaseServices;
        // Use the component constructor to inject providers.
        this.friendlistIcon = 'res://noprofilepicture';
        this.friendchatIcon = 'res://chat';
        this.friendmatchingIcon = 'res://searchheart';
        this.ideamatchingIcon = 'res://searchstar';
    }
    HomeComponent.prototype.ngOnInit = function () {
        nativescript_local_notifications_1.LocalNotifications.schedule([{
                id: 1,
                title: 'The title',
                body: 'Recurs every minute until cancelled',
                ticker: 'The ticker',
                color: new color_1.Color("red"),
                badge: 1,
                groupedMessages: ["The first", "Second", "Keep going", "one more..", "OK Stop"],
                groupSummary: "Summary of the grouped messages above",
                ongoing: true,
                icon: 'res://heart',
                image: "https://cdn-images-1.medium.com/max/1200/1*c3cQvYJrVezv_Az0CoDcbA.jpeg",
                thumbnail: true,
                interval: 'minute',
                channel: 'My Channel',
                sound: "customsound-ios.wav",
                at: new Date(new Date().getTime() + (10 * 1000)) // 10 seconds from now
            }]).then(function () {
            console.log("Notification scheduled");
        }, function (error) {
            console.log("scheduling error: " + error);
        });
    };
    HomeComponent.prototype.onSelectedIndexChanged = function (args) {
        if (args.oldIndex !== -1) {
            var newIndex = args.newIndex;
            if (newIndex === 0) {
            }
            else if (newIndex === 1) {
            }
            else if (newIndex === 2) {
                if (this.firebaseServices.thisUser.enneagram.number === 0) {
                    this.enneagramConfirm();
                }
            }
            else if (newIndex === 3) {
                if (this.firebaseServices.thisUser.enneagram.number === 0) {
                    this.enneagramConfirm();
                }
            }
        }
        if (args.oldIndex == 0) {
            this.friendlistComponent.closeModal();
            this.friendlistComponent.closeModal();
            if (this.friendlistComponent.drawer) {
                this.friendlistComponent.onFloatButtonTap();
                this.friendlistComponent.floatButton.button.className = "float-btn down";
            }
        }
    };
    HomeComponent.prototype.enneagramConfirm = function () {
        var _this = this;
        dialogs_1.confirm({
            title: "Matching Friend",
            message: "You can get new friends. \n Please fill your enneagram status.",
            cancelButtonText: "Later",
            okButtonText: "Go Enneagram",
        }).then(function (result) {
            if (result === true) {
                _this.routerExtensions.navigate(['/enneagram'], { animated: false });
                _this._buttonRef.makeArrow();
            }
        });
    };
    HomeComponent.prototype.afterLogin = function () {
        // Init your component properties here.
        if (this.firebaseServices.thisUser.enneagram.number === 0) {
            this.friendmatchingIcon = 'res://searchheartlocked';
        }
        if (this.firebaseServices.thisUser.enneagram.number === 0) {
            this.ideamatchingIcon = 'res://searchstarlocked';
        }
    };
    HomeComponent.prototype.onDrawerButtonTap = function () {
        var sideDrawer = app.getRootView();
        sideDrawer.showDrawer();
    };
    __decorate([
        core_1.ViewChild("actionButton"),
        __metadata("design:type", action_button_component_1.ActionButtonComponent)
    ], HomeComponent.prototype, "_buttonRef", void 0);
    __decorate([
        core_1.ViewChild("friendlistComponent"),
        __metadata("design:type", friendlist_component_1.FriendlistComponent)
    ], HomeComponent.prototype, "friendlistComponent", void 0);
    __decorate([
        core_1.ViewChild("friendchatComponent"),
        __metadata("design:type", friendchat_component_1.FriendchatComponent)
    ], HomeComponent.prototype, "friendchatComponent", void 0);
    __decorate([
        core_1.ViewChild("friendmatchingComponent"),
        __metadata("design:type", friendmatching_component_1.FriendmatchingComponent)
    ], HomeComponent.prototype, "friendmatchingComponent", void 0);
    __decorate([
        core_1.ViewChild("ideamatchingComponent"),
        __metadata("design:type", ideamatching_component_1.IdeamatchingComponent)
    ], HomeComponent.prototype, "ideamatchingComponent", void 0);
    HomeComponent = __decorate([
        core_1.Component({
            selector: "Home",
            moduleId: module.id,
            templateUrl: "./home.component.html"
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            router_2.ActivatedRoute,
            firebase_service_1.FirebaseService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCxzREFBK0Q7QUFDL0QsMENBQWlEO0FBQ2pELG1HQUFnRztBQUNoRywwRUFBd0U7QUFDeEUsMEVBQXdFO0FBQ3hFLHNGQUFvRjtBQUNwRixnRkFBOEU7QUFFOUUscUZBQXNFO0FBQ3RFLGdEQUErQztBQUcvQyx1REFBK0Y7QUFJL0YsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDakQsaUNBQW1DO0FBR25DLG9FQUFpRTtBQU9qRTtJQWNJLHVCQUNZLGdCQUFrQyxFQUNsQyxXQUEyQixFQUMzQixnQkFBaUM7UUFGakMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFDM0IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUV6QyxxREFBcUQ7UUFDckQsSUFBSSxDQUFDLGNBQWMsR0FBRyx3QkFBd0IsQ0FBQztRQUMvQyxJQUFJLENBQUMsY0FBYyxHQUFHLFlBQVksQ0FBQztRQUNuQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsbUJBQW1CLENBQUM7UUFDOUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGtCQUFrQixDQUFDO0lBQy9DLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0kscURBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3pCLEVBQUUsRUFBRSxDQUFDO2dCQUNMLEtBQUssRUFBRSxXQUFXO2dCQUNsQixJQUFJLEVBQUUscUNBQXFDO2dCQUMzQyxNQUFNLEVBQUUsWUFBWTtnQkFDcEIsS0FBSyxFQUFFLElBQUksYUFBSyxDQUFDLEtBQUssQ0FBQztnQkFDdkIsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsZUFBZSxFQUFDLENBQUMsV0FBVyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUs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QXlCLENBQUM7U0FDdkQ7UUFDRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDdkQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLHdCQUF3QixDQUFDO1NBQ3BEO0lBQ0wsQ0FBQztJQUVELHlDQUFpQixHQUFqQjtRQUNJLElBQU0sVUFBVSxHQUFrQixHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEQsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUEzRzBCO1FBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDO2tDQUFhLCtDQUFxQjtxREFBQztJQUMzQjtRQUFqQyxnQkFBUyxDQUFDLHFCQUFxQixDQUFDO2tDQUFzQiwwQ0FBbUI7OERBQUM7SUFDekM7UUFBakMsZ0JBQVMsQ0FBQyxxQkFBcUIsQ0FBQztrQ0FBc0IsMENBQW1COzhEQUFDO0lBQ3JDO1FBQXJDLGdCQUFTLENBQUMseUJBQXlCLENBQUM7a0NBQTBCLGtEQUF1QjtrRUFBQztJQUNuRDtRQUFuQyxnQkFBUyxDQUFDLHVCQUF1QixDQUFDO2tDQUF3Qiw4Q0FBcUI7Z0VBQUM7SUFMeEUsYUFBYTtRQU56QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7U0FDdkMsQ0FBQzt5Q0FpQmdDLHlCQUFnQjtZQUNyQix1QkFBYztZQUNULGtDQUFlO09BakJwQyxhQUFhLENBNkd6QjtJQUFELG9CQUFDO0NBQUEsQUE3R0QsSUE2R0M7QUE3R1ksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEFjdGlvbkJ1dHRvbkNvbXBvbmVudCB9IGZyb20gXCJ+L21vZHVsZXMvYnV0dG9ucy9hY3Rpb24tYnV0dG9uL2FjdGlvbi1idXR0b24uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEZyaWVuZGxpc3RDb21wb25lbnQgfSBmcm9tIFwiLi9mcmllbmRsaXN0L2ZyaWVuZGxpc3QuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEZyaWVuZGNoYXRDb21wb25lbnQgfSBmcm9tIFwiLi9mcmllbmRjaGF0L2ZyaWVuZGNoYXQuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEZyaWVuZG1hdGNoaW5nQ29tcG9uZW50IH0gZnJvbSBcIi4vZnJpZW5kbWF0Y2hpbmcvZnJpZW5kbWF0Y2hpbmcuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IElkZWFtYXRjaGluZ0NvbXBvbmVudCB9IGZyb20gXCIuL2lkZWFtYXRjaGluZy9pZGVhbWF0Y2hpbmcuY29tcG9uZW50XCI7XHJcblxyXG5pbXBvcnQgeyBMb2NhbE5vdGlmaWNhdGlvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWxvY2FsLW5vdGlmaWNhdGlvbnNcIjtcclxuaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9jb2xvclwiO1xyXG5pbXBvcnQgeyBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RhYi12aWV3XCI7XHJcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9jb3JlL3ZpZXdcIjtcclxuaW1wb3J0IHsgYWxlcnQsIGNvbmZpcm0sIHByb21wdCwgbG9naW4sIGFjdGlvbiwgaW5wdXRUeXBlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcclxuaW1wb3J0IGZpcmViYXNlV2ViID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwXCIpO1xyXG5cclxudmFyIGZzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIik7XHJcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwiYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiO1xyXG5cclxuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIkhvbWVcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2hvbWUuY29tcG9uZW50Lmh0bWxcIlxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQFZpZXdDaGlsZChcImFjdGlvbkJ1dHRvblwiKSBfYnV0dG9uUmVmOiBBY3Rpb25CdXR0b25Db21wb25lbnQ7XHJcbiAgICBAVmlld0NoaWxkKFwiZnJpZW5kbGlzdENvbXBvbmVudFwiKSBmcmllbmRsaXN0Q29tcG9uZW50OiBGcmllbmRsaXN0Q29tcG9uZW50O1xyXG4gICAgQFZpZXdDaGlsZChcImZyaWVuZGNoYXRDb21wb25lbnRcIikgZnJpZW5kY2hhdENvbXBvbmVudDogRnJpZW5kY2hhdENvbXBvbmVudDtcclxuICAgIEBWaWV3Q2hpbGQoXCJmcmllbmRtYXRjaGluZ0NvbXBvbmVudFwiKSBmcmllbmRtYXRjaGluZ0NvbXBvbmVudDogRnJpZW5kbWF0Y2hpbmdDb21wb25lbnQ7XHJcbiAgICBAVmlld0NoaWxkKFwiaWRlYW1hdGNoaW5nQ29tcG9uZW50XCIpIGlkZWFtYXRjaGluZ0NvbXBvbmVudDogSWRlYW1hdGNoaW5nQ29tcG9uZW50O1xyXG4gICAgcHVibGljIHRhYlNlbGVjdGVkSW5kZXg6IG51bWJlcjtcclxuICAgIHB1YmxpYyB0YWJTZWxlY3RlZEluZGV4UmVzdWx0OiBzdHJpbmc7XHJcbiAgICB0aGlzVXNlcjogYW55O1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIGZyaWVuZGxpc3RJY29uOiBzdHJpbmc7XHJcbiAgICBmcmllbmRjaGF0SWNvbjogc3RyaW5nO1xyXG4gICAgZnJpZW5kbWF0Y2hpbmdJY29uOiBzdHJpbmc7XHJcbiAgICBpZGVhbWF0Y2hpbmdJY29uOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICAgICAgcHJpdmF0ZSBhY3RpdmVSb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgICAgcHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2VzOiBGaXJlYmFzZVNlcnZpY2UsXHJcbiAgICApIHtcclxuICAgICAgICAvLyBVc2UgdGhlIGNvbXBvbmVudCBjb25zdHJ1Y3RvciB0byBpbmplY3QgcHJvdmlkZXJzLlxyXG4gICAgICAgIHRoaXMuZnJpZW5kbGlzdEljb24gPSAncmVzOi8vbm9wcm9maWxlcGljdHVyZSc7XHJcbiAgICAgICAgdGhpcy5mcmllbmRjaGF0SWNvbiA9ICdyZXM6Ly9jaGF0JztcclxuICAgICAgICB0aGlzLmZyaWVuZG1hdGNoaW5nSWNvbiA9ICdyZXM6Ly9zZWFyY2hoZWFydCc7XHJcbiAgICAgICAgdGhpcy5pZGVhbWF0Y2hpbmdJY29uID0gJ3JlczovL3NlYXJjaHN0YXInO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIExvY2FsTm90aWZpY2F0aW9ucy5zY2hlZHVsZShbe1xyXG4gICAgICAgICAgICBpZDogMSxcclxuICAgICAgICAgICAgdGl0bGU6ICdUaGUgdGl0bGUnLFxyXG4gICAgICAgICAgICBib2R5OiAnUmVjdXJzIGV2ZXJ5IG1pbnV0ZSB1bnRpbCBjYW5jZWxsZWQnLFxyXG4gICAgICAgICAgICB0aWNrZXI6ICdUaGUgdGlja2VyJyxcclxuICAgICAgICAgICAgY29sb3I6IG5ldyBDb2xvcihcInJlZFwiKSxcclxuICAgICAgICAgICAgYmFkZ2U6IDEsXHJcbiAgICAgICAgICAgIGdyb3VwZWRNZXNzYWdlczpbXCJUaGUgZmlyc3RcIiwgXCJTZWNvbmRcIiwgXCJLZWVwIGdvaW5nXCIsIFwib25lIG1vcmUuLlwiLCBcIk9LIFN0b3BcIl0sIC8vYW5kcm9pZCBvbmx5XHJcbiAgICAgICAgICAgIGdyb3VwU3VtbWFyeTpcIlN1bW1hcnkgb2YgdGhlIGdyb3VwZWQgbWVzc2FnZXMgYWJvdmVcIiwgLy9hbmRyb2lkIG9ubHlcclxuICAgICAgICAgICAgb25nb2luZzogdHJ1ZSwgLy8gbWFrZXMgdGhlIG5vdGlmaWNhdGlvbiBvbmdvaW5nIChBbmRyb2lkIG9ubHkpXHJcbiAgICAgICAgICAgIGljb246ICdyZXM6Ly9oZWFydCcsXHJcbiAgICAgICAgICAgIGltYWdlOiBcImh0dHBzOi8vY2RuLWltYWdlcy0xLm1lZGl1bS5jb20vbWF4LzEyMDAvMSpjM2NRdllKclZlenZfQXowQ29EY2JBLmpwZWdcIixcclxuICAgICAgICAgICAgdGh1bWJuYWlsOiB0cnVlLFxyXG4gICAgICAgICAgICBpbnRlcnZhbDogJ21pbnV0ZScsXHJcbiAgICAgICAgICAgIGNoYW5uZWw6ICdNeSBDaGFubmVsJywgLy8gZGVmYXVsdDogJ0NoYW5uZWwnXHJcbiAgICAgICAgICAgIHNvdW5kOiBcImN1c3RvbXNvdW5kLWlvcy53YXZcIiwgLy8gZmFsbHMgYmFjayB0byB0aGUgZGVmYXVsdCBzb3VuZCBvbiBBbmRyb2lkXHJcbiAgICAgICAgICAgIGF0OiBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldFRpbWUoKSArICgxMCAqIDEwMDApKSAvLyAxMCBzZWNvbmRzIGZyb20gbm93XHJcbiAgICAgICAgfV0pLnRoZW4oXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vdGlmaWNhdGlvbiBzY2hlZHVsZWRcIik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2NoZWR1bGluZyBlcnJvcjogXCIgKyBlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9XHJcblxyXG4gICAgb25TZWxlY3RlZEluZGV4Q2hhbmdlZChhcmdzOiBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSkge1xyXG4gICAgICAgIGlmIChhcmdzLm9sZEluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICBjb25zdCBuZXdJbmRleCA9IGFyZ3MubmV3SW5kZXg7XHJcbiAgICAgICAgICAgIGlmIChuZXdJbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5ld0luZGV4ID09PSAxKSB7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3SW5kZXggPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpcmViYXNlU2VydmljZXMudGhpc1VzZXIuZW5uZWFncmFtLm51bWJlciA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5uZWFncmFtQ29uZmlybSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5ld0luZGV4ID09PSAzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maXJlYmFzZVNlcnZpY2VzLnRoaXNVc2VyLmVubmVhZ3JhbS5udW1iZXIgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVubmVhZ3JhbUNvbmZpcm0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihhcmdzLm9sZEluZGV4ID09IDApe1xyXG4gICAgICAgICAgICB0aGlzLmZyaWVuZGxpc3RDb21wb25lbnQuY2xvc2VNb2RhbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmZyaWVuZGxpc3RDb21wb25lbnQuY2xvc2VNb2RhbCgpO1xyXG4gICAgICAgICAgICBpZih0aGlzLmZyaWVuZGxpc3RDb21wb25lbnQuZHJhd2VyKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJpZW5kbGlzdENvbXBvbmVudC5vbkZsb2F0QnV0dG9uVGFwKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyaWVuZGxpc3RDb21wb25lbnQuZmxvYXRCdXR0b24uYnV0dG9uLmNsYXNzTmFtZSA9XCJmbG9hdC1idG4gZG93blwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBlbm5lYWdyYW1Db25maXJtKCkge1xyXG4gICAgICAgIGNvbmZpcm0oe1xyXG4gICAgICAgICAgICB0aXRsZTogXCJNYXRjaGluZyBGcmllbmRcIixcclxuICAgICAgICAgICAgbWVzc2FnZTogXCJZb3UgY2FuIGdldCBuZXcgZnJpZW5kcy4gXFxuIFBsZWFzZSBmaWxsIHlvdXIgZW5uZWFncmFtIHN0YXR1cy5cIixcclxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJMYXRlclwiLFxyXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiR28gRW5uZWFncmFtXCIsXHJcbiAgICAgICAgfSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9lbm5lYWdyYW0nXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIGFmdGVyTG9naW4oKTogdm9pZHtcclxuICAgICAgICAvLyBJbml0IHlvdXIgY29tcG9uZW50IHByb3BlcnRpZXMgaGVyZS5cclxuICAgICAgICBpZiAodGhpcy5maXJlYmFzZVNlcnZpY2VzLnRoaXNVc2VyLmVubmVhZ3JhbS5udW1iZXIgPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5mcmllbmRtYXRjaGluZ0ljb24gPSAncmVzOi8vc2VhcmNoaGVhcnRsb2NrZWQnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5maXJlYmFzZVNlcnZpY2VzLnRoaXNVc2VyLmVubmVhZ3JhbS5udW1iZXIgPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5pZGVhbWF0Y2hpbmdJY29uID0gJ3JlczovL3NlYXJjaHN0YXJsb2NrZWQnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkRyYXdlckJ1dHRvblRhcCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+YXBwLmdldFJvb3RWaWV3KCk7XHJcbiAgICAgICAgc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XHJcbiAgICB9XHJcbn1cclxuIl19