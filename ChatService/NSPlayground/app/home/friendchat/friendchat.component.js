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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kY2hhdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcmllbmRjaGF0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCwyREFBeUQ7QUFDekQsK0ZBQTRGO0FBQzVGLCtGQUE0RjtBQUM1RiwrRkFBNEY7QUFDNUYsaUdBQThGO0FBQzlGLHNEQUErRDtBQUMvRCxvRUFBa0U7QUFVbEU7SUFlQyw2QkFBb0IsZ0JBQWtDLEVBQzdDLGVBQWdDO1FBRHJCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDN0Msb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBUnRDLGVBQVUsR0FBVyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFDLGlCQUFZLEdBQVcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDakQsZ0JBQVcsR0FBVyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBT2xELENBQUM7SUFFRCxzQ0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELDRDQUFjLEdBQWQsVUFBZSxJQUFJO1FBQ2xCLElBQUksR0FBRyxHQUFVLEVBQUUsQ0FBQztRQUNwQixxQkFBcUI7UUFDckIsRUFBRSxDQUFBLENBQUMsSUFBSSxJQUFFLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDZCxHQUFHLENBQUEsQ0FBQyxJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2pGLENBQUM7UUFDRixDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNaLENBQUM7SUFDRCwwQ0FBWSxHQUFaLFVBQWEsSUFB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QUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLENBQUM7SUFDRixDQUFDO0lBaEZzQjtRQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQztrQ0FBVyxvQkFBUTt5REFBQztJQUNmO1FBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDO2tDQUFhLCtDQUFxQjsyREFBQztJQUdsQztRQUExQixnQkFBUyxDQUFDLGNBQWMsQ0FBQztrQ0FBZSwrQ0FBcUI7NkRBQUM7SUFDcEM7UUFBMUIsZ0JBQVMsQ0FBQyxjQUFjLENBQUM7a0NBQWUsK0NBQXFCOzZEQUFDO0lBQ3BDO1FBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDO2tDQUFlLCtDQUFxQjs2REFBQztJQVBuRCxtQkFBbUI7UUFOL0IsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO1NBQ3pDLENBQUM7eUNBZ0JxQyx5QkFBZ0I7WUFDNUIsa0NBQWU7T0FoQjdCLG1CQUFtQixDQW1GL0I7SUFBRCwwQkFBQztDQUFBLEFBbkZELElBbUZDO0FBbkZZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBMaXN0VmlldyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3Qtdmlld1wiO1xyXG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjFDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vYnV0dG9ucy9jaGlsZC1idXR0b24xL2NoaWxkLWJ1dHRvbjEuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IENoaWxkQnV0dG9uMkNvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9idXR0b25zL2NoaWxkLWJ1dHRvbjIvY2hpbGQtYnV0dG9uMi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ2hpbGRCdXR0b24zQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL2J1dHRvbnMvY2hpbGQtYnV0dG9uMy9jaGlsZC1idXR0b24zLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBBY3Rpb25CdXR0b25Db21wb25lbnQgfSBmcm9tIFwiLi4vc2VhcmNocmVzdWx0L2FjdGlvbi1idXR0b24vYWN0aW9uLWJ1dHRvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgbmdEZXZNb2RlUmVzZXRQZXJmQ291bnRlcnMgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZS9zcmMvcmVuZGVyMy9uZ19kZXZfbW9kZVwiO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiBcIkZyaWVuZGNoYXRcIixcclxuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG5cdHRlbXBsYXRlVXJsOiBcIi4vZnJpZW5kY2hhdC5jb21wb25lbnQuaHRtbFwiLFxyXG5cdHN0eWxlVXJsczogWycuL2ZyaWVuZGNoYXQuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGcmllbmRjaGF0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRAVmlld0NoaWxkKFwicm9vbUxpc3RcIikgcm9vbUxpc3Q6IExpc3RWaWV3O1xyXG5cdEBWaWV3Q2hpbGQoXCJhY3Rpb25CdXR0b25cIikgX2J1dHRvblJlZjogQWN0aW9uQnV0dG9uQ29tcG9uZW50O1xyXG5cclxuXHRwdWJsaWMgZHJhd2VyOiBib29sZWFuO1xyXG5cdEBWaWV3Q2hpbGQoXCJjaGlsZEJ1dHRvbjFcIikgY2hpbGRCdXR0b24xOiBDaGlsZEJ1dHRvbjFDb21wb25lbnQ7XHJcblx0QFZpZXdDaGlsZChcImNoaWxkQnV0dG9uMlwiKSBjaGlsZEJ1dHRvbjI6IENoaWxkQnV0dG9uMkNvbXBvbmVudDtcclxuXHRAVmlld0NoaWxkKFwiY2hpbGRCdXR0b24zXCIpIGNoaWxkQnV0dG9uMzogQ2hpbGRCdXR0b24zQ29tcG9uZW50O1xyXG4gICAgY3VycmVudERheTogbnVtYmVyID0gbmV3IERhdGUoKS5nZXREYXRlKCk7XHJcbiAgICBjdXJyZW50TW9udGg6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSArIDE7XHJcbiAgICBjdXJyZW50WWVhcjogbnVtYmVyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xyXG5cclxuXHRcclxuXHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuXHRcdHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UpIHtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCk6IHZvaWQge1xyXG5cdH1cclxuXHJcblx0Z2V0Um9vbUljb25zcmMoaXRlbSk6c3RyaW5ne1xyXG5cdFx0dmFyIHJldDpzdHJpbmcgPSBcIlwiO1xyXG5cdFx0Ly8gY29uc29sZS5sb2coaXRlbSk7XHJcblx0XHRpZihpdGVtIT1udWxsKXtcclxuXHRcdFx0Zm9yKHZhciByb29tSUQgaW4gaXRlbSkge1xyXG5cdFx0XHRcdHJldCA9IGl0ZW1bcm9vbUlEXVsncm9vbV91c2VycyddW3RoaXMuZmlyZWJhc2VTZXJ2aWNlLmF1dGh1c2VyLnVpZF1bJ3Jvb21JY29uJ107XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXQ7XHJcblx0fVxyXG5cdGdldFJvb21UaXRsZShpdGVtKTpzdHJpbmd7XHJcblx0XHR2YXIgcmV0OnN0cmluZyA9IFwiXCI7XHJcblx0XHRmb3IodmFyIHJvb21JRCBpbiBpdGVtKSB7XHJcblx0XHRcdHJldCA9IGl0ZW1bcm9vbUlEXVsncm9vbV91c2VycyddW3RoaXMuZmlyZWJhc2VTZXJ2aWNlLmF1dGh1c2VyLnVpZF1bJ3RpdGxlJ107XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmV0O1xyXG5cdH1cclxuXHRnZXRSb29tTGFzdE1lc3NhZ2UoaXRlbSk6c3RyaW5ne1xyXG5cdFx0dmFyIHJldDpzdHJpbmcgPSBcIlwiO1xyXG5cdFx0dmFyIGxhc3RfdGltZXN0YW1wID0gMDtcclxuXHRcdGZvcih2YXIgcm9vbUlEIGluIGl0ZW0pe1xyXG5cdFx0XHR2YXIgbWVzc2FnZXMgPSBpdGVtW3Jvb21JRF1bJ21lc3NhZ2VzJ107XHJcblx0XHRcdGZvcih2YXIgbWVzc2FnZUlEIGluIG1lc3NhZ2VzKXtcclxuXHRcdFx0XHR2YXIgbWVzc2FnZVBhY2sgPSBtZXNzYWdlc1ttZXNzYWdlSURdO1xyXG5cdFx0XHRcdGlmKG1lc3NhZ2VQYWNrWyd0aW1lc3RhbXAnXVsndGltZSddPmxhc3RfdGltZXN0YW1wKXtcclxuXHRcdFx0XHRcdGxhc3RfdGltZXN0YW1wID0gbWVzc2FnZVBhY2tbJ3RpbWVzdGFtcCddWyd0aW1lJ107XHJcblx0XHRcdFx0XHRyZXQgPSBtZXNzYWdlUGFja1snbWVzc2FnZSddO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJldDtcclxuXHR9XHJcblxyXG5cdFxyXG5cdG9uSXRlbVRhcChhcmdzKSB7XHJcblx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5zZWxlY3RlZFJvb21NZXNzYWdlQXJyYXkgPSBbXTtcclxuXHRcdC8vIGNvbnNvbGUubG9nKHRoaXMucm9vbUxpc3QuaXRlbXNbYXJncy5pbmRleF0pO1xyXG5cdFx0Zm9yKHZhciBzZWxlY3RlZFJvb21JRCBpbiB0aGlzLnJvb21MaXN0Lml0ZW1zW2FyZ3MuaW5kZXhdKXtcclxuXHRcdFx0dGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRSb29tSUQgPSBzZWxlY3RlZFJvb21JRDtcclxuXHRcdFx0dGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRSb29tVGl0bGUgPSB0aGlzLmZpcmViYXNlU2VydmljZS5nZXRSb29tcygpW3NlbGVjdGVkUm9vbUlEXVsncm9vbV91c2VycyddW3RoaXMuZmlyZWJhc2VTZXJ2aWNlLmF1dGh1c2VyLnVpZF1bJ3RpdGxlJ107XHJcblx0XHRcdHZhciBtZXNzYWdlcyA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldFJvb21zKClbc2VsZWN0ZWRSb29tSURdWydtZXNzYWdlcyddXHJcblx0XHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheSA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmpzb25Ub0FycmF5KG1lc3NhZ2VzKTtcclxuXHRcdFx0dGhpcy5maXJlYmFzZVNlcnZpY2Uuc29ydE1lc3NhZ2VBcnJheVdpdGhUaW1lU3RhbXAodGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRSb29tTWVzc2FnZUFycmF5KTtcclxuXHRcdH1cclxuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9jaGF0cm9vbSddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcclxuXHR9XHJcblx0cHVibGljIG9uVGFwKCk6IHZvaWQge1xyXG5cdFx0aWYgKHRoaXMuZHJhd2VyKSB7XHJcblx0XHRcdHRoaXMuZHJhd2VyID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24xLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xyXG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMi5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcclxuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjMuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5kcmF3ZXIgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMS5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcclxuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjIuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XHJcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24zLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcbn0iXX0=