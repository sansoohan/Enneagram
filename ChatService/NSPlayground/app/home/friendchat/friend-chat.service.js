"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var mock_rooms_1 = require("./mock-rooms");
var FriendChatService = /** @class */ (function () {
    function FriendChatService() {
        this.rooms = mock_rooms_1.RoomList;
        for (var i = 0; i < this.rooms.length; i++) {
            this.updateBottomMessage(this.rooms[i]);
        }
        FriendChatService_1.nextID = this.rooms.length;
    }
    FriendChatService_1 = FriendChatService;
    FriendChatService.prototype.updateBottomMessage = function (room) {
        room.bottomMessage = room.messages[room.messages.length - 1].contents;
    };
    FriendChatService.prototype.addRoom = function (room) {
        this.rooms.push(room);
    };
    FriendChatService.prototype.getRooms = function () {
        return this.rooms;
    };
    FriendChatService.prototype.getSelectedRoom = function () {
        return this.selectedRoom;
    };
    FriendChatService.prototype.setSelectedRoom = function (room) {
        this.selectedRoom = room;
    };
    FriendChatService = FriendChatService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], FriendChatService);
    return FriendChatService;
    var FriendChatService_1;
}());
exports.FriendChatService = FriendChatService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kLWNoYXQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZyaWVuZC1jaGF0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0MsMkNBQXdDO0FBR3hDO0lBYUk7UUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLHFCQUFRLENBQUM7UUFDdEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUNELG1CQUFpQixDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUNqRCxDQUFDOzBCQW5CUSxpQkFBaUI7SUFvQjFCLCtDQUFtQixHQUFuQixVQUFvQixJQUFVO1FBQzFCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDMUUsQ0FBQztJQUNNLG1DQUFPLEdBQWQsVUFBZSxJQUFVO1FBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFDTSxvQ0FBUSxHQUFmO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVNLDJDQUFlLEdBQXRCO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUVNLDJDQUFlLEdBQXRCLFVBQXVCLElBQVU7UUFDN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDN0IsQ0FBQztJQXBDUSxpQkFBaUI7UUFEN0IsaUJBQVUsRUFBRTs7T0FDQSxpQkFBaUIsQ0FxQzdCO0lBQUQsd0JBQUM7O0NBQUEsQUFyQ0QsSUFxQ0M7QUFyQ1ksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFJvb20gfSBmcm9tIFwiLi9yb29tLm1vZGVsXCI7XHJcbmltcG9ydCB7IFJvb21MaXN0IH0gZnJvbSBcIi4vbW9jay1yb29tc1wiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRnJpZW5kQ2hhdFNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSBzZWxlY3RlZFJvb206IFJvb207XHJcbiAgICBwcml2YXRlIHJvb21zOiBSb29tW107XHJcbiAgICBzdGF0aWMgbmV4dElEOiBudW1iZXI7XHJcbiAgICBmcmllbmRzOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBlbWFpbDogc3RyaW5nLFxyXG4gICAgICAgICAgICBlbm5lYWdyYW1OdW1iZXI6IG51bWJlcixcclxuICAgICAgICB9XHJcbiAgICBdXHJcblxyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLnJvb21zID0gUm9vbUxpc3Q7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJvb21zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQm90dG9tTWVzc2FnZSh0aGlzLnJvb21zW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgRnJpZW5kQ2hhdFNlcnZpY2UubmV4dElEID0gdGhpcy5yb29tcy5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVCb3R0b21NZXNzYWdlKHJvb206IFJvb20pOiB2b2lkIHtcclxuICAgICAgICByb29tLmJvdHRvbU1lc3NhZ2UgPSByb29tLm1lc3NhZ2VzW3Jvb20ubWVzc2FnZXMubGVuZ3RoIC0gMV0uY29udGVudHM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkUm9vbShyb29tOiBSb29tKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yb29tcy5wdXNoKHJvb20pO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFJvb21zKCk6IFJvb21bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm9vbXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFNlbGVjdGVkUm9vbSgpOiBSb29tIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZFJvb207XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFNlbGVjdGVkUm9vbShyb29tOiBSb29tKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFJvb20gPSByb29tO1xyXG4gICAgfVxyXG59Il19