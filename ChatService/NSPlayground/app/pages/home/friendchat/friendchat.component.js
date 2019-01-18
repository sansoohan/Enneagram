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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kY2hhdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcmllbmRjaGF0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCwyREFBeUQ7QUFDekQsbUdBQWdHO0FBQ2hHLG1HQUFnRztBQUNoRyxtR0FBZ0c7QUFDaEcsbUdBQWdHO0FBQ2hHLHNEQUErRDtBQUMvRCxnRUFBOEQ7QUFVOUQ7SUFlQyw2QkFBb0IsZ0JBQWtDLEVBQzdDLGVBQWdDO1FBRHJCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDN0Msb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBUnRDLGVBQVUsR0FBVyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFDLGlCQUFZLEdBQVcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDakQsZ0JBQVcsR0FBVyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBT2xELENBQUM7SUFFRCxzQ0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELDRDQUFjLEdBQWQsVUFBZSxJQUFJO1FBQ2xCLElBQUksR0FBRyxHQUFVLEVBQUUsQ0FBQztRQUNwQixxQkFBcUI7UUFDckIsRUFBRSxDQUFBLENBQUMsSUFBSSxJQUFFLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDZCxHQUFHLENBQUEsQ0FBQyxJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2pGLENBQUM7UUFDRixDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNaLENBQUM7SUFDRCwwQ0FBWSxHQUFaLFVBQWEsSUFB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QUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLENBQUM7SUFDRixDQUFDO0lBaEZzQjtRQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQztrQ0FBVyxvQkFBUTt5REFBQztJQUNmO1FBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDO2tDQUFhLCtDQUFxQjsyREFBQztJQUdsQztRQUExQixnQkFBUyxDQUFDLGNBQWMsQ0FBQztrQ0FBZSwrQ0FBcUI7NkRBQUM7SUFDcEM7UUFBMUIsZ0JBQVMsQ0FBQyxjQUFjLENBQUM7a0NBQWUsK0NBQXFCOzZEQUFDO0lBQ3BDO1FBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDO2tDQUFlLCtDQUFxQjs2REFBQztJQVBuRCxtQkFBbUI7UUFOL0IsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO1NBQ3pDLENBQUM7eUNBZ0JxQyx5QkFBZ0I7WUFDNUIsa0NBQWU7T0FoQjdCLG1CQUFtQixDQW1GL0I7SUFBRCwwQkFBQztDQUFBLEFBbkZELElBbUZDO0FBbkZZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBMaXN0VmlldyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3Qtdmlld1wiO1xyXG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjFDb21wb25lbnQgfSBmcm9tIFwifi9tb2R1bGVzL2J1dHRvbnMvY2hpbGQtYnV0dG9uMS9jaGlsZC1idXR0b24xLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjJDb21wb25lbnQgfSBmcm9tIFwifi9tb2R1bGVzL2J1dHRvbnMvY2hpbGQtYnV0dG9uMi9jaGlsZC1idXR0b24yLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjNDb21wb25lbnQgfSBmcm9tIFwifi9tb2R1bGVzL2J1dHRvbnMvY2hpbGQtYnV0dG9uMy9jaGlsZC1idXR0b24zLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBBY3Rpb25CdXR0b25Db21wb25lbnQgfSBmcm9tIFwifi9tb2R1bGVzL2J1dHRvbnMvYWN0aW9uLWJ1dHRvbi9hY3Rpb24tYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwifi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IG5nRGV2TW9kZVJlc2V0UGVyZkNvdW50ZXJzIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmUvc3JjL3JlbmRlcjMvbmdfZGV2X21vZGVcIjtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogXCJGcmllbmRjaGF0XCIsXHJcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuXHR0ZW1wbGF0ZVVybDogXCIuL2ZyaWVuZGNoYXQuY29tcG9uZW50Lmh0bWxcIixcclxuXHRzdHlsZVVybHM6IFsnLi9mcmllbmRjaGF0LmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRnJpZW5kY2hhdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0QFZpZXdDaGlsZChcInJvb21MaXN0XCIpIHJvb21MaXN0OiBMaXN0VmlldztcclxuXHRAVmlld0NoaWxkKFwiYWN0aW9uQnV0dG9uXCIpIF9idXR0b25SZWY6IEFjdGlvbkJ1dHRvbkNvbXBvbmVudDtcclxuXHJcblx0cHVibGljIGRyYXdlcjogYm9vbGVhbjtcclxuXHRAVmlld0NoaWxkKFwiY2hpbGRCdXR0b24xXCIpIGNoaWxkQnV0dG9uMTogQ2hpbGRCdXR0b24xQ29tcG9uZW50O1xyXG5cdEBWaWV3Q2hpbGQoXCJjaGlsZEJ1dHRvbjJcIikgY2hpbGRCdXR0b24yOiBDaGlsZEJ1dHRvbjJDb21wb25lbnQ7XHJcblx0QFZpZXdDaGlsZChcImNoaWxkQnV0dG9uM1wiKSBjaGlsZEJ1dHRvbjM6IENoaWxkQnV0dG9uM0NvbXBvbmVudDtcclxuICAgIGN1cnJlbnREYXk6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0RGF0ZSgpO1xyXG4gICAgY3VycmVudE1vbnRoOiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgY3VycmVudFllYXI6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcclxuXHJcblx0XHJcblxyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcblx0XHRwcml2YXRlIGZpcmViYXNlU2VydmljZTogRmlyZWJhc2VTZXJ2aWNlKSB7XHJcblx0fVxyXG5cclxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHR9XHJcblxyXG5cdGdldFJvb21JY29uc3JjKGl0ZW0pOnN0cmluZ3tcclxuXHRcdHZhciByZXQ6c3RyaW5nID0gXCJcIjtcclxuXHRcdC8vIGNvbnNvbGUubG9nKGl0ZW0pO1xyXG5cdFx0aWYoaXRlbSE9bnVsbCl7XHJcblx0XHRcdGZvcih2YXIgcm9vbUlEIGluIGl0ZW0pIHtcclxuXHRcdFx0XHRyZXQgPSBpdGVtW3Jvb21JRF1bJ3Jvb21fdXNlcnMnXVt0aGlzLmZpcmViYXNlU2VydmljZS5hdXRodXNlci51aWRdWydyb29tSWNvbiddO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmV0O1xyXG5cdH1cclxuXHRnZXRSb29tVGl0bGUoaXRlbSk6c3RyaW5ne1xyXG5cdFx0dmFyIHJldDpzdHJpbmcgPSBcIlwiO1xyXG5cdFx0Zm9yKHZhciByb29tSUQgaW4gaXRlbSkge1xyXG5cdFx0XHRyZXQgPSBpdGVtW3Jvb21JRF1bJ3Jvb21fdXNlcnMnXVt0aGlzLmZpcmViYXNlU2VydmljZS5hdXRodXNlci51aWRdWyd0aXRsZSddO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJldDtcclxuXHR9XHJcblx0Z2V0Um9vbUxhc3RNZXNzYWdlKGl0ZW0pOnN0cmluZ3tcclxuXHRcdHZhciByZXQ6c3RyaW5nID0gXCJcIjtcclxuXHRcdHZhciBsYXN0X3RpbWVzdGFtcCA9IDA7XHJcblx0XHRmb3IodmFyIHJvb21JRCBpbiBpdGVtKXtcclxuXHRcdFx0dmFyIG1lc3NhZ2VzID0gaXRlbVtyb29tSURdWydtZXNzYWdlcyddO1xyXG5cdFx0XHRmb3IodmFyIG1lc3NhZ2VJRCBpbiBtZXNzYWdlcyl7XHJcblx0XHRcdFx0dmFyIG1lc3NhZ2VQYWNrID0gbWVzc2FnZXNbbWVzc2FnZUlEXTtcclxuXHRcdFx0XHRpZihtZXNzYWdlUGFja1sndGltZXN0YW1wJ11bJ3RpbWUnXT5sYXN0X3RpbWVzdGFtcCl7XHJcblx0XHRcdFx0XHRsYXN0X3RpbWVzdGFtcCA9IG1lc3NhZ2VQYWNrWyd0aW1lc3RhbXAnXVsndGltZSddO1xyXG5cdFx0XHRcdFx0cmV0ID0gbWVzc2FnZVBhY2tbJ21lc3NhZ2UnXTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXQ7XHJcblx0fVxyXG5cclxuXHRcclxuXHRvbkl0ZW1UYXAoYXJncykge1xyXG5cdFx0dGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRSb29tTWVzc2FnZUFycmF5ID0gW107XHJcblx0XHQvLyBjb25zb2xlLmxvZyh0aGlzLnJvb21MaXN0Lml0ZW1zW2FyZ3MuaW5kZXhdKTtcclxuXHRcdGZvcih2YXIgc2VsZWN0ZWRSb29tSUQgaW4gdGhpcy5yb29tTGlzdC5pdGVtc1thcmdzLmluZGV4XSl7XHJcblx0XHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnNlbGVjdGVkUm9vbUlEID0gc2VsZWN0ZWRSb29tSUQ7XHJcblx0XHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnNlbGVjdGVkUm9vbVRpdGxlID0gdGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0Um9vbXMoKVtzZWxlY3RlZFJvb21JRF1bJ3Jvb21fdXNlcnMnXVt0aGlzLmZpcmViYXNlU2VydmljZS5hdXRodXNlci51aWRdWyd0aXRsZSddO1xyXG5cdFx0XHR2YXIgbWVzc2FnZXMgPSB0aGlzLmZpcmViYXNlU2VydmljZS5nZXRSb29tcygpW3NlbGVjdGVkUm9vbUlEXVsnbWVzc2FnZXMnXVxyXG5cdFx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5zZWxlY3RlZFJvb21NZXNzYWdlQXJyYXkgPSB0aGlzLmZpcmViYXNlU2VydmljZS5qc29uVG9BcnJheShtZXNzYWdlcyk7XHJcblx0XHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnNvcnRNZXNzYWdlQXJyYXlXaXRoVGltZVN0YW1wKHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheSk7XHJcblx0XHR9XHJcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvY2hhdHJvb20nXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XHJcblx0fVxyXG5cdHB1YmxpYyBvblRhcCgpOiB2b2lkIHtcclxuXHRcdGlmICh0aGlzLmRyYXdlcikge1xyXG5cdFx0XHR0aGlzLmRyYXdlciA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMS5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcclxuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjIuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XHJcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24zLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdHRoaXMuZHJhd2VyID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjEuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XHJcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24yLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xyXG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMy5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG59Il19