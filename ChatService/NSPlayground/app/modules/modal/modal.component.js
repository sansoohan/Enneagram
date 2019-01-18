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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXNHO0FBRXRHLHFDQUE2QztBQUM3QyxrQ0FBMEM7QUFDMUMsd0NBQTJDO0FBQzNDLGdDQUErQjtBQUMvQiwyQ0FBb0c7QUFJcEcscUNBQXFDO0FBQ3JDLGtCQUFrQixTQUFTLEVBQUUsS0FBSztJQUNqQyxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDeEIsSUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNkLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDcEIsQ0FBQztJQUNELE1BQU0sQ0FBQyxXQUFXLENBQUM7QUFDcEIsQ0FBQztBQUVELElBQUksaUJBQWlCLEVBQUUsT0FBTyxDQUFDO0FBQy9CLEVBQUUsQ0FBQyxDQUFDLGlCQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ1QsaUJBQWlCLEdBQUcsUUFBUSxDQUFDO0lBQzdCLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQUFDLElBQUksQ0FBQyxDQUFDO0lBQ1AsaUJBQWlCO1FBQUc7UUFBVSxDQUFDO1FBQUQsUUFBQztJQUFELENBQUMsQUFBWCxHQUFXLENBQUM7SUFDaEMsT0FBTyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUM7QUFDbkQsQ0FBQztBQUVEO0lBQXdDLDZDQUFpQjtJQUF6RDs7SUFtQkEsQ0FBQztJQWhCTyx1Q0FBYSxHQUFwQixVQUFxQixLQUFLO1FBQ3pCLElBQU0sT0FBTyxHQUFHLElBQUkseUJBQXlCLEVBQUUsQ0FBQztRQUNoRCxPQUFPLENBQUMsTUFBTSxH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O2dEQUF3QztJQUN2QztRQUFULGFBQU0sRUFBRTs7aURBQXlDO0lBQzdCO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFpQixpQkFBVTtrREFBQztJQUN4QjtRQUF2QixnQkFBUyxDQUFDLFdBQVcsQ0FBQztrQ0FBb0IsaUJBQVU7cURBQUM7SUFiMUMsY0FBYztRQU4xQixnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLHdCQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztTQUNwQyxDQUFDO3lDQWlCZ0IsaUJBQVU7WUFDWixXQUFJO09BakJQLGNBQWMsQ0ErSjFCO0lBQUQscUJBQUM7Q0FBQSxBQS9KRCxJQStKQztBQS9KWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBJbnB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidWkvY29yZS92aWV3XCI7XHJcbmltcG9ydCB7IHNjcmVlbiwgaXNBbmRyb2lkIH0gZnJvbSBcInBsYXRmb3JtXCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbkN1cnZlIH0gZnJvbSBcInVpL2VudW1zXCI7XHJcbmltcG9ydCB7IEdlc3R1cmVUeXBlcyB9IGZyb20gXCJ1aS9nZXN0dXJlc1wiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgYW5kcm9pZCwgQW5kcm9pZEFwcGxpY2F0aW9uLCBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSwgaW9zIH0gZnJvbSBcImFwcGxpY2F0aW9uXCI7XHJcblxyXG5kZWNsYXJlIGNvbnN0IFVJVGFwR2VzdHVyZVJlY29nbml6ZXIsIGludGVyb3AsIE5TT2JqZWN0O1xyXG5cclxuLy8gTm8gc3VwcG9ydCBmb3IgQXJyYXkjaW5jbHVkZXMgaGVyZVxyXG5mdW5jdGlvbiBpbmNsdWRlcyhjb250YWluZXIsIHZhbHVlKSB7XHJcblx0dmFyIHJldHVyblZhbHVlID0gZmFsc2U7XHJcblx0dmFyIHBvcyA9IGNvbnRhaW5lci5pbmRleE9mKHZhbHVlKTtcclxuXHRpZiAocG9zID49IDApIHtcclxuXHRcdHJldHVyblZhbHVlID0gdHJ1ZTtcclxuXHR9XHJcblx0cmV0dXJuIHJldHVyblZhbHVlO1xyXG59XHJcblxyXG5sZXQgR2VzdHVyZVJlY29nbml6ZXIsIEludGVyb3A7XHJcbmlmIChpb3MpIHtcclxuXHRHZXN0dXJlUmVjb2duaXplciA9IE5TT2JqZWN0O1xyXG5cdEludGVyb3AgPSBpbnRlcm9wO1xyXG59IGVsc2Uge1xyXG5cdEdlc3R1cmVSZWNvZ25pemVyID0gY2xhc3MgQSB7IH07XHJcblx0SW50ZXJvcCA9IHsgdHlwZXM6IHsgaWQ6IHZvaWQgMCwgdm9pZDogdm9pZCAwIH0gfTtcclxufVxyXG5cclxuY2xhc3MgSGlkZUdlc3R1cmVSZWNvZ25pemVySW1wbCBleHRlbmRzIEdlc3R1cmVSZWNvZ25pemVyIHtcclxuXHRwdWJsaWMgZnVuYzogKCkgPT4gdm9pZDtcclxuXHJcblx0c3RhdGljIGluaXRXaXRoT3duZXIob3duZXIpIHtcclxuXHRcdGNvbnN0IGhhbmRsZXIgPSBuZXcgSGlkZUdlc3R1cmVSZWNvZ25pemVySW1wbCgpO1xyXG5cdFx0aGFuZGxlci5fb3duZXIgPSBvd25lcjtcclxuXHRcdHJldHVybiBoYW5kbGVyO1xyXG5cdH1cclxuXHJcblx0dGFwKCkge1xyXG5cdFx0dGhpcy5fb3duZXIuaW9zLnJlc2lnbkZpcnN0UmVzcG9uZGVyKCk7XHJcblx0XHRpZiAodGhpcy5mdW5jKSB7XHJcblx0XHRcdHRoaXMuZnVuYygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3RhdGljIE9iakNFeHBvc2VkTWV0aG9kcyA9IHtcclxuXHRcdFwidGFwXCI6IHsgcmV0dXJuczogSW50ZXJvcC50eXBlcy52b2lkLCBwYXJhbXM6IFtJbnRlcm9wLnR5cGVzLmlkXSB9XHJcblx0fTtcclxufVxyXG5cclxuLy8gS2VlcCBleHRlcm5hbCBzdGF0ZSBvZiB2aWV3c1xyXG5sZXQgdGFyZ2V0SGFuZGxlciA9IG51bGw7XHJcbmxldCB0YXJnZXRIYW5kbGVyMiA9IG51bGw7XHJcblxyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6IFwibW9kYWwsIFttb2RhbF1cIixcclxuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG5cdHRlbXBsYXRlVXJsOiBcIi4vbW9kYWwuY29tcG9uZW50Lmh0bWxcIixcclxuXHRzdHlsZVVybHM6IFsnLi9tb2RhbC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIE1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRwcml2YXRlIGlzU2hvd2luZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdHByaXZhdGUgcGFnZUhlaWdodDogbnVtYmVyO1xyXG5cdHByaXZhdGUgZHVyYXRpb25TY2FsZTogbnVtYmVyID0gLjc1O1xyXG5cdHByaXZhdGUgb3ZlcmxheVZpZXc6IFZpZXc7XHJcblx0cHJpdmF0ZSBkYXRhOiBhbnkgPSBudWxsOyAvLyBPcHRpb25hbCBkYXRhIHBhcmFtZXRlclxyXG5cdEBJbnB1dCgpIHByaXZhdGUgc2l6ZTogc3RyaW5nID0gXCJzbVwiOyAvLyBzbSB8IG1kIHwgbGdcclxuXHRASW5wdXQoKSBwcml2YXRlIGRpc21pc3NhYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuXHRASW5wdXQoKSBwcml2YXRlIGFsaWdubWVudDogc3RyaW5nID0gXCJjZW50ZXJcIjsgLy8gY2VudGVyIHwgc3RyZXRjaCB8IG1pZGRsZSB8IHRvcCB8IGJvdHRvbVxyXG5cdEBJbnB1dCgpIHByaXZhdGUgZHVyYXRpb246IG51bWJlciA9IDI1MDsgLy8gaW4gbWlsbGlzZWNvbmRzXHJcblx0QE91dHB1dCgpIHByaXZhdGUgb3BlbiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG5cdEBPdXRwdXQoKSBwcml2YXRlIGNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XHJcblx0QFZpZXdDaGlsZChcImJvZHlFbFwiKSBwcml2YXRlIGJvZHlFbDogRWxlbWVudFJlZjtcclxuXHRAVmlld0NoaWxkKFwiY29udGVudEVsXCIpIHByaXZhdGUgY29udGVudEVsOiBFbGVtZW50UmVmO1xyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHByaXZhdGUgaG9zdEVsOiBFbGVtZW50UmVmLFxyXG5cdFx0cHJpdmF0ZSBwYWdlOiBQYWdlXHJcblx0KSB7XHJcblx0XHRpZiAoaXNBbmRyb2lkKSB7XHJcblx0XHRcdHRoaXMucGFnZS5vbihQYWdlLmxvYWRlZEV2ZW50LCAoKSA9PiB7XHJcblx0XHRcdFx0YW5kcm9pZC5vbihBbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCAoYXJnczogQW5kcm9pZEFjdGl2aXR5QmFja1ByZXNzZWRFdmVudERhdGEpID0+IHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLmlzU2hvd2luZykge1xyXG5cdFx0XHRcdFx0XHRhcmdzLmNhbmNlbCA9IHRydWU7XHJcblx0XHRcdFx0XHRcdHRoaXMuaGlkZSgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0dGhpcy5wYWdlLm9uKFBhZ2UudW5sb2FkZWRFdmVudCwgKCkgPT4ge1xyXG5cdFx0XHRcdGFuZHJvaWQub2ZmKEFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG5nT25Jbml0KCkge1xyXG5cdFx0dGhpcy5wYWdlSGVpZ2h0ID0gdGhpcy5wYWdlSGVpZ2h0ID8gdGhpcy5wYWdlSGVpZ2h0IDogc2NyZWVuLm1haW5TY3JlZW4uaGVpZ2h0RElQcztcclxuXHRcdHRoaXMuaG9zdFZpZXcuc3R5bGUudHJhbnNsYXRlWSA9IHRoaXMucGFnZUhlaWdodDtcclxuXHR9XHJcblxyXG5cdHNob3coZGF0YTogYW55ID0gbnVsbCkge1xyXG5cdFx0aWYgKCF0aGlzLm92ZXJsYXlWaWV3KSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHRoaXMuaG9zdFZpZXcuc3R5bGUudHJhbnNsYXRlWSA9IDA7XHJcblx0XHRyZXR1cm4gdGhpcy5vdmVybGF5Vmlldy5hbmltYXRlKHtcclxuXHRcdFx0dHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSwgZHVyYXRpb246IDAsXHJcblx0XHR9KS50aGVuKCgpID0+IHRoaXMub3ZlcmxheVZpZXcuYW5pbWF0ZSh7XHJcblx0XHRcdG9wYWNpdHk6IDEsIGR1cmF0aW9uOiB0aGlzLnRpbWluZyAqIHRoaXMuZHVyYXRpb25TY2FsZSxcclxuXHRcdH0pKS50aGVuKCgpID0+IHRoaXMuYm9keVZpZXcuYW5pbWF0ZSh7XHJcblx0XHRcdHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXHJcblx0XHRcdGR1cmF0aW9uOiAwLFxyXG5cdFx0XHRjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuY3ViaWNCZXppZXIoLjEyLCAuMywgLjU4LCAuNDQpLFxyXG5cdFx0fSkpLnRoZW4oKCkgPT4gdGhpcy5ib2R5Vmlldy5hbmltYXRlKHtcclxuXHRcdFx0c2NhbGU6IHsgeDogMSwgeTogMSB9LFxyXG5cdFx0XHRvcGFjaXR5OiAxLFxyXG5cdFx0XHRkdXJhdGlvbjogdGhpcy50aW1pbmcsXHJcblx0XHRcdGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5jdWJpY0JlemllciguMTIsIC4zLCAuNTgsIC40NCksXHJcblx0XHR9KSkudGhlbigoKSA9PiB7XHJcblx0XHRcdHRoaXMub3Blbi5lbWl0KHRoaXMuZGF0YSA9IGRhdGEpO1xyXG5cdFx0XHR0aGlzLmlzU2hvd2luZyA9IHRydWU7XHJcblx0XHR9KS5jYXRjaCgoKSA9PiAwKTtcclxuXHR9XHJcblxyXG5cdGhpZGUoKSB7XHJcblx0XHRyZXR1cm4gdGhpcy5ib2R5Vmlldy5hbmltYXRlKHtcclxuXHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0ZHVyYXRpb246IHRoaXMudGltaW5nICogdGhpcy5kdXJhdGlvblNjYWxlLFxyXG5cdFx0XHRjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuY3ViaWNCZXppZXIoLjEyLCAuMywgLjU4LCAuNDQpLFxyXG5cdFx0fSkudGhlbigoKSA9PiB0aGlzLmJvZHlWaWV3LmFuaW1hdGUoe1xyXG5cdFx0XHRzY2FsZTogeyB4OiAuNiwgeTogLjYgfSxcclxuXHRcdFx0dHJhbnNsYXRlOiB7IHg6IDAsIHk6IHRoaXMucGFnZUhlaWdodCB9LFxyXG5cdFx0XHRkdXJhdGlvbjogMCxcclxuXHRcdFx0Y3VydmU6IEFuaW1hdGlvbkN1cnZlLmN1YmljQmV6aWVyKC4xMiwgLjMsIC41OCwgLjQ0KSxcclxuXHRcdH0pKS50aGVuKCgpID0+IHRoaXMub3ZlcmxheVZpZXcuYW5pbWF0ZSh7XHJcblx0XHRcdG9wYWNpdHk6IDAsIGR1cmF0aW9uOiB0aGlzLnRpbWluZyAqIHRoaXMuZHVyYXRpb25TY2FsZSxcclxuXHRcdFx0Y3VydmU6IEFuaW1hdGlvbkN1cnZlLmVhc2VJbk91dCxcclxuXHRcdH0pKS50aGVuKCgpID0+IHRoaXMub3ZlcmxheVZpZXcuYW5pbWF0ZSh7XHJcblx0XHRcdHRyYW5zbGF0ZTogeyB4OiAwLCB5OiB0aGlzLnBhZ2VIZWlnaHQgfSxcclxuXHRcdFx0ZHVyYXRpb246IDAsXHJcblx0XHRcdGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5lYXNlSW5PdXQsXHJcblx0XHR9KSkudGhlbihkYXRhID0+IHtcclxuXHRcdFx0dGhpcy5ob3N0Vmlldy5zdHlsZS50cmFuc2xhdGVZID0gdGhpcy5wYWdlSGVpZ2h0O1xyXG5cdFx0XHR0aGlzLmNsb3NlLmVtaXQodGhpcy5kYXRhKTtcclxuXHRcdFx0dGhpcy5pc1Nob3dpbmcgPSBmYWxzZTtcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLmRhdGEpO1xyXG5cdFx0fSkuY2F0Y2goKCkgPT4gMCk7XHJcblx0fVxyXG5cclxuXHRvblRhcEhpZGUgPSAoKSA9PiB7XHJcblx0XHRpZiAoaXNBbmRyb2lkICYmIHRoaXMuZGlzbWlzc2FibGUpIHtcclxuXHRcdFx0dGhpcy5oaWRlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRvbkxvYWQoeyBvYmplY3QgfSkge1xyXG5cdFx0dGhpcy5vdmVybGF5VmlldyA9IDxWaWV3Pm9iamVjdDtcclxuXHJcblx0XHR0aGlzLmNvbnRlbnRWaWV3Lm9mZihbR2VzdHVyZVR5cGVzLnRvdWNoLCBHZXN0dXJlVHlwZXMudGFwXS5qb2luKFwiLFwiKSk7XHJcblxyXG5cdFx0Ly8gRXZlbnQgUHJvcGFnYXRpb25cclxuXHRcdGlmIChpb3MpIHtcclxuXHRcdFx0dGFyZ2V0SGFuZGxlciA9IEhpZGVHZXN0dXJlUmVjb2duaXplckltcGwuaW5pdFdpdGhPd25lcih0aGlzLm92ZXJsYXlWaWV3KTtcclxuXHRcdFx0aWYgKHRoaXMuZGlzbWlzc2FibGUpIHtcclxuXHRcdFx0XHR0YXJnZXRIYW5kbGVyLmZ1bmMgPSAoKSA9PiB0aGlzLmhpZGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zdCBnZXN0dXJlID0gVUlUYXBHZXN0dXJlUmVjb2duaXplci5hbGxvYygpLmluaXRXaXRoVGFyZ2V0QWN0aW9uKHRhcmdldEhhbmRsZXIsIFwidGFwXCIpO1xyXG5cdFx0XHR0aGlzLm92ZXJsYXlWaWV3Lmlvcy5hZGRHZXN0dXJlUmVjb2duaXplcihnZXN0dXJlKTtcclxuXHJcblx0XHRcdHRhcmdldEhhbmRsZXIyID0gSGlkZUdlc3R1cmVSZWNvZ25pemVySW1wbC5pbml0V2l0aE93bmVyKHRoaXMuYm9keVZpZXcpO1xyXG5cdFx0XHRjb25zdCBnZXN0dXJlMiA9IFVJVGFwR2VzdHVyZVJlY29nbml6ZXIuYWxsb2MoKS5pbml0V2l0aFRhcmdldEFjdGlvbih0YXJnZXRIYW5kbGVyMiwgXCJ0YXBcIik7XHJcblx0XHRcdGdlc3R1cmUyLmNhbmNlbHNUb3VjaGVzSW5WaWV3ID0gdHJ1ZTtcclxuXHRcdFx0dGhpcy5ib2R5Vmlldy5pb3MuYWRkR2VzdHVyZVJlY29nbml6ZXIoZ2VzdHVyZTIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBnZXQgdGltaW5nKCk6IG51bWJlciB7XHJcblx0XHRyZXR1cm4gK3RoaXMuZHVyYXRpb247XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IHRyYW5zbGF0ZVkoKTogbnVtYmVyIHtcclxuXHRcdHJldHVybiB0aGlzLnBhZ2VIZWlnaHQ7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldCBob3N0VmlldygpOiBWaWV3IHtcclxuXHRcdHJldHVybiB0aGlzLmhvc3RFbC5uYXRpdmVFbGVtZW50O1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBnZXQgYm9keVZpZXcoKTogVmlldyB7XHJcblx0XHRyZXR1cm4gdGhpcy5ib2R5RWwubmF0aXZlRWxlbWVudDtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0IGNvbnRlbnRWaWV3KCk6IFZpZXcge1xyXG5cdFx0cmV0dXJuIHRoaXMuY29udGVudEVsLm5hdGl2ZUVsZW1lbnQ7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IG1vZGFsV2lkdGgoKTogc3RyaW5nIHtcclxuXHRcdHN3aXRjaCAodGhpcy5zaXplKSB7XHJcblx0XHRcdGNhc2UgXCJzbVwiOiByZXR1cm4gXCI2NSVcIjtcclxuXHRcdFx0Y2FzZSBcImxnXCI6IHJldHVybiBcIjk4JVwiO1xyXG5cdFx0XHRjYXNlIFwibWRcIjpcclxuXHRcdFx0ZGVmYXVsdDogcmV0dXJuIFwiODUlXCI7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IG1vZGFsSGVpZ2h0KCk6IHN0cmluZyB7XHJcblx0XHRzd2l0Y2ggKHRoaXMuc2l6ZSkge1xyXG5cdFx0XHRjYXNlIFwic21cIjogcmV0dXJuIFwiNTAlXCI7XHJcblx0XHRcdGNhc2UgXCJsZ1wiOiByZXR1cm4gXCI5OCVcIjtcclxuXHRcdFx0Y2FzZSBcIm1kXCI6XHJcblx0XHRcdGRlZmF1bHQ6IHJldHVybiBcIjY1JVwiO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHVibGljIGdldCB2QWxpZ25tZW50KCk6IHN0cmluZyB7XHJcblx0XHRpZiAoaW5jbHVkZXMoW1wiY2VudGVyXCIsIFwic3RyZXRjaFwiLCBcIm1pZGRsZVwiLCBcInRvcFwiLCBcImJvdHRvbVwiXSwgdGhpcy5hbGlnbm1lbnQpKSB7XHJcblx0XHRcdHJldHVybiB0aGlzLmFsaWdubWVudDtcclxuXHRcdH1cclxuXHRcdHJldHVybiBcImNlbnRlclwiO1xyXG5cdH1cclxufVxyXG5cclxuIl19