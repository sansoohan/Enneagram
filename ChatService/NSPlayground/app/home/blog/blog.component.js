"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dialogs = require("ui/dialogs");
var blog_service_1 = require("./blog-service");
var firebase_service_1 = require("../../services/firebase.service");
var router_1 = require("nativescript-angular/router");
var angular_1 = require("nativescript-ui-autocomplete/angular");
var scroll_view_1 = require("tns-core-modules/ui/scroll-view");
var BlogComponent = /** @class */ (function () {
    function BlogComponent(blogService, firebaseService, routerExtensions) {
        this.blogService = blogService;
        this.firebaseService = firebaseService;
        this.routerExtensions = routerExtensions;
        this.selectedListPickerIndex = 0;
        this.location_collapsed = "[close]";
        this.location_height = 300;
        this.image_collapsed = "[close]";
        this.image_height = 300;
    }
    BlogComponent.prototype.ngOnInit = function () {
    };
    BlogComponent.prototype.onTap = function (args) {
        this.routerExtensions.back();
    };
    BlogComponent.prototype.selectLocation = function () {
    };
    BlogComponent.prototype.selectImage = function (imageType) {
        if (this.firebaseService.thisUser) {
            this.firebaseService.pickImage(imageType);
        }
        else {
            dialogs.alert("Cannot upload images in offline mode");
        }
    };
    BlogComponent.prototype.onUploadTap = function () {
    };
    BlogComponent.prototype.onLacationToggleTap = function () {
        if (this.location_collapsed == "[close]") {
            this.location_collapsed = "[open]";
            this.location_height = 0;
        }
        else {
            this.location_collapsed = "[close]";
            this.location_height = 300;
        }
    };
    BlogComponent.prototype.onImageToggleTap = function () {
        if (this.image_collapsed == "[close]") {
            this.image_collapsed = "[open]";
            this.image_height = 0;
        }
        else {
            this.image_collapsed = "[close]";
            this.image_height = 300;
        }
    };
    BlogComponent.prototype.onMapScroll = function (args) {
        this.scrollview.isUserInteractionEnabled = false;
    };
    __decorate([
        core_1.ViewChild("scrollview"),
        __metadata("design:type", scroll_view_1.ScrollView)
    ], BlogComponent.prototype, "scrollview", void 0);
    __decorate([
        core_1.ViewChild("types"),
        __metadata("design:type", angular_1.RadAutoCompleteTextViewComponent)
    ], BlogComponent.prototype, "types", void 0);
    BlogComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'Blog',
            templateUrl: './blog.component.html',
            styleUrls: ['./blog.component.scss']
        }),
        __metadata("design:paramtypes", [blog_service_1.BlogService,
            firebase_service_1.FirebaseService,
            router_1.RouterExtensions])
    ], BlogComponent);
    return BlogComponent;
}());
exports.BlogComponent = BlogComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJibG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF3RTtBQUl4RSxvQ0FBc0M7QUFFdEMsK0NBQTZDO0FBQzdDLG9FQUFrRTtBQUNsRSxzREFBK0Q7QUFFL0QsZ0VBQXdGO0FBQ3hGLCtEQUE4RTtBQVE5RTtJQVlFLHVCQUFvQixXQUF3QixFQUNsQyxlQUFnQyxFQUNoQyxnQkFBa0M7UUFGeEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDbEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFaNUMsNEJBQXVCLEdBQVcsQ0FBQyxDQUFDO1FBQ3BDLHVCQUFrQixHQUFVLFNBQVMsQ0FBQztRQUN0QyxvQkFBZSxHQUFVLEdBQUcsQ0FBQztRQUM3QixvQkFBZSxHQUFVLFNBQVMsQ0FBQztRQUNuQyxpQkFBWSxHQUFVLEdBQUcsQ0FBQztJQVcxQixDQUFDO0lBRUQsZ0NBQVEsR0FBUjtJQUVBLENBQUM7SUFFRCw2QkFBSyxHQUFMLFVBQU0sSUFBc0I7UUFDMUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFQSxzQ0FBYyxHQUFkO0lBRUEsQ0FBQztJQUNELG1DQUFXLEdBQVgsVUFBWSxTQUFnQjtRQUM1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsT0FBTyxDQUFDLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7SUFDRixDQUFDO0lBQ0EsbUNBQVcsR0FBWDtJQUVBLENBQUM7SUFDRCwyQ0FBbUIsR0FBbkI7UUFDRSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLElBQUksU0FBUyxDQUFDLENBQUEsQ0FBQztZQUN2QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsUUFBUSxDQUFDO1lBQ25DLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFBQSxJQUFJLENBQUEsQ0FBQztZQUNKLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxTQUFTLENBQUM7WUFDcEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUM7UUFDN0IsQ0FBQztJQUNILENBQUM7SUFDRCx3Q0FBZ0IsR0FBaEI7UUFDRSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLFNBQVMsQ0FBQyxDQUFBLENBQUM7WUFDcEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUM7WUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUFBLElBQUksQ0FBQSxDQUFDO1lBQ0osSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7WUFDakMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7UUFDMUIsQ0FBQztJQUNILENBQUM7SUFDRCxtQ0FBVyxHQUFYLFVBQVksSUFBcUI7UUFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsR0FBRyxLQUFLLENBQUM7SUFDbkQsQ0FBQztJQXJEd0I7UUFBeEIsZ0JBQVMsQ0FBQyxZQUFZLENBQUM7a0NBQWEsd0JBQVU7cURBQUM7SUFDNUI7UUFBbkIsZ0JBQVMsQ0FBQyxPQUFPLENBQUM7a0NBQVEsMENBQWdDO2dEQUFDO0lBUmpELGFBQWE7UUFOekIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsTUFBTTtZQUNoQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO1NBQ3JDLENBQUM7eUNBYWlDLDBCQUFXO1lBQ2pCLGtDQUFlO1lBQ2QseUJBQWdCO09BZGpDLGFBQWEsQ0E4RHpCO0lBQUQsb0JBQUM7Q0FBQSxBQTlERCxJQThEQztBQTlEWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBUb2tlbk1vZGVsIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1hdXRvY29tcGxldGVcIjtcblxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuXG5pbXBvcnQgeyBCbG9nU2VydmljZSB9IGZyb20gXCIuL2Jsb2ctc2VydmljZVwiO1xuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2VcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXNcIjtcbmltcG9ydCB7IFJhZEF1dG9Db21wbGV0ZVRleHRWaWV3Q29tcG9uZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1hdXRvY29tcGxldGUvYW5ndWxhclwiO1xuaW1wb3J0IHsgU2Nyb2xsVmlldywgU2Nyb2xsRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2Nyb2xsLXZpZXdcIjtcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnQmxvZycsXG4gIHRlbXBsYXRlVXJsOiAnLi9ibG9nLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYmxvZy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEJsb2dDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBzZWxlY3RlZExvY2F0aW9uO1xuICBzZWxlY3RlZExpc3RQaWNrZXJJbmRleDogbnVtYmVyID0gMDtcbiAgbG9jYXRpb25fY29sbGFwc2VkOnN0cmluZyA9IFwiW2Nsb3NlXVwiO1xuICBsb2NhdGlvbl9oZWlnaHQ6bnVtYmVyID0gMzAwOyBcbiAgaW1hZ2VfY29sbGFwc2VkOnN0cmluZyA9IFwiW2Nsb3NlXVwiO1xuICBpbWFnZV9oZWlnaHQ6bnVtYmVyID0gMzAwO1xuICBAVmlld0NoaWxkKFwic2Nyb2xsdmlld1wiKSBzY3JvbGx2aWV3OiBTY3JvbGxWaWV3O1xuICBAVmlld0NoaWxkKFwidHlwZXNcIikgdHlwZXM6IFJhZEF1dG9Db21wbGV0ZVRleHRWaWV3Q29tcG9uZW50O1xuXG5cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJsb2dTZXJ2aWNlOiBCbG9nU2VydmljZSxcbiAgICBwcml2YXRlIGZpcmViYXNlU2VydmljZTogRmlyZWJhc2VTZXJ2aWNlLFxuICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgKSB7XG5cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuXG4gIH1cblxuICBvblRhcChhcmdzOiBHZXN0dXJlRXZlbnREYXRhKSB7XG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcblx0fVxuXG4gIHNlbGVjdExvY2F0aW9uKCkge1xuXG4gIH1cbiAgc2VsZWN0SW1hZ2UoaW1hZ2VUeXBlOnN0cmluZyk6IHZvaWQge1xuXHRcdGlmICh0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlcikge1xuXHRcdFx0dGhpcy5maXJlYmFzZVNlcnZpY2UucGlja0ltYWdlKGltYWdlVHlwZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRpYWxvZ3MuYWxlcnQoXCJDYW5ub3QgdXBsb2FkIGltYWdlcyBpbiBvZmZsaW5lIG1vZGVcIik7XG5cdFx0fVxuXHR9XG4gIG9uVXBsb2FkVGFwKCl7XG4gICAgXG4gIH1cbiAgb25MYWNhdGlvblRvZ2dsZVRhcCgpe1xuICAgIGlmKHRoaXMubG9jYXRpb25fY29sbGFwc2VkID09IFwiW2Nsb3NlXVwiKXtcbiAgICAgIHRoaXMubG9jYXRpb25fY29sbGFwc2VkID0gXCJbb3Blbl1cIjtcbiAgICAgIHRoaXMubG9jYXRpb25faGVpZ2h0ID0gMDtcbiAgICB9ZWxzZXtcbiAgICAgIHRoaXMubG9jYXRpb25fY29sbGFwc2VkID0gXCJbY2xvc2VdXCI7XG4gICAgICB0aGlzLmxvY2F0aW9uX2hlaWdodCA9IDMwMDtcbiAgICB9ICAgIFxuICB9XG4gIG9uSW1hZ2VUb2dnbGVUYXAoKXtcbiAgICBpZih0aGlzLmltYWdlX2NvbGxhcHNlZCA9PSBcIltjbG9zZV1cIil7XG4gICAgICB0aGlzLmltYWdlX2NvbGxhcHNlZCA9IFwiW29wZW5dXCI7XG4gICAgICB0aGlzLmltYWdlX2hlaWdodCA9IDA7XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLmltYWdlX2NvbGxhcHNlZCA9IFwiW2Nsb3NlXVwiO1xuICAgICAgdGhpcy5pbWFnZV9oZWlnaHQgPSAzMDA7XG4gICAgfVxuICB9XG4gIG9uTWFwU2Nyb2xsKGFyZ3M6IFNjcm9sbEV2ZW50RGF0YSl7XG4gICAgdGhpcy5zY3JvbGx2aWV3LmlzVXNlckludGVyYWN0aW9uRW5hYmxlZCA9IGZhbHNlO1xuICB9XG5cbn1cbiJdfQ==