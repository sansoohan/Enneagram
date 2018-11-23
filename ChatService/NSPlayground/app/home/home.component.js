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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCxzREFBK0Q7QUFDL0QsMENBQWlEO0FBQ2pELGdHQUE2RjtBQUM3RiwwRUFBd0U7QUFDeEUsMEVBQXdFO0FBQ3hFLHNGQUFvRjtBQUNwRixnRkFBOEU7QUFJOUUsdURBQStGO0FBSS9GLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBQ2pELGlDQUFtQztBQUduQyxpRUFBOEQ7QUFNOUQ7SUFjSSx1QkFDWSxnQkFBa0MsRUFDbEMsV0FBMkIsRUFDM0IsZ0JBQWlDO1FBRmpDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQzNCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFFekMscURBQXFEO1FBQ3JELElBQUksQ0FBQyxjQUFjLEdBQUcsNENBQTRDLENBQUM7UUFDbkUsSUFBSSxDQUFDLGNBQWMsR0FBRyxpQ0FBaUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsMENBQTBDLENBQUM7UUFDckUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLHlDQUF5QyxDQUFDO0lBQ3RFLENBQUM7SUFJRCw4Q0FBc0IsR0FBdEIsVUFBdUIsSUFBbUM7UUFDdEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMvQixFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLENBQUM7WUFBQyxJ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LGdCQUFTLENBQUMscUJBQXFCLENBQUM7a0NBQXNCLDBDQUFtQjs4REFBQztJQUN6QztRQUFqQyxnQkFBUyxDQUFDLHFCQUFxQixDQUFDO2tDQUFzQiwwQ0FBbUI7OERBQUM7SUFDckM7UUFBckMsZ0JBQVMsQ0FBQyx5QkFBeUIsQ0FBQztrQ0FBMEIsa0RBQXVCO2tFQUFDO0lBQ25EO1FBQW5DLGdCQUFTLENBQUMsdUJBQXVCLENBQUM7a0NBQXdCLDhDQUFxQjtnRUFBQztJQUx4RSxhQUFhO1FBTHpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtTQUN2QyxDQUFDO3lDQWdCZ0MseUJBQWdCO1lBQ3JCLHVCQUFjO1lBQ1Qsa0NBQWU7T0FqQnBDLGFBQWEsQ0EwRnpCO0lBQUQsb0JBQUM7Q0FBQSxBQTFGRCxJQTBGQztBQTFGWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgQWN0aW9uQnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4vc2VhcmNocmVzdWx0L2FjdGlvbi1idXR0b24vYWN0aW9uLWJ1dHRvbi5jb21wb25lbnRcIjtcbmltcG9ydCB7IEZyaWVuZGxpc3RDb21wb25lbnQgfSBmcm9tIFwiLi9mcmllbmRsaXN0L2ZyaWVuZGxpc3QuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBGcmllbmRjaGF0Q29tcG9uZW50IH0gZnJvbSBcIi4vZnJpZW5kY2hhdC9mcmllbmRjaGF0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgRnJpZW5kbWF0Y2hpbmdDb21wb25lbnQgfSBmcm9tIFwiLi9mcmllbmRtYXRjaGluZy9mcmllbmRtYXRjaGluZy5jb21wb25lbnRcIjtcbmltcG9ydCB7IElkZWFtYXRjaGluZ0NvbXBvbmVudCB9IGZyb20gXCIuL2lkZWFtYXRjaGluZy9pZGVhbWF0Y2hpbmcuY29tcG9uZW50XCI7XG5cbmltcG9ydCB7IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGFiLXZpZXdcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9jb3JlL3ZpZXdcIjtcbmltcG9ydCB7IGFsZXJ0LCBjb25maXJtLCBwcm9tcHQsIGxvZ2luLCBhY3Rpb24sIGlucHV0VHlwZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3NcIjtcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuaW1wb3J0IGZpcmViYXNlV2ViID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwXCIpO1xuXG52YXIgZnMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiKTtcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwiYXBwbGljYXRpb25cIjtcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLXNpZGVkcmF3ZXJcIjtcblxuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiSG9tZVwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9ob21lLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQFZpZXdDaGlsZChcImFjdGlvbkJ1dHRvblwiKSBfYnV0dG9uUmVmOiBBY3Rpb25CdXR0b25Db21wb25lbnQ7XG4gICAgQFZpZXdDaGlsZChcImZyaWVuZGxpc3RDb21wb25lbnRcIikgZnJpZW5kbGlzdENvbXBvbmVudDogRnJpZW5kbGlzdENvbXBvbmVudDtcbiAgICBAVmlld0NoaWxkKFwiZnJpZW5kY2hhdENvbXBvbmVudFwiKSBmcmllbmRjaGF0Q29tcG9uZW50OiBGcmllbmRjaGF0Q29tcG9uZW50O1xuICAgIEBWaWV3Q2hpbGQoXCJmcmllbmRtYXRjaGluZ0NvbXBvbmVudFwiKSBmcmllbmRtYXRjaGluZ0NvbXBvbmVudDogRnJpZW5kbWF0Y2hpbmdDb21wb25lbnQ7XG4gICAgQFZpZXdDaGlsZChcImlkZWFtYXRjaGluZ0NvbXBvbmVudFwiKSBpZGVhbWF0Y2hpbmdDb21wb25lbnQ6IElkZWFtYXRjaGluZ0NvbXBvbmVudDtcbiAgICBwdWJsaWMgdGFiU2VsZWN0ZWRJbmRleDogbnVtYmVyO1xuICAgIHB1YmxpYyB0YWJTZWxlY3RlZEluZGV4UmVzdWx0OiBzdHJpbmc7XG4gICAgdGhpc1VzZXI6IGFueTtcbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIGZyaWVuZGxpc3RJY29uOiBzdHJpbmc7XG4gICAgZnJpZW5kY2hhdEljb246IHN0cmluZztcbiAgICBmcmllbmRtYXRjaGluZ0ljb246IHN0cmluZztcbiAgICBpZGVhbWF0Y2hpbmdJY29uOiBzdHJpbmc7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgcHJpdmF0ZSBhY3RpdmVSb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlczogRmlyZWJhc2VTZXJ2aWNlLFxuICAgICkge1xuICAgICAgICAvLyBVc2UgdGhlIGNvbXBvbmVudCBjb25zdHJ1Y3RvciB0byBpbmplY3QgcHJvdmlkZXJzLlxuICAgICAgICB0aGlzLmZyaWVuZGxpc3RJY29uID0gJ34vaG9tZS9pbWFnZXMvdXNlci1hdmF0YXItbWFpbi1waWN0dXJlLnBuZyc7XG4gICAgICAgIHRoaXMuZnJpZW5kY2hhdEljb24gPSAnfi9ob21lL2ltYWdlcy9zcGVlY2gtYnViYmxlLnBuZyc7XG4gICAgICAgIHRoaXMuZnJpZW5kbWF0Y2hpbmdJY29uID0gJ34vaG9tZS9pbWFnZXMvbWFnbmlmaWVyLXdpdGgtYS1oZWFydC5wbmcnO1xuICAgICAgICB0aGlzLmlkZWFtYXRjaGluZ0ljb24gPSAnfi9ob21lL2ltYWdlcy9tYWduaWZpZXItd2l0aC1hLXN0YXIucG5nJztcbiAgICB9XG5cblxuXG4gICAgb25TZWxlY3RlZEluZGV4Q2hhbmdlZChhcmdzOiBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSkge1xuICAgICAgICBpZiAoYXJncy5vbGRJbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IG5ld0luZGV4ID0gYXJncy5uZXdJbmRleDtcbiAgICAgICAgICAgIGlmIChuZXdJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXdJbmRleCA9PT0gMSkge1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXdJbmRleCA9PT0gMikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpcmViYXNlU2VydmljZXMudGhpc1VzZXIuZW5uZWFncmFtLm51bWJlciA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVubmVhZ3JhbUNvbmZpcm0oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5ld0luZGV4ID09PSAzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmlyZWJhc2VTZXJ2aWNlcy50aGlzVXNlci5lbm5lYWdyYW0ubnVtYmVyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5uZWFncmFtQ29uZmlybSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihhcmdzLm9sZEluZGV4ID09IDApe1xuICAgICAgICAgICAgdGhpcy5mcmllbmRsaXN0Q29tcG9uZW50LmNsb3NlTW9kYWwoKTtcbiAgICAgICAgICAgIHRoaXMuZnJpZW5kbGlzdENvbXBvbmVudC5jbG9zZU1vZGFsKCk7XG4gICAgICAgICAgICBpZih0aGlzLmZyaWVuZGxpc3RDb21wb25lbnQuZHJhd2VyKXtcbiAgICAgICAgICAgICAgICB0aGlzLmZyaWVuZGxpc3RDb21wb25lbnQub25GbG9hdEJ1dHRvblRhcCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZnJpZW5kbGlzdENvbXBvbmVudC5mbG9hdEJ1dHRvbi5idXR0b24uY2xhc3NOYW1lID1cImZsb2F0LWJ0biBkb3duXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZW5uZWFncmFtQ29uZmlybSgpIHtcbiAgICAgICAgY29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogXCJNYXRjaGluZyBGcmllbmRcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiWW91IGNhbiBnZXQgbmV3IGZyaWVuZHMuIFxcbiBQbGVhc2UgZmlsbCB5b3VyIGVubmVhZ3JhbSBzdGF0dXMuXCIsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkxhdGVyXCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiR28gRW5uZWFncmFtXCIsXG4gICAgICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9lbm5lYWdyYW0nXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYnV0dG9uUmVmLm1ha2VBcnJvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWRlYW1hdGNoaW5nVGFwKCkge1xuICAgICAgICBpZiAodGhpcy5pZGVhbWF0Y2hpbmdJY29uID0gJ34vaG9tZS9pbWFnZXMvbWFnbmlmaWVyLXdpdGgtYS1zdGFyLWxvY2tlZC5wbmcnKSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICBhZnRlckxvZ2luKCk6IHZvaWR7XG4gICAgICAgIC8vIEluaXQgeW91ciBjb21wb25lbnQgcHJvcGVydGllcyBoZXJlLlxuICAgICAgICBpZiAodGhpcy5maXJlYmFzZVNlcnZpY2VzLnRoaXNVc2VyLmVubmVhZ3JhbS5udW1iZXIgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZnJpZW5kbWF0Y2hpbmdJY29uID0gJ34vaG9tZS9pbWFnZXMvbWFnbmlmaWVyLXdpdGgtYS1oZWFydC1sb2NrZWQucG5nJztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5maXJlYmFzZVNlcnZpY2VzLnRoaXNVc2VyLmVubmVhZ3JhbS5udW1iZXIgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuaWRlYW1hdGNoaW5nSWNvbiA9ICd+L2hvbWUvaW1hZ2VzL21hZ25pZmllci13aXRoLWEtc3Rhci1sb2NrZWQucG5nJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+YXBwLmdldFJvb3RWaWV3KCk7XG4gICAgICAgIHNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xuICAgIH1cbn1cbiJdfQ==