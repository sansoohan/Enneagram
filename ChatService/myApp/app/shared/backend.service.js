"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kinvey_nativescript_sdk_1 = require("kinvey-nativescript-sdk");
var BackendService = /** @class */ (function () {
    function BackendService() {
    }
    BackendService.setup = function () {
        kinvey_nativescript_sdk_1.Kinvey.init({
            appKey: BackendService.kinveyAppKey,
            appSecret: BackendService.kinveyAppSecret
        });
    };
    BackendService.kinveyAppKey = "kid_SyY8LYO8M";
    BackendService.kinveyAppSecret = "09282985d7c540f7b076a9c7fd884c77";
    BackendService.kinveyUsername = "admin";
    BackendService.kinveyPassword = "admin";
    return BackendService;
}());
exports.BackendService = BackendService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2VuZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFja2VuZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsbUVBQWlEO0FBRWpEO0lBQUE7SUFZQSxDQUFDO0lBTlUsb0JBQUssR0FBWjtRQUNJLGdDQUFNLENBQUMsSUFBSSxDQUFDO1lBQ1IsTUFBTSxFQUFFLGNBQWMsQ0FBQyxZQUFZO1lBQ25DLFNBQVMsRUFBRSxjQUFjLENBQUMsZUFBZTtTQUM1QyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBVk0sMkJBQVksR0FBRyxlQUFlLENBQUM7SUFDL0IsOEJBQWUsR0FBRyxrQ0FBa0MsQ0FBQztJQUNyRCw2QkFBYyxHQUFHLE9BQU8sQ0FBQztJQUN6Qiw2QkFBYyxHQUFHLE9BQU8sQ0FBQztJQVFwQyxxQkFBQztDQUFBLEFBWkQsSUFZQztBQVpZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IEtpbnZleSB9IGZyb20gXCJraW52ZXktbmF0aXZlc2NyaXB0LXNka1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhY2tlbmRTZXJ2aWNlIHtcclxuICAgIHN0YXRpYyBraW52ZXlBcHBLZXkgPSBcImtpZF9TeVk4TFlPOE1cIjtcclxuICAgIHN0YXRpYyBraW52ZXlBcHBTZWNyZXQgPSBcIjA5MjgyOTg1ZDdjNTQwZjdiMDc2YTljN2ZkODg0Yzc3XCI7XHJcbiAgICBzdGF0aWMga2ludmV5VXNlcm5hbWUgPSBcImFkbWluXCI7XHJcbiAgICBzdGF0aWMga2ludmV5UGFzc3dvcmQgPSBcImFkbWluXCI7XHJcblxyXG4gICAgc3RhdGljIHNldHVwKCkge1xyXG4gICAgICAgIEtpbnZleS5pbml0KHtcclxuICAgICAgICAgICAgYXBwS2V5OiBCYWNrZW5kU2VydmljZS5raW52ZXlBcHBLZXksXHJcbiAgICAgICAgICAgIGFwcFNlY3JldDogQmFja2VuZFNlcnZpY2Uua2ludmV5QXBwU2VjcmV0XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19