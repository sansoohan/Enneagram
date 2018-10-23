"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var friend_chat_service_1 = require("../friend-chat.service");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_cardview_1 = require("nativescript-cardview");
var firebase_service_1 = require("../../../services/firebase.service");
element_registry_1.registerElement('CardView', function () { return nativescript_cardview_1.CardView; });
var ChatRoomComponent = /** @class */ (function () {
    function ChatRoomComponent(routerExtensions, friendChatService, firebaseService) {
        this.routerExtensions = routerExtensions;
        this.friendChatService = friendChatService;
        this.firebaseService = firebaseService;
        this.str = "";
    }
    ChatRoomComponent.prototype.ngOnInit = function () {
    };
    ChatRoomComponent.prototype.onTap = function (args) {
        this.routerExtensions.back();
    };
    ChatRoomComponent.prototype.getMessage = function (item) {
        var ret = "";
        for (var key in item) {
            ret = item[key]['message'];
        }
        console.log(item);
        return ret;
    };
    ChatRoomComponent.prototype.pushMessage = function () {
        var room_id = this.friendChatService.selectedRoomID;
        var user = this.firebaseService.thisUser;
        if (this.str == "") {
            return;
        }
        this.firebaseService.pushMessageOnRoom(room_id, user, this.str);
        this.removeString();
    };
    ChatRoomComponent.prototype.removeString = function () {
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
            firebase_service_1.FirebaseService])
    ], ChatRoomComponent);
    return ChatRoomComponent;
}());
exports.ChatRoomComponent = ChatRoomComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC1yb29tLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNoYXQtcm9vbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUQ7QUFDekQsc0RBQStEO0FBRS9ELDhEQUEyRDtBQUMzRCwwRUFBd0U7QUFDeEUsK0RBQWlEO0FBQ2pELHVFQUFxRTtBQUNyRSxrQ0FBZSxDQUFDLFVBQVUsRUFBRSxjQUFNLE9BQUEsZ0NBQVEsRUFBUixDQUFRLENBQUMsQ0FBQztBQVU1QztJQUlDLDJCQUFvQixnQkFBa0MsRUFDN0MsaUJBQW9DLEVBQ3BDLGVBQWdDO1FBRnJCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDN0Msc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFMekMsUUFBRyxHQUFXLEVBQUUsQ0FBQztJQU1kLENBQUM7SUFFRCxvQ0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUVKLGlDQUFLLEdBQUwsVUFBTSxJQUFzQjtRQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELHNDQUFVLEdBQVYsVUFBVyxJQUFRO1FBQ2xCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLEdBQUcsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDckIsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQixNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ1osQ0FBQztJQUVELHVDQUFXLEdBQVg7UUFDQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDO1FBQ3BELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDO1FBQ3pDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUUsRUFBRSxDQUFDLENBQUEsQ0FBQztZQUNoQixNQUFNLENBQUM7UUFDUixDQUFDO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUNFLHdDQUFZLEdBQVo7UUFDSSxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkNBQTJDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBckNXLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7U0FDeEMsQ0FBQzt5Q0FLcUMseUJBQWdCO1lBQzFCLHVDQUFpQjtZQUNuQixrQ0FBZTtPQU43QixpQkFBaUIsQ0FzQzdCO0lBQUQsd0JBQUM7Q0FBQSxBQXRDRCxJQXNDQztBQXRDWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEdlc3R1cmVFdmVudERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9nZXN0dXJlc1wiO1xuaW1wb3J0IHsgRnJpZW5kQ2hhdFNlcnZpY2UgfSBmcm9tIFwiLi4vZnJpZW5kLWNoYXQuc2VydmljZVwiO1xuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeSc7XG5pbXBvcnQgeyBDYXJkVmlldyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1jYXJkdmlldyc7XG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xucmVnaXN0ZXJFbGVtZW50KCdDYXJkVmlldycsICgpID0+IENhcmRWaWV3KTtcbmltcG9ydCAqIGFzIGFwcFNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogXCJDaGF0Um9vbVwiLFxuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHR0ZW1wbGF0ZVVybDogXCIuL2NoYXQtcm9vbS5jb21wb25lbnQuaHRtbFwiLFxuXHRzdHlsZVVybHM6IFsnLi9jaGF0LXJvb20uY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIENoYXRSb29tQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0c3RyOiBzdHJpbmcgPSBcIlwiO1xuXG5cblx0Y29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuXHRcdHByaXZhdGUgZnJpZW5kQ2hhdFNlcnZpY2U6IEZyaWVuZENoYXRTZXJ2aWNlLFxuXHRcdHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UsXG5cdCl7XHR9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB9XG5cblx0b25UYXAoYXJnczogR2VzdHVyZUV2ZW50RGF0YSkge1xuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG5cdH1cblxuXHRnZXRNZXNzYWdlKGl0ZW06YW55KTogc3RyaW5ne1xuXHRcdHZhciByZXQgPSBcIlwiO1xuXHRcdGZvcih2YXIga2V5IGluIGl0ZW0pIHtcblx0XHRcdHJldCA9IGl0ZW1ba2V5XVsnbWVzc2FnZSddO1xuXHRcdH1cblx0XHRjb25zb2xlLmxvZyhpdGVtKTtcblx0XHRyZXR1cm4gcmV0O1xuXHR9XG5cblx0cHVzaE1lc3NhZ2UoKTogdm9pZCB7XG5cdFx0dmFyIHJvb21faWQgPSB0aGlzLmZyaWVuZENoYXRTZXJ2aWNlLnNlbGVjdGVkUm9vbUlEO1xuXHRcdHZhciB1c2VyID0gdGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXI7XG5cdFx0aWYodGhpcy5zdHI9PVwiXCIpe1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5wdXNoTWVzc2FnZU9uUm9vbShyb29tX2lkLCB1c2VyLCB0aGlzLnN0cik7XG5cdFx0dGhpcy5yZW1vdmVTdHJpbmcoKTtcblx0fVxuICAgIHJlbW92ZVN0cmluZygpOiB2b2lkIHsgICAgICAgIFxuICAgICAgICB0aGlzLnN0ciA9IFwiXCI7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiWW91IHJlbW92ZWQgdGhlIHN0cmluZyBmcm9tIGFwcCBzZXR0aW5ncyFcIik7XG5cdH1cbn0iXX0=