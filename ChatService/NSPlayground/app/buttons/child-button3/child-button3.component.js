"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ChildButton3Component = /** @class */ (function () {
    function ChildButton3Component() {
    }
    ChildButton3Component.prototype.ngOnInit = function () {
    };
    ChildButton3Component.prototype.onLoaded = function (args) {
        this.args = args;
    };
    ChildButton3Component.prototype.drawerOpen = function (drawer) {
        if (drawer) {
            this.args.object.className = 'child3-btn drawer-down';
        }
        else {
            this.args.object.className = 'child3-btn drawer-up';
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ChildButton3Component.prototype, "text", void 0);
    ChildButton3Component = __decorate([
        core_1.Component({
            selector: "ChildButton3",
            moduleId: module.id,
            templateUrl: "./child-button3.component.html",
            styleUrls: ['./child-button3.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], ChildButton3Component);
    return ChildButton3Component;
}());
exports.ChildButton3Component = ChildButton3Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpbGQtYnV0dG9uMy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGlsZC1idXR0b24zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRTtBQVNwRTtJQUlDO0lBQ0EsQ0FBQztJQUVELHdDQUFRLEdBQVI7SUFDQSxDQUFDO0lBQ0Qsd0NBQVEsR0FBUixVQUFTLElBQUk7UUFDWixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNsQixDQUFDO0lBQ00sMENBQVUsR0FBakIsVUFBa0IsTUFBZTtRQUNoQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLHdCQUF3QixDQUFDO1FBQ3ZELENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxzQkFBc0IsQ0FBQztRQUNyRCxDQUFDO0lBQ0YsQ0FBQztJQWpCUTtRQUFSLFlBQUssRUFBRTs7dURBQWM7SUFGVixxQkFBcUI7UUFOakMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsZ0NBQWdDO1lBQzdDLFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO1NBQzVDLENBQUM7O09BQ1cscUJBQXFCLENBb0JqQztJQUFELDRCQUFDO0NBQUEsQUFwQkQsSUFvQkM7QUFwQlksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgSW5wdXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlld1wiO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6IFwiQ2hpbGRCdXR0b24zXCIsXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHRlbXBsYXRlVXJsOiBcIi4vY2hpbGQtYnV0dG9uMy5jb21wb25lbnQuaHRtbFwiLFxuXHRzdHlsZVVybHM6IFsnLi9jaGlsZC1idXR0b24zLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDaGlsZEJ1dHRvbjNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXHRhcmdzOiBhbnk7XG5cdEBJbnB1dCgpIHRleHQ6IHN0cmluZztcblx0cHJpdmF0ZSBkcmF3ZXI6IGJvb2xlYW47XG5cdGNvbnN0cnVjdG9yKCkge1xuXHR9XG5cblx0bmdPbkluaXQoKTogdm9pZCB7XG5cdH1cblx0b25Mb2FkZWQoYXJncykge1xuXHRcdHRoaXMuYXJncyA9IGFyZ3M7XG5cdH1cblx0cHVibGljIGRyYXdlck9wZW4oZHJhd2VyOiBib29sZWFuKSB7XG5cdFx0aWYgKGRyYXdlcikge1xuXHRcdFx0dGhpcy5hcmdzLm9iamVjdC5jbGFzc05hbWUgPSAnY2hpbGQzLWJ0biBkcmF3ZXItZG93bic7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhpcy5hcmdzLm9iamVjdC5jbGFzc05hbWUgPSAnY2hpbGQzLWJ0biBkcmF3ZXItdXAnO1xuXHRcdH1cblx0fVxufSJdfQ==