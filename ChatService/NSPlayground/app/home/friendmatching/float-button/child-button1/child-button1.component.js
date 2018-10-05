"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ChildButton1Component = /** @class */ (function () {
    function ChildButton1Component() {
    }
    ChildButton1Component.prototype.ngOnInit = function () {
    };
    ChildButton1Component.prototype.onTap = function (args) {
        if (args.view.className === 'child-btn down') {
            args.view.className = 'child-btn up';
        }
        else {
            args.view.className = 'child-btn down';
        }
    };
    ChildButton1Component.prototype.onTouch = function (args) {
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpbGQtYnV0dG9uMS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGlsZC1idXR0b24xLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQVFsRDtJQUNDO0lBQ0EsQ0FBQztJQUVELHdDQUFRLEdBQVI7SUFDQSxDQUFDO0lBQ0QscUNBQUssR0FBTCxVQUFNLElBQUk7UUFDVCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDO1FBQ3RDLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLGdCQUFnQixDQUFDO1FBQ3hDLENBQUM7SUFDRixDQUFDO0lBQ0QsdUNBQU8sR0FBUCxVQUFRLElBQUk7SUFDWixDQUFDO0lBZlcscUJBQXFCO1FBTmpDLGdCQUFTLENBQUM7WUFDVixRQUFRLEVBQUUsY0FBYztZQUN4QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLGdDQUFnQztZQUM3QyxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztTQUM1QyxDQUFDOztPQUNXLHFCQUFxQixDQWdCakM7SUFBRCw0QkFBQztDQUFBLEFBaEJELElBZ0JDO0FBaEJZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG5cdHNlbGVjdG9yOiBcIkNoaWxkQnV0dG9uMVwiLFxyXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcblx0dGVtcGxhdGVVcmw6IFwiLi9jaGlsZC1idXR0b24xLmNvbXBvbmVudC5odG1sXCIsXHJcblx0c3R5bGVVcmxzOiBbJy4vY2hpbGQtYnV0dG9uMS5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIENoaWxkQnV0dG9uMUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0fVxyXG5cclxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHR9XHJcblx0b25UYXAoYXJncykge1xyXG5cdFx0aWYgKGFyZ3Mudmlldy5jbGFzc05hbWUgPT09ICdjaGlsZC1idG4gZG93bicpIHtcclxuXHRcdFx0YXJncy52aWV3LmNsYXNzTmFtZSA9ICdjaGlsZC1idG4gdXAnO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGFyZ3Mudmlldy5jbGFzc05hbWUgPSAnY2hpbGQtYnRuIGRvd24nO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRvblRvdWNoKGFyZ3MpIHtcclxuXHR9XHJcbn0iXX0=