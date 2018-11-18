"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_cardview_1 = require("nativescript-cardview");
var firebase_service_1 = require("../../../services/firebase.service");
var scroll_view_1 = require("ui/scroll-view");
element_registry_1.registerElement('CardView', function () { return nativescript_cardview_1.CardView; });
var ChatRoomComponent = /** @class */ (function () {
    function ChatRoomComponent(routerExtensions, firebaseService) {
        this.routerExtensions = routerExtensions;
        this.firebaseService = firebaseService;
        this.str = "";
    }
    ChatRoomComponent.prototype.ngOnInit = function () {
        var offset = this.scrollView.scrollableHeight;
        this.scrollView.scrollToVerticalOffset(offset, false);
    };
    ChatRoomComponent.prototype.onTap = function (args) {
        this.routerExtensions.back();
    };
    ChatRoomComponent.prototype.getMessage = function (item) {
        return item[Object.keys(item)[0]]['message'];
    };
    ChatRoomComponent.prototype.getProfilePicsrc = function (item) {
        var user_id = item[Object.keys(item)[0]]['user'];
        return this.firebaseService.getRooms()[this.firebaseService.selectedRoomID]['room_users'][user_id]['messageIcon'];
    };
    ChatRoomComponent.prototype.pushMessage = function () {
        var room_id = this.firebaseService.selectedRoomID;
        var user = this.firebaseService.thisUser;
        if (this.str == "") {
            return;
        }
        this.firebaseService.pushMessageOnRoom(room_id, user, this.str);
        this.removeString();
        var offset = this.scrollView.scrollableHeight;
        this.scrollView.scrollToVerticalOffset(offset, false);
    };
    ChatRoomComponent.prototype.removeString = function () {
        this.str = "";
    };
    __decorate([
        core_1.ViewChild("scrollView"),
        __metadata("design:type", scroll_view_1.ScrollView)
    ], ChatRoomComponent.prototype, "scrollView", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC1yb29tLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNoYXQtcm9vbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNkQ7QUFDN0Qsc0RBQStEO0FBRS9ELDBFQUF3RTtBQUN4RSwrREFBaUQ7QUFDakQsdUVBQXFFO0FBQ3JFLDhDQUE0QztBQUM1QyxrQ0FBZSxDQUFDLFVBQVUsRUFBRSxjQUFNLE9BQUEsZ0NBQVEsRUFBUixDQUFRLENBQUMsQ0FBQztBQVU1QztJQUdDLDJCQUFvQixnQkFBa0MsRUFDN0MsZUFBZ0M7UUFEckIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUM3QyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFIekMsUUFBRyxHQUFXLEVBQUUsQ0FBQztJQUlkLENBQUM7SUFFRCxvQ0FBUSxHQUFSO1FBQ0YsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUosaUNBQUssR0FBTCxVQUFNLElBQXNCO1FBQzNCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsc0NBQVUsR0FBVixVQUFXLElBQVE7UUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUNELDRDQUFnQixHQUFoQixVQUFpQixJQUFJO1FBQ3BCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNuSCxDQUFDO0lBQ0QsdUNBQVcsR0FBWDtRQUNDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDO1FBQ2xELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDO1FBQ3pDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUUsRUFBRSxDQUFDLENBQUEsQ0FBQztZQUNoQixNQUFNLENBQUM7UUFDUixDQUFDO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBQ0Usd0NBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFsQ3dCO1FBQXhCLGdCQUFTLENBQUMsWUFBWSxDQUFDO2tDQUFhLHdCQUFVO3lEQUFDO0lBRnBDLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7U0FDeEMsQ0FBQzt5Q0FJcUMseUJBQWdCO1lBQzVCLGtDQUFlO09BSjdCLGlCQUFpQixDQXFDN0I7SUFBRCx3QkFBQztDQUFBLEFBckNELElBcUNDO0FBckNZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEdlc3R1cmVFdmVudERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9nZXN0dXJlc1wiO1xuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeSc7XG5pbXBvcnQgeyBDYXJkVmlldyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1jYXJkdmlldyc7XG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xuaW1wb3J0IHsgU2Nyb2xsVmlldyB9IGZyb20gXCJ1aS9zY3JvbGwtdmlld1wiO1xucmVnaXN0ZXJFbGVtZW50KCdDYXJkVmlldycsICgpID0+IENhcmRWaWV3KTtcbmltcG9ydCAqIGFzIGFwcFNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogXCJDaGF0Um9vbVwiLFxuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHR0ZW1wbGF0ZVVybDogXCIuL2NoYXQtcm9vbS5jb21wb25lbnQuaHRtbFwiLFxuXHRzdHlsZVVybHM6IFsnLi9jaGF0LXJvb20uY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIENoYXRSb29tQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0c3RyOiBzdHJpbmcgPSBcIlwiO1xuXHRAVmlld0NoaWxkKFwic2Nyb2xsVmlld1wiKSBzY3JvbGxWaWV3OiBTY3JvbGxWaWV3O1xuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG5cdFx0cHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSxcblx0KXtcdH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXHRcdHZhciBvZmZzZXQgPSB0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsYWJsZUhlaWdodDtcblx0XHR0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsVG9WZXJ0aWNhbE9mZnNldChvZmZzZXQsIGZhbHNlKTtcbiAgICB9XG5cblx0b25UYXAoYXJnczogR2VzdHVyZUV2ZW50RGF0YSkge1xuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG5cdH1cblxuXHRnZXRNZXNzYWdlKGl0ZW06YW55KTogc3RyaW5ne1xuXHRcdHJldHVybiBpdGVtW09iamVjdC5rZXlzKGl0ZW0pWzBdXVsnbWVzc2FnZSddO1xuXHR9XG5cdGdldFByb2ZpbGVQaWNzcmMoaXRlbSl7XG5cdFx0dmFyIHVzZXJfaWQgPSBpdGVtW09iamVjdC5rZXlzKGl0ZW0pWzBdXVsndXNlciddO1xuXHRcdHJldHVybiB0aGlzLmZpcmViYXNlU2VydmljZS5nZXRSb29tcygpW3RoaXMuZmlyZWJhc2VTZXJ2aWNlLnNlbGVjdGVkUm9vbUlEXVsncm9vbV91c2VycyddW3VzZXJfaWRdWydtZXNzYWdlSWNvbiddO1xuXHR9XG5cdHB1c2hNZXNzYWdlKCk6IHZvaWQge1xuXHRcdHZhciByb29tX2lkID0gdGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRSb29tSUQ7XG5cdFx0dmFyIHVzZXIgPSB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlcjtcblx0XHRpZih0aGlzLnN0cj09XCJcIil7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnB1c2hNZXNzYWdlT25Sb29tKHJvb21faWQsIHVzZXIsIHRoaXMuc3RyKTtcblx0XHR0aGlzLnJlbW92ZVN0cmluZygpO1xuXHRcdHZhciBvZmZzZXQgPSB0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsYWJsZUhlaWdodDtcblx0XHR0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsVG9WZXJ0aWNhbE9mZnNldChvZmZzZXQsIGZhbHNlKTtcblx0fVxuICAgIHJlbW92ZVN0cmluZygpOiB2b2lkIHsgICAgICAgIFxuICAgICAgICB0aGlzLnN0ciA9IFwiXCI7XG5cdH1cbn0iXX0=