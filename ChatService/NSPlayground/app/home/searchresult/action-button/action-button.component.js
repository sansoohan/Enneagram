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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhY3Rpb24tYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE4RjtBQVU5RjtJQVVDO1FBTmUsUUFBRyxHQUFtQyxJQUFJLG1CQUFZLEVBQW9CLENBQUM7SUFPMUYsQ0FBQztJQUVELHFDQUFLLEdBQUwsVUFBTSxJQUFzQjtRQUMzQixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQseUNBQVMsR0FBVCxVQUFVLE9BQWEsRUFBRSxPQUFnQjtRQUN4QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLE9BQU8sQ0FBQyxPQUFPLENBQUM7b0JBQ2YsTUFBTSxFQUFFLENBQUMsRUFBRTtvQkFDWCxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7b0JBQ3hCLFNBQVMsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO29CQUMxQixRQUFRLEVBQUUsR0FBRztpQkFDYixDQUFDLENBQUMsS0FBSyxDQUFDLGNBQVEsQ0FBQyxDQUFDLENBQUM7WUFDckIsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNQLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNsQyxDQUFDO1FBQ0YsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNyQixPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUN0QixPQUFPLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFD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O1FBQzVELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQXhGaUI7UUFBakIsWUFBSyxDQUFDLFNBQVMsQ0FBQzs7MERBQWtCO0lBRXBCO1FBQWQsYUFBTSxDQUFDLEtBQUssQ0FBQztrQ0FBTSxtQkFBWTtzREFBMEQ7SUFFcEU7UUFBckIsZ0JBQVMsQ0FBQyxTQUFTLENBQUM7a0NBQWMsaUJBQVU7OERBQUM7SUFDckI7UUFBeEIsZ0JBQVMsQ0FBQyxZQUFZLENBQUM7a0NBQWlCLGlCQUFVO2lFQUFDO0lBQzNCO1FBQXhCLGdCQUFTLENBQUMsWUFBWSxDQUFDO2tDQUFpQixpQkFBVTtpRUFBQztJQVJ4QyxxQkFBcUI7UUFOakMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsZ0NBQWdDO1lBQzdDLFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO1NBQzVDLENBQUM7O09BQ1cscUJBQXFCLENBMkZqQztJQUFELDRCQUFDO0NBQUEsQUEzRkQsSUEyRkM7QUEzRlksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9jb3JlL3ZpZXdcIjtcclxuaW1wb3J0IHsgR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogXCJBY3Rpb25CdXR0b25cIixcclxuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG5cdHRlbXBsYXRlVXJsOiBcIi4vYWN0aW9uLWJ1dHRvbi5jb21wb25lbnQuaHRtbFwiLFxyXG5cdHN0eWxlVXJsczogWycuL2FjdGlvbi1idXR0b24uY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBY3Rpb25CdXR0b25Db21wb25lbnQge1xyXG5cclxuXHRASW5wdXQoJ2lzQXJyb3cnKSBpc0Fycm93OiBib29sZWFuO1xyXG5cclxuXHRAT3V0cHV0KFwidGFwXCIpIHRhcDogRXZlbnRFbWl0dGVyPEdlc3R1cmVFdmVudERhdGE+ID0gbmV3IEV2ZW50RW1pdHRlcjxHZXN0dXJlRXZlbnREYXRhPigpO1xyXG5cclxuXHRAVmlld0NoaWxkKFwibGluZVRvcFwiKSBfbGluZVRvcFJlZjogRWxlbWVudFJlZjtcclxuXHRAVmlld0NoaWxkKFwibGluZUNlbnRlclwiKSBfbGluZUNlbnRlclJlZjogRWxlbWVudFJlZjtcclxuXHRAVmlld0NoaWxkKFwibGluZUJvdHRvbVwiKSBfbGluZUJvdHRvbVJlZjogRWxlbWVudFJlZjtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0fVxyXG5cclxuXHRvblRhcChhcmdzOiBHZXN0dXJlRXZlbnREYXRhKSB7XHJcblx0XHR0aGlzLnRhcC5uZXh0KGFyZ3MpO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlVG9wKGVsZW1lbnQ6IFZpZXcsIGFuaW1hdGU6IGJvb2xlYW4pIHtcclxuXHRcdGlmIChhbmltYXRlKSB7XHJcblx0XHRcdGlmICh0aGlzLmlzQXJyb3cpIHtcclxuXHRcdFx0XHRlbGVtZW50LmFuaW1hdGUoe1xyXG5cdFx0XHRcdFx0cm90YXRlOiAtNDUsXHJcblx0XHRcdFx0XHRzY2FsZTogeyB4OiAwLjQ1LCB5OiAxIH0sXHJcblx0XHRcdFx0XHR0cmFuc2xhdGU6IHsgeDogLTUsIHk6IDMgfSxcclxuXHRcdFx0XHRcdGR1cmF0aW9uOiAyMDBcclxuXHRcdFx0XHR9KS5jYXRjaCgoKSA9PiB7IH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuYW5pbWF0ZVRvSGFtYnVyZ2VyKGVsZW1lbnQpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlbGVtZW50LnJvdGF0ZSA9IC00NTtcclxuXHRcdFx0ZWxlbWVudC5zY2FsZVggPSAwLjQ1O1xyXG5cdFx0XHRlbGVtZW50LnRyYW5zbGF0ZVggPSAtNTtcclxuXHRcdFx0ZWxlbWVudC50cmFuc2xhdGVZID0gMztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHVwZGF0ZUNlbnRlcihlbGVtZW50OiBWaWV3LCBhbmltYXRlOiBib29sZWFuKSB7XHJcblx0XHRpZiAoYW5pbWF0ZSkge1xyXG5cdFx0XHRpZiAodGhpcy5pc0Fycm93KSB7XHJcblx0XHRcdFx0ZWxlbWVudC5hbmltYXRlKHtcclxuXHRcdFx0XHRcdHJvdGF0ZTogMCxcclxuXHRcdFx0XHRcdHNjYWxlOiB7IHg6IDAuOSwgeTogMSB9LFxyXG5cdFx0XHRcdFx0dHJhbnNsYXRlOiB7IHg6IDEsIHk6IDAgfSxcclxuXHRcdFx0XHRcdGR1cmF0aW9uOiAyMDBcclxuXHRcdFx0XHR9KS5jYXRjaCgoKSA9PiB7IH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuYW5pbWF0ZVRvSGFtYnVyZ2VyKGVsZW1lbnQpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlbGVtZW50LnJvdGF0ZSA9IDA7XHJcblx0XHRcdGVsZW1lbnQuc2NhbGVYID0gMC45O1xyXG5cdFx0XHRlbGVtZW50LnRyYW5zbGF0ZVggPSAxO1xyXG5cdFx0XHRlbGVtZW50LnRyYW5zbGF0ZVkgPSAwO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dXBkYXRlQm90dG9tKGVsZW1lbnQ6IFZpZXcsIGFuaW1hdGU6IGJvb2xlYW4pIHtcclxuXHRcdGlmIChhbmltYXRlKSB7XHJcblx0XHRcdGlmICh0aGlzLmlzQXJyb3cpIHtcclxuXHRcdFx0XHRlbGVtZW50LmFuaW1hdGUoe1xyXG5cdFx0XHRcdFx0cm90YXRlOiA0NSxcclxuXHRcdFx0XHRcdHNjYWxlOiB7IHg6IDAuNDUsIHk6IDEgfSxcclxuXHRcdFx0XHRcdHRyYW5zbGF0ZTogeyB4OiAtNSwgeTogLTMgfSxcclxuXHRcdFx0XHRcdGR1cmF0aW9uOiAyMDBcclxuXHRcdFx0XHR9KS5jYXRjaCgoKSA9PiB7IH0pO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHRoaXMuYW5pbWF0ZVRvSGFtYnVyZ2VyKGVsZW1lbnQpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlbGVtZW50LnJvdGF0ZSA9IDQ1O1xyXG5cdFx0XHRlbGVtZW50LnNjYWxlWCA9IDAuNDU7XHJcblx0XHRcdGVsZW1lbnQudHJhbnNsYXRlWCA9IC01O1xyXG5cdFx0XHRlbGVtZW50LnRyYW5zbGF0ZVkgPSAtMztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGFuaW1hdGVUb0hhbWJ1cmdlcihlbGVtZW50OiBWaWV3KSB7XHJcblx0XHRlbGVtZW50LmFuaW1hdGUoe1xyXG5cdFx0XHRyb3RhdGU6IDAsXHJcblx0XHRcdHNjYWxlOiB7IHg6IDEsIHk6IDEgfSxcclxuXHRcdFx0dHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcclxuXHRcdFx0ZHVyYXRpb246IDIwMFxyXG5cdFx0fSkuY2F0Y2goKCkgPT4geyB9KTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBtYWtlQXJyb3coKSB7XHJcblx0XHR0aGlzLnVwZGF0ZVRvcCh0aGlzLl9saW5lVG9wUmVmLm5hdGl2ZUVsZW1lbnQsIGZhbHNlKTtcclxuXHRcdHRoaXMudXBkYXRlQ2VudGVyKHRoaXMuX2xpbmVDZW50ZXJSZWYubmF0aXZlRWxlbWVudCwgZmFsc2UpO1xyXG5cdFx0dGhpcy51cGRhdGVCb3R0b20odGhpcy5fbGluZUJvdHRvbVJlZi5uYXRpdmVFbGVtZW50LCBmYWxzZSk7XHJcblx0fVxyXG59Il19