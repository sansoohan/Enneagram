"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// import { FriendList, USER } from "./mock-rooms";
var FriendListService = /** @class */ (function () {
    function FriendListService() {
        // this.selectedFriend.profile.email = "";
        // this.selectedFriend.profile.name = "";
        // this.selectedFriend.profile.profilePicsrc = "";
        // this.selectedFriend.profile.backgroundPicsrc = "";
        // this.selectedFriend.enneagram.number = 0;
        // this.selectedFriend.enneagram.state = "";
    }
    FriendListService.prototype.setSelectedFriendID = function (selectedFriendID) {
        this.selectedFriendID = selectedFriendID;
    };
    FriendListService.prototype.getSelectedFriendID = function () {
        return this.selectedFriendID;
    };
    FriendListService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], FriendListService);
    return FriendListService;
}());
exports.FriendListService = FriendListService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kLWxpc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZyaWVuZC1saXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsbURBQW1EO0FBR25EO0lBR0k7UUFDSSwwQ0FBMEM7UUFDMUMseUNBQXlDO1FBQ3pDLGtEQUFrRDtRQUNsRCxxREFBcUQ7UUFDckQsNENBQTRDO1FBQzVDLDRDQUE0QztJQUNoRCxDQUFDO0lBRUQsK0NBQW1CLEdBQW5CLFVBQW9CLGdCQUF3QjtRQUN4QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7SUFDN0MsQ0FBQztJQUNELCtDQUFtQixHQUFuQjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDakMsQ0FBQztJQWpCUSxpQkFBaUI7UUFEN0IsaUJBQVUsRUFBRTs7T0FDQSxpQkFBaUIsQ0FrQjdCO0lBQUQsd0JBQUM7Q0FBQSxBQWxCRCxJQWtCQztBQWxCWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuLy8gaW1wb3J0IHsgRnJpZW5kTGlzdCwgVVNFUiB9IGZyb20gXCIuL21vY2stcm9vbXNcIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZyaWVuZExpc3RTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBzZWxlY3RlZEZyaWVuZElEOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgLy8gdGhpcy5zZWxlY3RlZEZyaWVuZC5wcm9maWxlLmVtYWlsID0gXCJcIjtcclxuICAgICAgICAvLyB0aGlzLnNlbGVjdGVkRnJpZW5kLnByb2ZpbGUubmFtZSA9IFwiXCI7XHJcbiAgICAgICAgLy8gdGhpcy5zZWxlY3RlZEZyaWVuZC5wcm9maWxlLnByb2ZpbGVQaWNzcmMgPSBcIlwiO1xyXG4gICAgICAgIC8vIHRoaXMuc2VsZWN0ZWRGcmllbmQucHJvZmlsZS5iYWNrZ3JvdW5kUGljc3JjID0gXCJcIjtcclxuICAgICAgICAvLyB0aGlzLnNlbGVjdGVkRnJpZW5kLmVubmVhZ3JhbS5udW1iZXIgPSAwO1xyXG4gICAgICAgIC8vIHRoaXMuc2VsZWN0ZWRGcmllbmQuZW5uZWFncmFtLnN0YXRlID0gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTZWxlY3RlZEZyaWVuZElEKHNlbGVjdGVkRnJpZW5kSUQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRGcmllbmRJRCA9IHNlbGVjdGVkRnJpZW5kSUQ7XHJcbiAgICB9XHJcbiAgICBnZXRTZWxlY3RlZEZyaWVuZElEKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRGcmllbmRJRDtcclxuICAgIH1cclxufSJdfQ==