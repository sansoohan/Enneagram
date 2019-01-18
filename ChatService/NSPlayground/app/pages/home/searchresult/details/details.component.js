"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var enums_1 = require("tns-core-modules/ui/enums");
var platform_1 = require("tns-core-modules/platform");
var firebase_service_1 = require("~/services/firebase.service");
var animations_service_1 = require("../animations-service");
var DetailsComponent = /** @class */ (function () {
    function DetailsComponent(animationsService, routerExtensions, firebaseService) {
        this.animationsService = animationsService;
        this.routerExtensions = routerExtensions;
        this.firebaseService = firebaseService;
        this.imageOpacity = 1;
        this.dockedLabelOpacity = 0;
        this.dockedLabelTextOpacity = 0;
        this.offset = this.animationsService.animationOffset;
        this.landmark = this.firebaseService.getSelectedPost()[this.firebaseService.selectedPostID];
    }
    DetailsComponent_1 = DetailsComponent;
    Object.defineProperty(DetailsComponent.prototype, "minHeight", {
        get: function () {
            return platform_1.screen.mainScreen.heightDIPs + 2 * DetailsComponent_1.IMAGE_MIN_HEIGHT;
        },
        enumerable: true,
        configurable: true
    });
    DetailsComponent.prototype.animateIn = function (view, duration, delay) {
        view.animate({
            scale: { x: 1, y: 1 },
            translate: { x: 0, y: 0 },
            duration: duration,
            delay: delay,
            curve: enums_1.AnimationCurve.easeOut
        }).catch(function () { });
    };
    DetailsComponent.prototype.animateOut = function (view) {
        view.animate({
            opacity: 0,
            duration: 200
        }).catch(function () { });
    };
    DetailsComponent.prototype.onScroll = function (args) {
        var imageContainer = this.imageContainerRef.nativeElement;
        var offset = args.scrollY < 0 ? 0 : args.scrollY;
        var imageHeight = imageContainer.getActualSize().height;
        this.applyImageTransition(offset, imageHeight);
        this.applyTitleTransition(offset, imageHeight);
        this.applyDockHeaderTransition(offset, imageHeight);
    };
    DetailsComponent.prototype.onTap = function (args) {
        this.routerExtensions.back();
    };
    DetailsComponent.prototype.applyImageTransition = function (scrollOffset, imageHeight) {
        var imageContainer = this.imageContainerRef.nativeElement;
        var image = this.imageRef.nativeElement;
        var imageHeightMaxChange = imageHeight - DetailsComponent_1.IMAGE_MIN_HEIGHT;
        imageContainer.translateY = scrollOffset / 1.5;
        image.scaleX = 1 + scrollOffset / imageHeightMaxChange;
        image.scaleY = 1 + scrollOffset / imageHeightMaxChange;
        this.imageOpacity = 1 - scrollOffset / imageHeightMaxChange;
    };
    DetailsComponent.prototype.applyTitleTransition = function (scrollOffset, imageHeight) {
        var imageHeightMaxChange = imageHeight - DetailsComponent_1.IMAGE_MIN_HEIGHT;
        var title = this.titleRef.nativeElement;
        if (imageHeightMaxChange < scrollOffset) {
            title.translateX = -(scrollOffset - imageHeightMaxChange) / 1.2;
            title.translateY = -(scrollOffset - imageHeightMaxChange) * 2;
            title.scaleX = 1 - (scrollOffset - imageHeightMaxChange) / imageHeight;
            title.scaleY = 1 - (scrollOffset - imageHeightMaxChange) / imageHeight;
        }
        else {
            title.translateX = 0;
            title.translateY = 0;
            title.scaleX = 1;
            title.scaleY = 1;
        }
    };
    DetailsComponent.prototype.applyDockHeaderTransition = function (scrollOffset, imageHeight) {
        this.dockedLabelOpacity = this.imageOpacity <= 0 ? 1 : 0;
        this.dockedLabelTextOpacity = (scrollOffset - (imageHeight - DetailsComponent_1.IMAGE_MIN_HEIGHT)) / DetailsComponent_1.IMAGE_MIN_HEIGHT - 0.2;
    };
    DetailsComponent.IMAGE_MIN_HEIGHT = 48;
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DetailsComponent.prototype, "landmark", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DetailsComponent.prototype, "offset", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DetailsComponent.prototype, "imageOpacity", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DetailsComponent.prototype, "dockedLabelOpacity", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DetailsComponent.prototype, "dockedLabelTextOpacity", void 0);
    __decorate([
        core_1.ViewChild("imageContainer"),
        __metadata("design:type", core_1.ElementRef)
    ], DetailsComponent.prototype, "imageContainerRef", void 0);
    __decorate([
        core_1.ViewChild("image"),
        __metadata("design:type", core_1.ElementRef)
    ], DetailsComponent.prototype, "imageRef", void 0);
    __decorate([
        core_1.ViewChild("title"),
        __metadata("design:type", core_1.ElementRef)
    ], DetailsComponent.prototype, "titleRef", void 0);
    DetailsComponent = DetailsComponent_1 = __decorate([
        core_1.Component({
            selector: "Details",
            moduleId: module.id,
            templateUrl: "./details.component.html",
            styleUrls: ['./details.component.css']
        }),
        __metadata("design:paramtypes", [animations_service_1.AnimationsService,
            router_1.RouterExtensions,
            firebase_service_1.FirebaseService])
    ], DetailsComponent);
    return DetailsComponent;
    var DetailsComponent_1;
}());
exports.DetailsComponent = DetailsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlscy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXRhaWxzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF3RTtBQUN4RSxzREFBMEU7QUFFMUUsbURBQTJEO0FBRzNELHNEQUFtRDtBQUNuRCxnRUFBOEQ7QUFDOUQsNERBQTBEO0FBUTFEO0lBV0MsMEJBQW9CLGlCQUFvQyxFQUMvQyxnQkFBa0MsRUFDbEMsZUFBZ0M7UUFGckIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUMvQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQVZoQyxpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUN6Qix1QkFBa0IsR0FBVyxDQUFDLENBQUM7UUFDL0IsMkJBQXNCLEdBQVcsQ0FBQyxDQUFDO1FBVTNDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQztRQUNyRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM3RixDQUFDO3lCQWpCVyxnQkFBZ0I7SUFxQjVCLHNCQUFJLHVDQUFTO2FBQWI7WUFDQyxNQUFNLENBQUMsaUJBQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxHQUFHLENBQUMsR0FBRyxrQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQztRQUM3RSxDQUFDOzs7T0FBQTtJQUVELG9DQUFTLEdBQVQsVUFBVSxJQUFVLEVBQUUsUUFBZ0IsRUFBRSxLQUFhO1FBQ3BELElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDckIsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFD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ZTtPQWI3QixnQkFBZ0IsQ0F5RjVCO0lBQUQsdUJBQUM7O0NBQUEsQUF6RkQsSUF5RkM7QUF6RlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUGFnZVJvdXRlLCBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvY29yZS92aWV3XCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbkN1cnZlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZW51bXNcIjtcclxuaW1wb3J0IHsgR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzXCI7XHJcbmltcG9ydCB7IFNjcm9sbEV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3Njcm9sbC12aWV3XCI7XHJcbmltcG9ydCB7IHNjcmVlbiB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCI7XHJcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gXCJ+L3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQW5pbWF0aW9uc1NlcnZpY2UgfSBmcm9tIFwiLi4vYW5pbWF0aW9ucy1zZXJ2aWNlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuXHRzZWxlY3RvcjogXCJEZXRhaWxzXCIsXHJcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuXHR0ZW1wbGF0ZVVybDogXCIuL2RldGFpbHMuY29tcG9uZW50Lmh0bWxcIixcclxuXHRzdHlsZVVybHM6IFsnLi9kZXRhaWxzLmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgRGV0YWlsc0NvbXBvbmVudCB7XHJcblx0QElucHV0KCkgbGFuZG1hcms6IGFueTtcclxuXHRASW5wdXQoKSBvZmZzZXQ6IG51bWJlcjtcclxuXHRASW5wdXQoKSBpbWFnZU9wYWNpdHk6IG51bWJlciA9IDE7XHJcblx0QElucHV0KCkgZG9ja2VkTGFiZWxPcGFjaXR5OiBudW1iZXIgPSAwO1xyXG5cdEBJbnB1dCgpIGRvY2tlZExhYmVsVGV4dE9wYWNpdHk6IG51bWJlciA9IDA7XHJcblx0QFZpZXdDaGlsZChcImltYWdlQ29udGFpbmVyXCIpIGltYWdlQ29udGFpbmVyUmVmOiBFbGVtZW50UmVmO1xyXG5cdEBWaWV3Q2hpbGQoXCJpbWFnZVwiKSBpbWFnZVJlZjogRWxlbWVudFJlZjtcclxuXHRAVmlld0NoaWxkKFwidGl0bGVcIikgdGl0bGVSZWY6IEVsZW1lbnRSZWY7XHJcblx0c3RhdGljIElNQUdFX01JTl9IRUlHSFQgPSA0ODtcclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSBhbmltYXRpb25zU2VydmljZTogQW5pbWF0aW9uc1NlcnZpY2UsXHJcblx0XHRwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcblx0XHRwcml2YXRlIGZpcmViYXNlU2VydmljZTogRmlyZWJhc2VTZXJ2aWNlLFxyXG5cdCkge1xyXG5cdFx0dGhpcy5vZmZzZXQgPSB0aGlzLmFuaW1hdGlvbnNTZXJ2aWNlLmFuaW1hdGlvbk9mZnNldDtcclxuXHRcdHRoaXMubGFuZG1hcmsgPSB0aGlzLmZpcmViYXNlU2VydmljZS5nZXRTZWxlY3RlZFBvc3QoKVt0aGlzLmZpcmViYXNlU2VydmljZS5zZWxlY3RlZFBvc3RJRF07XHJcblx0fVxyXG5cclxuXHJcblx0XHJcblx0Z2V0IG1pbkhlaWdodCgpIHtcclxuXHRcdHJldHVybiBzY3JlZW4ubWFpblNjcmVlbi5oZWlnaHRESVBzICsgMiAqIERldGFpbHNDb21wb25lbnQuSU1BR0VfTUlOX0hFSUdIVDtcclxuXHR9XHJcblxyXG5cdGFuaW1hdGVJbih2aWV3OiBWaWV3LCBkdXJhdGlvbjogbnVtYmVyLCBkZWxheTogbnVtYmVyKSB7XHJcblx0XHR2aWV3LmFuaW1hdGUoe1xyXG5cdFx0XHRzY2FsZTogeyB4OiAxLCB5OiAxIH0sXHJcblx0XHRcdHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXHJcblx0XHRcdGR1cmF0aW9uOiBkdXJhdGlvbixcclxuXHRcdFx0ZGVsYXk6IGRlbGF5LFxyXG5cdFx0XHRjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuZWFzZU91dFxyXG5cdFx0fSkuY2F0Y2goKCkgPT4geyB9KTtcclxuXHR9XHJcblxyXG5cdGFuaW1hdGVPdXQodmlldzogVmlldykge1xyXG5cdFx0dmlldy5hbmltYXRlKHtcclxuXHRcdFx0b3BhY2l0eTogMCxcclxuXHRcdFx0ZHVyYXRpb246IDIwMFxyXG5cdFx0fSkuY2F0Y2goKCkgPT4geyB9KTtcclxuXHR9XHJcblxyXG5cdG9uU2Nyb2xsKGFyZ3M6IFNjcm9sbEV2ZW50RGF0YSkge1xyXG5cdFx0bGV0IGltYWdlQ29udGFpbmVyID0gdGhpcy5pbWFnZUNvbnRhaW5lclJlZi5uYXRpdmVFbGVtZW50O1xyXG5cclxuXHRcdGxldCBvZmZzZXQgPSBhcmdzLnNjcm9sbFkgPCAwID8gMCA6IGFyZ3Muc2Nyb2xsWTtcclxuXHRcdGxldCBpbWFnZUhlaWdodCA9IGltYWdlQ29udGFpbmVyLmdldEFjdHVhbFNpemUoKS5oZWlnaHQ7XHJcblxyXG5cdFx0dGhpcy5hcHBseUltYWdlVHJhbnNpdGlvbihvZmZzZXQsIGltYWdlSGVpZ2h0KTtcclxuXHRcdHRoaXMuYXBwbHlUaXRsZVRyYW5zaXRpb24ob2Zmc2V0LCBpbWFnZUhlaWdodCk7XHJcblx0XHR0aGlzLmFwcGx5RG9ja0hlYWRlclRyYW5zaXRpb24ob2Zmc2V0LCBpbWFnZUhlaWdodCk7XHJcblx0fVxyXG5cclxuXHRvblRhcChhcmdzOiBHZXN0dXJlRXZlbnREYXRhKSB7XHJcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBhcHBseUltYWdlVHJhbnNpdGlvbihzY3JvbGxPZmZzZXQ6IG51bWJlciwgaW1hZ2VIZWlnaHQ6IG51bWJlcikge1xyXG5cdFx0bGV0IGltYWdlQ29udGFpbmVyID0gdGhpcy5pbWFnZUNvbnRhaW5lclJlZi5uYXRpdmVFbGVtZW50O1xyXG5cdFx0bGV0IGltYWdlID0gdGhpcy5pbWFnZVJlZi5uYXRpdmVFbGVtZW50O1xyXG5cdFx0bGV0IGltYWdlSGVpZ2h0TWF4Q2hhbmdlID0gaW1hZ2VIZWlnaHQgLSBEZXRhaWxzQ29tcG9uZW50LklNQUdFX01JTl9IRUlHSFQ7XHJcblxyXG5cdFx0aW1hZ2VDb250YWluZXIudHJhbnNsYXRlWSA9IHNjcm9sbE9mZnNldCAvIDEuNTtcclxuXHRcdGltYWdlLnNjYWxlWCA9IDEgKyBzY3JvbGxPZmZzZXQgLyBpbWFnZUhlaWdodE1heENoYW5nZTtcclxuXHRcdGltYWdlLnNjYWxlWSA9IDEgKyBzY3JvbGxPZmZzZXQgLyBpbWFnZUhlaWdodE1heENoYW5nZTtcclxuXHRcdHRoaXMuaW1hZ2VPcGFjaXR5ID0gMSAtIHNjcm9sbE9mZnNldCAvIGltYWdlSGVpZ2h0TWF4Q2hhbmdlO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBhcHBseVRpdGxlVHJhbnNpdGlvbihzY3JvbGxPZmZzZXQ6IG51bWJlciwgaW1hZ2VIZWlnaHQ6IG51bWJlcikge1xyXG5cdFx0bGV0IGltYWdlSGVpZ2h0TWF4Q2hhbmdlID0gaW1hZ2VIZWlnaHQgLSBEZXRhaWxzQ29tcG9uZW50LklNQUdFX01JTl9IRUlHSFQ7XHJcblx0XHRsZXQgdGl0bGUgPSB0aGlzLnRpdGxlUmVmLm5hdGl2ZUVsZW1lbnQ7XHJcblxyXG5cdFx0aWYgKGltYWdlSGVpZ2h0TWF4Q2hhbmdlIDwgc2Nyb2xsT2Zmc2V0KSB7XHJcblx0XHRcdHRpdGxlLnRyYW5zbGF0ZVggPSAtKHNjcm9sbE9mZnNldCAtIGltYWdlSGVpZ2h0TWF4Q2hhbmdlKSAvIDEuMjtcclxuXHRcdFx0dGl0bGUudHJhbnNsYXRlWSA9IC0oc2Nyb2xsT2Zmc2V0IC0gaW1hZ2VIZWlnaHRNYXhDaGFuZ2UpICogMjtcclxuXHRcdFx0dGl0bGUuc2NhbGVYID0gMSAtIChzY3JvbGxPZmZzZXQgLSBpbWFnZUhlaWdodE1heENoYW5nZSkgLyBpbWFnZUhlaWdodDtcclxuXHRcdFx0dGl0bGUuc2NhbGVZID0gMSAtIChzY3JvbGxPZmZzZXQgLSBpbWFnZUhlaWdodE1heENoYW5nZSkgLyBpbWFnZUhlaWdodDtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRpdGxlLnRyYW5zbGF0ZVggPSAwO1xyXG5cdFx0XHR0aXRsZS50cmFuc2xhdGVZID0gMDtcclxuXHRcdFx0dGl0bGUuc2NhbGVYID0gMTtcclxuXHRcdFx0dGl0bGUuc2NhbGVZID0gMTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgYXBwbHlEb2NrSGVhZGVyVHJhbnNpdGlvbihzY3JvbGxPZmZzZXQ6IG51bWJlciwgaW1hZ2VIZWlnaHQ6IG51bWJlcikge1xyXG5cdFx0dGhpcy5kb2NrZWRMYWJlbE9wYWNpdHkgPSB0aGlzLmltYWdlT3BhY2l0eSA8PSAwID8gMSA6IDA7XHJcblx0XHR0aGlzLmRvY2tlZExhYmVsVGV4dE9wYWNpdHkgPSAoc2Nyb2xsT2Zmc2V0IC0gKGltYWdlSGVpZ2h0IC0gRGV0YWlsc0NvbXBvbmVudC5JTUFHRV9NSU5fSEVJR0hUKSkgLyBEZXRhaWxzQ29tcG9uZW50LklNQUdFX01JTl9IRUlHSFQgLSAwLjI7XHJcblx0fVxyXG59Il19