"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var blog_service_1 = require("../blog/blog-service");
var router_1 = require("nativescript-angular/router");
var firebase_service_1 = require("../../services/firebase.service");
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var IdeamatchingComponent = /** @class */ (function () {
    function IdeamatchingComponent(blogService, routerExtensions, firebaseService) {
        this.blogService = blogService;
        this.routerExtensions = routerExtensions;
        this.firebaseService = firebaseService;
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
                _this.activityCheck("Do you have some Idea?", result);
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
                _this.lastCheck(_this.onFollowMeTap, "Can you show your idea as a image?");
            }
            else if (result == false && state == true) {
                _this.lastCheck(_this.onAdviceTap, "Can you give some advice?");
            }
            else if (result == true && state == false) {
                _this.lastCheck(_this.onHelpMeTap, "Can you show what you are worry about as a image?");
            }
            else if (result == false && state == false) {
                _this.lastCheck(_this.onIdeaTap, "Do you need some idea?");
            }
        });
    };
    IdeamatchingComponent.prototype.lastCheck = function (activity, lastCheckMessage) {
        activity().bind(this);
        // confirm({
        // 	title: "Choose Your Activity",
        // 	message: lastCheckMessage,-
        //   cancelButtonText: "No",
        // 	okButtonText: "Yes",
        // }).then((result) => {
        //   if(result == true){
        //     activity();
        //   }
        // });
    };
    IdeamatchingComponent.prototype.onIdeaTap = function () {
    };
    IdeamatchingComponent.prototype.onFollowMeTap = function () {
        this.blogService.postType = "follow me";
        this.routerExtensions.navigate(['/blog'], { animated: false });
        this._buttonRef.makeArrow();
    };
    IdeamatchingComponent.prototype.onAdviceTap = function () {
    };
    IdeamatchingComponent.prototype.onHelpMeTap = function () {
        this.blogService.postType = "help me";
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
            firebase_service_1.FirebaseService])
    ], IdeamatchingComponent);
    return IdeamatchingComponent;
}());
exports.IdeamatchingComponent = IdeamatchingComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlYW1hdGNoaW5nLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImlkZWFtYXRjaGluZy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNEQ7QUFDNUQscURBQW1EO0FBQ25ELHNEQUErRDtBQUMvRCxvRUFBa0U7QUFFbEUsdURBQStGO0FBTy9GO0lBR0UsK0JBQW9CLFdBQXdCLEVBQ2xDLGdCQUFrQyxFQUNsQyxlQUFnQztRQUZ0QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUNsQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUN2QyxDQUFDO0lBQ0osd0NBQVEsR0FBUixjQUFhLENBQUM7SUFFZCwrQ0FBZSxHQUFmO1FBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLEdBQUcsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUEsQ0FBQztZQUM1QyxNQUFNLENBQUEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFBLENBQUM7Z0JBQ2hFLEtBQUssQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUFDLEtBQUssQ0FBQztvQkFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUFDLEtBQUssQ0FBQztnQkFDM0UsS0FBSyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQUMsS0FBSyxDQUFDO29CQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUMsVUFBVSxDQUFDLENBQUM7b0JBQUMsS0FBSyxDQUFDO2dCQUM3RSxLQUFLLENBQUMsQ0FB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VSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFDRCwyQ0FBVyxHQUFYO0lBRUEsQ0FBQztJQUNELDJDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUM7UUFDdEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBNUVVLHFCQUFxQjtRQU5qQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7U0FDNUMsQ0FBQzt5Q0FJaUMsMEJBQVc7WUFDaEIseUJBQWdCO1lBQ2pCLGtDQUFlO09BTC9CLHFCQUFxQixDQTZFakM7SUFBRCw0QkFBQztDQUFBLEFBN0VELElBNkVDO0FBN0VZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCbG9nU2VydmljZSB9IGZyb20gXCIuLi9ibG9nL2Jsb2ctc2VydmljZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBBY3Rpb25CdXR0b25Db21wb25lbnQgfSBmcm9tIFwiLi4vc2VhcmNocmVzdWx0L2FjdGlvbi1idXR0b24vYWN0aW9uLWJ1dHRvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgYWxlcnQsIGNvbmZpcm0sIHByb21wdCwgbG9naW4sIGFjdGlvbiwgaW5wdXRUeXBlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9nc1wiO1xyXG5AQ29tcG9uZW50KHtcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHNlbGVjdG9yOiAnSWRlYW1hdGNoaW5nJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vaWRlYW1hdGNoaW5nLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9pZGVhbWF0Y2hpbmcuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJZGVhbWF0Y2hpbmdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHByaXZhdGUgX2J1dHRvblJlZjogQWN0aW9uQnV0dG9uQ29tcG9uZW50O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJsb2dTZXJ2aWNlOiBCbG9nU2VydmljZSxcclxuICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucywgXHJcbiAgICBwcml2YXRlIGZpcmViYXNlU2VydmljZTogRmlyZWJhc2VTZXJ2aWNlLFxyXG4gICkge31cclxuICBuZ09uSW5pdCgpIHsgfVxyXG5cclxuICBvblN0YXRlQ2hlY2tUYXAoKXtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyKTtcclxuICAgIGZvcih2YXIgdWlkIGluIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyKXtcclxuICAgICAgc3dpdGNoKHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyW3VpZF1bJ2VubmVhZ3JhbSddWydudW1iZXInXSl7XHJcbiAgICAgICAgY2FzZSAxOiBjYXNlIDM6IGNhc2UgNTogdGhpcy5zdGF0ZUNoZWNrQ29uZmlybShcIlN1Y2Nlc3NcIixcIkZhaWx1cmVcIik7IGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNzogY2FzZSA5OiBjYXNlIDI6IHRoaXMuc3RhdGVDaGVja0NvbmZpcm0oXCJQb3NpdGl2ZVwiLFwiTmVnYXRpdmVcIik7IGJyZWFrO1xyXG4gICAgICAgIGNhc2UgNDogY2FzZSA2OiBjYXNlIDg6IHRoaXMuc3RhdGVDaGVja0NvbmZpcm0oXCJUcnVzdGVkXCIsXCJCZXRyYXllZFwiKTsgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDogYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblx0c3RhdGVDaGVja0NvbmZpcm0oZ29vZF9zdGF0ZTpzdHJpbmcsIGJhZF9zdGF0ZTpzdHJpbmcpIHtcclxuXHRcdGNvbmZpcm0oe1xyXG5cdFx0XHR0aXRsZTogXCJDaG9vc2UgWW91ciBDdXJyZW50IFN0YXRlLiBJdCBoZWxwcyB5b3UgdG8gZmluZCBvciBzaGFyZSBpZGVhLlwiLFxyXG5cdFx0XHRjYW5jZWxCdXR0b25UZXh0OiBiYWRfc3RhdGUsXHJcblx0XHRcdG9rQnV0dG9uVGV4dDogZ29vZF9zdGF0ZSxcclxuXHRcdH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG5cdFx0XHRpZiAocmVzdWx0ID09IHRydWUpIHtcclxuXHRcdFx0XHR0aGlzLmFjdGl2aXR5Q2hlY2soXCJEbyB5b3UgaGF2ZSBzb21lIElkZWE/XCIsIHJlc3VsdCk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5hY3Rpdml0eUNoZWNrKFwiRG8geW91IGhhdmUgYW55IHdvcnJpZXM/XCIsIHJlc3VsdCk7XHJcbiAgICAgIH1cclxuXHRcdH0pO1xyXG5cdH1cclxuICBhY3Rpdml0eUNoZWNrKGFjdGl2aXR5TWVzc2FnZTpzdHJpbmcsIHN0YXRlOmJvb2xlYW4pIHtcclxuXHRcdGNvbmZpcm0oe1xyXG5cdFx0XHR0aXRsZTogXCJDaG9vc2UgWW91ciBBY3Rpdml0eVwiLFxyXG5cdFx0XHRtZXNzYWdlOiBhY3Rpdml0eU1lc3NhZ2UsXHJcbiAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IFwiTm9cIixcclxuXHRcdFx0b2tCdXR0b25UZXh0OiBcIlllc1wiLFxyXG5cdFx0fSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgIGlmIChyZXN1bHQgPT0gdHJ1ZSAmJiBzdGF0ZSA9PSB0cnVlKSB7dGhpcy5sYXN0Q2hlY2sodGhpcy5vbkZvbGxvd01lVGFwLFwiQ2FuIHlvdSBzaG93IHlvdXIgaWRlYSBhcyBhIGltYWdlP1wiKX1cclxuICAgICAgZWxzZSBpZiAocmVzdWx0ID09IGZhbHNlICYmIHN0YXRlID09IHRydWUpIHt0aGlzLmxhc3RDaGVjayh0aGlzLm9uQWR2aWNlVGFwLFwiQ2FuIHlvdSBnaXZlIHNvbWUgYWR2aWNlP1wiKX1cclxuICAgICAgZWxzZSBpZiAocmVzdWx0ID09IHRydWUgJiYgc3RhdGUgPT0gZmFsc2UpIHt0aGlzLmxhc3RDaGVjayh0aGlzLm9uSGVscE1lVGFwLFwiQ2FuIHlvdSBzaG93IHdoYXQgeW91IGFyZSB3b3JyeSBhYm91dCBhcyBhIGltYWdlP1wiKX1cclxuICAgICAgZWxzZSBpZiAocmVzdWx0ID09IGZhbHNlICYmIHN0YXRlID09IGZhbHNlKSB7dGhpcy5sYXN0Q2hlY2sodGhpcy5vbklkZWFUYXAsXCJEbyB5b3UgbmVlZCBzb21lIGlkZWE/XCIpfVxyXG5cdFx0fSk7XHJcbiAgfVxyXG4gIGxhc3RDaGVjayhhY3Rpdml0eSwgbGFzdENoZWNrTWVzc2FnZTpzdHJpbmcpe1xyXG4gICAgYWN0aXZpdHkoKS5iaW5kKHRoaXMpO1xyXG4gICAgLy8gY29uZmlybSh7XHJcblx0XHQvLyBcdHRpdGxlOiBcIkNob29zZSBZb3VyIEFjdGl2aXR5XCIsXHJcblx0XHQvLyBcdG1lc3NhZ2U6IGxhc3RDaGVja01lc3NhZ2UsLVxyXG4gICAgLy8gICBjYW5jZWxCdXR0b25UZXh0OiBcIk5vXCIsXHJcblx0XHQvLyBcdG9rQnV0dG9uVGV4dDogXCJZZXNcIixcclxuXHRcdC8vIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgLy8gICBpZihyZXN1bHQgPT0gdHJ1ZSl7XHJcbiAgICAvLyAgICAgYWN0aXZpdHkoKTtcclxuICAgIC8vICAgfVxyXG5cdFx0Ly8gfSk7XHJcbiAgfVxyXG5cclxuICBvbklkZWFUYXAoKXtcclxuICAgICAgXHJcbiAgfVxyXG4gIG9uRm9sbG93TWVUYXAoKXtcclxuICAgIHRoaXMuYmxvZ1NlcnZpY2UucG9zdFR5cGUgPSBcImZvbGxvdyBtZVwiO1xyXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2Jsb2cnXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XHJcbiAgICB0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XHJcbiAgfVxyXG4gIG9uQWR2aWNlVGFwKCl7XHJcblxyXG4gIH1cclxuICBvbkhlbHBNZVRhcCgpe1xyXG4gICAgdGhpcy5ibG9nU2VydmljZS5wb3N0VHlwZSA9IFwiaGVscCBtZVwiO1xyXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2Jsb2cnXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XHJcbiAgICB0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XHJcbiAgfVxyXG59Il19