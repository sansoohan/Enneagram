"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var uploadpost_service_1 = require("../uploadpost/uploadpost-service");
var router_1 = require("nativescript-angular/router");
var firebase_service_1 = require("~/services/firebase.service");
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var search_service_1 = require("../searchoption/search-service");
var IdeamatchingComponent = /** @class */ (function () {
    function IdeamatchingComponent(uploadpostService, routerExtensions, firebaseService, searchService) {
        this.uploadpostService = uploadpostService;
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
        this.uploadpostService.postType = "idea";
        this.routerExtensions.navigate(['/uploadpost'], { animated: false });
        this._buttonRef.makeArrow();
    };
    IdeamatchingComponent.prototype.onAdviceTap = function () {
        this.searchService.postType = "help";
        this.routerExtensions.navigate(['/searchoption'], { animated: false });
        this._buttonRef.makeArrow();
    };
    IdeamatchingComponent.prototype.onHelpMeTap = function () {
        this.uploadpostService.postType = "help";
        this.routerExtensions.navigate(['/uploadpost'], { animated: false });
        this._buttonRef.makeArrow();
    };
    IdeamatchingComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'Ideamatching',
            templateUrl: './ideamatching.component.html',
            styleUrls: ['./ideamatching.component.css']
        }),
        __metadata("design:paramtypes", [uploadpost_service_1.UploadpostService,
            router_1.RouterExtensions,
            firebase_service_1.FirebaseService,
            search_service_1.SearchService])
    ], IdeamatchingComponent);
    return IdeamatchingComponent;
}());
exports.IdeamatchingComponent = IdeamatchingComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlYW1hdGNoaW5nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlkZWFtYXRjaGluZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNEQ7QUFDNUQsdUVBQXFFO0FBQ3JFLHNEQUErRDtBQUMvRCxnRUFBOEQ7QUFFOUQsdURBQStGO0FBQy9GLGlFQUErRDtBQVEvRDtJQUdFLCtCQUNVLGlCQUFvQyxFQUNwQyxnQkFBa0MsRUFDbEMsZUFBZ0MsRUFDaEMsYUFBNEI7UUFINUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUNuQyxDQUFDO0lBQ0osd0NBQVEsR0FBUixjQUFhLENBQUM7SUFFZCwrQ0FBZSxHQUFmO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLEtBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUM7WUFDM0MsUUFBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBQztnQkFDL0QsS0FBSyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO29CQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUMsU0FBUyxDQUFDLENBQUM7b0JBQUMsTUFBTTtnQkFDM0UsS0FBSyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO29CQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUMsVUFBVSxDQUFDLENBQUM7b0JBQUMsTUFBTTtnQkFDN0UsS0FBSyxD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LENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsY0FBYztZQUN4QixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLFNBQVMsRUFBRSxDQUFDLDhCQUE4QixDQUFDO1NBQzVDLENBQUM7eUNBSzZCLHNDQUFpQjtZQUNsQix5QkFBZ0I7WUFDakIsa0NBQWU7WUFDakIsOEJBQWE7T0FQM0IscUJBQXFCLENBcUZqQztJQUFELDRCQUFDO0NBQUEsQUFyRkQsSUFxRkM7QUFyRlksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFVwbG9hZHBvc3RTZXJ2aWNlIH0gZnJvbSBcIi4uL3VwbG9hZHBvc3QvdXBsb2FkcG9zdC1zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gXCJ+L3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQWN0aW9uQnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIn4vbW9kdWxlcy9idXR0b25zL2FjdGlvbi1idXR0b24vYWN0aW9uLWJ1dHRvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgYWxlcnQsIGNvbmZpcm0sIHByb21wdCwgbG9naW4sIGFjdGlvbiwgaW5wdXRUeXBlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBTZWFyY2hTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlYXJjaG9wdGlvbi9zZWFyY2gtc2VydmljZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICBzZWxlY3RvcjogJ0lkZWFtYXRjaGluZycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2lkZWFtYXRjaGluZy5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vaWRlYW1hdGNoaW5nLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSWRlYW1hdGNoaW5nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBwcml2YXRlIF9idXR0b25SZWY6IEFjdGlvbkJ1dHRvbkNvbXBvbmVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHVwbG9hZHBvc3RTZXJ2aWNlOiBVcGxvYWRwb3N0U2VydmljZSxcclxuICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgXHJcbiAgICBwcml2YXRlIGZpcmViYXNlU2VydmljZTogRmlyZWJhc2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzZWFyY2hTZXJ2aWNlOiBTZWFyY2hTZXJ2aWNlXHJcbiAgKSB7fVxyXG4gIG5nT25Jbml0KCkgeyB9XHJcblxyXG4gIG9uU3RhdGVDaGVja1RhcCgpe1xyXG4gICAgY29uc29sZS5sb2codGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXIpO1xyXG4gICAgZm9yKHZhciB1aWQgaW4gdGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXIpe1xyXG4gICAgICBzd2l0Y2godGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXJbdWlkXVsnZW5uZWFncmFtJ11bJ251bWJlciddKXtcclxuICAgICAgICBjYXNlIDE6IGNhc2UgMzogY2FzZSA1OiB0aGlzLnN0YXRlQ2hlY2tDb25maXJtKFwiU3VjY2Vzc1wiLFwiRmFpbHVyZVwiKTsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA3OiBjYXNlIDk6IGNhc2UgMjogdGhpcy5zdGF0ZUNoZWNrQ29uZmlybShcIlBvc2l0aXZlXCIsXCJOZWdhdGl2ZVwiKTsgYnJlYWs7XHJcbiAgICAgICAgY2FzZSA0OiBjYXNlIDY6IGNhc2UgODogdGhpcy5zdGF0ZUNoZWNrQ29uZmlybShcIlRydXN0ZWRcIixcIkJldHJheWVkXCIpOyBicmVhaztcclxuICAgICAgICBkZWZhdWx0OiBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHRzdGF0ZUNoZWNrQ29uZmlybShnb29kX3N0YXRlOnN0cmluZywgYmFkX3N0YXRlOnN0cmluZykge1xyXG5cdFx0Y29uZmlybSh7XHJcblx0XHRcdHRpdGxlOiBcIkNob29zZSBZb3VyIEN1cnJlbnQgU3RhdGUuIEl0IGhlbHBzIHlvdSB0byBmaW5kIG9yIHNoYXJlIGlkZWEuXCIsXHJcblx0XHRcdGNhbmNlbEJ1dHRvblRleHQ6IGJhZF9zdGF0ZSxcclxuXHRcdFx0b2tCdXR0b25UZXh0OiBnb29kX3N0YXRlLFxyXG5cdFx0fSkudGhlbigocmVzdWx0KSA9PiB7XHJcblx0XHRcdGlmIChyZXN1bHQgPT0gdHJ1ZSkge1xyXG5cdFx0XHRcdHRoaXMuYWN0aXZpdHlDaGVjayhcIkRvIHlvdSBoYXZlIHNvbWUgZ29vZCBJZGVhP1wiLCByZXN1bHQpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMuYWN0aXZpdHlDaGVjayhcIkRvIHlvdSBoYXZlIGFueSB3b3JyaWVzP1wiLCByZXN1bHQpO1xyXG4gICAgICB9XHJcblx0XHR9KTtcclxuXHR9XHJcbiAgYWN0aXZpdHlDaGVjayhhY3Rpdml0eU1lc3NhZ2U6c3RyaW5nLCBzdGF0ZTpib29sZWFuKSB7XHJcblx0XHRjb25maXJtKHtcclxuXHRcdFx0dGl0bGU6IFwiQ2hvb3NlIFlvdXIgQWN0aXZpdHlcIixcclxuXHRcdFx0bWVzc2FnZTogYWN0aXZpdHlNZXNzYWdlLFxyXG4gICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIk5vXCIsXHJcblx0XHRcdG9rQnV0dG9uVGV4dDogXCJZZXNcIixcclxuXHRcdH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICBpZiAocmVzdWx0ID09IHRydWUgJiYgc3RhdGUgPT0gdHJ1ZSkge3RoaXMubGFzdENoZWNrKHJlc3VsdCwgc3RhdGUsXCJDYW4geW91IHNob3cgeW91ciBpZGVhIGFzIGEgaW1hZ2U/XCIpfVxyXG4gICAgICBlbHNlIGlmIChyZXN1bHQgPT0gZmFsc2UgJiYgc3RhdGUgPT0gdHJ1ZSkge3RoaXMubGFzdENoZWNrKHJlc3VsdCwgc3RhdGUsXCJDYW4geW91IGdpdmUgc29tZSBhZHZpY2U/XCIpfVxyXG4gICAgICBlbHNlIGlmIChyZXN1bHQgPT0gdHJ1ZSAmJiBzdGF0ZSA9PSBmYWxzZSkge3RoaXMubGFzdENoZWNrKHJlc3VsdCwgc3RhdGUsXCJDYW4geW91IHNob3cgd2hhdCB5b3UgYXJlIHdvcnJ5IGFib3V0IGFzIGEgaW1hZ2U/XCIpfVxyXG4gICAgICBlbHNlIGlmIChyZXN1bHQgPT0gZmFsc2UgJiYgc3RhdGUgPT0gZmFsc2UpIHt0aGlzLmxhc3RDaGVjayhyZXN1bHQsIHN0YXRlLFwiRG8geW91IG5lZWQgc29tZSBpZGVhP1wiKX1cclxuXHRcdH0pO1xyXG4gIH1cclxuICBsYXN0Q2hlY2soc3RhdGUxLCBzdGF0ZTIsIGxhc3RDaGVja01lc3NhZ2U6c3RyaW5nKXtcclxuICAgIGNvbmZpcm0oe1xyXG5cdFx0XHR0aXRsZTogXCJDaG9vc2UgWW91ciBBY3Rpdml0eVwiLFxyXG5cdFx0XHRtZXNzYWdlOiBsYXN0Q2hlY2tNZXNzYWdlLFxyXG4gICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIk5vXCIsXHJcblx0XHRcdG9rQnV0dG9uVGV4dDogXCJZZXNcIixcclxuXHRcdH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICBpZihyZXN1bHQpe1xyXG4gICAgICAgIGlmIChzdGF0ZTEgPT0gdHJ1ZSAmJiBzdGF0ZTIgPT0gdHJ1ZSkge3RoaXMub25Gb2xsb3dNZVRhcCgpO31cclxuICAgICAgICBlbHNlIGlmIChzdGF0ZTEgPT0gZmFsc2UgJiYgc3RhdGUyID09IHRydWUpIHt0aGlzLm9uQWR2aWNlVGFwKCk7fVxyXG4gICAgICAgIGVsc2UgaWYgKHN0YXRlMSA9PSB0cnVlICYmIHN0YXRlMiA9PSBmYWxzZSkge3RoaXMub25IZWxwTWVUYXAoKTt9XHJcbiAgICAgICAgZWxzZSBpZiAoc3RhdGUxID09IGZhbHNlICYmIHN0YXRlMiA9PSBmYWxzZSkge3RoaXMub25JZGVhVGFwKCk7fVxyXG4gICAgICB9XHJcblx0XHR9KTtcclxuICB9XHJcblxyXG4gIG9uSWRlYVRhcCgpe1xyXG5cdFx0dGhpcy5zZWFyY2hTZXJ2aWNlLnBvc3RUeXBlID0gXCJpZGVhXCI7XHJcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvc2VhcmNob3B0aW9uJ10sIHsgYW5pbWF0ZWQ6IGZhbHNlIH0pO1xyXG5cdFx0dGhpcy5fYnV0dG9uUmVmLm1ha2VBcnJvdygpO1xyXG4gIH1cclxuICBvbkZvbGxvd01lVGFwKCl7XHJcbiAgICB0aGlzLnVwbG9hZHBvc3RTZXJ2aWNlLnBvc3RUeXBlID0gXCJpZGVhXCI7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvdXBsb2FkcG9zdCddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcclxuICAgIHRoaXMuX2J1dHRvblJlZi5tYWtlQXJyb3coKTtcclxuICB9XHJcbiAgb25BZHZpY2VUYXAoKXtcclxuXHRcdHRoaXMuc2VhcmNoU2VydmljZS5wb3N0VHlwZSA9IFwiaGVscFwiO1xyXG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL3NlYXJjaG9wdGlvbiddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcclxuXHRcdHRoaXMuX2J1dHRvblJlZi5tYWtlQXJyb3coKTtcclxuICB9XHJcbiAgb25IZWxwTWVUYXAoKXtcclxuICAgIHRoaXMudXBsb2FkcG9zdFNlcnZpY2UucG9zdFR5cGUgPSBcImhlbHBcIjtcclxuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy91cGxvYWRwb3N0J10sIHsgYW5pbWF0ZWQ6IGZhbHNlIH0pO1xyXG4gICAgdGhpcy5fYnV0dG9uUmVmLm1ha2VBcnJvdygpO1xyXG4gIH1cclxufSJdfQ==