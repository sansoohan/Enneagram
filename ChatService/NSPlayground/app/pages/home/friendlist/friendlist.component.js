"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var list_view_1 = require("tns-core-modules/ui/list-view");
var child_button1_component_1 = require("~/modules/buttons/child-button1/child-button1.component");
var child_button2_component_1 = require("~/modules/buttons/child-button2/child-button2.component");
var child_button3_component_1 = require("~/modules/buttons/child-button3/child-button3.component");
var float_button_component_1 = require("~/modules/buttons/float-button/float-button.component");
var modal_component_1 = require("~/modules/modal/modal.component");
var friendchat_component_1 = require("../friendchat/friendchat.component");
var firebase_service_1 = require("~/services/firebase.service");
var router_1 = require("nativescript-angular/router");
var FriendlistComponent = /** @class */ (function () {
    function FriendlistComponent(routerExtensions, firebaseService) {
        this.routerExtensions = routerExtensions;
        this.firebaseService = firebaseService;
    }
    FriendlistComponent.prototype.onChildButton1Tap = function () {
        this.routerExtensions.navigate(['/friendadd'], { animated: false });
        this.closeModal();
        this._buttonRef.makeArrow();
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
        // console.log(this.friendList.items[args.index]);
        for (var selelctedFriendID in this.friendList.items[args.index]) {
            this.firebaseService.selectedFriendID = selelctedFriendID;
        }
        this.openModal();
    };
    FriendlistComponent.prototype.onFloatButtonTap = function () {
        if (this.drawer) {
            this.drawer = false;
            this.childButton1.drawerOpen(this.drawer);
            this.childButton1.floatButtonOn = this.drawer;
            this.childButton2.drawerOpen(this.drawer);
            this.childButton2.floatButtonOn = this.drawer;
            this.childButton3.drawerOpen(this.drawer);
            this.childButton3.floatButtonOn = this.drawer;
        }
        else {
            this.drawer = true;
            this.childButton1.drawerOpen(this.drawer);
            this.childButton1.floatButtonOn = this.drawer;
            this.childButton2.drawerOpen(this.drawer);
            this.childButton2.floatButtonOn = this.drawer;
            this.childButton3.drawerOpen(this.drawer);
            this.childButton3.floatButtonOn = this.drawer;
        }
    };
    FriendlistComponent.prototype.onChatTap = function () {
        this.firebaseService.selectedRoomMessageArray = [];
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
        this.firebaseService.getUserPosts(this.firebaseService.selectedFriendID);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcmllbmRsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRTtBQUNwRSwyREFBeUQ7QUFDekQsbUdBQWdHO0FBQ2hHLG1HQUFnRztBQUNoRyxtR0FBZ0c7QUFDaEcsZ0dBQTZGO0FBRTdGLG1FQUFpRTtBQUNqRSwyRUFBeUU7QUFDekUsZ0VBQThEO0FBRTlELHNEQUErRDtBQU8vRDtJQVVDLDZCQUNTLGdCQUFrQyxFQUNsQyxlQUFnQztRQURoQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUd6QyxDQUFDO0lBQ0QsK0NBQWlCLEdBQWpCO1FBQ0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELG9EQUFzQixHQUF0QixVQUF1QixJQUFJO1FBQzFCLElBQUksR0FBRyxHQUFVLEVBQUUsQ0FBQztRQUNwQixLQUFJLElBQUksUUFBUSxJQUFJLElBQUksRUFBRTtZQUN6QixHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDWixDQUFDO0lBQ0QsMkNBQWEsR0FBYixVQUFjLElBQUk7UUFDakIsSUFBSSxHQUFHLEdBQVUsRUFBRSxDQUFDO1FBQ3BCLEtBQUksSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFO1lBQ3pCLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDeEM7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNaLENBQUM7SUFFRCxnRUFBa0MsR0FBbEM7UUFDQyxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUM7UUFDN0QsSUFBRyxnQkFBZ0IsSUFBRyxJQUFJLEVBQUM7WUFDMUIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxDQUFDLGdCQUFnQixDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDdkY7O1lBQ0ksT0FBTyxJQUFJLENBQUM7SUFDbEIsQ0FBQztJQUNELHVEQUF5QixHQUF6QjtRQUNDLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUM3RCxJQUFHLGdCQUFnQixJQUFFLElBQUksRUFBQztZQUN6QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM5RTs7WUFDSSxPQUFPLElBQUksQ0FBQztJQUNsQixDQUFDO0lBRUQsc0NBQVEsR0FBUjtJQUNBLENBQUM7SUFFRCx1Q0FBUyxHQUFULFVBQVUsSUFBSTtRQUNiLGtEQUFrRDtRQUNsRCxLQUFJLElBQUksaUJBQWlCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFDO1lBQzlELElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEdBQUcsaUJBQWlCLENBQUM7U0FDMUQ7UUFDRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUNNLDhDQUFnQixHQUF2QjtRQUNDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUM5QyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUM5QyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUM5QzthQUNJO1lBQ0osSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDOUM7SUFDRixDQUFDO0lBQ0QsdUNBQVMsR0FBVDtRQUNDLElBQUksQ0FBQyxlQUFlLENBQUMsd0JBQXdCLEdBQUcsRUFBRSxDQUFDO1FBQ25ELElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQztRQUN4QixjQUFjLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2pJLElBQUksQ0FBQyxlQUFlLENBQUMsK0JBQStCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDcEcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUNELHdDQUFVLEdBQVY7UUFDQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsdUNBQVMsR0FBVDtRQUNDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELHdDQUFVLEdBQVY7UUFDQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ25CLENBQUM7SUFFRCx1Q0FBUyxHQUFUO1FBQ0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDdkUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQseUNBQVcsR0FBWDtRQUNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELDBDQUFZLEdBQVo7UUFDQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFuSHdCO1FBQXhCLGdCQUFTLENBQUMsWUFBWSxDQUFDO2tDQUFhLG9CQUFROzJEQUFDO0lBQ25CO1FBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDO2tDQUFlLCtDQUFxQjs2REFBQztJQUNwQztRQUExQixnQkFBUyxDQUFDLGNBQWMsQ0FBQztrQ0FBZSwrQ0FBcUI7NkRBQUM7SUFDcEM7UUFBMUIsZ0JBQVMsQ0FBQyxjQUFjLENBQUM7a0NBQWUsK0NBQXFCOzZEQUFDO0lBQ3JDO1FBQXpCLGdCQUFTLENBQUMsYUFBYSxDQUFDO2tDQUFjLDZDQUFvQjs0REFBQztJQUNuQztRQUF4QixnQkFBUyxDQUFDLFlBQVksQ0FBQztrQ0FBYSwwQ0FBbUI7MkRBQUM7SUFDOUI7UUFBMUIsZ0JBQVMsQ0FBQyxnQ0FBYyxDQUFDO2tDQUFRLGdDQUFjO3NEQUFDO0lBUHJDLG1CQUFtQjtRQU4vQixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7U0FDekMsQ0FBQzt5Q0FZMEIseUJBQWdCO1lBQ2pCLGtDQUFlO09BWjdCLG1CQUFtQixDQXFIL0I7SUFBRCwwQkFBQztDQUFBLEFBckhELElBcUhDO0FBckhZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIElucHV0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTGlzdFZpZXcgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9saXN0LXZpZXdcIjtcclxuaW1wb3J0IHsgQ2hpbGRCdXR0b24xQ29tcG9uZW50IH0gZnJvbSBcIn4vbW9kdWxlcy9idXR0b25zL2NoaWxkLWJ1dHRvbjEvY2hpbGQtYnV0dG9uMS5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ2hpbGRCdXR0b24yQ29tcG9uZW50IH0gZnJvbSBcIn4vbW9kdWxlcy9idXR0b25zL2NoaWxkLWJ1dHRvbjIvY2hpbGQtYnV0dG9uMi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ2hpbGRCdXR0b24zQ29tcG9uZW50IH0gZnJvbSBcIn4vbW9kdWxlcy9idXR0b25zL2NoaWxkLWJ1dHRvbjMvY2hpbGQtYnV0dG9uMy5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRmxvYXRCdXR0b25Db21wb25lbnQgfSBmcm9tIFwifi9tb2R1bGVzL2J1dHRvbnMvZmxvYXQtYnV0dG9uL2Zsb2F0LWJ1dHRvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQWN0aW9uQnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIn4vbW9kdWxlcy9idXR0b25zL2FjdGlvbi1idXR0b24vYWN0aW9uLWJ1dHRvbi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgTW9kYWxDb21wb25lbnQgfSBmcm9tIFwifi9tb2R1bGVzL21vZGFsL21vZGFsLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBGcmllbmRjaGF0Q29tcG9uZW50IH0gZnJvbSBcIi4uL2ZyaWVuZGNoYXQvZnJpZW5kY2hhdC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSBcIn4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6IFwiRnJpZW5kbGlzdFwiLFxyXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcblx0dGVtcGxhdGVVcmw6IFwiLi9mcmllbmRsaXN0LmNvbXBvbmVudC5odG1sXCIsXHJcblx0c3R5bGVVcmxzOiBbJy4vZnJpZW5kbGlzdC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEZyaWVuZGxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdEBWaWV3Q2hpbGQoXCJmcmllbmRMaXN0XCIpIGZyaWVuZExpc3Q6IExpc3RWaWV3O1xyXG5cdEBWaWV3Q2hpbGQoXCJjaGlsZEJ1dHRvbjFcIikgY2hpbGRCdXR0b24xOiBDaGlsZEJ1dHRvbjFDb21wb25lbnQ7XHJcblx0QFZpZXdDaGlsZChcImNoaWxkQnV0dG9uMlwiKSBjaGlsZEJ1dHRvbjI6IENoaWxkQnV0dG9uMkNvbXBvbmVudDtcclxuXHRAVmlld0NoaWxkKFwiY2hpbGRCdXR0b24zXCIpIGNoaWxkQnV0dG9uMzogQ2hpbGRCdXR0b24zQ29tcG9uZW50O1xyXG5cdEBWaWV3Q2hpbGQoXCJmbG9hdEJ1dHRvblwiKSBmbG9hdEJ1dHRvbjogRmxvYXRCdXR0b25Db21wb25lbnQ7XHJcblx0QFZpZXdDaGlsZChcImZyaWVuZGNoYXRcIikgZnJpZW5kY2hhdDogRnJpZW5kY2hhdENvbXBvbmVudDtcclxuXHRAVmlld0NoaWxkKE1vZGFsQ29tcG9uZW50KSBtb2RhbDogTW9kYWxDb21wb25lbnQ7XHJcblx0cHJpdmF0ZSBfYnV0dG9uUmVmOiBBY3Rpb25CdXR0b25Db21wb25lbnQ7XHJcblx0cHVibGljIGRyYXdlcjogYm9vbGVhbjtcclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuXHRcdHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2VcclxuXHQpIHtcclxuXHRcdFxyXG5cdH1cclxuXHRvbkNoaWxkQnV0dG9uMVRhcCgpe1xyXG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2ZyaWVuZGFkZCddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcclxuXHRcdHRoaXMuY2xvc2VNb2RhbCgpO1xyXG5cdFx0dGhpcy5fYnV0dG9uUmVmLm1ha2VBcnJvdygpO1xyXG5cdH1cclxuXHJcblx0Z2V0RnJpZW5kUHJvZmlsZVBpY3NyYyhpdGVtKTpzdHJpbmd7XHJcblx0XHR2YXIgcmV0OnN0cmluZyA9IFwiXCI7XHJcblx0XHRmb3IodmFyIGZyaWVuZElEIGluIGl0ZW0pIHtcclxuXHRcdFx0cmV0ID0gaXRlbVtmcmllbmRJRF1bJ3Byb2ZpbGUnXVsncHJvZmlsZVBpY3NyYyddO1x0XHRcdFxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJldDtcclxuXHR9XHJcblx0Z2V0RnJpZW5kTmFtZShpdGVtKTpzdHJpbmd7XHJcblx0XHR2YXIgcmV0OnN0cmluZyA9IFwiXCI7XHJcblx0XHRmb3IodmFyIGZyaWVuZElEIGluIGl0ZW0pIHtcclxuXHRcdFx0cmV0ID0gaXRlbVtmcmllbmRJRF1bJ3Byb2ZpbGUnXVsnbmFtZSddO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJldDtcclxuXHR9XHJcblxyXG5cdGdldFByb2ZpbGVQaWNTcmNCeVNlbGVjdGVkRnJpZW5kSUQoKXtcclxuXHRcdHZhciBzZWxlY3RlZEZyaWVuZElEID0gdGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRGcmllbmRJRDtcclxuXHRcdGlmKHNlbGVjdGVkRnJpZW5kSUQhPSBudWxsKXtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldEZyaWVuZHMoKVtzZWxlY3RlZEZyaWVuZElEXVsncHJvZmlsZSddWydwcm9maWxlUGljc3JjJ107XHRcdFxyXG5cdFx0fVxyXG5cdFx0ZWxzZSByZXR1cm4gbnVsbDtcclxuXHR9XHJcblx0Z2V0TmFtZUJ5U2VsZWN0ZWRGcmllbmRJRCgpe1xyXG5cdFx0dmFyIHNlbGVjdGVkRnJpZW5kSUQgPSB0aGlzLmZpcmViYXNlU2VydmljZS5zZWxlY3RlZEZyaWVuZElEO1xyXG5cdFx0aWYoc2VsZWN0ZWRGcmllbmRJRCE9bnVsbCl7XHJcblx0XHRcdHJldHVybiB0aGlzLmZpcmViYXNlU2VydmljZS5nZXRGcmllbmRzKClbc2VsZWN0ZWRGcmllbmRJRF1bJ3Byb2ZpbGUnXVsnbmFtZSddO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSByZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCk6IHZvaWQge1xyXG5cdH1cclxuXHJcblx0b25JdGVtVGFwKGFyZ3MpIHtcclxuXHRcdC8vIGNvbnNvbGUubG9nKHRoaXMuZnJpZW5kTGlzdC5pdGVtc1thcmdzLmluZGV4XSk7XHJcblx0XHRmb3IodmFyIHNlbGVsY3RlZEZyaWVuZElEIGluIHRoaXMuZnJpZW5kTGlzdC5pdGVtc1thcmdzLmluZGV4XSl7XHJcblx0XHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnNlbGVjdGVkRnJpZW5kSUQgPSBzZWxlbGN0ZWRGcmllbmRJRDtcclxuXHRcdH1cclxuXHRcdHRoaXMub3Blbk1vZGFsKCk7XHJcblx0fVxyXG5cdHB1YmxpYyBvbkZsb2F0QnV0dG9uVGFwKCkge1xyXG5cdFx0aWYgKHRoaXMuZHJhd2VyKSB7XHJcblx0XHRcdHRoaXMuZHJhd2VyID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24xLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xyXG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMS5mbG9hdEJ1dHRvbk9uID0gdGhpcy5kcmF3ZXI7XHJcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24yLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xyXG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMi5mbG9hdEJ1dHRvbk9uID0gdGhpcy5kcmF3ZXI7XHJcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24zLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xyXG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMy5mbG9hdEJ1dHRvbk9uID0gdGhpcy5kcmF3ZXI7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5kcmF3ZXIgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMS5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcclxuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjEuZmxvYXRCdXR0b25PbiA9IHRoaXMuZHJhd2VyO1xyXG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMi5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcclxuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjIuZmxvYXRCdXR0b25PbiA9IHRoaXMuZHJhd2VyO1xyXG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMy5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcclxuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjMuZmxvYXRCdXR0b25PbiA9IHRoaXMuZHJhd2VyO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRvbkNoYXRUYXAoKTogdm9pZCB7XHJcblx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5zZWxlY3RlZFJvb21NZXNzYWdlQXJyYXkgPSBbXTtcclxuXHRcdHZhciBzZWxlY3RlZEZyaWVuZCA9IHt9O1xyXG5cdFx0c2VsZWN0ZWRGcmllbmRbdGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRGcmllbmRJRF0gPSB0aGlzLmZpcmViYXNlU2VydmljZS5nZXRGcmllbmRzKClbdGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRGcmllbmRJRF07XHJcblx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5nZW5lcmF0ZVJvb21XaXRoU2VsZWN0ZWRGcmllbmRzKHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyLCBzZWxlY3RlZEZyaWVuZCk7XHJcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvY2hhdHJvb20nXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XHJcblx0XHR0aGlzLmNsb3NlTW9kYWwoKTtcclxuXHRcdHRoaXMuX2J1dHRvblJlZi5tYWtlQXJyb3coKTtcclxuXHR9XHJcblx0b25Nb2RhbFRhcCgpIHtcclxuXHRcdGFsZXJ0KFwiY2xpY2tlZCBhbiBpdGVtXCIpO1xyXG5cdH1cclxuXHJcblx0b3Blbk1vZGFsKCkge1xyXG5cdFx0dGhpcy5tb2RhbC5zaG93KCk7XHJcblx0fVxyXG5cclxuXHRjbG9zZU1vZGFsKCkge1xyXG5cdFx0dGhpcy5tb2RhbC5oaWRlKCk7XHJcblx0fVxyXG5cclxuXHRvbkhvbWVUYXAoKXtcclxuXHRcdHRoaXMubW9kYWwuaGlkZSgpO1xyXG5cdFx0dGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0VXNlclBvc3RzKHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnNlbGVjdGVkRnJpZW5kSUQpO1xyXG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL3NlYXJjaHJlc3VsdCddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcclxuXHRcdHRoaXMuX2J1dHRvblJlZi5tYWtlQXJyb3coKTtcclxuXHR9XHJcblxyXG5cdG9uT3Blbk1vZGFsKCkge1xyXG5cdFx0Y29uc29sZS5sb2coXCJvcGVuZWQgbW9kYWxcIik7XHJcblx0fVxyXG5cclxuXHRvbkNsb3NlTW9kYWwoKSB7XHJcblx0XHRjb25zb2xlLmxvZyhcImNsb3NlZCBtb2RhbFwiKTtcclxuXHR9XHJcbn0iXX0=