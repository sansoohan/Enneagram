"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// this import should be first in order to load some required settings (like globals and reflect-metadata)
var platform_1 = require("nativescript-angular/platform");
var core_1 = require("@angular/core");
var app_module_1 = require("./app.module");
var firebase = require("nativescript-plugin-firebase");
core_1.enableProdMode();
platform_1.platformNativeScriptDynamic().bootstrapModule(app_module_1.AppModule);
firebase.init({
    onPushTokenReceivedCallback: function (token) {
        console.log("Firebase push token: " + token);
    },
    onMessageReceivedCallback: function (message) {
        alert(message.title);
    },
    //persist should be set to false as otherwise numbers aren't returned during livesync
    persist: true,
    onAuthStateChanged: function (data) {
        console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
        if (data.loggedIn) {
            console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
        }
    }
    //storageBucket: 'gs://yowwlr.appspot.com',
}).then(function (instance) {
    console.log("firebase.init done");
}, function (error) {
    console.log("firebase.init error: " + error);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwR0FBMEc7QUFDMUcsMERBQTRFO0FBQzVFLHNDQUE2QztBQUU3QywyQ0FBeUM7QUFDekMsdURBQTBEO0FBQzFELHFCQUFjLEVBQUUsQ0FBQztBQUNqQixzQ0FBMkIsRUFBRSxDQUFDLGVBQWUsQ0FBQyxzQkFBUyxDQUFDLENBQUM7QUFDekQsUUFBUSxDQUFDLElBQUksQ0FBQztJQUNWLDJCQUEyQixFQUFFLFVBQVMsS0FBSztRQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFDRCx5QkFBeUIsRUFBRSxVQUFTLE9BQU87UUFDdkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQ0QscUZBQXFGO0lBQ3JGLE9BQU8sRUFBRSxJQUFJO0lBQ2Isa0JBQWtCLEVBQUUsVUFBUyxJQUFJO1FBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDbEYsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN0RixDQUFDO0lBQ0wsQ0FBQztJQUNELDJDQUEyQztDQUM5QyxDQUFDLENBQUMsSUFBSSxDQUNILFVBQVUsUUFBUTtJQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDcEMsQ0FBQyxFQUNELFVBQVUsS0FBSztJQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEdBQUcsS0FBSyxDQUFDLENBQUM7QUFDL0MsQ0FBQyxDQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0aGlzIGltcG9ydCBzaG91bGQgYmUgZmlyc3QgaW4gb3JkZXIgdG8gbG9hZCBzb21lIHJlcXVpcmVkIHNldHRpbmdzIChsaWtlIGdsb2JhbHMgYW5kIHJlZmxlY3QtbWV0YWRhdGEpXHJcbmltcG9ydCB7IHBsYXRmb3JtTmF0aXZlU2NyaXB0RHluYW1pYyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9wbGF0Zm9ybVwiO1xyXG5pbXBvcnQge2VuYWJsZVByb2RNb2RlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEFwcE1vZHVsZSB9IGZyb20gXCIuL2FwcC5tb2R1bGVcIjtcclxuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XHJcbmVuYWJsZVByb2RNb2RlKCk7XHJcbnBsYXRmb3JtTmF0aXZlU2NyaXB0RHluYW1pYygpLmJvb3RzdHJhcE1vZHVsZShBcHBNb2R1bGUpO1xyXG5maXJlYmFzZS5pbml0KHtcclxuICAgIG9uUHVzaFRva2VuUmVjZWl2ZWRDYWxsYmFjazogZnVuY3Rpb24odG9rZW4pIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkZpcmViYXNlIHB1c2ggdG9rZW46IFwiICsgdG9rZW4pO1xyXG4gICAgfSxcclxuICAgIG9uTWVzc2FnZVJlY2VpdmVkQ2FsbGJhY2s6IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcclxuICAgICAgICBhbGVydChtZXNzYWdlLnRpdGxlKTtcclxuICAgIH0sXHJcbiAgICAvL3BlcnNpc3Qgc2hvdWxkIGJlIHNldCB0byBmYWxzZSBhcyBvdGhlcndpc2UgbnVtYmVycyBhcmVuJ3QgcmV0dXJuZWQgZHVyaW5nIGxpdmVzeW5jXHJcbiAgICBwZXJzaXN0OiB0cnVlLFxyXG4gICAgb25BdXRoU3RhdGVDaGFuZ2VkOiBmdW5jdGlvbihkYXRhKSB7IC8vIG9wdGlvbmFsIGJ1dCB1c2VmdWwgdG8gaW1tZWRpYXRlbHkgcmUtbG9nb24gdGhlIHVzZXIgd2hlbiBoZSByZS12aXNpdHMgeW91ciBhcHBcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhLmxvZ2dlZEluID8gXCJMb2dnZWQgaW4gdG8gZmlyZWJhc2VcIiA6IFwiTG9nZ2VkIG91dCBmcm9tIGZpcmViYXNlXCIpO1xyXG4gICAgICAgIGlmIChkYXRhLmxvZ2dlZEluKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInVzZXIncyBlbWFpbCBhZGRyZXNzOiBcIiArIChkYXRhLnVzZXIuZW1haWwgPyBkYXRhLnVzZXIuZW1haWwgOiBcIk4vQVwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy9zdG9yYWdlQnVja2V0OiAnZ3M6Ly95b3d3bHIuYXBwc3BvdC5jb20nLFxyXG59KS50aGVuKFxyXG4gICAgZnVuY3Rpb24gKGluc3RhbmNlKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZmlyZWJhc2UuaW5pdCBkb25lXCIpO1xyXG4gICAgfSxcclxuICAgIGZ1bmN0aW9uIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImZpcmViYXNlLmluaXQgZXJyb3I6IFwiICsgZXJyb3IpO1xyXG4gICAgfVxyXG4pOyJdfQ==