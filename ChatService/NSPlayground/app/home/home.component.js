"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var router_2 = require("@angular/router");
var action_button_component_1 = require("./searchresult/action-button/action-button.component");
var friendlist_component_1 = require("./friendlist/friendlist.component");
var friendchat_component_1 = require("./friendchat/friendchat.component");
var friendmatching_component_1 = require("./friendmatching/friendmatching.component");
var ideamatching_component_1 = require("./ideamatching/ideamatching.component");
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var fs = require("tns-core-modules/file-system");
var app = require("application");
var firebase_service_1 = require("../services/firebase.service");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(routerExtensions, activeRoute, firebaseServices) {
        this.routerExtensions = routerExtensions;
        this.activeRoute = activeRoute;
        this.firebaseServices = firebaseServices;
        // Use the component constructor to inject providers.
        this.friendlistIcon = '~/home/images/user-avatar-main-picture.png';
        this.friendchatIcon = '~/home/images/speech-bubble.png';
        this.friendmatchingIcon = '~/home/images/magnifier-with-a-heart.png';
        this.ideamatchingIcon = '~/home/images/magnifier-with-a-star.png';
    }
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
    HomeComponent.prototype.ideamatchingTap = function () {
        if (this.ideamatchingIcon = '~/home/images/magnifier-with-a-star-locked.png') {
        }
    };
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.afterLogin = function () {
        // Init your component properties here.
        if (this.firebaseServices.thisUser.enneagram.number === 0) {
            this.friendmatchingIcon = '~/home/images/magnifier-with-a-heart-locked.png';
        }
        if (this.firebaseServices.thisUser.enneagram.number === 0) {
            this.ideamatchingIcon = '~/home/images/magnifier-with-a-star-locked.png';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCxzREFBK0Q7QUFDL0QsMENBQWlEO0FBQ2pELGdHQUE2RjtBQUM3RiwwRUFBd0U7QUFDeEUsMEVBQXdFO0FBQ3hFLHNGQUFvRjtBQUNwRixnRkFBOEU7QUFJOUUsdURBQStGO0FBSS9GLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBQ2pELGlDQUFtQztBQUduQyxpRUFBOEQ7QUFNOUQ7SUFjSSx1QkFDWSxnQkFBa0MsRUFDbEMsV0FBMkIsRUFDM0IsZ0JBQWlDO1FBRmpDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQzNCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFFekMscURBQXFEO1FBQ3JELElBQUksQ0FBQyxjQUFjLEdBQUcsNENBQTRDLENBQUM7UUFDbkUsSUFBSSxDQUFDLGNBQWMsR0FBRyxpQ0FBaUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsMENBQTBDLENBQUM7UUFDckUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLHlDQUF5QyxDQUFDO0lBQ3RFLENBQUM7SUFJRCw4Q0FBc0IsR0FBdEIsVUFBdUIsSUFBbUM7UUFDdEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMvQixFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLENBQUM7WUFBQyxJ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LGdCQUFTLENBQUMscUJBQXFCLENBQUM7a0NBQXNCLDBDQUFtQjs4REFBQztJQUN6QztRQUFqQyxnQkFBUyxDQUFDLHFCQUFxQixDQUFDO2tDQUFzQiwwQ0FBbUI7OERBQUM7SUFDckM7UUFBckMsZ0JBQVMsQ0FBQyx5QkFBeUIsQ0FBQztrQ0FBMEIsa0RBQXVCO2tFQUFDO0lBQ25EO1FBQW5DLGdCQUFTLENBQUMsdUJBQXVCLENBQUM7a0NBQXdCLDhDQUFxQjtnRUFBQztJQUx4RSxhQUFhO1FBTHpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtTQUN2QyxDQUFDO3lDQWdCZ0MseUJBQWdCO1lBQ3JCLHVCQUFjO1lBQ1Qsa0NBQWU7T0FqQnBDLGFBQWEsQ0EwRnpCO0lBQUQsb0JBQUM7Q0FBQSxBQTFGRCxJQTBGQztBQTFGWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgQWN0aW9uQnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4vc2VhcmNocmVzdWx0L2FjdGlvbi1idXR0b24vYWN0aW9uLWJ1dHRvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRnJpZW5kbGlzdENvbXBvbmVudCB9IGZyb20gXCIuL2ZyaWVuZGxpc3QvZnJpZW5kbGlzdC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRnJpZW5kY2hhdENvbXBvbmVudCB9IGZyb20gXCIuL2ZyaWVuZGNoYXQvZnJpZW5kY2hhdC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRnJpZW5kbWF0Y2hpbmdDb21wb25lbnQgfSBmcm9tIFwiLi9mcmllbmRtYXRjaGluZy9mcmllbmRtYXRjaGluZy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgSWRlYW1hdGNoaW5nQ29tcG9uZW50IH0gZnJvbSBcIi4vaWRlYW1hdGNoaW5nL2lkZWFtYXRjaGluZy5jb21wb25lbnRcIjtcclxuXHJcbmltcG9ydCB7IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGFiLXZpZXdcIjtcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlld1wiO1xyXG5pbXBvcnQgeyBhbGVydCwgY29uZmlybSwgcHJvbXB0LCBsb2dpbiwgYWN0aW9uLCBpbnB1dFR5cGUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzXCI7XHJcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xyXG5pbXBvcnQgZmlyZWJhc2VXZWIgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHBcIik7XHJcblxyXG52YXIgZnMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiKTtcclxuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJhcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyXCI7XHJcblxyXG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiSG9tZVwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaG9tZS5jb21wb25lbnQuaHRtbFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIEBWaWV3Q2hpbGQoXCJhY3Rpb25CdXR0b25cIikgX2J1dHRvblJlZjogQWN0aW9uQnV0dG9uQ29tcG9uZW50O1xyXG4gICAgQFZpZXdDaGlsZChcImZyaWVuZGxpc3RDb21wb25lbnRcIikgZnJpZW5kbGlzdENvbXBvbmVudDogRnJpZW5kbGlzdENvbXBvbmVudDtcclxuICAgIEBWaWV3Q2hpbGQoXCJmcmllbmRjaGF0Q29tcG9uZW50XCIpIGZyaWVuZGNoYXRDb21wb25lbnQ6IEZyaWVuZGNoYXRDb21wb25lbnQ7XHJcbiAgICBAVmlld0NoaWxkKFwiZnJpZW5kbWF0Y2hpbmdDb21wb25lbnRcIikgZnJpZW5kbWF0Y2hpbmdDb21wb25lbnQ6IEZyaWVuZG1hdGNoaW5nQ29tcG9uZW50O1xyXG4gICAgQFZpZXdDaGlsZChcImlkZWFtYXRjaGluZ0NvbXBvbmVudFwiKSBpZGVhbWF0Y2hpbmdDb21wb25lbnQ6IElkZWFtYXRjaGluZ0NvbXBvbmVudDtcclxuICAgIHB1YmxpYyB0YWJTZWxlY3RlZEluZGV4OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgdGFiU2VsZWN0ZWRJbmRleFJlc3VsdDogc3RyaW5nO1xyXG4gICAgdGhpc1VzZXI6IGFueTtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBmcmllbmRsaXN0SWNvbjogc3RyaW5nO1xyXG4gICAgZnJpZW5kY2hhdEljb246IHN0cmluZztcclxuICAgIGZyaWVuZG1hdGNoaW5nSWNvbjogc3RyaW5nO1xyXG4gICAgaWRlYW1hdGNoaW5nSWNvbjogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICAgICAgIHByaXZhdGUgYWN0aXZlUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxyXG4gICAgICAgIHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlczogRmlyZWJhc2VTZXJ2aWNlLFxyXG4gICAgKSB7XHJcbiAgICAgICAgLy8gVXNlIHRoZSBjb21wb25lbnQgY29uc3RydWN0b3IgdG8gaW5qZWN0IHByb3ZpZGVycy5cclxuICAgICAgICB0aGlzLmZyaWVuZGxpc3RJY29uID0gJ34vaG9tZS9pbWFnZXMvdXNlci1hdmF0YXItbWFpbi1waWN0dXJlLnBuZyc7XHJcbiAgICAgICAgdGhpcy5mcmllbmRjaGF0SWNvbiA9ICd+L2hvbWUvaW1hZ2VzL3NwZWVjaC1idWJibGUucG5nJztcclxuICAgICAgICB0aGlzLmZyaWVuZG1hdGNoaW5nSWNvbiA9ICd+L2hvbWUvaW1hZ2VzL21hZ25pZmllci13aXRoLWEtaGVhcnQucG5nJztcclxuICAgICAgICB0aGlzLmlkZWFtYXRjaGluZ0ljb24gPSAnfi9ob21lL2ltYWdlcy9tYWduaWZpZXItd2l0aC1hLXN0YXIucG5nJztcclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIG9uU2VsZWN0ZWRJbmRleENoYW5nZWQoYXJnczogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEpIHtcclxuICAgICAgICBpZiAoYXJncy5vbGRJbmRleCAhPT0gLTEpIHtcclxuICAgICAgICAgICAgY29uc3QgbmV3SW5kZXggPSBhcmdzLm5ld0luZGV4O1xyXG4gICAgICAgICAgICBpZiAobmV3SW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXdJbmRleCA9PT0gMSkge1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5ld0luZGV4ID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maXJlYmFzZVNlcnZpY2VzLnRoaXNVc2VyLmVubmVhZ3JhbS5udW1iZXIgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVubmVhZ3JhbUNvbmZpcm0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXdJbmRleCA9PT0gMykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmlyZWJhc2VTZXJ2aWNlcy50aGlzVXNlci5lbm5lYWdyYW0ubnVtYmVyID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbm5lYWdyYW1Db25maXJtKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoYXJncy5vbGRJbmRleCA9PSAwKXtcclxuICAgICAgICAgICAgdGhpcy5mcmllbmRsaXN0Q29tcG9uZW50LmNsb3NlTW9kYWwoKTtcclxuICAgICAgICAgICAgdGhpcy5mcmllbmRsaXN0Q29tcG9uZW50LmNsb3NlTW9kYWwoKTtcclxuICAgICAgICAgICAgaWYodGhpcy5mcmllbmRsaXN0Q29tcG9uZW50LmRyYXdlcil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyaWVuZGxpc3RDb21wb25lbnQub25GbG9hdEJ1dHRvblRhcCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmllbmRsaXN0Q29tcG9uZW50LmZsb2F0QnV0dG9uLmJ1dHRvbi5jbGFzc05hbWUgPVwiZmxvYXQtYnRuIGRvd25cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVubmVhZ3JhbUNvbmZpcm0oKSB7XHJcbiAgICAgICAgY29uZmlybSh7XHJcbiAgICAgICAgICAgIHRpdGxlOiBcIk1hdGNoaW5nIEZyaWVuZFwiLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBcIllvdSBjYW4gZ2V0IG5ldyBmcmllbmRzLiBcXG4gUGxlYXNlIGZpbGwgeW91ciBlbm5lYWdyYW0gc3RhdHVzLlwiLFxyXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkxhdGVyXCIsXHJcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJHbyBFbm5lYWdyYW1cIixcclxuICAgICAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2VubmVhZ3JhbSddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2J1dHRvblJlZi5tYWtlQXJyb3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgaWRlYW1hdGNoaW5nVGFwKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlkZWFtYXRjaGluZ0ljb24gPSAnfi9ob21lL2ltYWdlcy9tYWduaWZpZXItd2l0aC1hLXN0YXItbG9ja2VkLnBuZycpIHtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgYWZ0ZXJMb2dpbigpOiB2b2lke1xyXG4gICAgICAgIC8vIEluaXQgeW91ciBjb21wb25lbnQgcHJvcGVydGllcyBoZXJlLlxyXG4gICAgICAgIGlmICh0aGlzLmZpcmViYXNlU2VydmljZXMudGhpc1VzZXIuZW5uZWFncmFtLm51bWJlciA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmZyaWVuZG1hdGNoaW5nSWNvbiA9ICd+L2hvbWUvaW1hZ2VzL21hZ25pZmllci13aXRoLWEtaGVhcnQtbG9ja2VkLnBuZyc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmZpcmViYXNlU2VydmljZXMudGhpc1VzZXIuZW5uZWFncmFtLm51bWJlciA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmlkZWFtYXRjaGluZ0ljb24gPSAnfi9ob21lL2ltYWdlcy9tYWduaWZpZXItd2l0aC1hLXN0YXItbG9ja2VkLnBuZyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj5hcHAuZ2V0Um9vdFZpZXcoKTtcclxuICAgICAgICBzaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcclxuICAgIH1cclxufVxyXG4iXX0=