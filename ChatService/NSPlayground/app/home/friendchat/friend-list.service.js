"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var friend_model_1 = require("./friend.model");
var mock_rooms_1 = require("./mock-rooms");
var FriendListService = /** @class */ (function () {
    function FriendListService() {
        this.selectedFriend = new friend_model_1.Friend();
        this.friends = mock_rooms_1.FriendList;
        this.thisUser = mock_rooms_1.USER;
        this.selectedFriend.email = "";
        this.selectedFriend.name = "";
        this.selectedFriend.profilePicsrc = "";
        this.selectedFriend.backgroundPicsrc = "";
        this.selectedFriend.enneagramNumber = 0;
    }
    FriendListService.prototype.getFriends = function () {
        return this.friends;
    };
    FriendListService.prototype.setSelectedFriend = function (selectedFriend) {
        this.selectedFriend = selectedFriend;
    };
    FriendListService.prototype.getSelectedFriend = function () {
        return this.selectedFriend;
    };
    FriendListService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], FriendListService);
    return FriendListService;
}());
exports.FriendListService = FriendListService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kLWxpc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZyaWVuZC1saXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0MsK0NBQXdDO0FBQ3hDLDJDQUFnRDtBQUdoRDtJQUtJO1FBRkEsbUJBQWMsR0FBVyxJQUFJLHFCQUFNLEVBQUUsQ0FBQztRQUdsQyxJQUFJLENBQUMsT0FBTyxHQUFHLHVCQUFVLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxpQkFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRU0sc0NBQVUsR0FBakI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQsNkNBQWlCLEdBQWpCLFVBQWtCLGNBQXNCO1FBQ3BDLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0lBQ3pDLENBQUM7SUFDRCw2Q0FBaUIsR0FBakI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUMvQixDQUFDO0lBeEJRLGlCQUFpQjtRQUQ3QixpQkFBVSxFQUFFOztPQUNBLGlCQUFpQixDQXlCN0I7SUFBRCx3QkFBQztDQUFBLEFBekJELElBeUJDO0FBekJZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4vdXNlci5tb2RlbFwiO1xyXG5pbXBvcnQgeyBGcmllbmQgfSBmcm9tIFwiLi9mcmllbmQubW9kZWxcIjtcclxuaW1wb3J0IHsgRnJpZW5kTGlzdCwgVVNFUiB9IGZyb20gXCIuL21vY2stcm9vbXNcIjtcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEZyaWVuZExpc3RTZXJ2aWNlIHtcclxuICAgIHRoaXNVc2VyOiBVc2VyO1xyXG4gICAgZnJpZW5kczogRnJpZW5kW107XHJcbiAgICBzZWxlY3RlZEZyaWVuZDogRnJpZW5kID0gbmV3IEZyaWVuZCgpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuZnJpZW5kcyA9IEZyaWVuZExpc3Q7XHJcbiAgICAgICAgdGhpcy50aGlzVXNlciA9IFVTRVI7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEZyaWVuZC5lbWFpbCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEZyaWVuZC5uYW1lID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkRnJpZW5kLnByb2ZpbGVQaWNzcmMgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRGcmllbmQuYmFja2dyb3VuZFBpY3NyYyA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEZyaWVuZC5lbm5lYWdyYW1OdW1iZXIgPSAwO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwdWJsaWMgZ2V0RnJpZW5kcygpOiBGcmllbmRbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZnJpZW5kcztcclxuICAgIH1cclxuICAgIFxyXG4gICAgc2V0U2VsZWN0ZWRGcmllbmQoc2VsZWN0ZWRGcmllbmQ6IEZyaWVuZCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRGcmllbmQgPSBzZWxlY3RlZEZyaWVuZDtcclxuICAgIH1cclxuICAgIGdldFNlbGVjdGVkRnJpZW5kKCk6IEZyaWVuZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRGcmllbmQ7XHJcbiAgICB9XHJcbn0iXX0=