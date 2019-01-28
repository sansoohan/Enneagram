"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var uploadpost_service_1 = require("../uploadpost/uploadpost-service");
var router_1 = require("nativescript-angular/router");
var search_service_1 = require("../searchoption/search-service");
var firebase_service_1 = require("~/services/firebase.service");
var FriendmatchingComponent = /** @class */ (function () {
    function FriendmatchingComponent(firebaseService, uploadpostService, routerExtensions, searchService) {
        this.firebaseService = firebaseService;
        this.uploadpostService = uploadpostService;
        this.routerExtensions = routerExtensions;
        this.searchService = searchService;
    }
    FriendmatchingComponent.prototype.ngOnInit = function () {
    };
    FriendmatchingComponent.prototype.onFoodJoinTap = function () {
        this.searchService.postType = "food";
        this.firebaseService.analyticsCount("foodSearchTap");
        this.routerExtensions.navigate(['/searchoption'], { animated: false });
        this._buttonRef.makeArrow();
    };
    FriendmatchingComponent.prototype.onFoodMakeTap = function () {
        this.uploadpostService.postType = "food";
        this.firebaseService.analyticsCount("foodPostTap");
        this.routerExtensions.navigate(['/uploadpost'], { animated: false });
        this._buttonRef.makeArrow();
    };
    FriendmatchingComponent.prototype.onGameJoinTap = function () {
        this.searchService.postType = "game";
        this.firebaseService.analyticsCount("gameSearchTap");
        this.routerExtensions.navigate(['/searchoption'], { animated: false });
        this._buttonRef.makeArrow();
    };
    FriendmatchingComponent.prototype.onGameMakeTap = function () {
        this.uploadpostService.postType = "game";
        this.firebaseService.analyticsCount("gamePostTap");
        this.routerExtensions.navigate(['/uploadpost'], { animated: false });
        this._buttonRef.makeArrow();
    };
    FriendmatchingComponent.prototype.onChatJoinTap = function () {
        this.searchService.postType = "chat";
        this.firebaseService.analyticsCount("chatSearchTap");
        this.routerExtensions.navigate(['/searchoption'], { animated: false });
        this._buttonRef.makeArrow();
    };
    FriendmatchingComponent.prototype.onChatMakeTap = function () {
        this.uploadpostService.postType = "chat";
        this.firebaseService.analyticsCount("chatPostTap");
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
        __metadata("design:paramtypes", [firebase_service_1.FirebaseService,
            uploadpost_service_1.UploadpostService,
            router_1.RouterExtensions,
            search_service_1.SearchService])
    ], FriendmatchingComponent);
    return FriendmatchingComponent;
}());
exports.FriendmatchingComponent = FriendmatchingComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kbWF0Y2hpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kbWF0Y2hpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTZEO0FBQzdELHVFQUFxRTtBQUNyRSxzREFBK0Q7QUFDL0QsaUVBQStEO0FBQy9ELGdFQUE4RDtBQVM5RDtJQUVDLGlDQUNTLGVBQWdDLEVBQ2hDLGlCQUFvQyxFQUNwQyxnQkFBa0MsRUFDbEMsYUFBNEI7UUFINUIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUVsQyxDQUFDO0lBRUosMENBQVEsR0FBUjtJQUNBLENBQUM7SUFDRCwrQ0FBYSxHQUFiO1FBQ0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUNELCtDQUFhLEdBQWI7UUFDQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUN6QyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFDRCwrQ0FBYSxHQUFiO1FBQ0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUNELCtDQUFhLEdBQWI7UUFDQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUN6QyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFDRCwrQ0FBYSxHQUFiO1FBQ0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUNELCtDQUFhLEdBQWI7UUFDQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUN6QyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUEvQ1csdUJBQXVCO1FBTm5DLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsaUNBQWlDO1lBQzlDLFNBQVMsRUFBRSxDQUFDLGdDQUFnQyxDQUFDO1NBQzdDLENBQUM7eUNBSXlCLGtDQUFlO1lBQ2Isc0NBQWlCO1lBQ2xCLHlCQUFnQjtZQUNuQiw4QkFBYTtPQU56Qix1QkFBdUIsQ0FnRG5DO0lBQUQsOEJBQUM7Q0FBQSxBQWhERCxJQWdEQztBQWhEWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgVXBsb2FkcG9zdFNlcnZpY2UgfSBmcm9tIFwiLi4vdXBsb2FkcG9zdC91cGxvYWRwb3N0LXNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gXCIuLi9zZWFyY2hvcHRpb24vc2VhcmNoLXNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSBcIn4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHsgQWN0aW9uQnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIn4vbW9kdWxlcy9idXR0b25zL2FjdGlvbi1idXR0b24vYWN0aW9uLWJ1dHRvbi5jb21wb25lbnRcIjtcclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6IFwiRnJpZW5kbWF0Y2hpbmdcIixcclxuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG5cdHRlbXBsYXRlVXJsOiBcIi4vZnJpZW5kbWF0Y2hpbmcuY29tcG9uZW50Lmh0bWxcIixcclxuXHRzdHlsZVVybHM6IFsnLi9mcmllbmRtYXRjaGluZy5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEZyaWVuZG1hdGNoaW5nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRwcml2YXRlIF9idXR0b25SZWY6IEFjdGlvbkJ1dHRvbkNvbXBvbmVudDtcclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UsXHJcblx0XHRwcml2YXRlIHVwbG9hZHBvc3RTZXJ2aWNlOiBVcGxvYWRwb3N0U2VydmljZSxcclxuXHRcdHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuXHRcdHByaXZhdGUgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZVxyXG5cdCkge1xyXG4gICAgfVxyXG5cclxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHR9XHJcblx0b25Gb29kSm9pblRhcCgpe1xyXG5cdFx0dGhpcy5zZWFyY2hTZXJ2aWNlLnBvc3RUeXBlID0gXCJmb29kXCI7XHJcblx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5hbmFseXRpY3NDb3VudChcImZvb2RTZWFyY2hUYXBcIik7XHJcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvc2VhcmNob3B0aW9uJ10sIHsgYW5pbWF0ZWQ6IGZhbHNlIH0pO1xyXG5cdFx0dGhpcy5fYnV0dG9uUmVmLm1ha2VBcnJvdygpO1xyXG5cdH1cclxuXHRvbkZvb2RNYWtlVGFwKCl7XHJcblx0XHR0aGlzLnVwbG9hZHBvc3RTZXJ2aWNlLnBvc3RUeXBlID0gXCJmb29kXCI7XHJcblx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5hbmFseXRpY3NDb3VudChcImZvb2RQb3N0VGFwXCIpO1xyXG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL3VwbG9hZHBvc3QnXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XHJcblx0XHR0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XHJcblx0fVxyXG5cdG9uR2FtZUpvaW5UYXAoKXtcclxuXHRcdHRoaXMuc2VhcmNoU2VydmljZS5wb3N0VHlwZSA9IFwiZ2FtZVwiO1xyXG5cdFx0dGhpcy5maXJlYmFzZVNlcnZpY2UuYW5hbHl0aWNzQ291bnQoXCJnYW1lU2VhcmNoVGFwXCIpO1xyXG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL3NlYXJjaG9wdGlvbiddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcclxuXHRcdHRoaXMuX2J1dHRvblJlZi5tYWtlQXJyb3coKTtcclxuXHR9XHJcblx0b25HYW1lTWFrZVRhcCgpe1xyXG5cdFx0dGhpcy51cGxvYWRwb3N0U2VydmljZS5wb3N0VHlwZSA9IFwiZ2FtZVwiO1xyXG5cdFx0dGhpcy5maXJlYmFzZVNlcnZpY2UuYW5hbHl0aWNzQ291bnQoXCJnYW1lUG9zdFRhcFwiKTtcclxuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy91cGxvYWRwb3N0J10sIHsgYW5pbWF0ZWQ6IGZhbHNlIH0pO1xyXG5cdFx0dGhpcy5fYnV0dG9uUmVmLm1ha2VBcnJvdygpO1xyXG5cdH1cclxuXHRvbkNoYXRKb2luVGFwKCl7XHJcblx0XHR0aGlzLnNlYXJjaFNlcnZpY2UucG9zdFR5cGUgPSBcImNoYXRcIjtcclxuXHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmFuYWx5dGljc0NvdW50KFwiY2hhdFNlYXJjaFRhcFwiKTtcclxuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9zZWFyY2hvcHRpb24nXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XHJcblx0XHR0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XHJcblx0fVxyXG5cdG9uQ2hhdE1ha2VUYXAoKXtcclxuXHRcdHRoaXMudXBsb2FkcG9zdFNlcnZpY2UucG9zdFR5cGUgPSBcImNoYXRcIjtcclxuXHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmFuYWx5dGljc0NvdW50KFwiY2hhdFBvc3RUYXBcIik7XHJcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvdXBsb2FkcG9zdCddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcclxuXHRcdHRoaXMuX2J1dHRvblJlZi5tYWtlQXJyb3coKTtcclxuXHR9XHJcbn0iXX0=