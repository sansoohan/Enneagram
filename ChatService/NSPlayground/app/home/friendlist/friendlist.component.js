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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcmllbmRsaXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRTtBQUNwRSwyREFBeUQ7QUFDekQsK0ZBQTRGO0FBQzVGLCtGQUE0RjtBQUM1RiwrRkFBNEY7QUFDNUYsNEZBQXlGO0FBQ3pGLDJFQUF5RTtBQUN6RSwrREFBNkQ7QUFHN0Qsb0VBQWtFO0FBRWxFLHNEQUErRDtBQU8vRDtJQVVDLDZCQUNTLGdCQUFrQyxFQUNsQyxlQUFnQztRQURoQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtJQUd6QyxDQUFDO0lBQ0QsK0NBQWlCLEdBQWpCO1FBQ0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELG9EQUFzQixHQUF0QixVQUF1QixJQUFJO1FBQzFCLElBQUksR0FBRyxHQUFVLEVBQUUsQ0FBQztRQUNwQixHQUFHLENBQUEsQ0FBQyxJQUFJLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDWixDQUFDO0lBQ0QsMkNBQWEsR0FBYixVQUFjLElBQUk7UUFDakIsSUFBSSxHQUFHLEdBQVUsRUFBRSxDQUFDO1FBQ3BCLEdBQUcsQ0FBQSxDQUFDLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUIsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNaLENBQUM7SUFFRCxnRUFBa0MsR0FBbEM7UUFDQyxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUM7UUFDN0QsRUFBRSxDQUFBLENBQUMsZ0JBQWdCLElBQUcsSUFBSSxDQUFDLENBQUEsQ0FBQztZQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3hGLENBQUM7UUFDRCxJQUFJO1lBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNsQixDQUFDO0lBQ0QsdURBQXlCLEdBQXpCO1FBQ0MsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDO1FBQzdELEVBQUUsQ0FBQSxDQUFDLGdCQUFnQixJQUFFLElBQUksQ0FBQyxDQUFBLENBQUM7WUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRSxDQUFDO1FBQ0QsSUFBSTtZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDbEIsQ0FBQztJQUVELHNDQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsdUNBQVMsR0FBVCxVQUFVLElBQUk7UUFDYixrREFBa0Q7UUFDbEQsR0FBRyxDQUFBLENBQUMsSUFBSSxpQkFBaUIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQSxDQUFDO1lBQy9ELElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLEdBQUcsaUJBQWlCLENBQUM7UUFDM0QsQ0FBQztRQUNELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBQ00sOENBQWdCLEdBQXZCO1FBQ0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDL0MsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7WUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDL0MsQ0FBQztJQUNGLENBQUM7SUFDRCx1Q0FBUyxHQUFUO1FBQ0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyx3QkFBd0IsR0FBRyxFQUFFLENBQUM7UUFDbkQsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLGNBQWMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDakksSUFBSSxDQUFDLGVBQWUsQ0FBQywrQkFBK0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUNwRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBQ0Qsd0NBQVUsR0FBVjtRQUNDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCx1Q0FBUyxHQUFUO1FBQ0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNuQixDQUFDO0lBRUQsd0NBQVUsR0FBVjtRQUNDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVELHVDQUFTLEdBQVQ7UUFDQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUN2RSxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCx5Q0FBVyxHQUFYO1FBQ0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsMENBQVksR0FBWjtRQUNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQW5Id0I7UUFBeEIsZ0JBQVMsQ0FBQyxZQUFZLENBQUM7a0NBQWEsb0JBQVE7MkRBQUM7SUFDbkI7UUFBMUIsZ0JBQVMsQ0FBQyxjQUFjLENBQUM7a0NBQWUsK0NBQXFCOzZEQUFDO0lBQ3BDO1FBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDO2tDQUFlLCtDQUFxQjs2REFBQztJQUNwQztRQUExQixnQkFBUyxDQUFDLGNBQWMsQ0FBQztrQ0FBZSwrQ0FBcUI7NkRBQUM7SUFDckM7UUFBekIsZ0JBQVMsQ0FBQyxhQUFhLENBQUM7a0NBQWMsNkNBQW9COzREQUFDO0lBQ25DO1FBQXhCLGdCQUFTLENBQUMsWUFBWSxDQUFDO2tDQUFhLDBDQUFtQjsyREFBQztJQUM5QjtRQUExQixnQkFBUyxDQUFDLGdDQUFjLENBQUM7a0NBQVEsZ0NBQWM7c0RBQUM7SUFQckMsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztTQUN6QyxDQUFDO3lDQVkwQix5QkFBZ0I7WUFDakIsa0NBQWU7T0FaN0IsbUJBQW1CLENBcUgvQjtJQUFELDBCQUFDO0NBQUEsQUFySEQsSUFxSEM7QUFySFksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgSW5wdXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBMaXN0VmlldyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2xpc3Qtdmlld1wiO1xyXG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjFDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vYnV0dG9ucy9jaGlsZC1idXR0b24xL2NoaWxkLWJ1dHRvbjEuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IENoaWxkQnV0dG9uMkNvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9idXR0b25zL2NoaWxkLWJ1dHRvbjIvY2hpbGQtYnV0dG9uMi5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ2hpbGRCdXR0b24zQ29tcG9uZW50IH0gZnJvbSBcIi4uLy4uL2J1dHRvbnMvY2hpbGQtYnV0dG9uMy9jaGlsZC1idXR0b24zLmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBGbG9hdEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9idXR0b25zL2Zsb2F0LWJ1dHRvbi9mbG9hdC1idXR0b24uY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEZyaWVuZGNoYXRDb21wb25lbnQgfSBmcm9tIFwiLi4vZnJpZW5kY2hhdC9mcmllbmRjaGF0LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBNb2RhbENvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9tb2RhbC9tb2RhbC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQWN0aW9uQnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4uL3NlYXJjaHJlc3VsdC9hY3Rpb24tYnV0dG9uL2FjdGlvbi1idXR0b24uY29tcG9uZW50XCI7XHJcblxyXG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6IFwiRnJpZW5kbGlzdFwiLFxyXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcblx0dGVtcGxhdGVVcmw6IFwiLi9mcmllbmRsaXN0LmNvbXBvbmVudC5odG1sXCIsXHJcblx0c3R5bGVVcmxzOiBbJy4vZnJpZW5kbGlzdC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIEZyaWVuZGxpc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdEBWaWV3Q2hpbGQoXCJmcmllbmRMaXN0XCIpIGZyaWVuZExpc3Q6IExpc3RWaWV3O1xyXG5cdEBWaWV3Q2hpbGQoXCJjaGlsZEJ1dHRvbjFcIikgY2hpbGRCdXR0b24xOiBDaGlsZEJ1dHRvbjFDb21wb25lbnQ7XHJcblx0QFZpZXdDaGlsZChcImNoaWxkQnV0dG9uMlwiKSBjaGlsZEJ1dHRvbjI6IENoaWxkQnV0dG9uMkNvbXBvbmVudDtcclxuXHRAVmlld0NoaWxkKFwiY2hpbGRCdXR0b24zXCIpIGNoaWxkQnV0dG9uMzogQ2hpbGRCdXR0b24zQ29tcG9uZW50O1xyXG5cdEBWaWV3Q2hpbGQoXCJmbG9hdEJ1dHRvblwiKSBmbG9hdEJ1dHRvbjogRmxvYXRCdXR0b25Db21wb25lbnQ7XHJcblx0QFZpZXdDaGlsZChcImZyaWVuZGNoYXRcIikgZnJpZW5kY2hhdDogRnJpZW5kY2hhdENvbXBvbmVudDtcclxuXHRAVmlld0NoaWxkKE1vZGFsQ29tcG9uZW50KSBtb2RhbDogTW9kYWxDb21wb25lbnQ7XHJcblx0cHJpdmF0ZSBfYnV0dG9uUmVmOiBBY3Rpb25CdXR0b25Db21wb25lbnQ7XHJcblx0cHVibGljIGRyYXdlcjogYm9vbGVhbjtcclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuXHRcdHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2VcclxuXHQpIHtcclxuXHRcdFxyXG5cdH1cclxuXHRvbkNoaWxkQnV0dG9uMVRhcCgpe1xyXG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2ZyaWVuZGFkZCddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcclxuXHRcdHRoaXMuY2xvc2VNb2RhbCgpO1xyXG5cdFx0dGhpcy5fYnV0dG9uUmVmLm1ha2VBcnJvdygpO1xyXG5cdH1cclxuXHJcblx0Z2V0RnJpZW5kUHJvZmlsZVBpY3NyYyhpdGVtKTpzdHJpbmd7XHJcblx0XHR2YXIgcmV0OnN0cmluZyA9IFwiXCI7XHJcblx0XHRmb3IodmFyIGZyaWVuZElEIGluIGl0ZW0pIHtcclxuXHRcdFx0cmV0ID0gaXRlbVtmcmllbmRJRF1bJ3Byb2ZpbGUnXVsncHJvZmlsZVBpY3NyYyddO1x0XHRcdFxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJldDtcclxuXHR9XHJcblx0Z2V0RnJpZW5kTmFtZShpdGVtKTpzdHJpbmd7XHJcblx0XHR2YXIgcmV0OnN0cmluZyA9IFwiXCI7XHJcblx0XHRmb3IodmFyIGZyaWVuZElEIGluIGl0ZW0pIHtcclxuXHRcdFx0cmV0ID0gaXRlbVtmcmllbmRJRF1bJ3Byb2ZpbGUnXVsnbmFtZSddO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJldDtcclxuXHR9XHJcblxyXG5cdGdldFByb2ZpbGVQaWNTcmNCeVNlbGVjdGVkRnJpZW5kSUQoKXtcclxuXHRcdHZhciBzZWxlY3RlZEZyaWVuZElEID0gdGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRGcmllbmRJRDtcclxuXHRcdGlmKHNlbGVjdGVkRnJpZW5kSUQhPSBudWxsKXtcclxuXHRcdFx0cmV0dXJuIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldEZyaWVuZHMoKVtzZWxlY3RlZEZyaWVuZElEXVsncHJvZmlsZSddWydwcm9maWxlUGljc3JjJ107XHRcdFxyXG5cdFx0fVxyXG5cdFx0ZWxzZSByZXR1cm4gbnVsbDtcclxuXHR9XHJcblx0Z2V0TmFtZUJ5U2VsZWN0ZWRGcmllbmRJRCgpe1xyXG5cdFx0dmFyIHNlbGVjdGVkRnJpZW5kSUQgPSB0aGlzLmZpcmViYXNlU2VydmljZS5zZWxlY3RlZEZyaWVuZElEO1xyXG5cdFx0aWYoc2VsZWN0ZWRGcmllbmRJRCE9bnVsbCl7XHJcblx0XHRcdHJldHVybiB0aGlzLmZpcmViYXNlU2VydmljZS5nZXRGcmllbmRzKClbc2VsZWN0ZWRGcmllbmRJRF1bJ3Byb2ZpbGUnXVsnbmFtZSddO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSByZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCk6IHZvaWQge1xyXG5cdH1cclxuXHJcblx0b25JdGVtVGFwKGFyZ3MpIHtcclxuXHRcdC8vIGNvbnNvbGUubG9nKHRoaXMuZnJpZW5kTGlzdC5pdGVtc1thcmdzLmluZGV4XSk7XHJcblx0XHRmb3IodmFyIHNlbGVsY3RlZEZyaWVuZElEIGluIHRoaXMuZnJpZW5kTGlzdC5pdGVtc1thcmdzLmluZGV4XSl7XHJcblx0XHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnNlbGVjdGVkRnJpZW5kSUQgPSBzZWxlbGN0ZWRGcmllbmRJRDtcclxuXHRcdH1cclxuXHRcdHRoaXMub3Blbk1vZGFsKCk7XHJcblx0fVxyXG5cdHB1YmxpYyBvbkZsb2F0QnV0dG9uVGFwKCkge1xyXG5cdFx0aWYgKHRoaXMuZHJhd2VyKSB7XHJcblx0XHRcdHRoaXMuZHJhd2VyID0gZmFsc2U7XHJcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24xLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xyXG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMS5mbG9hdEJ1dHRvbk9uID0gdGhpcy5kcmF3ZXI7XHJcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24yLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xyXG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMi5mbG9hdEJ1dHRvbk9uID0gdGhpcy5kcmF3ZXI7XHJcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24zLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xyXG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMy5mbG9hdEJ1dHRvbk9uID0gdGhpcy5kcmF3ZXI7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5kcmF3ZXIgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMS5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcclxuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjEuZmxvYXRCdXR0b25PbiA9IHRoaXMuZHJhd2VyO1xyXG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMi5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcclxuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjIuZmxvYXRCdXR0b25PbiA9IHRoaXMuZHJhd2VyO1xyXG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMy5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcclxuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjMuZmxvYXRCdXR0b25PbiA9IHRoaXMuZHJhd2VyO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRvbkNoYXRUYXAoKTogdm9pZCB7XHJcblx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5zZWxlY3RlZFJvb21NZXNzYWdlQXJyYXkgPSBbXTtcclxuXHRcdHZhciBzZWxlY3RlZEZyaWVuZCA9IHt9O1xyXG5cdFx0c2VsZWN0ZWRGcmllbmRbdGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRGcmllbmRJRF0gPSB0aGlzLmZpcmViYXNlU2VydmljZS5nZXRGcmllbmRzKClbdGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRGcmllbmRJRF07XHJcblx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5nZW5lcmF0ZVJvb21XaXRoU2VsZWN0ZWRGcmllbmRzKHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyLCBzZWxlY3RlZEZyaWVuZCk7XHJcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvY2hhdHJvb20nXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XHJcblx0XHR0aGlzLmNsb3NlTW9kYWwoKTtcclxuXHRcdHRoaXMuX2J1dHRvblJlZi5tYWtlQXJyb3coKTtcclxuXHR9XHJcblx0b25Nb2RhbFRhcCgpIHtcclxuXHRcdGFsZXJ0KFwiY2xpY2tlZCBhbiBpdGVtXCIpO1xyXG5cdH1cclxuXHJcblx0b3Blbk1vZGFsKCkge1xyXG5cdFx0dGhpcy5tb2RhbC5zaG93KCk7XHJcblx0fVxyXG5cclxuXHRjbG9zZU1vZGFsKCkge1xyXG5cdFx0dGhpcy5tb2RhbC5oaWRlKCk7XHJcblx0fVxyXG5cclxuXHRvbkhvbWVUYXAoKXtcclxuXHRcdHRoaXMubW9kYWwuaGlkZSgpO1xyXG5cdFx0dGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0X3VzZXJfcG9zdHModGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRGcmllbmRJRCk7XHJcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvc2VhcmNocmVzdWx0J10sIHsgYW5pbWF0ZWQ6IGZhbHNlIH0pO1xyXG5cdFx0dGhpcy5fYnV0dG9uUmVmLm1ha2VBcnJvdygpO1xyXG5cdH1cclxuXHJcblx0b25PcGVuTW9kYWwoKSB7XHJcblx0XHRjb25zb2xlLmxvZyhcIm9wZW5lZCBtb2RhbFwiKTtcclxuXHR9XHJcblxyXG5cdG9uQ2xvc2VNb2RhbCgpIHtcclxuXHRcdGNvbnNvbGUubG9nKFwiY2xvc2VkIG1vZGFsXCIpO1xyXG5cdH1cclxufSJdfQ==