"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var list_view_1 = require("tns-core-modules/ui/list-view");
var child_button1_component_1 = require("~/modules/buttons/child-button1/child-button1.component");
var child_button2_component_1 = require("~/modules/buttons/child-button2/child-button2.component");
var child_button3_component_1 = require("~/modules/buttons/child-button3/child-button3.component");
var action_button_component_1 = require("~/modules/buttons/action-button/action-button.component");
var router_1 = require("nativescript-angular/router");
var firebase_service_1 = require("~/services/firebase.service");
var FriendchatComponent = /** @class */ (function () {
    function FriendchatComponent(routerExtensions, firebaseService) {
        this.routerExtensions = routerExtensions;
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
                ret = item[roomID]['room_users'][this.firebaseService.authuser.uid]['roomIcon'];
            }
        }
        return ret;
    };
    FriendchatComponent.prototype.getRoomTitle = function (item) {
        var ret = "";
        for (var roomID in item) {
            ret = item[roomID]['room_users'][this.firebaseService.authuser.uid]['title'];
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
        this.firebaseService.selectedRoomMessageArray = [];
        // console.log(this.roomList.items[args.index]);
        for (var selectedRoomID in this.roomList.items[args.index]) {
            this.firebaseService.selectedRoomID = selectedRoomID;
            this.firebaseService.selectedRoomTitle = this.firebaseService.getRooms()[selectedRoomID]['room_users'][this.firebaseService.authuser.uid]['title'];
            var messages = this.firebaseService.getRooms()[selectedRoomID]['messages'];
            this.firebaseService.selectedRoomMessageArray = this.firebaseService.jsonToArray(messages);
            this.firebaseService.sortMessageArrayWithTimeStamp(this.firebaseService.selectedRoomMessageArray);
        }
        this.firebaseService.analyticsCount("friendChatTap");
        this.routerExtensions.navigate(['/chatroom'], { animated: false });
    };
    FriendchatComponent.prototype.onTap = function () {
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
            firebase_service_1.FirebaseService])
    ], FriendchatComponent);
    return FriendchatComponent;
}());
exports.FriendchatComponent = FriendchatComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kY2hhdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcmllbmRjaGF0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCwyREFBeUQ7QUFDekQsbUdBQWdHO0FBQ2hHLG1HQUFnRztBQUNoRyxtR0FBZ0c7QUFDaEcsbUdBQWdHO0FBQ2hHLHNEQUErRDtBQUMvRCxnRUFBOEQ7QUFVOUQ7SUFZQyw2QkFBb0IsZ0JBQWtDLEVBQzdDLGVBQWdDO1FBRHJCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDN0Msb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBTHRDLGVBQVUsR0FBVyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFDLGlCQUFZLEdBQVcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDakQsZ0JBQVcsR0FBVyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBSWxELENBQUM7SUFFRCxzQ0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELDRDQUFjLEdBQWQsVUFBZSxJQUFJO1FBQ2xCLElBQUksR0FBRyxHQUFVLEVBQUUsQ0FBQztRQUNwQixxQkFBcUI7UUFDckIsSUFBRyxJQUFJLElBQUUsSUFBSSxFQUFDO1lBQ2IsS0FBSSxJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7Z0JBQ3ZCLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDaEY7U0FDRDtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ1osQ0FBQztJQUNELDBDQUFZLEdBQVosVUFBYSxJQUFJO1FBQ2hCLElBQUksR0FBRyxHQUFVLEVBQUUsQ0FBQztRQUNwQixLQUFJLElBQUksTUFBTSxJ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MUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMxQztJQUNGLENBQUM7SUE3RXNCO1FBQXRCLGdCQUFTLENBQUMsVUFBVSxDQUFDO2tDQUFXLG9CQUFRO3lEQUFDO0lBQ2Y7UUFBMUIsZ0JBQVMsQ0FBQyxjQUFjLENBQUM7a0NBQWEsK0NBQXFCOzJEQUFDO0lBR2xDO1FBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDO2tDQUFlLCtDQUFxQjs2REFBQztJQUNwQztRQUExQixnQkFBUyxDQUFDLGNBQWMsQ0FBQztrQ0FBZSwrQ0FBcUI7NkRBQUM7SUFDcEM7UUFBMUIsZ0JBQVMsQ0FBQyxjQUFjLENBQUM7a0NBQWUsK0NBQXFCOzZEQUFDO0lBUG5ELG1CQUFtQjtRQU4vQixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7U0FDekMsQ0FBQzt5Q0FhcUMseUJBQWdCO1lBQzVCLGtDQUFlO09BYjdCLG1CQUFtQixDQStFL0I7SUFBRCwwQkFBQztDQUFBLEFBL0VELElBK0VDO0FBL0VZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBMaXN0VmlldyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3Qtdmlld1wiO1xyXG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjFDb21wb25lbnQgfSBmcm9tIFwifi9tb2R1bGVzL2J1dHRvbnMvY2hpbGQtYnV0dG9uMS9jaGlsZC1idXR0b24xLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjJDb21wb25lbnQgfSBmcm9tIFwifi9tb2R1bGVzL2J1dHRvbnMvY2hpbGQtYnV0dG9uMi9jaGlsZC1idXR0b24yLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjNDb21wb25lbnQgfSBmcm9tIFwifi9tb2R1bGVzL2J1dHRvbnMvY2hpbGQtYnV0dG9uMy9jaGlsZC1idXR0b24zLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBBY3Rpb25CdXR0b25Db21wb25lbnQgfSBmcm9tIFwifi9tb2R1bGVzL2J1dHRvbnMvYWN0aW9uLWJ1dHRvbi9hY3Rpb24tYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwifi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IG5nRGV2TW9kZVJlc2V0UGVyZkNvdW50ZXJzIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmUvc3JjL3JlbmRlcjMvbmdfZGV2X21vZGVcIjtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogXCJGcmllbmRjaGF0XCIsXHJcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuXHR0ZW1wbGF0ZVVybDogXCIuL2ZyaWVuZGNoYXQuY29tcG9uZW50Lmh0bWxcIixcclxuXHRzdHlsZVVybHM6IFsnLi9mcmllbmRjaGF0LmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRnJpZW5kY2hhdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0QFZpZXdDaGlsZChcInJvb21MaXN0XCIpIHJvb21MaXN0OiBMaXN0VmlldztcclxuXHRAVmlld0NoaWxkKFwiYWN0aW9uQnV0dG9uXCIpIF9idXR0b25SZWY6IEFjdGlvbkJ1dHRvbkNvbXBvbmVudDtcclxuXHJcblx0cHVibGljIGRyYXdlcjogYm9vbGVhbjtcclxuXHRAVmlld0NoaWxkKFwiY2hpbGRCdXR0b24xXCIpIGNoaWxkQnV0dG9uMTogQ2hpbGRCdXR0b24xQ29tcG9uZW50O1xyXG5cdEBWaWV3Q2hpbGQoXCJjaGlsZEJ1dHRvbjJcIikgY2hpbGRCdXR0b24yOiBDaGlsZEJ1dHRvbjJDb21wb25lbnQ7XHJcblx0QFZpZXdDaGlsZChcImNoaWxkQnV0dG9uM1wiKSBjaGlsZEJ1dHRvbjM6IENoaWxkQnV0dG9uM0NvbXBvbmVudDtcclxuICAgIGN1cnJlbnREYXk6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0RGF0ZSgpO1xyXG4gICAgY3VycmVudE1vbnRoOiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgY3VycmVudFllYXI6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG5cdFx0cHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSkge1xyXG5cdH1cclxuXHJcblx0bmdPbkluaXQoKTogdm9pZCB7XHJcblx0fVxyXG5cclxuXHRnZXRSb29tSWNvbnNyYyhpdGVtKTpzdHJpbmd7XHJcblx0XHR2YXIgcmV0OnN0cmluZyA9IFwiXCI7XHJcblx0XHQvLyBjb25zb2xlLmxvZyhpdGVtKTtcclxuXHRcdGlmKGl0ZW0hPW51bGwpe1xyXG5cdFx0XHRmb3IodmFyIHJvb21JRCBpbiBpdGVtKSB7XHJcblx0XHRcdFx0cmV0ID0gaXRlbVtyb29tSURdWydyb29tX3VzZXJzJ11bdGhpcy5maXJlYmFzZVNlcnZpY2UuYXV0aHVzZXIudWlkXVsncm9vbUljb24nXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJldDtcclxuXHR9XHJcblx0Z2V0Um9vbVRpdGxlKGl0ZW0pOnN0cmluZ3tcclxuXHRcdHZhciByZXQ6c3RyaW5nID0gXCJcIjtcclxuXHRcdGZvcih2YXIgcm9vbUlEIGluIGl0ZW0pIHtcclxuXHRcdFx0cmV0ID0gaXRlbVtyb29tSURdWydyb29tX3VzZXJzJ11bdGhpcy5maXJlYmFzZVNlcnZpY2UuYXV0aHVzZXIudWlkXVsndGl0bGUnXTtcclxuXHRcdH1cclxuXHRcdHJldHVybiByZXQ7XHJcblx0fVxyXG5cdGdldFJvb21MYXN0TWVzc2FnZShpdGVtKTpzdHJpbmd7XHJcblx0XHR2YXIgcmV0OnN0cmluZyA9IFwiXCI7XHJcblx0XHR2YXIgbGFzdF90aW1lc3RhbXAgPSAwO1xyXG5cdFx0Zm9yKHZhciByb29tSUQgaW4gaXRlbSl7XHJcblx0XHRcdHZhciBtZXNzYWdlcyA9IGl0ZW1bcm9vbUlEXVsnbWVzc2FnZXMnXTtcclxuXHRcdFx0Zm9yKHZhciBtZXNzYWdlSUQgaW4gbWVzc2FnZXMpe1xyXG5cdFx0XHRcdHZhciBtZXNzYWdlUGFjayA9IG1lc3NhZ2VzW21lc3NhZ2VJRF07XHJcblx0XHRcdFx0aWYobWVzc2FnZVBhY2tbJ3RpbWVzdGFtcCddWyd0aW1lJ10+bGFzdF90aW1lc3RhbXApe1xyXG5cdFx0XHRcdFx0bGFzdF90aW1lc3RhbXAgPSBtZXNzYWdlUGFja1sndGltZXN0YW1wJ11bJ3RpbWUnXTtcclxuXHRcdFx0XHRcdHJldCA9IG1lc3NhZ2VQYWNrWydtZXNzYWdlJ107XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmV0O1xyXG5cdH1cclxuXHJcblx0b25JdGVtVGFwKGFyZ3MpIHtcclxuXHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheSA9IFtdO1xyXG5cdFx0Ly8gY29uc29sZS5sb2codGhpcy5yb29tTGlzdC5pdGVtc1thcmdzLmluZGV4XSk7XHJcblx0XHRmb3IodmFyIHNlbGVjdGVkUm9vbUlEIGluIHRoaXMucm9vbUxpc3QuaXRlbXNbYXJncy5pbmRleF0pe1xyXG5cdFx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5zZWxlY3RlZFJvb21JRCA9IHNlbGVjdGVkUm9vbUlEO1xyXG5cdFx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5zZWxlY3RlZFJvb21UaXRsZSA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldFJvb21zKClbc2VsZWN0ZWRSb29tSURdWydyb29tX3VzZXJzJ11bdGhpcy5maXJlYmFzZVNlcnZpY2UuYXV0aHVzZXIudWlkXVsndGl0bGUnXTtcclxuXHRcdFx0dmFyIG1lc3NhZ2VzID0gdGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0Um9vbXMoKVtzZWxlY3RlZFJvb21JRF1bJ21lc3NhZ2VzJ11cclxuXHRcdFx0dGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRSb29tTWVzc2FnZUFycmF5ID0gdGhpcy5maXJlYmFzZVNlcnZpY2UuanNvblRvQXJyYXkobWVzc2FnZXMpO1xyXG5cdFx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5zb3J0TWVzc2FnZUFycmF5V2l0aFRpbWVTdGFtcCh0aGlzLmZpcmViYXNlU2VydmljZS5zZWxlY3RlZFJvb21NZXNzYWdlQXJyYXkpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5maXJlYmFzZVNlcnZpY2UuYW5hbHl0aWNzQ291bnQoXCJmcmllbmRDaGF0VGFwXCIpO1xyXG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2NoYXRyb29tJ10sIHsgYW5pbWF0ZWQ6IGZhbHNlIH0pO1xyXG5cdH1cclxuXHRwdWJsaWMgb25UYXAoKTogdm9pZCB7XHJcblx0XHRpZiAodGhpcy5kcmF3ZXIpIHtcclxuXHRcdFx0dGhpcy5kcmF3ZXIgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjEuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XHJcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24yLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xyXG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMy5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLmRyYXdlciA9IHRydWU7XHJcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24xLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xyXG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMi5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcclxuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjMuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XHJcblx0XHR9XHJcblx0fVxyXG59Il19