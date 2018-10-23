"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_cardview_1 = require("nativescript-cardview");
var firebase_service_1 = require("../../../services/firebase.service");
element_registry_1.registerElement('CardView', function () { return nativescript_cardview_1.CardView; });
var ChatRoomComponent = /** @class */ (function () {
    function ChatRoomComponent(routerExtensions, firebaseService) {
        this.routerExtensions = routerExtensions;
        this.firebaseService = firebaseService;
        this.str = "";
    }
    ChatRoomComponent.prototype.ngOnInit = function () {
    };
    ChatRoomComponent.prototype.onTap = function (args) {
        this.routerExtensions.back();
    };
    ChatRoomComponent.prototype.getMessage = function (item) {
        return item[Object.keys(item)[0]]['message'];
    };
    ChatRoomComponent.prototype.getProfilePicsrc = function (item) {
        return this.firebaseService.selectedRoomUsers[item[Object.keys(item)[0]]['user']]['profile']['profilePicsrc'];
    };
    ChatRoomComponent.prototype.pushMessage = function () {
        var room_id = this.firebaseService.selectedRoomID;
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
            firebase_service_1.FirebaseService])
    ], ChatRoomComponent);
    return ChatRoomComponent;
}());
exports.ChatRoomComponent = ChatRoomComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC1yb29tLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNoYXQtcm9vbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUQ7QUFDekQsc0RBQStEO0FBRS9ELDBFQUF3RTtBQUN4RSwrREFBaUQ7QUFDakQsdUVBQXFFO0FBQ3JFLGtDQUFlLENBQUMsVUFBVSxFQUFFLGNBQU0sT0FBQSxnQ0FBUSxFQUFSLENBQVEsQ0FBQyxDQUFDO0FBVTVDO0lBSUMsMkJBQW9CLGdCQUFrQyxFQUM3QyxlQUFnQztRQURyQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQzdDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQUp6QyxRQUFHLEdBQVcsRUFBRSxDQUFDO0lBS2QsQ0FBQztJQUVELG9DQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUosaUNBQUssR0FBTCxVQUFNLElBQXNCO1FBQzNCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsc0NBQVUsR0FBVixVQUFXLElBQVE7UUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUNELDRDQUFnQixHQUFoQixVQUFpQixJQUFJO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMvRyxDQUFDO0lBQ0QsdUNBQVcsR0FBWDtRQUNDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDO1FBQ2xELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDO1FBQ3pDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUUsRUFBRSxDQUFDLENBQUEsQ0FBQztZQUNoQixNQUFNLENBQUM7UUFDUixDQUFDO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUNFLHdDQUFZLEdBQVo7UUFDSSxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkNBQTJDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBakNXLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7U0FDeEMsQ0FBQzt5Q0FLcUMseUJBQWdCO1lBQzVCLGtDQUFlO09BTDdCLGlCQUFpQixDQWtDN0I7SUFBRCx3QkFBQztDQUFBLEFBbENELElBa0NDO0FBbENZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzXCI7XG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5JztcbmltcG9ydCB7IENhcmRWaWV3IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWNhcmR2aWV3JztcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XG5yZWdpc3RlckVsZW1lbnQoJ0NhcmRWaWV3JywgKCkgPT4gQ2FyZFZpZXcpO1xuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiBcIkNoYXRSb29tXCIsXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHRlbXBsYXRlVXJsOiBcIi4vY2hhdC1yb29tLmNvbXBvbmVudC5odG1sXCIsXG5cdHN0eWxlVXJsczogWycuL2NoYXQtcm9vbS5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQ2hhdFJvb21Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXHRzdHI6IHN0cmluZyA9IFwiXCI7XG5cblxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG5cdFx0cHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSxcblx0KXtcdH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIH1cblxuXHRvblRhcChhcmdzOiBHZXN0dXJlRXZlbnREYXRhKSB7XG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcblx0fVxuXG5cdGdldE1lc3NhZ2UoaXRlbTphbnkpOiBzdHJpbmd7XG5cdFx0cmV0dXJuIGl0ZW1bT2JqZWN0LmtleXMoaXRlbSlbMF1dWydtZXNzYWdlJ107XG5cdH1cblx0Z2V0UHJvZmlsZVBpY3NyYyhpdGVtKXtcblx0XHRyZXR1cm4gdGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRSb29tVXNlcnNbaXRlbVtPYmplY3Qua2V5cyhpdGVtKVswXV1bJ3VzZXInXV1bJ3Byb2ZpbGUnXVsncHJvZmlsZVBpY3NyYyddO1xuXHR9XG5cdHB1c2hNZXNzYWdlKCk6IHZvaWQge1xuXHRcdHZhciByb29tX2lkID0gdGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRSb29tSUQ7XG5cdFx0dmFyIHVzZXIgPSB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlcjtcblx0XHRpZih0aGlzLnN0cj09XCJcIil7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnB1c2hNZXNzYWdlT25Sb29tKHJvb21faWQsIHVzZXIsIHRoaXMuc3RyKTtcblx0XHR0aGlzLnJlbW92ZVN0cmluZygpO1xuXHR9XG4gICAgcmVtb3ZlU3RyaW5nKCk6IHZvaWQgeyAgICAgICAgXG4gICAgICAgIHRoaXMuc3RyID0gXCJcIjtcbiAgICAgICAgY29uc29sZS5sb2coXCJZb3UgcmVtb3ZlZCB0aGUgc3RyaW5nIGZyb20gYXBwIHNldHRpbmdzIVwiKTtcblx0fVxufSJdfQ==