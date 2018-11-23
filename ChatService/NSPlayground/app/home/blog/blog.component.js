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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJibG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF3RTtBQUd4RSwrREFBOEU7QUFDOUUsb0NBQXNDO0FBRXRDLCtDQUE2QztBQUM3QyxvRUFBa0U7QUFDbEUsc0RBQStEO0FBRS9ELGdFQUF3RjtBQUV4Riw2RkFBMEY7QUFRMUY7SUFhRSx1QkFDVSxXQUF3QixFQUN4QixlQUFnQyxFQUNoQyxnQkFBa0M7UUFGbEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFkNUMsNEJBQXVCLEdBQVcsQ0FBQyxDQUFDO1FBQ3BDLHVCQUFrQixHQUFVLFNBQVMsQ0FBQztRQUN0QyxvQkFBZSxHQUFVLEdBQUcsQ0FBQztRQUM3QixvQkFBZSxHQUFVLFNBQVMsQ0FBQztRQUNuQyxpQkFBWSxHQUFVLEdBQUcsQ0FBQztRQUMxQixlQUFVLEdBQVcsS0FBSyxDQUFDO1FBQzNCLGVBQVUsR0FBVSxFQUFFLENBQUM7UUFDdkIscUJBQWdCLEdBQVUsRUFBRSxDQUFDO0lBVTdCLENBQUM7SUFFRCxnQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQUVELDZCQUFLLEdBQUwsVUFBTSxJQUFzQjtRQUMxQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVBLHNDQUFjLEdBQWQ7SUFFQSxDQUFDO0lBQ0QsbUNBQVcsR0FBWCxVQUFZLFNBQWdCO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDUCxPQUFPLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDdkQsQ0FBQztJQUNGLENBQUM7SUFDQSwyQ0FBbUIsR0FBbkI7UUFDRSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLElBQUksU0FBUyxDQUFDLENBQUEsQ0FBQztZQUN2QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsUUFBUSxDQUFDO1lBQ25DLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFBQSxJQUFJLENBQUEsQ0FBQztZQUNKLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxTQUFTLENBQUM7WUFDcEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUM7UUFDN0IsQ0FBQztJQUNILENBQUM7SUFDRCx3Q0FBZ0IsR0FBaEI7UUFDRSxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLFNBQVMsQ0FBQyxDQUFBLENBQUM7WUFDcEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUM7WUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDeEIsQ0FBQztRQUFBLElBQUksQ0FBQSxDQUFDO1lBQ0osSUFBSSxDQUFDLGVBQWUsR0FBRyxTQUFTLENBQUM7WUFDakMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7UUFDMUIsQ0FBQztJQUNILENBQUM7SUFDRCxtQ0FBVyxHQUFYLFVBQVksSUFBcUI7UUFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsR0FBRyxLQUFLLENBQUM7SUFDbkQsQ0FBQztJQUNELG1DQUFXLEdBQVg7UUFDRSxFQUFFLENBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQSxDQUFDO1lBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztZQUNqRCxNQUFNLENBQUM7UUFDVCxDQUFDO1FBQ0QsSUFBSSxDQUFDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUcsRUFBRSxDQUFDLENBQUEsQ0FBQztZQUM1QixPQUFPLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7WUFDaEQsTUFBTSxDQUFDO1FBQ1QsQ0FBQztRQUVELElBQUksZ0JBQWdCLENBQUM7UUFDckIsSUFBSSxxQkFBcUIsQ0FBQztRQUMxQixJQUFJLG9CQUFvQixDQUFDO1FBQ3pCLElBQUksb0JBQW9CLENBQUM7UUFDekIsSUFBSSxrQkFBa0IsQ0FBQztRQUN2QixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDcEIsR0FBRyxDQUFBLENBQUMsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQSxDQUFDO1lBQ2hELGdCQUFnQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pGLHFCQUFxQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3hGLG9CQUFvQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3RGLG9CQUFvQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3RGLGtCQUFrQixHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xGLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUM7UUFDaEMsQ0FBQztRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDOUIsSUFBSSxlQUFlLEdBQUc7WUFDcEIsUUFBUSxFQUFHLHFCQUFxQjtZQUNoQyxPQUFPLEVBQUcsb0JBQW9CO1lBQzlCLE1BQU0sRUFBRyxnQkFBZ0I7WUFDekIsS0FBSyxFQUFHLGtCQUFrQjtZQUMxQixPQUFPLEVBQUcsb0JBQW9CO1lBQzlCLFNBQVMsRUFBRyxFQUFFO1lBQ2QsV0FBVyxFQUFHLElBQUksQ0FBQyxnQkFBZ0I7WUFDbkMsS0FBSyxFQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsdUJBQXVCO1lBQ3BELE1BQU0sRUFBRyxJQUFJO1lBQ2IsS0FBSyxFQUFHLENBQUM7WUFDVCxRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVE7WUFDekQsU0FBUyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxTQUFTO1lBQzNELElBQUksRUFBRyxJQUFJLENBQUMsVUFBVTtZQUN0QixRQUFRLEVBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNyQixLQUFLLEVBQUcsVUFBVTtZQUNsQixJQUFJLEVBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRO1NBQ2pDLENBQUE7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBbEd3QjtRQUF4QixnQkFBUyxDQUFDLFlBQVksQ0FBQztrQ0FBYSx3QkFBVTtxREFBQztJQUM1QjtRQUFuQixnQkFBUyxDQUFDLE9BQU8sQ0FBQztrQ0FBUSwwQ0FBZ0M7Z0RBQUM7SUFDMUI7UUFBakMsZ0JBQVMsQ0FBQyxxQkFBcUIsQ0FBQztrQ0FBc0IsMkNBQW1COzhEQUFDO0lBWmhFLGFBQWE7UUFOekIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsTUFBTTtZQUNoQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO1NBQ3JDLENBQUM7eUNBZXVCLDBCQUFXO1lBQ1Asa0NBQWU7WUFDZCx5QkFBZ0I7T0FoQmpDLGFBQWEsQ0E2R3pCO0lBQUQsb0JBQUM7Q0FBQSxBQTdHRCxJQTZHQztBQTdHWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBUb2tlbk1vZGVsIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1hdXRvY29tcGxldGVcIjtcbmltcG9ydCB7IFNjcm9sbFZpZXcsIFNjcm9sbEV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3Njcm9sbC12aWV3XCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5cbmltcG9ydCB7IEJsb2dTZXJ2aWNlIH0gZnJvbSBcIi4vYmxvZy1zZXJ2aWNlXCI7XG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IEdlc3R1cmVFdmVudERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9nZXN0dXJlc1wiO1xuaW1wb3J0IHsgUmFkQXV0b0NvbXBsZXRlVGV4dFZpZXdDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWF1dG9jb21wbGV0ZS9hbmd1bGFyXCI7XG5cbmltcG9ydCB7IE1hcEV4YW1wbGVDb21wb25lbnQgfSBmcm9tIFwiLi4vZnJpZW5kbWF0Y2hpbmcvbWFwLWV4YW1wbGUvbWFwLWV4YW1wbGUuY29tcG9uZW50XCI7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ0Jsb2cnLFxuICB0ZW1wbGF0ZVVybDogJy4vYmxvZy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Jsb2cuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBCbG9nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgc2VsZWN0ZWRMb2NhdGlvbjtcbiAgc2VsZWN0ZWRMaXN0UGlja2VySW5kZXg6IG51bWJlciA9IDA7XG4gIGxvY2F0aW9uX2NvbGxhcHNlZDpzdHJpbmcgPSBcIltjbG9zZV1cIjtcbiAgbG9jYXRpb25faGVpZ2h0Om51bWJlciA9IDMwMDsgXG4gIGltYWdlX2NvbGxhcHNlZDpzdHJpbmcgPSBcIltjbG9zZV1cIjtcbiAgaW1hZ2VfaGVpZ2h0Om51bWJlciA9IDMwMDtcbiAgaXNVcGxvYWRlZDpib29sZWFuID0gZmFsc2U7XG4gIHRpdGxlVmFsdWU6c3RyaW5nID0gXCJcIjtcbiAgZGVzY3JpcHRpb25WYWx1ZTpzdHJpbmcgPSBcIlwiO1xuICBAVmlld0NoaWxkKFwic2Nyb2xsdmlld1wiKSBzY3JvbGx2aWV3OiBTY3JvbGxWaWV3O1xuICBAVmlld0NoaWxkKFwidHlwZXNcIikgdHlwZXM6IFJhZEF1dG9Db21wbGV0ZVRleHRWaWV3Q29tcG9uZW50O1xuICBAVmlld0NoaWxkKFwibWFwRXhhbXBsZUNvbXBvbmVudFwiKSBtYXBFeGFtcGxlQ29tcG9uZW50OiBNYXBFeGFtcGxlQ29tcG9uZW50O1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGJsb2dTZXJ2aWNlOiBCbG9nU2VydmljZSxcbiAgICBwcml2YXRlIGZpcmViYXNlU2VydmljZTogRmlyZWJhc2VTZXJ2aWNlLFxuICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgKSB7XG5cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuXG4gIH1cblxuICBvblRhcChhcmdzOiBHZXN0dXJlRXZlbnREYXRhKSB7XG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcblx0fVxuXG4gIHNlbGVjdExvY2F0aW9uKCkge1xuXG4gIH1cbiAgc2VsZWN0SW1hZ2UoaW1hZ2VUeXBlOnN0cmluZyk6IHZvaWQge1xuXHRcdGlmICh0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlcikge1xuICAgICAgdGhpcy5pc1VwbG9hZGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnBpY2tJbWFnZShpbWFnZVR5cGUpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRkaWFsb2dzLmFsZXJ0KFwiQ2Fubm90IHVwbG9hZCBpbWFnZXMgaW4gb2ZmbGluZSBtb2RlXCIpO1xuXHRcdH1cblx0fVxuICBvbkxhY2F0aW9uVG9nZ2xlVGFwKCl7XG4gICAgaWYodGhpcy5sb2NhdGlvbl9jb2xsYXBzZWQgPT0gXCJbY2xvc2VdXCIpe1xuICAgICAgdGhpcy5sb2NhdGlvbl9jb2xsYXBzZWQgPSBcIltvcGVuXVwiO1xuICAgICAgdGhpcy5sb2NhdGlvbl9oZWlnaHQgPSAwO1xuICAgIH1lbHNle1xuICAgICAgdGhpcy5sb2NhdGlvbl9jb2xsYXBzZWQgPSBcIltjbG9zZV1cIjtcbiAgICAgIHRoaXMubG9jYXRpb25faGVpZ2h0ID0gMzAwO1xuICAgIH0gICAgXG4gIH1cbiAgb25JbWFnZVRvZ2dsZVRhcCgpe1xuICAgIGlmKHRoaXMuaW1hZ2VfY29sbGFwc2VkID09IFwiW2Nsb3NlXVwiKXtcbiAgICAgIHRoaXMuaW1hZ2VfY29sbGFwc2VkID0gXCJbb3Blbl1cIjtcbiAgICAgIHRoaXMuaW1hZ2VfaGVpZ2h0ID0gMDtcbiAgICB9ZWxzZXtcbiAgICAgIHRoaXMuaW1hZ2VfY29sbGFwc2VkID0gXCJbY2xvc2VdXCI7XG4gICAgICB0aGlzLmltYWdlX2hlaWdodCA9IDMwMDtcbiAgICB9XG4gIH1cbiAgb25NYXBTY3JvbGwoYXJnczogU2Nyb2xsRXZlbnREYXRhKXtcbiAgICB0aGlzLnNjcm9sbHZpZXcuaXNVc2VySW50ZXJhY3Rpb25FbmFibGVkID0gZmFsc2U7XG4gIH1cbiAgb25VcGxvYWRUYXAoKXtcbiAgICBpZighdGhpcy5pc1VwbG9hZGVkKXtcbiAgICAgIGRpYWxvZ3MuYWxlcnQoXCJQbGVhc2UgU2VsZWN0IGEgaW1hZ2UgZm9yIHBvc3QuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbHNlIGlmKHRoaXMudGl0bGVWYWx1ZT09PVwiXCIpe1xuICAgICAgZGlhbG9ncy5hbGVydChcIlBsZWFzZSBFbnRlciBhIHRpdGxlIGZvciBwb3N0LlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgdXNlckVubmVhZ3JhbU51bTtcbiAgICB2YXIgdXNlckVubmVhZ3JhbUJlaGF2aW9yO1xuICAgIHZhciB1c2VyRW5uZWFncmFtRW1vdGlvbjtcbiAgICB2YXIgdXNlckVubmVhZ3JhbVRob3VnaHQ7XG4gICAgdmFyIHVzZXJFbm5lYWdyYW1TdGF0ZTtcbiAgICB2YXIgcG9zdF9yb2xlcyA9IHt9O1xuICAgIGZvcih2YXIgdXNlcl9pZCBpbiB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlcil7XG4gICAgICB1c2VyRW5uZWFncmFtTnVtID0gdGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXJbdXNlcl9pZF1bJ2VubmVhZ3JhbSddWydudW1iZXInXTtcbiAgICAgIHVzZXJFbm5lYWdyYW1CZWhhdmlvciA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyW3VzZXJfaWRdWydlbm5lYWdyYW0nXVsnYmVoYXZpb3InXTtcbiAgICAgIHVzZXJFbm5lYWdyYW1FbW90aW9uID0gdGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXJbdXNlcl9pZF1bJ2VubmVhZ3JhbSddWydlbW90aW9uJ107XG4gICAgICB1c2VyRW5uZWFncmFtVGhvdWdodCA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyW3VzZXJfaWRdWydlbm5lYWdyYW0nXVsndGhvdWdodCddO1xuICAgICAgdXNlckVubmVhZ3JhbVN0YXRlID0gdGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXJbdXNlcl9pZF1bJ2VubmVhZ3JhbSddWydzdGF0ZSddO1xuICAgICAgcG9zdF9yb2xlc1t1c2VyX2lkXSA9IFwib3duZXJcIjtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyh0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlcik7XG4gICAgY29uc29sZS5sb2codXNlckVubmVhZ3JhbU51bSk7XG4gICAgdmFyIGRhdGFfZm9yX3VwbG9hZCA9IHtcbiAgICAgIGJlaGF2aW9yIDogdXNlckVubmVhZ3JhbUJlaGF2aW9yLFxuICAgICAgZW1vdGlvbiA6IHVzZXJFbm5lYWdyYW1FbW90aW9uLFxuICAgICAgbnVtYmVyIDogdXNlckVubmVhZ3JhbU51bSxcbiAgICAgIHN0YXRlIDogdXNlckVubmVhZ3JhbVN0YXRlLFxuICAgICAgdGhvdWdodCA6IHVzZXJFbm5lYWdyYW1UaG91Z2h0LFxuICAgICAgY2xvc2VUaW1lIDogXCJcIixcbiAgICAgIGRlc2NyaXB0aW9uIDogdGhpcy5kZXNjcmlwdGlvblZhbHVlLFxuICAgICAgaW1hZ2UgOiB0aGlzLmZpcmViYXNlU2VydmljZS5jdXJyZW50QmxvZ0ltYWdlRmlsZVVSTCxcbiAgICAgIGlzT3BlbiA6IHRydWUsXG4gICAgICBsaWtlcyA6IDAsXG4gICAgICBsYXRpdHVkZTogdGhpcy5ibG9nU2VydmljZS5wb3N0TG9jYXRpb24ucG9zaXRpb24ubGF0aXR1ZGUsXG4gICAgICBsb25naXR1ZGU6IHRoaXMuYmxvZ1NlcnZpY2UucG9zdExvY2F0aW9uLnBvc2l0aW9uLmxvbmdpdHVkZSxcbiAgICAgIG5hbWUgOiB0aGlzLnRpdGxlVmFsdWUsXG4gICAgICBvcGVuVGltZSA6IERhdGUubm93KCksXG4gICAgICByb2xlcyA6IHBvc3Rfcm9sZXMsXG4gICAgICB0eXBlIDogdGhpcy5ibG9nU2VydmljZS5wb3N0VHlwZVxuICAgIH1cbiAgICB0aGlzLmZpcmViYXNlU2VydmljZS5hZGRfcG9zdChkYXRhX2Zvcl91cGxvYWQpO1xuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy8nXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XG4gIH1cbn1cbiJdfQ==