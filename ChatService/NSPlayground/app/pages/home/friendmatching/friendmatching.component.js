"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var uploadpost_service_1 = require("../uploadpost/uploadpost-service");
var router_1 = require("nativescript-angular/router");
var search_service_1 = require("../searchoption/search-service");
var FriendmatchingComponent = /** @class */ (function () {
    function FriendmatchingComponent(uploadpostService, routerExtensions, searchService) {
        this.uploadpostService = uploadpostService;
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
        this.uploadpostService.postType = "food";
        this.routerExtensions.navigate(['/uploadpost'], { animated: false });
        this._buttonRef.makeArrow();
    };
    FriendmatchingComponent.prototype.onGameJoinTap = function () {
        this.searchService.postType = "game";
        this.routerExtensions.navigate(['/searchoption'], { animated: false });
        this._buttonRef.makeArrow();
    };
    FriendmatchingComponent.prototype.onGameMakeTap = function () {
        this.uploadpostService.postType = "game";
        this.routerExtensions.navigate(['/uploadpost'], { animated: false });
        this._buttonRef.makeArrow();
    };
    FriendmatchingComponent.prototype.onChatJoinTap = function () {
        this.searchService.postType = "chat";
        this.routerExtensions.navigate(['/searchoption'], { animated: false });
        this._buttonRef.makeArrow();
    };
    FriendmatchingComponent.prototype.onChatMakeTap = function () {
        this.uploadpostService.postType = "chat";
        this.routerExtensions.navigate(['/uploadpost'], { animated: false });
        this._buttonRef.makeArrow();
    };
    FriendmatchingComponent = __decorate([
        core_1.Component({
            selector: "Friendmatching",
            moduleId: module.id,
            templateUrl: "./friendmatching.component.html",
            styleUrls: ['./friendmatching.component.css']
        }),
        __metadata("design:paramtypes", [uploadpost_service_1.UploadpostService,
            router_1.RouterExtensions,
            search_service_1.SearchService])
    ], FriendmatchingComponent);
    return FriendmatchingComponent;
}());
exports.FriendmatchingComponent = FriendmatchingComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kbWF0Y2hpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kbWF0Y2hpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZEO0FBQzdELHVFQUFxRTtBQUNyRSxzREFBK0Q7QUFDL0QsaUVBQStEO0FBUy9EO0lBRUMsaUNBQ1MsaUJBQW9DLEVBQ3BDLGdCQUFrQyxFQUNsQyxhQUE0QjtRQUY1QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsa0JBQWEsR0FBYixhQUFhLENBQWU7SUFFbEMsQ0FBQztJQUVKLDBDQUFRLEdBQVI7SUFDQSxDQUFDO0lBQ0QsK0NBQWEsR0FBYjtRQUNDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFDRCwrQ0FBYSxHQUFiO1FBQ0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDekMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBQ0QsK0NBQWEsR0FBYjtRQUNDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFDRCwrQ0FBYSxHQUFiO1FBQ0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDekMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBQ0QsK0NBQWEsR0FBYjtRQUNDLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFDRCwrQ0FBYSxHQUFiO1FBQ0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDekMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBeENXLHVCQUF1QjtRQU5uQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGlDQUFpQztZQUM5QyxTQUFTLEVBQUUsQ0FBQyxnQ0FBZ0MsQ0FBQztTQUM3QyxDQUFDO3lDQUkyQixzQ0FBaUI7WUFDbEIseUJBQWdCO1lBQ25CLDhCQUFhO09BTHpCLHVCQUF1QixDQXlDbkM7SUFBRCw4QkFBQztDQUFBLEFBekNELElBeUNDO0FBekNZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBVcGxvYWRwb3N0U2VydmljZSB9IGZyb20gXCIuLi91cGxvYWRwb3N0L3VwbG9hZHBvc3Qtc2VydmljZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBTZWFyY2hTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlYXJjaG9wdGlvbi9zZWFyY2gtc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHsgQWN0aW9uQnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIn4vbW9kdWxlcy9idXR0b25zL2FjdGlvbi1idXR0b24vYWN0aW9uLWJ1dHRvbi5jb21wb25lbnRcIjtcclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6IFwiRnJpZW5kbWF0Y2hpbmdcIixcclxuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG5cdHRlbXBsYXRlVXJsOiBcIi4vZnJpZW5kbWF0Y2hpbmcuY29tcG9uZW50Lmh0bWxcIixcclxuXHRzdHlsZVVybHM6IFsnLi9mcmllbmRtYXRjaGluZy5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEZyaWVuZG1hdGNoaW5nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRwcml2YXRlIF9idXR0b25SZWY6IEFjdGlvbkJ1dHRvbkNvbXBvbmVudDtcclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHByaXZhdGUgdXBsb2FkcG9zdFNlcnZpY2U6IFVwbG9hZHBvc3RTZXJ2aWNlLFxyXG5cdFx0cHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG5cdFx0cHJpdmF0ZSBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlXHJcblx0KSB7XHJcbiAgICB9XHJcblxyXG5cdG5nT25Jbml0KCk6IHZvaWQge1xyXG5cdH1cclxuXHRvbkZvb2RKb2luVGFwKCl7XHJcblx0XHR0aGlzLnNlYXJjaFNlcnZpY2UucG9zdFR5cGUgPSBcImZvb2RcIjtcclxuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9zZWFyY2hvcHRpb24nXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XHJcblx0XHR0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XHJcblx0fVxyXG5cdG9uRm9vZE1ha2VUYXAoKXtcclxuXHRcdHRoaXMudXBsb2FkcG9zdFNlcnZpY2UucG9zdFR5cGUgPSBcImZvb2RcIjtcclxuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy91cGxvYWRwb3N0J10sIHsgYW5pbWF0ZWQ6IGZhbHNlIH0pO1xyXG5cdFx0dGhpcy5fYnV0dG9uUmVmLm1ha2VBcnJvdygpO1xyXG5cdH1cclxuXHRvbkdhbWVKb2luVGFwKCl7XHJcblx0XHR0aGlzLnNlYXJjaFNlcnZpY2UucG9zdFR5cGUgPSBcImdhbWVcIjtcclxuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9zZWFyY2hvcHRpb24nXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XHJcblx0XHR0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XHJcblx0fVxyXG5cdG9uR2FtZU1ha2VUYXAoKXtcclxuXHRcdHRoaXMudXBsb2FkcG9zdFNlcnZpY2UucG9zdFR5cGUgPSBcImdhbWVcIjtcclxuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy91cGxvYWRwb3N0J10sIHsgYW5pbWF0ZWQ6IGZhbHNlIH0pO1xyXG5cdFx0dGhpcy5fYnV0dG9uUmVmLm1ha2VBcnJvdygpO1xyXG5cdH1cclxuXHRvbkNoYXRKb2luVGFwKCl7XHJcblx0XHR0aGlzLnNlYXJjaFNlcnZpY2UucG9zdFR5cGUgPSBcImNoYXRcIjtcclxuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9zZWFyY2hvcHRpb24nXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XHJcblx0XHR0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XHJcblx0fVxyXG5cdG9uQ2hhdE1ha2VUYXAoKXtcclxuXHRcdHRoaXMudXBsb2FkcG9zdFNlcnZpY2UucG9zdFR5cGUgPSBcImNoYXRcIjtcclxuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy91cGxvYWRwb3N0J10sIHsgYW5pbWF0ZWQ6IGZhbHNlIH0pO1xyXG5cdFx0dGhpcy5fYnV0dG9uUmVmLm1ha2VBcnJvdygpO1xyXG5cdH1cclxufSJdfQ==