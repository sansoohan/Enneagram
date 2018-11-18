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
var firebase_service_1 = require("../../services/firebase.service");
var action_button_component_1 = require("./action-button/action-button.component");
var SearchResultComponent = /** @class */ (function () {
    function SearchResultComponent(animationsService, routerExtensions, firebaseService, page, location) {
        this.animationsService = animationsService;
        this.routerExtensions = routerExtensions;
        this.firebaseService = firebaseService;
        this.page = page;
        this.location = location;
        this._adjustedOffset = 0;
        this.page['scrollableContent'] = true;
        this._landmarks = this.firebaseService.postSearchResultArray;
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
    SearchResultComponent.prototype.onTap = function (args) {
        this.routerExtensions.back();
    };
    SearchResultComponent.prototype.getPostImage = function (item) {
        var ret = "";
        for (var postID in item) {
            ret = item[postID]['image'];
        }
        return ret;
    };
    SearchResultComponent.prototype.getPostName = function (item) {
        var ret = "";
        for (var postID in item) {
            ret = item[postID]['name'];
        }
        return ret;
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
        for (var post_id in this.firebaseService.postSearchResultArray[args.index]) {
            this.firebaseService.selectedPostID = post_id;
            console.log(this.firebaseService.selectedPostID);
        }
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
        this._imageRef.nativeElement.src = this.firebaseService.getSelectedPost()[this.firebaseService.selectedPostID]['image'];
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
            router_1.RouterExtensions,
            firebase_service_1.FirebaseService,
            page_1.Page,
            common_1.PlatformLocation])
    ], SearchResultComponent);
    return SearchResultComponent;
}());
exports.SearchResultComponent = SearchResultComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNocmVzdWx0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlYXJjaHJlc3VsdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBaUU7QUFDakUsMENBQW1EO0FBRW5ELHNEQUErRDtBQUUvRCxpREFBZ0Q7QUFDaEQsbURBQTJEO0FBQzNELG1EQUFvRDtBQUNwRCwrQkFBOEI7QUFDOUIsMkNBQTJDO0FBQzNDLHFDQUFrQztBQUNsQywyREFBeUQ7QUFDekQsb0VBQWtFO0FBQ2xFLG1GQUFnRjtBQVFoRjtJQVdDLCtCQUFvQixpQkFBb0MsRUFDL0MsZ0JBQWtDLEVBQ2xDLGVBQWdDLEVBQ2hDLElBQVUsRUFDVixRQUEwQjtRQUpmLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDL0MscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLGFBQVEsR0FBUixRQUFRLENBQWtCO1FBWjNCLG9CQUFlLEdBQVcsQ0FBQyxDQUFDO1FBZW5DLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDdEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLHFCQUFxQixDQUFDO1FBRTdELEVBQUUsQ0FBQyxDQUFDLHFCQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7SUFDRixDQUFDO0lBRUQsd0NBQVEsR0FBUjtRQUFBLGlCQVFDO1FBUEEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7WUFDeEIsS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLENBQUMsaUJBQUcsQ0FBQyxDQUFDLENBQUM7WUFD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QUFFLCtCQUErQjtZQUM1QyxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztTQUMzQyxDQUFDO3lDQVlzQyxzQ0FBaUI7WUFDN0IseUJBQWdCO1lBQ2pCLGtDQUFlO1lBQzFCLFdBQUk7WUFDQSx5QkFBZ0I7T0FmdkIscUJBQXFCLENBOEhqQztJQUFELDRCQUFDO0NBQUEsQUE5SEQsSUE4SEM7QUE5SFksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgUGxhdGZvcm1Mb2NhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvY29yZS92aWV3XCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgQW5pbWF0aW9uQ3VydmUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9lbnVtc1wiO1xuaW1wb3J0IHsgdG9wbW9zdCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2ZyYW1lXCI7XG5pbXBvcnQgeyBDb2xvciB9IGZyb20gXCJjb2xvclwiO1xuaW1wb3J0IHsgYW5kcm9pZCwgaW9zIH0gZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5pbXBvcnQgeyBkZXZpY2UgfSBmcm9tIFwicGxhdGZvcm1cIjtcbmltcG9ydCB7IEFuaW1hdGlvbnNTZXJ2aWNlIH0gZnJvbSBcIi4vYW5pbWF0aW9ucy1zZXJ2aWNlXCI7XG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xuaW1wb3J0IHsgQWN0aW9uQnV0dG9uQ29tcG9uZW50IH0gZnJvbSBcIi4vYWN0aW9uLWJ1dHRvbi9hY3Rpb24tYnV0dG9uLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzXCI7XG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6IFwiU2VhcmNoUmVzdWx0XCIsXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHRlbXBsYXRlVXJsOiBcIi4vc2VhcmNocmVzdWx0LmNvbXBvbmVudC5odG1sXCIsXG5cdHN0eWxlVXJsczogWycuL3NlYXJjaHJlc3VsdC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoUmVzdWx0Q29tcG9uZW50IHtcblx0cHJpdmF0ZSBfbGFuZG1hcmtzOiBBcnJheTxhbnk+O1xuXHRwcml2YXRlIF9zZWxlY3RlZFZpZXc6IFZpZXc7XG5cdHByaXZhdGUgX2FkanVzdGVkT2Zmc2V0OiBudW1iZXIgPSAwO1xuXG5cdEBWaWV3Q2hpbGQoXCJhY3Rpb25CdXR0b25cIikgX2J1dHRvblJlZjogQWN0aW9uQnV0dG9uQ29tcG9uZW50O1xuXHRAVmlld0NoaWxkKFwic2VhcmNoXCIpIF9zZWFyY2hSZWY6IEVsZW1lbnRSZWY7XG5cdEBWaWV3Q2hpbGQoXCJsaXN0XCIpIF9saXN0UmVmOiBFbGVtZW50UmVmO1xuXHRAVmlld0NoaWxkKFwiYW5pbWF0aW5nSW1hZ2VcIikgX2ltYWdlUmVmOiBFbGVtZW50UmVmO1xuXHRAVmlld0NoaWxkKFwiYW5pbWF0aW5nSW1hZ2VDb250YWluZXJcIikgX2ltYWdlQ29udGFpbmVyUmVmOiBFbGVtZW50UmVmO1xuXG5cdGNvbnN0cnVjdG9yKHByaXZhdGUgYW5pbWF0aW9uc1NlcnZpY2U6IEFuaW1hdGlvbnNTZXJ2aWNlLFxuXHRcdHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcblx0XHRwcml2YXRlIGZpcmViYXNlU2VydmljZTogRmlyZWJhc2VTZXJ2aWNlLFxuXHRcdHByaXZhdGUgcGFnZTogUGFnZSxcblx0XHRwcml2YXRlIGxvY2F0aW9uOiBQbGF0Zm9ybUxvY2F0aW9uXG5cdCkge1xuXG5cdFx0dGhpcy5wYWdlWydzY3JvbGxhYmxlQ29udGVudCddID0gdHJ1ZTtcblx0XHR0aGlzLl9sYW5kbWFya3MgPSB0aGlzLmZpcmViYXNlU2VydmljZS5wb3N0U2VhcmNoUmVzdWx0QXJyYXk7XG5cblx0XHRpZiAoYW5kcm9pZCkge1xuXHRcdFx0dGhpcy5fdXBkYXRlU3RhdHVzQmFyQ29sb3IoXCIjMkIzMjM4XCIpO1xuXHRcdH1cblx0fVxuXG5cdG5nT25Jbml0KCkge1xuXHRcdHRoaXMubG9jYXRpb24ub25Qb3BTdGF0ZSgoKSA9PiB7XG5cdFx0XHR0aGlzLl9vbk5hdmlnYXRlZFRvKCk7XG5cdFx0fSk7XG5cblx0XHRpZiAoaW9zKSB7XG5cdFx0XHR0b3Btb3N0KCkuaW9zLmNvbnRyb2xsZXIubmF2aWdhdGlvbkJhci5iYXJTdHlsZSA9IDE7XG5cdFx0fVxuXHR9XG5cblx0b25UYXAoYXJnczogR2VzdHVyZUV2ZW50RGF0YSkge1xuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XG5cdH1cblxuXHRnZXRQb3N0SW1hZ2UoaXRlbSk6IHN0cmluZ3tcblx0XHR2YXIgcmV0OnN0cmluZyA9IFwiXCI7XG5cdFx0Zm9yKHZhciBwb3N0SUQgaW4gaXRlbSkge1xuXHRcdFx0cmV0ID0gaXRlbVtwb3N0SURdWydpbWFnZSddO1xuXHRcdH1cblx0XHRyZXR1cm4gcmV0O1xuXHR9XG5cdGdldFBvc3ROYW1lKGl0ZW0pOiBzdHJpbmd7XG5cdFx0dmFyIHJldDpzdHJpbmcgPSBcIlwiO1xuXHRcdGZvcih2YXIgcG9zdElEIGluIGl0ZW0pIHtcblx0XHRcdHJldCA9IGl0ZW1bcG9zdElEXVsnbmFtZSddO1xuXHRcdH1cblx0XHRyZXR1cm4gcmV0O1xuXHR9XG5cblx0Z2V0IGxhbmRtYXJrcygpIHtcblx0XHRyZXR1cm4gdGhpcy5fbGFuZG1hcmtzO1xuXHR9XG5cblx0cHVibGljIG9uTmF2aWdhdGlvbkl0ZW1UYXAoYXJnczogYW55KSB7XG5cdFx0Zm9yKHZhciBwb3N0X2lkIGluIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnBvc3RTZWFyY2hSZXN1bHRBcnJheVthcmdzLmluZGV4XSl7XG5cdFx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5zZWxlY3RlZFBvc3RJRCA9IHBvc3RfaWQ7XG5cdFx0XHRjb25zb2xlLmxvZyh0aGlzLmZpcmViYXNlU2VydmljZS5zZWxlY3RlZFBvc3RJRCk7XG5cdFx0fVxuXHRcdHRoaXMuX3NlbGVjdGVkVmlldyA9IGFyZ3Mudmlldztcblx0XHR0aGlzLmFuaW1hdGlvbnNTZXJ2aWNlLmFuaW1hdGlvbk9mZnNldCA9IHRoaXMubWVhc3VyZU9mZnNldChhcmdzLnZpZXcsIGFyZ3Mub2JqZWN0KTtcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvZGV0YWlscyddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcblx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdHRoaXMuX3ByZXBhcmVGb3JCYWNrTmF2aWdhdGlvbigpO1xuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSBtZWFzdXJlT2Zmc2V0KHZpZXcxOiBWaWV3LCB2aWV3MjogVmlldykge1xuXHRcdGxldCBvZmZzZXQgPSB2aWV3MS5nZXRMb2NhdGlvblJlbGF0aXZlVG8odmlldzIpLnk7XG5cdFx0aWYgKHZpZXcyLmlvcyAmJiB2aWV3Mi5pb3MuYWRqdXN0ZWRDb250ZW50SW5zZXQpIHtcblx0XHRcdHRoaXMuX2FkanVzdGVkT2Zmc2V0ID0gdmlldzIuaW9zLmFkanVzdGVkQ29udGVudEluc2V0LnRvcDtcblx0XHR9XG5cdFx0cmV0dXJuIG9mZnNldCAtIHRoaXMuX2FkanVzdGVkT2Zmc2V0O1xuXHR9XG5cblx0cHJpdmF0ZSBfcHJlcGFyZUZvckJhY2tOYXZpZ2F0aW9uKCkge1xuXHRcdHRoaXMuX2xpc3RSZWYubmF0aXZlRWxlbWVudC5vcGFjaXR5ID0gMDtcblx0XHR0aGlzLl9zZWxlY3RlZFZpZXcub3BhY2l0eSA9IDA7XG5cblx0XHR0aGlzLl9pbWFnZVJlZi5uYXRpdmVFbGVtZW50LnNyYyA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmdldFNlbGVjdGVkUG9zdCgpW3RoaXMuZmlyZWJhc2VTZXJ2aWNlLnNlbGVjdGVkUG9zdElEXVsnaW1hZ2UnXTtcblx0XHR0aGlzLl9pbWFnZUNvbnRhaW5lclJlZi5uYXRpdmVFbGVtZW50LnRyYW5zbGF0ZVkgPSB0aGlzLl9hZGp1c3RlZE9mZnNldDtcblx0XHR0aGlzLl9pbWFnZUNvbnRhaW5lclJlZi5uYXRpdmVFbGVtZW50Lm9wYWNpdHkgPSAxO1xuXG5cdFx0dGhpcy5fYnV0dG9uUmVmLm1ha2VBcnJvdygpO1xuXHRcdHRoaXMuX3NlYXJjaFJlZi5uYXRpdmVFbGVtZW50Lm9wYWNpdHkgPSAwO1xuXHR9XG5cblx0cHJpdmF0ZSBfb25OYXZpZ2F0ZWRUbygpIHtcblx0XHRsZXQgb2Zmc2V0ID0gdGhpcy5hbmltYXRpb25zU2VydmljZS5hbmltYXRpb25PZmZzZXQgKyB0aGlzLl9hZGp1c3RlZE9mZnNldDtcblx0XHR0aGlzLl9pbWFnZUNvbnRhaW5lclJlZi5uYXRpdmVFbGVtZW50LmFuaW1hdGUoe1xuXHRcdFx0dHJhbnNsYXRlOiB7IHg6IDAsIHk6IG9mZnNldCB9LFxuXHRcdFx0ZHVyYXRpb246IDIwMCxcblx0XHRcdGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5lYXNlT3V0XG5cdFx0fSkudGhlbigoKSA9PiB7XG5cdFx0XHR0aGlzLl9zZWxlY3RlZFZpZXcub3BhY2l0eSA9IDE7XG5cdFx0XHR0aGlzLl9pbWFnZUNvbnRhaW5lclJlZi5uYXRpdmVFbGVtZW50LmFuaW1hdGUoe1xuXHRcdFx0XHRvcGFjaXR5OiAwLFxuXHRcdFx0XHRkdXJhdGlvbjogNDAwLFxuXHRcdFx0XHRjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuZWFzZU91dFxuXHRcdFx0fSkudGhlbigoKSA9PiB7XG5cdFx0XHRcdHRoaXMuX2ltYWdlQ29udGFpbmVyUmVmLm5hdGl2ZUVsZW1lbnQudHJhbnNsYXRlWSA9IDA7XG5cdFx0XHR9KVxuXHRcdH0pLmNhdGNoKCgpID0+IHsgfSk7XG5cblx0XHR0aGlzLl9saXN0UmVmLm5hdGl2ZUVsZW1lbnQuYW5pbWF0ZSh7XG5cdFx0XHRvcGFjaXR5OiAxLFxuXHRcdFx0ZHVyYXRpb246IDIwMFxuXHRcdH0pLmNhdGNoKCgpID0+IHsgfSk7XG5cdFx0dGhpcy5fc2VhcmNoUmVmLm5hdGl2ZUVsZW1lbnQuYW5pbWF0ZSh7XG5cdFx0XHRvcGFjaXR5OiAxLFxuXHRcdFx0ZHVyYXRpb246IDIwMFxuXHRcdH0pLmNhdGNoKCgpID0+IHsgfSk7XG5cdH1cblxuXHRwcml2YXRlIF91cGRhdGVTdGF0dXNCYXJDb2xvcihjb2xvcjogc3RyaW5nKSB7XG5cdFx0aWYgKGRldmljZS5zZGtWZXJzaW9uID49IFwiMjFcIiAmJiBhbmRyb2lkLmZvcmVncm91bmRBY3Rpdml0eSkge1xuXHRcdFx0dmFyIG5hdGl2ZUNvbG9yID0gbmV3IENvbG9yKGNvbG9yKS5hbmRyb2lkO1xuXHRcdFx0dmFyIHdpbmRvdyA9IGFuZHJvaWQuZm9yZWdyb3VuZEFjdGl2aXR5LmdldFdpbmRvdygpO1xuXHRcdFx0d2luZG93LnNldFN0YXR1c0JhckNvbG9yKG5hdGl2ZUNvbG9yKTtcblx0XHR9XG5cdH1cbn0iXX0=