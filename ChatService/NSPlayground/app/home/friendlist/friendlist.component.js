"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var list_view_1 = require("tns-core-modules/ui/list-view");
var child_button1_component_1 = require("../../buttons/child-button1/child-button1.component");
var child_button2_component_1 = require("../../buttons/child-button2/child-button2.component");
var child_button3_component_1 = require("../../buttons/child-button3/child-button3.component");
var float_button_component_1 = require("../../buttons/float-button/float-button.component");
var friendchat_component_1 = require("../friendchat/friendchat.component");
var modal_component_1 = require("../../modal/modal.component");
var firebase_service_1 = require("../../services/firebase.service");
var router_1 = require("nativescript-angular/router");
var FriendlistComponent = /** @class */ (function () {
    function FriendlistComponent(routerExtensions, firebaseService) {
        this.routerExtensions = routerExtensions;
        this.firebaseService = firebaseService;
    }
    FriendlistComponent.prototype.onChildButton1Tap = function () {
    };
    FriendlistComponent.prototype.getFriendProfilePicsrc = function (item) {
        var ret = "";
        for (var friendID in item) {
            ret = item[friendID]['profile']['profilePicsrc'];
        }
        return ret;
    };
    FriendlistComponent.prototype.getFriendName = function (item) {
        var ret = "";
        for (var friendID in item) {
            ret = item[friendID]['profile']['name'];
        }
        return ret;
    };
    FriendlistComponent.prototype.getProfilePicSrcBySelectedFriendID = function () {
        var selectedFriendID = this.firebaseService.selectedFriendID;
        if (selectedFriendID != null) {
            return this.firebaseService.getFriends()[selectedFriendID]['profile']['profilePicsrc'];
        }
        else
            return null;
    };
    FriendlistComponent.prototype.getNameBySelectedFriendID = function () {
        var selectedFriendID = this.firebaseService.selectedFriendID;
        if (selectedFriendID != null) {
            return this.firebaseService.getFriends()[selectedFriendID]['profile']['name'];
        }
        else
            return null;
    };
    FriendlistComponent.prototype.ngOnInit = function () {
    };
    FriendlistComponent.prototype.onItemTap = function (args) {
        console.log(this.friendList.items[args.index]);
        for (var selelctedFriendID in this.friendList.items[args.index]) {
            this.firebaseService.selectedFriendID = selelctedFriendID;
        }
        this.openModal();
    };
    FriendlistComponent.prototype.onTap = function () {
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
    FriendlistComponent.prototype.onChatTap = function () {
        var selectedFriend = {};
        selectedFriend[this.firebaseService.selectedFriendID] = this.firebaseService.getFriends()[this.firebaseService.selectedFriendID];
        this.firebaseService.generateRoomWithSelectedFriends(this.firebaseService.thisUser, selectedFriend);
        this.routerExtensions.navigate(['/chatroom'], { animated: false });
        this.closeModal();
        this._buttonRef.makeArrow();
    };
    FriendlistComponent.prototype.onModalTap = function () {
        alert("clicked an item");
    };
    FriendlistComponent.prototype.openModal = function () {
        this.modal.show();
    };
    FriendlistComponent.prototype.closeModal = function () {
        this.modal.hide();
    };
    FriendlistComponent.prototype.onHomeTap = function () {
        this.modal.hide();
        this.firebaseService.get_user_posts(this.firebaseService.selectedFriendID);
        this.routerExtensions.navigate(['/searchresult'], { animated: false });
        this._buttonRef.makeArrow();
    };
    FriendlistComponent.prototype.onOpenModal = function () {
        console.log("opened modal");
    };
    FriendlistComponent.prototype.onCloseModal = function () {
        console.log("closed modal");
    };
    __decorate([
        core_1.ViewChild("friendList"),
        __metadata("design:type", list_view_1.ListView)
    ], FriendlistComponent.prototype, "friendList", void 0);
    __decorate([
        core_1.ViewChild("childButton1"),
        __metadata("design:type", child_button1_component_1.ChildButton1Component)
    ], FriendlistComponent.prototype, "childButton1", void 0);
    __decorate([
        core_1.ViewChild("childButton2"),
        __metadata("design:type", child_button2_component_1.ChildButton2Component)
    ], FriendlistComponent.prototype, "childButton2", void 0);
    __decorate([
        core_1.ViewChild("childButton3"),
        __metadata("design:type", child_button3_component_1.ChildButton3Component)
    ], FriendlistComponent.prototype, "childButton3", void 0);
    __decorate([
        core_1.ViewChild("floatButton"),
        __metadata("design:type", float_button_component_1.FloatButtonComponent)
    ], FriendlistComponent.prototype, "floatButton", void 0);
    __decorate([
        core_1.ViewChild("friendchat"),
        __metadata("design:type", friendchat_component_1.FriendchatComponent)
    ], FriendlistComponent.prototype, "friendchat", void 0);
    __decorate([
        core_1.ViewChild(modal_component_1.ModalComponent),
        __metadata("design:type", modal_component_1.ModalComponent)
    ], FriendlistComponent.prototype, "modal", void 0);
    FriendlistComponent = __decorate([
        core_1.Component({
            selector: "Friendlist",
            moduleId: module.id,
            templateUrl: "./friendlist.component.html",
            styleUrls: ['./friendlist.component.css']
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            firebase_service_1.FirebaseService])
    ], FriendlistComponent);
    return FriendlistComponent;
}());
exports.FriendlistComponent = FriendlistComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcmllbmRsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRTtBQUNwRSwyREFBeUQ7QUFDekQsK0ZBQTRGO0FBQzVGLCtGQUE0RjtBQUM1RiwrRkFBNEY7QUFDNUYsNEZBQXlGO0FBQ3pGLDJFQUF5RTtBQUN6RSwrREFBNkQ7QUFHN0Qsb0VBQWtFO0FBRWxFLHNEQUErRDtBQU8vRDtJQVVDLDZCQUNTLGdCQUFrQyxFQUNsQyxlQUFnQztRQURoQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUd6QyxDQUFDO0lBQ0QsK0NBQWlCLEdBQWpCO0lBRUEsQ0FBQztJQUVELG9EQUFzQixHQUF0QixVQUF1QixJQUFJO1FBQzFCLElBQUksR0FBRyxHQUFVLEVBQUUsQ0FBQztRQUNwQixHQUFHLENBQUEsQ0FBQyxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDWixDQUFDO0lBQ0QsMkNBQWEsR0FBYixVQUFjLElBQUk7UUFDakIsSUFBSSxHQUFHLEdBQVUsRUFBRSxDQUFDO1FBQ3BCLEdBQUcsQ0FBQSxDQUFDLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNaLENBQUM7SUFFRCxnRUFBa0MsR0FBbEM7UUFDQyxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FB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O0lBQzFDO1FBQXhCLGdCQUFTLENBQUMsWUFBWSxDQUFDO2tDQUFhLDBDQUFtQjsyREFBQztJQUM5QjtRQUExQixnQkFBUyxDQUFDLGdDQUFjLENBQUM7a0NBQVEsZ0NBQWM7c0RBQUM7SUFQckMsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztTQUN6QyxDQUFDO3lDQVkwQix5QkFBZ0I7WUFDakIsa0NBQWU7T0FaN0IsbUJBQW1CLENBNEcvQjtJQUFELDBCQUFDO0NBQUEsQUE1R0QsSUE0R0M7QUE1R1ksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgSW5wdXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTGlzdFZpZXcgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXZpZXdcIjtcbmltcG9ydCB7IENoaWxkQnV0dG9uMUNvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9idXR0b25zL2NoaWxkLWJ1dHRvbjEvY2hpbGQtYnV0dG9uMS5jb21wb25lbnRcIjtcbmltcG9ydCB7IENoaWxkQnV0dG9uMkNvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9idXR0b25zL2NoaWxkLWJ1dHRvbjIvY2hpbGQtYnV0dG9uMi5jb21wb25lbnRcIjtcbmltcG9ydCB7IENoaWxkQnV0dG9uM0NvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9idXR0b25zL2NoaWxkLWJ1dHRvbjMvY2hpbGQtYnV0dG9uMy5jb21wb25lbnRcIjtcbmltcG9ydCB7IEZsb2F0QnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL2J1dHRvbnMvZmxvYXQtYnV0dG9uL2Zsb2F0LWJ1dHRvbi5jb21wb25lbnRcIjtcbmltcG9ydCB7IEZyaWVuZGNoYXRDb21wb25lbnQgfSBmcm9tIFwiLi4vZnJpZW5kY2hhdC9mcmllbmRjaGF0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTW9kYWxDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vbW9kYWwvbW9kYWwuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBBY3Rpb25CdXR0b25Db21wb25lbnQgfSBmcm9tIFwiLi4vc2VhcmNocmVzdWx0L2FjdGlvbi1idXR0b24vYWN0aW9uLWJ1dHRvbi5jb21wb25lbnRcIjtcblxuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2VcIjtcblxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogXCJGcmllbmRsaXN0XCIsXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHRlbXBsYXRlVXJsOiBcIi4vZnJpZW5kbGlzdC5jb21wb25lbnQuaHRtbFwiLFxuXHRzdHlsZVVybHM6IFsnLi9mcmllbmRsaXN0LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGcmllbmRsaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0QFZpZXdDaGlsZChcImZyaWVuZExpc3RcIikgZnJpZW5kTGlzdDogTGlzdFZpZXc7XG5cdEBWaWV3Q2hpbGQoXCJjaGlsZEJ1dHRvbjFcIikgY2hpbGRCdXR0b24xOiBDaGlsZEJ1dHRvbjFDb21wb25lbnQ7XG5cdEBWaWV3Q2hpbGQoXCJjaGlsZEJ1dHRvbjJcIikgY2hpbGRCdXR0b24yOiBDaGlsZEJ1dHRvbjJDb21wb25lbnQ7XG5cdEBWaWV3Q2hpbGQoXCJjaGlsZEJ1dHRvbjNcIikgY2hpbGRCdXR0b24zOiBDaGlsZEJ1dHRvbjNDb21wb25lbnQ7XG5cdEBWaWV3Q2hpbGQoXCJmbG9hdEJ1dHRvblwiKSBwdWJsaWMgZmxvYXRCdXR0b246IEZsb2F0QnV0dG9uQ29tcG9uZW50O1xuXHRAVmlld0NoaWxkKFwiZnJpZW5kY2hhdFwiKSBmcmllbmRjaGF0OiBGcmllbmRjaGF0Q29tcG9uZW50O1xuXHRAVmlld0NoaWxkKE1vZGFsQ29tcG9uZW50KSBtb2RhbDogTW9kYWxDb21wb25lbnQ7XG5cdHByaXZhdGUgX2J1dHRvblJlZjogQWN0aW9uQnV0dG9uQ29tcG9uZW50O1xuXHRwdWJsaWMgZHJhd2VyOiBib29sZWFuO1xuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG5cdFx0cHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZVxuXHQpIHtcblx0XHRcblx0fVxuXHRvbkNoaWxkQnV0dG9uMVRhcCgpe1xuXG5cdH1cblxuXHRnZXRGcmllbmRQcm9maWxlUGljc3JjKGl0ZW0pOnN0cmluZ3tcblx0XHR2YXIgcmV0OnN0cmluZyA9IFwiXCI7XG5cdFx0Zm9yKHZhciBmcmllbmRJRCBpbiBpdGVtKSB7XG5cdFx0XHRyZXQgPSBpdGVtW2ZyaWVuZElEXVsncHJvZmlsZSddWydwcm9maWxlUGljc3JjJ107XHRcdFx0XG5cdFx0fVxuXHRcdHJldHVybiByZXQ7XG5cdH1cblx0Z2V0RnJpZW5kTmFtZShpdGVtKTpzdHJpbmd7XG5cdFx0dmFyIHJldDpzdHJpbmcgPSBcIlwiO1xuXHRcdGZvcih2YXIgZnJpZW5kSUQgaW4gaXRlbSkge1xuXHRcdFx0cmV0ID0gaXRlbVtmcmllbmRJRF1bJ3Byb2ZpbGUnXVsnbmFtZSddO1xuXHRcdH1cblx0XHRyZXR1cm4gcmV0O1xuXHR9XG5cblx0Z2V0UHJvZmlsZVBpY1NyY0J5U2VsZWN0ZWRGcmllbmRJRCgpe1xuXHRcdHZhciBzZWxlY3RlZEZyaWVuZElEID0gdGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRGcmllbmRJRDtcblx0XHRpZihzZWxlY3RlZEZyaWVuZElEIT0gbnVsbCl7XG5cdFx0XHRyZXR1cm4gdGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0RnJpZW5kcygpW3NlbGVjdGVkRnJpZW5kSURdWydwcm9maWxlJ11bJ3Byb2ZpbGVQaWNzcmMnXTtcdFx0XG5cdFx0fVxuXHRcdGVsc2UgcmV0dXJuIG51bGw7XG5cdH1cblx0Z2V0TmFtZUJ5U2VsZWN0ZWRGcmllbmRJRCgpe1xuXHRcdHZhciBzZWxlY3RlZEZyaWVuZElEID0gdGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRGcmllbmRJRDtcblx0XHRpZihzZWxlY3RlZEZyaWVuZElEIT1udWxsKXtcblx0XHRcdHJldHVybiB0aGlzLmZpcmViYXNlU2VydmljZS5nZXRGcmllbmRzKClbc2VsZWN0ZWRGcmllbmRJRF1bJ3Byb2ZpbGUnXVsnbmFtZSddO1xuXHRcdH1cblx0XHRlbHNlIHJldHVybiBudWxsO1xuXHR9XG5cblx0bmdPbkluaXQoKTogdm9pZCB7XG5cdH1cblxuXHRvbkl0ZW1UYXAoYXJncykge1xuXHRcdGNvbnNvbGUubG9nKHRoaXMuZnJpZW5kTGlzdC5pdGVtc1thcmdzLmluZGV4XSk7XG5cdFx0Zm9yKHZhciBzZWxlbGN0ZWRGcmllbmRJRCBpbiB0aGlzLmZyaWVuZExpc3QuaXRlbXNbYXJncy5pbmRleF0pe1xuXHRcdFx0dGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRGcmllbmRJRCA9IHNlbGVsY3RlZEZyaWVuZElEO1xuXHRcdH1cblx0XHR0aGlzLm9wZW5Nb2RhbCgpO1xuXHR9XG5cdHB1YmxpYyBvblRhcCgpIHtcblx0XHRpZiAodGhpcy5kcmF3ZXIpIHtcblx0XHRcdHRoaXMuZHJhd2VyID0gZmFsc2U7XG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMS5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24yLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjMuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhpcy5kcmF3ZXIgPSB0cnVlO1xuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjEuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMi5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24zLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xuXHRcdH1cblx0fVxuXHRvbkNoYXRUYXAoKTogdm9pZCB7XG5cdFx0dmFyIHNlbGVjdGVkRnJpZW5kID0ge307XG5cdFx0c2VsZWN0ZWRGcmllbmRbdGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRGcmllbmRJRF0gPSB0aGlzLmZpcmViYXNlU2VydmljZS5nZXRGcmllbmRzKClbdGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRGcmllbmRJRF07XG5cdFx0dGhpcy5maXJlYmFzZVNlcnZpY2UuZ2VuZXJhdGVSb29tV2l0aFNlbGVjdGVkRnJpZW5kcyh0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlciwgc2VsZWN0ZWRGcmllbmQpO1xuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9jaGF0cm9vbSddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcblx0XHR0aGlzLmNsb3NlTW9kYWwoKTtcblx0XHR0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XG5cdH1cblx0b25Nb2RhbFRhcCgpIHtcblx0XHRhbGVydChcImNsaWNrZWQgYW4gaXRlbVwiKTtcblx0fVxuXG5cdG9wZW5Nb2RhbCgpIHtcblx0XHR0aGlzLm1vZGFsLnNob3coKTtcblx0fVxuXG5cdGNsb3NlTW9kYWwoKSB7XG5cdFx0dGhpcy5tb2RhbC5oaWRlKCk7XG5cdH1cblxuXHRvbkhvbWVUYXAoKXtcblx0XHR0aGlzLm1vZGFsLmhpZGUoKTtcblx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5nZXRfdXNlcl9wb3N0cyh0aGlzLmZpcmViYXNlU2VydmljZS5zZWxlY3RlZEZyaWVuZElEKTtcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvc2VhcmNocmVzdWx0J10sIHsgYW5pbWF0ZWQ6IGZhbHNlIH0pO1xuXHRcdHRoaXMuX2J1dHRvblJlZi5tYWtlQXJyb3coKTtcblx0fVxuXG5cdG9uT3Blbk1vZGFsKCkge1xuXHRcdGNvbnNvbGUubG9nKFwib3BlbmVkIG1vZGFsXCIpO1xuXHR9XG5cblx0b25DbG9zZU1vZGFsKCkge1xuXHRcdGNvbnNvbGUubG9nKFwiY2xvc2VkIG1vZGFsXCIpO1xuXHR9XG59Il19