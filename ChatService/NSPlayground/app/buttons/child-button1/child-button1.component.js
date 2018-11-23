"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ChildButton1Component = /** @class */ (function () {
    function ChildButton1Component() {
        this.tap = new core_1.EventEmitter();
        this.floatButtonOn = false;
    }
    ChildButton1Component.prototype.ngOnInit = function () {
    };
    ChildButton1Component.prototype.onLoaded = function (args) {
        this.args = args;
    };
    ChildButton1Component.prototype.drawerOpen = function (drawer) {
        if (drawer) {
            this.args.object.className = 'child-btn drawer-down';
        }
        else {
            this.args.object.className = 'child-btn drawer-up';
        }
    };
    ChildButton1Component.prototype.onTap = function (args) {
        if (this.floatButtonOn) {
            this.tap.emit(args);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ChildButton1Component.prototype, "text", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ChildButton1Component.prototype, "tap", void 0);
    ChildButton1Component = __decorate([
        core_1.Component({
            selector: "ChildButton1",
            moduleId: module.id,
            templateUrl: "./child-button1.component.html",
            styleUrls: ['./child-button1.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], ChildButton1Component);
    return ChildButton1Component;
}());
exports.ChildButton1Component = ChildButton1Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpbGQtYnV0dG9uMS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGlsZC1idXR0b24xLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEwRjtBQVMxRjtJQU1DO1FBSFUsUUFBRyxHQUFzQixJQUFJLG1CQUFZLEVBQU8sQ0FBQztRQUNwRCxrQkFBYSxHQUFZLEtBQUssQ0FBQztJQUd0QyxDQUFDO0lBRUQsd0NBQVEsR0FBUjtJQUNBLENBQUM7SUFDRCx3Q0FBUSxHQUFSLFVBQVMsSUFBSTtRQUNaLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ2xCLENBQUM7SUFDTSwwQ0FBVSxHQUFqQixVQUFrQixNQUFlO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsdUJBQXVCLENBQUM7UUFDdEQsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDO1FBQ3BELENBQUM7SUFDRixDQUFDO0lBQ0QscUNBQUssR0FBTCxVQUFNLElBQUk7UUFDVCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUEsQ0FBQztZQUN0QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQixDQUFDO0lBQ0YsQ0FBQztJQXhCUTtRQUFSLFlBQUssRUFBRTs7dURBQWM7SUFDWjtRQUFULGFBQU0sRUFBRTtrQ0FBTSxtQkFBWTtzREFBZ0M7SUFIL0MscUJBQXFCO1FBTmpDLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsY0FBYztZQUN4QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGdDQUFnQztZQUM3QyxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztTQUM1QyxDQUFDOztPQUNXLHFCQUFxQixDQTJCakM7SUFBRCw0QkFBQztDQUFBLEFBM0JELElBMkJDO0FBM0JZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQsIE9uSW5pdCwgVmlld0NoaWxkLCBJbnB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvY29yZS92aWV3XCI7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogXCJDaGlsZEJ1dHRvbjFcIixcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0dGVtcGxhdGVVcmw6IFwiLi9jaGlsZC1idXR0b24xLmNvbXBvbmVudC5odG1sXCIsXG5cdHN0eWxlVXJsczogWycuL2NoaWxkLWJ1dHRvbjEuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIENoaWxkQnV0dG9uMUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cdGFyZ3M6IGFueTtcblx0QElucHV0KCkgdGV4dDogc3RyaW5nO1xuXHRAT3V0cHV0KCkgdGFwOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXHRwdWJsaWMgZmxvYXRCdXR0b25PbjogYm9vbGVhbiA9IGZhbHNlO1xuXHRwcml2YXRlIGRyYXdlcjogYm9vbGVhbjtcblx0Y29uc3RydWN0b3IoKSB7XG5cdH1cblxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcblx0fVxuXHRvbkxvYWRlZChhcmdzKSB7XG5cdFx0dGhpcy5hcmdzID0gYXJncztcblx0fVxuXHRwdWJsaWMgZHJhd2VyT3BlbihkcmF3ZXI6IGJvb2xlYW4pIHtcblx0XHRpZiAoZHJhd2VyKSB7XG5cdFx0XHR0aGlzLmFyZ3Mub2JqZWN0LmNsYXNzTmFtZSA9ICdjaGlsZC1idG4gZHJhd2VyLWRvd24nO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHRoaXMuYXJncy5vYmplY3QuY2xhc3NOYW1lID0gJ2NoaWxkLWJ0biBkcmF3ZXItdXAnO1xuXHRcdH1cblx0fVxuXHRvblRhcChhcmdzKSB7XG5cdFx0aWYodGhpcy5mbG9hdEJ1dHRvbk9uKXtcblx0XHRcdHRoaXMudGFwLmVtaXQoYXJncyk7XG5cdFx0fVxuXHR9XG59Il19