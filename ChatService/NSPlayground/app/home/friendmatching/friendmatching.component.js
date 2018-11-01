"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var blog_service_1 = require("../blog/blog-service");
var router_1 = require("nativescript-angular/router");
var FriendmatchingComponent = /** @class */ (function () {
    function FriendmatchingComponent(blogService, routerExtensions) {
        this.blogService = blogService;
        this.routerExtensions = routerExtensions;
    }
    FriendmatchingComponent.prototype.ngOnInit = function () {
    };
    FriendmatchingComponent.prototype.onFoodJoinTap = function () {
    };
    FriendmatchingComponent.prototype.onFoodMakeTap = function () {
        this.blogService.postType = "food";
        this.routerExtensions.navigate(['/blog'], { animated: false });
        this._buttonRef.makeArrow();
    };
    FriendmatchingComponent.prototype.onGameJoinTap = function () {
    };
    FriendmatchingComponent.prototype.onGameMakeTap = function () {
        this.blogService.postType = "game";
        this.routerExtensions.navigate(['/blog'], { animated: false });
        this._buttonRef.makeArrow();
    };
    FriendmatchingComponent.prototype.onChatJoinTap = function () {
    };
    FriendmatchingComponent.prototype.onChatMakeTap = function () {
        this.blogService.postType = "chat";
        this.routerExtensions.navigate(['/blog'], { animated: false });
        this._buttonRef.makeArrow();
    };
    FriendmatchingComponent = __decorate([
        core_1.Component({
            selector: "Friendmatching",
            moduleId: module.id,
            templateUrl: "./friendmatching.component.html",
            styleUrls: ['./friendmatching.component.css']
        }),
        __metadata("design:paramtypes", [blog_service_1.BlogService,
            router_1.RouterExtensions])
    ], FriendmatchingComponent);
    return FriendmatchingComponent;
}());
exports.FriendmatchingComponent = FriendmatchingComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kbWF0Y2hpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kbWF0Y2hpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZEO0FBQzdELHFEQUFtRDtBQUNuRCxzREFBK0Q7QUFRL0Q7SUFFQyxpQ0FBb0IsV0FBd0IsRUFDbkMsZ0JBQWtDO1FBRHZCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ25DLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7SUFDeEMsQ0FBQztJQUVKLDBDQUFRLEdBQVI7SUFDQSxDQUFDO0lBQ0QsK0NBQWEsR0FBYjtJQUVBLENBQUM7SUFDRCwrQ0FBYSxHQUFiO1FBQ0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ25DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUNELCtDQUFhLEdBQWI7SUFFQSxDQUFDO0lBQ0QsK0NBQWEsR0FBYjtRQUNDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUNuQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFDRCwrQ0FBYSxHQUFiO0lBRUEsQ0FBQztJQUNELCtDQUFhLEdBQWI7UUFDQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDbkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBL0JXLHVCQUF1QjtRQU5uQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztTQUM3QyxDQUFDO3lDQUdnQywwQkFBVztZQUNqQix5QkFBZ0I7T0FIL0IsdUJBQXVCLENBZ0NuQztJQUFELDhCQUFDO0NBQUEsQUFoQ0QsSUFnQ0M7QUFoQ1ksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBCbG9nU2VydmljZSB9IGZyb20gXCIuLi9ibG9nL2Jsb2ctc2VydmljZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEFjdGlvbkJ1dHRvbkNvbXBvbmVudCB9IGZyb20gXCIuLi9zZWFyY2hyZXN1bHQvYWN0aW9uLWJ1dHRvbi9hY3Rpb24tYnV0dG9uLmNvbXBvbmVudFwiO1xuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiBcIkZyaWVuZG1hdGNoaW5nXCIsXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHRlbXBsYXRlVXJsOiBcIi4vZnJpZW5kbWF0Y2hpbmcuY29tcG9uZW50Lmh0bWxcIixcblx0c3R5bGVVcmxzOiBbJy4vZnJpZW5kbWF0Y2hpbmcuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZyaWVuZG1hdGNoaW5nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0cHJpdmF0ZSBfYnV0dG9uUmVmOiBBY3Rpb25CdXR0b25Db21wb25lbnQ7XG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgYmxvZ1NlcnZpY2U6IEJsb2dTZXJ2aWNlLFxuXHRcdHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucykge1xuICAgIH1cblxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcblx0fVxuXHRvbkZvb2RKb2luVGFwKCl7XG5cdFx0XG5cdH1cblx0b25Gb29kTWFrZVRhcCgpe1xuXHRcdHRoaXMuYmxvZ1NlcnZpY2UucG9zdFR5cGUgPSBcImZvb2RcIjtcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvYmxvZyddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcblx0XHR0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XG5cdH1cblx0b25HYW1lSm9pblRhcCgpe1xuXG5cdH1cblx0b25HYW1lTWFrZVRhcCgpe1xuXHRcdHRoaXMuYmxvZ1NlcnZpY2UucG9zdFR5cGUgPSBcImdhbWVcIjtcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvYmxvZyddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcblx0XHR0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XG5cdH1cblx0b25DaGF0Sm9pblRhcCgpe1xuXG5cdH1cblx0b25DaGF0TWFrZVRhcCgpe1xuXHRcdHRoaXMuYmxvZ1NlcnZpY2UucG9zdFR5cGUgPSBcImNoYXRcIjtcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvYmxvZyddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcblx0XHR0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XG5cdH1cbn0iXX0=