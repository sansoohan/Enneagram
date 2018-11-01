"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ChildButton1Component = /** @class */ (function () {
    function ChildButton1Component() {
    }
    ChildButton1Component.prototype.ngOnInit = function () {
    };
    ChildButton1Component.prototype.onLoaded = function (args) {
        this.args = args;
    };
    ChildButton1Component.prototype.drawerOpen = function (drawer) {
        if (drawer) {
            this.args.object.className = 'child-btn drawer-down';
        }
        else {
            this.args.object.className = 'child-btn drawer-up';
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ChildButton1Component.prototype, "text", void 0);
    ChildButton1Component = __decorate([
        core_1.Component({
            selector: "ChildButton1",
            moduleId: module.id,
            templateUrl: "./child-button1.component.html",
            styleUrls: ['./child-button1.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], ChildButton1Component);
    return ChildButton1Component;
}());
exports.ChildButton1Component = ChildButton1Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpbGQtYnV0dG9uMS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGlsZC1idXR0b24xLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRTtBQVNwRTtJQUlDO0lBQ0EsQ0FBQztJQUVELHdDQUFRLEdBQVI7SUFDQSxDQUFDO0lBQ0Qsd0NBQVEsR0FBUixVQUFTLElBQUk7UUFDWixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNsQixDQUFDO0lBQ00sMENBQVUsR0FBakIsVUFBa0IsTUFBZTtRQUNoQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLHVCQUF1QixDQUFDO1FBQ3RELENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQztRQUNwRCxDQUFDO0lBQ0YsQ0FBQztJQWpCUTtRQUFSLFlBQUssRUFBRTs7dURBQWM7SUFGVixxQkFBcUI7UUFOakMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsZ0NBQWdDO1lBQzdDLFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO1NBQzVDLENBQUM7O09BQ1cscUJBQXFCLENBb0JqQztJQUFELDRCQUFDO0NBQUEsQUFwQkQsSUFvQkM7QUFwQlksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgSW5wdXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlld1wiO1xuXG5AQ29tcG9uZW50KHtcblx0c2VsZWN0b3I6IFwiQ2hpbGRCdXR0b24xXCIsXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHRlbXBsYXRlVXJsOiBcIi4vY2hpbGQtYnV0dG9uMS5jb21wb25lbnQuaHRtbFwiLFxuXHRzdHlsZVVybHM6IFsnLi9jaGlsZC1idXR0b24xLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDaGlsZEJ1dHRvbjFDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXHRhcmdzOiBhbnk7XG5cdEBJbnB1dCgpIHRleHQ6IHN0cmluZztcblx0cHJpdmF0ZSBkcmF3ZXI6IGJvb2xlYW47XG5cdGNvbnN0cnVjdG9yKCkge1xuXHR9XG5cblx0bmdPbkluaXQoKTogdm9pZCB7XG5cdH1cblx0b25Mb2FkZWQoYXJncykge1xuXHRcdHRoaXMuYXJncyA9IGFyZ3M7XG5cdH1cblx0cHVibGljIGRyYXdlck9wZW4oZHJhd2VyOiBib29sZWFuKSB7XG5cdFx0aWYgKGRyYXdlcikge1xuXHRcdFx0dGhpcy5hcmdzLm9iamVjdC5jbGFzc05hbWUgPSAnY2hpbGQtYnRuIGRyYXdlci1kb3duJztcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLmFyZ3Mub2JqZWN0LmNsYXNzTmFtZSA9ICdjaGlsZC1idG4gZHJhd2VyLXVwJztcblx0XHR9XG5cdH1cbn0iXX0=