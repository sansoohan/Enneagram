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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXQtYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZsb2F0LWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBc0c7QUFRdEc7SUFLQztRQUhVLFFBQUcsR0FBc0IsSUFBSSxtQkFBWSxFQUFPLENBQUM7UUFJMUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUE7SUFDbEMsQ0FBQztJQUVELHVDQUFRLEdBQVI7SUFDQSxDQUFDO0lBQ0Qsb0NBQUssR0FBTCxVQUFNLElBQUk7UUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDO1FBQ25DLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLGdCQUFnQixDQUFDO1lBQ3ZDLElBQUksQ0FBQyxXQUFXLEdBQUcsZ0JBQWdCLENBQUM7UUFDckMsQ0FBQztJQUNGLENBQUM7SUFDRCxzQ0FBTyxHQUFQLFVBQVEsSUFBSTtJQUNaLENBQUM7SUF0QlE7UUFBUixZQUFLLEVBQUU7O3NEQUFjO0lBQ1o7UUFBVCxhQUFNLEVBQUU7a0NBQU0sbUJBQVk7cURBQWdDO0lBRi9DLG9CQUFvQjtRQU5oQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLGFBQWE7WUFDdkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7U0FDM0MsQ0FBQzs7T0FDVyxvQkFBb0IsQ0F3QmhDO0lBQUQsMkJBQUM7Q0FBQSxBQXhCRCxJQXdCQztBQXhCWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgU3RhY2tMYXlvdXQgfSBmcm9tIFwidWkvbGF5b3V0cy9zdGFjay1sYXlvdXRcIjtcbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogXCJGbG9hdEJ1dHRvblwiLFxuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHR0ZW1wbGF0ZVVybDogXCIuL2Zsb2F0LWJ1dHRvbi5jb21wb25lbnQuaHRtbFwiLFxuXHRzdHlsZVVybHM6IFsnLi9mbG9hdC1idXR0b24uY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEZsb2F0QnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblx0QElucHV0KCkgdGV4dDogc3RyaW5nO1xuXHRAT3V0cHV0KCkgdGFwOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXHRwdWJsaWMgYnV0dG9uOiBTdGFja0xheW91dDtcblx0YnV0dG9uU3RhdGU6IHN0cmluZztcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5idXR0b25TdGF0ZSA9IFwiZmxvYXQtYnRuIHVwXCJcblx0fVxuXG5cdG5nT25Jbml0KCk6IHZvaWQge1xuXHR9XG5cdG9uVGFwKGFyZ3MpIHtcblx0XHR0aGlzLnRhcC5lbWl0KGFyZ3MpO1xuXHRcdGlmIChhcmdzLnZpZXcuY2xhc3NOYW1lID09PSAnZmxvYXQtYnRuIGRvd24nKSB7XG5cdFx0XHRhcmdzLnZpZXcuY2xhc3NOYW1lID0gJ2Zsb2F0LWJ0biB1cCc7XG5cdFx0XHR0aGlzLmJ1dHRvblN0YXRlID0gJ2Zsb2F0LWJ0biB1cCc7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0YXJncy52aWV3LmNsYXNzTmFtZSA9ICdmbG9hdC1idG4gZG93bic7XG5cdFx0XHR0aGlzLmJ1dHRvblN0YXRlID0gJ2Zsb2F0LWJ0biBkb3duJztcblx0XHR9XG5cdH1cblx0b25Ub3VjaChhcmdzKSB7XG5cdH1cbn0iXX0=