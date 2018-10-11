"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var message_model_1 = require("../message.model");
var friend_chat_service_1 = require("../friend-chat.service");
var user_home_service_1 = require("../user-home.service");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_cardview_1 = require("nativescript-cardview");
element_registry_1.registerElement('CardView', function () { return nativescript_cardview_1.CardView; });
var appSettings = require("application-settings");
var firebase = require("nativescript-plugin-firebase");
var ChatRoomComponent = /** @class */ (function () {
    function ChatRoomComponent(routerExtensions, friendChatService, userHomeService) {
        this.routerExtensions = routerExtensions;
        this.friendChatService = friendChatService;
        this.userHomeService = userHomeService;
        this.str = "";
    }
    ChatRoomComponent.prototype.ngOnInit = function () {
        this.str = appSettings.getString("someString", "");
        firebase.init().then(function (instance) {
            console.log("firebase.init done");
            firebase.push("test", "test");
        }, function (error) {
            console.log("firebase.init error: " + error);
        });
    };
    ChatRoomComponent.prototype.onTap = function (args) {
        this.routerExtensions.back();
    };
    ChatRoomComponent.prototype.saveString = function () {
        console.log("test");
        appSettings.setString("someString", this.str);
        console.log("You saved: " + appSettings.getString("someString"));
        var newMessage = new message_model_1.Message();
        newMessage.friend = this.userHomeService.me.index;
        newMessage.contents = appSettings.getString("someString");
        this.friendChatService.getSelectedRoom().messages.push(newMessage);
        this.removeString();
    };
    ChatRoomComponent.prototype.removeString = function () {
        appSettings.remove("someString");
        this.str = "";
        console.log("You removed the string from app settings!");
    };
    ChatRoomComponent = __decorate([
        core_1.Component({
            selector: "ChatRoom",
            moduleId: module.id,
            templateUrl: "./chat-room.component.html",
            styleUrls: ['./chat-room.component.css']
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            friend_chat_service_1.FriendChatService,
            user_home_service_1.UserHomeService])
    ], ChatRoomComponent);
    return ChatRoomComponent;
}());
exports.ChatRoomComponent = ChatRoomComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC1yb29tLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNoYXQtcm9vbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUQ7QUFDekQsc0RBQStEO0FBRS9ELGtEQUEyQztBQUUzQyw4REFBMkQ7QUFDM0QsMERBQXVEO0FBQ3ZELDBFQUF3RTtBQUN4RSwrREFBaUQ7QUFDakQsa0NBQWUsQ0FBQyxVQUFVLEVBQUUsY0FBTSxPQUFBLGdDQUFRLEVBQVIsQ0FBUSxDQUFDLENBQUM7QUFDNUMsa0RBQW9EO0FBQ3BELHVEQUEwRDtBQVExRDtJQUdDLDJCQUFvQixnQkFBa0MsRUFDN0MsaUJBQW9DLEVBQ3BDLGVBQWdDO1FBRnJCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDN0Msc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFKekMsUUFBRyxHQUFXLEVBQUUsQ0FBQztJQUtkLENBQUM7SUFJRCxvQ0FBUSxHQUFSO1FBQ0YsSUFBSSxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNuRCxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUTtZQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDbEMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxFQUNELFVBQUEsS0FBSztZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQXdCLEtBQU8sQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FDQSxDQUFDO0lBQ04sQ0FBQztJQUdKLGlDQUFLLEdBQUwsVUFBTSxJQUFzQjtRQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELHNDQUFVLEdBQVY7UUFFQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2QsV0FBVyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUNqRSxJQUFJLFVBQVUsR0FBRyxJQUFJLHVCQUFPLEVBQUUsQ0FBQztRQUMvQixVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztRQUNsRCxVQUFVLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRSx3Q0FBWSxHQUFaO1FBQ0ksV0FBVyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkNBQTJDLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBM0NRLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7U0FDeEMsQ0FBQzt5Q0FJcUMseUJBQWdCO1lBQzFCLHVDQUFpQjtZQUNuQixtQ0FBZTtPQUw3QixpQkFBaUIsQ0E0QzdCO0lBQUQsd0JBQUM7Q0FBQSxBQTVDRCxJQTRDQztBQTVDWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEdlc3R1cmVFdmVudERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9nZXN0dXJlc1wiO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gXCIuLi9tZXNzYWdlLm1vZGVsXCI7XG5pbXBvcnQgeyBSb29tIH0gZnJvbSBcIi4uL3Jvb20ubW9kZWxcIjtcbmltcG9ydCB7IEZyaWVuZENoYXRTZXJ2aWNlIH0gZnJvbSBcIi4uL2ZyaWVuZC1jaGF0LnNlcnZpY2VcIjtcbmltcG9ydCB7IFVzZXJIb21lU2VydmljZSB9IGZyb20gXCIuLi91c2VyLWhvbWUuc2VydmljZVwiO1xuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeSc7XG5pbXBvcnQgeyBDYXJkVmlldyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1jYXJkdmlldyc7XG5yZWdpc3RlckVsZW1lbnQoJ0NhcmRWaWV3JywgKCkgPT4gQ2FyZFZpZXcpO1xuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiBcIkNoYXRSb29tXCIsXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHRlbXBsYXRlVXJsOiBcIi4vY2hhdC1yb29tLmNvbXBvbmVudC5odG1sXCIsXG5cdHN0eWxlVXJsczogWycuL2NoYXQtcm9vbS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ2hhdFJvb21Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXHRzdHI6IHN0cmluZyA9IFwiXCI7XG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuXHRcdHByaXZhdGUgZnJpZW5kQ2hhdFNlcnZpY2U6IEZyaWVuZENoYXRTZXJ2aWNlLFxuXHRcdHByaXZhdGUgdXNlckhvbWVTZXJ2aWNlOiBVc2VySG9tZVNlcnZpY2UsXG5cdCl7XHR9XG5cblx0XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcblx0XHR0aGlzLnN0ciA9IGFwcFNldHRpbmdzLmdldFN0cmluZyhcInNvbWVTdHJpbmdcIiwgXCJcIik7XG5cdFx0ZmlyZWJhc2UuaW5pdCgpLnRoZW4oaW5zdGFuY2UgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coXCJmaXJlYmFzZS5pbml0IGRvbmVcIik7XG5cdFx0XHRmaXJlYmFzZS5wdXNoKFwidGVzdFwiLFwidGVzdFwiKTtcbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3IgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coYGZpcmViYXNlLmluaXQgZXJyb3I6ICR7ZXJyb3J9YCk7XG4gICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cblxuXHRvblRhcChhcmdzOiBHZXN0dXJlRXZlbnREYXRhKSB7XG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcblx0fVxuXG5cdHNhdmVTdHJpbmcoKSB7XG5cdFx0XG5cdFx0Y29uc29sZS5sb2coXCJ0ZXN0XCIpO1xuICAgICAgICBhcHBTZXR0aW5ncy5zZXRTdHJpbmcoXCJzb21lU3RyaW5nXCIsIHRoaXMuc3RyKTtcblx0XHRjb25zb2xlLmxvZyhcIllvdSBzYXZlZDogXCIgKyBhcHBTZXR0aW5ncy5nZXRTdHJpbmcoXCJzb21lU3RyaW5nXCIpKTtcblx0XHR2YXIgbmV3TWVzc2FnZSA9IG5ldyBNZXNzYWdlKCk7XG5cdFx0bmV3TWVzc2FnZS5mcmllbmQgPSB0aGlzLnVzZXJIb21lU2VydmljZS5tZS5pbmRleDtcblx0XHRuZXdNZXNzYWdlLmNvbnRlbnRzID0gYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwic29tZVN0cmluZ1wiKTtcblx0XHR0aGlzLmZyaWVuZENoYXRTZXJ2aWNlLmdldFNlbGVjdGVkUm9vbSgpLm1lc3NhZ2VzLnB1c2gobmV3TWVzc2FnZSk7XG5cdFx0dGhpcy5yZW1vdmVTdHJpbmcoKTtcblx0fVxuXHRcbiAgICByZW1vdmVTdHJpbmcoKSB7XG4gICAgICAgIGFwcFNldHRpbmdzLnJlbW92ZShcInNvbWVTdHJpbmdcIik7XG4gICAgICAgIHRoaXMuc3RyID0gXCJcIjtcbiAgICAgICAgY29uc29sZS5sb2coXCJZb3UgcmVtb3ZlZCB0aGUgc3RyaW5nIGZyb20gYXBwIHNldHRpbmdzIVwiKTtcbiAgICB9XG59XG5cblxuIl19