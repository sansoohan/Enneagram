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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcmllbmRsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRTtBQUNwRSwyREFBeUQ7QUFDekQsbUdBQWdHO0FBQ2hHLG1HQUFnRztBQUNoRyxtR0FBZ0c7QUFDaEcsZ0dBQTZGO0FBRTdGLG1FQUFpRTtBQUNqRSwyRUFBeUU7QUFDekUsZ0VBQThEO0FBRTlELHNEQUErRDtBQU8vRDtJQVVDLDZCQUNTLGdCQUFrQyxFQUNsQyxlQUFnQztRQURoQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUd6QyxDQUFDO0lBQ0QsK0NBQWlCLEdBQWpCO1FBQ0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELG9EQUFzQixHQUF0QixVQUF1QixJQUFJO1FBQzFCLElBQUksR0FBRyxHQUFVLEVBQUUsQ0FBQztRQUNwQixHQUFHLENBQUEsQ0FBQyxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDWixDQUFDO0lBQ0QsMkNBQWEsR0FBYixVQUFjLElBQUk7UUFDakIsSUFBSSxHQUFHLEdBQVUsRUFBRSxDQUFDO1FBQ3BCLEdBQUcsQ0FBQSxDQUFDLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNaLENBQUM7SUFFRCxnRUFBa0MsR0FBbEM7UUFDQyxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUM7UUFDN0QsRUFBRSxDQUFBLENBQUMsZ0JBQWdCLElBQUcsSUFBSSxDQUFDLENBQUEsQ0FBQztZQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3hGLENBQUM7UUFDRCxJQUFJO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNsQixDQUFDO0lBQ0QsdURBQXlCLEdBQXpCO1FBQ0MsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1FBQzdELEVBQUUsQ0FBQSxDQUFDLGdCQUFnQixJQUFFLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRSxDQUFDO1FBQ0QsSUFBSTtZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDbEIsQ0FBQztJQUVELHNDQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsdUNBQVMsR0FBVCxVQUFVLElBQUk7UUFDYixrREFBa0Q7UUFDbEQsR0FBRyxDQUFBLENBQUMsSUFBSSxpQkFBaUIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQSxDQUFDO1lBQy9ELElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEdBQUcsaUJBQWlCLENBQUM7UUFDM0QsQ0FBQztRQUNELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBQ00sOENBQWdCLEdBQXZCO1FBQ0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDL0MsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDL0MsQ0FBQztJQUNGLENBQUM7SUFDRCx1Q0FBUyxHQUFUO1FBQ0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyx3QkFBd0IsR0FBRyxFQUFFLENBQUM7UUFDbkQsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLGNBQWMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDakksSUFBSSxDQUFDLGVBQWUsQ0FBQywrQkFBK0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUNwRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBQ0Qsd0NBQVUsR0FBVjtRQUNDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCx1Q0FBUyxHQUFUO1FBQ0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsd0NBQVUsR0FBVjtRQUNDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELHVDQUFTLEdBQVQ7UUFDQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN6RSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCx5Q0FBVyxHQUFYO1FBQ0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsMENBQVksR0FBWjtRQUNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQW5Id0I7UUFBeEIsZ0JBQVMsQ0FBQyxZQUFZLENBQUM7a0NBQWEsb0JBQVE7MkRBQUM7SUFDbkI7UUFBMUIsZ0JBQVMsQ0FBQyxjQUFjLENBQUM7a0NBQWUsK0NBQXFCOzZEQUFDO0lBQ3BDO1FBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDO2tDQUFlLCtDQUFxQjs2REFBQztJQUNwQztRQUExQixnQkFBUyxDQUFDLGNBQWMsQ0FBQztrQ0FBZSwrQ0FBcUI7NkRBQUM7SUFDckM7UUFBekIsZ0JBQVMsQ0FBQyxhQUFhLENBQUM7a0NBQWMsNkNBQW9COzREQUFDO0lBQ25DO1FBQXhCLGdCQUFTLENBQUMsWUFBWSxDQUFDO2tDQUFhLDBDQUFtQjsyREFBQztJQUM5QjtRQUExQixnQkFBUyxDQUFDLGdDQUFjLENBQUM7a0NBQVEsZ0NBQWM7c0RBQUM7SUFQckMsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztTQUN6QyxDQUFDO3lDQVkwQix5QkFBZ0I7WUFDakIsa0NBQWU7T0FaN0IsbUJBQW1CLENBcUgvQjtJQUFELDBCQUFDO0NBQUEsQUFySEQsSUFxSEM7QUFySFksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgSW5wdXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBMaXN0VmlldyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3Qtdmlld1wiO1xyXG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjFDb21wb25lbnQgfSBmcm9tIFwifi9tb2R1bGVzL2J1dHRvbnMvY2hpbGQtYnV0dG9uMS9jaGlsZC1idXR0b24xLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjJDb21wb25lbnQgfSBmcm9tIFwifi9tb2R1bGVzL2J1dHRvbnMvY2hpbGQtYnV0dG9uMi9jaGlsZC1idXR0b24yLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjNDb21wb25lbnQgfSBmcm9tIFwifi9tb2R1bGVzL2J1dHRvbnMvY2hpbGQtYnV0dG9uMy9jaGlsZC1idXR0b24zLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBGbG9hdEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gXCJ+L21vZHVsZXMvYnV0dG9ucy9mbG9hdC1idXR0b24vZmxvYXQtYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBBY3Rpb25CdXR0b25Db21wb25lbnQgfSBmcm9tIFwifi9tb2R1bGVzL2J1dHRvbnMvYWN0aW9uLWJ1dHRvbi9hY3Rpb24tYnV0dG9uLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNb2RhbENvbXBvbmVudCB9IGZyb20gXCJ+L21vZHVsZXMvbW9kYWwvbW9kYWwuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEZyaWVuZGNoYXRDb21wb25lbnQgfSBmcm9tIFwiLi4vZnJpZW5kY2hhdC9mcmllbmRjaGF0LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwifi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogXCJGcmllbmRsaXN0XCIsXHJcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuXHR0ZW1wbGF0ZVVybDogXCIuL2ZyaWVuZGxpc3QuY29tcG9uZW50Lmh0bWxcIixcclxuXHRzdHlsZVVybHM6IFsnLi9mcmllbmRsaXN0LmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRnJpZW5kbGlzdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0QFZpZXdDaGlsZChcImZyaWVuZExpc3RcIikgZnJpZW5kTGlzdDogTGlzdFZpZXc7XHJcblx0QFZpZXdDaGlsZChcImNoaWxkQnV0dG9uMVwiKSBjaGlsZEJ1dHRvbjE6IENoaWxkQnV0dG9uMUNvbXBvbmVudDtcclxuXHRAVmlld0NoaWxkKFwiY2hpbGRCdXR0b24yXCIpIGNoaWxkQnV0dG9uMjogQ2hpbGRCdXR0b24yQ29tcG9uZW50O1xyXG5cdEBWaWV3Q2hpbGQoXCJjaGlsZEJ1dHRvbjNcIikgY2hpbGRCdXR0b24zOiBDaGlsZEJ1dHRvbjNDb21wb25lbnQ7XHJcblx0QFZpZXdDaGlsZChcImZsb2F0QnV0dG9uXCIpIGZsb2F0QnV0dG9uOiBGbG9hdEJ1dHRvbkNvbXBvbmVudDtcclxuXHRAVmlld0NoaWxkKFwiZnJpZW5kY2hhdFwiKSBmcmllbmRjaGF0OiBGcmllbmRjaGF0Q29tcG9uZW50O1xyXG5cdEBWaWV3Q2hpbGQoTW9kYWxDb21wb25lbnQpIG1vZGFsOiBNb2RhbENvbXBvbmVudDtcclxuXHRwcml2YXRlIF9idXR0b25SZWY6IEFjdGlvbkJ1dHRvbkNvbXBvbmVudDtcclxuXHRwdWJsaWMgZHJhd2VyOiBib29sZWFuO1xyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG5cdFx0cHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZVxyXG5cdCkge1xyXG5cdFx0XHJcblx0fVxyXG5cdG9uQ2hpbGRCdXR0b24xVGFwKCl7XHJcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvZnJpZW5kYWRkJ10sIHsgYW5pbWF0ZWQ6IGZhbHNlIH0pO1xyXG5cdFx0dGhpcy5jbG9zZU1vZGFsKCk7XHJcblx0XHR0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XHJcblx0fVxyXG5cclxuXHRnZXRGcmllbmRQcm9maWxlUGljc3JjKGl0ZW0pOnN0cmluZ3tcclxuXHRcdHZhciByZXQ6c3RyaW5nID0gXCJcIjtcclxuXHRcdGZvcih2YXIgZnJpZW5kSUQgaW4gaXRlbSkge1xyXG5cdFx0XHRyZXQgPSBpdGVtW2ZyaWVuZElEXVsncHJvZmlsZSddWydwcm9maWxlUGljc3JjJ107XHRcdFx0XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmV0O1xyXG5cdH1cclxuXHRnZXRGcmllbmROYW1lKGl0ZW0pOnN0cmluZ3tcclxuXHRcdHZhciByZXQ6c3RyaW5nID0gXCJcIjtcclxuXHRcdGZvcih2YXIgZnJpZW5kSUQgaW4gaXRlbSkge1xyXG5cdFx0XHRyZXQgPSBpdGVtW2ZyaWVuZElEXVsncHJvZmlsZSddWyduYW1lJ107XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmV0O1xyXG5cdH1cclxuXHJcblx0Z2V0UHJvZmlsZVBpY1NyY0J5U2VsZWN0ZWRGcmllbmRJRCgpe1xyXG5cdFx0dmFyIHNlbGVjdGVkRnJpZW5kSUQgPSB0aGlzLmZpcmViYXNlU2VydmljZS5zZWxlY3RlZEZyaWVuZElEO1xyXG5cdFx0aWYoc2VsZWN0ZWRGcmllbmRJRCE9IG51bGwpe1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0RnJpZW5kcygpW3NlbGVjdGVkRnJpZW5kSURdWydwcm9maWxlJ11bJ3Byb2ZpbGVQaWNzcmMnXTtcdFx0XHJcblx0XHR9XHJcblx0XHRlbHNlIHJldHVybiBudWxsO1xyXG5cdH1cclxuXHRnZXROYW1lQnlTZWxlY3RlZEZyaWVuZElEKCl7XHJcblx0XHR2YXIgc2VsZWN0ZWRGcmllbmRJRCA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnNlbGVjdGVkRnJpZW5kSUQ7XHJcblx0XHRpZihzZWxlY3RlZEZyaWVuZElEIT1udWxsKXtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldEZyaWVuZHMoKVtzZWxlY3RlZEZyaWVuZElEXVsncHJvZmlsZSddWyduYW1lJ107XHJcblx0XHR9XHJcblx0XHRlbHNlIHJldHVybiBudWxsO1xyXG5cdH1cclxuXHJcblx0bmdPbkluaXQoKTogdm9pZCB7XHJcblx0fVxyXG5cclxuXHRvbkl0ZW1UYXAoYXJncykge1xyXG5cdFx0Ly8gY29uc29sZS5sb2codGhpcy5mcmllbmRMaXN0Lml0ZW1zW2FyZ3MuaW5kZXhdKTtcclxuXHRcdGZvcih2YXIgc2VsZWxjdGVkRnJpZW5kSUQgaW4gdGhpcy5mcmllbmRMaXN0Lml0ZW1zW2FyZ3MuaW5kZXhdKXtcclxuXHRcdFx0dGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRGcmllbmRJRCA9IHNlbGVsY3RlZEZyaWVuZElEO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5vcGVuTW9kYWwoKTtcclxuXHR9XHJcblx0cHVibGljIG9uRmxvYXRCdXR0b25UYXAoKSB7XHJcblx0XHRpZiAodGhpcy5kcmF3ZXIpIHtcclxuXHRcdFx0dGhpcy5kcmF3ZXIgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjEuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XHJcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24xLmZsb2F0QnV0dG9uT24gPSB0aGlzLmRyYXdlcjtcclxuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjIuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XHJcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24yLmZsb2F0QnV0dG9uT24gPSB0aGlzLmRyYXdlcjtcclxuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjMuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XHJcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24zLmZsb2F0QnV0dG9uT24gPSB0aGlzLmRyYXdlcjtcclxuXHRcdH1cclxuXHRcdGVsc2Uge1xyXG5cdFx0XHR0aGlzLmRyYXdlciA9IHRydWU7XHJcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24xLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xyXG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMS5mbG9hdEJ1dHRvbk9uID0gdGhpcy5kcmF3ZXI7XHJcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24yLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xyXG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMi5mbG9hdEJ1dHRvbk9uID0gdGhpcy5kcmF3ZXI7XHJcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24zLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xyXG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMy5mbG9hdEJ1dHRvbk9uID0gdGhpcy5kcmF3ZXI7XHJcblx0XHR9XHJcblx0fVxyXG5cdG9uQ2hhdFRhcCgpOiB2b2lkIHtcclxuXHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnNlbGVjdGVkUm9vbU1lc3NhZ2VBcnJheSA9IFtdO1xyXG5cdFx0dmFyIHNlbGVjdGVkRnJpZW5kID0ge307XHJcblx0XHRzZWxlY3RlZEZyaWVuZFt0aGlzLmZpcmViYXNlU2VydmljZS5zZWxlY3RlZEZyaWVuZElEXSA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldEZyaWVuZHMoKVt0aGlzLmZpcmViYXNlU2VydmljZS5zZWxlY3RlZEZyaWVuZElEXTtcclxuXHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdlbmVyYXRlUm9vbVdpdGhTZWxlY3RlZEZyaWVuZHModGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXIsIHNlbGVjdGVkRnJpZW5kKTtcclxuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9jaGF0cm9vbSddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcclxuXHRcdHRoaXMuY2xvc2VNb2RhbCgpO1xyXG5cdFx0dGhpcy5fYnV0dG9uUmVmLm1ha2VBcnJvdygpO1xyXG5cdH1cclxuXHRvbk1vZGFsVGFwKCkge1xyXG5cdFx0YWxlcnQoXCJjbGlja2VkIGFuIGl0ZW1cIik7XHJcblx0fVxyXG5cclxuXHRvcGVuTW9kYWwoKSB7XHJcblx0XHR0aGlzLm1vZGFsLnNob3coKTtcclxuXHR9XHJcblxyXG5cdGNsb3NlTW9kYWwoKSB7XHJcblx0XHR0aGlzLm1vZGFsLmhpZGUoKTtcclxuXHR9XHJcblxyXG5cdG9uSG9tZVRhcCgpe1xyXG5cdFx0dGhpcy5tb2RhbC5oaWRlKCk7XHJcblx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5nZXRVc2VyUG9zdHModGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRGcmllbmRJRCk7XHJcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvc2VhcmNocmVzdWx0J10sIHsgYW5pbWF0ZWQ6IGZhbHNlIH0pO1xyXG5cdFx0dGhpcy5fYnV0dG9uUmVmLm1ha2VBcnJvdygpO1xyXG5cdH1cclxuXHJcblx0b25PcGVuTW9kYWwoKSB7XHJcblx0XHRjb25zb2xlLmxvZyhcIm9wZW5lZCBtb2RhbFwiKTtcclxuXHR9XHJcblxyXG5cdG9uQ2xvc2VNb2RhbCgpIHtcclxuXHRcdGNvbnNvbGUubG9nKFwiY2xvc2VkIG1vZGFsXCIpO1xyXG5cdH1cclxufSJdfQ==