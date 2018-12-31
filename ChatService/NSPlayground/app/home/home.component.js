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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCxzREFBK0Q7QUFDL0QsMENBQWlEO0FBQ2pELGdHQUE2RjtBQUM3RiwwRUFBd0U7QUFDeEUsMEVBQXdFO0FBQ3hFLHNGQUFvRjtBQUNwRixnRkFBOEU7QUFJOUUsdURBQStGO0FBSS9GLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBQ2pELGlDQUFtQztBQUduQyxpRUFBOEQ7QUFPOUQ7SUFjSSx1QkFDWSxnQkFBa0MsRUFDbEMsV0FBMkIsRUFDM0IsZ0JBQWlDO1FBRmpDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBQzNCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFFekMscURBQXFEO1FBQ3JELElBQUksQ0FBQyxjQUFjLEdBQUcsNENBQTRDLENBQUM7UUFDbkUsSUFBSSxDQUFDLGNBQWMsR0FBRyxpQ0FBaUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsMENBQTBDLENBQUM7UUFDckUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLHlDQUF5QyxDQUFDO0lBQ3RFLENBQUM7SUFJRCw4Q0FBc0IsR0FBdEIsVUFBdUIsSUFBbUM7UUFDdEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMvQixFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLENBQUM7WUFBQyxJ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LGdCQUFTLENBQUMscUJBQXFCLENBQUM7a0NBQXNCLDBDQUFtQjs4REFBQztJQUN6QztRQUFqQyxnQkFBUyxDQUFDLHFCQUFxQixDQUFDO2tDQUFzQiwwQ0FBbUI7OERBQUM7SUFDckM7UUFBckMsZ0JBQVMsQ0FBQyx5QkFBeUIsQ0FBQztrQ0FBMEIsa0RBQXVCO2tFQUFDO0lBQ25EO1FBQW5DLGdCQUFTLENBQUMsdUJBQXVCLENBQUM7a0NBQXdCLDhDQUFxQjtnRUFBQztJQUx4RSxhQUFhO1FBTnpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtTQUN2QyxDQUFDO3lDQWlCZ0MseUJBQWdCO1lBQ3JCLHVCQUFjO1lBQ1Qsa0NBQWU7T0FqQnBDLGFBQWEsQ0EwRnpCO0lBQUQsb0JBQUM7Q0FBQSxBQTFGRCxJQTBGQztBQTFGWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgQWN0aW9uQnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4vc2VhcmNocmVzdWx0L2FjdGlvbi1idXR0b24vYWN0aW9uLWJ1dHRvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRnJpZW5kbGlzdENvbXBvbmVudCB9IGZyb20gXCIuL2ZyaWVuZGxpc3QvZnJpZW5kbGlzdC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRnJpZW5kY2hhdENvbXBvbmVudCB9IGZyb20gXCIuL2ZyaWVuZGNoYXQvZnJpZW5kY2hhdC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRnJpZW5kbWF0Y2hpbmdDb21wb25lbnQgfSBmcm9tIFwiLi9mcmllbmRtYXRjaGluZy9mcmllbmRtYXRjaGluZy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgSWRlYW1hdGNoaW5nQ29tcG9uZW50IH0gZnJvbSBcIi4vaWRlYW1hdGNoaW5nL2lkZWFtYXRjaGluZy5jb21wb25lbnRcIjtcclxuXHJcbmltcG9ydCB7IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGFiLXZpZXdcIjtcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlld1wiO1xyXG5pbXBvcnQgeyBhbGVydCwgY29uZmlybSwgcHJvbXB0LCBsb2dpbiwgYWN0aW9uLCBpbnB1dFR5cGUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzXCI7XHJcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xyXG5pbXBvcnQgZmlyZWJhc2VXZWIgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHBcIik7XHJcblxyXG52YXIgZnMgPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9maWxlLXN5c3RlbVwiKTtcclxuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJhcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1zaWRlZHJhd2VyXCI7XHJcblxyXG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiSG9tZVwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaG9tZS5jb21wb25lbnQuaHRtbFwiXHJcbn0pXHJcblxyXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBAVmlld0NoaWxkKFwiYWN0aW9uQnV0dG9uXCIpIF9idXR0b25SZWY6IEFjdGlvbkJ1dHRvbkNvbXBvbmVudDtcclxuICAgIEBWaWV3Q2hpbGQoXCJmcmllbmRsaXN0Q29tcG9uZW50XCIpIGZyaWVuZGxpc3RDb21wb25lbnQ6IEZyaWVuZGxpc3RDb21wb25lbnQ7XHJcbiAgICBAVmlld0NoaWxkKFwiZnJpZW5kY2hhdENvbXBvbmVudFwiKSBmcmllbmRjaGF0Q29tcG9uZW50OiBGcmllbmRjaGF0Q29tcG9uZW50O1xyXG4gICAgQFZpZXdDaGlsZChcImZyaWVuZG1hdGNoaW5nQ29tcG9uZW50XCIpIGZyaWVuZG1hdGNoaW5nQ29tcG9uZW50OiBGcmllbmRtYXRjaGluZ0NvbXBvbmVudDtcclxuICAgIEBWaWV3Q2hpbGQoXCJpZGVhbWF0Y2hpbmdDb21wb25lbnRcIikgaWRlYW1hdGNoaW5nQ29tcG9uZW50OiBJZGVhbWF0Y2hpbmdDb21wb25lbnQ7XHJcbiAgICBwdWJsaWMgdGFiU2VsZWN0ZWRJbmRleDogbnVtYmVyO1xyXG4gICAgcHVibGljIHRhYlNlbGVjdGVkSW5kZXhSZXN1bHQ6IHN0cmluZztcclxuICAgIHRoaXNVc2VyOiBhbnk7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgZnJpZW5kbGlzdEljb246IHN0cmluZztcclxuICAgIGZyaWVuZGNoYXRJY29uOiBzdHJpbmc7XHJcbiAgICBmcmllbmRtYXRjaGluZ0ljb246IHN0cmluZztcclxuICAgIGlkZWFtYXRjaGluZ0ljb246IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgICAgICBwcml2YXRlIGFjdGl2ZVJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcclxuICAgICAgICBwcml2YXRlIGZpcmViYXNlU2VydmljZXM6IEZpcmViYXNlU2VydmljZSxcclxuICAgICkge1xyXG4gICAgICAgIC8vIFVzZSB0aGUgY29tcG9uZW50IGNvbnN0cnVjdG9yIHRvIGluamVjdCBwcm92aWRlcnMuXHJcbiAgICAgICAgdGhpcy5mcmllbmRsaXN0SWNvbiA9ICd+L2hvbWUvaW1hZ2VzL3VzZXItYXZhdGFyLW1haW4tcGljdHVyZS5wbmcnO1xyXG4gICAgICAgIHRoaXMuZnJpZW5kY2hhdEljb24gPSAnfi9ob21lL2ltYWdlcy9zcGVlY2gtYnViYmxlLnBuZyc7XHJcbiAgICAgICAgdGhpcy5mcmllbmRtYXRjaGluZ0ljb24gPSAnfi9ob21lL2ltYWdlcy9tYWduaWZpZXItd2l0aC1hLWhlYXJ0LnBuZyc7XHJcbiAgICAgICAgdGhpcy5pZGVhbWF0Y2hpbmdJY29uID0gJ34vaG9tZS9pbWFnZXMvbWFnbmlmaWVyLXdpdGgtYS1zdGFyLnBuZyc7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBvblNlbGVjdGVkSW5kZXhDaGFuZ2VkKGFyZ3M6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XHJcbiAgICAgICAgaWYgKGFyZ3Mub2xkSW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld0luZGV4ID0gYXJncy5uZXdJbmRleDtcclxuICAgICAgICAgICAgaWYgKG5ld0luZGV4ID09PSAwKSB7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3SW5kZXggPT09IDEpIHtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXdJbmRleCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmlyZWJhc2VTZXJ2aWNlcy50aGlzVXNlci5lbm5lYWdyYW0ubnVtYmVyID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbm5lYWdyYW1Db25maXJtKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3SW5kZXggPT09IDMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpcmViYXNlU2VydmljZXMudGhpc1VzZXIuZW5uZWFncmFtLm51bWJlciA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5uZWFncmFtQ29uZmlybSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGFyZ3Mub2xkSW5kZXggPT0gMCl7XHJcbiAgICAgICAgICAgIHRoaXMuZnJpZW5kbGlzdENvbXBvbmVudC5jbG9zZU1vZGFsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuZnJpZW5kbGlzdENvbXBvbmVudC5jbG9zZU1vZGFsKCk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZnJpZW5kbGlzdENvbXBvbmVudC5kcmF3ZXIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmllbmRsaXN0Q29tcG9uZW50Lm9uRmxvYXRCdXR0b25UYXAoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJpZW5kbGlzdENvbXBvbmVudC5mbG9hdEJ1dHRvbi5idXR0b24uY2xhc3NOYW1lID1cImZsb2F0LWJ0biBkb3duXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbm5lYWdyYW1Db25maXJtKCkge1xyXG4gICAgICAgIGNvbmZpcm0oe1xyXG4gICAgICAgICAgICB0aXRsZTogXCJNYXRjaGluZyBGcmllbmRcIixcclxuICAgICAgICAgICAgbWVzc2FnZTogXCJZb3UgY2FuIGdldCBuZXcgZnJpZW5kcy4gXFxuIFBsZWFzZSBmaWxsIHlvdXIgZW5uZWFncmFtIHN0YXR1cy5cIixcclxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJMYXRlclwiLFxyXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiR28gRW5uZWFncmFtXCIsXHJcbiAgICAgICAgfSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9lbm5lYWdyYW0nXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlkZWFtYXRjaGluZ1RhcCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pZGVhbWF0Y2hpbmdJY29uID0gJ34vaG9tZS9pbWFnZXMvbWFnbmlmaWVyLXdpdGgtYS1zdGFyLWxvY2tlZC5wbmcnKSB7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGFmdGVyTG9naW4oKTogdm9pZHtcclxuICAgICAgICAvLyBJbml0IHlvdXIgY29tcG9uZW50IHByb3BlcnRpZXMgaGVyZS5cclxuICAgICAgICBpZiAodGhpcy5maXJlYmFzZVNlcnZpY2VzLnRoaXNVc2VyLmVubmVhZ3JhbS5udW1iZXIgPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5mcmllbmRtYXRjaGluZ0ljb24gPSAnfi9ob21lL2ltYWdlcy9tYWduaWZpZXItd2l0aC1hLWhlYXJ0LWxvY2tlZC5wbmcnO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5maXJlYmFzZVNlcnZpY2VzLnRoaXNVc2VyLmVubmVhZ3JhbS5udW1iZXIgPT09IDApIHtcclxuICAgICAgICAgICAgdGhpcy5pZGVhbWF0Y2hpbmdJY29uID0gJ34vaG9tZS9pbWFnZXMvbWFnbmlmaWVyLXdpdGgtYS1zdGFyLWxvY2tlZC5wbmcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkRyYXdlckJ1dHRvblRhcCgpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+YXBwLmdldFJvb3RWaWV3KCk7XHJcbiAgICAgICAgc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XHJcbiAgICB9XHJcbn1cclxuIl19