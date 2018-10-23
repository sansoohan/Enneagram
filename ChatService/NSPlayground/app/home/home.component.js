"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var router_2 = require("@angular/router");
var action_button_component_1 = require("./ideamatching/action-button/action-button.component");
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var fs = require("tns-core-modules/file-system");
var app = require("application");
var friend_list_service_1 = require("./friendchat/friend-list.service");
var firebase_service_1 = require("../services/firebase.service");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(friendListService, routerExtensions, activeRoute, firebaseServices) {
        this.friendListService = friendListService;
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
    HomeComponent = __decorate([
        core_1.Component({
            selector: "Home",
            moduleId: module.id,
            templateUrl: "./home.component.html"
        }),
        __metadata("design:paramtypes", [friend_list_service_1.FriendListService,
            router_1.RouterExtensions,
            router_2.ActivatedRoute,
            firebase_service_1.FirebaseService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCxzREFBK0Q7QUFDL0QsMENBQWlEO0FBQ2pELGdHQUE2RjtBQUc3Rix1REFBK0Y7QUFJL0YsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDakQsaUNBQW1DO0FBR25DLHdFQUFxRTtBQUNyRSxpRUFBOEQ7QUFNOUQ7SUFVSSx1QkFBb0IsaUJBQW9DLEVBQzVDLGdCQUFrQyxFQUNsQyxXQUEyQixFQUMzQixnQkFBaUM7UUFIekIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUM1QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGdCQUFXLEdBQVgsV0FBVyxDQUFnQjtRQUMzQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBRXpDLHFEQUFxRDtRQUNyRCxJQUFJLENBQUMsY0FBYyxHQUFHLDRDQUE0QyxDQUFDO1FBQ25FLElBQUksQ0FBQyxjQUFjLEdBQUcsaUNBQWlDLENBQUM7UUFDeEQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLDBDQUEwQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyx5Q0FBeUMsQ0FBQztJQUN0RSxDQUFDO0lBSUQsOENBQXNCLEdBQXRCLFVBQXVCLElBQW1DO1FBQ3RELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDL0IsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDeEQsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Z0JBQzVCLENBQUM7WUFDTCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTVCLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUNELHdDQUFnQixHQUFoQjtRQUFBLGlCQVlDO1FBWEcsaUJBQU8sQ0FBQztZQUNKLEtBQUssRUFBRSxpQkFBaUI7WUFDeEIsT0FBTyxFQUFFLGdFQUFnRTtZQUN6RSxnQkFBZ0IsRUFBRSxPQUFPO1lBQ3pCLFlBQVksRUFBRSxjQUFjO1NBQy9CLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFNO1lBQ1gsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUNwRSxLQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2hDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCx1Q0FBZSxHQUFmO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdEQUFnRCxDQUFDLENBQUMsQ0FBQztRQUUvRSxDQUFDO0lBQ0wsQ0FBQztJQUdELGdDQUFRLEdBQVI7SUFFQSxDQUFDO0lBRUQsa0NBQVUsR0FBVjtRQUNJLHVDQUF1QztRQUN2QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsa0JBQWtCLEdBQUcsaURBQWlELENBQUM7UUFDaEYsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnREFBZ0QsQ0FBQztRQUM3RSxDQUFDO0lBQ0wsQ0FBQztJQUVELHlDQUFpQixHQUFqQjtRQUNJLElBQU0sVUFBVSxHQUFrQixHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDcEQsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUExRTBCO1FBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDO2tDQUFhLCtDQUFxQjtxREFBQztJQURwRCxhQUFhO1FBTHpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtTQUN2QyxDQUFDO3lDQVd5Qyx1Q0FBaUI7WUFDMUIseUJBQWdCO1lBQ3JCLHVCQUFjO1lBQ1Qsa0NBQWU7T0FicEMsYUFBYSxDQTRFekI7SUFBRCxvQkFBQztDQUFBLEFBNUVELElBNEVDO0FBNUVZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBBY3Rpb25CdXR0b25Db21wb25lbnQgfSBmcm9tIFwiLi9pZGVhbWF0Y2hpbmcvYWN0aW9uLWJ1dHRvbi9hY3Rpb24tYnV0dG9uLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS90YWItdmlld1wiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlld1wiO1xuaW1wb3J0IHsgYWxlcnQsIGNvbmZpcm0sIHByb21wdCwgbG9naW4sIGFjdGlvbiwgaW5wdXRUeXBlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9nc1wiO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQgZmlyZWJhc2VXZWIgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZS9hcHBcIik7XG5cbnZhciBmcyA9IHJlcXVpcmUoXCJ0bnMtY29yZS1tb2R1bGVzL2ZpbGUtc3lzdGVtXCIpO1xuaW1wb3J0ICogYXMgYXBwIGZyb20gXCJhcHBsaWNhdGlvblwiO1xuaW1wb3J0IHsgUmFkU2lkZURyYXdlciB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlclwiO1xuXG5pbXBvcnQgeyBGcmllbmRMaXN0U2VydmljZSB9IGZyb20gXCIuL2ZyaWVuZGNoYXQvZnJpZW5kLWxpc3Quc2VydmljZVwiO1xuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwiSG9tZVwiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9ob21lLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgQFZpZXdDaGlsZChcImFjdGlvbkJ1dHRvblwiKSBfYnV0dG9uUmVmOiBBY3Rpb25CdXR0b25Db21wb25lbnQ7XG4gICAgcHVibGljIHRhYlNlbGVjdGVkSW5kZXg6IG51bWJlcjtcbiAgICBwdWJsaWMgdGFiU2VsZWN0ZWRJbmRleFJlc3VsdDogc3RyaW5nO1xuICAgIHRoaXNVc2VyOiBhbnk7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBmcmllbmRsaXN0SWNvbjogc3RyaW5nO1xuICAgIGZyaWVuZGNoYXRJY29uOiBzdHJpbmc7XG4gICAgZnJpZW5kbWF0Y2hpbmdJY29uOiBzdHJpbmc7XG4gICAgaWRlYW1hdGNoaW5nSWNvbjogc3RyaW5nO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZnJpZW5kTGlzdFNlcnZpY2U6IEZyaWVuZExpc3RTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgIHByaXZhdGUgYWN0aXZlUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBwcml2YXRlIGZpcmViYXNlU2VydmljZXM6IEZpcmViYXNlU2VydmljZSxcbiAgICApIHtcbiAgICAgICAgLy8gVXNlIHRoZSBjb21wb25lbnQgY29uc3RydWN0b3IgdG8gaW5qZWN0IHByb3ZpZGVycy5cbiAgICAgICAgdGhpcy5mcmllbmRsaXN0SWNvbiA9ICd+L2hvbWUvaW1hZ2VzL3VzZXItYXZhdGFyLW1haW4tcGljdHVyZS5wbmcnO1xuICAgICAgICB0aGlzLmZyaWVuZGNoYXRJY29uID0gJ34vaG9tZS9pbWFnZXMvc3BlZWNoLWJ1YmJsZS5wbmcnO1xuICAgICAgICB0aGlzLmZyaWVuZG1hdGNoaW5nSWNvbiA9ICd+L2hvbWUvaW1hZ2VzL21hZ25pZmllci13aXRoLWEtaGVhcnQucG5nJztcbiAgICAgICAgdGhpcy5pZGVhbWF0Y2hpbmdJY29uID0gJ34vaG9tZS9pbWFnZXMvbWFnbmlmaWVyLXdpdGgtYS1zdGFyLnBuZyc7XG4gICAgfVxuXG5cblxuICAgIG9uU2VsZWN0ZWRJbmRleENoYW5nZWQoYXJnczogU2VsZWN0ZWRJbmRleENoYW5nZWRFdmVudERhdGEpIHtcbiAgICAgICAgaWYgKGFyZ3Mub2xkSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdJbmRleCA9IGFyZ3MubmV3SW5kZXg7XG4gICAgICAgICAgICBpZiAobmV3SW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3SW5kZXggPT09IDEpIHtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3SW5kZXggPT09IDIpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5maXJlYmFzZVNlcnZpY2VzLnRoaXNVc2VyLmVubmVhZ3JhbS5udW1iZXIgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbm5lYWdyYW1Db25maXJtKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXdJbmRleCA9PT0gMykge1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZW5uZWFncmFtQ29uZmlybSgpIHtcbiAgICAgICAgY29uZmlybSh7XG4gICAgICAgICAgICB0aXRsZTogXCJNYXRjaGluZyBGcmllbmRcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiWW91IGNhbiBnZXQgbmV3IGZyaWVuZHMuIFxcbiBQbGVhc2UgZmlsbCB5b3VyIGVubmVhZ3JhbSBzdGF0dXMuXCIsXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIkxhdGVyXCIsXG4gICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiR28gRW5uZWFncmFtXCIsXG4gICAgICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9lbm5lYWdyYW0nXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYnV0dG9uUmVmLm1ha2VBcnJvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaWRlYW1hdGNoaW5nVGFwKCkge1xuICAgICAgICBpZiAodGhpcy5pZGVhbWF0Y2hpbmdJY29uID0gJ34vaG9tZS9pbWFnZXMvbWFnbmlmaWVyLXdpdGgtYS1zdGFyLWxvY2tlZC5wbmcnKSB7XG5cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICBhZnRlckxvZ2luKCk6IHZvaWR7XG4gICAgICAgIC8vIEluaXQgeW91ciBjb21wb25lbnQgcHJvcGVydGllcyBoZXJlLlxuICAgICAgICBpZiAodGhpcy5maXJlYmFzZVNlcnZpY2VzLnRoaXNVc2VyLmVubmVhZ3JhbS5udW1iZXIgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZnJpZW5kbWF0Y2hpbmdJY29uID0gJ34vaG9tZS9pbWFnZXMvbWFnbmlmaWVyLXdpdGgtYS1oZWFydC1sb2NrZWQucG5nJztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5maXJlYmFzZVNlcnZpY2VzLnRoaXNVc2VyLmVubmVhZ3JhbS5udW1iZXIgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuaWRlYW1hdGNoaW5nSWNvbiA9ICd+L2hvbWUvaW1hZ2VzL21hZ25pZmllci13aXRoLWEtc3Rhci1sb2NrZWQucG5nJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBzaWRlRHJhd2VyID0gPFJhZFNpZGVEcmF3ZXI+YXBwLmdldFJvb3RWaWV3KCk7XG4gICAgICAgIHNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xuICAgIH1cbn1cbiJdfQ==