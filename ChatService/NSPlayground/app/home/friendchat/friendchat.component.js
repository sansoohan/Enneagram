"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var list_view_1 = require("tns-core-modules/ui/list-view");
var child_button1_component_1 = require("../../buttons/child-button1/child-button1.component");
var child_button2_component_1 = require("../../buttons/child-button2/child-button2.component");
var child_button3_component_1 = require("../../buttons/child-button3/child-button3.component");
var action_button_component_1 = require("../ideamatching/action-button/action-button.component");
var router_1 = require("nativescript-angular/router");
var friend_chat_service_1 = require("./friend-chat.service");
var firebase_service_1 = require("../../services/firebase.service");
var FriendchatComponent = /** @class */ (function () {
    function FriendchatComponent(routerExtensions, friendChatService, firebaseService) {
        this.routerExtensions = routerExtensions;
        this.friendChatService = friendChatService;
        this.firebaseService = firebaseService;
        this.currentDay = new Date().getDate();
        this.currentMonth = new Date().getMonth() + 1;
        this.currentYear = new Date().getFullYear();
    }
    FriendchatComponent.prototype.ngOnInit = function () {
    };
    FriendchatComponent.prototype.getRoomIconsrc = function (item) {
        var ret = "";
        // console.log(item);
        if (item != null) {
            for (var roomID in item) {
                ret = item[roomID]['iconsrc'];
            }
        }
        return ret;
    };
    FriendchatComponent.prototype.getRoomTitle = function (item) {
        var ret = "";
        for (var roomID in item) {
            ret = item[roomID]['title'];
        }
        return ret;
    };
    FriendchatComponent.prototype.getRoomLastMessage = function (item) {
        var ret = "";
        var last_timestamp = 0;
        for (var roomID in item) {
            var messages = item[roomID]['messages'];
            for (var messageID in messages) {
                var messagePack = messages[messageID];
                if (messagePack['timestamp']['time'] > last_timestamp) {
                    last_timestamp = messagePack['timestamp']['time'];
                    ret = messagePack['message'];
                }
            }
        }
        return ret;
    };
    FriendchatComponent.prototype.onItemTap = function (args) {
        console.log(this.roomList.items[args.index]);
        for (var selelctedRoomID in this.roomList.items[args.index]) {
            this.friendChatService.selectedRoomID = selelctedRoomID;
            this.friendChatService.selectedRoomTitle = this.firebaseService.getRooms()[selelctedRoomID]['title'];
            var messages = this.firebaseService.getRooms()[selelctedRoomID]['messages'];
            this.friendChatService.messageArray = this.firebaseService.jsonToArray(messages);
            this.friendChatService.users = this.firebaseService.getRooms()[selelctedRoomID]['room_users'];
        }
        this.routerExtensions.navigate(['/chatroom'], { animated: false });
    };
    FriendchatComponent.prototype.onTap = function (args) {
        if (this.drawer) {
            this.drawer = false;
            this.childButton1.drawerOpen(this.drawer);
            this.childButton2.drawerOpen(this.drawer);
            this.childButton3.drawerOpen(this.drawer);
        }
        else {
            this.drawer = true;
            this.childButton1.drawerOpen(this.drawer);
            this.childButton2.drawerOpen(this.drawer);
            this.childButton3.drawerOpen(this.drawer);
        }
    };
    __decorate([
        core_1.ViewChild("roomList"),
        __metadata("design:type", list_view_1.ListView)
    ], FriendchatComponent.prototype, "roomList", void 0);
    __decorate([
        core_1.ViewChild("actionButton"),
        __metadata("design:type", action_button_component_1.ActionButtonComponent)
    ], FriendchatComponent.prototype, "_buttonRef", void 0);
    __decorate([
        core_1.ViewChild("childButton1"),
        __metadata("design:type", child_button1_component_1.ChildButton1Component)
    ], FriendchatComponent.prototype, "childButton1", void 0);
    __decorate([
        core_1.ViewChild("childButton2"),
        __metadata("design:type", child_button2_component_1.ChildButton2Component)
    ], FriendchatComponent.prototype, "childButton2", void 0);
    __decorate([
        core_1.ViewChild("childButton3"),
        __metadata("design:type", child_button3_component_1.ChildButton3Component)
    ], FriendchatComponent.prototype, "childButton3", void 0);
    FriendchatComponent = __decorate([
        core_1.Component({
            selector: "Friendchat",
            moduleId: module.id,
            templateUrl: "./friendchat.component.html",
            styleUrls: ['./friendchat.component.css']
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            friend_chat_service_1.FriendChatService,
            firebase_service_1.FirebaseService])
    ], FriendchatComponent);
    return FriendchatComponent;
}());
exports.FriendchatComponent = FriendchatComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kY2hhdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcmllbmRjaGF0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCwyREFBeUQ7QUFDekQsK0ZBQTRGO0FBQzVGLCtGQUE0RjtBQUM1RiwrRkFBNEY7QUFDNUYsaUdBQThGO0FBQzlGLHNEQUErRDtBQUMvRCw2REFBMEQ7QUFDMUQsb0VBQWtFO0FBV2xFO0lBZUMsNkJBQW9CLGdCQUFrQyxFQUM3QyxpQkFBb0MsRUFDcEMsZUFBZ0M7UUFGckIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUM3QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQVR0QyxlQUFVLEdBQVcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMxQyxpQkFBWSxHQUFXLElBQUksSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELGdCQUFXLEdBQVcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQVFsRCxDQUFDO0lBRUQsc0NBQVEsR0FBUjtJQUNBLENBQUM7SUFJRCw0Q0FBYyxHQUFkLFVBQWUsSUFBSTtRQUNsQixJQUFJLEdBQUcsR0FBVSxFQUFFLENBQUM7UUFDcEIscUJBQXFCO1FBQ3JCLEVBQUUsQ0FBQSxDQUFDLElBQUksSUFBRSxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBQ2QsR0FBRyxDQUFBLENBQUMsSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDeEIsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMvQixDQUFDO1FBQ0YsQ0FBQztRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDWixDQUFDO0lBQ0QsMENBQVksR0FBWixVQUFhLElBQUk7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LENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLENBQUM7SUFDRixDQUFDO0lBakZzQjtRQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQztrQ0FBVyxvQkFBUTt5REFBQztJQUNmO1FBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDO2tDQUFhLCtDQUFxQjsyREFBQztJQUdsQztRQUExQixnQkFBUyxDQUFDLGNBQWMsQ0FBQztrQ0FBZSwrQ0FBcUI7NkRBQUM7SUFDcEM7UUFBMUIsZ0JBQVMsQ0FBQyxjQUFjLENBQUM7a0NBQWUsK0NBQXFCOzZEQUFDO0lBQ3BDO1FBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDO2tDQUFlLCtDQUFxQjs2REFBQztJQVBuRCxtQkFBbUI7UUFOL0IsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO1NBQ3pDLENBQUM7eUNBZ0JxQyx5QkFBZ0I7WUFDMUIsdUNBQWlCO1lBQ25CLGtDQUFlO09BakI3QixtQkFBbUIsQ0FvRi9CO0lBQUQsMEJBQUM7Q0FBQSxBQXBGRCxJQW9GQztBQXBGWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IExpc3RWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC12aWV3XCI7XG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjFDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vYnV0dG9ucy9jaGlsZC1idXR0b24xL2NoaWxkLWJ1dHRvbjEuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjJDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vYnV0dG9ucy9jaGlsZC1idXR0b24yL2NoaWxkLWJ1dHRvbjIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjNDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vYnV0dG9ucy9jaGlsZC1idXR0b24zL2NoaWxkLWJ1dHRvbjMuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBBY3Rpb25CdXR0b25Db21wb25lbnQgfSBmcm9tIFwiLi4vaWRlYW1hdGNoaW5nL2FjdGlvbi1idXR0b24vYWN0aW9uLWJ1dHRvbi5jb21wb25lbnRcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBGcmllbmRDaGF0U2VydmljZSB9IGZyb20gXCIuL2ZyaWVuZC1jaGF0LnNlcnZpY2VcIjtcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBuZ0Rldk1vZGVSZXNldFBlcmZDb3VudGVycyB9IGZyb20gXCJAYW5ndWxhci9jb3JlL3NyYy9yZW5kZXIzL25nX2Rldl9tb2RlXCI7XG5pbXBvcnQgeyBsYXN0IH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlci9zcmMvdXRpbHMvY29sbGVjdGlvblwiO1xuXG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogXCJGcmllbmRjaGF0XCIsXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHRlbXBsYXRlVXJsOiBcIi4vZnJpZW5kY2hhdC5jb21wb25lbnQuaHRtbFwiLFxuXHRzdHlsZVVybHM6IFsnLi9mcmllbmRjaGF0LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGcmllbmRjaGF0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0QFZpZXdDaGlsZChcInJvb21MaXN0XCIpIHJvb21MaXN0OiBMaXN0Vmlldztcblx0QFZpZXdDaGlsZChcImFjdGlvbkJ1dHRvblwiKSBfYnV0dG9uUmVmOiBBY3Rpb25CdXR0b25Db21wb25lbnQ7XG5cblx0cHVibGljIGRyYXdlcjogYm9vbGVhbjtcblx0QFZpZXdDaGlsZChcImNoaWxkQnV0dG9uMVwiKSBjaGlsZEJ1dHRvbjE6IENoaWxkQnV0dG9uMUNvbXBvbmVudDtcblx0QFZpZXdDaGlsZChcImNoaWxkQnV0dG9uMlwiKSBjaGlsZEJ1dHRvbjI6IENoaWxkQnV0dG9uMkNvbXBvbmVudDtcblx0QFZpZXdDaGlsZChcImNoaWxkQnV0dG9uM1wiKSBjaGlsZEJ1dHRvbjM6IENoaWxkQnV0dG9uM0NvbXBvbmVudDtcbiAgICBjdXJyZW50RGF5OiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldERhdGUoKTtcbiAgICBjdXJyZW50TW9udGg6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSArIDE7XG4gICAgY3VycmVudFllYXI6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcblxuXHRcblxuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcblx0XHRwcml2YXRlIGZyaWVuZENoYXRTZXJ2aWNlOiBGcmllbmRDaGF0U2VydmljZSxcblx0XHRwcml2YXRlIGZpcmViYXNlU2VydmljZTogRmlyZWJhc2VTZXJ2aWNlKSB7XG5cdH1cblxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcblx0fVxuXG5cblxuXHRnZXRSb29tSWNvbnNyYyhpdGVtKTpzdHJpbmd7XG5cdFx0dmFyIHJldDpzdHJpbmcgPSBcIlwiO1xuXHRcdC8vIGNvbnNvbGUubG9nKGl0ZW0pO1xuXHRcdGlmKGl0ZW0hPW51bGwpe1xuXHRcdFx0Zm9yKHZhciByb29tSUQgaW4gaXRlbSkge1xuXHRcdFx0XHRyZXQgPSBpdGVtW3Jvb21JRF1bJ2ljb25zcmMnXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJldDtcblx0fVxuXHRnZXRSb29tVGl0bGUoaXRlbSk6c3RyaW5ne1xuXHRcdHZhciByZXQ6c3RyaW5nID0gXCJcIjtcblx0XHRmb3IodmFyIHJvb21JRCBpbiBpdGVtKSB7XG5cdFx0XHRyZXQgPSBpdGVtW3Jvb21JRF1bJ3RpdGxlJ107XG5cdFx0fVxuXHRcdHJldHVybiByZXQ7XG5cdH1cblx0Z2V0Um9vbUxhc3RNZXNzYWdlKGl0ZW0pOnN0cmluZ3tcblx0XHR2YXIgcmV0OnN0cmluZyA9IFwiXCI7XG5cdFx0dmFyIGxhc3RfdGltZXN0YW1wID0gMDtcblx0XHRmb3IodmFyIHJvb21JRCBpbiBpdGVtKXtcblx0XHRcdHZhciBtZXNzYWdlcyA9IGl0ZW1bcm9vbUlEXVsnbWVzc2FnZXMnXTtcblx0XHRcdGZvcih2YXIgbWVzc2FnZUlEIGluIG1lc3NhZ2VzKXtcblx0XHRcdFx0dmFyIG1lc3NhZ2VQYWNrID0gbWVzc2FnZXNbbWVzc2FnZUlEXTtcblx0XHRcdFx0aWYobWVzc2FnZVBhY2tbJ3RpbWVzdGFtcCddWyd0aW1lJ10+bGFzdF90aW1lc3RhbXApe1xuXHRcdFx0XHRcdGxhc3RfdGltZXN0YW1wID0gbWVzc2FnZVBhY2tbJ3RpbWVzdGFtcCddWyd0aW1lJ107XG5cdFx0XHRcdFx0cmV0ID0gbWVzc2FnZVBhY2tbJ21lc3NhZ2UnXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmV0O1xuXHR9XG5cblx0b25JdGVtVGFwKGFyZ3MpIHtcblx0XHRjb25zb2xlLmxvZyh0aGlzLnJvb21MaXN0Lml0ZW1zW2FyZ3MuaW5kZXhdKTtcblx0XHRmb3IodmFyIHNlbGVsY3RlZFJvb21JRCBpbiB0aGlzLnJvb21MaXN0Lml0ZW1zW2FyZ3MuaW5kZXhdKXtcblx0XHRcdHRoaXMuZnJpZW5kQ2hhdFNlcnZpY2Uuc2VsZWN0ZWRSb29tSUQgPSBzZWxlbGN0ZWRSb29tSUQ7XG5cdFx0XHR0aGlzLmZyaWVuZENoYXRTZXJ2aWNlLnNlbGVjdGVkUm9vbVRpdGxlID0gdGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0Um9vbXMoKVtzZWxlbGN0ZWRSb29tSURdWyd0aXRsZSddO1xuXHRcdFx0dmFyIG1lc3NhZ2VzID0gdGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0Um9vbXMoKVtzZWxlbGN0ZWRSb29tSURdWydtZXNzYWdlcyddXG5cdFx0XHR0aGlzLmZyaWVuZENoYXRTZXJ2aWNlLm1lc3NhZ2VBcnJheSA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmpzb25Ub0FycmF5KG1lc3NhZ2VzKTtcblx0XHRcdHRoaXMuZnJpZW5kQ2hhdFNlcnZpY2UudXNlcnMgPSB0aGlzLmZpcmViYXNlU2VydmljZS5nZXRSb29tcygpW3NlbGVsY3RlZFJvb21JRF1bJ3Jvb21fdXNlcnMnXTtcblx0XHR9XG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2NoYXRyb29tJ10sIHsgYW5pbWF0ZWQ6IGZhbHNlIH0pO1xuXHR9XG5cdHB1YmxpYyBvblRhcChhcmdzKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuZHJhd2VyKSB7XG5cdFx0XHR0aGlzLmRyYXdlciA9IGZhbHNlO1xuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjEuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMi5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24zLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRoaXMuZHJhd2VyID0gdHJ1ZTtcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24xLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjIuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMy5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcblx0XHR9XG5cdH1cblxufSJdfQ==