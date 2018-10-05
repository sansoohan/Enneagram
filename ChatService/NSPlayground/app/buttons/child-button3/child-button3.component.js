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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hpbGQtYnV0dG9uMy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGlsZC1idXR0b24zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE2RDtBQVM3RDtJQUdDO0lBQ0EsQ0FBQztJQUVELHdDQUFRLEdBQVI7SUFDQSxDQUFDO0lBQ0Qsd0NBQVEsR0FBUixVQUFTLElBQUk7UUFDWixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNsQixDQUFDO0lBQ00sMENBQVUsR0FBakIsVUFBa0IsTUFBZTtRQUNoQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLHdCQUF3QixDQUFDO1FBQ3ZELENBQUM7UUFDRCxJQUFJLENBQUMsQ0FBQztZQUNMLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxzQkFBc0IsQ0FBQztRQUNyRCxDQUFDO0lBQ0YsQ0FBQztJQWxCVyxxQkFBcUI7UUFOakMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsZ0NBQWdDO1lBQzdDLFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO1NBQzVDLENBQUM7O09BQ1cscUJBQXFCLENBbUJqQztJQUFELDRCQUFDO0NBQUEsQUFuQkQsSUFtQkM7QUFuQlksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvY29yZS92aWV3XCI7XG5cbkBDb21wb25lbnQoe1xuXHRzZWxlY3RvcjogXCJDaGlsZEJ1dHRvbjNcIixcblx0bW9kdWxlSWQ6IG1vZHVsZS5pZCxcblx0dGVtcGxhdGVVcmw6IFwiLi9jaGlsZC1idXR0b24zLmNvbXBvbmVudC5odG1sXCIsXG5cdHN0eWxlVXJsczogWycuL2NoaWxkLWJ1dHRvbjMuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIENoaWxkQnV0dG9uM0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cdGFyZ3M6IGFueTtcblx0cHJpdmF0ZSBkcmF3ZXI6IGJvb2xlYW47XG5cdGNvbnN0cnVjdG9yKCkge1xuXHR9XG5cblx0bmdPbkluaXQoKTogdm9pZCB7XG5cdH1cblx0b25Mb2FkZWQoYXJncykge1xuXHRcdHRoaXMuYXJncyA9IGFyZ3M7XG5cdH1cblx0cHVibGljIGRyYXdlck9wZW4oZHJhd2VyOiBib29sZWFuKSB7XG5cdFx0aWYgKGRyYXdlcikge1xuXHRcdFx0dGhpcy5hcmdzLm9iamVjdC5jbGFzc05hbWUgPSAnY2hpbGQzLWJ0biBkcmF3ZXItZG93bic7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dGhpcy5hcmdzLm9iamVjdC5jbGFzc05hbWUgPSAnY2hpbGQzLWJ0biBkcmF3ZXItdXAnO1xuXHRcdH1cblx0fVxufSJdfQ==