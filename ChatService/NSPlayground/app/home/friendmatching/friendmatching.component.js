"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var child_button1_component_1 = require("../../buttons/child-button1/child-button1.component");
var child_button2_component_1 = require("../../buttons/child-button2/child-button2.component");
var child_button3_component_1 = require("../../buttons/child-button3/child-button3.component");
var FriendmatchingComponent = /** @class */ (function () {
    function FriendmatchingComponent() {
        this.countries = [
            { name: "Australia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/au.png" },
            { name: "Belgium", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/be.png" },
            { name: "Bulgaria", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/bg.png" },
            { name: "Canada", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ca.png" },
            { name: "Switzerland", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ch.png" },
            { name: "China", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/cn.png" },
            { name: "Czech Republic", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/cz.png" },
            { name: "Germany", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/de.png" },
            { name: "Spain", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/es.png" },
            { name: "Ethiopia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/et.png" },
            { name: "Croatia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/hr.png" },
            { name: "Hungary", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/hu.png" },
            { name: "Italy", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/it.png" },
            { name: "Jamaica", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/jm.png" },
            { name: "Romania", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ro.png" },
            { name: "Russia", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/ru.png" },
            { name: "United States", imageSrc: "https://play.nativescript.org/dist/assets/img/flags/us.png" },
        ];
        this.drawer = false;
    }
    FriendmatchingComponent.prototype.onItemTap = function (args) {
        console.log('Item with index: ' + args.index + ' tapped');
    };
    FriendmatchingComponent.prototype.ngOnInit = function () {
    };
    FriendmatchingComponent.prototype.onTap = function (args) {
        if (this.drawer) {
            this.drawer = false;
            this.childButton1.drawerOpen(this.drawer);
            this.childButton2.drawerOpen(this.drawer);
            this.childButton3.drawerOpen(this.drawer);
        }
        else {
            this.drawer = true;
            this.childButton1.drawerOpen(this.drawer);
            this.childButton2.drawerOpen(this.drawer);
            this.childButton3.drawerOpen(this.drawer);
        }
    };
    __decorate([
        core_1.ViewChild("childButton1"),
        __metadata("design:type", child_button1_component_1.ChildButton1Component)
    ], FriendmatchingComponent.prototype, "childButton1", void 0);
    __decorate([
        core_1.ViewChild("childButton2"),
        __metadata("design:type", child_button2_component_1.ChildButton2Component)
    ], FriendmatchingComponent.prototype, "childButton2", void 0);
    __decorate([
        core_1.ViewChild("childButton3"),
        __metadata("design:type", child_button3_component_1.ChildButton3Component)
    ], FriendmatchingComponent.prototype, "childButton3", void 0);
    FriendmatchingComponent = __decorate([
        core_1.Component({
            selector: "Friendmatching",
            moduleId: module.id,
            templateUrl: "./friendmatching.component.html",
            styleUrls: ['./friendmatching.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], FriendmatchingComponent);
    return FriendmatchingComponent;
}());
exports.FriendmatchingComponent = FriendmatchingComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJpZW5kbWF0Y2hpbmcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZnJpZW5kbWF0Y2hpbmcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0NBQTZEO0FBQzdELCtGQUE0RjtBQUM1RiwrRkFBNEY7QUFDNUYsK0ZBQTRGO0FBTzVGO0lBOEJJO1FBekJBLGNBQVMsR0FBeUM7WUFDOUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSw0REFBNEQsRUFBRTtZQUM3RixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLDREQUE0RCxFQUFFO1lBQzNGLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsNERBQTRELEVBQUU7WUFDNUYsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSw0REFBNEQsRUFBRTtZQUMxRixFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLDREQUE0RCxFQUFFO1lBQy9GLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsNERBQTRELEVBQUU7WUFDekYsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLDREQUE0RCxFQUFFO1lBQ2xHLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsNERBQTRELEVBQUU7WUFDM0YsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSw0REFBNEQsRUFBRTtZQUN6RixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLDREQUE0RCxFQUFFO1lBQzVGLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsNERBQTRELEVBQUU7WUFDM0YsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSw0REFBNEQsRUFBRTtZQUMzRixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLDREQUE0RCxFQUFFO1lBQ3pGLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsNERBQTRELEVBQUU7WUFDM0YsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSw0REFBNEQsRUFBRTtZQUMzRixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLDREQUE0RCxFQUFFO1lBQzFGLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsNERBQTRELEVBQUU7U0FDcEcsQ0FBQztRQVFFLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3hCLENBQUM7SUFQRCwyQ0FBUyxHQUFULFVBQVUsSUFBbUI7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFPSiwwQ0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUVTLHVDQUFLLEdBQVosVUFBYSxJQUFJO1FBQ2IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QyxDQUFDO1FBQ0QsSUFBSSxDQUFDLENBQUM7WUFDRixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QyxDQUFDO0lBQ0wsQ0FBQztJQWhEMEI7UUFBMUIsZ0JBQVMsQ0FBQyxjQUFjLENBQUM7a0NBQWUsK0NBQXFCO2lFQUFDO0lBQ3BDO1FBQTFCLGdCQUFTLENBQUMsY0FBYyxDQUFDO2tDQUFlLCtDQUFxQjtpRUFBQztJQUNwQztRQUExQixnQkFBUyxDQUFDLGNBQWMsQ0FBQztrQ0FBZSwrQ0FBcUI7aUVBQUM7SUFKdEQsdUJBQXVCO1FBTm5DLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsaUNBQWlDO1lBQzlDLFNBQVMsRUFBRSxDQUFDLGdDQUFnQyxDQUFDO1NBQzdDLENBQUM7O09BQ1csdUJBQXVCLENBbURuQztJQUFELDhCQUFDO0NBQUEsQUFuREQsSUFtREM7QUFuRFksMERBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSXRlbUV2ZW50RGF0YSB9IGZyb20gXCJ1aS9saXN0LXZpZXdcIlxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjFDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vYnV0dG9ucy9jaGlsZC1idXR0b24xL2NoaWxkLWJ1dHRvbjEuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjJDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vYnV0dG9ucy9jaGlsZC1idXR0b24yL2NoaWxkLWJ1dHRvbjIuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBDaGlsZEJ1dHRvbjNDb21wb25lbnQgfSBmcm9tIFwiLi4vLi4vYnV0dG9ucy9jaGlsZC1idXR0b24zL2NoaWxkLWJ1dHRvbjMuY29tcG9uZW50XCI7XG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6IFwiRnJpZW5kbWF0Y2hpbmdcIixcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0dGVtcGxhdGVVcmw6IFwiLi9mcmllbmRtYXRjaGluZy5jb21wb25lbnQuaHRtbFwiLFxuXHRzdHlsZVVybHM6IFsnLi9mcmllbmRtYXRjaGluZy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgRnJpZW5kbWF0Y2hpbmdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIHB1YmxpYyBkcmF3ZXI6IGJvb2xlYW47XG4gICAgQFZpZXdDaGlsZChcImNoaWxkQnV0dG9uMVwiKSBjaGlsZEJ1dHRvbjE6IENoaWxkQnV0dG9uMUNvbXBvbmVudDtcbiAgICBAVmlld0NoaWxkKFwiY2hpbGRCdXR0b24yXCIpIGNoaWxkQnV0dG9uMjogQ2hpbGRCdXR0b24yQ29tcG9uZW50O1xuICAgIEBWaWV3Q2hpbGQoXCJjaGlsZEJ1dHRvbjNcIikgY2hpbGRCdXR0b24zOiBDaGlsZEJ1dHRvbjNDb21wb25lbnQ7XG4gICAgY291bnRyaWVzOiB7IG5hbWU6IHN0cmluZywgaW1hZ2VTcmM6IHN0cmluZyB9W10gPSBbXG4gICAgICAgIHsgbmFtZTogXCJBdXN0cmFsaWFcIiwgaW1hZ2VTcmM6IFwiaHR0cHM6Ly9wbGF5Lm5hdGl2ZXNjcmlwdC5vcmcvZGlzdC9hc3NldHMvaW1nL2ZsYWdzL2F1LnBuZ1wiIH0sXG4gICAgICAgIHsgbmFtZTogXCJCZWxnaXVtXCIsIGltYWdlU3JjOiBcImh0dHBzOi8vcGxheS5uYXRpdmVzY3JpcHQub3JnL2Rpc3QvYXNzZXRzL2ltZy9mbGFncy9iZS5wbmdcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiQnVsZ2FyaWFcIiwgaW1hZ2VTcmM6IFwiaHR0cHM6Ly9wbGF5Lm5hdGl2ZXNjcmlwdC5vcmcvZGlzdC9hc3NldHMvaW1nL2ZsYWdzL2JnLnBuZ1wiIH0sXG4gICAgICAgIHsgbmFtZTogXCJDYW5hZGFcIiwgaW1hZ2VTcmM6IFwiaHR0cHM6Ly9wbGF5Lm5hdGl2ZXNjcmlwdC5vcmcvZGlzdC9hc3NldHMvaW1nL2ZsYWdzL2NhLnBuZ1wiIH0sXG4gICAgICAgIHsgbmFtZTogXCJTd2l0emVybGFuZFwiLCBpbWFnZVNyYzogXCJodHRwczovL3BsYXkubmF0aXZlc2NyaXB0Lm9yZy9kaXN0L2Fzc2V0cy9pbWcvZmxhZ3MvY2gucG5nXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIkNoaW5hXCIsIGltYWdlU3JjOiBcImh0dHBzOi8vcGxheS5uYXRpdmVzY3JpcHQub3JnL2Rpc3QvYXNzZXRzL2ltZy9mbGFncy9jbi5wbmdcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiQ3plY2ggUmVwdWJsaWNcIiwgaW1hZ2VTcmM6IFwiaHR0cHM6Ly9wbGF5Lm5hdGl2ZXNjcmlwdC5vcmcvZGlzdC9hc3NldHMvaW1nL2ZsYWdzL2N6LnBuZ1wiIH0sXG4gICAgICAgIHsgbmFtZTogXCJHZXJtYW55XCIsIGltYWdlU3JjOiBcImh0dHBzOi8vcGxheS5uYXRpdmVzY3JpcHQub3JnL2Rpc3QvYXNzZXRzL2ltZy9mbGFncy9kZS5wbmdcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiU3BhaW5cIiwgaW1hZ2VTcmM6IFwiaHR0cHM6Ly9wbGF5Lm5hdGl2ZXNjcmlwdC5vcmcvZGlzdC9hc3NldHMvaW1nL2ZsYWdzL2VzLnBuZ1wiIH0sXG4gICAgICAgIHsgbmFtZTogXCJFdGhpb3BpYVwiLCBpbWFnZVNyYzogXCJodHRwczovL3BsYXkubmF0aXZlc2NyaXB0Lm9yZy9kaXN0L2Fzc2V0cy9pbWcvZmxhZ3MvZXQucG5nXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIkNyb2F0aWFcIiwgaW1hZ2VTcmM6IFwiaHR0cHM6Ly9wbGF5Lm5hdGl2ZXNjcmlwdC5vcmcvZGlzdC9hc3NldHMvaW1nL2ZsYWdzL2hyLnBuZ1wiIH0sXG4gICAgICAgIHsgbmFtZTogXCJIdW5nYXJ5XCIsIGltYWdlU3JjOiBcImh0dHBzOi8vcGxheS5uYXRpdmVzY3JpcHQub3JnL2Rpc3QvYXNzZXRzL2ltZy9mbGFncy9odS5wbmdcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiSXRhbHlcIiwgaW1hZ2VTcmM6IFwiaHR0cHM6Ly9wbGF5Lm5hdGl2ZXNjcmlwdC5vcmcvZGlzdC9hc3NldHMvaW1nL2ZsYWdzL2l0LnBuZ1wiIH0sXG4gICAgICAgIHsgbmFtZTogXCJKYW1haWNhXCIsIGltYWdlU3JjOiBcImh0dHBzOi8vcGxheS5uYXRpdmVzY3JpcHQub3JnL2Rpc3QvYXNzZXRzL2ltZy9mbGFncy9qbS5wbmdcIiB9LFxuICAgICAgICB7IG5hbWU6IFwiUm9tYW5pYVwiLCBpbWFnZVNyYzogXCJodHRwczovL3BsYXkubmF0aXZlc2NyaXB0Lm9yZy9kaXN0L2Fzc2V0cy9pbWcvZmxhZ3Mvcm8ucG5nXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIlJ1c3NpYVwiLCBpbWFnZVNyYzogXCJodHRwczovL3BsYXkubmF0aXZlc2NyaXB0Lm9yZy9kaXN0L2Fzc2V0cy9pbWcvZmxhZ3MvcnUucG5nXCIgfSxcbiAgICAgICAgeyBuYW1lOiBcIlVuaXRlZCBTdGF0ZXNcIiwgaW1hZ2VTcmM6IFwiaHR0cHM6Ly9wbGF5Lm5hdGl2ZXNjcmlwdC5vcmcvZGlzdC9hc3NldHMvaW1nL2ZsYWdzL3VzLnBuZ1wiIH0sXG4gICAgXTtcblxuICAgIG9uSXRlbVRhcChhcmdzOiBJdGVtRXZlbnREYXRhKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdJdGVtIHdpdGggaW5kZXg6ICcgKyBhcmdzLmluZGV4ICsgJyB0YXBwZWQnKTtcbiAgICB9XG5cbiAgICBcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5kcmF3ZXIgPSBmYWxzZTtcbiAgICB9XG5cblx0bmdPbkluaXQoKTogdm9pZCB7XG5cdH1cblxuICAgIHB1YmxpYyBvblRhcChhcmdzKSB7XG4gICAgICAgIGlmICh0aGlzLmRyYXdlcikge1xuICAgICAgICAgICAgdGhpcy5kcmF3ZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRCdXR0b24xLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xuICAgICAgICAgICAgdGhpcy5jaGlsZEJ1dHRvbjIuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XG4gICAgICAgICAgICB0aGlzLmNoaWxkQnV0dG9uMy5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd2VyID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuY2hpbGRCdXR0b24xLmRyYXdlck9wZW4odGhpcy5kcmF3ZXIpO1xuICAgICAgICAgICAgdGhpcy5jaGlsZEJ1dHRvbjIuZHJhd2VyT3Blbih0aGlzLmRyYXdlcik7XG4gICAgICAgICAgICB0aGlzLmNoaWxkQnV0dG9uMy5kcmF3ZXJPcGVuKHRoaXMuZHJhd2VyKTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=