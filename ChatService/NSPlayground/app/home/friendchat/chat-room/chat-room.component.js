"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var friend_chat_service_1 = require("../friend-chat.service");
var ChatRoomComponent = /** @class */ (function () {
    function ChatRoomComponent(routerExtensions, friendChatService) {
        this.routerExtensions = routerExtensions;
        this.friendChatService = friendChatService;
    }
    ChatRoomComponent.prototype.ngOnInit = function () {
    };
    ChatRoomComponent.prototype.onTap = function (args) {
        this.routerExtensions.back();
    };
    ChatRoomComponent = __decorate([
        core_1.Component({
            selector: "ChatRoom",
            moduleId: module.id,
            templateUrl: "./chat-room.component.html",
            styleUrls: ['./chat-room.component.css']
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            friend_chat_service_1.FriendChatService])
    ], ChatRoomComponent);
    return ChatRoomComponent;
}());
exports.ChatRoomComponent = ChatRoomComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC1yb29tLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNoYXQtcm9vbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUQ7QUFDekQsc0RBQStEO0FBSS9ELDhEQUEyRDtBQVMzRDtJQUVDLDJCQUFvQixnQkFBa0MsRUFDN0MsaUJBQW9DO1FBRHpCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDN0Msc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtJQUc3QyxDQUFDO0lBRUQsb0NBQVEsR0FBUjtJQUNBLENBQUM7SUFFRCxpQ0FBSyxHQUFMLFVBQU0sSUFBc0I7UUFDM0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFiVyxpQkFBaUI7UUFON0IsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsNEJBQTRCO1lBQ3pDLFNBQVMsRUFBRSxDQUFDLDJCQUEyQixDQUFDO1NBQ3hDLENBQUM7eUNBR3FDLHlCQUFnQjtZQUMxQix1Q0FBaUI7T0FIakMsaUJBQWlCLENBYzdCO0lBQUQsd0JBQUM7Q0FBQSxBQWRELElBY0M7QUFkWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEdlc3R1cmVFdmVudERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9nZXN0dXJlc1wiO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCIuLi9tZXNzYWdlLm1vZGVsXCI7XG5pbXBvcnQgeyBSb29tIH0gZnJvbSBcIi4uL3Jvb20ubW9kZWxcIjtcbmltcG9ydCB7IEZyaWVuZENoYXRTZXJ2aWNlIH0gZnJvbSBcIi4uL2ZyaWVuZC1jaGF0LnNlcnZpY2VcIjtcblxuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6IFwiQ2hhdFJvb21cIixcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0dGVtcGxhdGVVcmw6IFwiLi9jaGF0LXJvb20uY29tcG9uZW50Lmh0bWxcIixcblx0c3R5bGVVcmxzOiBbJy4vY2hhdC1yb29tLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDaGF0Um9vbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cdFxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG5cdFx0cHJpdmF0ZSBmcmllbmRDaGF0U2VydmljZTogRnJpZW5kQ2hhdFNlcnZpY2UsXG5cdCkge1xuXG5cdH1cblxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcblx0fVxuXG5cdG9uVGFwKGFyZ3M6IEdlc3R1cmVFdmVudERhdGEpIHtcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xuXHR9XG59Il19