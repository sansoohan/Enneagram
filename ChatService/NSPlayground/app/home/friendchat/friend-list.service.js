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
        this.selectedFriend.enneagramState = "";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kLWxpc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZyaWVuZC1saXN0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0MsK0NBQXdDO0FBQ3hDLDJDQUFnRDtBQUdoRDtJQUtJO1FBRkEsbUJBQWMsR0FBVyxJQUFJLHFCQUFNLEVBQUUsQ0FBQztRQUdsQyxJQUFJLENBQUMsT0FBTyxHQUFHLHVCQUFVLENBQUM7UUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxpQkFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUVNLHNDQUFVLEdBQWpCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVELDZDQUFpQixHQUFqQixVQUFrQixjQUFzQjtRQUNwQyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztJQUN6QyxDQUFDO0lBQ0QsNkNBQWlCLEdBQWpCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDL0IsQ0FBQztJQXpCUSxpQkFBaUI7UUFEN0IsaUJBQVUsRUFBRTs7T0FDQSxpQkFBaUIsQ0EwQjdCO0lBQUQsd0JBQUM7Q0FBQSxBQTFCRCxJQTBCQztBQTFCWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuL3VzZXIubW9kZWxcIjtcclxuaW1wb3J0IHsgRnJpZW5kIH0gZnJvbSBcIi4vZnJpZW5kLm1vZGVsXCI7XHJcbmltcG9ydCB7IEZyaWVuZExpc3QsIFVTRVIgfSBmcm9tIFwiLi9tb2NrLXJvb21zXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJkYXRhL29ic2VydmFibGUtYXJyYXlcIjtcclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRnJpZW5kTGlzdFNlcnZpY2Uge1xyXG4gICAgdGhpc1VzZXI6IFVzZXI7XHJcbiAgICBmcmllbmRzOiBGcmllbmRbXTtcclxuICAgIHNlbGVjdGVkRnJpZW5kOiBGcmllbmQgPSBuZXcgRnJpZW5kKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5mcmllbmRzID0gRnJpZW5kTGlzdDtcclxuICAgICAgICB0aGlzLnRoaXNVc2VyID0gVVNFUjtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkRnJpZW5kLmVtYWlsID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkRnJpZW5kLm5hbWUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRGcmllbmQucHJvZmlsZVBpY3NyYyA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEZyaWVuZC5iYWNrZ3JvdW5kUGljc3JjID0gXCJcIjtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkRnJpZW5kLmVubmVhZ3JhbU51bWJlciA9IDA7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEZyaWVuZC5lbm5lYWdyYW1TdGF0ZSA9IFwiXCI7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHB1YmxpYyBnZXRGcmllbmRzKCk6IEZyaWVuZFtdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5mcmllbmRzO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBzZXRTZWxlY3RlZEZyaWVuZChzZWxlY3RlZEZyaWVuZDogRnJpZW5kKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEZyaWVuZCA9IHNlbGVjdGVkRnJpZW5kO1xyXG4gICAgfVxyXG4gICAgZ2V0U2VsZWN0ZWRGcmllbmQoKTogRnJpZW5kIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEZyaWVuZDtcclxuICAgIH1cclxufSJdfQ==