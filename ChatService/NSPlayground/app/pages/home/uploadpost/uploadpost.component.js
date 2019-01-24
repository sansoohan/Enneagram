"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var scroll_view_1 = require("tns-core-modules/ui/scroll-view");
var dialogs = require("ui/dialogs");
var uploadpost_service_1 = require("./uploadpost-service");
var firebase_service_1 = require("~/services/firebase.service");
var router_1 = require("nativescript-angular/router");
var angular_1 = require("nativescript-ui-autocomplete/angular");
var google_map_component_1 = require("~/modules/google-map/google-map.component");
var UploadpostComponent = /** @class */ (function () {
    function UploadpostComponent(uploadpostService, firebaseService, routerExtensions) {
        this.uploadpostService = uploadpostService;
        this.firebaseService = firebaseService;
        this.routerExtensions = routerExtensions;
        this.selectedListPickerIndex = 0;
        this.locationCollapsed = "[close]";
        this.locationHeight = 300;
        this.imageCollapsed = "[close]";
        this.imageHeight = 300;
        this.isUploaded = false;
        this.titleValue = "";
        this.descriptionValue = "";
    }
    UploadpostComponent.prototype.ngOnInit = function () {
    };
    UploadpostComponent.prototype.onTap = function (args) {
        this.routerExtensions.back();
    };
    UploadpostComponent.prototype.selectLocation = function () {
    };
    UploadpostComponent.prototype.selectImage = function (imageType) {
        if (this.firebaseService.thisUser) {
            this.isUploaded = true;
            this.firebaseService.pickImage(imageType);
        }
        else {
            dialogs.alert("Cannot upload images in offline mode");
        }
    };
    UploadpostComponent.prototype.onLacationToggleTap = function () {
        if (this.locationCollapsed == "[close]") {
            this.locationCollapsed = "[open]";
            this.locationHeight = 0;
        }
        else {
            this.locationCollapsed = "[close]";
            this.locationHeight = 300;
        }
    };
    UploadpostComponent.prototype.onImageToggleTap = function () {
        if (this.imageCollapsed == "[close]") {
            this.imageCollapsed = "[open]";
            this.imageHeight = 0;
        }
        else {
            this.imageCollapsed = "[close]";
            this.imageHeight = 300;
        }
    };
    UploadpostComponent.prototype.onMapScroll = function (args) {
        this.scrollview.isUserInteractionEnabled = false;
    };
    UploadpostComponent.prototype.onUploadTap = function () {
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
        var postRoles = {};
        for (var userID in this.firebaseService.thisUser) {
            userEnneagramNum = this.firebaseService.thisUser[userID]['enneagram']['number'];
            userEnneagramBehavior = this.firebaseService.thisUser[userID]['enneagram']['behavior'];
            userEnneagramEmotion = this.firebaseService.thisUser[userID]['enneagram']['emotion'];
            userEnneagramThought = this.firebaseService.thisUser[userID]['enneagram']['thought'];
            userEnneagramState = this.firebaseService.thisUser[userID]['enneagram']['state'];
            postRoles[userID] = "owner";
        }
        console.log(this.firebaseService.thisUser);
        console.log(userEnneagramNum);
        var uploadData = {
            behavior: userEnneagramBehavior,
            emotion: userEnneagramEmotion,
            number: userEnneagramNum,
            state: userEnneagramState,
            thought: userEnneagramThought,
            description: this.descriptionValue,
            image: this.firebaseService.currentBlogImageFileURL,
            isOpen: true,
            likes: "",
            favorites: "",
            comments: "",
            name: this.titleValue,
            openTime: Date.now(),
            closeTime: "",
            roles: postRoles,
            latitude: this.uploadpostService.postLocation.position.latitude,
            longitude: this.uploadpostService.postLocation.position.longitude,
            type: this.uploadpostService.postType
        };
        this.firebaseService.addPost(uploadData);
        this.routerExtensions.navigate(['/'], { animated: false });
    };
    __decorate([
        core_1.ViewChild("scrollview"),
        __metadata("design:type", scroll_view_1.ScrollView)
    ], UploadpostComponent.prototype, "scrollview", void 0);
    __decorate([
        core_1.ViewChild("types"),
        __metadata("design:type", angular_1.RadAutoCompleteTextViewComponent)
    ], UploadpostComponent.prototype, "types", void 0);
    __decorate([
        core_1.ViewChild("googleMapComponent"),
        __metadata("design:type", google_map_component_1.GoogleMapComponent)
    ], UploadpostComponent.prototype, "googleMapComponent", void 0);
    UploadpostComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'Uploadpost',
            templateUrl: './uploadpost.component.html',
            styleUrls: ['./uploadpost.component.scss']
        }),
        __metadata("design:paramtypes", [uploadpost_service_1.UploadpostService,
            firebase_service_1.FirebaseService,
            router_1.RouterExtensions])
    ], UploadpostComponent);
    return UploadpostComponent;
}());
exports.UploadpostComponent = UploadpostComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkcG9zdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1cGxvYWRwb3N0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF3RTtBQUd4RSwrREFBOEU7QUFDOUUsb0NBQXNDO0FBRXRDLDJEQUF5RDtBQUN6RCxnRUFBOEQ7QUFDOUQsc0RBQStEO0FBRS9ELGdFQUF3RjtBQUV4RixrRkFBK0U7QUFRL0U7SUFhRSw2QkFDVSxpQkFBb0MsRUFDcEMsZUFBZ0MsRUFDaEMsZ0JBQWtDO1FBRmxDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFkNUMsNEJBQXVCLEdBQVcsQ0FBQyxDQUFDO1FBQ3BDLHNCQUFpQixHQUFVLFNBQVMsQ0FBQztRQUNyQyxtQkFBYyxHQUFVLEdBQUcsQ0FBQztRQUM1QixtQkFBYyxHQUFVLFNBQVMsQ0FBQztRQUNsQyxnQkFBVyxHQUFVLEdBQUcsQ0FBQztRQUN6QixlQUFVLEdBQVcsS0FBSyxDQUFDO1FBQzNCLGVBQVUsR0FBVSxFQUFFLENBQUM7UUFDdkIscUJBQWdCLEdBQVUsRUFBRSxDQUFDO0lBVTdCLENBQUM7SUFFRCxzQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQUVELG1DQUFLLEdBQUwsVUFBTSxJQUFzQjtRQUMxQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVBLDRDQUFjLEdBQWQ7SUFFQSxDQUFDO0lBQ0QseUNBQVcsR0FBWCxVQUFZLFNBQWdCO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMs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UUFBaEMsZ0JBQVMsQ0FBQyxvQkFBb0IsQ0FBQztrQ0FBcUIseUNBQWtCO21FQUFDO0lBWjdELG1CQUFtQjtRQU4vQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFdBQVcsRUFBRSw2QkFBNkI7WUFDMUMsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7U0FDM0MsQ0FBQzt5Q0FlNkIsc0NBQWlCO1lBQ25CLGtDQUFlO1lBQ2QseUJBQWdCO09BaEJqQyxtQkFBbUIsQ0FnSC9CO0lBQUQsMEJBQUM7Q0FBQSxBQWhIRCxJQWdIQztBQWhIWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCxWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbmltcG9ydCB7IFRva2VuTW9kZWwgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWF1dG9jb21wbGV0ZVwiO1xyXG5pbXBvcnQgeyBTY3JvbGxWaWV3LCBTY3JvbGxFdmVudERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zY3JvbGwtdmlld1wiO1xyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcblxyXG5pbXBvcnQgeyBVcGxvYWRwb3N0U2VydmljZSB9IGZyb20gXCIuL3VwbG9hZHBvc3Qtc2VydmljZVwiO1xyXG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwifi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEdlc3R1cmVFdmVudERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9nZXN0dXJlc1wiO1xyXG5pbXBvcnQgeyBSYWRBdXRvQ29tcGxldGVUZXh0Vmlld0NvbXBvbmVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktYXV0b2NvbXBsZXRlL2FuZ3VsYXJcIjtcclxuXHJcbmltcG9ydCB7IEdvb2dsZU1hcENvbXBvbmVudCB9IGZyb20gXCJ+L21vZHVsZXMvZ29vZ2xlLW1hcC9nb29nbGUtbWFwLmNvbXBvbmVudFwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICBzZWxlY3RvcjogJ1VwbG9hZHBvc3QnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi91cGxvYWRwb3N0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi91cGxvYWRwb3N0LmNvbXBvbmVudC5zY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFVwbG9hZHBvc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIHNlbGVjdGVkTG9jYXRpb247XHJcbiAgc2VsZWN0ZWRMaXN0UGlja2VySW5kZXg6IG51bWJlciA9IDA7XHJcbiAgbG9jYXRpb25Db2xsYXBzZWQ6c3RyaW5nID0gXCJbY2xvc2VdXCI7XHJcbiAgbG9jYXRpb25IZWlnaHQ6bnVtYmVyID0gMzAwOyBcclxuICBpbWFnZUNvbGxhcHNlZDpzdHJpbmcgPSBcIltjbG9zZV1cIjtcclxuICBpbWFnZUhlaWdodDpudW1iZXIgPSAzMDA7XHJcbiAgaXNVcGxvYWRlZDpib29sZWFuID0gZmFsc2U7XHJcbiAgdGl0bGVWYWx1ZTpzdHJpbmcgPSBcIlwiO1xyXG4gIGRlc2NyaXB0aW9uVmFsdWU6c3RyaW5nID0gXCJcIjtcclxuICBAVmlld0NoaWxkKFwic2Nyb2xsdmlld1wiKSBzY3JvbGx2aWV3OiBTY3JvbGxWaWV3O1xyXG4gIEBWaWV3Q2hpbGQoXCJ0eXBlc1wiKSB0eXBlczogUmFkQXV0b0NvbXBsZXRlVGV4dFZpZXdDb21wb25lbnQ7XHJcbiAgQFZpZXdDaGlsZChcImdvb2dsZU1hcENvbXBvbmVudFwiKSBnb29nbGVNYXBDb21wb25lbnQ6IEdvb2dsZU1hcENvbXBvbmVudDtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgdXBsb2FkcG9zdFNlcnZpY2U6IFVwbG9hZHBvc3RTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSxcclxuICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICApIHtcclxuXHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuXHJcbiAgfVxyXG5cclxuICBvblRhcChhcmdzOiBHZXN0dXJlRXZlbnREYXRhKSB7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xyXG5cdH1cclxuXHJcbiAgc2VsZWN0TG9jYXRpb24oKSB7XHJcblxyXG4gIH1cclxuICBzZWxlY3RJbWFnZShpbWFnZVR5cGU6c3RyaW5nKTogdm9pZCB7XHJcblx0XHRpZiAodGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXIpIHtcclxuICAgICAgdGhpcy5pc1VwbG9hZGVkID0gdHJ1ZTtcclxuICAgICAgdGhpcy5maXJlYmFzZVNlcnZpY2UucGlja0ltYWdlKGltYWdlVHlwZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkaWFsb2dzLmFsZXJ0KFwiQ2Fubm90IHVwbG9hZCBpbWFnZXMgaW4gb2ZmbGluZSBtb2RlXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxuICBvbkxhY2F0aW9uVG9nZ2xlVGFwKCl7XHJcbiAgICBpZih0aGlzLmxvY2F0aW9uQ29sbGFwc2VkID09IFwiW2Nsb3NlXVwiKXtcclxuICAgICAgdGhpcy5sb2NhdGlvbkNvbGxhcHNlZCA9IFwiW29wZW5dXCI7XHJcbiAgICAgIHRoaXMubG9jYXRpb25IZWlnaHQgPSAwO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIHRoaXMubG9jYXRpb25Db2xsYXBzZWQgPSBcIltjbG9zZV1cIjtcclxuICAgICAgdGhpcy5sb2NhdGlvbkhlaWdodCA9IDMwMDtcclxuICAgIH0gICAgXHJcbiAgfVxyXG4gIFxyXG4gIG9uSW1hZ2VUb2dnbGVUYXAoKXtcclxuICAgIGlmKHRoaXMuaW1hZ2VDb2xsYXBzZWQgPT0gXCJbY2xvc2VdXCIpe1xyXG4gICAgICB0aGlzLmltYWdlQ29sbGFwc2VkID0gXCJbb3Blbl1cIjtcclxuICAgICAgdGhpcy5pbWFnZUhlaWdodCA9IDA7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgdGhpcy5pbWFnZUNvbGxhcHNlZCA9IFwiW2Nsb3NlXVwiO1xyXG4gICAgICB0aGlzLmltYWdlSGVpZ2h0ID0gMzAwO1xyXG4gICAgfVxyXG4gIH1cclxuICBvbk1hcFNjcm9sbChhcmdzOiBTY3JvbGxFdmVudERhdGEpe1xyXG4gICAgdGhpcy5zY3JvbGx2aWV3LmlzVXNlckludGVyYWN0aW9uRW5hYmxlZCA9IGZhbHNlO1xyXG4gIH1cclxuICBvblVwbG9hZFRhcCgpe1xyXG4gICAgaWYoIXRoaXMuaXNVcGxvYWRlZCl7XHJcbiAgICAgIGRpYWxvZ3MuYWxlcnQoXCJQbGVhc2UgU2VsZWN0IGEgaW1hZ2UgZm9yIHBvc3QuXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKHRoaXMudGl0bGVWYWx1ZT09PVwiXCIpe1xyXG4gICAgICBkaWFsb2dzLmFsZXJ0KFwiUGxlYXNlIEVudGVyIGEgdGl0bGUgZm9yIHBvc3QuXCIpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHVzZXJFbm5lYWdyYW1OdW07XHJcbiAgICB2YXIgdXNlckVubmVhZ3JhbUJlaGF2aW9yO1xyXG4gICAgdmFyIHVzZXJFbm5lYWdyYW1FbW90aW9uO1xyXG4gICAgdmFyIHVzZXJFbm5lYWdyYW1UaG91Z2h0O1xyXG4gICAgdmFyIHVzZXJFbm5lYWdyYW1TdGF0ZTtcclxuICAgIHZhciBwb3N0Um9sZXMgPSB7fTtcclxuICAgIGZvcih2YXIgdXNlcklEIGluIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyKXtcclxuICAgICAgdXNlckVubmVhZ3JhbU51bSA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyW3VzZXJJRF1bJ2VubmVhZ3JhbSddWydudW1iZXInXTtcclxuICAgICAgdXNlckVubmVhZ3JhbUJlaGF2aW9yID0gdGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXJbdXNlcklEXVsnZW5uZWFncmFtJ11bJ2JlaGF2aW9yJ107XHJcbiAgICAgIHVzZXJFbm5lYWdyYW1FbW90aW9uID0gdGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXJbdXNlcklEXVsnZW5uZWFncmFtJ11bJ2Vtb3Rpb24nXTtcclxuICAgICAgdXNlckVubmVhZ3JhbVRob3VnaHQgPSB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlclt1c2VySURdWydlbm5lYWdyYW0nXVsndGhvdWdodCddO1xyXG4gICAgICB1c2VyRW5uZWFncmFtU3RhdGUgPSB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlclt1c2VySURdWydlbm5lYWdyYW0nXVsnc3RhdGUnXTtcclxuICAgICAgcG9zdFJvbGVzW3VzZXJJRF0gPSBcIm93bmVyXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2codGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXIpO1xyXG4gICAgY29uc29sZS5sb2codXNlckVubmVhZ3JhbU51bSk7XHJcbiAgICB2YXIgdXBsb2FkRGF0YSA9IHtcclxuICAgICAgYmVoYXZpb3IgOiB1c2VyRW5uZWFncmFtQmVoYXZpb3IsXHJcbiAgICAgIGVtb3Rpb24gOiB1c2VyRW5uZWFncmFtRW1vdGlvbixcclxuICAgICAgbnVtYmVyIDogdXNlckVubmVhZ3JhbU51bSxcclxuICAgICAgc3RhdGUgOiB1c2VyRW5uZWFncmFtU3RhdGUsXHJcbiAgICAgIHRob3VnaHQgOiB1c2VyRW5uZWFncmFtVGhvdWdodCxcclxuICAgICAgZGVzY3JpcHRpb24gOiB0aGlzLmRlc2NyaXB0aW9uVmFsdWUsXHJcbiAgICAgIGltYWdlIDogdGhpcy5maXJlYmFzZVNlcnZpY2UuY3VycmVudEJsb2dJbWFnZUZpbGVVUkwsXHJcbiAgICAgIGlzT3BlbiA6IHRydWUsXHJcbiAgICAgIGxpa2VzIDogXCJcIixcclxuICAgICAgZmF2b3JpdGVzIDogXCJcIixcclxuICAgICAgY29tbWVudHMgOiBcIlwiLFxyXG4gICAgICBuYW1lIDogdGhpcy50aXRsZVZhbHVlLFxyXG4gICAgICBvcGVuVGltZSA6IERhdGUubm93KCksXHJcbiAgICAgIGNsb3NlVGltZSA6IFwiXCIsXHJcbiAgICAgIHJvbGVzIDogcG9zdFJvbGVzLFxyXG4gICAgICBsYXRpdHVkZTogdGhpcy51cGxvYWRwb3N0U2VydmljZS5wb3N0TG9jYXRpb24ucG9zaXRpb24ubGF0aXR1ZGUsXHJcbiAgICAgIGxvbmdpdHVkZTogdGhpcy51cGxvYWRwb3N0U2VydmljZS5wb3N0TG9jYXRpb24ucG9zaXRpb24ubG9uZ2l0dWRlLFxyXG4gICAgICB0eXBlIDogdGhpcy51cGxvYWRwb3N0U2VydmljZS5wb3N0VHlwZVxyXG4gICAgfVxyXG4gICAgdGhpcy5maXJlYmFzZVNlcnZpY2UuYWRkUG9zdCh1cGxvYWREYXRhKTtcclxuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy8nXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==