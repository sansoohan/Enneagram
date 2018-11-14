"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var blog_service_1 = require("../blog/blog-service");
var router_1 = require("nativescript-angular/router");
var search_service_1 = require("../searchoption/search-service");
var FriendmatchingComponent = /** @class */ (function () {
    function FriendmatchingComponent(blogService, routerExtensions, searchService) {
        this.blogService = blogService;
        this.routerExtensions = routerExtensions;
        this.searchService = searchService;
    }
    FriendmatchingComponent.prototype.ngOnInit = function () {
    };
    FriendmatchingComponent.prototype.onFoodJoinTap = function () {
        this.searchService.postType = "food";
        this.routerExtensions.navigate(['/searchoption'], { animated: false });
        this._buttonRef.makeArrow();
    };
    FriendmatchingComponent.prototype.onFoodMakeTap = function () {
        this.blogService.postType = "food";
        this.routerExtensions.navigate(['/blog'], { animated: false });
        this._buttonRef.makeArrow();
    };
    FriendmatchingComponent.prototype.onGameJoinTap = function () {
        this.searchService.postType = "game";
        this.routerExtensions.navigate(['/searchoption'], { animated: false });
        this._buttonRef.makeArrow();
    };
    FriendmatchingComponent.prototype.onGameMakeTap = function () {
        this.blogService.postType = "game";
        this.routerExtensions.navigate(['/blog'], { animated: false });
        this._buttonRef.makeArrow();
    };
    FriendmatchingComponent.prototype.onChatJoinTap = function () {
        this.searchService.postType = "chat";
        this.routerExtensions.navigate(['/searchoption'], { animated: false });
        this._buttonRef.makeArrow();
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
            router_1.RouterExtensions,
            search_service_1.SearchService])
    ], FriendmatchingComponent);
    return FriendmatchingComponent;
}());
exports.FriendmatchingComponent = FriendmatchingComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kbWF0Y2hpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kbWF0Y2hpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZEO0FBQzdELHFEQUFtRDtBQUNuRCxzREFBK0Q7QUFDL0QsaUVBQStEO0FBUy9EO0lBRUMsaUNBQ1MsV0FBd0IsRUFDeEIsZ0JBQWtDLEVBQ2xDLGFBQTRCO1FBRjVCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsa0JBQWEsR0FBYixhQUFhLENBQWU7SUFFbEMsQ0FBQztJQUVKLDBDQUFRLEdBQVI7SUFDQSxDQUFDO0lBQ0QsK0NBQWEsR0FBYjtRQUNDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFDRCwrQ0FBYSxHQUFiO1FBQ0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ25DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUNELCtDQUFhLEdBQWI7UUFDQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDckMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBQ0QsK0NBQWEsR0FBYjtRQUNDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUNuQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFDRCwrQ0FBYSxHQUFiO1FBQ0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUNELCtDQUFhLEdBQWI7UUFDQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDbkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBeENXLHVCQUF1QjtRQU5uQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztTQUM3QyxDQUFDO3lDQUlxQiwwQkFBVztZQUNOLHlCQUFnQjtZQUNuQiw4QkFBYTtPQUx6Qix1QkFBdUIsQ0F5Q25DO0lBQUQsOEJBQUM7Q0FBQSxBQXpDRCxJQXlDQztBQXpDWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEJsb2dTZXJ2aWNlIH0gZnJvbSBcIi4uL2Jsb2cvYmxvZy1zZXJ2aWNlXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gXCIuLi9zZWFyY2hvcHRpb24vc2VhcmNoLXNlcnZpY2VcIjtcblxuaW1wb3J0IHsgQWN0aW9uQnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4uL3NlYXJjaHJlc3VsdC9hY3Rpb24tYnV0dG9uL2FjdGlvbi1idXR0b24uY29tcG9uZW50XCI7XG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6IFwiRnJpZW5kbWF0Y2hpbmdcIixcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0dGVtcGxhdGVVcmw6IFwiLi9mcmllbmRtYXRjaGluZy5jb21wb25lbnQuaHRtbFwiLFxuXHRzdHlsZVVybHM6IFsnLi9mcmllbmRtYXRjaGluZy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRnJpZW5kbWF0Y2hpbmdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXHRwcml2YXRlIF9idXR0b25SZWY6IEFjdGlvbkJ1dHRvbkNvbXBvbmVudDtcblx0Y29uc3RydWN0b3IoXG5cdFx0cHJpdmF0ZSBibG9nU2VydmljZTogQmxvZ1NlcnZpY2UsXG5cdFx0cHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuXHRcdHByaXZhdGUgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZVxuXHQpIHtcbiAgICB9XG5cblx0bmdPbkluaXQoKTogdm9pZCB7XG5cdH1cblx0b25Gb29kSm9pblRhcCgpe1xuXHRcdHRoaXMuc2VhcmNoU2VydmljZS5wb3N0VHlwZSA9IFwiZm9vZFwiO1xuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9zZWFyY2hvcHRpb24nXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XG5cdFx0dGhpcy5fYnV0dG9uUmVmLm1ha2VBcnJvdygpO1xuXHR9XG5cdG9uRm9vZE1ha2VUYXAoKXtcblx0XHR0aGlzLmJsb2dTZXJ2aWNlLnBvc3RUeXBlID0gXCJmb29kXCI7XG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2Jsb2cnXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XG5cdFx0dGhpcy5fYnV0dG9uUmVmLm1ha2VBcnJvdygpO1xuXHR9XG5cdG9uR2FtZUpvaW5UYXAoKXtcblx0XHR0aGlzLnNlYXJjaFNlcnZpY2UucG9zdFR5cGUgPSBcImdhbWVcIjtcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvc2VhcmNob3B0aW9uJ10sIHsgYW5pbWF0ZWQ6IGZhbHNlIH0pO1xuXHRcdHRoaXMuX2J1dHRvblJlZi5tYWtlQXJyb3coKTtcblx0fVxuXHRvbkdhbWVNYWtlVGFwKCl7XG5cdFx0dGhpcy5ibG9nU2VydmljZS5wb3N0VHlwZSA9IFwiZ2FtZVwiO1xuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9ibG9nJ10sIHsgYW5pbWF0ZWQ6IGZhbHNlIH0pO1xuXHRcdHRoaXMuX2J1dHRvblJlZi5tYWtlQXJyb3coKTtcblx0fVxuXHRvbkNoYXRKb2luVGFwKCl7XG5cdFx0dGhpcy5zZWFyY2hTZXJ2aWNlLnBvc3RUeXBlID0gXCJjaGF0XCI7XG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL3NlYXJjaG9wdGlvbiddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcblx0XHR0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XG5cdH1cblx0b25DaGF0TWFrZVRhcCgpe1xuXHRcdHRoaXMuYmxvZ1NlcnZpY2UucG9zdFR5cGUgPSBcImNoYXRcIjtcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvYmxvZyddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcblx0XHR0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XG5cdH1cbn0iXX0=