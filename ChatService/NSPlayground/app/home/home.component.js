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
                this.friendlistComponent.onTap();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCxzREFBK0Q7QUFDL0QsMENBQWlEO0FBQ2pELGdHQUE2RjtBQUM3RiwwRUFBd0U7QUFDeEUsMEVBQXdFO0FBQ3hFLHNGQUFvRjtBQUNwRixnRkFBOEU7QUFJOUUsdURBQStGO0FBSS9GLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBQ2pELGlDQUFtQztBQUduQyxpRUFBOEQ7QUFNOUQ7SUFjSSx1QkFDWSxnQkFBa0MsRUFDbEMsV0FBMkIsRUFDM0IsZ0JBQWlDO1FBRmpDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQzNCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFFekMscURBQXFEO1FBQ3JELElBQUksQ0FBQyxjQUFjLEdBQUcsNENBQTRDLENBQUM7UUFDbkUsSUFBSSxDQUFDLGNBQWMsR0FBRyxpQ0FBaUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsMENBQTBDLENBQUM7UUFDckUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLHlDQUF5QyxDQUFDO0lBQ3RFLENBQUM7SUFJRCw4Q0FBc0IsR0FBdEIsVUFBdUIsSUFBbUM7UUFDdEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMvQixFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLENBQUM7WUFBQyxJ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QkFBUyxDQUFDLHFCQUFxQixDQUFDO2tDQUFzQiwwQ0FBbUI7OERBQUM7SUFDekM7UUFBakMsZ0JBQVMsQ0FBQyxxQkFBcUIsQ0FBQztrQ0FBc0IsMENBQW1COzhEQUFDO0lBQ3JDO1FBQXJDLGdCQUFTLENBQUMseUJBQXlCLENBQUM7a0NBQTBCLGtEQUF1QjtrRUFBQztJQUNuRDtRQUFuQyxnQkFBUyxDQUFDLHVCQUF1QixDQUFDO2tDQUF3Qiw4Q0FBcUI7Z0VBQUM7SUFMeEUsYUFBYTtRQUx6QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7U0FDdkMsQ0FBQzt5Q0FnQmdDLHlCQUFnQjtZQUNyQix1QkFBYztZQUNULGtDQUFlO09BakJwQyxhQUFhLENBMEZ6QjtJQUFELG9CQUFDO0NBQUEsQUExRkQsSUEwRkM7QUExRlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEFjdGlvbkJ1dHRvbkNvbXBvbmVudCB9IGZyb20gXCIuL3NlYXJjaHJlc3VsdC9hY3Rpb24tYnV0dG9uL2FjdGlvbi1idXR0b24uY29tcG9uZW50XCI7XG5pbXBvcnQgeyBGcmllbmRsaXN0Q29tcG9uZW50IH0gZnJvbSBcIi4vZnJpZW5kbGlzdC9mcmllbmRsaXN0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgRnJpZW5kY2hhdENvbXBvbmVudCB9IGZyb20gXCIuL2ZyaWVuZGNoYXQvZnJpZW5kY2hhdC5jb21wb25lbnRcIjtcbmltcG9ydCB7IEZyaWVuZG1hdGNoaW5nQ29tcG9uZW50IH0gZnJvbSBcIi4vZnJpZW5kbWF0Y2hpbmcvZnJpZW5kbWF0Y2hpbmcuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBJZGVhbWF0Y2hpbmdDb21wb25lbnQgfSBmcm9tIFwiLi9pZGVhbWF0Y2hpbmcvaWRlYW1hdGNoaW5nLmNvbXBvbmVudFwiO1xuXG5pbXBvcnQgeyBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RhYi12aWV3XCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvY29yZS92aWV3XCI7XG5pbXBvcnQgeyBhbGVydCwgY29uZmlybSwgcHJvbXB0LCBsb2dpbiwgYWN0aW9uLCBpbnB1dFR5cGUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzXCI7XG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcbmltcG9ydCBmaXJlYmFzZVdlYiA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlL2FwcFwiKTtcblxudmFyIGZzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIik7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyXCI7XG5cbmltcG9ydCB7IEZpcmViYXNlU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2VcIjtcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIkhvbWVcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaG9tZS5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIEBWaWV3Q2hpbGQoXCJhY3Rpb25CdXR0b25cIikgX2J1dHRvblJlZjogQWN0aW9uQnV0dG9uQ29tcG9uZW50O1xuICAgIEBWaWV3Q2hpbGQoXCJmcmllbmRsaXN0Q29tcG9uZW50XCIpIGZyaWVuZGxpc3RDb21wb25lbnQ6IEZyaWVuZGxpc3RDb21wb25lbnQ7XG4gICAgQFZpZXdDaGlsZChcImZyaWVuZGNoYXRDb21wb25lbnRcIikgZnJpZW5kY2hhdENvbXBvbmVudDogRnJpZW5kY2hhdENvbXBvbmVudDtcbiAgICBAVmlld0NoaWxkKFwiZnJpZW5kbWF0Y2hpbmdDb21wb25lbnRcIikgZnJpZW5kbWF0Y2hpbmdDb21wb25lbnQ6IEZyaWVuZG1hdGNoaW5nQ29tcG9uZW50O1xuICAgIEBWaWV3Q2hpbGQoXCJpZGVhbWF0Y2hpbmdDb21wb25lbnRcIikgaWRlYW1hdGNoaW5nQ29tcG9uZW50OiBJZGVhbWF0Y2hpbmdDb21wb25lbnQ7XG4gICAgcHVibGljIHRhYlNlbGVjdGVkSW5kZXg6IG51bWJlcjtcbiAgICBwdWJsaWMgdGFiU2VsZWN0ZWRJbmRleFJlc3VsdDogc3RyaW5nO1xuICAgIHRoaXNVc2VyOiBhbnk7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBmcmllbmRsaXN0SWNvbjogc3RyaW5nO1xuICAgIGZyaWVuZGNoYXRJY29uOiBzdHJpbmc7XG4gICAgZnJpZW5kbWF0Y2hpbmdJY29uOiBzdHJpbmc7XG4gICAgaWRlYW1hdGNoaW5nSWNvbjogc3RyaW5nO1xuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgIHByaXZhdGUgYWN0aXZlUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBwcml2YXRlIGZpcmViYXNlU2VydmljZXM6IEZpcmViYXNlU2VydmljZSxcbiAgICApIHtcbiAgICAgICAgLy8gVXNlIHRoZSBjb21wb25lbnQgY29uc3RydWN0b3IgdG8gaW5qZWN0IHByb3ZpZGVycy5cbiAgICAgICAgdGhpcy5mcmllbmRsaXN0SWNvbiA9ICd+L2hvbWUvaW1hZ2VzL3VzZXItYXZhdGFyLW1haW4tcGljdHVyZS5wbmcnO1xuICAgICAgICB0aGlzLmZyaWVuZGNoYXRJY29uID0gJ34vaG9tZS9pbWFnZXMvc3BlZWNoLWJ1YmJsZS5wbmcnO1xuICAgICAgICB0aGlzLmZyaWVuZG1hdGNoaW5nSWNvbiA9ICd+L2hvbWUvaW1hZ2VzL21hZ25pZmllci13aXRoLWEtaGVhcnQucG5nJztcbiAgICAgICAgdGhpcy5pZGVhbWF0Y2hpbmdJY29uID0gJ34vaG9tZS9pbWFnZXMvbWFnbmlmaWVyLXdpdGgtYS1zdGFyLnBuZyc7XG4gICAgfVxuXG5cblxuICAgIG9uU2VsZWN0ZWRJbmRleENoYW5nZWQoYXJnczogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEpIHtcbiAgICAgICAgaWYgKGFyZ3Mub2xkSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdJbmRleCA9IGFyZ3MubmV3SW5kZXg7XG4gICAgICAgICAgICBpZiAobmV3SW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3SW5kZXggPT09IDEpIHtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3SW5kZXggPT09IDIpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maXJlYmFzZVNlcnZpY2VzLnRoaXNVc2VyLmVubmVhZ3JhbS5udW1iZXIgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbm5lYWdyYW1Db25maXJtKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXdJbmRleCA9PT0gMykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpcmViYXNlU2VydmljZXMudGhpc1VzZXIuZW5uZWFncmFtLm51bWJlciA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVubmVhZ3JhbUNvbmZpcm0oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoYXJncy5vbGRJbmRleCA9PSAwKXtcbiAgICAgICAgICAgIHRoaXMuZnJpZW5kbGlzdENvbXBvbmVudC5jbG9zZU1vZGFsKCk7XG4gICAgICAgICAgICB0aGlzLmZyaWVuZGxpc3RDb21wb25lbnQuY2xvc2VNb2RhbCgpO1xuICAgICAgICAgICAgaWYodGhpcy5mcmllbmRsaXN0Q29tcG9uZW50LmRyYXdlcil7XG4gICAgICAgICAgICAgICAgdGhpcy5mcmllbmRsaXN0Q29tcG9uZW50Lm9uVGFwKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5mcmllbmRsaXN0Q29tcG9uZW50LmZsb2F0QnV0dG9uLmJ1dHRvbi5jbGFzc05hbWUgPVwiZmxvYXQtYnRuIGRvd25cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbm5lYWdyYW1Db25maXJtKCkge1xuICAgICAgICBjb25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIk1hdGNoaW5nIEZyaWVuZFwiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJZb3UgY2FuIGdldCBuZXcgZnJpZW5kcy4gXFxuIFBsZWFzZSBmaWxsIHlvdXIgZW5uZWFncmFtIHN0YXR1cy5cIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiTGF0ZXJcIixcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJHbyBFbm5lYWdyYW1cIixcbiAgICAgICAgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2VubmVhZ3JhbSddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVhbWF0Y2hpbmdUYXAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlkZWFtYXRjaGluZ0ljb24gPSAnfi9ob21lL2ltYWdlcy9tYWduaWZpZXItd2l0aC1hLXN0YXItbG9ja2VkLnBuZycpIHtcblxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcblxuICAgIH1cblxuICAgIGFmdGVyTG9naW4oKTogdm9pZHtcbiAgICAgICAgLy8gSW5pdCB5b3VyIGNvbXBvbmVudCBwcm9wZXJ0aWVzIGhlcmUuXG4gICAgICAgIGlmICh0aGlzLmZpcmViYXNlU2VydmljZXMudGhpc1VzZXIuZW5uZWFncmFtLm51bWJlciA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5mcmllbmRtYXRjaGluZ0ljb24gPSAnfi9ob21lL2ltYWdlcy9tYWduaWZpZXItd2l0aC1hLWhlYXJ0LWxvY2tlZC5wbmcnO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmZpcmViYXNlU2VydmljZXMudGhpc1VzZXIuZW5uZWFncmFtLm51bWJlciA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5pZGVhbWF0Y2hpbmdJY29uID0gJ34vaG9tZS9pbWFnZXMvbWFnbmlmaWVyLXdpdGgtYS1zdGFyLWxvY2tlZC5wbmcnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj5hcHAuZ2V0Um9vdFZpZXcoKTtcbiAgICAgICAgc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxufVxuIl19