"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FloatButtonComponent = /** @class */ (function () {
    function FloatButtonComponent() {
        this.tap = new core_1.EventEmitter();
        this.buttonState = "float-btn up";
    }
    FloatButtonComponent.prototype.ngOnInit = function () {
    };
    FloatButtonComponent.prototype.onTap = function (args) {
        this.tap.emit(args);
        if (args.view.className === 'float-btn down') {
            args.view.className = 'float-btn up';
            this.buttonState = 'float-btn up';
        }
        else {
            args.view.className = 'float-btn down';
            this.buttonState = 'float-btn down';
        }
    };
    FloatButtonComponent.prototype.onTouch = function (args) {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FloatButtonComponent.prototype, "text", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], FloatButtonComponent.prototype, "tap", void 0);
    FloatButtonComponent = __decorate([
        core_1.Component({
            selector: "FloatButton",
            moduleId: module.id,
            templateUrl: "./float-button.component.html",
            styleUrls: ['./float-button.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], FloatButtonComponent);
    return FloatButtonComponent;
}());
exports.FloatButtonComponent = FloatButtonComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXQtYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZsb2F0LWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBc0c7QUFRdEc7SUFLQztRQUhVLFFBQUcsR0FBc0IsSUFBSSxtQkFBWSxFQUFPLENBQUM7UUFJMUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUE7SUFDbEMsQ0FBQztJQUVELHVDQUFRLEdBQVI7SUFDQSxDQUFDO0lBQ0Qsb0NBQUssR0FBTCxVQUFNLElBQUk7UUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLGdCQUFnQixFQUFFO1lBQzdDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLGNBQWMsQ0FBQztZQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQztTQUNsQzthQUNJO1lBQ0osSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLENBQUM7WUFDdkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQztTQUNwQztJQUNGLENBQUM7SUFDRCxzQ0FBTyxHQUFQLFVBQVEsSUFBSTtJQUNaLENBQUM7SUF0QlE7UUFBUixZQUFLLEVBQUU7O3NEQUFjO0lBQ1o7UUFBVCxhQUFNLEVBQUU7a0NBQU0sbUJBQVk7cURBQWdDO0lBRi9DLG9CQUFvQjtRQU5oQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLGFBQWE7WUFDdkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7U0FDM0MsQ0FBQzs7T0FDVyxvQkFBb0IsQ0F3QmhDO0lBQUQsMkJBQUM7Q0FBQSxBQXhCRCxJQXdCQztBQXhCWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBTdGFja0xheW91dCB9IGZyb20gXCJ1aS9sYXlvdXRzL3N0YWNrLWxheW91dFwiO1xyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogXCJGbG9hdEJ1dHRvblwiLFxyXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcblx0dGVtcGxhdGVVcmw6IFwiLi9mbG9hdC1idXR0b24uY29tcG9uZW50Lmh0bWxcIixcclxuXHRzdHlsZVVybHM6IFsnLi9mbG9hdC1idXR0b24uY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBGbG9hdEJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0QElucHV0KCkgdGV4dDogc3RyaW5nO1xyXG5cdEBPdXRwdXQoKSB0YXA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblx0cHVibGljIGJ1dHRvbjogU3RhY2tMYXlvdXQ7XHJcblx0YnV0dG9uU3RhdGU6IHN0cmluZztcclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMuYnV0dG9uU3RhdGUgPSBcImZsb2F0LWJ0biB1cFwiXHJcblx0fVxyXG5cclxuXHRuZ09uSW5pdCgpOiB2b2lkIHtcclxuXHR9XHJcblx0b25UYXAoYXJncykge1xyXG5cdFx0dGhpcy50YXAuZW1pdChhcmdzKTtcclxuXHRcdGlmIChhcmdzLnZpZXcuY2xhc3NOYW1lID09PSAnZmxvYXQtYnRuIGRvd24nKSB7XHJcblx0XHRcdGFyZ3Mudmlldy5jbGFzc05hbWUgPSAnZmxvYXQtYnRuIHVwJztcclxuXHRcdFx0dGhpcy5idXR0b25TdGF0ZSA9ICdmbG9hdC1idG4gdXAnO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSB7XHJcblx0XHRcdGFyZ3Mudmlldy5jbGFzc05hbWUgPSAnZmxvYXQtYnRuIGRvd24nO1xyXG5cdFx0XHR0aGlzLmJ1dHRvblN0YXRlID0gJ2Zsb2F0LWJ0biBkb3duJztcclxuXHRcdH1cclxuXHR9XHJcblx0b25Ub3VjaChhcmdzKSB7XHJcblx0fVxyXG59Il19