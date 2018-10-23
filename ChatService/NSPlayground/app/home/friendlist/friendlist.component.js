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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcmllbmRsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRTtBQUNwRSwyREFBeUQ7QUFDekQsK0ZBQTRGO0FBQzVGLCtGQUE0RjtBQUM1RiwrRkFBNEY7QUFDNUYsMkVBQXlFO0FBQ3pFLCtEQUE2RDtBQUM3RCx5RUFBc0U7QUFDdEUsb0VBQWtFO0FBRWxFLHNEQUErRDtBQU8vRDtJQVFDLDZCQUFvQixpQkFBb0MsRUFDL0MsZ0JBQWtDLEVBQ2xDLGVBQWdDO1FBRnJCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDL0MscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7SUFHekMsQ0FBQztJQUVELG9EQUFzQixHQUF0QixVQUF1QixJQUFJO1FBQzFCLElBQUksR0FBRyxHQUFVLEVBQUUsQ0FBQztRQUNwQixHQUFHLENBQUEsQ0FBQyxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDWixDQUFDO0lBQ0QsMkNBQWEsR0FBYixVQUFjLElBQUk7UUFDakIsSUFBSSxHQUFHLEdBQVUsRUFBRSxDQUFDO1FBQ3BCLEdBQUcsQ0FBQSxDQUFDLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNaLENBQUM7SUFFRCxnRUFBa0MsR0FBbEM7UUFDQyxJQUFJLGlC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LG1CQUFtQjtRQU4vQixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7U0FDekMsQ0FBQzt5Q0FTc0MsdUNBQWlCO1lBQzdCLHlCQUFnQjtZQUNqQixrQ0FBZTtPQVY3QixtQkFBbUIsQ0F3Ry9CO0lBQUQsMEJBQUM7Q0FBQSxBQXhHRCxJQXdHQztBQXhHWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBJbnB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBMaXN0VmlldyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3Qtdmlld1wiO1xuaW1wb3J0IHsgQ2hpbGRCdXR0b24xQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL2J1dHRvbnMvY2hpbGQtYnV0dG9uMS9jaGlsZC1idXR0b24xLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQ2hpbGRCdXR0b24yQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL2J1dHRvbnMvY2hpbGQtYnV0dG9uMi9jaGlsZC1idXR0b24yLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQ2hpbGRCdXR0b24zQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL2J1dHRvbnMvY2hpbGQtYnV0dG9uMy9jaGlsZC1idXR0b24zLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgRnJpZW5kY2hhdENvbXBvbmVudCB9IGZyb20gXCIuLi9mcmllbmRjaGF0L2ZyaWVuZGNoYXQuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNb2RhbENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9tb2RhbC9tb2RhbC5jb21wb25lbnRcIjtcbmltcG9ydCB7IEZyaWVuZExpc3RTZXJ2aWNlIH0gZnJvbSBcIi4uL2ZyaWVuZGNoYXQvZnJpZW5kLWxpc3Quc2VydmljZVwiO1xuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2VcIjtcblxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogXCJGcmllbmRsaXN0XCIsXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHRlbXBsYXRlVXJsOiBcIi4vZnJpZW5kbGlzdC5jb21wb25lbnQuaHRtbFwiLFxuXHRzdHlsZVVybHM6IFsnLi9mcmllbmRsaXN0LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGcmllbmRsaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0QFZpZXdDaGlsZChcImZyaWVuZExpc3RcIikgZnJpZW5kTGlzdDogTGlzdFZpZXc7XG5cdEBWaWV3Q2hpbGQoXCJjaGlsZEJ1dHRvbjFcIikgY2hpbGRCdXR0b24xOiBDaGlsZEJ1dHRvbjFDb21wb25lbnQ7XG5cdEBWaWV3Q2hpbGQoXCJjaGlsZEJ1dHRvbjJcIikgY2hpbGRCdXR0b24yOiBDaGlsZEJ1dHRvbjJDb21wb25lbnQ7XG5cdEBWaWV3Q2hpbGQoXCJjaGlsZEJ1dHRvbjNcIikgY2hpbGRCdXR0b24zOiBDaGlsZEJ1dHRvbjNDb21wb25lbnQ7XG5cdEBWaWV3Q2hpbGQoXCJmcmllbmRjaGF0XCIpIGZyaWVuZGNoYXQ6IEZyaWVuZGNoYXRDb21wb25lbnQ7XG5cdEBWaWV3Q2hpbGQoTW9kYWxDb21wb25lbnQpIG1vZGFsOiBNb2RhbENvbXBvbmVudDtcblx0cHVibGljIGRyYXdlcjogYm9vbGVhbjtcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBmcmllbmRMaXN0U2VydmljZTogRnJpZW5kTGlzdFNlcnZpY2UsXG5cdFx0cHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuXHRcdHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2Vcblx0KSB7XG5cdFx0XG5cdH1cblxuXHRnZXRGcmllbmRQcm9maWxlUGljc3JjKGl0ZW0pOnN0cmluZ3tcblx0XHR2YXIgcmV0OnN0cmluZyA9IFwiXCI7XG5cdFx0Zm9yKHZhciBmcmllbmRJRCBpbiBpdGVtKSB7XG5cdFx0XHRyZXQgPSBpdGVtW2ZyaWVuZElEXVsncHJvZmlsZSddWydwcm9maWxlUGljc3JjJ107XHRcdFx0XG5cdFx0fVxuXHRcdHJldHVybiByZXQ7XG5cdH1cblx0Z2V0RnJpZW5kTmFtZShpdGVtKTpzdHJpbmd7XG5cdFx0dmFyIHJldDpzdHJpbmcgPSBcIlwiO1xuXHRcdGZvcih2YXIgZnJpZW5kSUQgaW4gaXRlbSkge1xuXHRcdFx0cmV0ID0gaXRlbVtmcmllbmRJRF1bJ3Byb2ZpbGUnXVsnbmFtZSddO1xuXHRcdH1cblx0XHRyZXR1cm4gcmV0O1xuXHR9XG5cblx0Z2V0UHJvZmlsZVBpY1NyY0J5U2VsZWN0ZWRGcmllbmRJRCgpe1xuXHRcdHZhciBzZWxlbGN0ZWRGcmllbmRJRCA9IHRoaXMuZnJpZW5kTGlzdFNlcnZpY2UuZ2V0U2VsZWN0ZWRGcmllbmRJRCgpO1xuXHRcdGlmKHNlbGVsY3RlZEZyaWVuZElEIT0gbnVsbCl7XG5cdFx0XHRyZXR1cm4gdGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0RnJpZW5kcygpW3NlbGVsY3RlZEZyaWVuZElEXVsncHJvZmlsZSddWydwcm9maWxlUGljc3JjJ107XHRcdFxuXHRcdH1cblx0XHRlbHNlIHJldHVybiBudWxsO1xuXHR9XG5cdGdldE5hbWVCeVNlbGVjdGVkRnJpZW5kSUQoKXtcblx0XHR2YXIgc2VsZWxjdGVkRnJpZW5kSUQgPSB0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLmdldFNlbGVjdGVkRnJpZW5kSUQoKTtcblx0XHRpZihzZWxlbGN0ZWRGcmllbmRJRCE9bnVsbCl7XG5cdFx0XHRyZXR1cm4gdGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0RnJpZW5kcygpW3NlbGVsY3RlZEZyaWVuZElEXVsncHJvZmlsZSddWyduYW1lJ107XG5cdFx0fVxuXHRcdGVsc2UgcmV0dXJuIG51bGw7XG5cdH1cblxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcblx0fVxuXG5cdG9uSXRlbVRhcChhcmdzKSB7XG5cdFx0Y29uc29sZS5sb2codGhpcy5mcmllbmRMaXN0Lml0ZW1zW2FyZ3MuaW5kZXhdKTtcblx0XHRmb3IodmFyIHNlbGVsY3RlZEZyaWVuZElEIGluIHRoaXMuZnJpZW5kTGlzdC5pdGVtc1thcmdzLmluZGV4XSl7XG5cdFx0XHR0aGlzLmZyaWVuZExpc3RTZXJ2aWNlLnNlbGVjdGVkRnJpZW5kSUQgPSBzZWxlbGN0ZWRGcmllbmRJRDtcblx0XHRcdFxuXHRcdH1cblx0XHR0aGlzLm9wZW5Nb2RhbCgpO1xuXHR9XG5cdHB1YmxpYyBvblRhcChhcmdzKSB7XG5cdFx0aWYgKHRoaXMuZHJhd2VyKSB7XG5cdFx0XHR0aGlzLmRyYXdlciA9IGZhbHNlO1xuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjEuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMi5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24zLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRoaXMuZHJhd2VyID0gdHJ1ZTtcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24xLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjIuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMy5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcblx0XHR9XG5cdH1cblx0b25DaGF0VGFwKCk6IHZvaWQge1xuXHRcdHRoaXMubWFrZVJvb20oKTtcblx0fVxuXHRtYWtlUm9vbSgpOiB2b2lkIHtcblx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5nZW5lcmF0ZVJvb20odGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXIpO1xuXHRcdHZhciByb29tX2lkOnN0cmluZyA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldEdlbmVyYXRlZFJvb21JRCgpO1xuXHRcdHZhciBmcmllbmRfaWQ6c3RyaW5nID0gdGhpcy5mcmllbmRMaXN0U2VydmljZS5nZXRTZWxlY3RlZEZyaWVuZElEKCk7XG5cdFx0dmFyIGZyaWVuZDphbnkgPSB0aGlzLmZpcmViYXNlU2VydmljZS5nZXRGcmllbmRzKClbZnJpZW5kX2lkXTtcblx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5wdXNoRnJpZW5kT25Sb29tKGZyaWVuZCxyb29tX2lkKTtcblx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5zZWxlY3RlZFJvb21JRCA9IHJvb21faWQ7XG5cdFx0dGhpcy5nb3RvQ2hhdFJvb20oKTtcblx0fVxuXHRnb3RvQ2hhdFJvb20oKSB7XG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2NoYXRyb29tJ10sIHsgYW5pbWF0ZWQ6IGZhbHNlIH0pO1xuXHR9XG5cdG9uTW9kYWxUYXAoKSB7XG5cdFx0YWxlcnQoXCJjbGlja2VkIGFuIGl0ZW1cIik7XG5cdH1cblxuXHRvcGVuTW9kYWwoKSB7XG5cdFx0dGhpcy5tb2RhbC5zaG93KCk7XG5cdH1cblxuXHRjbG9zZU1vZGFsKCkge1xuXHRcdHRoaXMubW9kYWwuaGlkZSgpO1xuXHR9XG5cblx0b25PcGVuTW9kYWwoKSB7XG5cdFx0Y29uc29sZS5sb2coXCJvcGVuZWQgbW9kYWxcIik7XG5cdH1cblxuXHRvbkNsb3NlTW9kYWwoKSB7XG5cdFx0Y29uc29sZS5sb2coXCJjbG9zZWQgbW9kYWxcIik7XG5cdH1cbn0iXX0=