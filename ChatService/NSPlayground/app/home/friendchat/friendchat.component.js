"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var list_view_1 = require("tns-core-modules/ui/list-view");
var child_button1_component_1 = require("../../buttons/child-button1/child-button1.component");
var child_button2_component_1 = require("../../buttons/child-button2/child-button2.component");
var child_button3_component_1 = require("../../buttons/child-button3/child-button3.component");
var action_button_component_1 = require("../searchresult/action-button/action-button.component");
var router_1 = require("nativescript-angular/router");
var firebase_service_1 = require("../../services/firebase.service");
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
        for (var selectedRoomID in this.roomList.items[args.index]) {
            this.firebaseService.selectedRoomID = selectedRoomID;
            this.firebaseService.selectedRoomTitle = this.firebaseService.getRooms()[selectedRoomID]['title'];
            var messages = this.firebaseService.getRooms()[selectedRoomID]['messages'];
            this.firebaseService.selectedRoomMessageArray = this.firebaseService.jsonToArray(messages);
            this.firebaseService.sortMessageArrayWithTimeStamp(this.firebaseService.selectedRoomMessageArray);
            this.firebaseService.selectedRoomUsers = this.firebaseService.getRooms()[selectedRoomID]['room_users'];
            console.log(this.firebaseService.selectedRoomUsers);
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
            firebase_service_1.FirebaseService])
    ], FriendchatComponent);
    return FriendchatComponent;
}());
exports.FriendchatComponent = FriendchatComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kY2hhdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcmllbmRjaGF0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCwyREFBeUQ7QUFDekQsK0ZBQTRGO0FBQzVGLCtGQUE0RjtBQUM1RiwrRkFBNEY7QUFDNUYsaUdBQThGO0FBQzlGLHNEQUErRDtBQUMvRCxvRUFBa0U7QUFXbEU7SUFlQyw2QkFBb0IsZ0JBQWtDLEVBQzdDLGVBQWdDO1FBRHJCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDN0Msb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBUnRDLGVBQVUsR0FBVyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFDLGlCQUFZLEdBQVcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDakQsZ0JBQVcsR0FBVyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBT2xELENBQUM7SUFFRCxzQ0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUlELDRDQUFjLEdBQWQsVUFBZSxJQUFJO1FBQ2xCLElBQUksR0FBRyxHQUFVLEVBQUUsQ0FBQztRQUNwQixxQkFBcUI7UUFDckIsRUFBRSxDQUFBLENBQUMsSUFBSSxJQUFFLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDZCxHQUFHLENBQUEsQ0FBQyxJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQy9CLENBQUM7UUFDRixDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNaLENBQUM7SUFDRCwwQ0FBWSxHQUFaLFVBQWEsSUFBSTtRQUNoQixJQUFJLEdBQUcsR0FBVSxFQUFFLENBQUM7UUFDcEIsR0FBRyxDQUFBLENBQUMsSUFBSSxN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bSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IExpc3RWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC12aWV3XCI7XG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjFDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vYnV0dG9ucy9jaGlsZC1idXR0b24xL2NoaWxkLWJ1dHRvbjEuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjJDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vYnV0dG9ucy9jaGlsZC1idXR0b24yL2NoaWxkLWJ1dHRvbjIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjNDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vYnV0dG9ucy9jaGlsZC1idXR0b24zL2NoaWxkLWJ1dHRvbjMuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBBY3Rpb25CdXR0b25Db21wb25lbnQgfSBmcm9tIFwiLi4vc2VhcmNocmVzdWx0L2FjdGlvbi1idXR0b24vYWN0aW9uLWJ1dHRvbi5jb21wb25lbnRcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xuaW1wb3J0IHsgbmdEZXZNb2RlUmVzZXRQZXJmQ291bnRlcnMgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZS9zcmMvcmVuZGVyMy9uZ19kZXZfbW9kZVwiO1xuaW1wb3J0IHsgbGFzdCB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXIvc3JjL3V0aWxzL2NvbGxlY3Rpb25cIjtcblxuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6IFwiRnJpZW5kY2hhdFwiLFxuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHR0ZW1wbGF0ZVVybDogXCIuL2ZyaWVuZGNoYXQuY29tcG9uZW50Lmh0bWxcIixcblx0c3R5bGVVcmxzOiBbJy4vZnJpZW5kY2hhdC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRnJpZW5kY2hhdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cdEBWaWV3Q2hpbGQoXCJyb29tTGlzdFwiKSByb29tTGlzdDogTGlzdFZpZXc7XG5cdEBWaWV3Q2hpbGQoXCJhY3Rpb25CdXR0b25cIikgX2J1dHRvblJlZjogQWN0aW9uQnV0dG9uQ29tcG9uZW50O1xuXG5cdHB1YmxpYyBkcmF3ZXI6IGJvb2xlYW47XG5cdEBWaWV3Q2hpbGQoXCJjaGlsZEJ1dHRvbjFcIikgY2hpbGRCdXR0b24xOiBDaGlsZEJ1dHRvbjFDb21wb25lbnQ7XG5cdEBWaWV3Q2hpbGQoXCJjaGlsZEJ1dHRvbjJcIikgY2hpbGRCdXR0b24yOiBDaGlsZEJ1dHRvbjJDb21wb25lbnQ7XG5cdEBWaWV3Q2hpbGQoXCJjaGlsZEJ1dHRvbjNcIikgY2hpbGRCdXR0b24zOiBDaGlsZEJ1dHRvbjNDb21wb25lbnQ7XG4gICAgY3VycmVudERheTogbnVtYmVyID0gbmV3IERhdGUoKS5nZXREYXRlKCk7XG4gICAgY3VycmVudE1vbnRoOiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldE1vbnRoKCkgKyAxO1xuICAgIGN1cnJlbnRZZWFyOiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG5cblx0XG5cblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG5cdFx0cHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSkge1xuXHR9XG5cblx0bmdPbkluaXQoKTogdm9pZCB7XG5cdH1cblxuXG5cblx0Z2V0Um9vbUljb25zcmMoaXRlbSk6c3RyaW5ne1xuXHRcdHZhciByZXQ6c3RyaW5nID0gXCJcIjtcblx0XHQvLyBjb25zb2xlLmxvZyhpdGVtKTtcblx0XHRpZihpdGVtIT1udWxsKXtcblx0XHRcdGZvcih2YXIgcm9vbUlEIGluIGl0ZW0pIHtcblx0XHRcdFx0cmV0ID0gaXRlbVtyb29tSURdWydpY29uc3JjJ107XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXQ7XG5cdH1cblx0Z2V0Um9vbVRpdGxlKGl0ZW0pOnN0cmluZ3tcblx0XHR2YXIgcmV0OnN0cmluZyA9IFwiXCI7XG5cdFx0Zm9yKHZhciByb29tSUQgaW4gaXRlbSkge1xuXHRcdFx0cmV0ID0gaXRlbVtyb29tSURdWyd0aXRsZSddO1xuXHRcdH1cblx0XHRyZXR1cm4gcmV0O1xuXHR9XG5cdGdldFJvb21MYXN0TWVzc2FnZShpdGVtKTpzdHJpbmd7XG5cdFx0dmFyIHJldDpzdHJpbmcgPSBcIlwiO1xuXHRcdHZhciBsYXN0X3RpbWVzdGFtcCA9IDA7XG5cdFx0Zm9yKHZhciByb29tSUQgaW4gaXRlbSl7XG5cdFx0XHR2YXIgbWVzc2FnZXMgPSBpdGVtW3Jvb21JRF1bJ21lc3NhZ2VzJ107XG5cdFx0XHRmb3IodmFyIG1lc3NhZ2VJRCBpbiBtZXNzYWdlcyl7XG5cdFx0XHRcdHZhciBtZXNzYWdlUGFjayA9IG1lc3NhZ2VzW21lc3NhZ2VJRF07XG5cdFx0XHRcdGlmKG1lc3NhZ2VQYWNrWyd0aW1lc3RhbXAnXVsndGltZSddPmxhc3RfdGltZXN0YW1wKXtcblx0XHRcdFx0XHRsYXN0X3RpbWVzdGFtcCA9IG1lc3NhZ2VQYWNrWyd0aW1lc3RhbXAnXVsndGltZSddO1xuXHRcdFx0XHRcdHJldCA9IG1lc3NhZ2VQYWNrWydtZXNzYWdlJ107XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJldDtcblx0fVxuXG5cdG9uSXRlbVRhcChhcmdzKSB7XG5cdFx0Y29uc29sZS5sb2codGhpcy5yb29tTGlzdC5pdGVtc1thcmdzLmluZGV4XSk7XG5cdFx0Zm9yKHZhciBzZWxlY3RlZFJvb21JRCBpbiB0aGlzLnJvb21MaXN0Lml0ZW1zW2FyZ3MuaW5kZXhdKXtcblx0XHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnNlbGVjdGVkUm9vbUlEID0gc2VsZWN0ZWRSb29tSUQ7XG5cdFx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5zZWxlY3RlZFJvb21UaXRsZSA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldFJvb21zKClbc2VsZWN0ZWRSb29tSURdWyd0aXRsZSddO1xuXHRcdFx0dmFyIG1lc3NhZ2VzID0gdGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0Um9vbXMoKVtzZWxlY3RlZFJvb21JRF1bJ21lc3NhZ2VzJ11cblx0XHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheSA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmpzb25Ub0FycmF5KG1lc3NhZ2VzKTtcblx0XHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnNvcnRNZXNzYWdlQXJyYXlXaXRoVGltZVN0YW1wKHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheSk7XG5cdFx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5zZWxlY3RlZFJvb21Vc2VycyA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldFJvb21zKClbc2VsZWN0ZWRSb29tSURdWydyb29tX3VzZXJzJ107XG5cdFx0XHRjb25zb2xlLmxvZyh0aGlzLmZpcmViYXNlU2VydmljZS5zZWxlY3RlZFJvb21Vc2Vycyk7XG5cdFx0fVxuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9jaGF0cm9vbSddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcblx0fVxuXHRwdWJsaWMgb25UYXAoYXJncyk6IHZvaWQge1xuXHRcdGlmICh0aGlzLmRyYXdlcikge1xuXHRcdFx0dGhpcy5kcmF3ZXIgPSBmYWxzZTtcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24xLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjIuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMy5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLmRyYXdlciA9IHRydWU7XG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMS5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24yLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjMuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XG5cdFx0fVxuXHR9XG5cbn0iXX0=