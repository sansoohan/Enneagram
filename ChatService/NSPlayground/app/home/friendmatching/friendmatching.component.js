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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kbWF0Y2hpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kbWF0Y2hpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZEO0FBQzdELHFEQUFtRDtBQUNuRCxzREFBK0Q7QUFDL0QsaUVBQStEO0FBUy9EO0lBRUMsaUNBQ1MsV0FBd0IsRUFDeEIsZ0JBQWtDLEVBQ2xDLGFBQTRCO1FBRjVCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsa0JBQWEsR0FBYixhQUFhLENBQWU7SUFFbEMsQ0FBQztJQUVKLDBDQUFRLEdBQVI7SUFDQSxDQUFDO0lBQ0QsK0NBQWEsR0FBYjtRQUNDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFDRCwrQ0FBYSxHQUFiO1FBQ0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ25DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUNELCtDQUFhLEdBQWI7UUFDQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDckMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBQ0QsK0NBQWEsR0FBYjtRQUNDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUNuQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFDRCwrQ0FBYSxHQUFiO1FBQ0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUNELCtDQUFhLEdBQWI7UUFDQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDbkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBeENXLHVCQUF1QjtRQU5uQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztTQUM3QyxDQUFDO3lDQUlxQiwwQkFBVztZQUNOLHlCQUFnQjtZQUNuQiw4QkFBYTtPQUx6Qix1QkFBdUIsQ0F5Q25DO0lBQUQsOEJBQUM7Q0FBQSxBQXpDRCxJQXlDQztBQXpDWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgQmxvZ1NlcnZpY2UgfSBmcm9tIFwiLi4vYmxvZy9ibG9nLXNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gXCIuLi9zZWFyY2hvcHRpb24vc2VhcmNoLXNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7IEFjdGlvbkJ1dHRvbkNvbXBvbmVudCB9IGZyb20gXCIuLi9zZWFyY2hyZXN1bHQvYWN0aW9uLWJ1dHRvbi9hY3Rpb24tYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogXCJGcmllbmRtYXRjaGluZ1wiLFxyXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcblx0dGVtcGxhdGVVcmw6IFwiLi9mcmllbmRtYXRjaGluZy5jb21wb25lbnQuaHRtbFwiLFxyXG5cdHN0eWxlVXJsczogWycuL2ZyaWVuZG1hdGNoaW5nLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRnJpZW5kbWF0Y2hpbmdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdHByaXZhdGUgX2J1dHRvblJlZjogQWN0aW9uQnV0dG9uQ29tcG9uZW50O1xyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHJpdmF0ZSBibG9nU2VydmljZTogQmxvZ1NlcnZpY2UsXHJcblx0XHRwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcblx0XHRwcml2YXRlIHNlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2VcclxuXHQpIHtcclxuICAgIH1cclxuXHJcblx0bmdPbkluaXQoKTogdm9pZCB7XHJcblx0fVxyXG5cdG9uRm9vZEpvaW5UYXAoKXtcclxuXHRcdHRoaXMuc2VhcmNoU2VydmljZS5wb3N0VHlwZSA9IFwiZm9vZFwiO1xyXG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL3NlYXJjaG9wdGlvbiddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcclxuXHRcdHRoaXMuX2J1dHRvblJlZi5tYWtlQXJyb3coKTtcclxuXHR9XHJcblx0b25Gb29kTWFrZVRhcCgpe1xyXG5cdFx0dGhpcy5ibG9nU2VydmljZS5wb3N0VHlwZSA9IFwiZm9vZFwiO1xyXG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2Jsb2cnXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XHJcblx0XHR0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XHJcblx0fVxyXG5cdG9uR2FtZUpvaW5UYXAoKXtcclxuXHRcdHRoaXMuc2VhcmNoU2VydmljZS5wb3N0VHlwZSA9IFwiZ2FtZVwiO1xyXG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL3NlYXJjaG9wdGlvbiddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcclxuXHRcdHRoaXMuX2J1dHRvblJlZi5tYWtlQXJyb3coKTtcclxuXHR9XHJcblx0b25HYW1lTWFrZVRhcCgpe1xyXG5cdFx0dGhpcy5ibG9nU2VydmljZS5wb3N0VHlwZSA9IFwiZ2FtZVwiO1xyXG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2Jsb2cnXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XHJcblx0XHR0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XHJcblx0fVxyXG5cdG9uQ2hhdEpvaW5UYXAoKXtcclxuXHRcdHRoaXMuc2VhcmNoU2VydmljZS5wb3N0VHlwZSA9IFwiY2hhdFwiO1xyXG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL3NlYXJjaG9wdGlvbiddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcclxuXHRcdHRoaXMuX2J1dHRvblJlZi5tYWtlQXJyb3coKTtcclxuXHR9XHJcblx0b25DaGF0TWFrZVRhcCgpe1xyXG5cdFx0dGhpcy5ibG9nU2VydmljZS5wb3N0VHlwZSA9IFwiY2hhdFwiO1xyXG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2Jsb2cnXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XHJcblx0XHR0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XHJcblx0fVxyXG59Il19