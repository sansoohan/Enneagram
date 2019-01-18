"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_cardview_1 = require("nativescript-cardview");
var firebase_service_1 = require("../../../services/firebase.service");
element_registry_1.registerElement('CardView', function () { return nativescript_cardview_1.CardView; });
var ChatRoomComponent = /** @class */ (function () {
    function ChatRoomComponent(routerExtensions, firebaseService, ngZone) {
        this.routerExtensions = routerExtensions;
        this.firebaseService = firebaseService;
        this.ngZone = ngZone;
        this.str = "";
    }
    ChatRoomComponent.prototype.onScrollerLoaded = function (data) {
        this.scrollView = data.object;
        this.setScrollToBottom();
    };
    ChatRoomComponent.prototype.setScrollToBottom = function () {
        var _this = this;
        setInterval(function () {
            // if(this.firebaseService.messageUpdatedToggle){
            _this.scrollView.scrollToVerticalOffset(_this.scrollView.scrollableHeight, false);
            // this.firebaseService.messageUpdatedToggle = false;
            // }
        }, 100);
    };
    ChatRoomComponent.prototype.ngOnInit = function () {
    };
    ChatRoomComponent.prototype.onTap = function (args) {
        this.routerExtensions.back();
    };
    ChatRoomComponent.prototype.getProfilePicsrc = function (item) {
        var user_id = item[Object.keys(item)[0]]['user'];
        return this.firebaseService.getRooms()[this.firebaseService.selectedRoomID]['room_users'][user_id]['messageIcon'];
    };
    ChatRoomComponent.prototype.getProfileName = function (item) {
        var user_id = item[Object.keys(item)[0]]['user'];
        return this.firebaseService.getRooms()[this.firebaseService.selectedRoomID]['room_users'][user_id]['userName'];
    };
    ChatRoomComponent.prototype.getMessage = function (item) {
        return item[Object.keys(item)[0]]['message'];
    };
    ChatRoomComponent.prototype.pushMessage = function () {
        var room_id = this.firebaseService.selectedRoomID;
        var user = this.firebaseService.thisUser;
        if (this.str == "") {
            return;
        }
        this.firebaseService.pushMessageOnRoom(room_id, user, this.str);
        this.removeString();
        this.setScrollToBottom();
    };
    ChatRoomComponent.prototype.removeString = function () {
        this.str = "";
    };
    ChatRoomComponent = __decorate([
        core_1.Component({
            selector: "ChatRoom",
            moduleId: module.id,
            templateUrl: "./chat-room.component.html",
            styleUrls: ['./chat-room.component.css']
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            firebase_service_1.FirebaseService,
            core_1.NgZone])
    ], ChatRoomComponent);
    return ChatRoomComponent;
}());
exports.ChatRoomComponent = ChatRoomComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC1yb29tLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNoYXQtcm9vbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBb0U7QUFDcEUsc0RBQStEO0FBRS9ELDBFQUF3RTtBQUN4RSwrREFBaUQ7QUFDakQsdUVBQXFFO0FBRXJFLGtDQUFlLENBQUMsVUFBVSxFQUFFLGNBQU0sT0FBQSxnQ0FBUSxFQUFSLENBQVEsQ0FBQyxDQUFDO0FBVTVDO0lBa0JDLDJCQUFvQixnQkFBa0MsRUFDN0MsZUFBZ0MsRUFDaEMsTUFBYztRQUZILHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDN0Msb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFuQnZCLFFBQUcsR0FBVyxFQUFFLENBQUM7SUFvQmQsQ0FBQztJQWpCRyw0Q0FBZ0IsR0FBdkIsVUFBd0IsSUFBSTtRQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDOUIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELDZDQUFpQixHQUFqQjtRQUFBLGlCQU9DO1FBTkEsV0FBVyxDQUFDO1lBQ1gsaURBQWlEO1lBQ2hELEtBQUksQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNoRixxREFBcUQ7WUFDdEQsSUFBSTtRQUNMLENBQUMsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUNSLENBQUM7SUFPRSxvQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQUVKLGlDQUFLLEdBQUwsVUFBTSxJQUFzQjtRQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUdELDRDQUFnQixHQUFoQixVQUFpQixJQUFJO1FBQ3BCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNuSCxDQUFDO0lBQ0QsMENBQWMsR0FBZCxVQUFlLElBQUk7UUFDbEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2hILENBQUM7SUFDRCxzQ0FBVSxHQUFWLFVBQVcsSUFBUTtRQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBQ0QsdUNBQVcsR0FBWDtRQUNDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDO1FBQ2xELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDO1FBQ3pDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUUsRUFBRSxDQUFDLENBQUEsQ0FBQztZQUNoQixNQUFNLENBQUM7UUFDUixDQUFDO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUNFLHdDQUFZLEdBQVo7UUFDSSxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBdkRXLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7U0FDeEMsQ0FBQzt5Q0FtQnFDLHlCQUFnQjtZQUM1QixrQ0FBZTtZQUN4QixhQUFNO09BcEJYLGlCQUFpQixDQXdEN0I7SUFBRCx3QkFBQztDQUFBLEFBeERELElBd0RDO0FBeERZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsTmdab25lIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzXCI7XHJcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnknO1xyXG5pbXBvcnQgeyBDYXJkVmlldyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1jYXJkdmlldyc7XHJcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFNjcm9sbFZpZXcgfSBmcm9tIFwidWkvc2Nyb2xsLXZpZXdcIjtcclxucmVnaXN0ZXJFbGVtZW50KCdDYXJkVmlldycsICgpID0+IENhcmRWaWV3KTtcclxuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6IFwiQ2hhdFJvb21cIixcclxuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG5cdHRlbXBsYXRlVXJsOiBcIi4vY2hhdC1yb29tLmNvbXBvbmVudC5odG1sXCIsXHJcblx0c3R5bGVVcmxzOiBbJy4vY2hhdC1yb29tLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2hhdFJvb21Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdHN0cjogc3RyaW5nID0gXCJcIjtcclxuXHRzY3JvbGxWaWV3OiBTY3JvbGxWaWV3O1xyXG5cdHByaXZhdGUgc2Nyb2xsSW50ZXJ2YWxJZDtcclxuXHRwdWJsaWMgb25TY3JvbGxlckxvYWRlZChkYXRhKXtcclxuXHRcdHRoaXMuc2Nyb2xsVmlldyA9IGRhdGEub2JqZWN0O1xyXG5cdFx0dGhpcy5zZXRTY3JvbGxUb0JvdHRvbSgpO1xyXG5cdH1cclxuXHJcblx0c2V0U2Nyb2xsVG9Cb3R0b20oKXtcclxuXHRcdHNldEludGVydmFsKCgpPT57XHJcblx0XHRcdC8vIGlmKHRoaXMuZmlyZWJhc2VTZXJ2aWNlLm1lc3NhZ2VVcGRhdGVkVG9nZ2xlKXtcclxuXHRcdFx0XHR0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsVG9WZXJ0aWNhbE9mZnNldCh0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsYWJsZUhlaWdodCwgZmFsc2UpO1xyXG5cdFx0XHRcdC8vIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLm1lc3NhZ2VVcGRhdGVkVG9nZ2xlID0gZmFsc2U7XHJcblx0XHRcdC8vIH1cclxuXHRcdH0sMTAwKTtcclxuXHR9XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuXHRcdHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UsXHJcblx0XHRwcml2YXRlIG5nWm9uZTogTmdab25lXHJcblx0KXtcdH1cclxuXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcblxyXG5cdG9uVGFwKGFyZ3M6IEdlc3R1cmVFdmVudERhdGEpIHtcclxuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XHJcblx0fVxyXG5cclxuXHJcblx0Z2V0UHJvZmlsZVBpY3NyYyhpdGVtKXtcclxuXHRcdHZhciB1c2VyX2lkID0gaXRlbVtPYmplY3Qua2V5cyhpdGVtKVswXV1bJ3VzZXInXTtcclxuXHRcdHJldHVybiB0aGlzLmZpcmViYXNlU2VydmljZS5nZXRSb29tcygpW3RoaXMuZmlyZWJhc2VTZXJ2aWNlLnNlbGVjdGVkUm9vbUlEXVsncm9vbV91c2VycyddW3VzZXJfaWRdWydtZXNzYWdlSWNvbiddO1xyXG5cdH1cclxuXHRnZXRQcm9maWxlTmFtZShpdGVtKXtcclxuXHRcdHZhciB1c2VyX2lkID0gaXRlbVtPYmplY3Qua2V5cyhpdGVtKVswXV1bJ3VzZXInXTtcclxuXHRcdHJldHVybiB0aGlzLmZpcmViYXNlU2VydmljZS5nZXRSb29tcygpW3RoaXMuZmlyZWJhc2VTZXJ2aWNlLnNlbGVjdGVkUm9vbUlEXVsncm9vbV91c2VycyddW3VzZXJfaWRdWyd1c2VyTmFtZSddO1xyXG5cdH1cclxuXHRnZXRNZXNzYWdlKGl0ZW06YW55KTogc3RyaW5ne1xyXG5cdFx0cmV0dXJuIGl0ZW1bT2JqZWN0LmtleXMoaXRlbSlbMF1dWydtZXNzYWdlJ107XHJcblx0fVxyXG5cdHB1c2hNZXNzYWdlKCk6IHZvaWQge1xyXG5cdFx0dmFyIHJvb21faWQgPSB0aGlzLmZpcmViYXNlU2VydmljZS5zZWxlY3RlZFJvb21JRDtcclxuXHRcdHZhciB1c2VyID0gdGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXI7XHJcblx0XHRpZih0aGlzLnN0cj09XCJcIil7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnB1c2hNZXNzYWdlT25Sb29tKHJvb21faWQsIHVzZXIsIHRoaXMuc3RyKTtcclxuXHRcdHRoaXMucmVtb3ZlU3RyaW5nKCk7XHJcblx0XHR0aGlzLnNldFNjcm9sbFRvQm90dG9tKCk7XHJcblx0fVxyXG4gICAgcmVtb3ZlU3RyaW5nKCk6IHZvaWQgeyAgICAgICAgXHJcbiAgICAgICAgdGhpcy5zdHIgPSBcIlwiO1xyXG5cdH1cclxufSJdfQ==