"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var room_model_1 = require("../friendchat/room.model");
var child_button1_component_1 = require("../../buttons/child-button1/child-button1.component");
var child_button2_component_1 = require("../../buttons/child-button2/child-button2.component");
var child_button3_component_1 = require("../../buttons/child-button3/child-button3.component");
var friendchat_component_1 = require("../friendchat/friendchat.component");
var modal_component_1 = require("../../modal/modal.component");
var friend_list_service_1 = require("../friendchat/friend-list.service");
var friend_chat_service_1 = require("../friendchat/friend-chat.service");
var router_1 = require("nativescript-angular/router");
var FriendlistComponent = /** @class */ (function () {
    function FriendlistComponent(friendListService, friendChatService, routerExtensions) {
        this.friendListService = friendListService;
        this.friendChatService = friendChatService;
        this.routerExtensions = routerExtensions;
    }
    FriendlistComponent.prototype.ngOnInit = function () {
    };
    FriendlistComponent.prototype.onItemTap = function (args) {
        this.friendListService.setSelectedFriend(this.friendListService.getFriends()[args.index]);
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
        this.gotoChatRoom();
    };
    FriendlistComponent.prototype.makeRoom = function () {
        var rooms = this.friendChatService.getRooms();
        var selectedFriend = this.friendListService.getSelectedFriend();
        for (var i = 0; i < rooms.length; i++) {
            if (rooms[i].title === selectedFriend.name) {
                this.selectedRoom = rooms[i];
                return;
            }
        }
        var newRoom = new room_model_1.Room();
        newRoom.id = friend_chat_service_1.FriendChatService.nextID;
        newRoom.icon = selectedFriend.profilePicsrc;
        newRoom.startDate = null;
        newRoom.endDate = null;
        newRoom.messages = [];
        newRoom.title = selectedFriend.name;
        newRoom.friends = [this.friendListService.thisUser.index, selectedFriend];
        this.friendChatService.addRoom(newRoom);
        this.selectedRoom = newRoom;
        friend_chat_service_1.FriendChatService.nextID++;
    };
    FriendlistComponent.prototype.gotoChatRoom = function () {
        this.friendChatService.setSelectedRoom(this.selectedRoom);
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
            router_1.RouterExtensions])
    ], FriendlistComponent);
    return FriendlistComponent;
}());
exports.FriendlistComponent = FriendlistComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcmllbmRsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRTtBQUVwRSx1REFBZ0Q7QUFFaEQsK0ZBQTRGO0FBQzVGLCtGQUE0RjtBQUM1RiwrRkFBNEY7QUFDNUYsMkVBQXlFO0FBQ3pFLCtEQUE2RDtBQUM3RCx5RUFBc0U7QUFDdEUseUVBQXNFO0FBR3RFLHNEQUErRDtBQU8vRDtJQVVDLDZCQUFvQixpQkFBb0MsRUFDL0MsaUJBQW9DLEVBQ3BDLGdCQUFrQztRQUZ2QixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQy9DLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUczQyxDQUFDO0lBRUQsc0NBQVEsR0FBUjtJQUNBLENBQUM7SUFFRCx1Q0FBUyxHQUFULFVBQVUsSUFBSTtRQUNiLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDMUYsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFDTSxtQ0FBSyxHQUFaLFVBQWEsSUFBSTtRQUNoQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENB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QixnQkFBUyxDQUFDLGNBQWMsQ0FBQztrQ0FBZSwrQ0FBcUI7NkRBQUM7SUFDcEM7UUFBMUIsZ0JBQVMsQ0FBQyxjQUFjLENBQUM7a0NBQWUsK0NBQXFCOzZEQUFDO0lBQ3BDO1FBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDO2tDQUFlLCtDQUFxQjs2REFBQztJQUN0QztRQUF4QixnQkFBUyxDQUFDLFlBQVksQ0FBQztrQ0FBYSwwQ0FBbUI7MkRBQUM7SUFFOUI7UUFBMUIsZ0JBQVMsQ0FBQyxnQ0FBYyxDQUFDO2tDQUFRLGdDQUFjO3NEQUFDO0lBUnJDLG1CQUFtQjtRQU4vQixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7U0FDekMsQ0FBQzt5Q0FXc0MsdUNBQWlCO1lBQzVCLHVDQUFpQjtZQUNsQix5QkFBZ0I7T0FaL0IsbUJBQW1CLENBc0YvQjtJQUFELDBCQUFDO0NBQUEsQUF0RkQsSUFzRkM7QUF0Rlksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgSW5wdXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgRnJpZW5kIH0gZnJvbSBcIi4uL2ZyaWVuZGNoYXQvRnJpZW5kLm1vZGVsXCI7XG5pbXBvcnQgeyBSb29tIH0gZnJvbSBcIi4uL2ZyaWVuZGNoYXQvcm9vbS5tb2RlbFwiO1xuaW1wb3J0IHsgRnJpZW5kTGlzdCB9IGZyb20gXCIuLi9mcmllbmRjaGF0L21vY2stcm9vbXNcIjtcbmltcG9ydCB7IENoaWxkQnV0dG9uMUNvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9idXR0b25zL2NoaWxkLWJ1dHRvbjEvY2hpbGQtYnV0dG9uMS5jb21wb25lbnRcIjtcbmltcG9ydCB7IENoaWxkQnV0dG9uMkNvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9idXR0b25zL2NoaWxkLWJ1dHRvbjIvY2hpbGQtYnV0dG9uMi5jb21wb25lbnRcIjtcbmltcG9ydCB7IENoaWxkQnV0dG9uM0NvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9idXR0b25zL2NoaWxkLWJ1dHRvbjMvY2hpbGQtYnV0dG9uMy5jb21wb25lbnRcIjtcbmltcG9ydCB7IEZyaWVuZGNoYXRDb21wb25lbnQgfSBmcm9tIFwiLi4vZnJpZW5kY2hhdC9mcmllbmRjaGF0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgTW9kYWxDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vbW9kYWwvbW9kYWwuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBGcmllbmRMaXN0U2VydmljZSB9IGZyb20gXCIuLi9mcmllbmRjaGF0L2ZyaWVuZC1saXN0LnNlcnZpY2VcIjtcbmltcG9ydCB7IEZyaWVuZENoYXRTZXJ2aWNlIH0gZnJvbSBcIi4uL2ZyaWVuZGNoYXQvZnJpZW5kLWNoYXQuc2VydmljZVwiO1xuaW1wb3J0IHsgTGlzdFZpZXcgfSBmcm9tIFwidWkvbGlzdC12aWV3XCI7XG5cbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6IFwiRnJpZW5kbGlzdFwiLFxuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHR0ZW1wbGF0ZVVybDogXCIuL2ZyaWVuZGxpc3QuY29tcG9uZW50Lmh0bWxcIixcblx0c3R5bGVVcmxzOiBbJy4vZnJpZW5kbGlzdC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRnJpZW5kbGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cdHB1YmxpYyBkcmF3ZXI6IGJvb2xlYW47XG5cdHNlbGVjdGVkUm9vbTogUm9vbTtcblx0QFZpZXdDaGlsZChcImNoaWxkQnV0dG9uMVwiKSBjaGlsZEJ1dHRvbjE6IENoaWxkQnV0dG9uMUNvbXBvbmVudDtcblx0QFZpZXdDaGlsZChcImNoaWxkQnV0dG9uMlwiKSBjaGlsZEJ1dHRvbjI6IENoaWxkQnV0dG9uMkNvbXBvbmVudDtcblx0QFZpZXdDaGlsZChcImNoaWxkQnV0dG9uM1wiKSBjaGlsZEJ1dHRvbjM6IENoaWxkQnV0dG9uM0NvbXBvbmVudDtcblx0QFZpZXdDaGlsZChcImZyaWVuZGNoYXRcIikgZnJpZW5kY2hhdDogRnJpZW5kY2hhdENvbXBvbmVudDtcblx0XG5cdEBWaWV3Q2hpbGQoTW9kYWxDb21wb25lbnQpIG1vZGFsOiBNb2RhbENvbXBvbmVudDtcblx0XG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgZnJpZW5kTGlzdFNlcnZpY2U6IEZyaWVuZExpc3RTZXJ2aWNlLFxuXHRcdHByaXZhdGUgZnJpZW5kQ2hhdFNlcnZpY2U6IEZyaWVuZENoYXRTZXJ2aWNlLFxuXHRcdHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcblx0KSB7XG5cdFx0XG5cdH1cblxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcblx0fVxuXG5cdG9uSXRlbVRhcChhcmdzKSB7XG5cdFx0dGhpcy5mcmllbmRMaXN0U2VydmljZS5zZXRTZWxlY3RlZEZyaWVuZCh0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLmdldEZyaWVuZHMoKVthcmdzLmluZGV4XSk7XG5cdFx0dGhpcy5vcGVuTW9kYWwoKTtcblx0fVxuXHRwdWJsaWMgb25UYXAoYXJncykge1xuXHRcdGlmICh0aGlzLmRyYXdlcikge1xuXHRcdFx0dGhpcy5kcmF3ZXIgPSBmYWxzZTtcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24xLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjIuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMy5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLmRyYXdlciA9IHRydWU7XG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMS5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24yLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjMuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XG5cdFx0fVxuXHR9XG5cdG9uQ2hhdFRhcCgpOiB2b2lkIHtcblx0XHR0aGlzLm1ha2VSb29tKCk7XG5cdFx0dGhpcy5nb3RvQ2hhdFJvb20oKTtcblx0fVxuXHRtYWtlUm9vbSgpOiB2b2lkIHtcblx0XHR2YXIgcm9vbXMgPSB0aGlzLmZyaWVuZENoYXRTZXJ2aWNlLmdldFJvb21zKCk7XG5cdFx0dmFyIHNlbGVjdGVkRnJpZW5kID0gdGhpcy5mcmllbmRMaXN0U2VydmljZS5nZXRTZWxlY3RlZEZyaWVuZCgpO1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcm9vbXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChyb29tc1tpXS50aXRsZSA9PT0gc2VsZWN0ZWRGcmllbmQubmFtZSkge1xuXHRcdFx0XHR0aGlzLnNlbGVjdGVkUm9vbSA9IHJvb21zW2ldO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHZhciBuZXdSb29tID0gbmV3IFJvb20oKTtcblx0XHRuZXdSb29tLmlkID0gRnJpZW5kQ2hhdFNlcnZpY2UubmV4dElEO1xuXHRcdG5ld1Jvb20uaWNvbiA9IHNlbGVjdGVkRnJpZW5kLnByb2ZpbGVQaWNzcmM7XG5cdFx0bmV3Um9vbS5zdGFydERhdGUgPSBudWxsO1xuXHRcdG5ld1Jvb20uZW5kRGF0ZSA9IG51bGw7XG5cdFx0bmV3Um9vbS5tZXNzYWdlcyA9IFtdO1xuXHRcdG5ld1Jvb20udGl0bGUgPSBzZWxlY3RlZEZyaWVuZC5uYW1lO1xuXHRcdG5ld1Jvb20uZnJpZW5kcyA9IFt0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLnRoaXNVc2VyLmluZGV4LCBzZWxlY3RlZEZyaWVuZF07XG5cdFx0dGhpcy5mcmllbmRDaGF0U2VydmljZS5hZGRSb29tKG5ld1Jvb20pO1xuXHRcdHRoaXMuc2VsZWN0ZWRSb29tID0gbmV3Um9vbTtcblx0XHRGcmllbmRDaGF0U2VydmljZS5uZXh0SUQrKztcblx0fVxuXHRnb3RvQ2hhdFJvb20oKSB7XG5cdFx0dGhpcy5mcmllbmRDaGF0U2VydmljZS5zZXRTZWxlY3RlZFJvb20odGhpcy5zZWxlY3RlZFJvb20pO1xuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9jaGF0cm9vbSddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcblx0fVxuXHRvbk1vZGFsVGFwKCkge1xuXHRcdGFsZXJ0KFwiY2xpY2tlZCBhbiBpdGVtXCIpO1xuXHR9XG5cblx0b3Blbk1vZGFsKCkge1xuXHRcdHRoaXMubW9kYWwuc2hvdygpO1xuXHR9XG5cblx0Y2xvc2VNb2RhbCgpIHtcblx0XHR0aGlzLm1vZGFsLmhpZGUoKTtcblx0fVxuXG5cdG9uT3Blbk1vZGFsKCkge1xuXHRcdGNvbnNvbGUubG9nKFwib3BlbmVkIG1vZGFsXCIpO1xuXHR9XG5cblx0b25DbG9zZU1vZGFsKCkge1xuXHRcdGNvbnNvbGUubG9nKFwiY2xvc2VkIG1vZGFsXCIpO1xuXHR9XG59Il19