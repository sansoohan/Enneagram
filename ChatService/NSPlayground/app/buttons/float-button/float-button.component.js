"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FloatButtonComponent = /** @class */ (function () {
    function FloatButtonComponent() {
        this.tap = new core_1.EventEmitter();
    }
    FloatButtonComponent.prototype.ngOnInit = function () {
    };
    FloatButtonComponent.prototype.onTap = function (args) {
        this.tap.emit(args);
        if (args.view.className === 'float-btn down') {
            args.view.className = 'float-btn up';
        }
        else {
            args.view.className = 'float-btn down';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXQtYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZsb2F0LWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBc0c7QUFRdEc7SUFJQztRQUZVLFFBQUcsR0FBc0IsSUFBSSxtQkFBWSxFQUFPLENBQUM7SUFHM0QsQ0FBQztJQUVELHVDQUFRLEdBQVI7SUFDQSxDQUFDO0lBQ0Qsb0NBQUssR0FBTCxVQUFNLElBQUk7UUFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDO1FBQ3RDLENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLGdCQUFnQixDQUFDO1FBQ3hDLENBQUM7SUFDRixDQUFDO0lBQ0Qsc0NBQU8sR0FBUCxVQUFRLElBQUk7SUFDWixDQUFDO0lBbEJRO1FBQVIsWUFBSyxFQUFFOztzREFBYztJQUNaO1FBQVQsYUFBTSxFQUFFO2tDQUFNLG1CQUFZO3FEQUFnQztJQUYvQyxvQkFBb0I7UUFOaEMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLFNBQVMsRUFBRSxDQUFDLDhCQUE4QixDQUFDO1NBQzNDLENBQUM7O09BQ1csb0JBQW9CLENBb0JoQztJQUFELDJCQUFDO0NBQUEsQUFwQkQsSUFvQkM7QUFwQlksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSBcInVpL2xheW91dHMvc3RhY2stbGF5b3V0XCI7XG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6IFwiRmxvYXRCdXR0b25cIixcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0dGVtcGxhdGVVcmw6IFwiLi9mbG9hdC1idXR0b24uY29tcG9uZW50Lmh0bWxcIixcblx0c3R5bGVVcmxzOiBbJy4vZmxvYXQtYnV0dG9uLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBGbG9hdEJ1dHRvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cdEBJbnB1dCgpIHRleHQ6IHN0cmluZztcblx0QE91dHB1dCgpIHRhcDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblx0cHVibGljIGJ1dHRvbjogU3RhY2tMYXlvdXQ7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHR9XG5cblx0bmdPbkluaXQoKTogdm9pZCB7XG5cdH1cblx0b25UYXAoYXJncykge1xuXHRcdHRoaXMudGFwLmVtaXQoYXJncyk7XG5cdFx0aWYgKGFyZ3Mudmlldy5jbGFzc05hbWUgPT09ICdmbG9hdC1idG4gZG93bicpIHtcblx0XHRcdGFyZ3Mudmlldy5jbGFzc05hbWUgPSAnZmxvYXQtYnRuIHVwJztcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRhcmdzLnZpZXcuY2xhc3NOYW1lID0gJ2Zsb2F0LWJ0biBkb3duJztcblx0XHR9XG5cdH1cblx0b25Ub3VjaChhcmdzKSB7XG5cdH1cbn0iXX0=