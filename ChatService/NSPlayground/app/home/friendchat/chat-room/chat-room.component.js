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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC1yb29tLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNoYXQtcm9vbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBb0U7QUFDcEUsc0RBQStEO0FBRS9ELDBFQUF3RTtBQUN4RSwrREFBaUQ7QUFDakQsdUVBQXFFO0FBRXJFLGtDQUFlLENBQUMsVUFBVSxFQUFFLGNBQU0sT0FBQSxnQ0FBUSxFQUFSLENBQVEsQ0FBQyxDQUFDO0FBVTVDO0lBa0JDLDJCQUFvQixnQkFBa0MsRUFDN0MsZUFBZ0MsRUFDaEMsTUFBYztRQUZILHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDN0Msb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFuQnZCLFFBQUcsR0FBVyxFQUFFLENBQUM7SUFvQmQsQ0FBQztJQWpCRyw0Q0FBZ0IsR0FBdkIsVUFBd0IsSUFBSTtRQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDOUIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELDZDQUFpQixHQUFqQjtRQUFBLGlCQU9DO1FBTkEsV0FBVyxDQUFDO1lBQ1gsaURBQWlEO1lBQ2hELEtBQUksQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNoRixxREFBcUQ7WUFDdEQsSUFBSTtRQUNMLENBQUMsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUNSLENBQUM7SUFPRSxvQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQUVKLGlDQUFLLEdBQUwsVUFBTSxJQUFzQjtRQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUdELDRDQUFnQixHQUFoQixVQUFpQixJQUFJO1FBQ3BCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNuSCxDQUFDO0lBQ0QsMENBQWMsR0FBZCxVQUFlLElBQUk7UUFDbEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2hILENBQUM7SUFDRCxzQ0FBVSxHQUFWLFVBQVcsSUFBUTtRQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBQ0QsdUNBQVcsR0FBWDtRQUNDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDO1FBQ2xELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDO1FBQ3pDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUUsRUFBRSxDQUFDLENBQUEsQ0FBQztZQUNoQixNQUFNLENBQUM7UUFDUixDQUFDO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUNFLHdDQUFZLEdBQVo7UUFDSSxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBdkRXLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7U0FDeEMsQ0FBQzt5Q0FtQnFDLHlCQUFnQjtZQUM1QixrQ0FBZTtZQUN4QixhQUFNO09BcEJYLGlCQUFpQixDQXdEN0I7SUFBRCx3QkFBQztDQUFBLEFBeERELElBd0RDO0FBeERZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsTmdab25lIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXNcIjtcbmltcG9ydCB7IHJlZ2lzdGVyRWxlbWVudCB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnknO1xuaW1wb3J0IHsgQ2FyZFZpZXcgfSBmcm9tICduYXRpdmVzY3JpcHQtY2FyZHZpZXcnO1xuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2VcIjtcbmltcG9ydCB7IFNjcm9sbFZpZXcgfSBmcm9tIFwidWkvc2Nyb2xsLXZpZXdcIjtcbnJlZ2lzdGVyRWxlbWVudCgnQ2FyZFZpZXcnLCAoKSA9PiBDYXJkVmlldyk7XG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6IFwiQ2hhdFJvb21cIixcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0dGVtcGxhdGVVcmw6IFwiLi9jaGF0LXJvb20uY29tcG9uZW50Lmh0bWxcIixcblx0c3R5bGVVcmxzOiBbJy4vY2hhdC1yb29tLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDaGF0Um9vbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cdHN0cjogc3RyaW5nID0gXCJcIjtcblx0c2Nyb2xsVmlldzogU2Nyb2xsVmlldztcblx0cHJpdmF0ZSBzY3JvbGxJbnRlcnZhbElkO1xuXHRwdWJsaWMgb25TY3JvbGxlckxvYWRlZChkYXRhKXtcblx0XHR0aGlzLnNjcm9sbFZpZXcgPSBkYXRhLm9iamVjdDtcblx0XHR0aGlzLnNldFNjcm9sbFRvQm90dG9tKCk7XG5cdH1cblxuXHRzZXRTY3JvbGxUb0JvdHRvbSgpe1xuXHRcdHNldEludGVydmFsKCgpPT57XG5cdFx0XHQvLyBpZih0aGlzLmZpcmViYXNlU2VydmljZS5tZXNzYWdlVXBkYXRlZFRvZ2dsZSl7XG5cdFx0XHRcdHRoaXMuc2Nyb2xsVmlldy5zY3JvbGxUb1ZlcnRpY2FsT2Zmc2V0KHRoaXMuc2Nyb2xsVmlldy5zY3JvbGxhYmxlSGVpZ2h0LCBmYWxzZSk7XG5cdFx0XHRcdC8vIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLm1lc3NhZ2VVcGRhdGVkVG9nZ2xlID0gZmFsc2U7XG5cdFx0XHQvLyB9XG5cdFx0fSwxMDApO1xuXHR9XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuXHRcdHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UsXG5cdFx0cHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZVxuXHQpe1x0fVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICB9XG5cblx0b25UYXAoYXJnczogR2VzdHVyZUV2ZW50RGF0YSkge1xuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG5cdH1cblxuXG5cdGdldFByb2ZpbGVQaWNzcmMoaXRlbSl7XG5cdFx0dmFyIHVzZXJfaWQgPSBpdGVtW09iamVjdC5rZXlzKGl0ZW0pWzBdXVsndXNlciddO1xuXHRcdHJldHVybiB0aGlzLmZpcmViYXNlU2VydmljZS5nZXRSb29tcygpW3RoaXMuZmlyZWJhc2VTZXJ2aWNlLnNlbGVjdGVkUm9vbUlEXVsncm9vbV91c2VycyddW3VzZXJfaWRdWydtZXNzYWdlSWNvbiddO1xuXHR9XG5cdGdldFByb2ZpbGVOYW1lKGl0ZW0pe1xuXHRcdHZhciB1c2VyX2lkID0gaXRlbVtPYmplY3Qua2V5cyhpdGVtKVswXV1bJ3VzZXInXTtcblx0XHRyZXR1cm4gdGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0Um9vbXMoKVt0aGlzLmZpcmViYXNlU2VydmljZS5zZWxlY3RlZFJvb21JRF1bJ3Jvb21fdXNlcnMnXVt1c2VyX2lkXVsndXNlck5hbWUnXTtcblx0fVxuXHRnZXRNZXNzYWdlKGl0ZW06YW55KTogc3RyaW5ne1xuXHRcdHJldHVybiBpdGVtW09iamVjdC5rZXlzKGl0ZW0pWzBdXVsnbWVzc2FnZSddO1xuXHR9XG5cdHB1c2hNZXNzYWdlKCk6IHZvaWQge1xuXHRcdHZhciByb29tX2lkID0gdGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRSb29tSUQ7XG5cdFx0dmFyIHVzZXIgPSB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlcjtcblx0XHRpZih0aGlzLnN0cj09XCJcIil7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnB1c2hNZXNzYWdlT25Sb29tKHJvb21faWQsIHVzZXIsIHRoaXMuc3RyKTtcblx0XHR0aGlzLnJlbW92ZVN0cmluZygpO1xuXHRcdHRoaXMuc2V0U2Nyb2xsVG9Cb3R0b20oKTtcblx0fVxuICAgIHJlbW92ZVN0cmluZygpOiB2b2lkIHsgICAgICAgIFxuICAgICAgICB0aGlzLnN0ciA9IFwiXCI7XG5cdH1cbn0iXX0=