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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2VuZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFja2VuZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsbUVBQWlEO0FBRWpEO0lBQUE7SUFZQSxDQUFDO0lBTlUsb0JBQUssR0FBWjtRQUNJLGdDQUFNLENBQUMsSUFBSSxDQUFDO1lBQ1IsTUFBTSxFQUFFLGNBQWMsQ0FBQyxZQUFZO1lBQ25DLFNBQVMsRUFBRSxjQUFjLENBQUMsZUFBZTtTQUM1QyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBVk0sMkJBQVksR0FBRyxlQUFlLENBQUM7SUFDL0IsOEJBQWUsR0FBRyxrQ0FBa0MsQ0FBQztJQUNyRCw2QkFBYyxHQUFHLE9BQU8sQ0FBQztJQUN6Qiw2QkFBYyxHQUFHLE9BQU8sQ0FBQztJQVFwQyxxQkFBQztDQUFBLEFBWkQsSUFZQztBQVpZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBLaW52ZXkgfSBmcm9tIFwia2ludmV5LW5hdGl2ZXNjcmlwdC1zZGtcIjtcblxuZXhwb3J0IGNsYXNzIEJhY2tlbmRTZXJ2aWNlIHtcbiAgICBzdGF0aWMga2ludmV5QXBwS2V5ID0gXCJraWRfU3lZOExZTzhNXCI7XG4gICAgc3RhdGljIGtpbnZleUFwcFNlY3JldCA9IFwiMDkyODI5ODVkN2M1NDBmN2IwNzZhOWM3ZmQ4ODRjNzdcIjtcbiAgICBzdGF0aWMga2ludmV5VXNlcm5hbWUgPSBcImFkbWluXCI7XG4gICAgc3RhdGljIGtpbnZleVBhc3N3b3JkID0gXCJhZG1pblwiO1xuXG4gICAgc3RhdGljIHNldHVwKCkge1xuICAgICAgICBLaW52ZXkuaW5pdCh7XG4gICAgICAgICAgICBhcHBLZXk6IEJhY2tlbmRTZXJ2aWNlLmtpbnZleUFwcEtleSxcbiAgICAgICAgICAgIGFwcFNlY3JldDogQmFja2VuZFNlcnZpY2Uua2ludmV5QXBwU2VjcmV0XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==