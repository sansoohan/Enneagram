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
        this.friendlistIcon = '~/pages/home/images/user-avatar-main-picture.png';
        this.friendchatIcon = '~/pages/home/images/speech-bubble.png';
        this.friendmatchingIcon = '~/pages/home/images/magnifier-with-a-heart.png';
        this.ideamatchingIcon = '~/pages/home/images/magnifier-with-a-star.png';
    }
    HomeComponent.prototype.ngOnInit = function () {
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
            this.friendmatchingIcon = '~/pages/home/images/magnifier-with-a-heart-locked.png';
        }
        if (this.firebaseServices.thisUser.enneagram.number === 0) {
            this.ideamatchingIcon = '~/pages/home/images/magnifier-with-a-star-locked.png';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCxzREFBK0Q7QUFDL0QsMENBQWlEO0FBQ2pELG1HQUFnRztBQUNoRywwRUFBd0U7QUFDeEUsMEVBQXdFO0FBQ3hFLHNGQUFvRjtBQUNwRixnRkFBOEU7QUFJOUUsdURBQStGO0FBSS9GLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBQ2pELGlDQUFtQztBQUduQyxvRUFBaUU7QUFPakU7SUFjSSx1QkFDWSxnQkFBa0MsRUFDbEMsV0FBMkIsRUFDM0IsZ0JBQWlDO1FBRmpDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQzNCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFFekMscURBQXFEO1FBQ3JELElBQUksQ0FBQyxjQUFjLEdBQUcsa0RBQWtELENBQUM7UUFDekUsSUFBSSxDQUFDLGNBQWMsR0FBRyx1Q0FBdUMsQ0FBQztRQUM5RCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsZ0RBQWdELENBQUM7UUFDM0UsSUFBSSxDQUFDLGdCQUFnQixHQUFHLCtDQUErQyxDQUFDO0lBQzVFLENBQUM7SUFFRCxnQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQUVELDhDQUFzQixHQUF0QixVQUF1QixJQUFtQztRQUN0RCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDdEIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMvQixJQUFJLFFBQVEsS0FBSyxDQUFDLEVBQUU7YUFDbkI7aUJBQU0sSUFBSSxRQUFRLEtBQUssQ0FBQyxFQUFFO2FBQzFCO2lCQUFNLElBQUksUUFBUSxLQUFLLENBQUMsRUFBRTtnQkFDdkIsSUFBSSxJQUFJLENBQUMsZ0JBQWdC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Q29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEFjdGlvbkJ1dHRvbkNvbXBvbmVudCB9IGZyb20gXCJ+L21vZHVsZXMvYnV0dG9ucy9hY3Rpb24tYnV0dG9uL2FjdGlvbi1idXR0b24uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEZyaWVuZGxpc3RDb21wb25lbnQgfSBmcm9tIFwiLi9mcmllbmRsaXN0L2ZyaWVuZGxpc3QuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEZyaWVuZGNoYXRDb21wb25lbnQgfSBmcm9tIFwiLi9mcmllbmRjaGF0L2ZyaWVuZGNoYXQuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEZyaWVuZG1hdGNoaW5nQ29tcG9uZW50IH0gZnJvbSBcIi4vZnJpZW5kbWF0Y2hpbmcvZnJpZW5kbWF0Y2hpbmcuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IElkZWFtYXRjaGluZ0NvbXBvbmVudCB9IGZyb20gXCIuL2lkZWFtYXRjaGluZy9pZGVhbWF0Y2hpbmcuY29tcG9uZW50XCI7XHJcblxyXG5pbXBvcnQgeyBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3RhYi12aWV3XCI7XHJcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9jb3JlL3ZpZXdcIjtcclxuaW1wb3J0IHsgYWxlcnQsIGNvbmZpcm0sIHByb21wdCwgbG9naW4sIGFjdGlvbiwgaW5wdXRUeXBlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcclxuaW1wb3J0IGZpcmViYXNlV2ViID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2UvYXBwXCIpO1xyXG5cclxudmFyIGZzID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvZmlsZS1zeXN0ZW1cIik7XHJcbmltcG9ydCAqIGFzIGFwcCBmcm9tIFwiYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiO1xyXG5cclxuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIkhvbWVcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2hvbWUuY29tcG9uZW50Lmh0bWxcIlxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgQFZpZXdDaGlsZChcImFjdGlvbkJ1dHRvblwiKSBfYnV0dG9uUmVmOiBBY3Rpb25CdXR0b25Db21wb25lbnQ7XHJcbiAgICBAVmlld0NoaWxkKFwiZnJpZW5kbGlzdENvbXBvbmVudFwiKSBmcmllbmRsaXN0Q29tcG9uZW50OiBGcmllbmRsaXN0Q29tcG9uZW50O1xyXG4gICAgQFZpZXdDaGlsZChcImZyaWVuZGNoYXRDb21wb25lbnRcIikgZnJpZW5kY2hhdENvbXBvbmVudDogRnJpZW5kY2hhdENvbXBvbmVudDtcclxuICAgIEBWaWV3Q2hpbGQoXCJmcmllbmRtYXRjaGluZ0NvbXBvbmVudFwiKSBmcmllbmRtYXRjaGluZ0NvbXBvbmVudDogRnJpZW5kbWF0Y2hpbmdDb21wb25lbnQ7XHJcbiAgICBAVmlld0NoaWxkKFwiaWRlYW1hdGNoaW5nQ29tcG9uZW50XCIpIGlkZWFtYXRjaGluZ0NvbXBvbmVudDogSWRlYW1hdGNoaW5nQ29tcG9uZW50O1xyXG4gICAgcHVibGljIHRhYlNlbGVjdGVkSW5kZXg6IG51bWJlcjtcclxuICAgIHB1YmxpYyB0YWJTZWxlY3RlZEluZGV4UmVzdWx0OiBzdHJpbmc7XHJcbiAgICB0aGlzVXNlcjogYW55O1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIGZyaWVuZGxpc3RJY29uOiBzdHJpbmc7XHJcbiAgICBmcmllbmRjaGF0SWNvbjogc3RyaW5nO1xyXG4gICAgZnJpZW5kbWF0Y2hpbmdJY29uOiBzdHJpbmc7XHJcbiAgICBpZGVhbWF0Y2hpbmdJY29uOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICAgICAgcHJpdmF0ZSBhY3RpdmVSb3V0ZTogQWN0aXZhdGVkUm91dGUsXHJcbiAgICAgICAgcHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2VzOiBGaXJlYmFzZVNlcnZpY2UsXHJcbiAgICApIHtcclxuICAgICAgICAvLyBVc2UgdGhlIGNvbXBvbmVudCBjb25zdHJ1Y3RvciB0byBpbmplY3QgcHJvdmlkZXJzLlxyXG4gICAgICAgIHRoaXMuZnJpZW5kbGlzdEljb24gPSAnfi9wYWdlcy9ob21lL2ltYWdlcy91c2VyLWF2YXRhci1tYWluLXBpY3R1cmUucG5nJztcclxuICAgICAgICB0aGlzLmZyaWVuZGNoYXRJY29uID0gJ34vcGFnZXMvaG9tZS9pbWFnZXMvc3BlZWNoLWJ1YmJsZS5wbmcnO1xyXG4gICAgICAgIHRoaXMuZnJpZW5kbWF0Y2hpbmdJY29uID0gJ34vcGFnZXMvaG9tZS9pbWFnZXMvbWFnbmlmaWVyLXdpdGgtYS1oZWFydC5wbmcnO1xyXG4gICAgICAgIHRoaXMuaWRlYW1hdGNoaW5nSWNvbiA9ICd+L3BhZ2VzL2hvbWUvaW1hZ2VzL21hZ25pZmllci13aXRoLWEtc3Rhci5wbmcnO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuICAgIFxyXG4gICAgb25TZWxlY3RlZEluZGV4Q2hhbmdlZChhcmdzOiBTZWxlY3RlZEluZGV4Q2hhbmdlZEV2ZW50RGF0YSkge1xyXG4gICAgICAgIGlmIChhcmdzLm9sZEluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgICBjb25zdCBuZXdJbmRleCA9IGFyZ3MubmV3SW5kZXg7XHJcbiAgICAgICAgICAgIGlmIChuZXdJbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5ld0luZGV4ID09PSAxKSB7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3SW5kZXggPT09IDIpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpcmViYXNlU2VydmljZXMudGhpc1VzZXIuZW5uZWFncmFtLm51bWJlciA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5uZWFncmFtQ29uZmlybSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5ld0luZGV4ID09PSAzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maXJlYmFzZVNlcnZpY2VzLnRoaXNVc2VyLmVubmVhZ3JhbS5udW1iZXIgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVubmVhZ3JhbUNvbmZpcm0oKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihhcmdzLm9sZEluZGV4ID09IDApe1xyXG4gICAgICAgICAgICB0aGlzLmZyaWVuZGxpc3RDb21wb25lbnQuY2xvc2VNb2RhbCgpO1xyXG4gICAgICAgICAgICB0aGlzLmZyaWVuZGxpc3RDb21wb25lbnQuY2xvc2VNb2RhbCgpO1xyXG4gICAgICAgICAgICBpZih0aGlzLmZyaWVuZGxpc3RDb21wb25lbnQuZHJhd2VyKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJpZW5kbGlzdENvbXBvbmVudC5vbkZsb2F0QnV0dG9uVGFwKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyaWVuZGxpc3RDb21wb25lbnQuZmxvYXRCdXR0b24uYnV0dG9uLmNsYXNzTmFtZSA9XCJmbG9hdC1idG4gZG93blwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZW5uZWFncmFtQ29uZmlybSgpIHtcclxuICAgICAgICBjb25maXJtKHtcclxuICAgICAgICAgICAgdGl0bGU6IFwiTWF0Y2hpbmcgRnJpZW5kXCIsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiWW91IGNhbiBnZXQgbmV3IGZyaWVuZHMuIFxcbiBQbGVhc2UgZmlsbCB5b3VyIGVubmVhZ3JhbSBzdGF0dXMuXCIsXHJcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiTGF0ZXJcIixcclxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIkdvIEVubmVhZ3JhbVwiLFxyXG4gICAgICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvZW5uZWFncmFtJ10sIHsgYW5pbWF0ZWQ6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYnV0dG9uUmVmLm1ha2VBcnJvdygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBhZnRlckxvZ2luKCk6IHZvaWR7XHJcbiAgICAgICAgLy8gSW5pdCB5b3VyIGNvbXBvbmVudCBwcm9wZXJ0aWVzIGhlcmUuXHJcbiAgICAgICAgaWYgKHRoaXMuZmlyZWJhc2VTZXJ2aWNlcy50aGlzVXNlci5lbm5lYWdyYW0ubnVtYmVyID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZnJpZW5kbWF0Y2hpbmdJY29uID0gJ34vcGFnZXMvaG9tZS9pbWFnZXMvbWFnbmlmaWVyLXdpdGgtYS1oZWFydC1sb2NrZWQucG5nJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZmlyZWJhc2VTZXJ2aWNlcy50aGlzVXNlci5lbm5lYWdyYW0ubnVtYmVyID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaWRlYW1hdGNoaW5nSWNvbiA9ICd+L3BhZ2VzL2hvbWUvaW1hZ2VzL21hZ25pZmllci13aXRoLWEtc3Rhci1sb2NrZWQucG5nJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc2lkZURyYXdlciA9IDxSYWRTaWRlRHJhd2VyPmFwcC5nZXRSb290VmlldygpO1xyXG4gICAgICAgIHNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==