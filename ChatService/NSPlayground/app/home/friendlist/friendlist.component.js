"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var list_view_1 = require("tns-core-modules/ui/list-view");
var child_button1_component_1 = require("../../buttons/child-button1/child-button1.component");
var child_button2_component_1 = require("../../buttons/child-button2/child-button2.component");
var child_button3_component_1 = require("../../buttons/child-button3/child-button3.component");
var friendchat_component_1 = require("../friendchat/friendchat.component");
var modal_component_1 = require("../../modal/modal.component");
var friend_list_service_1 = require("../friendchat/friend-list.service");
var friend_chat_service_1 = require("../friendchat/friend-chat.service");
var firebase_service_1 = require("../../services/firebase.service");
var router_1 = require("nativescript-angular/router");
var FriendlistComponent = /** @class */ (function () {
    function FriendlistComponent(friendListService, friendChatService, routerExtensions, firebaseService) {
        this.friendListService = friendListService;
        this.friendChatService = friendChatService;
        this.routerExtensions = routerExtensions;
        this.firebaseService = firebaseService;
    }
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
        var selelctedFriendID = this.friendListService.getSelectedFriendID();
        if (selelctedFriendID != null) {
            return this.firebaseService.getFriends()[selelctedFriendID]['profile']['profilePicsrc'];
        }
        else
            return null;
    };
    FriendlistComponent.prototype.getNameBySelectedFriendID = function () {
        var selelctedFriendID = this.friendListService.getSelectedFriendID();
        if (selelctedFriendID != null) {
            return this.firebaseService.getFriends()[selelctedFriendID]['profile']['name'];
        }
        else
            return null;
    };
    FriendlistComponent.prototype.ngOnInit = function () {
    };
    FriendlistComponent.prototype.onItemTap = function (args) {
        console.log(this.friendList.items[args.index]);
        for (var selelctedFriendID in this.friendList.items[args.index]) {
            this.friendListService.selectedFriendID = selelctedFriendID;
        }
        this.openModal();
    };
    FriendlistComponent.prototype.onTap = function (args) {
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
        this.makeRoom();
    };
    FriendlistComponent.prototype.makeRoom = function () {
        this.firebaseService.generateRoom(this.firebaseService.thisUser);
        var room_id = this.firebaseService.getGeneratedRoomID();
        var friend_id = this.friendListService.getSelectedFriendID();
        var friend = this.firebaseService.getFriends()[friend_id];
        this.firebaseService.pushFriendOnRoom(friend, room_id);
        this.friendChatService.selectedRoomID = room_id;
        this.gotoChatRoom();
    };
    FriendlistComponent.prototype.gotoChatRoom = function () {
        this.routerExtensions.navigate(['/chatroom'], { animated: false });
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
        __metadata("design:paramtypes", [friend_list_service_1.FriendListService,
            friend_chat_service_1.FriendChatService,
            router_1.RouterExtensions,
            firebase_service_1.FirebaseService])
    ], FriendlistComponent);
    return FriendlistComponent;
}());
exports.FriendlistComponent = FriendlistComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcmllbmRsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRTtBQUNwRSwyREFBeUQ7QUFDekQsK0ZBQTRGO0FBQzVGLCtGQUE0RjtBQUM1RiwrRkFBNEY7QUFDNUYsMkVBQXlFO0FBQ3pFLCtEQUE2RDtBQUM3RCx5RUFBc0U7QUFDdEUseUVBQXNFO0FBQ3RFLG9FQUFrRTtBQUVsRSxzREFBK0Q7QUFPL0Q7SUFRQyw2QkFBb0IsaUJBQW9DLEVBQy9DLGlCQUFvQyxFQUNwQyxnQkFBa0MsRUFDbEMsZUFBZ0M7UUFIckIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUMvQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO0lBR3pDLENBQUM7SUFFRCxvREFBc0IsR0FBdEIsVUFBdUIsSUFBSTtRQUMxQixJQUFJLEdBQUcsR0FBVSxFQUFFLENBQUM7UUFDcEIsR0FBRyxDQUFBLENBQUMsSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMxQixHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ1osQ0FBQztJQUNELDJDQUFhLEdBQWIsVUFBYyxJQUFJO1FBQ2pCLElBQUksR0FBRyxHQUFVLEVBQUUsQ0FBQztRQUNwQixHQUFHLENBQUEsQ0FBQyxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUNELE1B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QUM7SUFDOUI7UUFBMUIsZ0JBQVMsQ0FBQyxnQ0FBYyxDQUFDO2tDQUFRLGdDQUFjO3NEQUFDO0lBTnJDLG1CQUFtQjtRQU4vQixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7U0FDekMsQ0FBQzt5Q0FTc0MsdUNBQWlCO1lBQzVCLHVDQUFpQjtZQUNsQix5QkFBZ0I7WUFDakIsa0NBQWU7T0FYN0IsbUJBQW1CLENBeUcvQjtJQUFELDBCQUFDO0NBQUEsQUF6R0QsSUF5R0M7QUF6R1ksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgSW5wdXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTGlzdFZpZXcgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXZpZXdcIjtcbmltcG9ydCB7IENoaWxkQnV0dG9uMUNvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9idXR0b25zL2NoaWxkLWJ1dHRvbjEvY2hpbGQtYnV0dG9uMS5jb21wb25lbnRcIjtcbmltcG9ydCB7IENoaWxkQnV0dG9uMkNvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9idXR0b25zL2NoaWxkLWJ1dHRvbjIvY2hpbGQtYnV0dG9uMi5jb21wb25lbnRcIjtcbmltcG9ydCB7IENoaWxkQnV0dG9uM0NvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9idXR0b25zL2NoaWxkLWJ1dHRvbjMvY2hpbGQtYnV0dG9uMy5jb21wb25lbnRcIjtcbmltcG9ydCB7IEZyaWVuZGNoYXRDb21wb25lbnQgfSBmcm9tIFwiLi4vZnJpZW5kY2hhdC9mcmllbmRjaGF0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTW9kYWxDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vbW9kYWwvbW9kYWwuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBGcmllbmRMaXN0U2VydmljZSB9IGZyb20gXCIuLi9mcmllbmRjaGF0L2ZyaWVuZC1saXN0LnNlcnZpY2VcIjtcbmltcG9ydCB7IEZyaWVuZENoYXRTZXJ2aWNlIH0gZnJvbSBcIi4uL2ZyaWVuZGNoYXQvZnJpZW5kLWNoYXQuc2VydmljZVwiO1xuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2VcIjtcblxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogXCJGcmllbmRsaXN0XCIsXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHRlbXBsYXRlVXJsOiBcIi4vZnJpZW5kbGlzdC5jb21wb25lbnQuaHRtbFwiLFxuXHRzdHlsZVVybHM6IFsnLi9mcmllbmRsaXN0LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGcmllbmRsaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0QFZpZXdDaGlsZChcImZyaWVuZExpc3RcIikgZnJpZW5kTGlzdDogTGlzdFZpZXc7XG5cdEBWaWV3Q2hpbGQoXCJjaGlsZEJ1dHRvbjFcIikgY2hpbGRCdXR0b24xOiBDaGlsZEJ1dHRvbjFDb21wb25lbnQ7XG5cdEBWaWV3Q2hpbGQoXCJjaGlsZEJ1dHRvbjJcIikgY2hpbGRCdXR0b24yOiBDaGlsZEJ1dHRvbjJDb21wb25lbnQ7XG5cdEBWaWV3Q2hpbGQoXCJjaGlsZEJ1dHRvbjNcIikgY2hpbGRCdXR0b24zOiBDaGlsZEJ1dHRvbjNDb21wb25lbnQ7XG5cdEBWaWV3Q2hpbGQoXCJmcmllbmRjaGF0XCIpIGZyaWVuZGNoYXQ6IEZyaWVuZGNoYXRDb21wb25lbnQ7XG5cdEBWaWV3Q2hpbGQoTW9kYWxDb21wb25lbnQpIG1vZGFsOiBNb2RhbENvbXBvbmVudDtcblx0cHVibGljIGRyYXdlcjogYm9vbGVhbjtcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBmcmllbmRMaXN0U2VydmljZTogRnJpZW5kTGlzdFNlcnZpY2UsXG5cdFx0cHJpdmF0ZSBmcmllbmRDaGF0U2VydmljZTogRnJpZW5kQ2hhdFNlcnZpY2UsXG5cdFx0cHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuXHRcdHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2Vcblx0KSB7XG5cdFx0XG5cdH1cblxuXHRnZXRGcmllbmRQcm9maWxlUGljc3JjKGl0ZW0pOnN0cmluZ3tcblx0XHR2YXIgcmV0OnN0cmluZyA9IFwiXCI7XG5cdFx0Zm9yKHZhciBmcmllbmRJRCBpbiBpdGVtKSB7XG5cdFx0XHRyZXQgPSBpdGVtW2ZyaWVuZElEXVsncHJvZmlsZSddWydwcm9maWxlUGljc3JjJ107XHRcdFx0XG5cdFx0fVxuXHRcdHJldHVybiByZXQ7XG5cdH1cblx0Z2V0RnJpZW5kTmFtZShpdGVtKTpzdHJpbmd7XG5cdFx0dmFyIHJldDpzdHJpbmcgPSBcIlwiO1xuXHRcdGZvcih2YXIgZnJpZW5kSUQgaW4gaXRlbSkge1xuXHRcdFx0cmV0ID0gaXRlbVtmcmllbmRJRF1bJ3Byb2ZpbGUnXVsnbmFtZSddO1xuXHRcdH1cblx0XHRyZXR1cm4gcmV0O1xuXHR9XG5cblx0Z2V0UHJvZmlsZVBpY1NyY0J5U2VsZWN0ZWRGcmllbmRJRCgpe1xuXHRcdHZhciBzZWxlbGN0ZWRGcmllbmRJRCA9IHRoaXMuZnJpZW5kTGlzdFNlcnZpY2UuZ2V0U2VsZWN0ZWRGcmllbmRJRCgpO1xuXHRcdGlmKHNlbGVsY3RlZEZyaWVuZElEIT0gbnVsbCl7XG5cdFx0XHRyZXR1cm4gdGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0RnJpZW5kcygpW3NlbGVsY3RlZEZyaWVuZElEXVsncHJvZmlsZSddWydwcm9maWxlUGljc3JjJ107XHRcdFxuXHRcdH1cblx0XHRlbHNlIHJldHVybiBudWxsO1xuXHR9XG5cdGdldE5hbWVCeVNlbGVjdGVkRnJpZW5kSUQoKXtcblx0XHR2YXIgc2VsZWxjdGVkRnJpZW5kSUQgPSB0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLmdldFNlbGVjdGVkRnJpZW5kSUQoKTtcblx0XHRpZihzZWxlbGN0ZWRGcmllbmRJRCE9bnVsbCl7XG5cdFx0XHRyZXR1cm4gdGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0RnJpZW5kcygpW3NlbGVsY3RlZEZyaWVuZElEXVsncHJvZmlsZSddWyduYW1lJ107XG5cdFx0fVxuXHRcdGVsc2UgcmV0dXJuIG51bGw7XG5cdH1cblxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcblx0fVxuXG5cdG9uSXRlbVRhcChhcmdzKSB7XG5cdFx0Y29uc29sZS5sb2codGhpcy5mcmllbmRMaXN0Lml0ZW1zW2FyZ3MuaW5kZXhdKTtcblx0XHRmb3IodmFyIHNlbGVsY3RlZEZyaWVuZElEIGluIHRoaXMuZnJpZW5kTGlzdC5pdGVtc1thcmdzLmluZGV4XSl7XG5cdFx0XHR0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLnNlbGVjdGVkRnJpZW5kSUQgPSBzZWxlbGN0ZWRGcmllbmRJRDtcblx0XHRcdFxuXHRcdH1cblx0XHR0aGlzLm9wZW5Nb2RhbCgpO1xuXHR9XG5cdHB1YmxpYyBvblRhcChhcmdzKSB7XG5cdFx0aWYgKHRoaXMuZHJhd2VyKSB7XG5cdFx0XHR0aGlzLmRyYXdlciA9IGZhbHNlO1xuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjEuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMi5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24zLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRoaXMuZHJhd2VyID0gdHJ1ZTtcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24xLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjIuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMy5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcblx0XHR9XG5cdH1cblx0b25DaGF0VGFwKCk6IHZvaWQge1xuXHRcdHRoaXMubWFrZVJvb20oKTtcblx0fVxuXHRtYWtlUm9vbSgpOiB2b2lkIHtcblx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5nZW5lcmF0ZVJvb20odGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXIpO1xuXHRcdHZhciByb29tX2lkOnN0cmluZyA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldEdlbmVyYXRlZFJvb21JRCgpO1xuXHRcdHZhciBmcmllbmRfaWQ6c3RyaW5nID0gdGhpcy5mcmllbmRMaXN0U2VydmljZS5nZXRTZWxlY3RlZEZyaWVuZElEKCk7XG5cdFx0dmFyIGZyaWVuZDphbnkgPSB0aGlzLmZpcmViYXNlU2VydmljZS5nZXRGcmllbmRzKClbZnJpZW5kX2lkXTtcblx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5wdXNoRnJpZW5kT25Sb29tKGZyaWVuZCxyb29tX2lkKTtcblx0XHR0aGlzLmZyaWVuZENoYXRTZXJ2aWNlLnNlbGVjdGVkUm9vbUlEID0gcm9vbV9pZDtcblx0XHR0aGlzLmdvdG9DaGF0Um9vbSgpO1xuXHR9XG5cdGdvdG9DaGF0Um9vbSgpIHtcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvY2hhdHJvb20nXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XG5cdH1cblx0b25Nb2RhbFRhcCgpIHtcblx0XHRhbGVydChcImNsaWNrZWQgYW4gaXRlbVwiKTtcblx0fVxuXG5cdG9wZW5Nb2RhbCgpIHtcblx0XHR0aGlzLm1vZGFsLnNob3coKTtcblx0fVxuXG5cdGNsb3NlTW9kYWwoKSB7XG5cdFx0dGhpcy5tb2RhbC5oaWRlKCk7XG5cdH1cblxuXHRvbk9wZW5Nb2RhbCgpIHtcblx0XHRjb25zb2xlLmxvZyhcIm9wZW5lZCBtb2RhbFwiKTtcblx0fVxuXG5cdG9uQ2xvc2VNb2RhbCgpIHtcblx0XHRjb25zb2xlLmxvZyhcImNsb3NlZCBtb2RhbFwiKTtcblx0fVxufSJdfQ==