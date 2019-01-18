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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlYW1hdGNoaW5nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlkZWFtYXRjaGluZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNEQ7QUFDNUQsdUVBQXFFO0FBQ3JFLHNEQUErRDtBQUMvRCxnRUFBOEQ7QUFFOUQsdURBQStGO0FBQy9GLGlFQUErRDtBQVEvRDtJQUdFLCtCQUNVLGlCQUFvQyxFQUNwQyxnQkFBa0MsRUFDbEMsZUFBZ0MsRUFDaEMsYUFBNEI7UUFINUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUNoQyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtJQUNuQyxDQUFDO0lBQ0osd0NBQVEsR0FBUixjQUFhLENBQUM7SUFFZCwrQ0FBZSxHQUFmO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLEdBQUcsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUEsQ0FBQztZQUM1QyxNQUFNLENBQUEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBLENBQUM7Z0JBQ2hFLEtBQUssQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQztvQkFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUFDLEtBQUssQ0FBQztnQkFDM0UsS0FBSyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO29CQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFV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Z0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFDRCwyQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7UUFDekMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBcEZVLHFCQUFxQjtRQU5qQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7U0FDNUMsQ0FBQzt5Q0FLNkIsc0NBQWlCO1lBQ2xCLHlCQUFnQjtZQUNqQixrQ0FBZTtZQUNqQiw4QkFBYTtPQVAzQixxQkFBcUIsQ0FxRmpDO0lBQUQsNEJBQUM7Q0FBQSxBQXJGRCxJQXFGQztBQXJGWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCxWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVXBsb2FkcG9zdFNlcnZpY2UgfSBmcm9tIFwiLi4vdXBsb2FkcG9zdC91cGxvYWRwb3N0LXNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSBcIn4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBBY3Rpb25CdXR0b25Db21wb25lbnQgfSBmcm9tIFwifi9tb2R1bGVzL2J1dHRvbnMvYWN0aW9uLWJ1dHRvbi9hY3Rpb24tYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBhbGVydCwgY29uZmlybSwgcHJvbXB0LCBsb2dpbiwgYWN0aW9uLCBpbnB1dFR5cGUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IFNlYXJjaFNlcnZpY2UgfSBmcm9tIFwiLi4vc2VhcmNob3B0aW9uL3NlYXJjaC1zZXJ2aWNlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHNlbGVjdG9yOiAnSWRlYW1hdGNoaW5nJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vaWRlYW1hdGNoaW5nLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9pZGVhbWF0Y2hpbmcuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJZGVhbWF0Y2hpbmdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHByaXZhdGUgX2J1dHRvblJlZjogQWN0aW9uQnV0dG9uQ29tcG9uZW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgdXBsb2FkcG9zdFNlcnZpY2U6IFVwbG9hZHBvc3RTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLCBcclxuICAgIHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHNlYXJjaFNlcnZpY2U6IFNlYXJjaFNlcnZpY2VcclxuICApIHt9XHJcbiAgbmdPbkluaXQoKSB7IH1cclxuXHJcbiAgb25TdGF0ZUNoZWNrVGFwKCl7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlcik7XHJcbiAgICBmb3IodmFyIHVpZCBpbiB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlcil7XHJcbiAgICAgIHN3aXRjaCh0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlclt1aWRdWydlbm5lYWdyYW0nXVsnbnVtYmVyJ10pe1xyXG4gICAgICAgIGNhc2UgMTogY2FzZSAzOiBjYXNlIDU6IHRoaXMuc3RhdGVDaGVja0NvbmZpcm0oXCJTdWNjZXNzXCIsXCJGYWlsdXJlXCIpOyBicmVhaztcclxuICAgICAgICBjYXNlIDc6IGNhc2UgOTogY2FzZSAyOiB0aGlzLnN0YXRlQ2hlY2tDb25maXJtKFwiUG9zaXRpdmVcIixcIk5lZ2F0aXZlXCIpOyBicmVhaztcclxuICAgICAgICBjYXNlIDQ6IGNhc2UgNjogY2FzZSA4OiB0aGlzLnN0YXRlQ2hlY2tDb25maXJtKFwiVHJ1c3RlZFwiLFwiQmV0cmF5ZWRcIik7IGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6IGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cdHN0YXRlQ2hlY2tDb25maXJtKGdvb2Rfc3RhdGU6c3RyaW5nLCBiYWRfc3RhdGU6c3RyaW5nKSB7XHJcblx0XHRjb25maXJtKHtcclxuXHRcdFx0dGl0bGU6IFwiQ2hvb3NlIFlvdXIgQ3VycmVudCBTdGF0ZS4gSXQgaGVscHMgeW91IHRvIGZpbmQgb3Igc2hhcmUgaWRlYS5cIixcclxuXHRcdFx0Y2FuY2VsQnV0dG9uVGV4dDogYmFkX3N0YXRlLFxyXG5cdFx0XHRva0J1dHRvblRleHQ6IGdvb2Rfc3RhdGUsXHJcblx0XHR9KS50aGVuKChyZXN1bHQpID0+IHtcclxuXHRcdFx0aWYgKHJlc3VsdCA9PSB0cnVlKSB7XHJcblx0XHRcdFx0dGhpcy5hY3Rpdml0eUNoZWNrKFwiRG8geW91IGhhdmUgc29tZSBnb29kIElkZWE/XCIsIHJlc3VsdCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5hY3Rpdml0eUNoZWNrKFwiRG8geW91IGhhdmUgYW55IHdvcnJpZXM/XCIsIHJlc3VsdCk7XHJcbiAgICAgIH1cclxuXHRcdH0pO1xyXG5cdH1cclxuICBhY3Rpdml0eUNoZWNrKGFjdGl2aXR5TWVzc2FnZTpzdHJpbmcsIHN0YXRlOmJvb2xlYW4pIHtcclxuXHRcdGNvbmZpcm0oe1xyXG5cdFx0XHR0aXRsZTogXCJDaG9vc2UgWW91ciBBY3Rpdml0eVwiLFxyXG5cdFx0XHRtZXNzYWdlOiBhY3Rpdml0eU1lc3NhZ2UsXHJcbiAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiTm9cIixcclxuXHRcdFx0b2tCdXR0b25UZXh0OiBcIlllc1wiLFxyXG5cdFx0fSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgIGlmIChyZXN1bHQgPT0gdHJ1ZSAmJiBzdGF0ZSA9PSB0cnVlKSB7dGhpcy5sYXN0Q2hlY2socmVzdWx0LCBzdGF0ZSxcIkNhbiB5b3Ugc2hvdyB5b3VyIGlkZWEgYXMgYSBpbWFnZT9cIil9XHJcbiAgICAgIGVsc2UgaWYgKHJlc3VsdCA9PSBmYWxzZSAmJiBzdGF0ZSA9PSB0cnVlKSB7dGhpcy5sYXN0Q2hlY2socmVzdWx0LCBzdGF0ZSxcIkNhbiB5b3UgZ2l2ZSBzb21lIGFkdmljZT9cIil9XHJcbiAgICAgIGVsc2UgaWYgKHJlc3VsdCA9PSB0cnVlICYmIHN0YXRlID09IGZhbHNlKSB7dGhpcy5sYXN0Q2hlY2socmVzdWx0LCBzdGF0ZSxcIkNhbiB5b3Ugc2hvdyB3aGF0IHlvdSBhcmUgd29ycnkgYWJvdXQgYXMgYSBpbWFnZT9cIil9XHJcbiAgICAgIGVsc2UgaWYgKHJlc3VsdCA9PSBmYWxzZSAmJiBzdGF0ZSA9PSBmYWxzZSkge3RoaXMubGFzdENoZWNrKHJlc3VsdCwgc3RhdGUsXCJEbyB5b3UgbmVlZCBzb21lIGlkZWE/XCIpfVxyXG5cdFx0fSk7XHJcbiAgfVxyXG4gIGxhc3RDaGVjayhzdGF0ZTEsIHN0YXRlMiwgbGFzdENoZWNrTWVzc2FnZTpzdHJpbmcpe1xyXG4gICAgY29uZmlybSh7XHJcblx0XHRcdHRpdGxlOiBcIkNob29zZSBZb3VyIEFjdGl2aXR5XCIsXHJcblx0XHRcdG1lc3NhZ2U6IGxhc3RDaGVja01lc3NhZ2UsXHJcbiAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiTm9cIixcclxuXHRcdFx0b2tCdXR0b25UZXh0OiBcIlllc1wiLFxyXG5cdFx0fSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgIGlmKHJlc3VsdCl7XHJcbiAgICAgICAgaWYgKHN0YXRlMSA9PSB0cnVlICYmIHN0YXRlMiA9PSB0cnVlKSB7dGhpcy5vbkZvbGxvd01lVGFwKCk7fVxyXG4gICAgICAgIGVsc2UgaWYgKHN0YXRlMSA9PSBmYWxzZSAmJiBzdGF0ZTIgPT0gdHJ1ZSkge3RoaXMub25BZHZpY2VUYXAoKTt9XHJcbiAgICAgICAgZWxzZSBpZiAoc3RhdGUxID09IHRydWUgJiYgc3RhdGUyID09IGZhbHNlKSB7dGhpcy5vbkhlbHBNZVRhcCgpO31cclxuICAgICAgICBlbHNlIGlmIChzdGF0ZTEgPT0gZmFsc2UgJiYgc3RhdGUyID09IGZhbHNlKSB7dGhpcy5vbklkZWFUYXAoKTt9XHJcbiAgICAgIH1cclxuXHRcdH0pO1xyXG4gIH1cclxuXHJcbiAgb25JZGVhVGFwKCl7XHJcblx0XHR0aGlzLnNlYXJjaFNlcnZpY2UucG9zdFR5cGUgPSBcImlkZWFcIjtcclxuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9zZWFyY2hvcHRpb24nXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XHJcblx0XHR0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XHJcbiAgfVxyXG4gIG9uRm9sbG93TWVUYXAoKXtcclxuICAgIHRoaXMudXBsb2FkcG9zdFNlcnZpY2UucG9zdFR5cGUgPSBcImlkZWFcIjtcclxuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy91cGxvYWRwb3N0J10sIHsgYW5pbWF0ZWQ6IGZhbHNlIH0pO1xyXG4gICAgdGhpcy5fYnV0dG9uUmVmLm1ha2VBcnJvdygpO1xyXG4gIH1cclxuICBvbkFkdmljZVRhcCgpe1xyXG5cdFx0dGhpcy5zZWFyY2hTZXJ2aWNlLnBvc3RUeXBlID0gXCJoZWxwXCI7XHJcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvc2VhcmNob3B0aW9uJ10sIHsgYW5pbWF0ZWQ6IGZhbHNlIH0pO1xyXG5cdFx0dGhpcy5fYnV0dG9uUmVmLm1ha2VBcnJvdygpO1xyXG4gIH1cclxuICBvbkhlbHBNZVRhcCgpe1xyXG4gICAgdGhpcy51cGxvYWRwb3N0U2VydmljZS5wb3N0VHlwZSA9IFwiaGVscFwiO1xyXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL3VwbG9hZHBvc3QnXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XHJcbiAgICB0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XHJcbiAgfVxyXG59Il19