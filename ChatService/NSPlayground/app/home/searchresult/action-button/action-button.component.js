"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ActionButtonComponent = /** @class */ (function () {
    function ActionButtonComponent() {
        this.tap = new core_1.EventEmitter();
    }
    ActionButtonComponent.prototype.onTap = function (args) {
        this.tap.next(args);
    };
    ActionButtonComponent.prototype.updateTop = function (element, animate) {
        if (animate) {
            if (this.isArrow) {
                element.animate({
                    rotate: -45,
                    scale: { x: 0.45, y: 1 },
                    translate: { x: -5, y: 3 },
                    duration: 200
                }).catch(function () { });
            }
            else {
                this.animateToHamburger(element);
            }
        }
        else {
            element.rotate = -45;
            element.scaleX = 0.45;
            element.translateX = -5;
            element.translateY = 3;
        }
    };
    ActionButtonComponent.prototype.updateCenter = function (element, animate) {
        if (animate) {
            if (this.isArrow) {
                element.animate({
                    rotate: 0,
                    scale: { x: 0.9, y: 1 },
                    translate: { x: 1, y: 0 },
                    duration: 200
                }).catch(function () { });
            }
            else {
                this.animateToHamburger(element);
            }
        }
        else {
            element.rotate = 0;
            element.scaleX = 0.9;
            element.translateX = 1;
            element.translateY = 0;
        }
    };
    ActionButtonComponent.prototype.updateBottom = function (element, animate) {
        if (animate) {
            if (this.isArrow) {
                element.animate({
                    rotate: 45,
                    scale: { x: 0.45, y: 1 },
                    translate: { x: -5, y: -3 },
                    duration: 200
                }).catch(function () { });
            }
            else {
                this.animateToHamburger(element);
            }
        }
        else {
            element.rotate = 45;
            element.scaleX = 0.45;
            element.translateX = -5;
            element.translateY = -3;
        }
    };
    ActionButtonComponent.prototype.animateToHamburger = function (element) {
        element.animate({
            rotate: 0,
            scale: { x: 1, y: 1 },
            translate: { x: 0, y: 0 },
            duration: 200
        }).catch(function () { });
    };
    ActionButtonComponent.prototype.makeArrow = function () {
        this.updateTop(this._lineTopRef.nativeElement, false);
        this.updateCenter(this._lineCenterRef.nativeElement, false);
        this.updateBottom(this._lineBottomRef.nativeElement, false);
    };
    __decorate([
        core_1.Input('isArrow'),
        __metadata("design:type", Boolean)
    ], ActionButtonComponent.prototype, "isArrow", void 0);
    __decorate([
        core_1.Output("tap"),
        __metadata("design:type", core_1.EventEmitter)
    ], ActionButtonComponent.prototype, "tap", void 0);
    __decorate([
        core_1.ViewChild("lineTop"),
        __metadata("design:type", core_1.ElementRef)
    ], ActionButtonComponent.prototype, "_lineTopRef", void 0);
    __decorate([
        core_1.ViewChild("lineCenter"),
        __metadata("design:type", core_1.ElementRef)
    ], ActionButtonComponent.prototype, "_lineCenterRef", void 0);
    __decorate([
        core_1.ViewChild("lineBottom"),
        __metadata("design:type", core_1.ElementRef)
    ], ActionButtonComponent.prototype, "_lineBottomRef", void 0);
    ActionButtonComponent = __decorate([
        core_1.Component({
            selector: "ActionButton",
            moduleId: module.id,
            templateUrl: "./action-button.component.html",
            styleUrls: ['./action-button.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], ActionButtonComponent);
    return ActionButtonComponent;
}());
exports.ActionButtonComponent = ActionButtonComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhY3Rpb24tYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE4RjtBQVU5RjtJQVVDO1FBTmUsUUFBRyxHQUFtQyxJQUFJLG1CQUFZLEVBQW9CLENBQUM7SUFPMUYsQ0FBQztJQUVELHFDQUFLLEdBQUwsVUFBTSxJQUFzQjtRQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQseUNBQVMsR0FBVCxVQUFVLE9BQWEsRUFBRSxPQUFnQjtRQUN4QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLE9BQU8sQ0FBQyxPQUFPLENBQUM7b0JBQ2YsTUFBTSxFQUFFLENBQUMsRUFBRTtvQkFDWCxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQ3hCLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29CQUMxQixRQUFRLEVBQUUsR0FBRztpQkFDYixDQUFDLENBQUMsS0FBSyxDQUFDLGNBQVEsQ0FBQyxDQUFDLENBQUM7WUFDckIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNQLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNsQyxDQUFDO1FBQ0YsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNyQixPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUN0QixPQUFPLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFD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O1FBQzVELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQXhGaUI7UUFBakIsWUFBSyxDQUFDLFNBQVMsQ0FBQzs7MERBQWtCO0lBRXBCO1FBQWQsYUFBTSxDQUFDLEtBQUssQ0FBQztrQ0FBTSxtQkFBWTtzREFBMEQ7SUFFcEU7UUFBckIsZ0JBQVMsQ0FBQyxTQUFTLENBQUM7a0NBQWMsaUJBQVU7OERBQUM7SUFDckI7UUFBeEIsZ0JBQVMsQ0FBQyxZQUFZLENBQUM7a0NBQWlCLGlCQUFVO2lFQUFDO0lBQzNCO1FBQXhCLGdCQUFTLENBQUMsWUFBWSxDQUFDO2tDQUFpQixpQkFBVTtpRUFBQztJQVJ4QyxxQkFBcUI7UUFOakMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsZ0NBQWdDO1lBQzdDLFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO1NBQzVDLENBQUM7O09BQ1cscUJBQXFCLENBMkZqQztJQUFELDRCQUFDO0NBQUEsQUEzRkQsSUEyRkM7QUEzRlksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvY29yZS92aWV3XCI7XG5pbXBvcnQgeyBHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXNcIjtcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiBcIkFjdGlvbkJ1dHRvblwiLFxuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHR0ZW1wbGF0ZVVybDogXCIuL2FjdGlvbi1idXR0b24uY29tcG9uZW50Lmh0bWxcIixcblx0c3R5bGVVcmxzOiBbJy4vYWN0aW9uLWJ1dHRvbi5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQWN0aW9uQnV0dG9uQ29tcG9uZW50IHtcblxuXHRASW5wdXQoJ2lzQXJyb3cnKSBpc0Fycm93OiBib29sZWFuO1xuXG5cdEBPdXRwdXQoXCJ0YXBcIikgdGFwOiBFdmVudEVtaXR0ZXI8R2VzdHVyZUV2ZW50RGF0YT4gPSBuZXcgRXZlbnRFbWl0dGVyPEdlc3R1cmVFdmVudERhdGE+KCk7XG5cblx0QFZpZXdDaGlsZChcImxpbmVUb3BcIikgX2xpbmVUb3BSZWY6IEVsZW1lbnRSZWY7XG5cdEBWaWV3Q2hpbGQoXCJsaW5lQ2VudGVyXCIpIF9saW5lQ2VudGVyUmVmOiBFbGVtZW50UmVmO1xuXHRAVmlld0NoaWxkKFwibGluZUJvdHRvbVwiKSBfbGluZUJvdHRvbVJlZjogRWxlbWVudFJlZjtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0fVxuXG5cdG9uVGFwKGFyZ3M6IEdlc3R1cmVFdmVudERhdGEpIHtcblx0XHR0aGlzLnRhcC5uZXh0KGFyZ3MpO1xuXHR9XG5cblx0dXBkYXRlVG9wKGVsZW1lbnQ6IFZpZXcsIGFuaW1hdGU6IGJvb2xlYW4pIHtcblx0XHRpZiAoYW5pbWF0ZSkge1xuXHRcdFx0aWYgKHRoaXMuaXNBcnJvdykge1xuXHRcdFx0XHRlbGVtZW50LmFuaW1hdGUoe1xuXHRcdFx0XHRcdHJvdGF0ZTogLTQ1LFxuXHRcdFx0XHRcdHNjYWxlOiB7IHg6IDAuNDUsIHk6IDEgfSxcblx0XHRcdFx0XHR0cmFuc2xhdGU6IHsgeDogLTUsIHk6IDMgfSxcblx0XHRcdFx0XHRkdXJhdGlvbjogMjAwXG5cdFx0XHRcdH0pLmNhdGNoKCgpID0+IHsgfSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLmFuaW1hdGVUb0hhbWJ1cmdlcihlbGVtZW50KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZWxlbWVudC5yb3RhdGUgPSAtNDU7XG5cdFx0XHRlbGVtZW50LnNjYWxlWCA9IDAuNDU7XG5cdFx0XHRlbGVtZW50LnRyYW5zbGF0ZVggPSAtNTtcblx0XHRcdGVsZW1lbnQudHJhbnNsYXRlWSA9IDM7XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlQ2VudGVyKGVsZW1lbnQ6IFZpZXcsIGFuaW1hdGU6IGJvb2xlYW4pIHtcblx0XHRpZiAoYW5pbWF0ZSkge1xuXHRcdFx0aWYgKHRoaXMuaXNBcnJvdykge1xuXHRcdFx0XHRlbGVtZW50LmFuaW1hdGUoe1xuXHRcdFx0XHRcdHJvdGF0ZTogMCxcblx0XHRcdFx0XHRzY2FsZTogeyB4OiAwLjksIHk6IDEgfSxcblx0XHRcdFx0XHR0cmFuc2xhdGU6IHsgeDogMSwgeTogMCB9LFxuXHRcdFx0XHRcdGR1cmF0aW9uOiAyMDBcblx0XHRcdFx0fSkuY2F0Y2goKCkgPT4geyB9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuYW5pbWF0ZVRvSGFtYnVyZ2VyKGVsZW1lbnQpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRlbGVtZW50LnJvdGF0ZSA9IDA7XG5cdFx0XHRlbGVtZW50LnNjYWxlWCA9IDAuOTtcblx0XHRcdGVsZW1lbnQudHJhbnNsYXRlWCA9IDE7XG5cdFx0XHRlbGVtZW50LnRyYW5zbGF0ZVkgPSAwO1xuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZUJvdHRvbShlbGVtZW50OiBWaWV3LCBhbmltYXRlOiBib29sZWFuKSB7XG5cdFx0aWYgKGFuaW1hdGUpIHtcblx0XHRcdGlmICh0aGlzLmlzQXJyb3cpIHtcblx0XHRcdFx0ZWxlbWVudC5hbmltYXRlKHtcblx0XHRcdFx0XHRyb3RhdGU6IDQ1LFxuXHRcdFx0XHRcdHNjYWxlOiB7IHg6IDAuNDUsIHk6IDEgfSxcblx0XHRcdFx0XHR0cmFuc2xhdGU6IHsgeDogLTUsIHk6IC0zIH0sXG5cdFx0XHRcdFx0ZHVyYXRpb246IDIwMFxuXHRcdFx0XHR9KS5jYXRjaCgoKSA9PiB7IH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5hbmltYXRlVG9IYW1idXJnZXIoZWxlbWVudCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGVsZW1lbnQucm90YXRlID0gNDU7XG5cdFx0XHRlbGVtZW50LnNjYWxlWCA9IDAuNDU7XG5cdFx0XHRlbGVtZW50LnRyYW5zbGF0ZVggPSAtNTtcblx0XHRcdGVsZW1lbnQudHJhbnNsYXRlWSA9IC0zO1xuXHRcdH1cblx0fVxuXG5cdGFuaW1hdGVUb0hhbWJ1cmdlcihlbGVtZW50OiBWaWV3KSB7XG5cdFx0ZWxlbWVudC5hbmltYXRlKHtcblx0XHRcdHJvdGF0ZTogMCxcblx0XHRcdHNjYWxlOiB7IHg6IDEsIHk6IDEgfSxcblx0XHRcdHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXG5cdFx0XHRkdXJhdGlvbjogMjAwXG5cdFx0fSkuY2F0Y2goKCkgPT4geyB9KTtcblx0fVxuXG5cdHB1YmxpYyBtYWtlQXJyb3coKSB7XG5cdFx0dGhpcy51cGRhdGVUb3AodGhpcy5fbGluZVRvcFJlZi5uYXRpdmVFbGVtZW50LCBmYWxzZSk7XG5cdFx0dGhpcy51cGRhdGVDZW50ZXIodGhpcy5fbGluZUNlbnRlclJlZi5uYXRpdmVFbGVtZW50LCBmYWxzZSk7XG5cdFx0dGhpcy51cGRhdGVCb3R0b20odGhpcy5fbGluZUJvdHRvbVJlZi5uYXRpdmVFbGVtZW50LCBmYWxzZSk7XG5cdH1cbn0iXX0=