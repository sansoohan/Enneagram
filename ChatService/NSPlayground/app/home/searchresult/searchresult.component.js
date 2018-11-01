"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("nativescript-angular/router");
var page_1 = require("tns-core-modules/ui/page");
var enums_1 = require("tns-core-modules/ui/enums");
var frame_1 = require("tns-core-modules/ui/frame");
var color_1 = require("color");
var application_1 = require("application");
var platform_1 = require("platform");
var animations_service_1 = require("./animations-service");
var landmarks_service_1 = require("./landmarks-service");
var action_button_component_1 = require("./action-button/action-button.component");
var SearchResultComponent = /** @class */ (function () {
    function SearchResultComponent(animationsService, landmarksService, routerExtensions, page, location) {
        this.animationsService = animationsService;
        this.landmarksService = landmarksService;
        this.routerExtensions = routerExtensions;
        this.page = page;
        this.location = location;
        this._adjustedOffset = 0;
        this.page['scrollableContent'] = true;
        this._landmarks = this.landmarksService.getLandmarks();
        if (application_1.android) {
            this._updateStatusBarColor("#2B3238");
        }
    }
    SearchResultComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.location.onPopState(function () {
            _this._onNavigatedTo();
        });
        if (application_1.ios) {
            frame_1.topmost().ios.controller.navigationBar.barStyle = 1;
        }
    };
    Object.defineProperty(SearchResultComponent.prototype, "landmarks", {
        get: function () {
            return this._landmarks;
        },
        enumerable: true,
        configurable: true
    });
    SearchResultComponent.prototype.onNavigationItemTap = function (args) {
        var _this = this;
        this.landmarksService.setSelectedId(args.index);
        this._selectedView = args.view;
        this.animationsService.animationOffset = this.measureOffset(args.view, args.object);
        this.routerExtensions.navigate(['/details'], { animated: false });
        setTimeout(function () {
            _this._prepareForBackNavigation();
        });
    };
    SearchResultComponent.prototype.measureOffset = function (view1, view2) {
        var offset = view1.getLocationRelativeTo(view2).y;
        if (view2.ios && view2.ios.adjustedContentInset) {
            this._adjustedOffset = view2.ios.adjustedContentInset.top;
        }
        return offset - this._adjustedOffset;
    };
    SearchResultComponent.prototype._prepareForBackNavigation = function () {
        this._listRef.nativeElement.opacity = 0;
        this._selectedView.opacity = 0;
        this._imageRef.nativeElement.src = this.landmarksService.getSelected().image;
        this._imageContainerRef.nativeElement.translateY = this._adjustedOffset;
        this._imageContainerRef.nativeElement.opacity = 1;
        this._buttonRef.makeArrow();
        this._searchRef.nativeElement.opacity = 0;
    };
    SearchResultComponent.prototype._onNavigatedTo = function () {
        var _this = this;
        var offset = this.animationsService.animationOffset + this._adjustedOffset;
        this._imageContainerRef.nativeElement.animate({
            translate: { x: 0, y: offset },
            duration: 200,
            curve: enums_1.AnimationCurve.easeOut
        }).then(function () {
            _this._selectedView.opacity = 1;
            _this._imageContainerRef.nativeElement.animate({
                opacity: 0,
                duration: 400,
                curve: enums_1.AnimationCurve.easeOut
            }).then(function () {
                _this._imageContainerRef.nativeElement.translateY = 0;
            });
        }).catch(function () { });
        this._listRef.nativeElement.animate({
            opacity: 1,
            duration: 200
        }).catch(function () { });
        this._searchRef.nativeElement.animate({
            opacity: 1,
            duration: 200
        }).catch(function () { });
    };
    SearchResultComponent.prototype._updateStatusBarColor = function (color) {
        if (platform_1.device.sdkVersion >= "21" && application_1.android.foregroundActivity) {
            var nativeColor = new color_1.Color(color).android;
            var window = application_1.android.foregroundActivity.getWindow();
            window.setStatusBarColor(nativeColor);
        }
    };
    __decorate([
        core_1.ViewChild("actionButton"),
        __metadata("design:type", action_button_component_1.ActionButtonComponent)
    ], SearchResultComponent.prototype, "_buttonRef", void 0);
    __decorate([
        core_1.ViewChild("search"),
        __metadata("design:type", core_1.ElementRef)
    ], SearchResultComponent.prototype, "_searchRef", void 0);
    __decorate([
        core_1.ViewChild("list"),
        __metadata("design:type", core_1.ElementRef)
    ], SearchResultComponent.prototype, "_listRef", void 0);
    __decorate([
        core_1.ViewChild("animatingImage"),
        __metadata("design:type", core_1.ElementRef)
    ], SearchResultComponent.prototype, "_imageRef", void 0);
    __decorate([
        core_1.ViewChild("animatingImageContainer"),
        __metadata("design:type", core_1.ElementRef)
    ], SearchResultComponent.prototype, "_imageContainerRef", void 0);
    SearchResultComponent = __decorate([
        core_1.Component({
            selector: "SearchResult",
            moduleId: module.id,
            templateUrl: "./searchresult.component.html",
            styleUrls: ['./searchresult.component.css']
        }),
        __metadata("design:paramtypes", [animations_service_1.AnimationsService,
            landmarks_service_1.LandmarksService,
            router_1.RouterExtensions,
            page_1.Page,
            common_1.PlatformLocation])
    ], SearchResultComponent);
    return SearchResultComponent;
}());
exports.SearchResultComponent = SearchResultComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNocmVzdWx0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlYXJjaHJlc3VsdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBaUU7QUFDakUsMENBQW1EO0FBR25ELHNEQUErRDtBQUUvRCxpREFBZ0Q7QUFDaEQsbURBQTJEO0FBQzNELG1EQUFvRDtBQUNwRCwrQkFBOEI7QUFDOUIsMkNBQTJDO0FBQzNDLHFDQUFrQztBQUNsQywyREFBeUQ7QUFDekQseURBQXVEO0FBQ3ZELG1GQUFnRjtBQVFoRjtJQVdDLCtCQUFvQixpQkFBb0MsRUFDL0MsZ0JBQWtDLEVBQ2xDLGdCQUFrQyxFQUNsQyxJQUFVLEVBQ1YsUUFBMEI7UUFKZixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQy9DLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFaM0Isb0JBQWUsR0FBVyxDQUFDLENBQUM7UUFjbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN0QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV2RCxFQUFFLENBQUMsQ0FBQyxxQkFBTyxDQUFDLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QyxDQUFDO0lBQ0YsQ0FBQztJQUVELHdDQUFRLEdBQVI7UUFBQSxpQkFRQztRQVBBLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1lBQ3hCLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxDQUFDLGlCQUFHLENBQUMsQ0FB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OzJEQUFDO0lBQ1g7UUFBNUIsZ0JBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztrQ0FBWSxpQkFBVTs0REFBQztJQUNiO1FBQXJDLGdCQUFTLENBQUMseUJBQXlCLENBQUM7a0NBQXFCLGlCQUFVO3FFQUFDO0lBVHpELHFCQUFxQjtRQU5qQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLGNBQWM7WUFDeEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7U0FDM0MsQ0FBQzt5Q0FZc0Msc0NBQWlCO1lBQzdCLG9DQUFnQjtZQUNoQix5QkFBZ0I7WUFDNUIsV0FBSTtZQUNBLHlCQUFnQjtPQWZ2QixxQkFBcUIsQ0F1R2pDO0lBQUQsNEJBQUM7Q0FBQSxBQXZHRCxJQXVHQztBQXZHWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQbGF0Zm9ybUxvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTGFuZG1hcmsgfSBmcm9tIFwiLi9sYW5kbWFyay5tb2RlbFwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9jb3JlL3ZpZXdcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5pbXBvcnQgeyBBbmltYXRpb25DdXJ2ZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2VudW1zXCI7XG5pbXBvcnQgeyB0b3Btb3N0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZnJhbWVcIjtcbmltcG9ydCB7IENvbG9yIH0gZnJvbSBcImNvbG9yXCI7XG5pbXBvcnQgeyBhbmRyb2lkLCBpb3MgfSBmcm9tIFwiYXBwbGljYXRpb25cIjtcbmltcG9ydCB7IGRldmljZSB9IGZyb20gXCJwbGF0Zm9ybVwiO1xuaW1wb3J0IHsgQW5pbWF0aW9uc1NlcnZpY2UgfSBmcm9tIFwiLi9hbmltYXRpb25zLXNlcnZpY2VcIjtcbmltcG9ydCB7IExhbmRtYXJrc1NlcnZpY2UgfSBmcm9tIFwiLi9sYW5kbWFya3Mtc2VydmljZVwiO1xuaW1wb3J0IHsgQWN0aW9uQnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4vYWN0aW9uLWJ1dHRvbi9hY3Rpb24tYnV0dG9uLmNvbXBvbmVudFwiO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6IFwiU2VhcmNoUmVzdWx0XCIsXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHRlbXBsYXRlVXJsOiBcIi4vc2VhcmNocmVzdWx0LmNvbXBvbmVudC5odG1sXCIsXG5cdHN0eWxlVXJsczogWycuL3NlYXJjaHJlc3VsdC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoUmVzdWx0Q29tcG9uZW50IHtcblx0cHJpdmF0ZSBfbGFuZG1hcmtzOiBMYW5kbWFya1tdO1xuXHRwcml2YXRlIF9zZWxlY3RlZFZpZXc6IFZpZXc7XG5cdHByaXZhdGUgX2FkanVzdGVkT2Zmc2V0OiBudW1iZXIgPSAwO1xuXG5cdEBWaWV3Q2hpbGQoXCJhY3Rpb25CdXR0b25cIikgX2J1dHRvblJlZjogQWN0aW9uQnV0dG9uQ29tcG9uZW50O1xuXHRAVmlld0NoaWxkKFwic2VhcmNoXCIpIF9zZWFyY2hSZWY6IEVsZW1lbnRSZWY7XG5cdEBWaWV3Q2hpbGQoXCJsaXN0XCIpIF9saXN0UmVmOiBFbGVtZW50UmVmO1xuXHRAVmlld0NoaWxkKFwiYW5pbWF0aW5nSW1hZ2VcIikgX2ltYWdlUmVmOiBFbGVtZW50UmVmO1xuXHRAVmlld0NoaWxkKFwiYW5pbWF0aW5nSW1hZ2VDb250YWluZXJcIikgX2ltYWdlQ29udGFpbmVyUmVmOiBFbGVtZW50UmVmO1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgYW5pbWF0aW9uc1NlcnZpY2U6IEFuaW1hdGlvbnNTZXJ2aWNlLFxuXHRcdHByaXZhdGUgbGFuZG1hcmtzU2VydmljZTogTGFuZG1hcmtzU2VydmljZSxcblx0XHRwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG5cdFx0cHJpdmF0ZSBwYWdlOiBQYWdlLFxuXHRcdHByaXZhdGUgbG9jYXRpb246IFBsYXRmb3JtTG9jYXRpb24pIHtcblxuXHRcdHRoaXMucGFnZVsnc2Nyb2xsYWJsZUNvbnRlbnQnXSA9IHRydWU7XG5cdFx0dGhpcy5fbGFuZG1hcmtzID0gdGhpcy5sYW5kbWFya3NTZXJ2aWNlLmdldExhbmRtYXJrcygpO1xuXG5cdFx0aWYgKGFuZHJvaWQpIHtcblx0XHRcdHRoaXMuX3VwZGF0ZVN0YXR1c0JhckNvbG9yKFwiIzJCMzIzOFwiKTtcblx0XHR9XG5cdH1cblxuXHRuZ09uSW5pdCgpIHtcblx0XHR0aGlzLmxvY2F0aW9uLm9uUG9wU3RhdGUoKCkgPT4ge1xuXHRcdFx0dGhpcy5fb25OYXZpZ2F0ZWRUbygpO1xuXHRcdH0pO1xuXG5cdFx0aWYgKGlvcykge1xuXHRcdFx0dG9wbW9zdCgpLmlvcy5jb250cm9sbGVyLm5hdmlnYXRpb25CYXIuYmFyU3R5bGUgPSAxO1xuXHRcdH1cblx0fVxuXG5cdGdldCBsYW5kbWFya3MoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2xhbmRtYXJrcztcblx0fVxuXG5cdHB1YmxpYyBvbk5hdmlnYXRpb25JdGVtVGFwKGFyZ3M6IGFueSkge1xuXHRcdHRoaXMubGFuZG1hcmtzU2VydmljZS5zZXRTZWxlY3RlZElkKGFyZ3MuaW5kZXgpO1xuXHRcdHRoaXMuX3NlbGVjdGVkVmlldyA9IGFyZ3Mudmlldztcblx0XHR0aGlzLmFuaW1hdGlvbnNTZXJ2aWNlLmFuaW1hdGlvbk9mZnNldCA9IHRoaXMubWVhc3VyZU9mZnNldChhcmdzLnZpZXcsIGFyZ3Mub2JqZWN0KTtcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvZGV0YWlscyddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdHRoaXMuX3ByZXBhcmVGb3JCYWNrTmF2aWdhdGlvbigpO1xuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBtZWFzdXJlT2Zmc2V0KHZpZXcxOiBWaWV3LCB2aWV3MjogVmlldykge1xuXHRcdGxldCBvZmZzZXQgPSB2aWV3MS5nZXRMb2NhdGlvblJlbGF0aXZlVG8odmlldzIpLnk7XG5cdFx0aWYgKHZpZXcyLmlvcyAmJiB2aWV3Mi5pb3MuYWRqdXN0ZWRDb250ZW50SW5zZXQpIHtcblx0XHRcdHRoaXMuX2FkanVzdGVkT2Zmc2V0ID0gdmlldzIuaW9zLmFkanVzdGVkQ29udGVudEluc2V0LnRvcDtcblx0XHR9XG5cdFx0cmV0dXJuIG9mZnNldCAtIHRoaXMuX2FkanVzdGVkT2Zmc2V0O1xuXHR9XG5cblx0cHJpdmF0ZSBfcHJlcGFyZUZvckJhY2tOYXZpZ2F0aW9uKCkge1xuXHRcdHRoaXMuX2xpc3RSZWYubmF0aXZlRWxlbWVudC5vcGFjaXR5ID0gMDtcblx0XHR0aGlzLl9zZWxlY3RlZFZpZXcub3BhY2l0eSA9IDA7XG5cblx0XHR0aGlzLl9pbWFnZVJlZi5uYXRpdmVFbGVtZW50LnNyYyA9IHRoaXMubGFuZG1hcmtzU2VydmljZS5nZXRTZWxlY3RlZCgpLmltYWdlO1xuXHRcdHRoaXMuX2ltYWdlQ29udGFpbmVyUmVmLm5hdGl2ZUVsZW1lbnQudHJhbnNsYXRlWSA9IHRoaXMuX2FkanVzdGVkT2Zmc2V0O1xuXHRcdHRoaXMuX2ltYWdlQ29udGFpbmVyUmVmLm5hdGl2ZUVsZW1lbnQub3BhY2l0eSA9IDE7XG5cblx0XHR0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XG5cdFx0dGhpcy5fc2VhcmNoUmVmLm5hdGl2ZUVsZW1lbnQub3BhY2l0eSA9IDA7XG5cdH1cblxuXHRwcml2YXRlIF9vbk5hdmlnYXRlZFRvKCkge1xuXHRcdGxldCBvZmZzZXQgPSB0aGlzLmFuaW1hdGlvbnNTZXJ2aWNlLmFuaW1hdGlvbk9mZnNldCArIHRoaXMuX2FkanVzdGVkT2Zmc2V0O1xuXHRcdHRoaXMuX2ltYWdlQ29udGFpbmVyUmVmLm5hdGl2ZUVsZW1lbnQuYW5pbWF0ZSh7XG5cdFx0XHR0cmFuc2xhdGU6IHsgeDogMCwgeTogb2Zmc2V0IH0sXG5cdFx0XHRkdXJhdGlvbjogMjAwLFxuXHRcdFx0Y3VydmU6IEFuaW1hdGlvbkN1cnZlLmVhc2VPdXRcblx0XHR9KS50aGVuKCgpID0+IHtcblx0XHRcdHRoaXMuX3NlbGVjdGVkVmlldy5vcGFjaXR5ID0gMTtcblx0XHRcdHRoaXMuX2ltYWdlQ29udGFpbmVyUmVmLm5hdGl2ZUVsZW1lbnQuYW5pbWF0ZSh7XG5cdFx0XHRcdG9wYWNpdHk6IDAsXG5cdFx0XHRcdGR1cmF0aW9uOiA0MDAsXG5cdFx0XHRcdGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5lYXNlT3V0XG5cdFx0XHR9KS50aGVuKCgpID0+IHtcblx0XHRcdFx0dGhpcy5faW1hZ2VDb250YWluZXJSZWYubmF0aXZlRWxlbWVudC50cmFuc2xhdGVZID0gMDtcblx0XHRcdH0pXG5cdFx0fSkuY2F0Y2goKCkgPT4geyB9KTtcblxuXHRcdHRoaXMuX2xpc3RSZWYubmF0aXZlRWxlbWVudC5hbmltYXRlKHtcblx0XHRcdG9wYWNpdHk6IDEsXG5cdFx0XHRkdXJhdGlvbjogMjAwXG5cdFx0fSkuY2F0Y2goKCkgPT4geyB9KTtcblx0XHR0aGlzLl9zZWFyY2hSZWYubmF0aXZlRWxlbWVudC5hbmltYXRlKHtcblx0XHRcdG9wYWNpdHk6IDEsXG5cdFx0XHRkdXJhdGlvbjogMjAwXG5cdFx0fSkuY2F0Y2goKCkgPT4geyB9KTtcblx0fVxuXG5cdHByaXZhdGUgX3VwZGF0ZVN0YXR1c0JhckNvbG9yKGNvbG9yOiBzdHJpbmcpIHtcblx0XHRpZiAoZGV2aWNlLnNka1ZlcnNpb24gPj0gXCIyMVwiICYmIGFuZHJvaWQuZm9yZWdyb3VuZEFjdGl2aXR5KSB7XG5cdFx0XHR2YXIgbmF0aXZlQ29sb3IgPSBuZXcgQ29sb3IoY29sb3IpLmFuZHJvaWQ7XG5cdFx0XHR2YXIgd2luZG93ID0gYW5kcm9pZC5mb3JlZ3JvdW5kQWN0aXZpdHkuZ2V0V2luZG93KCk7XG5cdFx0XHR3aW5kb3cuc2V0U3RhdHVzQmFyQ29sb3IobmF0aXZlQ29sb3IpO1xuXHRcdH1cblx0fVxufSJdfQ==