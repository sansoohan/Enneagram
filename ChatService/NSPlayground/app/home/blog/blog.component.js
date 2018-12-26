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
        this.routerExtensions.navigate(['/'], { animated: false });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJibG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF3RTtBQUd4RSwrREFBOEU7QUFDOUUsb0NBQXNDO0FBRXRDLCtDQUE2QztBQUM3QyxvRUFBa0U7QUFDbEUsc0RBQStEO0FBRS9ELGdFQUF3RjtBQUV4Riw2RkFBMEY7QUFRMUY7SUFhRSx1QkFDVSxXQUF3QixFQUN4QixlQUFnQyxFQUNoQyxnQkFBa0M7UUFGbEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFkNUMsNEJBQXVCLEdBQVcsQ0FBQyxDQUFDO1FBQ3BDLHVCQUFrQixHQUFVLFNBQVMsQ0FBQztRQUN0QyxvQkFBZSxHQUFVLEdBQUcsQ0FBQztRQUM3QixvQkFBZSxHQUFVLFNBQVMsQ0FBQztRQUNuQyxpQkFBWSxHQUFVLEdBQUcsQ0FBQztRQUMxQixlQUFVLEdBQVcsS0FBSyxDQUFDO1FBQzNCLGVBQVUsR0FBVSxFQUFFLENBQUM7UUFDdkIscUJBQWdCLEdBQVUsRUFBRSxDQUFDO0lBVTdCLENBQUM7SUFFRCxnQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQUVELDZCQUFLLEdBQUwsVUFBTSxJQUFzQjtRQUMxQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVBLHNDQUFjLEdBQWQ7SUFFQSxDQUFDO0lBQ0QsbUNBQVcsR0FBWCxVQUFZLFNBQWdCO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QyxDQUFDO1FB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ekIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsTUFBTTtZQUNoQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO1NBQ3JDLENBQUM7eUNBZXVCLDBCQUFXO1lBQ1Asa0NBQWU7WUFDZCx5QkFBZ0I7T0FoQmpDLGFBQWEsQ0E2R3pCO0lBQUQsb0JBQUM7Q0FBQSxBQTdHRCxJQTZHQztBQTdHWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcclxuaW1wb3J0IHsgVG9rZW5Nb2RlbCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktYXV0b2NvbXBsZXRlXCI7XHJcbmltcG9ydCB7IFNjcm9sbFZpZXcsIFNjcm9sbEV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3Njcm9sbC12aWV3XCI7XHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuXHJcbmltcG9ydCB7IEJsb2dTZXJ2aWNlIH0gZnJvbSBcIi4vYmxvZy1zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEdlc3R1cmVFdmVudERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9nZXN0dXJlc1wiO1xyXG5pbXBvcnQgeyBSYWRBdXRvQ29tcGxldGVUZXh0Vmlld0NvbXBvbmVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktYXV0b2NvbXBsZXRlL2FuZ3VsYXJcIjtcclxuXHJcbmltcG9ydCB7IE1hcEV4YW1wbGVDb21wb25lbnQgfSBmcm9tIFwiLi4vZnJpZW5kbWF0Y2hpbmcvbWFwLWV4YW1wbGUvbWFwLWV4YW1wbGUuY29tcG9uZW50XCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHNlbGVjdG9yOiAnQmxvZycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2Jsb2cuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL2Jsb2cuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQmxvZ0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgc2VsZWN0ZWRMb2NhdGlvbjtcclxuICBzZWxlY3RlZExpc3RQaWNrZXJJbmRleDogbnVtYmVyID0gMDtcclxuICBsb2NhdGlvbl9jb2xsYXBzZWQ6c3RyaW5nID0gXCJbY2xvc2VdXCI7XHJcbiAgbG9jYXRpb25faGVpZ2h0Om51bWJlciA9IDMwMDsgXHJcbiAgaW1hZ2VfY29sbGFwc2VkOnN0cmluZyA9IFwiW2Nsb3NlXVwiO1xyXG4gIGltYWdlX2hlaWdodDpudW1iZXIgPSAzMDA7XHJcbiAgaXNVcGxvYWRlZDpib29sZWFuID0gZmFsc2U7XHJcbiAgdGl0bGVWYWx1ZTpzdHJpbmcgPSBcIlwiO1xyXG4gIGRlc2NyaXB0aW9uVmFsdWU6c3RyaW5nID0gXCJcIjtcclxuICBAVmlld0NoaWxkKFwic2Nyb2xsdmlld1wiKSBzY3JvbGx2aWV3OiBTY3JvbGxWaWV3O1xyXG4gIEBWaWV3Q2hpbGQoXCJ0eXBlc1wiKSB0eXBlczogUmFkQXV0b0NvbXBsZXRlVGV4dFZpZXdDb21wb25lbnQ7XHJcbiAgQFZpZXdDaGlsZChcIm1hcEV4YW1wbGVDb21wb25lbnRcIikgbWFwRXhhbXBsZUNvbXBvbmVudDogTWFwRXhhbXBsZUNvbXBvbmVudDtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgYmxvZ1NlcnZpY2U6IEJsb2dTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSxcclxuICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICApIHtcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuXHJcbiAgfVxyXG5cclxuICBvblRhcChhcmdzOiBHZXN0dXJlRXZlbnREYXRhKSB7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xyXG5cdH1cclxuXHJcbiAgc2VsZWN0TG9jYXRpb24oKSB7XHJcblxyXG4gIH1cclxuICBzZWxlY3RJbWFnZShpbWFnZVR5cGU6c3RyaW5nKTogdm9pZCB7XHJcblx0XHRpZiAodGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXIpIHtcclxuICAgICAgdGhpcy5pc1VwbG9hZGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5maXJlYmFzZVNlcnZpY2UucGlja0ltYWdlKGltYWdlVHlwZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkaWFsb2dzLmFsZXJ0KFwiQ2Fubm90IHVwbG9hZCBpbWFnZXMgaW4gb2ZmbGluZSBtb2RlXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxuICBvbkxhY2F0aW9uVG9nZ2xlVGFwKCl7XHJcbiAgICBpZih0aGlzLmxvY2F0aW9uX2NvbGxhcHNlZCA9PSBcIltjbG9zZV1cIil7XHJcbiAgICAgIHRoaXMubG9jYXRpb25fY29sbGFwc2VkID0gXCJbb3Blbl1cIjtcclxuICAgICAgdGhpcy5sb2NhdGlvbl9oZWlnaHQgPSAwO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIHRoaXMubG9jYXRpb25fY29sbGFwc2VkID0gXCJbY2xvc2VdXCI7XHJcbiAgICAgIHRoaXMubG9jYXRpb25faGVpZ2h0ID0gMzAwO1xyXG4gICAgfSAgICBcclxuICB9XHJcbiAgb25JbWFnZVRvZ2dsZVRhcCgpe1xyXG4gICAgaWYodGhpcy5pbWFnZV9jb2xsYXBzZWQgPT0gXCJbY2xvc2VdXCIpe1xyXG4gICAgICB0aGlzLmltYWdlX2NvbGxhcHNlZCA9IFwiW29wZW5dXCI7XHJcbiAgICAgIHRoaXMuaW1hZ2VfaGVpZ2h0ID0gMDtcclxuICAgIH1lbHNle1xyXG4gICAgICB0aGlzLmltYWdlX2NvbGxhcHNlZCA9IFwiW2Nsb3NlXVwiO1xyXG4gICAgICB0aGlzLmltYWdlX2hlaWdodCA9IDMwMDtcclxuICAgIH1cclxuICB9XHJcbiAgb25NYXBTY3JvbGwoYXJnczogU2Nyb2xsRXZlbnREYXRhKXtcclxuICAgIHRoaXMuc2Nyb2xsdmlldy5pc1VzZXJJbnRlcmFjdGlvbkVuYWJsZWQgPSBmYWxzZTtcclxuICB9XHJcbiAgb25VcGxvYWRUYXAoKXtcclxuICAgIGlmKCF0aGlzLmlzVXBsb2FkZWQpe1xyXG4gICAgICBkaWFsb2dzLmFsZXJ0KFwiUGxlYXNlIFNlbGVjdCBhIGltYWdlIGZvciBwb3N0LlwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZih0aGlzLnRpdGxlVmFsdWU9PT1cIlwiKXtcclxuICAgICAgZGlhbG9ncy5hbGVydChcIlBsZWFzZSBFbnRlciBhIHRpdGxlIGZvciBwb3N0LlwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB1c2VyRW5uZWFncmFtTnVtO1xyXG4gICAgdmFyIHVzZXJFbm5lYWdyYW1CZWhhdmlvcjtcclxuICAgIHZhciB1c2VyRW5uZWFncmFtRW1vdGlvbjtcclxuICAgIHZhciB1c2VyRW5uZWFncmFtVGhvdWdodDtcclxuICAgIHZhciB1c2VyRW5uZWFncmFtU3RhdGU7XHJcbiAgICB2YXIgcG9zdF9yb2xlcyA9IHt9O1xyXG4gICAgZm9yKHZhciB1c2VyX2lkIGluIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyKXtcclxuICAgICAgdXNlckVubmVhZ3JhbU51bSA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyW3VzZXJfaWRdWydlbm5lYWdyYW0nXVsnbnVtYmVyJ107XHJcbiAgICAgIHVzZXJFbm5lYWdyYW1CZWhhdmlvciA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyW3VzZXJfaWRdWydlbm5lYWdyYW0nXVsnYmVoYXZpb3InXTtcclxuICAgICAgdXNlckVubmVhZ3JhbUVtb3Rpb24gPSB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlclt1c2VyX2lkXVsnZW5uZWFncmFtJ11bJ2Vtb3Rpb24nXTtcclxuICAgICAgdXNlckVubmVhZ3JhbVRob3VnaHQgPSB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlclt1c2VyX2lkXVsnZW5uZWFncmFtJ11bJ3Rob3VnaHQnXTtcclxuICAgICAgdXNlckVubmVhZ3JhbVN0YXRlID0gdGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXJbdXNlcl9pZF1bJ2VubmVhZ3JhbSddWydzdGF0ZSddO1xyXG4gICAgICBwb3N0X3JvbGVzW3VzZXJfaWRdID0gXCJvd25lclwiO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyKTtcclxuICAgIGNvbnNvbGUubG9nKHVzZXJFbm5lYWdyYW1OdW0pO1xyXG4gICAgdmFyIGRhdGFfZm9yX3VwbG9hZCA9IHtcclxuICAgICAgYmVoYXZpb3IgOiB1c2VyRW5uZWFncmFtQmVoYXZpb3IsXHJcbiAgICAgIGVtb3Rpb24gOiB1c2VyRW5uZWFncmFtRW1vdGlvbixcclxuICAgICAgbnVtYmVyIDogdXNlckVubmVhZ3JhbU51bSxcclxuICAgICAgc3RhdGUgOiB1c2VyRW5uZWFncmFtU3RhdGUsXHJcbiAgICAgIHRob3VnaHQgOiB1c2VyRW5uZWFncmFtVGhvdWdodCxcclxuICAgICAgY2xvc2VUaW1lIDogXCJcIixcclxuICAgICAgZGVzY3JpcHRpb24gOiB0aGlzLmRlc2NyaXB0aW9uVmFsdWUsXHJcbiAgICAgIGltYWdlIDogdGhpcy5maXJlYmFzZVNlcnZpY2UuY3VycmVudEJsb2dJbWFnZUZpbGVVUkwsXHJcbiAgICAgIGlzT3BlbiA6IHRydWUsXHJcbiAgICAgIGxpa2VzIDogMCxcclxuICAgICAgbGF0aXR1ZGU6IHRoaXMuYmxvZ1NlcnZpY2UucG9zdExvY2F0aW9uLnBvc2l0aW9uLmxhdGl0dWRlLFxyXG4gICAgICBsb25naXR1ZGU6IHRoaXMuYmxvZ1NlcnZpY2UucG9zdExvY2F0aW9uLnBvc2l0aW9uLmxvbmdpdHVkZSxcclxuICAgICAgbmFtZSA6IHRoaXMudGl0bGVWYWx1ZSxcclxuICAgICAgb3BlblRpbWUgOiBEYXRlLm5vdygpLFxyXG4gICAgICByb2xlcyA6IHBvc3Rfcm9sZXMsXHJcbiAgICAgIHR5cGUgOiB0aGlzLmJsb2dTZXJ2aWNlLnBvc3RUeXBlXHJcbiAgICB9XHJcbiAgICB0aGlzLmZpcmViYXNlU2VydmljZS5hZGRfcG9zdChkYXRhX2Zvcl91cGxvYWQpO1xyXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnLyddLCB7IGFuaW1hdGVkOiBmYWxzZSB9KTtcclxuICB9XHJcbn1cclxuIl19