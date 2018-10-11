"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var child_button1_component_1 = require("../../buttons/child-button1/child-button1.component");
var child_button2_component_1 = require("../../buttons/child-button2/child-button2.component");
var child_button3_component_1 = require("../../buttons/child-button3/child-button3.component");
var action_button_component_1 = require("../ideamatching/action-button/action-button.component");
var router_1 = require("nativescript-angular/router");
var friend_chat_service_1 = require("./friend-chat.service");
var FriendchatComponent = /** @class */ (function () {
    function FriendchatComponent(routerExtensions, friendChatService) {
        this.routerExtensions = routerExtensions;
        this.friendChatService = friendChatService;
        this.currentDay = new Date().getDate();
        this.currentMonth = new Date().getMonth() + 1;
        this.currentYear = new Date().getFullYear();
    }
    FriendchatComponent.prototype.ngOnInit = function () {
    };
    FriendchatComponent.prototype.onItemTap = function (args) {
        console.log("You tapped: " + this.friendChatService.getRooms()[args.index].title);
        this.friendChatService.setSelectedRoom(this.friendChatService.getRooms()[args.index]);
        this.routerExtensions.navigate(['/chatroom'], { animated: false });
        this._buttonRef.makeArrow();
    };
    FriendchatComponent.prototype.onTap = function (args) {
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
            friend_chat_service_1.FriendChatService])
    ], FriendchatComponent);
    return FriendchatComponent;
}());
exports.FriendchatComponent = FriendchatComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kY2hhdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmcmllbmRjaGF0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQUc3RCwrRkFBNEY7QUFDNUYsK0ZBQTRGO0FBQzVGLCtGQUE0RjtBQUM1RixpR0FBOEY7QUFDOUYsc0RBQStEO0FBQy9ELDZEQUEwRDtBQVUxRDtJQVlDLDZCQUFvQixnQkFBa0MsRUFDN0MsaUJBQW9DO1FBRHpCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDN0Msc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQU4xQyxlQUFVLEdBQVcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMxQyxpQkFBWSxHQUFXLElBQUksSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2pELGdCQUFXLEdBQVcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUtsRCxDQUFDO0lBRUQsc0NBQVEsR0FBUjtJQUNBLENBQUM7SUFFRCx1Q0FBUyxHQUFULFVBQVUsSUFBSTtRQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEYsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDdEYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBQ00sbUNBQUssR0FBWixVQUFhLElBQUk7UUFDaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0MsQ0FBQztJQUNGLENBQUM7SUFyQzBCO1FBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDO2tDQUFhLCtDQUFxQjsyREFBQztJQUdsQztRQUExQixnQkFBUyxDQUFDLGNBQWMsQ0FBQztrQ0FBZSwrQ0FBcUI7NkRBQUM7SUFDcEM7UUFBMUIsZ0JBQVMsQ0FBQyxjQUFjLENBQUM7a0NBQWUsK0NBQXFCOzZEQUFDO0lBQ3BDO1FBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDO2tDQUFlLCtDQUFxQjs2REFBQztJQU5uRCxtQkFBbUI7UUFOL0IsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO1NBQ3pDLENBQUM7eUNBYXFDLHlCQUFnQjtZQUMxQix1Q0FBaUI7T0FiakMsbUJBQW1CLENBd0MvQjtJQUFELDBCQUFDO0NBQUEsQUF4Q0QsSUF3Q0M7QUF4Q1ksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBNZXNzYWdlIH0gZnJvbSBcIi4vbWVzc2FnZS5tb2RlbFwiO1xuXG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjFDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vYnV0dG9ucy9jaGlsZC1idXR0b24xL2NoaWxkLWJ1dHRvbjEuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjJDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vYnV0dG9ucy9jaGlsZC1idXR0b24yL2NoaWxkLWJ1dHRvbjIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjNDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vYnV0dG9ucy9jaGlsZC1idXR0b24zL2NoaWxkLWJ1dHRvbjMuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBBY3Rpb25CdXR0b25Db21wb25lbnQgfSBmcm9tIFwiLi4vaWRlYW1hdGNoaW5nL2FjdGlvbi1idXR0b24vYWN0aW9uLWJ1dHRvbi5jb21wb25lbnRcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBGcmllbmRDaGF0U2VydmljZSB9IGZyb20gXCIuL2ZyaWVuZC1jaGF0LnNlcnZpY2VcIjtcblxuXG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogXCJGcmllbmRjaGF0XCIsXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHRlbXBsYXRlVXJsOiBcIi4vZnJpZW5kY2hhdC5jb21wb25lbnQuaHRtbFwiLFxuXHRzdHlsZVVybHM6IFsnLi9mcmllbmRjaGF0LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGcmllbmRjaGF0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0QFZpZXdDaGlsZChcImFjdGlvbkJ1dHRvblwiKSBfYnV0dG9uUmVmOiBBY3Rpb25CdXR0b25Db21wb25lbnQ7XG5cblx0cHVibGljIGRyYXdlcjogYm9vbGVhbjtcblx0QFZpZXdDaGlsZChcImNoaWxkQnV0dG9uMVwiKSBjaGlsZEJ1dHRvbjE6IENoaWxkQnV0dG9uMUNvbXBvbmVudDtcblx0QFZpZXdDaGlsZChcImNoaWxkQnV0dG9uMlwiKSBjaGlsZEJ1dHRvbjI6IENoaWxkQnV0dG9uMkNvbXBvbmVudDtcblx0QFZpZXdDaGlsZChcImNoaWxkQnV0dG9uM1wiKSBjaGlsZEJ1dHRvbjM6IENoaWxkQnV0dG9uM0NvbXBvbmVudDtcbiAgICBjdXJyZW50RGF5OiBudW1iZXIgPSBuZXcgRGF0ZSgpLmdldERhdGUoKTtcbiAgICBjdXJyZW50TW9udGg6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSArIDE7XG4gICAgY3VycmVudFllYXI6IG51bWJlciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKTtcblxuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcblx0XHRwcml2YXRlIGZyaWVuZENoYXRTZXJ2aWNlOiBGcmllbmRDaGF0U2VydmljZSwpIHtcblx0fVxuXG5cdG5nT25Jbml0KCk6IHZvaWQge1xuXHR9XG5cblx0b25JdGVtVGFwKGFyZ3MpIHtcblx0XHRjb25zb2xlLmxvZyhcIllvdSB0YXBwZWQ6IFwiICsgdGhpcy5mcmllbmRDaGF0U2VydmljZS5nZXRSb29tcygpW2FyZ3MuaW5kZXhdLnRpdGxlKTtcblx0XHR0aGlzLmZyaWVuZENoYXRTZXJ2aWNlLnNldFNlbGVjdGVkUm9vbSh0aGlzLmZyaWVuZENoYXRTZXJ2aWNlLmdldFJvb21zKClbYXJncy5pbmRleF0pO1xuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9jaGF0cm9vbSddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcblx0XHR0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XG5cdH1cblx0cHVibGljIG9uVGFwKGFyZ3MpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5kcmF3ZXIpIHtcblx0XHRcdHRoaXMuZHJhd2VyID0gZmFsc2U7XG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMS5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24yLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjMuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhpcy5kcmF3ZXIgPSB0cnVlO1xuXHRcdFx0dGhpcy5jaGlsZEJ1dHRvbjEuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XG5cdFx0XHR0aGlzLmNoaWxkQnV0dG9uMi5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcblx0XHRcdHRoaXMuY2hpbGRCdXR0b24zLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xuXHRcdH1cblx0fVxuXG59Il19