"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var scroll_view_1 = require("tns-core-modules/ui/scroll-view");
var dialogs = require("ui/dialogs");
var blog_service_1 = require("./blog-service");
var firebase_service_1 = require("../../services/firebase.service");
var router_1 = require("nativescript-angular/router");
var angular_1 = require("nativescript-ui-autocomplete/angular");
var map_example_component_1 = require("../friendmatching/map-example/map-example.component");
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
        this.isUploaded = false;
        this.titleValue = "";
        this.descriptionValue = "";
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
            this.isUploaded = true;
            this.firebaseService.pickImage(imageType);
        }
        else {
            dialogs.alert("Cannot upload images in offline mode");
        }
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
    BlogComponent.prototype.onUploadTap = function () {
        if (!this.isUploaded) {
            dialogs.alert("Please Select a image for post.");
            return;
        }
        else if (this.titleValue === "") {
            dialogs.alert("Please Enter a title for post.");
            return;
        }
        var userEnneagramNum;
        var userEnneagramBehavior;
        var userEnneagramEmotion;
        var userEnneagramThought;
        var userEnneagramState;
        var post_roles = {};
        for (var user_id in this.firebaseService.thisUser) {
            userEnneagramNum = this.firebaseService.thisUser[user_id]['enneagram']['number'];
            userEnneagramBehavior = this.firebaseService.thisUser[user_id]['enneagram']['behavior'];
            userEnneagramEmotion = this.firebaseService.thisUser[user_id]['enneagram']['emotion'];
            userEnneagramThought = this.firebaseService.thisUser[user_id]['enneagram']['thought'];
            userEnneagramState = this.firebaseService.thisUser[user_id]['enneagram']['state'];
            post_roles[user_id] = "owner";
        }
        console.log(this.firebaseService.thisUser);
        console.log(userEnneagramNum);
        var data_for_upload = {
            behavior: userEnneagramBehavior,
            emotion: userEnneagramEmotion,
            number: userEnneagramNum,
            state: userEnneagramState,
            thought: userEnneagramThought,
            closeTime: "",
            description: this.descriptionValue,
            image: this.firebaseService.currentBlogImageFileURL,
            isOpen: true,
            likes: 0,
            latitude: this.blogService.postLocation.position.latitude,
            longitude: this.blogService.postLocation.position.longitude,
            name: this.titleValue,
            openTime: Date.now(),
            roles: post_roles,
            type: this.blogService.postType
        };
        this.firebaseService.add_post(data_for_upload);
        // this.routerExtensions.navigate(['/searchresult'], { animated: false });
        // this._buttonRef.makeArrow();
    };
    __decorate([
        core_1.ViewChild("scrollview"),
        __metadata("design:type", scroll_view_1.ScrollView)
    ], BlogComponent.prototype, "scrollview", void 0);
    __decorate([
        core_1.ViewChild("types"),
        __metadata("design:type", angular_1.RadAutoCompleteTextViewComponent)
    ], BlogComponent.prototype, "types", void 0);
    __decorate([
        core_1.ViewChild("mapExampleComponent"),
        __metadata("design:type", map_example_component_1.MapExampleComponent)
    ], BlogComponent.prototype, "mapExampleComponent", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJibG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF3RTtBQUd4RSwrREFBOEU7QUFDOUUsb0NBQXNDO0FBRXRDLCtDQUE2QztBQUM3QyxvRUFBa0U7QUFDbEUsc0RBQStEO0FBRS9ELGdFQUF3RjtBQUV4Riw2RkFBMEY7QUFRMUY7SUFhRSx1QkFDVSxXQUF3QixFQUN4QixlQUFnQyxFQUNoQyxnQkFBa0M7UUFGbEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFkNUMsNEJBQXVCLEdBQVcsQ0FBQyxDQUFDO1FBQ3BDLHVCQUFrQixHQUFVLFNBQVMsQ0FBQztRQUN0QyxvQkFBZSxHQUFVLEdBQUcsQ0FBQztRQUM3QixvQkFBZSxHQUFVLFNBQVMsQ0FBQztRQUNuQyxpQkFBWSxHQUFVLEdBQUcsQ0FBQztRQUMxQixlQUFVLEdBQVcsS0FBSyxDQUFDO1FBQzNCLGVBQVUsR0FBVSxFQUFFLENBQUM7UUFDdkIscUJBQWdCLEdBQVUsRUFBRSxDQUFDO0lBVTdCLENBQUM7SUFFRCxnQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQUVELDZCQUFLLEdBQUwsVUFBTSxJQUFzQjtRQUMxQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVBLHNDQUFjLEdBQWQ7SUFFQSxDQUFDO0lBQ0QsbUNBQVcsR0FBWCxVQUFZLFNBQWdCO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QyxDQUFDO1FB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Q2hCLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsdUJBQXVCLENBQUM7U0FDckMsQ0FBQzt5Q0FldUIsMEJBQVc7WUFDUCxrQ0FBZTtZQUNkLHlCQUFnQjtPQWhCakMsYUFBYSxDQThHekI7SUFBRCxvQkFBQztDQUFBLEFBOUdELElBOEdDO0FBOUdZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IFRva2VuTW9kZWwgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWF1dG9jb21wbGV0ZVwiO1xuaW1wb3J0IHsgU2Nyb2xsVmlldywgU2Nyb2xsRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2Nyb2xsLXZpZXdcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcblxuaW1wb3J0IHsgQmxvZ1NlcnZpY2UgfSBmcm9tIFwiLi9ibG9nLXNlcnZpY2VcIjtcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzXCI7XG5pbXBvcnQgeyBSYWRBdXRvQ29tcGxldGVUZXh0Vmlld0NvbXBvbmVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktYXV0b2NvbXBsZXRlL2FuZ3VsYXJcIjtcblxuaW1wb3J0IHsgTWFwRXhhbXBsZUNvbXBvbmVudCB9IGZyb20gXCIuLi9mcmllbmRtYXRjaGluZy9tYXAtZXhhbXBsZS9tYXAtZXhhbXBsZS5jb21wb25lbnRcIjtcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnQmxvZycsXG4gIHRlbXBsYXRlVXJsOiAnLi9ibG9nLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYmxvZy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEJsb2dDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBzZWxlY3RlZExvY2F0aW9uO1xuICBzZWxlY3RlZExpc3RQaWNrZXJJbmRleDogbnVtYmVyID0gMDtcbiAgbG9jYXRpb25fY29sbGFwc2VkOnN0cmluZyA9IFwiW2Nsb3NlXVwiO1xuICBsb2NhdGlvbl9oZWlnaHQ6bnVtYmVyID0gMzAwOyBcbiAgaW1hZ2VfY29sbGFwc2VkOnN0cmluZyA9IFwiW2Nsb3NlXVwiO1xuICBpbWFnZV9oZWlnaHQ6bnVtYmVyID0gMzAwO1xuICBpc1VwbG9hZGVkOmJvb2xlYW4gPSBmYWxzZTtcbiAgdGl0bGVWYWx1ZTpzdHJpbmcgPSBcIlwiO1xuICBkZXNjcmlwdGlvblZhbHVlOnN0cmluZyA9IFwiXCI7XG4gIEBWaWV3Q2hpbGQoXCJzY3JvbGx2aWV3XCIpIHNjcm9sbHZpZXc6IFNjcm9sbFZpZXc7XG4gIEBWaWV3Q2hpbGQoXCJ0eXBlc1wiKSB0eXBlczogUmFkQXV0b0NvbXBsZXRlVGV4dFZpZXdDb21wb25lbnQ7XG4gIEBWaWV3Q2hpbGQoXCJtYXBFeGFtcGxlQ29tcG9uZW50XCIpIG1hcEV4YW1wbGVDb21wb25lbnQ6IE1hcEV4YW1wbGVDb21wb25lbnQ7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYmxvZ1NlcnZpY2U6IEJsb2dTZXJ2aWNlLFxuICAgIHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICApIHtcblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG5cbiAgfVxuXG4gIG9uVGFwKGFyZ3M6IEdlc3R1cmVFdmVudERhdGEpIHtcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xuXHR9XG5cbiAgc2VsZWN0TG9jYXRpb24oKSB7XG5cbiAgfVxuICBzZWxlY3RJbWFnZShpbWFnZVR5cGU6c3RyaW5nKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyKSB7XG4gICAgICB0aGlzLmlzVXBsb2FkZWQgPSB0cnVlO1xuICAgICAgdGhpcy5maXJlYmFzZVNlcnZpY2UucGlja0ltYWdlKGltYWdlVHlwZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRpYWxvZ3MuYWxlcnQoXCJDYW5ub3QgdXBsb2FkIGltYWdlcyBpbiBvZmZsaW5lIG1vZGVcIik7XG5cdFx0fVxuXHR9XG4gIG9uTGFjYXRpb25Ub2dnbGVUYXAoKXtcbiAgICBpZih0aGlzLmxvY2F0aW9uX2NvbGxhcHNlZCA9PSBcIltjbG9zZV1cIil7XG4gICAgICB0aGlzLmxvY2F0aW9uX2NvbGxhcHNlZCA9IFwiW29wZW5dXCI7XG4gICAgICB0aGlzLmxvY2F0aW9uX2hlaWdodCA9IDA7XG4gICAgfWVsc2V7XG4gICAgICB0aGlzLmxvY2F0aW9uX2NvbGxhcHNlZCA9IFwiW2Nsb3NlXVwiO1xuICAgICAgdGhpcy5sb2NhdGlvbl9oZWlnaHQgPSAzMDA7XG4gICAgfSAgICBcbiAgfVxuICBvbkltYWdlVG9nZ2xlVGFwKCl7XG4gICAgaWYodGhpcy5pbWFnZV9jb2xsYXBzZWQgPT0gXCJbY2xvc2VdXCIpe1xuICAgICAgdGhpcy5pbWFnZV9jb2xsYXBzZWQgPSBcIltvcGVuXVwiO1xuICAgICAgdGhpcy5pbWFnZV9oZWlnaHQgPSAwO1xuICAgIH1lbHNle1xuICAgICAgdGhpcy5pbWFnZV9jb2xsYXBzZWQgPSBcIltjbG9zZV1cIjtcbiAgICAgIHRoaXMuaW1hZ2VfaGVpZ2h0ID0gMzAwO1xuICAgIH1cbiAgfVxuICBvbk1hcFNjcm9sbChhcmdzOiBTY3JvbGxFdmVudERhdGEpe1xuICAgIHRoaXMuc2Nyb2xsdmlldy5pc1VzZXJJbnRlcmFjdGlvbkVuYWJsZWQgPSBmYWxzZTtcbiAgfVxuICBvblVwbG9hZFRhcCgpe1xuICAgIGlmKCF0aGlzLmlzVXBsb2FkZWQpe1xuICAgICAgZGlhbG9ncy5hbGVydChcIlBsZWFzZSBTZWxlY3QgYSBpbWFnZSBmb3IgcG9zdC5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGVsc2UgaWYodGhpcy50aXRsZVZhbHVlPT09XCJcIil7XG4gICAgICBkaWFsb2dzLmFsZXJ0KFwiUGxlYXNlIEVudGVyIGEgdGl0bGUgZm9yIHBvc3QuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciB1c2VyRW5uZWFncmFtTnVtO1xuICAgIHZhciB1c2VyRW5uZWFncmFtQmVoYXZpb3I7XG4gICAgdmFyIHVzZXJFbm5lYWdyYW1FbW90aW9uO1xuICAgIHZhciB1c2VyRW5uZWFncmFtVGhvdWdodDtcbiAgICB2YXIgdXNlckVubmVhZ3JhbVN0YXRlO1xuICAgIHZhciBwb3N0X3JvbGVzID0ge307XG4gICAgZm9yKHZhciB1c2VyX2lkIGluIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyKXtcbiAgICAgIHVzZXJFbm5lYWdyYW1OdW0gPSB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlclt1c2VyX2lkXVsnZW5uZWFncmFtJ11bJ251bWJlciddO1xuICAgICAgdXNlckVubmVhZ3JhbUJlaGF2aW9yID0gdGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXJbdXNlcl9pZF1bJ2VubmVhZ3JhbSddWydiZWhhdmlvciddO1xuICAgICAgdXNlckVubmVhZ3JhbUVtb3Rpb24gPSB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlclt1c2VyX2lkXVsnZW5uZWFncmFtJ11bJ2Vtb3Rpb24nXTtcbiAgICAgIHVzZXJFbm5lYWdyYW1UaG91Z2h0ID0gdGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXJbdXNlcl9pZF1bJ2VubmVhZ3JhbSddWyd0aG91Z2h0J107XG4gICAgICB1c2VyRW5uZWFncmFtU3RhdGUgPSB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlclt1c2VyX2lkXVsnZW5uZWFncmFtJ11bJ3N0YXRlJ107XG4gICAgICBwb3N0X3JvbGVzW3VzZXJfaWRdID0gXCJvd25lclwiO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyKTtcbiAgICBjb25zb2xlLmxvZyh1c2VyRW5uZWFncmFtTnVtKTtcbiAgICB2YXIgZGF0YV9mb3JfdXBsb2FkID0ge1xuICAgICAgYmVoYXZpb3IgOiB1c2VyRW5uZWFncmFtQmVoYXZpb3IsXG4gICAgICBlbW90aW9uIDogdXNlckVubmVhZ3JhbUVtb3Rpb24sXG4gICAgICBudW1iZXIgOiB1c2VyRW5uZWFncmFtTnVtLFxuICAgICAgc3RhdGUgOiB1c2VyRW5uZWFncmFtU3RhdGUsXG4gICAgICB0aG91Z2h0IDogdXNlckVubmVhZ3JhbVRob3VnaHQsXG4gICAgICBjbG9zZVRpbWUgOiBcIlwiLFxuICAgICAgZGVzY3JpcHRpb24gOiB0aGlzLmRlc2NyaXB0aW9uVmFsdWUsXG4gICAgICBpbWFnZSA6IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmN1cnJlbnRCbG9nSW1hZ2VGaWxlVVJMLFxuICAgICAgaXNPcGVuIDogdHJ1ZSxcbiAgICAgIGxpa2VzIDogMCxcbiAgICAgIGxhdGl0dWRlOiB0aGlzLmJsb2dTZXJ2aWNlLnBvc3RMb2NhdGlvbi5wb3NpdGlvbi5sYXRpdHVkZSxcbiAgICAgIGxvbmdpdHVkZTogdGhpcy5ibG9nU2VydmljZS5wb3N0TG9jYXRpb24ucG9zaXRpb24ubG9uZ2l0dWRlLFxuICAgICAgbmFtZSA6IHRoaXMudGl0bGVWYWx1ZSxcbiAgICAgIG9wZW5UaW1lIDogRGF0ZS5ub3coKSxcbiAgICAgIHJvbGVzIDogcG9zdF9yb2xlcyxcbiAgICAgIHR5cGUgOiB0aGlzLmJsb2dTZXJ2aWNlLnBvc3RUeXBlXG4gICAgfVxuICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmFkZF9wb3N0KGRhdGFfZm9yX3VwbG9hZCk7XG4gICAgLy8gdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL3NlYXJjaHJlc3VsdCddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcbiAgICAvLyB0aGlzLl9idXR0b25SZWYubWFrZUFycm93KCk7XG4gIH1cbn1cbiJdfQ==