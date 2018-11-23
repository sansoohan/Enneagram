"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var blog_service_1 = require("../blog/blog-service");
var router_1 = require("nativescript-angular/router");
var firebase_service_1 = require("../../services/firebase.service");
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var search_service_1 = require("../searchoption/search-service");
var IdeamatchingComponent = /** @class */ (function () {
    function IdeamatchingComponent(blogService, routerExtensions, firebaseService, searchService) {
        this.blogService = blogService;
        this.routerExtensions = routerExtensions;
        this.firebaseService = firebaseService;
        this.searchService = searchService;
    }
    IdeamatchingComponent.prototype.ngOnInit = function () { };
    IdeamatchingComponent.prototype.onStateCheckTap = function () {
        console.log(this.firebaseService.thisUser);
        for (var uid in this.firebaseService.thisUser) {
            switch (this.firebaseService.thisUser[uid]['enneagram']['number']) {
                case 1:
                case 3:
                case 5:
                    this.stateCheckConfirm("Success", "Failure");
                    break;
                case 7:
                case 9:
                case 2:
                    this.stateCheckConfirm("Positive", "Negative");
                    break;
                case 4:
                case 6:
                case 8:
                    this.stateCheckConfirm("Trusted", "Betrayed");
                    break;
                default: break;
            }
        }
    };
    IdeamatchingComponent.prototype.stateCheckConfirm = function (good_state, bad_state) {
        var _this = this;
        dialogs_1.confirm({
            title: "Choose Your Current State. It helps you to find or share idea.",
            cancelButtonText: bad_state,
            okButtonText: good_state,
        }).then(function (result) {
            if (result == true) {
                _this.activityCheck("Do you have some good Idea?", result);
            }
            else {
                _this.activityCheck("Do you have any worries?", result);
            }
        });
    };
    IdeamatchingComponent.prototype.activityCheck = function (activityMessage, state) {
        var _this = this;
        dialogs_1.confirm({
            title: "Choose Your Activity",
            message: activityMessage,
            cancelButtonText: "No",
            okButtonText: "Yes",
        }).then(function (result) {
            if (result == true && state == true) {
                _this.lastCheck(result, state, "Can you show your idea as a image?");
            }
            else if (result == false && state == true) {
                _this.lastCheck(result, state, "Can you give some advice?");
            }
            else if (result == true && state == false) {
                _this.lastCheck(result, state, "Can you show what you are worry about as a image?");
            }
            else if (result == false && state == false) {
                _this.lastCheck(result, state, "Do you need some idea?");
            }
        });
    };
    IdeamatchingComponent.prototype.lastCheck = function (state1, state2, lastCheckMessage) {
        var _this = this;
        dialogs_1.confirm({
            title: "Choose Your Activity",
            message: lastCheckMessage,
            cancelButtonText: "No",
            okButtonText: "Yes",
        }).then(function (result) {
            if (result) {
                if (state1 == true && state2 == true) {
                    _this.onFollowMeTap();
                }
                else if (state1 == false && state2 == true) {
                    _this.onAdviceTap();
                }
                else if (state1 == true && state2 == false) {
                    _this.onHelpMeTap();
                }
                else if (state1 == false && state2 == false) {
                    _this.onIdeaTap();
                }
            }
        });
    };
    IdeamatchingComponent.prototype.onIdeaTap = function () {
        this.searchService.postType = "idea";
        this.routerExtensions.navigate(['/searchoption'], { animated: false });
        this._buttonRef.makeArrow();
    };
    IdeamatchingComponent.prototype.onFollowMeTap = function () {
        this.blogService.postType = "idea";
        this.routerExtensions.navigate(['/blog'], { animated: false });
        this._buttonRef.makeArrow();
    };
    IdeamatchingComponent.prototype.onAdviceTap = function () {
        this.searchService.postType = "help";
        this.routerExtensions.navigate(['/searchoption'], { animated: false });
        this._buttonRef.makeArrow();
    };
    IdeamatchingComponent.prototype.onHelpMeTap = function () {
        this.blogService.postType = "help";
        this.routerExtensions.navigate(['/blog'], { animated: false });
        this._buttonRef.makeArrow();
    };
    IdeamatchingComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'Ideamatching',
            templateUrl: './ideamatching.component.html',
            styleUrls: ['./ideamatching.component.css']
        }),
        __metadata("design:paramtypes", [blog_service_1.BlogService,
            router_1.RouterExtensions,
            firebase_service_1.FirebaseService,
            search_service_1.SearchService])
    ], IdeamatchingComponent);
    return IdeamatchingComponent;
}());
exports.IdeamatchingComponent = IdeamatchingComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlYW1hdGNoaW5nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlkZWFtYXRjaGluZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNEQ7QUFDNUQscURBQW1EO0FBQ25ELHNEQUErRDtBQUMvRCxvRUFBa0U7QUFFbEUsdURBQStGO0FBQy9GLGlFQUErRDtBQVEvRDtJQUdFLCtCQUNVLFdBQXdCLEVBQ3hCLGdCQUFrQyxFQUNsQyxlQUFnQyxFQUNoQyxhQUE0QjtRQUg1QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUNuQyxDQUFDO0lBQ0osd0NBQVEsR0FBUixjQUFhLENBQUM7SUFFZCwrQ0FBZSxHQUFmO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLEdBQUcsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUEsQ0FBQztZQUM1QyxNQUFNLENBQUEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBLENBQUM7Z0JBQ2hFLEtBQUssQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQztvQkFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUFDLEtBQUssQ0FBQztnQkFDM0UsS0FBSyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO29CQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUMs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QUFDLFFBQVEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBQ0QsMkNBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztRQUNuQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFwRlUscUJBQXFCO1FBTmpDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGNBQWM7WUFDeEIsV0FBVyxFQUFFLCtCQUErQjtZQUM1QyxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztTQUM1QyxDQUFDO3lDQUt1QiwwQkFBVztZQUNOLHlCQUFnQjtZQUNqQixrQ0FBZTtZQUNqQiw4QkFBYTtPQVAzQixxQkFBcUIsQ0FxRmpDO0lBQUQsNEJBQUM7Q0FBQSxBQXJGRCxJQXFGQztBQXJGWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCxWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQmxvZ1NlcnZpY2UgfSBmcm9tIFwiLi4vYmxvZy9ibG9nLXNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQWN0aW9uQnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4uL3NlYXJjaHJlc3VsdC9hY3Rpb24tYnV0dG9uL2FjdGlvbi1idXR0b24uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IGFsZXJ0LCBjb25maXJtLCBwcm9tcHQsIGxvZ2luLCBhY3Rpb24sIGlucHV0VHlwZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gXCIuLi9zZWFyY2hvcHRpb24vc2VhcmNoLXNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgc2VsZWN0b3I6ICdJZGVhbWF0Y2hpbmcnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9pZGVhbWF0Y2hpbmcuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2lkZWFtYXRjaGluZy5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIElkZWFtYXRjaGluZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgcHJpdmF0ZSBfYnV0dG9uUmVmOiBBY3Rpb25CdXR0b25Db21wb25lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBibG9nU2VydmljZTogQmxvZ1NlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsIFxyXG4gICAgcHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSxcclxuICAgIHByaXZhdGUgc2VhcmNoU2VydmljZTogU2VhcmNoU2VydmljZVxyXG4gICkge31cclxuICBuZ09uSW5pdCgpIHsgfVxyXG5cclxuICBvblN0YXRlQ2hlY2tUYXAoKXtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyKTtcclxuICAgIGZvcih2YXIgdWlkIGluIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyKXtcclxuICAgICAgc3dpdGNoKHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyW3VpZF1bJ2VubmVhZ3JhbSddWydudW1iZXInXSl7XHJcbiAgICAgICAgY2FzZSAxOiBjYXNlIDM6IGNhc2UgNTogdGhpcy5zdGF0ZUNoZWNrQ29uZmlybShcIlN1Y2Nlc3NcIixcIkZhaWx1cmVcIik7IGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNzogY2FzZSA5OiBjYXNlIDI6IHRoaXMuc3RhdGVDaGVja0NvbmZpcm0oXCJQb3NpdGl2ZVwiLFwiTmVnYXRpdmVcIik7IGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNDogY2FzZSA2OiBjYXNlIDg6IHRoaXMuc3RhdGVDaGVja0NvbmZpcm0oXCJUcnVzdGVkXCIsXCJCZXRyYXllZFwiKTsgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDogYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblx0c3RhdGVDaGVja0NvbmZpcm0oZ29vZF9zdGF0ZTpzdHJpbmcsIGJhZF9zdGF0ZTpzdHJpbmcpIHtcclxuXHRcdGNvbmZpcm0oe1xyXG5cdFx0XHR0aXRsZTogXCJDaG9vc2UgWW91ciBDdXJyZW50IFN0YXRlLiBJdCBoZWxwcyB5b3UgdG8gZmluZCBvciBzaGFyZSBpZGVhLlwiLFxyXG5cdFx0XHRjYW5jZWxCdXR0b25UZXh0OiBiYWRfc3RhdGUsXHJcblx0XHRcdG9rQnV0dG9uVGV4dDogZ29vZF9zdGF0ZSxcclxuXHRcdH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG5cdFx0XHRpZiAocmVzdWx0ID09IHRydWUpIHtcclxuXHRcdFx0XHR0aGlzLmFjdGl2aXR5Q2hlY2soXCJEbyB5b3UgaGF2ZSBzb21lIGdvb2QgSWRlYT9cIiwgcmVzdWx0KTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLmFjdGl2aXR5Q2hlY2soXCJEbyB5b3UgaGF2ZSBhbnkgd29ycmllcz9cIiwgcmVzdWx0KTtcclxuICAgICAgfVxyXG5cdFx0fSk7XHJcblx0fVxyXG4gIGFjdGl2aXR5Q2hlY2soYWN0aXZpdHlNZXNzYWdlOnN0cmluZywgc3RhdGU6Ym9vbGVhbikge1xyXG5cdFx0Y29uZmlybSh7XHJcblx0XHRcdHRpdGxlOiBcIkNob29zZSBZb3VyIEFjdGl2aXR5XCIsXHJcblx0XHRcdG1lc3NhZ2U6IGFjdGl2aXR5TWVzc2FnZSxcclxuICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJOb1wiLFxyXG5cdFx0XHRva0J1dHRvblRleHQ6IFwiWWVzXCIsXHJcblx0XHR9KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgaWYgKHJlc3VsdCA9PSB0cnVlICYmIHN0YXRlID09IHRydWUpIHt0aGlzLmxhc3RDaGVjayhyZXN1bHQsIHN0YXRlLFwiQ2FuIHlvdSBzaG93IHlvdXIgaWRlYSBhcyBhIGltYWdlP1wiKX1cclxuICAgICAgZWxzZSBpZiAocmVzdWx0ID09IGZhbHNlICYmIHN0YXRlID09IHRydWUpIHt0aGlzLmxhc3RDaGVjayhyZXN1bHQsIHN0YXRlLFwiQ2FuIHlvdSBnaXZlIHNvbWUgYWR2aWNlP1wiKX1cclxuICAgICAgZWxzZSBpZiAocmVzdWx0ID09IHRydWUgJiYgc3RhdGUgPT0gZmFsc2UpIHt0aGlzLmxhc3RDaGVjayhyZXN1bHQsIHN0YXRlLFwiQ2FuIHlvdSBzaG93IHdoYXQgeW91IGFyZSB3b3JyeSBhYm91dCBhcyBhIGltYWdlP1wiKX1cclxuICAgICAgZWxzZSBpZiAocmVzdWx0ID09IGZhbHNlICYmIHN0YXRlID09IGZhbHNlKSB7dGhpcy5sYXN0Q2hlY2socmVzdWx0LCBzdGF0ZSxcIkRvIHlvdSBuZWVkIHNvbWUgaWRlYT9cIil9XHJcblx0XHR9KTtcclxuICB9XHJcbiAgbGFzdENoZWNrKHN0YXRlMSwgc3RhdGUyLCBsYXN0Q2hlY2tNZXNzYWdlOnN0cmluZyl7XHJcbiAgICBjb25maXJtKHtcclxuXHRcdFx0dGl0bGU6IFwiQ2hvb3NlIFlvdXIgQWN0aXZpdHlcIixcclxuXHRcdFx0bWVzc2FnZTogbGFzdENoZWNrTWVzc2FnZSxcclxuICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJOb1wiLFxyXG5cdFx0XHRva0J1dHRvblRleHQ6IFwiWWVzXCIsXHJcblx0XHR9KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgaWYocmVzdWx0KXtcclxuICAgICAgICBpZiAoc3RhdGUxID09IHRydWUgJiYgc3RhdGUyID09IHRydWUpIHt0aGlzLm9uRm9sbG93TWVUYXAoKTt9XHJcbiAgICAgICAgZWxzZSBpZiAoc3RhdGUxID09IGZhbHNlICYmIHN0YXRlMiA9PSB0cnVlKSB7dGhpcy5vbkFkdmljZVRhcCgpO31cclxuICAgICAgICBlbHNlIGlmIChzdGF0ZTEgPT0gdHJ1ZSAmJiBzdGF0ZTIgPT0gZmFsc2UpIHt0aGlzLm9uSGVscE1lVGFwKCk7fVxyXG4gICAgICAgIGVsc2UgaWYgKHN0YXRlMSA9PSBmYWxzZSAmJiBzdGF0ZTIgPT0gZmFsc2UpIHt0aGlzLm9uSWRlYVRhcCgpO31cclxuICAgICAgfVxyXG5cdFx0fSk7XHJcbiAgfVxyXG5cclxuICBvbklkZWFUYXAoKXtcclxuXHRcdHRoaXMuc2VhcmNoU2VydmljZS5wb3N0VHlwZSA9IFwiaWRlYVwiO1xyXG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL3NlYXJjaG9wdGlvbiddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcclxuXHRcdHRoaXMuX2J1dHRvblJlZi5tYWtlQXJyb3coKTtcclxuICB9XHJcbiAgb25Gb2xsb3dNZVRhcCgpe1xyXG4gICAgdGhpcy5ibG9nU2VydmljZS5wb3N0VHlwZSA9IFwiaWRlYVwiO1xyXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2Jsb2cnXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XHJcbiAgICB0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XHJcbiAgfVxyXG4gIG9uQWR2aWNlVGFwKCl7XHJcblx0XHR0aGlzLnNlYXJjaFNlcnZpY2UucG9zdFR5cGUgPSBcImhlbHBcIjtcclxuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9zZWFyY2hvcHRpb24nXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XHJcblx0XHR0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XHJcbiAgfVxyXG4gIG9uSGVscE1lVGFwKCl7XHJcbiAgICB0aGlzLmJsb2dTZXJ2aWNlLnBvc3RUeXBlID0gXCJoZWxwXCI7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvYmxvZyddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcclxuICAgIHRoaXMuX2J1dHRvblJlZi5tYWtlQXJyb3coKTtcclxuICB9XHJcbn0iXX0=