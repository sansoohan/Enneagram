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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kY2hhdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcmllbmRjaGF0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUM3RCwyREFBeUQ7QUFDekQsK0ZBQTRGO0FBQzVGLCtGQUE0RjtBQUM1RiwrRkFBNEY7QUFDNUYsaUdBQThGO0FBQzlGLHNEQUErRDtBQUMvRCxvRUFBa0U7QUFVbEU7SUFlQyw2QkFBb0IsZ0JBQWtDLEVBQzdDLGVBQWdDO1FBRHJCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDN0Msb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBUnRDLGVBQVUsR0FBVyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzFDLGlCQUFZLEdBQVcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDakQsZ0JBQVcsR0FBVyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBT2xELENBQUM7SUFFRCxzQ0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELDRDQUFjLEdBQWQsVUFBZSxJQUFJO1FBQ2xCLElBQUksR0FBRyxHQUFVLEVBQUUsQ0FBQztRQUNwQixxQkFBcUI7UUFDckIsRUFBRSxDQUFBLENBQUMsSUFBSSxJQUFFLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDZCxHQUFHLENBQUEsQ0FBQyxJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2pGLENBQUM7UUFDRixDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNaLENBQUM7SUFDRCwwQ0FBWSxHQUFaLFVBQWEsSUFB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QUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLENBQUM7SUFDRixDQUFDO0lBaEZzQjtRQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQztrQ0FBVyxvQkFBUTt5REFBQztJQUNmO1FBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDO2tDQUFhLCtDQUFxQjsyREFBQztJQUdsQztRQUExQixnQkFBUyxDQUFDLGNBQWMsQ0FBQztrQ0FBZSwrQ0FBcUI7NkRBQUM7SUFDcEM7UUFBMUIsZ0JBQVMsQ0FBQyxjQUFjLENBQUM7a0NBQWUsK0NBQXFCOzZEQUFDO0lBQ3BDO1FBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDO2tDQUFlLCtDQUFxQjs2REFBQztJQVBuRCxtQkFBbUI7UUFOL0IsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO1NBQ3pDLENBQUM7eUNBZ0JxQyx5QkFBZ0I7WUFDNUIsa0NBQWU7T0FoQjdCLG1CQUFtQixDQW1GL0I7SUFBRCwwQkFBQztDQUFBLEFBbkZELElBbUZDO0FBbkZZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTGlzdFZpZXcgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXZpZXdcIjtcbmltcG9ydCB7IENoaWxkQnV0dG9uMUNvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9idXR0b25zL2NoaWxkLWJ1dHRvbjEvY2hpbGQtYnV0dG9uMS5jb21wb25lbnRcIjtcbmltcG9ydCB7IENoaWxkQnV0dG9uMkNvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9idXR0b25zL2NoaWxkLWJ1dHRvbjIvY2hpbGQtYnV0dG9uMi5jb21wb25lbnRcIjtcbmltcG9ydCB7IENoaWxkQnV0dG9uM0NvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9idXR0b25zL2NoaWxkLWJ1dHRvbjMvY2hpbGQtYnV0dG9uMy5jb21wb25lbnRcIjtcbmltcG9ydCB7IEFjdGlvbkJ1dHRvbkNvbXBvbmVudCB9IGZyb20gXCIuLi9zZWFyY2hyZXN1bHQvYWN0aW9uLWJ1dHRvbi9hY3Rpb24tYnV0dG9uLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBuZ0Rldk1vZGVSZXNldFBlcmZDb3VudGVycyB9IGZyb20gXCJAYW5ndWxhci9jb3JlL3NyYy9yZW5kZXIzL25nX2Rldl9tb2RlXCI7XG5cblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiBcIkZyaWVuZGNoYXRcIixcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0dGVtcGxhdGVVcmw6IFwiLi9mcmllbmRjaGF0LmNvbXBvbmVudC5odG1sXCIsXG5cdHN0eWxlVXJsczogWycuL2ZyaWVuZGNoYXQuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZyaWVuZGNoYXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXHRAVmlld0NoaWxkKFwicm9vbUxpc3RcIikgcm9vbUxpc3Q6IExpc3RWaWV3O1xuXHRAVmlld0NoaWxkKFwiYWN0aW9uQnV0dG9uXCIpIF9idXR0b25SZWY6IEFjdGlvbkJ1dHRvbkNvbXBvbmVudDtcblxuXHRwdWJsaWMgZHJhd2VyOiBib29sZWFuO1xuXHRAVmlld0NoaWxkKFwiY2hpbGRCdXR0b24xXCIpIGNoaWxkQnV0dG9uMTogQ2hpbGRCdXR0b24xQ29tcG9uZW50O1xuXHRAVmlld0NoaWxkKFwiY2hpbGRCdXR0b24yXCIpIGNoaWxkQnV0dG9uMjogQ2hpbGRCdXR0b24yQ29tcG9uZW50O1xuXHRAVmlld0NoaWxkKFwiY2hpbGRCdXR0b24zXCIpIGNoaWxkQnV0dG9uMzogQ2hpbGRCdXR0b24zQ29tcG9uZW50O1xuICAgIGN1cnJlbnREYXk6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0RGF0ZSgpO1xuICAgIGN1cnJlbnRNb250aDogbnVtYmVyID0gbmV3IERhdGUoKS5nZXRNb250aCgpICsgMTtcbiAgICBjdXJyZW50WWVhcjogbnVtYmVyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpO1xuXG5cdFxuXG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuXHRcdHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UpIHtcblx0fVxuXG5cdG5nT25Jbml0KCk6IHZvaWQge1xuXHR9XG5cblx0Z2V0Um9vbUljb25zcmMoaXRlbSk6c3RyaW5ne1xuXHRcdHZhciByZXQ6c3RyaW5nID0gXCJcIjtcblx0XHQvLyBjb25zb2xlLmxvZyhpdGVtKTtcblx0XHRpZihpdGVtIT1udWxsKXtcblx0XHRcdGZvcih2YXIgcm9vbUlEIGluIGl0ZW0pIHtcblx0XHRcdFx0cmV0ID0gaXRlbVtyb29tSURdWydyb29tX3VzZXJzJ11bdGhpcy5maXJlYmFzZVNlcnZpY2UuYXV0aHVzZXIudWlkXVsncm9vbUljb24nXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJldDtcblx0fVxuXHRnZXRSb29tVGl0bGUoaXRlbSk6c3RyaW5ne1xuXHRcdHZhciByZXQ6c3RyaW5nID0gXCJcIjtcblx0XHRmb3IodmFyIHJvb21JRCBpbiBpdGVtKSB7XG5cdFx0XHRyZXQgPSBpdGVtW3Jvb21JRF1bJ3Jvb21fdXNlcnMnXVt0aGlzLmZpcmViYXNlU2VydmljZS5hdXRodXNlci51aWRdWyd0aXRsZSddO1xuXHRcdH1cblx0XHRyZXR1cm4gcmV0O1xuXHR9XG5cdGdldFJvb21MYXN0TWVzc2FnZShpdGVtKTpzdHJpbmd7XG5cdFx0dmFyIHJldDpzdHJpbmcgPSBcIlwiO1xuXHRcdHZhciBsYXN0X3RpbWVzdGFtcCA9IDA7XG5cdFx0Zm9yKHZhciByb29tSUQgaW4gaXRlbSl7XG5cdFx0XHR2YXIgbWVzc2FnZXMgPSBpdGVtW3Jvb21JRF1bJ21lc3NhZ2VzJ107XG5cdFx0XHRmb3IodmFyIG1lc3NhZ2VJRCBpbiBtZXNzYWdlcyl7XG5cdFx0XHRcdHZhciBtZXNzYWdlUGFjayA9IG1lc3NhZ2VzW21lc3NhZ2VJRF07XG5cdFx0XHRcdGlmKG1lc3NhZ2VQYWNrWyd0aW1lc3RhbXAnXVsndGltZSddPmxhc3RfdGltZXN0YW1wKXtcblx0XHRcdFx0XHRsYXN0X3RpbWVzdGFtcCA9IG1lc3NhZ2VQYWNrWyd0aW1lc3RhbXAnXVsndGltZSddO1xuXHRcdFx0XHRcdHJldCA9IG1lc3NhZ2VQYWNrWydtZXNzYWdlJ107XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJldDtcblx0fVxuXG5cdFxuXHRvbkl0ZW1UYXAoYXJncykge1xuXHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheSA9IFtdO1xuXHRcdC8vIGNvbnNvbGUubG9nKHRoaXMucm9vbUxpc3QuaXRlbXNbYXJncy5pbmRleF0pO1xuXHRcdGZvcih2YXIgc2VsZWN0ZWRSb29tSUQgaW4gdGhpcy5yb29tTGlzdC5pdGVtc1thcmdzLmluZGV4XSl7XG5cdFx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5zZWxlY3RlZFJvb21JRCA9IHNlbGVjdGVkUm9vbUlEO1xuXHRcdFx0dGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRSb29tVGl0bGUgPSB0aGlzLmZpcmViYXNlU2VydmljZS5nZXRSb29tcygpW3NlbGVjdGVkUm9vbUlEXVsncm9vbV91c2VycyddW3RoaXMuZmlyZWJhc2VTZXJ2aWNlLmF1dGh1c2VyLnVpZF1bJ3RpdGxlJ107XG5cdFx0XHR2YXIgbWVzc2FnZXMgPSB0aGlzLmZpcmViYXNlU2VydmljZS5nZXRSb29tcygpW3NlbGVjdGVkUm9vbUlEXVsnbWVzc2FnZXMnXVxuXHRcdFx0dGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRSb29tTWVzc2FnZUFycmF5ID0gdGhpcy5maXJlYmFzZVNlcnZpY2UuanNvblRvQXJyYXkobWVzc2FnZXMpO1xuXHRcdFx0dGhpcy5maXJlYmFzZVNlcnZpY2Uuc29ydE1lc3NhZ2VBcnJheVdpdGhUaW1lU3RhbXAodGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRSb29tTWVzc2FnZUFycmF5KTtcblx0XHR9XG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2NoYXRyb29tJ10sIHsgYW5pbWF0ZWQ6IGZhbHNlIH0pO1xuXHR9XG5cdHB1YmxpYyBvblRhcCgpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5kcmF3ZXIpIHtcblx0XHRcdHRoaXMuZHJhd2VyID0gZmFsc2U7XG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMS5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24yLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjMuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhpcy5kcmF3ZXIgPSB0cnVlO1xuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjEuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMi5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24zLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xuXHRcdH1cblx0fVxuXG59Il19