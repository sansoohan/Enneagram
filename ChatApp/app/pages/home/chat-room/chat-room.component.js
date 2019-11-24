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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC1yb29tLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNoYXQtcm9vbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBb0U7QUFDcEUsc0RBQStEO0FBRS9ELDBFQUF3RTtBQUN4RSwrREFBaUQ7QUFDakQsdUVBQXFFO0FBRXJFLGtDQUFlLENBQUMsVUFBVSxFQUFFLGNBQU0sT0FBQSxnQ0FBUSxFQUFSLENBQVEsQ0FBQyxDQUFDO0FBVTVDO0lBa0JDLDJCQUFvQixnQkFBa0MsRUFDN0MsZUFBZ0MsRUFDaEMsTUFBYztRQUZILHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDN0Msb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFuQnZCLFFBQUcsR0FBVyxFQUFFLENBQUM7SUFvQmQsQ0FBQztJQWpCRyw0Q0FBZ0IsR0FBdkIsVUFBd0IsSUFBSTtRQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDOUIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVELDZDQUFpQixHQUFqQjtRQUFBLGlCQU9DO1FBTkEsV0FBVyxDQUFDO1lBQ1gsaURBQWlEO1lBQ2hELEtBQUksQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNoRixxREFBcUQ7WUFDdEQsSUFBSTtRQUNMLENBQUMsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUNSLENBQUM7SUFPRSxvQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQUVKLGlDQUFLLEdBQUwsVUFBTSxJQUFzQjtRQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUdELDRDQUFnQixHQUFoQixVQUFpQixJQUFJO1FBQ3BCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDbkgsQ0FBQztJQUNELDBDQUFjLEdBQWQsVUFBZSxJQUFJO1FBQ2xCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDaEgsQ0FBQztJQUNELHNDQUFVLEdBQVYsVUFBVyxJQUFRO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBQ0QsdUNBQVcsR0FBWDtRQUNDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDO1FBQ2xELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDO1FBQ3pDLElBQUcsSUFBSSxDQUFDLEdBQUcsSUFBRSxFQUFFLEVBQUM7WUFDZixPQUFPO1NBQ1A7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBQ0Usd0NBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUF2RFcsaUJBQWlCO1FBTjdCLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsVUFBVTtZQUNwQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztTQUN4QyxDQUFDO3lDQW1CcUMseUJBQWdCO1lBQzVCLGtDQUFlO1lBQ3hCLGFBQU07T0FwQlgsaUJBQWlCLENBd0Q3QjtJQUFELHdCQUFDO0NBQUEsQUF4REQsSUF3REM7QUF4RFksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCxOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXNcIjtcclxuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeSc7XHJcbmltcG9ydCB7IENhcmRWaWV3IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWNhcmR2aWV3JztcclxuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uLy4uL3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgU2Nyb2xsVmlldyB9IGZyb20gXCJ1aS9zY3JvbGwtdmlld1wiO1xyXG5yZWdpc3RlckVsZW1lbnQoJ0NhcmRWaWV3JywgKCkgPT4gQ2FyZFZpZXcpO1xyXG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcclxuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogXCJDaGF0Um9vbVwiLFxyXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcblx0dGVtcGxhdGVVcmw6IFwiLi9jaGF0LXJvb20uY29tcG9uZW50Lmh0bWxcIixcclxuXHRzdHlsZVVybHM6IFsnLi9jaGF0LXJvb20uY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDaGF0Um9vbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0c3RyOiBzdHJpbmcgPSBcIlwiO1xyXG5cdHNjcm9sbFZpZXc6IFNjcm9sbFZpZXc7XHJcblx0cHJpdmF0ZSBzY3JvbGxJbnRlcnZhbElkO1xyXG5cdHB1YmxpYyBvblNjcm9sbGVyTG9hZGVkKGRhdGEpe1xyXG5cdFx0dGhpcy5zY3JvbGxWaWV3ID0gZGF0YS5vYmplY3Q7XHJcblx0XHR0aGlzLnNldFNjcm9sbFRvQm90dG9tKCk7XHJcblx0fVxyXG5cclxuXHRzZXRTY3JvbGxUb0JvdHRvbSgpe1xyXG5cdFx0c2V0SW50ZXJ2YWwoKCk9PntcclxuXHRcdFx0Ly8gaWYodGhpcy5maXJlYmFzZVNlcnZpY2UubWVzc2FnZVVwZGF0ZWRUb2dnbGUpe1xyXG5cdFx0XHRcdHRoaXMuc2Nyb2xsVmlldy5zY3JvbGxUb1ZlcnRpY2FsT2Zmc2V0KHRoaXMuc2Nyb2xsVmlldy5zY3JvbGxhYmxlSGVpZ2h0LCBmYWxzZSk7XHJcblx0XHRcdFx0Ly8gdGhpcy5maXJlYmFzZVNlcnZpY2UubWVzc2FnZVVwZGF0ZWRUb2dnbGUgPSBmYWxzZTtcclxuXHRcdFx0Ly8gfVxyXG5cdFx0fSwxMDApO1xyXG5cdH1cclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG5cdFx0cHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSxcclxuXHRcdHByaXZhdGUgbmdab25lOiBOZ1pvbmVcclxuXHQpe1x0fVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcblx0b25UYXAoYXJnczogR2VzdHVyZUV2ZW50RGF0YSkge1xyXG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuXHR9XHJcblxyXG5cclxuXHRnZXRQcm9maWxlUGljc3JjKGl0ZW0pe1xyXG5cdFx0dmFyIHVzZXJfaWQgPSBpdGVtW09iamVjdC5rZXlzKGl0ZW0pWzBdXVsndXNlciddO1xyXG5cdFx0cmV0dXJuIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldFJvb21zKClbdGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRSb29tSURdWydyb29tX3VzZXJzJ11bdXNlcl9pZF1bJ21lc3NhZ2VJY29uJ107XHJcblx0fVxyXG5cdGdldFByb2ZpbGVOYW1lKGl0ZW0pe1xyXG5cdFx0dmFyIHVzZXJfaWQgPSBpdGVtW09iamVjdC5rZXlzKGl0ZW0pWzBdXVsndXNlciddO1xyXG5cdFx0cmV0dXJuIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldFJvb21zKClbdGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRSb29tSURdWydyb29tX3VzZXJzJ11bdXNlcl9pZF1bJ3VzZXJOYW1lJ107XHJcblx0fVxyXG5cdGdldE1lc3NhZ2UoaXRlbTphbnkpOiBzdHJpbmd7XHJcblx0XHRyZXR1cm4gaXRlbVtPYmplY3Qua2V5cyhpdGVtKVswXV1bJ21lc3NhZ2UnXTtcclxuXHR9XHJcblx0cHVzaE1lc3NhZ2UoKTogdm9pZCB7XHJcblx0XHR2YXIgcm9vbV9pZCA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnNlbGVjdGVkUm9vbUlEO1xyXG5cdFx0dmFyIHVzZXIgPSB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlcjtcclxuXHRcdGlmKHRoaXMuc3RyPT1cIlwiKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5maXJlYmFzZVNlcnZpY2UucHVzaE1lc3NhZ2VPblJvb20ocm9vbV9pZCwgdXNlciwgdGhpcy5zdHIpO1xyXG5cdFx0dGhpcy5yZW1vdmVTdHJpbmcoKTtcclxuXHRcdHRoaXMuc2V0U2Nyb2xsVG9Cb3R0b20oKTtcclxuXHR9XHJcbiAgICByZW1vdmVTdHJpbmcoKTogdm9pZCB7ICAgICAgICBcclxuICAgICAgICB0aGlzLnN0ciA9IFwiXCI7XHJcblx0fVxyXG59Il19