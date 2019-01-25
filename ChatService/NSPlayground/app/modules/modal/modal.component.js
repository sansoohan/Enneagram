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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXNHO0FBRXRHLHFDQUE2QztBQUM3QyxrQ0FBMEM7QUFDMUMsd0NBQTJDO0FBQzNDLGdDQUErQjtBQUMvQiwyQ0FBb0c7QUFJcEcscUNBQXFDO0FBQ3JDLFNBQVMsUUFBUSxDQUFDLFNBQVMsRUFBRSxLQUFLO0lBQ2pDLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztJQUN4QixJQUFJLEdBQUcsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25DLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRTtRQUNiLFdBQVcsR0FBRyxJQUFJLENBQUM7S0FDbkI7SUFDRCxPQUFPLFdBQVcsQ0FBQztBQUNwQixDQUFDO0FBRUQsSUFBSSxpQkFBaUIsRUFBRSxPQUFPLENBQUM7QUFDL0IsSUFBSSxpQkFBRyxFQUFFO0lBQ1IsaUJBQWlCLEdBQUcsUUFBUSxDQUFDO0lBQzdCLE9BQU8sR0FBRyxPQUFPLENBQUM7Q0FDbEI7S0FBTTtJQUNOLGlCQUFpQjtRQUFHO1FBQVUsQ0FBQztRQUFELFFBQUM7SUFBRCxDQUFDLEFBQVgsR0FBVyxDQUFDO0lBQ2hDLE9BQU8sR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDO0NBQ2xEO0FBRUQ7SUFBd0MsNkNBQWlCO0lBQXpEOztJQW1CQSxDQUFDO0lBaEJPLHVDQUFhLEdBQXBCLFVBQXFCLEtBQUs7UUFDekIsSUFBTSxPQUFPLEdBQUcsSUFBSSx5QkFBeUIsRUFBRSxDQUFDO1FBQ2hELE9BQU8sQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLE9BQU8sT0FBTyxDQUFDO0lBQ2hCLENBQUM7SUFFRCx1Q0FBRyxHQUFIO1FBQ0Ms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QUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIElucHV0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ1aS9jb3JlL3ZpZXdcIjtcclxuaW1wb3J0IHsgc2NyZWVuLCBpc0FuZHJvaWQgfSBmcm9tIFwicGxhdGZvcm1cIjtcclxuaW1wb3J0IHsgQW5pbWF0aW9uQ3VydmUgfSBmcm9tIFwidWkvZW51bXNcIjtcclxuaW1wb3J0IHsgR2VzdHVyZVR5cGVzIH0gZnJvbSBcInVpL2dlc3R1cmVzXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBhbmRyb2lkLCBBbmRyb2lkQXBwbGljYXRpb24sIEFuZHJvaWRBY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnREYXRhLCBpb3MgfSBmcm9tIFwiYXBwbGljYXRpb25cIjtcclxuXHJcbmRlY2xhcmUgY29uc3QgVUlUYXBHZXN0dXJlUmVjb2duaXplciwgaW50ZXJvcCwgTlNPYmplY3Q7XHJcblxyXG4vLyBObyBzdXBwb3J0IGZvciBBcnJheSNpbmNsdWRlcyBoZXJlXHJcbmZ1bmN0aW9uIGluY2x1ZGVzKGNvbnRhaW5lciwgdmFsdWUpIHtcclxuXHR2YXIgcmV0dXJuVmFsdWUgPSBmYWxzZTtcclxuXHR2YXIgcG9zID0gY29udGFpbmVyLmluZGV4T2YodmFsdWUpO1xyXG5cdGlmIChwb3MgPj0gMCkge1xyXG5cdFx0cmV0dXJuVmFsdWUgPSB0cnVlO1xyXG5cdH1cclxuXHRyZXR1cm4gcmV0dXJuVmFsdWU7XHJcbn1cclxuXHJcbmxldCBHZXN0dXJlUmVjb2duaXplciwgSW50ZXJvcDtcclxuaWYgKGlvcykge1xyXG5cdEdlc3R1cmVSZWNvZ25pemVyID0gTlNPYmplY3Q7XHJcblx0SW50ZXJvcCA9IGludGVyb3A7XHJcbn0gZWxzZSB7XHJcblx0R2VzdHVyZVJlY29nbml6ZXIgPSBjbGFzcyBBIHsgfTtcclxuXHRJbnRlcm9wID0geyB0eXBlczogeyBpZDogdm9pZCAwLCB2b2lkOiB2b2lkIDAgfSB9O1xyXG59XHJcblxyXG5jbGFzcyBIaWRlR2VzdHVyZVJlY29nbml6ZXJJbXBsIGV4dGVuZHMgR2VzdHVyZVJlY29nbml6ZXIge1xyXG5cdHB1YmxpYyBmdW5jOiAoKSA9PiB2b2lkO1xyXG5cclxuXHRzdGF0aWMgaW5pdFdpdGhPd25lcihvd25lcikge1xyXG5cdFx0Y29uc3QgaGFuZGxlciA9IG5ldyBIaWRlR2VzdHVyZVJlY29nbml6ZXJJbXBsKCk7XHJcblx0XHRoYW5kbGVyLl9vd25lciA9IG93bmVyO1xyXG5cdFx0cmV0dXJuIGhhbmRsZXI7XHJcblx0fVxyXG5cclxuXHR0YXAoKSB7XHJcblx0XHR0aGlzLl9vd25lci5pb3MucmVzaWduRmlyc3RSZXNwb25kZXIoKTtcclxuXHRcdGlmICh0aGlzLmZ1bmMpIHtcclxuXHRcdFx0dGhpcy5mdW5jKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgT2JqQ0V4cG9zZWRNZXRob2RzID0ge1xyXG5cdFx0XCJ0YXBcIjogeyByZXR1cm5zOiBJbnRlcm9wLnR5cGVzLnZvaWQsIHBhcmFtczogW0ludGVyb3AudHlwZXMuaWRdIH1cclxuXHR9O1xyXG59XHJcblxyXG4vLyBLZWVwIGV4dGVybmFsIHN0YXRlIG9mIHZpZXdzXHJcbmxldCB0YXJnZXRIYW5kbGVyID0gbnVsbDtcclxubGV0IHRhcmdldEhhbmRsZXIyID0gbnVsbDtcclxuXHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogXCJtb2RhbCwgW21vZGFsXVwiLFxyXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcblx0dGVtcGxhdGVVcmw6IFwiLi9tb2RhbC5jb21wb25lbnQuaHRtbFwiLFxyXG5cdHN0eWxlVXJsczogWycuL21vZGFsLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTW9kYWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdHByaXZhdGUgaXNTaG93aW5nOiBib29sZWFuID0gZmFsc2U7XHJcblx0cHJpdmF0ZSBwYWdlSGVpZ2h0OiBudW1iZXI7XHJcblx0cHJpdmF0ZSBkdXJhdGlvblNjYWxlOiBudW1iZXIgPSAuNzU7XHJcblx0cHJpdmF0ZSBvdmVybGF5VmlldzogVmlldztcclxuXHRwcml2YXRlIGRhdGE6IGFueSA9IG51bGw7IC8vIE9wdGlvbmFsIGRhdGEgcGFyYW1ldGVyXHJcblx0QElucHV0KCkgcHJpdmF0ZSBzaXplOiBzdHJpbmcgPSBcInNtXCI7IC8vIHNtIHwgbWQgfCBsZ1xyXG5cdEBJbnB1dCgpIHByaXZhdGUgZGlzbWlzc2FibGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cdEBJbnB1dCgpIHByaXZhdGUgYWxpZ25tZW50OiBzdHJpbmcgPSBcImNlbnRlclwiOyAvLyBjZW50ZXIgfCBzdHJldGNoIHwgbWlkZGxlIHwgdG9wIHwgYm90dG9tXHJcblx0QElucHV0KCkgcHJpdmF0ZSBkdXJhdGlvbjogbnVtYmVyID0gMjUwOyAvLyBpbiBtaWxsaXNlY29uZHNcclxuXHRAT3V0cHV0KCkgcHJpdmF0ZSBvcGVuID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblx0QE91dHB1dCgpIHByaXZhdGUgY2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuXHRAVmlld0NoaWxkKFwiYm9keUVsXCIpIHByaXZhdGUgYm9keUVsOiBFbGVtZW50UmVmO1xyXG5cdEBWaWV3Q2hpbGQoXCJjb250ZW50RWxcIikgcHJpdmF0ZSBjb250ZW50RWw6IEVsZW1lbnRSZWY7XHJcblxyXG5cdGNvbnN0cnVjdG9yKFxyXG5cdFx0cHJpdmF0ZSBob3N0RWw6IEVsZW1lbnRSZWYsXHJcblx0XHRwcml2YXRlIHBhZ2U6IFBhZ2VcclxuXHQpIHtcclxuXHRcdGlmIChpc0FuZHJvaWQpIHtcclxuXHRcdFx0dGhpcy5wYWdlLm9uKFBhZ2UubG9hZGVkRXZlbnQsICgpID0+IHtcclxuXHRcdFx0XHRhbmRyb2lkLm9uKEFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQsIChhcmdzOiBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSkgPT4ge1xyXG5cdFx0XHRcdFx0aWYgKHRoaXMuaXNTaG93aW5nKSB7XHJcblx0XHRcdFx0XHRcdGFyZ3MuY2FuY2VsID0gdHJ1ZTtcclxuXHRcdFx0XHRcdFx0dGhpcy5oaWRlKCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHR0aGlzLnBhZ2Uub24oUGFnZS51bmxvYWRlZEV2ZW50LCAoKSA9PiB7XHJcblx0XHRcdFx0YW5kcm9pZC5vZmYoQW5kcm9pZEFwcGxpY2F0aW9uLmFjdGl2aXR5QmFja1ByZXNzZWRFdmVudCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bmdPbkluaXQoKSB7XHJcblx0XHR0aGlzLnBhZ2VIZWlnaHQgPSB0aGlzLnBhZ2VIZWlnaHQgPyB0aGlzLnBhZ2VIZWlnaHQgOiBzY3JlZW4ubWFpblNjcmVlbi5oZWlnaHRESVBzO1xyXG5cdFx0dGhpcy5ob3N0Vmlldy5zdHlsZS50cmFuc2xhdGVZID0gdGhpcy5wYWdlSGVpZ2h0O1xyXG5cdH1cclxuXHJcblx0c2hvdyhkYXRhOiBhbnkgPSBudWxsKSB7XHJcblx0XHRpZiAoIXRoaXMub3ZlcmxheVZpZXcpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5ob3N0Vmlldy5zdHlsZS50cmFuc2xhdGVZID0gMDtcclxuXHRcdHJldHVybiB0aGlzLm92ZXJsYXlWaWV3LmFuaW1hdGUoe1xyXG5cdFx0XHR0cmFuc2xhdGU6IHsgeDogMCwgeTogMCB9LCBkdXJhdGlvbjogMCxcclxuXHRcdH0pLnRoZW4oKCkgPT4gdGhpcy5vdmVybGF5Vmlldy5hbmltYXRlKHtcclxuXHRcdFx0b3BhY2l0eTogMSwgZHVyYXRpb246IHRoaXMudGltaW5nICogdGhpcy5kdXJhdGlvblNjYWxlLFxyXG5cdFx0fSkpLnRoZW4oKCkgPT4gdGhpcy5ib2R5Vmlldy5hbmltYXRlKHtcclxuXHRcdFx0dHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcclxuXHRcdFx0ZHVyYXRpb246IDAsXHJcblx0XHRcdGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5jdWJpY0JlemllciguMTIsIC4zLCAuNTgsIC40NCksXHJcblx0XHR9KSkudGhlbigoKSA9PiB0aGlzLmJvZHlWaWV3LmFuaW1hdGUoe1xyXG5cdFx0XHRzY2FsZTogeyB4OiAxLCB5OiAxIH0sXHJcblx0XHRcdG9wYWNpdHk6IDEsXHJcblx0XHRcdGR1cmF0aW9uOiB0aGlzLnRpbWluZyxcclxuXHRcdFx0Y3VydmU6IEFuaW1hdGlvbkN1cnZlLmN1YmljQmV6aWVyKC4xMiwgLjMsIC41OCwgLjQ0KSxcclxuXHRcdH0pKS50aGVuKCgpID0+IHtcclxuXHRcdFx0dGhpcy5vcGVuLmVtaXQodGhpcy5kYXRhID0gZGF0YSk7XHJcblx0XHRcdHRoaXMuaXNTaG93aW5nID0gdHJ1ZTtcclxuXHRcdH0pLmNhdGNoKCgpID0+IDApO1xyXG5cdH1cclxuXHJcblx0aGlkZSgpIHtcclxuXHRcdHJldHVybiB0aGlzLmJvZHlWaWV3LmFuaW1hdGUoe1xyXG5cdFx0XHRvcGFjaXR5OiAwLFxyXG5cdFx0XHRkdXJhdGlvbjogdGhpcy50aW1pbmcgKiB0aGlzLmR1cmF0aW9uU2NhbGUsXHJcblx0XHRcdGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5jdWJpY0JlemllciguMTIsIC4zLCAuNTgsIC40NCksXHJcblx0XHR9KS50aGVuKCgpID0+IHRoaXMuYm9keVZpZXcuYW5pbWF0ZSh7XHJcblx0XHRcdHNjYWxlOiB7IHg6IC42LCB5OiAuNiB9LFxyXG5cdFx0XHR0cmFuc2xhdGU6IHsgeDogMCwgeTogdGhpcy5wYWdlSGVpZ2h0IH0sXHJcblx0XHRcdGR1cmF0aW9uOiAwLFxyXG5cdFx0XHRjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuY3ViaWNCZXppZXIoLjEyLCAuMywgLjU4LCAuNDQpLFxyXG5cdFx0fSkpLnRoZW4oKCkgPT4gdGhpcy5vdmVybGF5Vmlldy5hbmltYXRlKHtcclxuXHRcdFx0b3BhY2l0eTogMCwgZHVyYXRpb246IHRoaXMudGltaW5nICogdGhpcy5kdXJhdGlvblNjYWxlLFxyXG5cdFx0XHRjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuZWFzZUluT3V0LFxyXG5cdFx0fSkpLnRoZW4oKCkgPT4gdGhpcy5vdmVybGF5Vmlldy5hbmltYXRlKHtcclxuXHRcdFx0dHJhbnNsYXRlOiB7IHg6IDAsIHk6IHRoaXMucGFnZUhlaWdodCB9LFxyXG5cdFx0XHRkdXJhdGlvbjogMCxcclxuXHRcdFx0Y3VydmU6IEFuaW1hdGlvbkN1cnZlLmVhc2VJbk91dCxcclxuXHRcdH0pKS50aGVuKGRhdGEgPT4ge1xyXG5cdFx0XHR0aGlzLmhvc3RWaWV3LnN0eWxlLnRyYW5zbGF0ZVkgPSB0aGlzLnBhZ2VIZWlnaHQ7XHJcblx0XHRcdHRoaXMuY2xvc2UuZW1pdCh0aGlzLmRhdGEpO1xyXG5cdFx0XHR0aGlzLmlzU2hvd2luZyA9IGZhbHNlO1xyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuZGF0YSk7XHJcblx0XHR9KS5jYXRjaCgoKSA9PiAwKTtcclxuXHR9XHJcblxyXG5cdG9uVGFwSGlkZSA9ICgpID0+IHtcclxuXHRcdGlmIChpc0FuZHJvaWQgJiYgdGhpcy5kaXNtaXNzYWJsZSkge1xyXG5cdFx0XHR0aGlzLmhpZGUoKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uTG9hZCh7IG9iamVjdCB9KSB7XHJcblx0XHR0aGlzLm92ZXJsYXlWaWV3ID0gPFZpZXc+b2JqZWN0O1xyXG5cclxuXHRcdHRoaXMuY29udGVudFZpZXcub2ZmKFtHZXN0dXJlVHlwZXMudG91Y2gsIEdlc3R1cmVUeXBlcy50YXBdLmpvaW4oXCIsXCIpKTtcclxuXHJcblx0XHQvLyBFdmVudCBQcm9wYWdhdGlvblxyXG5cdFx0aWYgKGlvcykge1xyXG5cdFx0XHR0YXJnZXRIYW5kbGVyID0gSGlkZUdlc3R1cmVSZWNvZ25pemVySW1wbC5pbml0V2l0aE93bmVyKHRoaXMub3ZlcmxheVZpZXcpO1xyXG5cdFx0XHRpZiAodGhpcy5kaXNtaXNzYWJsZSkge1xyXG5cdFx0XHRcdHRhcmdldEhhbmRsZXIuZnVuYyA9ICgpID0+IHRoaXMuaGlkZSgpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnN0IGdlc3R1cmUgPSBVSVRhcEdlc3R1cmVSZWNvZ25pemVyLmFsbG9jKCkuaW5pdFdpdGhUYXJnZXRBY3Rpb24odGFyZ2V0SGFuZGxlciwgXCJ0YXBcIik7XHJcblx0XHRcdHRoaXMub3ZlcmxheVZpZXcuaW9zLmFkZEdlc3R1cmVSZWNvZ25pemVyKGdlc3R1cmUpO1xyXG5cclxuXHRcdFx0dGFyZ2V0SGFuZGxlcjIgPSBIaWRlR2VzdHVyZVJlY29nbml6ZXJJbXBsLmluaXRXaXRoT3duZXIodGhpcy5ib2R5Vmlldyk7XHJcblx0XHRcdGNvbnN0IGdlc3R1cmUyID0gVUlUYXBHZXN0dXJlUmVjb2duaXplci5hbGxvYygpLmluaXRXaXRoVGFyZ2V0QWN0aW9uKHRhcmdldEhhbmRsZXIyLCBcInRhcFwiKTtcclxuXHRcdFx0Z2VzdHVyZTIuY2FuY2Vsc1RvdWNoZXNJblZpZXcgPSB0cnVlO1xyXG5cdFx0XHR0aGlzLmJvZHlWaWV3Lmlvcy5hZGRHZXN0dXJlUmVjb2duaXplcihnZXN0dXJlMik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldCB0aW1pbmcoKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiArdGhpcy5kdXJhdGlvbjtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgdHJhbnNsYXRlWSgpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMucGFnZUhlaWdodDtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0IGhvc3RWaWV3KCk6IFZpZXcge1xyXG5cdFx0cmV0dXJuIHRoaXMuaG9zdEVsLm5hdGl2ZUVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldCBib2R5VmlldygpOiBWaWV3IHtcclxuXHRcdHJldHVybiB0aGlzLmJvZHlFbC5uYXRpdmVFbGVtZW50O1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBnZXQgY29udGVudFZpZXcoKTogVmlldyB7XHJcblx0XHRyZXR1cm4gdGhpcy5jb250ZW50RWwubmF0aXZlRWxlbWVudDtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgbW9kYWxXaWR0aCgpOiBzdHJpbmcge1xyXG5cdFx0c3dpdGNoICh0aGlzLnNpemUpIHtcclxuXHRcdFx0Y2FzZSBcInNtXCI6IHJldHVybiBcIjY1JVwiO1xyXG5cdFx0XHRjYXNlIFwibGdcIjogcmV0dXJuIFwiOTglXCI7XHJcblx0XHRcdGNhc2UgXCJtZFwiOlxyXG5cdFx0XHRkZWZhdWx0OiByZXR1cm4gXCI4NSVcIjtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgbW9kYWxIZWlnaHQoKTogc3RyaW5nIHtcclxuXHRcdHN3aXRjaCAodGhpcy5zaXplKSB7XHJcblx0XHRcdGNhc2UgXCJzbVwiOiByZXR1cm4gXCI1MCVcIjtcclxuXHRcdFx0Y2FzZSBcImxnXCI6IHJldHVybiBcIjk4JVwiO1xyXG5cdFx0XHRjYXNlIFwibWRcIjpcclxuXHRcdFx0ZGVmYXVsdDogcmV0dXJuIFwiNjUlXCI7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IHZBbGlnbm1lbnQoKTogc3RyaW5nIHtcclxuXHRcdGlmIChpbmNsdWRlcyhbXCJjZW50ZXJcIiwgXCJzdHJldGNoXCIsIFwibWlkZGxlXCIsIFwidG9wXCIsIFwiYm90dG9tXCJdLCB0aGlzLmFsaWdubWVudCkpIHtcclxuXHRcdFx0cmV0dXJuIHRoaXMuYWxpZ25tZW50O1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIFwiY2VudGVyXCI7XHJcblx0fVxyXG59XHJcblxyXG4iXX0=