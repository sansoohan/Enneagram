"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var BlogComponent = /** @class */ (function () {
    function BlogComponent() {
        this.blogTypes = ["Australia", "Belgium", "Bulgaria", "Canada", "Switzerland",
            "China", "Czech Republic", "Germany", "Spain", "Ethiopia", "Croatia", "Hungary",
            "Italy", "Jamaica", "Romania", "Russia", "United States"];
        this.selectedListPickerIndex = 0;
    }
    BlogComponent.prototype.ngOnInit = function () { };
    BlogComponent.prototype.selectLocation = function () {
    };
    BlogComponent.prototype.selectImage = function () {
    };
    BlogComponent.prototype.onUploadTap = function () {
    };
    BlogComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'Blog',
            templateUrl: './blog.component.html',
            styleUrls: ['./blog.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], BlogComponent);
    return BlogComponent;
}());
exports.BlogComponent = BlogComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJibG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE0RDtBQVc1RDtJQVFFO1FBTEEsY0FBUyxHQUFrQixDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxhQUFhO1lBQ3ZGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsU0FBUztZQUMvRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsZUFBZSxDQUFDLENBQUM7UUFDMUQsNEJBQXVCLEdBQVcsQ0FBQyxDQUFDO0lBRXBCLENBQUM7SUFFakIsZ0NBQVEsR0FBUixjQUFhLENBQUM7SUFFZCxzQ0FBYyxHQUFkO0lBRUEsQ0FBQztJQUNELG1DQUFXLEdBQVg7SUFFQSxDQUFDO0lBQ0QsbUNBQVcsR0FBWDtJQUVBLENBQUM7SUFwQlUsYUFBYTtRQU56QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsdUJBQXVCLENBQUM7U0FDckMsQ0FBQzs7T0FDVyxhQUFhLENBcUJ6QjtJQUFELG9CQUFDO0NBQUEsQUFyQkQsSUFxQkM7QUFyQlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCxWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENoaWxkQnV0dG9uMUNvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9idXR0b25zL2NoaWxkLWJ1dHRvbjEvY2hpbGQtYnV0dG9uMS5jb21wb25lbnRcIjtcbmltcG9ydCB7IENoaWxkQnV0dG9uMkNvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9idXR0b25zL2NoaWxkLWJ1dHRvbjIvY2hpbGQtYnV0dG9uMi5jb21wb25lbnRcIjtcbmltcG9ydCB7IENoaWxkQnV0dG9uM0NvbXBvbmVudCB9IGZyb20gXCIuLi8uLi9idXR0b25zL2NoaWxkLWJ1dHRvbjMvY2hpbGQtYnV0dG9uMy5jb21wb25lbnRcIjtcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnQmxvZycsXG4gIHRlbXBsYXRlVXJsOiAnLi9ibG9nLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYmxvZy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEJsb2dDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBzZWxlY3RlZEltYWdlUGF0aDtcbiAgc2VsZWN0ZWRMb2NhdGlvbjtcbiAgYmxvZ1R5cGVzOiBBcnJheTxzdHJpbmc+ID0gW1wiQXVzdHJhbGlhXCIsIFwiQmVsZ2l1bVwiLCBcIkJ1bGdhcmlhXCIsIFwiQ2FuYWRhXCIsIFwiU3dpdHplcmxhbmRcIixcbiAgXCJDaGluYVwiLCBcIkN6ZWNoIFJlcHVibGljXCIsIFwiR2VybWFueVwiLCBcIlNwYWluXCIsIFwiRXRoaW9waWFcIiwgXCJDcm9hdGlhXCIsIFwiSHVuZ2FyeVwiLFxuICBcIkl0YWx5XCIsIFwiSmFtYWljYVwiLCBcIlJvbWFuaWFcIiwgXCJSdXNzaWFcIiwgXCJVbml0ZWQgU3RhdGVzXCJdO1xuICBzZWxlY3RlZExpc3RQaWNrZXJJbmRleDogbnVtYmVyID0gMDtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkgeyB9XG5cbiAgc2VsZWN0TG9jYXRpb24oKSB7XG5cbiAgfVxuICBzZWxlY3RJbWFnZSgpIHtcblxuICB9XG4gIG9uVXBsb2FkVGFwKCl7XG4gICAgXG4gIH1cbn1cbiJdfQ==