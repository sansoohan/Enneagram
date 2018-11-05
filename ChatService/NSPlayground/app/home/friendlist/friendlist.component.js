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
var firebase_service_1 = require("../../services/firebase.service");
var router_1 = require("nativescript-angular/router");
var FriendlistComponent = /** @class */ (function () {
    function FriendlistComponent(friendListService, routerExtensions, firebaseService) {
        this.friendListService = friendListService;
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
        var selectedFriendID = this.friendListService.selectedFriendID;
        if (selectedFriendID != null) {
            return this.firebaseService.getFriends()[selectedFriendID]['profile']['profilePicsrc'];
        }
        else
            return null;
    };
    FriendlistComponent.prototype.getNameBySelectedFriendID = function () {
        var selectedFriendID = this.friendListService.selectedFriendID;
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
        this.firebaseService.selectedRoomID = room_id;
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
            router_1.RouterExtensions,
            firebase_service_1.FirebaseService])
    ], FriendlistComponent);
    return FriendlistComponent;
}());
exports.FriendlistComponent = FriendlistComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcmllbmRsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRTtBQUNwRSwyREFBeUQ7QUFDekQsK0ZBQTRGO0FBQzVGLCtGQUE0RjtBQUM1RiwrRkFBNEY7QUFDNUYsMkVBQXlFO0FBQ3pFLCtEQUE2RDtBQUM3RCx5RUFBc0U7QUFDdEUsb0VBQWtFO0FBRWxFLHNEQUErRDtBQU8vRDtJQVFDLDZCQUFvQixpQkFBb0MsRUFDL0MsZ0JBQWtDLEVBQ2xDLGVBQWdDO1FBRnJCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDL0MscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFHekMsQ0FBQztJQUVELG9EQUFzQixHQUF0QixVQUF1QixJQUFJO1FBQzFCLElBQUksR0FBRyxHQUFVLEVBQUUsQ0FBQztRQUNwQixHQUFHLENBQUEsQ0FBQyxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDWixDQUFDO0lBQ0QsMkNBQWEsR0FBYixVQUFjLElBQUk7UUFDakIsSUFBSSxHQUFHLEdBQVUsRUFBRSxDQUFDO1FBQ3BCLEdBQUcsQ0FBQSxDQUFDLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNaLENBQUM7SUFFRCxnRUFBa0MsR0FBbEM7UUFDQyxJQUFJLGdC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Ti9CLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztTQUN6QyxDQUFDO3lDQVNzQyx1Q0FBaUI7WUFDN0IseUJBQWdCO1lBQ2pCLGtDQUFlO09BVjdCLG1CQUFtQixDQXdHL0I7SUFBRCwwQkFBQztDQUFBLEFBeEdELElBd0dDO0FBeEdZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIElucHV0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IExpc3RWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvbGlzdC12aWV3XCI7XG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjFDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vYnV0dG9ucy9jaGlsZC1idXR0b24xL2NoaWxkLWJ1dHRvbjEuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjJDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vYnV0dG9ucy9jaGlsZC1idXR0b24yL2NoaWxkLWJ1dHRvbjIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjNDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vYnV0dG9ucy9jaGlsZC1idXR0b24zL2NoaWxkLWJ1dHRvbjMuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBGcmllbmRjaGF0Q29tcG9uZW50IH0gZnJvbSBcIi4uL2ZyaWVuZGNoYXQvZnJpZW5kY2hhdC5jb21wb25lbnRcIjtcbmltcG9ydCB7IE1vZGFsQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL21vZGFsL21vZGFsLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgRnJpZW5kTGlzdFNlcnZpY2UgfSBmcm9tIFwiLi4vZnJpZW5kY2hhdC9mcmllbmQtbGlzdC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xuXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiBcIkZyaWVuZGxpc3RcIixcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0dGVtcGxhdGVVcmw6IFwiLi9mcmllbmRsaXN0LmNvbXBvbmVudC5odG1sXCIsXG5cdHN0eWxlVXJsczogWycuL2ZyaWVuZGxpc3QuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZyaWVuZGxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXHRAVmlld0NoaWxkKFwiZnJpZW5kTGlzdFwiKSBmcmllbmRMaXN0OiBMaXN0Vmlldztcblx0QFZpZXdDaGlsZChcImNoaWxkQnV0dG9uMVwiKSBjaGlsZEJ1dHRvbjE6IENoaWxkQnV0dG9uMUNvbXBvbmVudDtcblx0QFZpZXdDaGlsZChcImNoaWxkQnV0dG9uMlwiKSBjaGlsZEJ1dHRvbjI6IENoaWxkQnV0dG9uMkNvbXBvbmVudDtcblx0QFZpZXdDaGlsZChcImNoaWxkQnV0dG9uM1wiKSBjaGlsZEJ1dHRvbjM6IENoaWxkQnV0dG9uM0NvbXBvbmVudDtcblx0QFZpZXdDaGlsZChcImZyaWVuZGNoYXRcIikgZnJpZW5kY2hhdDogRnJpZW5kY2hhdENvbXBvbmVudDtcblx0QFZpZXdDaGlsZChNb2RhbENvbXBvbmVudCkgbW9kYWw6IE1vZGFsQ29tcG9uZW50O1xuXHRwdWJsaWMgZHJhd2VyOiBib29sZWFuO1xuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIGZyaWVuZExpc3RTZXJ2aWNlOiBGcmllbmRMaXN0U2VydmljZSxcblx0XHRwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG5cdFx0cHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZVxuXHQpIHtcblx0XHRcblx0fVxuXG5cdGdldEZyaWVuZFByb2ZpbGVQaWNzcmMoaXRlbSk6c3RyaW5ne1xuXHRcdHZhciByZXQ6c3RyaW5nID0gXCJcIjtcblx0XHRmb3IodmFyIGZyaWVuZElEIGluIGl0ZW0pIHtcblx0XHRcdHJldCA9IGl0ZW1bZnJpZW5kSURdWydwcm9maWxlJ11bJ3Byb2ZpbGVQaWNzcmMnXTtcdFx0XHRcblx0XHR9XG5cdFx0cmV0dXJuIHJldDtcblx0fVxuXHRnZXRGcmllbmROYW1lKGl0ZW0pOnN0cmluZ3tcblx0XHR2YXIgcmV0OnN0cmluZyA9IFwiXCI7XG5cdFx0Zm9yKHZhciBmcmllbmRJRCBpbiBpdGVtKSB7XG5cdFx0XHRyZXQgPSBpdGVtW2ZyaWVuZElEXVsncHJvZmlsZSddWyduYW1lJ107XG5cdFx0fVxuXHRcdHJldHVybiByZXQ7XG5cdH1cblxuXHRnZXRQcm9maWxlUGljU3JjQnlTZWxlY3RlZEZyaWVuZElEKCl7XG5cdFx0dmFyIHNlbGVjdGVkRnJpZW5kSUQgPSB0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLnNlbGVjdGVkRnJpZW5kSUQ7XG5cdFx0aWYoc2VsZWN0ZWRGcmllbmRJRCE9IG51bGwpe1xuXHRcdFx0cmV0dXJuIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldEZyaWVuZHMoKVtzZWxlY3RlZEZyaWVuZElEXVsncHJvZmlsZSddWydwcm9maWxlUGljc3JjJ107XHRcdFxuXHRcdH1cblx0XHRlbHNlIHJldHVybiBudWxsO1xuXHR9XG5cdGdldE5hbWVCeVNlbGVjdGVkRnJpZW5kSUQoKXtcblx0XHR2YXIgc2VsZWN0ZWRGcmllbmRJRCA9IHRoaXMuZnJpZW5kTGlzdFNlcnZpY2Uuc2VsZWN0ZWRGcmllbmRJRDtcblx0XHRpZihzZWxlY3RlZEZyaWVuZElEIT1udWxsKXtcblx0XHRcdHJldHVybiB0aGlzLmZpcmViYXNlU2VydmljZS5nZXRGcmllbmRzKClbc2VsZWN0ZWRGcmllbmRJRF1bJ3Byb2ZpbGUnXVsnbmFtZSddO1xuXHRcdH1cblx0XHRlbHNlIHJldHVybiBudWxsO1xuXHR9XG5cblx0bmdPbkluaXQoKTogdm9pZCB7XG5cdH1cblxuXHRvbkl0ZW1UYXAoYXJncykge1xuXHRcdGNvbnNvbGUubG9nKHRoaXMuZnJpZW5kTGlzdC5pdGVtc1thcmdzLmluZGV4XSk7XG5cdFx0Zm9yKHZhciBzZWxlbGN0ZWRGcmllbmRJRCBpbiB0aGlzLmZyaWVuZExpc3QuaXRlbXNbYXJncy5pbmRleF0pe1xuXHRcdFx0dGhpcy5mcmllbmRMaXN0U2VydmljZS5zZWxlY3RlZEZyaWVuZElEID0gc2VsZWxjdGVkRnJpZW5kSUQ7XG5cdFx0XHRcblx0XHR9XG5cdFx0dGhpcy5vcGVuTW9kYWwoKTtcblx0fVxuXHRwdWJsaWMgb25UYXAoYXJncykge1xuXHRcdGlmICh0aGlzLmRyYXdlcikge1xuXHRcdFx0dGhpcy5kcmF3ZXIgPSBmYWxzZTtcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24xLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjIuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMy5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLmRyYXdlciA9IHRydWU7XG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMS5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24yLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjMuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XG5cdFx0fVxuXHR9XG5cdG9uQ2hhdFRhcCgpOiB2b2lkIHtcblx0XHR0aGlzLm1ha2VSb29tKCk7XG5cdH1cblx0bWFrZVJvb20oKTogdm9pZCB7XG5cdFx0dGhpcy5maXJlYmFzZVNlcnZpY2UuZ2VuZXJhdGVSb29tKHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyKTtcblx0XHR2YXIgcm9vbV9pZDpzdHJpbmcgPSB0aGlzLmZpcmViYXNlU2VydmljZS5nZXRHZW5lcmF0ZWRSb29tSUQoKTtcblx0XHR2YXIgZnJpZW5kX2lkOnN0cmluZyA9IHRoaXMuZnJpZW5kTGlzdFNlcnZpY2UuZ2V0U2VsZWN0ZWRGcmllbmRJRCgpO1xuXHRcdHZhciBmcmllbmQ6YW55ID0gdGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0RnJpZW5kcygpW2ZyaWVuZF9pZF07XG5cdFx0dGhpcy5maXJlYmFzZVNlcnZpY2UucHVzaEZyaWVuZE9uUm9vbShmcmllbmQscm9vbV9pZCk7XG5cdFx0dGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRSb29tSUQgPSByb29tX2lkO1xuXHRcdHRoaXMuZ290b0NoYXRSb29tKCk7XG5cdH1cblx0Z290b0NoYXRSb29tKCkge1xuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9jaGF0cm9vbSddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcblx0fVxuXHRvbk1vZGFsVGFwKCkge1xuXHRcdGFsZXJ0KFwiY2xpY2tlZCBhbiBpdGVtXCIpO1xuXHR9XG5cblx0b3Blbk1vZGFsKCkge1xuXHRcdHRoaXMubW9kYWwuc2hvdygpO1xuXHR9XG5cblx0Y2xvc2VNb2RhbCgpIHtcblx0XHR0aGlzLm1vZGFsLmhpZGUoKTtcblx0fVxuXG5cdG9uT3Blbk1vZGFsKCkge1xuXHRcdGNvbnNvbGUubG9nKFwib3BlbmVkIG1vZGFsXCIpO1xuXHR9XG5cblx0b25DbG9zZU1vZGFsKCkge1xuXHRcdGNvbnNvbGUubG9nKFwiY2xvc2VkIG1vZGFsXCIpO1xuXHR9XG59Il19