"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var router_2 = require("@angular/router");
var action_button_component_1 = require("./ideamatching/action-button/action-button.component");
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var app = require("application");
var friend_list_service_1 = require("./friendchat/friend-list.service");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(friendListService, routerExtensions, activeRoute) {
        this.friendListService = friendListService;
        this.routerExtensions = routerExtensions;
        this.activeRoute = activeRoute;
        // Use the component constructor to inject providers.
        this.friendlistIcon = '~/home/images/user-avatar-main-picture.png';
        this.friendchatIcon = '~/home/images/speech-bubble.png';
        this.friendmatchingIcon = '~/home/images/magnifier-with-a-heart.png';
        this.ideamatchingIcon = '~/home/images/magnifier-with-a-star.png';
        if (this.friendListService.thisUser.index.enneagramNumber === 0) {
            this.friendmatchingIcon = '~/home/images/magnifier-with-a-heart-locked.png';
        }
        if (this.friendListService.thisUser.index.enneagramNumber === 0) {
            this.ideamatchingIcon = '~/home/images/magnifier-with-a-star-locked.png';
        }
    }
    HomeComponent.prototype.onSelectedIndexChanged = function (args) {
        if (args.oldIndex !== -1) {
            var newIndex = args.newIndex;
            if (newIndex === 0) {
            }
            else if (newIndex === 1) {
            }
            else if (newIndex === 2) {
                if (this.friendListService.thisUser.index.enneagramNumber === 0) {
                    this.enneagramConfirm();
                }
            }
            else if (newIndex === 3) {
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
        // Init your component properties here.
    };
    HomeComponent.prototype.onDrawerButtonTap = function () {
        var sideDrawer = app.getRootView();
        sideDrawer.showDrawer();
    };
    __decorate([
        core_1.ViewChild("actionButton"),
        __metadata("design:type", action_button_component_1.ActionButtonComponent)
    ], HomeComponent.prototype, "_buttonRef", void 0);
    HomeComponent = __decorate([
        core_1.Component({
            selector: "Home",
            moduleId: module.id,
            templateUrl: "./home.component.html"
        }),
        __metadata("design:paramtypes", [friend_list_service_1.FriendListService,
            router_1.RouterExtensions,
            router_2.ActivatedRoute])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCxzREFBK0Q7QUFDL0QsMENBQWlEO0FBQ2pELGdHQUE2RjtBQUc3Rix1REFBK0Y7QUFFL0YsaUNBQW1DO0FBR25DLHdFQUFxRTtBQU9yRTtJQVVJLHVCQUFvQixpQkFBb0MsRUFDNUMsZ0JBQWtDLEVBQ2xDLFdBQTJCO1FBRm5CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDNUMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0I7UUFFbkMscURBQXFEO1FBQ3JELElBQUksQ0FBQyxjQUFjLEdBQUcsNENBQTRDLENBQUM7UUFDbkUsSUFBSSxDQUFDLGNBQWMsR0FBRyxpQ0FBaUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsMENBQTBDLENBQUM7UUFDckUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLHlDQUF5QyxDQUFDO1FBR2xFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLGVBQWUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxpREFBaUQsQ0FBQztRQUNoRixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsZUFBZSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdEQUFnRCxDQUFDO1FBQzdFLENBQUM7SUFDTCxDQUFDO0lBRUQsOENBQXNCLEdBQXRCLFVBQXVCLElBQW1DO1FBQ3RELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDL0IsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxlQUFlLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUQsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQzVCLENBQUM7WUFDTCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBSTVCLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUNELHdDQUFnQixHQUFoQjtRQUFBLGlCQVlDO1FBWEcsaUJBQU8sQ0FBQztZQUNKLEtBQUssRUFBRSxpQkFBaUI7WUFDeEIsT0FBTyxFQUFFLGdFQUFnRTtZQUN6RSxnQkFBZ0IsRUFBRSxPQUFPO1lBQ3pCLFlBQVksRUFBRSxjQUFjO1NBQy9CLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFNO1lBQ1gsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUNwRSxLQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2hDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCx1Q0FBZSxHQUFmO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdEQUFnRCxDQUFDLENBQUMsQ0FBQztRQUUvRSxDQUFDO0lBQ0wsQ0FBQztJQUdELGdDQUFRLEdBQVI7UUFDSSx1Q0FBdUM7SUFDM0MsQ0FBQztJQUVELHlDQUFpQixHQUFqQjtRQUNJLElBQU0sVUFBVSxHQUFrQixHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEQsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUF2RTBCO1FBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDO2tDQUFhLCtDQUFxQjtxREFBQztJQURwRCxhQUFhO1FBTHpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtTQUN2QyxDQUFDO3lDQVd5Qyx1Q0FBaUI7WUFDMUIseUJBQWdCO1lBQ3JCLHVCQUFjO09BWjlCLGFBQWEsQ0F5RXpCO0lBQUQsb0JBQUM7Q0FBQSxBQXpFRCxJQXlFQztBQXpFWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgQWN0aW9uQnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4vaWRlYW1hdGNoaW5nL2FjdGlvbi1idXR0b24vYWN0aW9uLWJ1dHRvbi5jb21wb25lbnRcIjtcbmltcG9ydCB7IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvdGFiLXZpZXdcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9jb3JlL3ZpZXdcIjtcbmltcG9ydCB7IGFsZXJ0LCBjb25maXJtLCBwcm9tcHQsIGxvZ2luLCBhY3Rpb24sIGlucHV0VHlwZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3NcIjtcblxuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJhcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiO1xuXG5pbXBvcnQgeyBGcmllbmRMaXN0U2VydmljZSB9IGZyb20gXCIuL2ZyaWVuZGNoYXQvZnJpZW5kLWxpc3Quc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJIb21lXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2hvbWUuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBAVmlld0NoaWxkKFwiYWN0aW9uQnV0dG9uXCIpIF9idXR0b25SZWY6IEFjdGlvbkJ1dHRvbkNvbXBvbmVudDtcbiAgICBwdWJsaWMgdGFiU2VsZWN0ZWRJbmRleDogbnVtYmVyO1xuICAgIHB1YmxpYyB0YWJTZWxlY3RlZEluZGV4UmVzdWx0OiBzdHJpbmc7XG5cbiAgICB0aXRsZTogc3RyaW5nO1xuICAgIGZyaWVuZGxpc3RJY29uOiBzdHJpbmc7XG4gICAgZnJpZW5kY2hhdEljb246IHN0cmluZztcbiAgICBmcmllbmRtYXRjaGluZ0ljb246IHN0cmluZztcbiAgICBpZGVhbWF0Y2hpbmdJY29uOiBzdHJpbmc7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBmcmllbmRMaXN0U2VydmljZTogRnJpZW5kTGlzdFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgcHJpdmF0ZSBhY3RpdmVSb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgKSB7XG4gICAgICAgIC8vIFVzZSB0aGUgY29tcG9uZW50IGNvbnN0cnVjdG9yIHRvIGluamVjdCBwcm92aWRlcnMuXG4gICAgICAgIHRoaXMuZnJpZW5kbGlzdEljb24gPSAnfi9ob21lL2ltYWdlcy91c2VyLWF2YXRhci1tYWluLXBpY3R1cmUucG5nJztcbiAgICAgICAgdGhpcy5mcmllbmRjaGF0SWNvbiA9ICd+L2hvbWUvaW1hZ2VzL3NwZWVjaC1idWJibGUucG5nJztcbiAgICAgICAgdGhpcy5mcmllbmRtYXRjaGluZ0ljb24gPSAnfi9ob21lL2ltYWdlcy9tYWduaWZpZXItd2l0aC1hLWhlYXJ0LnBuZyc7XG4gICAgICAgIHRoaXMuaWRlYW1hdGNoaW5nSWNvbiA9ICd+L2hvbWUvaW1hZ2VzL21hZ25pZmllci13aXRoLWEtc3Rhci5wbmcnO1xuXG5cbiAgICAgICAgaWYgKHRoaXMuZnJpZW5kTGlzdFNlcnZpY2UudGhpc1VzZXIuaW5kZXguZW5uZWFncmFtTnVtYmVyID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmZyaWVuZG1hdGNoaW5nSWNvbiA9ICd+L2hvbWUvaW1hZ2VzL21hZ25pZmllci13aXRoLWEtaGVhcnQtbG9ja2VkLnBuZyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZnJpZW5kTGlzdFNlcnZpY2UudGhpc1VzZXIuaW5kZXguZW5uZWFncmFtTnVtYmVyID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmlkZWFtYXRjaGluZ0ljb24gPSAnfi9ob21lL2ltYWdlcy9tYWduaWZpZXItd2l0aC1hLXN0YXItbG9ja2VkLnBuZyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblNlbGVjdGVkSW5kZXhDaGFuZ2VkKGFyZ3M6IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhKSB7XG4gICAgICAgIGlmIChhcmdzLm9sZEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgY29uc3QgbmV3SW5kZXggPSBhcmdzLm5ld0luZGV4O1xuICAgICAgICAgICAgaWYgKG5ld0luZGV4ID09PSAwKSB7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5ld0luZGV4ID09PSAxKSB7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5ld0luZGV4ID09PSAyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJpZW5kTGlzdFNlcnZpY2UudGhpc1VzZXIuaW5kZXguZW5uZWFncmFtTnVtYmVyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5uZWFncmFtQ29uZmlybSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3SW5kZXggPT09IDMpIHtcblxuXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbm5lYWdyYW1Db25maXJtKCkge1xuICAgICAgICBjb25maXJtKHtcbiAgICAgICAgICAgIHRpdGxlOiBcIk1hdGNoaW5nIEZyaWVuZFwiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJZb3UgY2FuIGdldCBuZXcgZnJpZW5kcy4gXFxuIFBsZWFzZSBmaWxsIHlvdXIgZW5uZWFncmFtIHN0YXR1cy5cIixcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiTGF0ZXJcIixcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJHbyBFbm5lYWdyYW1cIixcbiAgICAgICAgfSkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2VubmVhZ3JhbSddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVhbWF0Y2hpbmdUYXAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlkZWFtYXRjaGluZ0ljb24gPSAnfi9ob21lL2ltYWdlcy9tYWduaWZpZXItd2l0aC1hLXN0YXItbG9ja2VkLnBuZycpIHtcblxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgLy8gSW5pdCB5b3VyIGNvbXBvbmVudCBwcm9wZXJ0aWVzIGhlcmUuXG4gICAgfVxuXG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNpZGVEcmF3ZXIgPSA8UmFkU2lkZURyYXdlcj5hcHAuZ2V0Um9vdFZpZXcoKTtcbiAgICAgICAgc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XG4gICAgfVxufVxuIl19