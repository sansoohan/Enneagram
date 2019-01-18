"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ChildButton3Component = /** @class */ (function () {
    function ChildButton3Component() {
        this.tap = new core_1.EventEmitter();
        this.floatButtonOn = false;
    }
    ChildButton3Component.prototype.ngOnInit = function () {
    };
    ChildButton3Component.prototype.onLoaded = function (args) {
        this.args = args;
    };
    ChildButton3Component.prototype.drawerOpen = function (drawer) {
        if (drawer) {
            this.args.object.className = 'child-btn drawer-down';
        }
        else {
            this.args.object.className = 'child-btn drawer-up';
        }
    };
    ChildButton3Component.prototype.onTap = function (args) {
        if (this.floatButtonOn) {
            this.tap.emit(args);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ChildButton3Component.prototype, "text", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ChildButton3Component.prototype, "tap", void 0);
    ChildButton3Component = __decorate([
        core_1.Component({
            selector: "ChildButton3",
            moduleId: module.id,
            templateUrl: "./child-button3.component.html",
            styleUrls: ['./child-button3.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], ChildButton3Component);
    return ChildButton3Component;
}());
exports.ChildButton3Component = ChildButton3Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpbGQtYnV0dG9uMy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGlsZC1idXR0b24zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwRjtBQVMxRjtJQU1DO1FBSFUsUUFBRyxHQUFzQixJQUFJLG1CQUFZLEVBQU8sQ0FBQztRQUNwRCxrQkFBYSxHQUFZLEtBQUssQ0FBQztJQUd0QyxDQUFDO0lBRUQsd0NBQVEsR0FBUjtJQUNBLENBQUM7SUFDRCx3Q0FBUSxHQUFSLFVBQVMsSUFBSTtRQUNaLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ2xCLENBQUM7SUFDTSwwQ0FBVSxHQUFqQixVQUFrQixNQUFlO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsdUJBQXVCLENBQUM7UUFDdEQsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDO1FBQ3BELENBQUM7SUFDRixDQUFDO0lBQ0QscUNBQUssR0FBTCxVQUFNLElBQUk7UUFDVCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUEsQ0FBQztZQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQixDQUFDO0lBQ0YsQ0FBQztJQXhCUTtRQUFSLFlBQUssRUFBRTs7dURBQWM7SUFDWjtRQUFULGFBQU0sRUFBRTtrQ0FBTSxtQkFBWTtzREFBZ0M7SUFIL0MscUJBQXFCO1FBTmpDLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsY0FBYztZQUN4QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGdDQUFnQztZQUM3QyxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztTQUM1QyxDQUFDOztPQUNXLHFCQUFxQixDQTJCakM7SUFBRCw0QkFBQztDQUFBLEFBM0JELElBMkJDO0FBM0JZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIE9uSW5pdCwgVmlld0NoaWxkLCBJbnB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9jb3JlL3ZpZXdcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiBcIkNoaWxkQnV0dG9uM1wiLFxyXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcblx0dGVtcGxhdGVVcmw6IFwiLi9jaGlsZC1idXR0b24zLmNvbXBvbmVudC5odG1sXCIsXHJcblx0c3R5bGVVcmxzOiBbJy4vY2hpbGQtYnV0dG9uMy5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIENoaWxkQnV0dG9uM0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0YXJnczogYW55O1xyXG5cdEBJbnB1dCgpIHRleHQ6IHN0cmluZztcclxuXHRAT3V0cHV0KCkgdGFwOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cdHB1YmxpYyBmbG9hdEJ1dHRvbk9uOiBib29sZWFuID0gZmFsc2U7XHJcblx0cHJpdmF0ZSBkcmF3ZXI6IGJvb2xlYW47XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0fVxyXG5cclxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHR9XHJcblx0b25Mb2FkZWQoYXJncykge1xyXG5cdFx0dGhpcy5hcmdzID0gYXJncztcclxuXHR9XHJcblx0cHVibGljIGRyYXdlck9wZW4oZHJhd2VyOiBib29sZWFuKSB7XHJcblx0XHRpZiAoZHJhd2VyKSB7XHJcblx0XHRcdHRoaXMuYXJncy5vYmplY3QuY2xhc3NOYW1lID0gJ2NoaWxkLWJ0biBkcmF3ZXItZG93bic7XHJcblx0XHR9XHJcblx0XHRlbHNlIHtcclxuXHRcdFx0dGhpcy5hcmdzLm9iamVjdC5jbGFzc05hbWUgPSAnY2hpbGQtYnRuIGRyYXdlci11cCc7XHJcblx0XHR9XHJcblx0fVxyXG5cdG9uVGFwKGFyZ3MpIHtcclxuXHRcdGlmKHRoaXMuZmxvYXRCdXR0b25Pbil7XHJcblx0XHRcdHRoaXMudGFwLmVtaXQoYXJncyk7XHJcblx0XHR9XHJcblx0fVxyXG59Il19