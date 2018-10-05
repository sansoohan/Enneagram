"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_1 = require("platform");
var enums_1 = require("ui/enums");
var gestures_1 = require("ui/gestures");
var page_1 = require("ui/page");
var application_1 = require("application");
// No support for Array#includes here
function includes(container, value) {
    var returnValue = false;
    var pos = container.indexOf(value);
    if (pos >= 0) {
        returnValue = true;
    }
    return returnValue;
}
var GestureRecognizer, Interop;
if (application_1.ios) {
    GestureRecognizer = NSObject;
    Interop = interop;
}
else {
    GestureRecognizer = /** @class */ (function () {
        function A() {
        }
        return A;
    }());
    Interop = { types: { id: void 0, void: void 0 } };
}
var HideGestureRecognizerImpl = /** @class */ (function (_super) {
    __extends(HideGestureRecognizerImpl, _super);
    function HideGestureRecognizerImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HideGestureRecognizerImpl.initWithOwner = function (owner) {
        var handler = new HideGestureRecognizerImpl();
        handler._owner = owner;
        return handler;
    };
    HideGestureRecognizerImpl.prototype.tap = function () {
        this._owner.ios.resignFirstResponder();
        if (this.func) {
            this.func();
        }
    };
    HideGestureRecognizerImpl.ObjCExposedMethods = {
        "tap": { returns: Interop.types.void, params: [Interop.types.id] }
    };
    return HideGestureRecognizerImpl;
}(GestureRecognizer));
// Keep external state of views
var targetHandler = null;
var targetHandler2 = null;
var ModalComponent = /** @class */ (function () {
    function ModalComponent(hostEl, page) {
        var _this = this;
        this.hostEl = hostEl;
        this.page = page;
        this.isShowing = false;
        this.durationScale = .75;
        this.data = null; // Optional data parameter
        this.size = "sm"; // sm | md | lg
        this.dismissable = true;
        this.alignment = "center"; // center | stretch | middle | top | bottom
        this.duration = 250; // in milliseconds
        this.open = new core_1.EventEmitter();
        this.close = new core_1.EventEmitter();
        this.onTapHide = function () {
            if (platform_1.isAndroid && _this.dismissable) {
                _this.hide();
            }
        };
        if (platform_1.isAndroid) {
            this.page.on(page_1.Page.loadedEvent, function () {
                application_1.android.on(application_1.AndroidApplication.activityBackPressedEvent, function (args) {
                    if (_this.isShowing) {
                        args.cancel = true;
                        _this.hide();
                    }
                });
            });
            this.page.on(page_1.Page.unloadedEvent, function () {
                application_1.android.off(application_1.AndroidApplication.activityBackPressedEvent);
            });
        }
    }
    ModalComponent.prototype.ngOnInit = function () {
        this.pageHeight = this.pageHeight ? this.pageHeight : platform_1.screen.mainScreen.heightDIPs;
        this.hostView.style.translateY = this.pageHeight;
    };
    ModalComponent.prototype.show = function (data) {
        var _this = this;
        if (data === void 0) { data = null; }
        if (!this.overlayView) {
            return;
        }
        this.hostView.style.translateY = 0;
        return this.overlayView.animate({
            translate: { x: 0, y: 0 }, duration: 0,
        }).then(function () { return _this.overlayView.animate({
            opacity: 1, duration: _this.timing * _this.durationScale,
        }); }).then(function () { return _this.bodyView.animate({
            translate: { x: 0, y: 0 },
            duration: 0,
            curve: enums_1.AnimationCurve.cubicBezier(.12, .3, .58, .44),
        }); }).then(function () { return _this.bodyView.animate({
            scale: { x: 1, y: 1 },
            opacity: 1,
            duration: _this.timing,
            curve: enums_1.AnimationCurve.cubicBezier(.12, .3, .58, .44),
        }); }).then(function () {
            _this.open.emit(_this.data = data);
            _this.isShowing = true;
        }).catch(function () { return 0; });
    };
    ModalComponent.prototype.hide = function () {
        var _this = this;
        return this.bodyView.animate({
            opacity: 0,
            duration: this.timing * this.durationScale,
            curve: enums_1.AnimationCurve.cubicBezier(.12, .3, .58, .44),
        }).then(function () { return _this.bodyView.animate({
            scale: { x: .6, y: .6 },
            translate: { x: 0, y: _this.pageHeight },
            duration: 0,
            curve: enums_1.AnimationCurve.cubicBezier(.12, .3, .58, .44),
        }); }).then(function () { return _this.overlayView.animate({
            opacity: 0, duration: _this.timing * _this.durationScale,
            curve: enums_1.AnimationCurve.easeInOut,
        }); }).then(function () { return _this.overlayView.animate({
            translate: { x: 0, y: _this.pageHeight },
            duration: 0,
            curve: enums_1.AnimationCurve.easeInOut,
        }); }).then(function (data) {
            _this.hostView.style.translateY = _this.pageHeight;
            _this.close.emit(_this.data);
            _this.isShowing = false;
            return Promise.resolve(_this.data);
        }).catch(function () { return 0; });
    };
    ModalComponent.prototype.onLoad = function (_a) {
        var _this = this;
        var object = _a.object;
        this.overlayView = object;
        this.contentView.off([gestures_1.GestureTypes.touch, gestures_1.GestureTypes.tap].join(","));
        // Event Propagation
        if (application_1.ios) {
            targetHandler = HideGestureRecognizerImpl.initWithOwner(this.overlayView);
            if (this.dismissable) {
                targetHandler.func = function () { return _this.hide(); };
            }
            var gesture = UITapGestureRecognizer.alloc().initWithTargetAction(targetHandler, "tap");
            this.overlayView.ios.addGestureRecognizer(gesture);
            targetHandler2 = HideGestureRecognizerImpl.initWithOwner(this.bodyView);
            var gesture2 = UITapGestureRecognizer.alloc().initWithTargetAction(targetHandler2, "tap");
            gesture2.cancelsTouchesInView = true;
            this.bodyView.ios.addGestureRecognizer(gesture2);
        }
    };
    Object.defineProperty(ModalComponent.prototype, "timing", {
        get: function () {
            return +this.duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "translateY", {
        get: function () {
            return this.pageHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "hostView", {
        get: function () {
            return this.hostEl.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "bodyView", {
        get: function () {
            return this.bodyEl.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "contentView", {
        get: function () {
            return this.contentEl.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "modalWidth", {
        get: function () {
            switch (this.size) {
                case "sm": return "65%";
                case "lg": return "98%";
                case "md":
                default: return "85%";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "modalHeight", {
        get: function () {
            switch (this.size) {
                case "sm": return "50%";
                case "lg": return "98%";
                case "md":
                default: return "65%";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "vAlignment", {
        get: function () {
            if (includes(["center", "stretch", "middle", "top", "bottom"], this.alignment)) {
                return this.alignment;
            }
            return "center";
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ModalComponent.prototype, "size", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ModalComponent.prototype, "dismissable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ModalComponent.prototype, "alignment", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ModalComponent.prototype, "duration", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ModalComponent.prototype, "open", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ModalComponent.prototype, "close", void 0);
    __decorate([
        core_1.ViewChild("bodyEl"),
        __metadata("design:type", core_1.ElementRef)
    ], ModalComponent.prototype, "bodyEl", void 0);
    __decorate([
        core_1.ViewChild("contentEl"),
        __metadata("design:type", core_1.ElementRef)
    ], ModalComponent.prototype, "contentEl", void 0);
    ModalComponent = __decorate([
        core_1.Component({
            selector: "modal, [modal]",
            moduleId: module.id,
            templateUrl: "./modal.component.html",
            styleUrls: ['./modal.component.css']
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            page_1.Page])
    ], ModalComponent);
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXNHO0FBRXRHLHFDQUE2QztBQUM3QyxrQ0FBMEM7QUFDMUMsd0NBQTJDO0FBQzNDLGdDQUErQjtBQUMvQiwyQ0FBb0c7QUFJcEcscUNBQXFDO0FBQ3JDLGtCQUFrQixTQUFTLEVBQUUsS0FBSztJQUNqQyxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDeEIsSUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDcEIsQ0FBQztJQUNELE1BQU0sQ0FBQyxXQUFXLENBQUM7QUFDcEIsQ0FBQztBQUVELElBQUksaUJBQWlCLEVBQUUsT0FBTyxDQUFDO0FBQy9CLEVBQUUsQ0FBQyxDQUFDLGlCQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ1QsaUJBQWlCLEdBQUcsUUFBUSxDQUFDO0lBQzdCLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQUFDLElBQUksQ0FBQyxDQUFDO0lBQ1AsaUJBQWlCO1FBQUc7UUFBVSxDQUFDO1FBQUQsUUFBQztJQUFELENBQUMsQUFBWCxHQUFXLENBQUM7SUFDaEMsT0FBTyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUM7QUFDbkQsQ0FBQztBQUVEO0lBQXdDLDZDQUFpQjtJQUF6RDs7SUFtQkEsQ0FBQztJQWhCTyx1Q0FBYSxHQUFwQixVQUFxQixLQUFLO1FBQ3pCLElBQU0sT0FBTyxHQUFHLElBQUkseUJBQXlCLEVBQUUsQ0FBQztRQUNoRCxPQUFPLENBQUMsTUFBTSxH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O2dEQUF3QztJQUN2QztRQUFULGFBQU0sRUFBRTs7aURBQXlDO0lBQzdCO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFpQixpQkFBVTtrREFBQztJQUN4QjtRQUF2QixnQkFBUyxDQUFDLFdBQVcsQ0FBQztrQ0FBb0IsaUJBQVU7cURBQUM7SUFiMUMsY0FBYztRQU4xQixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztTQUNwQyxDQUFDO3lDQWlCZ0IsaUJBQVU7WUFDWixXQUFJO09BakJQLGNBQWMsQ0ErSjFCO0lBQUQscUJBQUM7Q0FBQSxBQS9KRCxJQStKQztBQS9KWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBJbnB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xuaW1wb3J0IHsgc2NyZWVuLCBpc0FuZHJvaWQgfSBmcm9tIFwicGxhdGZvcm1cIjtcbmltcG9ydCB7IEFuaW1hdGlvbkN1cnZlIH0gZnJvbSBcInVpL2VudW1zXCI7XG5pbXBvcnQgeyBHZXN0dXJlVHlwZXMgfSBmcm9tIFwidWkvZ2VzdHVyZXNcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgYW5kcm9pZCwgQW5kcm9pZEFwcGxpY2F0aW9uLCBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSwgaW9zIH0gZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5cbmRlY2xhcmUgY29uc3QgVUlUYXBHZXN0dXJlUmVjb2duaXplciwgaW50ZXJvcCwgTlNPYmplY3Q7XG5cbi8vIE5vIHN1cHBvcnQgZm9yIEFycmF5I2luY2x1ZGVzIGhlcmVcbmZ1bmN0aW9uIGluY2x1ZGVzKGNvbnRhaW5lciwgdmFsdWUpIHtcblx0dmFyIHJldHVyblZhbHVlID0gZmFsc2U7XG5cdHZhciBwb3MgPSBjb250YWluZXIuaW5kZXhPZih2YWx1ZSk7XG5cdGlmIChwb3MgPj0gMCkge1xuXHRcdHJldHVyblZhbHVlID0gdHJ1ZTtcblx0fVxuXHRyZXR1cm4gcmV0dXJuVmFsdWU7XG59XG5cbmxldCBHZXN0dXJlUmVjb2duaXplciwgSW50ZXJvcDtcbmlmIChpb3MpIHtcblx0R2VzdHVyZVJlY29nbml6ZXIgPSBOU09iamVjdDtcblx0SW50ZXJvcCA9IGludGVyb3A7XG59IGVsc2Uge1xuXHRHZXN0dXJlUmVjb2duaXplciA9IGNsYXNzIEEgeyB9O1xuXHRJbnRlcm9wID0geyB0eXBlczogeyBpZDogdm9pZCAwLCB2b2lkOiB2b2lkIDAgfSB9O1xufVxuXG5jbGFzcyBIaWRlR2VzdHVyZVJlY29nbml6ZXJJbXBsIGV4dGVuZHMgR2VzdHVyZVJlY29nbml6ZXIge1xuXHRwdWJsaWMgZnVuYzogKCkgPT4gdm9pZDtcblxuXHRzdGF0aWMgaW5pdFdpdGhPd25lcihvd25lcikge1xuXHRcdGNvbnN0IGhhbmRsZXIgPSBuZXcgSGlkZUdlc3R1cmVSZWNvZ25pemVySW1wbCgpO1xuXHRcdGhhbmRsZXIuX293bmVyID0gb3duZXI7XG5cdFx0cmV0dXJuIGhhbmRsZXI7XG5cdH1cblxuXHR0YXAoKSB7XG5cdFx0dGhpcy5fb3duZXIuaW9zLnJlc2lnbkZpcnN0UmVzcG9uZGVyKCk7XG5cdFx0aWYgKHRoaXMuZnVuYykge1xuXHRcdFx0dGhpcy5mdW5jKCk7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIE9iakNFeHBvc2VkTWV0aG9kcyA9IHtcblx0XHRcInRhcFwiOiB7IHJldHVybnM6IEludGVyb3AudHlwZXMudm9pZCwgcGFyYW1zOiBbSW50ZXJvcC50eXBlcy5pZF0gfVxuXHR9O1xufVxuXG4vLyBLZWVwIGV4dGVybmFsIHN0YXRlIG9mIHZpZXdzXG5sZXQgdGFyZ2V0SGFuZGxlciA9IG51bGw7XG5sZXQgdGFyZ2V0SGFuZGxlcjIgPSBudWxsO1xuXG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogXCJtb2RhbCwgW21vZGFsXVwiLFxuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHR0ZW1wbGF0ZVVybDogXCIuL21vZGFsLmNvbXBvbmVudC5odG1sXCIsXG5cdHN0eWxlVXJsczogWycuL21vZGFsLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cdHByaXZhdGUgaXNTaG93aW5nOiBib29sZWFuID0gZmFsc2U7XG5cdHByaXZhdGUgcGFnZUhlaWdodDogbnVtYmVyO1xuXHRwcml2YXRlIGR1cmF0aW9uU2NhbGU6IG51bWJlciA9IC43NTtcblx0cHJpdmF0ZSBvdmVybGF5VmlldzogVmlldztcblx0cHJpdmF0ZSBkYXRhOiBhbnkgPSBudWxsOyAvLyBPcHRpb25hbCBkYXRhIHBhcmFtZXRlclxuXHRASW5wdXQoKSBwcml2YXRlIHNpemU6IHN0cmluZyA9IFwic21cIjsgLy8gc20gfCBtZCB8IGxnXG5cdEBJbnB1dCgpIHByaXZhdGUgZGlzbWlzc2FibGU6IGJvb2xlYW4gPSB0cnVlO1xuXHRASW5wdXQoKSBwcml2YXRlIGFsaWdubWVudDogc3RyaW5nID0gXCJjZW50ZXJcIjsgLy8gY2VudGVyIHwgc3RyZXRjaCB8IG1pZGRsZSB8IHRvcCB8IGJvdHRvbVxuXHRASW5wdXQoKSBwcml2YXRlIGR1cmF0aW9uOiBudW1iZXIgPSAyNTA7IC8vIGluIG1pbGxpc2Vjb25kc1xuXHRAT3V0cHV0KCkgcHJpdmF0ZSBvcGVuID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cdEBPdXRwdXQoKSBwcml2YXRlIGNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cdEBWaWV3Q2hpbGQoXCJib2R5RWxcIikgcHJpdmF0ZSBib2R5RWw6IEVsZW1lbnRSZWY7XG5cdEBWaWV3Q2hpbGQoXCJjb250ZW50RWxcIikgcHJpdmF0ZSBjb250ZW50RWw6IEVsZW1lbnRSZWY7XG5cblx0Y29uc3RydWN0b3IoXG5cdFx0cHJpdmF0ZSBob3N0RWw6IEVsZW1lbnRSZWYsXG5cdFx0cHJpdmF0ZSBwYWdlOiBQYWdlXG5cdCkge1xuXHRcdGlmIChpc0FuZHJvaWQpIHtcblx0XHRcdHRoaXMucGFnZS5vbihQYWdlLmxvYWRlZEV2ZW50LCAoKSA9PiB7XG5cdFx0XHRcdGFuZHJvaWQub24oQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCwgKGFyZ3M6IEFuZHJvaWRBY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnREYXRhKSA9PiB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuaXNTaG93aW5nKSB7XG5cdFx0XHRcdFx0XHRhcmdzLmNhbmNlbCA9IHRydWU7XG5cdFx0XHRcdFx0XHR0aGlzLmhpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0XHR0aGlzLnBhZ2Uub24oUGFnZS51bmxvYWRlZEV2ZW50LCAoKSA9PiB7XG5cdFx0XHRcdGFuZHJvaWQub2ZmKEFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0bmdPbkluaXQoKSB7XG5cdFx0dGhpcy5wYWdlSGVpZ2h0ID0gdGhpcy5wYWdlSGVpZ2h0ID8gdGhpcy5wYWdlSGVpZ2h0IDogc2NyZWVuLm1haW5TY3JlZW4uaGVpZ2h0RElQcztcblx0XHR0aGlzLmhvc3RWaWV3LnN0eWxlLnRyYW5zbGF0ZVkgPSB0aGlzLnBhZ2VIZWlnaHQ7XG5cdH1cblxuXHRzaG93KGRhdGE6IGFueSA9IG51bGwpIHtcblx0XHRpZiAoIXRoaXMub3ZlcmxheVZpZXcpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dGhpcy5ob3N0Vmlldy5zdHlsZS50cmFuc2xhdGVZID0gMDtcblx0XHRyZXR1cm4gdGhpcy5vdmVybGF5Vmlldy5hbmltYXRlKHtcblx0XHRcdHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sIGR1cmF0aW9uOiAwLFxuXHRcdH0pLnRoZW4oKCkgPT4gdGhpcy5vdmVybGF5Vmlldy5hbmltYXRlKHtcblx0XHRcdG9wYWNpdHk6IDEsIGR1cmF0aW9uOiB0aGlzLnRpbWluZyAqIHRoaXMuZHVyYXRpb25TY2FsZSxcblx0XHR9KSkudGhlbigoKSA9PiB0aGlzLmJvZHlWaWV3LmFuaW1hdGUoe1xuXHRcdFx0dHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcblx0XHRcdGR1cmF0aW9uOiAwLFxuXHRcdFx0Y3VydmU6IEFuaW1hdGlvbkN1cnZlLmN1YmljQmV6aWVyKC4xMiwgLjMsIC41OCwgLjQ0KSxcblx0XHR9KSkudGhlbigoKSA9PiB0aGlzLmJvZHlWaWV3LmFuaW1hdGUoe1xuXHRcdFx0c2NhbGU6IHsgeDogMSwgeTogMSB9LFxuXHRcdFx0b3BhY2l0eTogMSxcblx0XHRcdGR1cmF0aW9uOiB0aGlzLnRpbWluZyxcblx0XHRcdGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5jdWJpY0JlemllciguMTIsIC4zLCAuNTgsIC40NCksXG5cdFx0fSkpLnRoZW4oKCkgPT4ge1xuXHRcdFx0dGhpcy5vcGVuLmVtaXQodGhpcy5kYXRhID0gZGF0YSk7XG5cdFx0XHR0aGlzLmlzU2hvd2luZyA9IHRydWU7XG5cdFx0fSkuY2F0Y2goKCkgPT4gMCk7XG5cdH1cblxuXHRoaWRlKCkge1xuXHRcdHJldHVybiB0aGlzLmJvZHlWaWV3LmFuaW1hdGUoe1xuXHRcdFx0b3BhY2l0eTogMCxcblx0XHRcdGR1cmF0aW9uOiB0aGlzLnRpbWluZyAqIHRoaXMuZHVyYXRpb25TY2FsZSxcblx0XHRcdGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5jdWJpY0JlemllciguMTIsIC4zLCAuNTgsIC40NCksXG5cdFx0fSkudGhlbigoKSA9PiB0aGlzLmJvZHlWaWV3LmFuaW1hdGUoe1xuXHRcdFx0c2NhbGU6IHsgeDogLjYsIHk6IC42IH0sXG5cdFx0XHR0cmFuc2xhdGU6IHsgeDogMCwgeTogdGhpcy5wYWdlSGVpZ2h0IH0sXG5cdFx0XHRkdXJhdGlvbjogMCxcblx0XHRcdGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5jdWJpY0JlemllciguMTIsIC4zLCAuNTgsIC40NCksXG5cdFx0fSkpLnRoZW4oKCkgPT4gdGhpcy5vdmVybGF5Vmlldy5hbmltYXRlKHtcblx0XHRcdG9wYWNpdHk6IDAsIGR1cmF0aW9uOiB0aGlzLnRpbWluZyAqIHRoaXMuZHVyYXRpb25TY2FsZSxcblx0XHRcdGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5lYXNlSW5PdXQsXG5cdFx0fSkpLnRoZW4oKCkgPT4gdGhpcy5vdmVybGF5Vmlldy5hbmltYXRlKHtcblx0XHRcdHRyYW5zbGF0ZTogeyB4OiAwLCB5OiB0aGlzLnBhZ2VIZWlnaHQgfSxcblx0XHRcdGR1cmF0aW9uOiAwLFxuXHRcdFx0Y3VydmU6IEFuaW1hdGlvbkN1cnZlLmVhc2VJbk91dCxcblx0XHR9KSkudGhlbihkYXRhID0+IHtcblx0XHRcdHRoaXMuaG9zdFZpZXcuc3R5bGUudHJhbnNsYXRlWSA9IHRoaXMucGFnZUhlaWdodDtcblx0XHRcdHRoaXMuY2xvc2UuZW1pdCh0aGlzLmRhdGEpO1xuXHRcdFx0dGhpcy5pc1Nob3dpbmcgPSBmYWxzZTtcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5kYXRhKTtcblx0XHR9KS5jYXRjaCgoKSA9PiAwKTtcblx0fVxuXG5cdG9uVGFwSGlkZSA9ICgpID0+IHtcblx0XHRpZiAoaXNBbmRyb2lkICYmIHRoaXMuZGlzbWlzc2FibGUpIHtcblx0XHRcdHRoaXMuaGlkZSgpO1xuXHRcdH1cblx0fVxuXG5cdG9uTG9hZCh7IG9iamVjdCB9KSB7XG5cdFx0dGhpcy5vdmVybGF5VmlldyA9IDxWaWV3Pm9iamVjdDtcblxuXHRcdHRoaXMuY29udGVudFZpZXcub2ZmKFtHZXN0dXJlVHlwZXMudG91Y2gsIEdlc3R1cmVUeXBlcy50YXBdLmpvaW4oXCIsXCIpKTtcblxuXHRcdC8vIEV2ZW50IFByb3BhZ2F0aW9uXG5cdFx0aWYgKGlvcykge1xuXHRcdFx0dGFyZ2V0SGFuZGxlciA9IEhpZGVHZXN0dXJlUmVjb2duaXplckltcGwuaW5pdFdpdGhPd25lcih0aGlzLm92ZXJsYXlWaWV3KTtcblx0XHRcdGlmICh0aGlzLmRpc21pc3NhYmxlKSB7XG5cdFx0XHRcdHRhcmdldEhhbmRsZXIuZnVuYyA9ICgpID0+IHRoaXMuaGlkZSgpO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgZ2VzdHVyZSA9IFVJVGFwR2VzdHVyZVJlY29nbml6ZXIuYWxsb2MoKS5pbml0V2l0aFRhcmdldEFjdGlvbih0YXJnZXRIYW5kbGVyLCBcInRhcFwiKTtcblx0XHRcdHRoaXMub3ZlcmxheVZpZXcuaW9zLmFkZEdlc3R1cmVSZWNvZ25pemVyKGdlc3R1cmUpO1xuXG5cdFx0XHR0YXJnZXRIYW5kbGVyMiA9IEhpZGVHZXN0dXJlUmVjb2duaXplckltcGwuaW5pdFdpdGhPd25lcih0aGlzLmJvZHlWaWV3KTtcblx0XHRcdGNvbnN0IGdlc3R1cmUyID0gVUlUYXBHZXN0dXJlUmVjb2duaXplci5hbGxvYygpLmluaXRXaXRoVGFyZ2V0QWN0aW9uKHRhcmdldEhhbmRsZXIyLCBcInRhcFwiKTtcblx0XHRcdGdlc3R1cmUyLmNhbmNlbHNUb3VjaGVzSW5WaWV3ID0gdHJ1ZTtcblx0XHRcdHRoaXMuYm9keVZpZXcuaW9zLmFkZEdlc3R1cmVSZWNvZ25pemVyKGdlc3R1cmUyKTtcblx0XHR9XG5cdH1cblxuXHRwcml2YXRlIGdldCB0aW1pbmcoKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gK3RoaXMuZHVyYXRpb247XG5cdH1cblxuXHRwdWJsaWMgZ2V0IHRyYW5zbGF0ZVkoKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gdGhpcy5wYWdlSGVpZ2h0O1xuXHR9XG5cblx0cHJpdmF0ZSBnZXQgaG9zdFZpZXcoKTogVmlldyB7XG5cdFx0cmV0dXJuIHRoaXMuaG9zdEVsLm5hdGl2ZUVsZW1lbnQ7XG5cdH1cblxuXHRwcml2YXRlIGdldCBib2R5VmlldygpOiBWaWV3IHtcblx0XHRyZXR1cm4gdGhpcy5ib2R5RWwubmF0aXZlRWxlbWVudDtcblx0fVxuXG5cdHByaXZhdGUgZ2V0IGNvbnRlbnRWaWV3KCk6IFZpZXcge1xuXHRcdHJldHVybiB0aGlzLmNvbnRlbnRFbC5uYXRpdmVFbGVtZW50O1xuXHR9XG5cblx0cHVibGljIGdldCBtb2RhbFdpZHRoKCk6IHN0cmluZyB7XG5cdFx0c3dpdGNoICh0aGlzLnNpemUpIHtcblx0XHRcdGNhc2UgXCJzbVwiOiByZXR1cm4gXCI2NSVcIjtcblx0XHRcdGNhc2UgXCJsZ1wiOiByZXR1cm4gXCI5OCVcIjtcblx0XHRcdGNhc2UgXCJtZFwiOlxuXHRcdFx0ZGVmYXVsdDogcmV0dXJuIFwiODUlXCI7XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIGdldCBtb2RhbEhlaWdodCgpOiBzdHJpbmcge1xuXHRcdHN3aXRjaCAodGhpcy5zaXplKSB7XG5cdFx0XHRjYXNlIFwic21cIjogcmV0dXJuIFwiNTAlXCI7XG5cdFx0XHRjYXNlIFwibGdcIjogcmV0dXJuIFwiOTglXCI7XG5cdFx0XHRjYXNlIFwibWRcIjpcblx0XHRcdGRlZmF1bHQ6IHJldHVybiBcIjY1JVwiO1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBnZXQgdkFsaWdubWVudCgpOiBzdHJpbmcge1xuXHRcdGlmIChpbmNsdWRlcyhbXCJjZW50ZXJcIiwgXCJzdHJldGNoXCIsIFwibWlkZGxlXCIsIFwidG9wXCIsIFwiYm90dG9tXCJdLCB0aGlzLmFsaWdubWVudCkpIHtcblx0XHRcdHJldHVybiB0aGlzLmFsaWdubWVudDtcblx0XHR9XG5cdFx0cmV0dXJuIFwiY2VudGVyXCI7XG5cdH1cbn1cblxuIl19