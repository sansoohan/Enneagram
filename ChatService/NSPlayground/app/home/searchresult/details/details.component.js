"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var enums_1 = require("tns-core-modules/ui/enums");
var platform_1 = require("tns-core-modules/platform");
var firebase_service_1 = require("../../../services/firebase.service");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlscy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXRhaWxzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF3RTtBQUN4RSxzREFBMEU7QUFFMUUsbURBQTJEO0FBRzNELHNEQUFtRDtBQUNuRCx1RUFBcUU7QUFDckUsNERBQTBEO0FBUTFEO0lBV0MsMEJBQW9CLGlCQUFvQyxFQUMvQyxnQkFBa0MsRUFDbEMsZUFBZ0M7UUFGckIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUMvQyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQVZoQyxpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUN6Qix1QkFBa0IsR0FBVyxDQUFDLENBQUM7UUFDL0IsMkJBQXNCLEdBQVcsQ0FBQyxDQUFDO1FBVTNDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQztRQUNyRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM3RixDQUFDO3lCQWpCVyxnQkFBZ0I7SUFxQjVCLHNCQUFJLHVDQUFTO2FBQWI7WUFDQyxNQUFNLENBQUMsaUJBQU0sQ0FBQyxVQUFVLENBQUMsVUFBVSxHQUFHLENBQUMsR0FBRyxrQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQztRQUM3RSxDQUFDOzs7T0FBQTtJQUVELG9DQUFTLEdBQVQsVUFBVSxJQUFVLEVBQUUsUUFBZ0IsRUFBRSxLQUFhO1FBQ3BELElBQUksQ0FBQyxPQUFPLENBQUM7WUFDWixLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDckIsU0FBUyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFD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ZTtPQWI3QixnQkFBZ0IsQ0F5RjVCO0lBQUQsdUJBQUM7O0NBQUEsQUF6RkQsSUF5RkM7QUF6RlksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUGFnZVJvdXRlLCBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvY29yZS92aWV3XCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbkN1cnZlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZW51bXNcIjtcclxuaW1wb3J0IHsgR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzXCI7XHJcbmltcG9ydCB7IFNjcm9sbEV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3Njcm9sbC12aWV3XCI7XHJcbmltcG9ydCB7IHNjcmVlbiB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3BsYXRmb3JtXCI7XHJcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gXCIuLi8uLi8uLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbnNTZXJ2aWNlIH0gZnJvbSBcIi4uL2FuaW1hdGlvbnMtc2VydmljZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcblx0c2VsZWN0b3I6IFwiRGV0YWlsc1wiLFxyXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcblx0dGVtcGxhdGVVcmw6IFwiLi9kZXRhaWxzLmNvbXBvbmVudC5odG1sXCIsXHJcblx0c3R5bGVVcmxzOiBbJy4vZGV0YWlscy5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIERldGFpbHNDb21wb25lbnQge1xyXG5cdEBJbnB1dCgpIGxhbmRtYXJrOiBhbnk7XHJcblx0QElucHV0KCkgb2Zmc2V0OiBudW1iZXI7XHJcblx0QElucHV0KCkgaW1hZ2VPcGFjaXR5OiBudW1iZXIgPSAxO1xyXG5cdEBJbnB1dCgpIGRvY2tlZExhYmVsT3BhY2l0eTogbnVtYmVyID0gMDtcclxuXHRASW5wdXQoKSBkb2NrZWRMYWJlbFRleHRPcGFjaXR5OiBudW1iZXIgPSAwO1xyXG5cdEBWaWV3Q2hpbGQoXCJpbWFnZUNvbnRhaW5lclwiKSBpbWFnZUNvbnRhaW5lclJlZjogRWxlbWVudFJlZjtcclxuXHRAVmlld0NoaWxkKFwiaW1hZ2VcIikgaW1hZ2VSZWY6IEVsZW1lbnRSZWY7XHJcblx0QFZpZXdDaGlsZChcInRpdGxlXCIpIHRpdGxlUmVmOiBFbGVtZW50UmVmO1xyXG5cdHN0YXRpYyBJTUFHRV9NSU5fSEVJR0hUID0gNDg7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgYW5pbWF0aW9uc1NlcnZpY2U6IEFuaW1hdGlvbnNTZXJ2aWNlLFxyXG5cdFx0cHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG5cdFx0cHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSxcclxuXHQpIHtcclxuXHRcdHRoaXMub2Zmc2V0ID0gdGhpcy5hbmltYXRpb25zU2VydmljZS5hbmltYXRpb25PZmZzZXQ7XHJcblx0XHR0aGlzLmxhbmRtYXJrID0gdGhpcy5maXJlYmFzZVNlcnZpY2UuZ2V0U2VsZWN0ZWRQb3N0KClbdGhpcy5maXJlYmFzZVNlcnZpY2Uuc2VsZWN0ZWRQb3N0SURdO1xyXG5cdH1cclxuXHJcblxyXG5cdFxyXG5cdGdldCBtaW5IZWlnaHQoKSB7XHJcblx0XHRyZXR1cm4gc2NyZWVuLm1haW5TY3JlZW4uaGVpZ2h0RElQcyArIDIgKiBEZXRhaWxzQ29tcG9uZW50LklNQUdFX01JTl9IRUlHSFQ7XHJcblx0fVxyXG5cclxuXHRhbmltYXRlSW4odmlldzogVmlldywgZHVyYXRpb246IG51bWJlciwgZGVsYXk6IG51bWJlcikge1xyXG5cdFx0dmlldy5hbmltYXRlKHtcclxuXHRcdFx0c2NhbGU6IHsgeDogMSwgeTogMSB9LFxyXG5cdFx0XHR0cmFuc2xhdGU6IHsgeDogMCwgeTogMCB9LFxyXG5cdFx0XHRkdXJhdGlvbjogZHVyYXRpb24sXHJcblx0XHRcdGRlbGF5OiBkZWxheSxcclxuXHRcdFx0Y3VydmU6IEFuaW1hdGlvbkN1cnZlLmVhc2VPdXRcclxuXHRcdH0pLmNhdGNoKCgpID0+IHsgfSk7XHJcblx0fVxyXG5cclxuXHRhbmltYXRlT3V0KHZpZXc6IFZpZXcpIHtcclxuXHRcdHZpZXcuYW5pbWF0ZSh7XHJcblx0XHRcdG9wYWNpdHk6IDAsXHJcblx0XHRcdGR1cmF0aW9uOiAyMDBcclxuXHRcdH0pLmNhdGNoKCgpID0+IHsgfSk7XHJcblx0fVxyXG5cclxuXHRvblNjcm9sbChhcmdzOiBTY3JvbGxFdmVudERhdGEpIHtcclxuXHRcdGxldCBpbWFnZUNvbnRhaW5lciA9IHRoaXMuaW1hZ2VDb250YWluZXJSZWYubmF0aXZlRWxlbWVudDtcclxuXHJcblx0XHRsZXQgb2Zmc2V0ID0gYXJncy5zY3JvbGxZIDwgMCA/IDAgOiBhcmdzLnNjcm9sbFk7XHJcblx0XHRsZXQgaW1hZ2VIZWlnaHQgPSBpbWFnZUNvbnRhaW5lci5nZXRBY3R1YWxTaXplKCkuaGVpZ2h0O1xyXG5cclxuXHRcdHRoaXMuYXBwbHlJbWFnZVRyYW5zaXRpb24ob2Zmc2V0LCBpbWFnZUhlaWdodCk7XHJcblx0XHR0aGlzLmFwcGx5VGl0bGVUcmFuc2l0aW9uKG9mZnNldCwgaW1hZ2VIZWlnaHQpO1xyXG5cdFx0dGhpcy5hcHBseURvY2tIZWFkZXJUcmFuc2l0aW9uKG9mZnNldCwgaW1hZ2VIZWlnaHQpO1xyXG5cdH1cclxuXHJcblx0b25UYXAoYXJnczogR2VzdHVyZUV2ZW50RGF0YSkge1xyXG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgYXBwbHlJbWFnZVRyYW5zaXRpb24oc2Nyb2xsT2Zmc2V0OiBudW1iZXIsIGltYWdlSGVpZ2h0OiBudW1iZXIpIHtcclxuXHRcdGxldCBpbWFnZUNvbnRhaW5lciA9IHRoaXMuaW1hZ2VDb250YWluZXJSZWYubmF0aXZlRWxlbWVudDtcclxuXHRcdGxldCBpbWFnZSA9IHRoaXMuaW1hZ2VSZWYubmF0aXZlRWxlbWVudDtcclxuXHRcdGxldCBpbWFnZUhlaWdodE1heENoYW5nZSA9IGltYWdlSGVpZ2h0IC0gRGV0YWlsc0NvbXBvbmVudC5JTUFHRV9NSU5fSEVJR0hUO1xyXG5cclxuXHRcdGltYWdlQ29udGFpbmVyLnRyYW5zbGF0ZVkgPSBzY3JvbGxPZmZzZXQgLyAxLjU7XHJcblx0XHRpbWFnZS5zY2FsZVggPSAxICsgc2Nyb2xsT2Zmc2V0IC8gaW1hZ2VIZWlnaHRNYXhDaGFuZ2U7XHJcblx0XHRpbWFnZS5zY2FsZVkgPSAxICsgc2Nyb2xsT2Zmc2V0IC8gaW1hZ2VIZWlnaHRNYXhDaGFuZ2U7XHJcblx0XHR0aGlzLmltYWdlT3BhY2l0eSA9IDEgLSBzY3JvbGxPZmZzZXQgLyBpbWFnZUhlaWdodE1heENoYW5nZTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgYXBwbHlUaXRsZVRyYW5zaXRpb24oc2Nyb2xsT2Zmc2V0OiBudW1iZXIsIGltYWdlSGVpZ2h0OiBudW1iZXIpIHtcclxuXHRcdGxldCBpbWFnZUhlaWdodE1heENoYW5nZSA9IGltYWdlSGVpZ2h0IC0gRGV0YWlsc0NvbXBvbmVudC5JTUFHRV9NSU5fSEVJR0hUO1xyXG5cdFx0bGV0IHRpdGxlID0gdGhpcy50aXRsZVJlZi5uYXRpdmVFbGVtZW50O1xyXG5cclxuXHRcdGlmIChpbWFnZUhlaWdodE1heENoYW5nZSA8IHNjcm9sbE9mZnNldCkge1xyXG5cdFx0XHR0aXRsZS50cmFuc2xhdGVYID0gLShzY3JvbGxPZmZzZXQgLSBpbWFnZUhlaWdodE1heENoYW5nZSkgLyAxLjI7XHJcblx0XHRcdHRpdGxlLnRyYW5zbGF0ZVkgPSAtKHNjcm9sbE9mZnNldCAtIGltYWdlSGVpZ2h0TWF4Q2hhbmdlKSAqIDI7XHJcblx0XHRcdHRpdGxlLnNjYWxlWCA9IDEgLSAoc2Nyb2xsT2Zmc2V0IC0gaW1hZ2VIZWlnaHRNYXhDaGFuZ2UpIC8gaW1hZ2VIZWlnaHQ7XHJcblx0XHRcdHRpdGxlLnNjYWxlWSA9IDEgLSAoc2Nyb2xsT2Zmc2V0IC0gaW1hZ2VIZWlnaHRNYXhDaGFuZ2UpIC8gaW1hZ2VIZWlnaHQ7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aXRsZS50cmFuc2xhdGVYID0gMDtcclxuXHRcdFx0dGl0bGUudHJhbnNsYXRlWSA9IDA7XHJcblx0XHRcdHRpdGxlLnNjYWxlWCA9IDE7XHJcblx0XHRcdHRpdGxlLnNjYWxlWSA9IDE7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGFwcGx5RG9ja0hlYWRlclRyYW5zaXRpb24oc2Nyb2xsT2Zmc2V0OiBudW1iZXIsIGltYWdlSGVpZ2h0OiBudW1iZXIpIHtcclxuXHRcdHRoaXMuZG9ja2VkTGFiZWxPcGFjaXR5ID0gdGhpcy5pbWFnZU9wYWNpdHkgPD0gMCA/IDEgOiAwO1xyXG5cdFx0dGhpcy5kb2NrZWRMYWJlbFRleHRPcGFjaXR5ID0gKHNjcm9sbE9mZnNldCAtIChpbWFnZUhlaWdodCAtIERldGFpbHNDb21wb25lbnQuSU1BR0VfTUlOX0hFSUdIVCkpIC8gRGV0YWlsc0NvbXBvbmVudC5JTUFHRV9NSU5fSEVJR0hUIC0gMC4yO1xyXG5cdH1cclxufSJdfQ==