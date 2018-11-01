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
        var offset = this.scrollView.scrollableHeight;
        this.scrollView.scrollToVerticalOffset(offset, false);
    };
    ChatRoomComponent.prototype.removeString = function () {
        this.str = "";
        console.log("You removed the string from app settings!");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC1yb29tLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNoYXQtcm9vbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNkQ7QUFDN0Qsc0RBQStEO0FBRS9ELDBFQUF3RTtBQUN4RSwrREFBaUQ7QUFDakQsdUVBQXFFO0FBQ3JFLDhDQUE0QztBQUM1QyxrQ0FBZSxDQUFDLFVBQVUsRUFBRSxjQUFNLE9BQUEsZ0NBQVEsRUFBUixDQUFRLENBQUMsQ0FBQztBQVU1QztJQUdDLDJCQUFvQixnQkFBa0MsRUFDN0MsZUFBZ0M7UUFEckIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUM3QyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFIekMsUUFBRyxHQUFXLEVBQUUsQ0FBQztJQUlkLENBQUM7SUFFRCxvQ0FBUSxHQUFSO1FBQ0YsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUosaUNBQUssR0FBTCxVQUFNLElBQXNCO1FBQzNCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsc0NBQVUsR0FBVixVQUFXLElBQVE7UUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUNELDRDQUFnQixHQUFoQixVQUFpQixJQUFJO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMvRyxDQUFDO0lBQ0QsdUNBQVcsR0FBWDtRQUNDLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDO1FBQ2xELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDO1FBQ3pDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUUsRUFBRSxDQUFDLENBQUEsQ0FBQztZQUNoQixNQUFNLENBQUM7UUFDUixDQUFDO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBQ0Usd0NBQVksR0FBWjtRQUNJLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFsQ3dCO1FBQXhCLGdCQUFTLENBQUMsWUFBWSxDQUFDO2tDQUFhLHdCQUFVO3lEQUFDO0lBRnBDLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw0QkFBNEI7WUFDekMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7U0FDeEMsQ0FBQzt5Q0FJcUMseUJBQWdCO1lBQzVCLGtDQUFlO09BSjdCLGlCQUFpQixDQXFDN0I7SUFBRCx3QkFBQztDQUFBLEFBckNELElBcUNDO0FBckNZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEdlc3R1cmVFdmVudERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9nZXN0dXJlc1wiO1xuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeSc7XG5pbXBvcnQgeyBDYXJkVmlldyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1jYXJkdmlldyc7XG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vLi4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xuaW1wb3J0IHsgU2Nyb2xsVmlldyB9IGZyb20gXCJ1aS9zY3JvbGwtdmlld1wiO1xucmVnaXN0ZXJFbGVtZW50KCdDYXJkVmlldycsICgpID0+IENhcmRWaWV3KTtcbmltcG9ydCAqIGFzIGFwcFNldHRpbmdzIGZyb20gXCJhcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogXCJDaGF0Um9vbVwiLFxuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHR0ZW1wbGF0ZVVybDogXCIuL2NoYXQtcm9vbS5jb21wb25lbnQuaHRtbFwiLFxuXHRzdHlsZVVybHM6IFsnLi9jaGF0LXJvb20uY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIENoYXRSb29tQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0c3RyOiBzdHJpbmcgPSBcIlwiO1xuXHRAVmlld0NoaWxkKFwic2Nyb2xsVmlld1wiKSBzY3JvbGxWaWV3OiBTY3JvbGxWaWV3O1xuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG5cdFx0cHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSxcblx0KXtcdH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXHRcdHZhciBvZmZzZXQgPSB0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsYWJsZUhlaWdodDtcblx0XHR0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsVG9WZXJ0aWNhbE9mZnNldChvZmZzZXQsIGZhbHNlKTtcbiAgICB9XG5cblx0b25UYXAoYXJnczogR2VzdHVyZUV2ZW50RGF0YSkge1xuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG5cdH1cblxuXHRnZXRNZXNzYWdlKGl0ZW06YW55KTogc3RyaW5ne1xuXHRcdHJldHVybiBpdGVtW09iamVjdC5rZXlzKGl0ZW0pWzBdXVsnbWVzc2FnZSddO1xuXHR9XG5cdGdldFByb2ZpbGVQaWNzcmMoaXRlbSl7XG5cdFx0cmV0dXJuIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnNlbGVjdGVkUm9vbVVzZXJzW2l0ZW1bT2JqZWN0LmtleXMoaXRlbSlbMF1dWyd1c2VyJ11dWydwcm9maWxlJ11bJ3Byb2ZpbGVQaWNzcmMnXTtcblx0fVxuXHRwdXNoTWVzc2FnZSgpOiB2b2lkIHtcblx0XHR2YXIgcm9vbV9pZCA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnNlbGVjdGVkUm9vbUlEO1xuXHRcdHZhciB1c2VyID0gdGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXI7XG5cdFx0aWYodGhpcy5zdHI9PVwiXCIpe1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5wdXNoTWVzc2FnZU9uUm9vbShyb29tX2lkLCB1c2VyLCB0aGlzLnN0cik7XG5cdFx0dGhpcy5yZW1vdmVTdHJpbmcoKTtcblx0XHR2YXIgb2Zmc2V0ID0gdGhpcy5zY3JvbGxWaWV3LnNjcm9sbGFibGVIZWlnaHQ7XG5cdFx0dGhpcy5zY3JvbGxWaWV3LnNjcm9sbFRvVmVydGljYWxPZmZzZXQob2Zmc2V0LCBmYWxzZSk7XG5cdH1cbiAgICByZW1vdmVTdHJpbmcoKTogdm9pZCB7ICAgICAgICBcbiAgICAgICAgdGhpcy5zdHIgPSBcIlwiO1xuICAgICAgICBjb25zb2xlLmxvZyhcIllvdSByZW1vdmVkIHRoZSBzdHJpbmcgZnJvbSBhcHAgc2V0dGluZ3MhXCIpO1xuXHR9XG59Il19