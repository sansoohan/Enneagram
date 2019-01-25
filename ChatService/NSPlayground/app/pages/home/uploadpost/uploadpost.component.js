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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkcG9zdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1cGxvYWRwb3N0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF3RTtBQUd4RSwrREFBOEU7QUFDOUUsb0NBQXNDO0FBRXRDLDJEQUF5RDtBQUN6RCxnRUFBOEQ7QUFDOUQsc0RBQStEO0FBRS9ELGdFQUF3RjtBQUV4RixrRkFBK0U7QUFRL0U7SUFhRSw2QkFDVSxpQkFBb0MsRUFDcEMsZUFBZ0MsRUFDaEMsZ0JBQWtDO1FBRmxDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFkNUMsNEJBQXVCLEdBQVcsQ0FBQyxDQUFDO1FBQ3BDLHNCQUFpQixHQUFVLFNBQVMsQ0FBQztRQUNyQyxtQkFBYyxHQUFVLEdBQUcsQ0FBQztRQUM1QixtQkFBYyxHQUFVLFNBQVMsQ0FBQztRQUNsQyxnQkFBVyxHQUFVLEdBQUcsQ0FBQztRQUN6QixlQUFVLEdBQVcsS0FBSyxDQUFDO1FBQzNCLGVBQVUsR0FBVSxFQUFFLENBQUM7UUFDdkIscUJBQWdCLEdBQVUsRUFBRSxDQUFDO0lBVTdCLENBQUM7SUFFRCxzQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQUVELG1DQUFLLEdBQUwsVUFBTSxJQUFzQjtRQUMxQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVBLDRDQUFjLEdBQWQ7SUFFQSxDQUFDO0lBQ0QseUNBQVcsR0FBWCxVQUFZLFNBQWdCO1FBQzVCLElBQUksSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7WUFDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDN0M7YUFBTTtZQUNO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QUFnQjtPQWhCakMsbUJBQW1CLENBZ0gvQjtJQUFELDBCQUFDO0NBQUEsQUFoSEQsSUFnSEM7QUFoSFksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5pbXBvcnQgeyBUb2tlbk1vZGVsIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1hdXRvY29tcGxldGVcIjtcclxuaW1wb3J0IHsgU2Nyb2xsVmlldywgU2Nyb2xsRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvc2Nyb2xsLXZpZXdcIjtcclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5cclxuaW1wb3J0IHsgVXBsb2FkcG9zdFNlcnZpY2UgfSBmcm9tIFwiLi91cGxvYWRwb3N0LXNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSBcIn4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXNcIjtcclxuaW1wb3J0IHsgUmFkQXV0b0NvbXBsZXRlVGV4dFZpZXdDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWF1dG9jb21wbGV0ZS9hbmd1bGFyXCI7XHJcblxyXG5pbXBvcnQgeyBHb29nbGVNYXBDb21wb25lbnQgfSBmcm9tIFwifi9tb2R1bGVzL2dvb2dsZS1tYXAvZ29vZ2xlLW1hcC5jb21wb25lbnRcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgc2VsZWN0b3I6ICdVcGxvYWRwb3N0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdXBsb2FkcG9zdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdXBsb2FkcG9zdC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBVcGxvYWRwb3N0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBzZWxlY3RlZExvY2F0aW9uO1xyXG4gIHNlbGVjdGVkTGlzdFBpY2tlckluZGV4OiBudW1iZXIgPSAwO1xyXG4gIGxvY2F0aW9uQ29sbGFwc2VkOnN0cmluZyA9IFwiW2Nsb3NlXVwiO1xyXG4gIGxvY2F0aW9uSGVpZ2h0Om51bWJlciA9IDMwMDsgXHJcbiAgaW1hZ2VDb2xsYXBzZWQ6c3RyaW5nID0gXCJbY2xvc2VdXCI7XHJcbiAgaW1hZ2VIZWlnaHQ6bnVtYmVyID0gMzAwO1xyXG4gIGlzVXBsb2FkZWQ6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gIHRpdGxlVmFsdWU6c3RyaW5nID0gXCJcIjtcclxuICBkZXNjcmlwdGlvblZhbHVlOnN0cmluZyA9IFwiXCI7XHJcbiAgQFZpZXdDaGlsZChcInNjcm9sbHZpZXdcIikgc2Nyb2xsdmlldzogU2Nyb2xsVmlldztcclxuICBAVmlld0NoaWxkKFwidHlwZXNcIikgdHlwZXM6IFJhZEF1dG9Db21wbGV0ZVRleHRWaWV3Q29tcG9uZW50O1xyXG4gIEBWaWV3Q2hpbGQoXCJnb29nbGVNYXBDb21wb25lbnRcIikgZ29vZ2xlTWFwQ29tcG9uZW50OiBHb29nbGVNYXBDb21wb25lbnQ7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIHVwbG9hZHBvc3RTZXJ2aWNlOiBVcGxvYWRwb3N0U2VydmljZSxcclxuICAgIHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UsXHJcbiAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcblxyXG4gIH1cclxuXHJcbiAgb25UYXAoYXJnczogR2VzdHVyZUV2ZW50RGF0YSkge1xyXG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuXHR9XHJcblxyXG4gIHNlbGVjdExvY2F0aW9uKCkge1xyXG5cclxuICB9XHJcbiAgc2VsZWN0SW1hZ2UoaW1hZ2VUeXBlOnN0cmluZyk6IHZvaWQge1xyXG5cdFx0aWYgKHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyKSB7XHJcbiAgICAgIHRoaXMuaXNVcGxvYWRlZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnBpY2tJbWFnZShpbWFnZVR5cGUpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZGlhbG9ncy5hbGVydChcIkNhbm5vdCB1cGxvYWQgaW1hZ2VzIGluIG9mZmxpbmUgbW9kZVwiKTtcclxuXHRcdH1cclxuXHR9XHJcbiAgb25MYWNhdGlvblRvZ2dsZVRhcCgpe1xyXG4gICAgaWYodGhpcy5sb2NhdGlvbkNvbGxhcHNlZCA9PSBcIltjbG9zZV1cIil7XHJcbiAgICAgIHRoaXMubG9jYXRpb25Db2xsYXBzZWQgPSBcIltvcGVuXVwiO1xyXG4gICAgICB0aGlzLmxvY2F0aW9uSGVpZ2h0ID0gMDtcclxuICAgIH1lbHNle1xyXG4gICAgICB0aGlzLmxvY2F0aW9uQ29sbGFwc2VkID0gXCJbY2xvc2VdXCI7XHJcbiAgICAgIHRoaXMubG9jYXRpb25IZWlnaHQgPSAzMDA7XHJcbiAgICB9ICAgIFxyXG4gIH1cclxuICBcclxuICBvbkltYWdlVG9nZ2xlVGFwKCl7XHJcbiAgICBpZih0aGlzLmltYWdlQ29sbGFwc2VkID09IFwiW2Nsb3NlXVwiKXtcclxuICAgICAgdGhpcy5pbWFnZUNvbGxhcHNlZCA9IFwiW29wZW5dXCI7XHJcbiAgICAgIHRoaXMuaW1hZ2VIZWlnaHQgPSAwO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIHRoaXMuaW1hZ2VDb2xsYXBzZWQgPSBcIltjbG9zZV1cIjtcclxuICAgICAgdGhpcy5pbWFnZUhlaWdodCA9IDMwMDtcclxuICAgIH1cclxuICB9XHJcbiAgb25NYXBTY3JvbGwoYXJnczogU2Nyb2xsRXZlbnREYXRhKXtcclxuICAgIHRoaXMuc2Nyb2xsdmlldy5pc1VzZXJJbnRlcmFjdGlvbkVuYWJsZWQgPSBmYWxzZTtcclxuICB9XHJcbiAgb25VcGxvYWRUYXAoKXtcclxuICAgIGlmKCF0aGlzLmlzVXBsb2FkZWQpe1xyXG4gICAgICBkaWFsb2dzLmFsZXJ0KFwiUGxlYXNlIFNlbGVjdCBhIGltYWdlIGZvciBwb3N0LlwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZih0aGlzLnRpdGxlVmFsdWU9PT1cIlwiKXtcclxuICAgICAgZGlhbG9ncy5hbGVydChcIlBsZWFzZSBFbnRlciBhIHRpdGxlIGZvciBwb3N0LlwiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB1c2VyRW5uZWFncmFtTnVtO1xyXG4gICAgdmFyIHVzZXJFbm5lYWdyYW1CZWhhdmlvcjtcclxuICAgIHZhciB1c2VyRW5uZWFncmFtRW1vdGlvbjtcclxuICAgIHZhciB1c2VyRW5uZWFncmFtVGhvdWdodDtcclxuICAgIHZhciB1c2VyRW5uZWFncmFtU3RhdGU7XHJcbiAgICB2YXIgcG9zdFJvbGVzID0ge307XHJcbiAgICBmb3IodmFyIHVzZXJJRCBpbiB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlcil7XHJcbiAgICAgIHVzZXJFbm5lYWdyYW1OdW0gPSB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlclt1c2VySURdWydlbm5lYWdyYW0nXVsnbnVtYmVyJ107XHJcbiAgICAgIHVzZXJFbm5lYWdyYW1CZWhhdmlvciA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyW3VzZXJJRF1bJ2VubmVhZ3JhbSddWydiZWhhdmlvciddO1xyXG4gICAgICB1c2VyRW5uZWFncmFtRW1vdGlvbiA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyW3VzZXJJRF1bJ2VubmVhZ3JhbSddWydlbW90aW9uJ107XHJcbiAgICAgIHVzZXJFbm5lYWdyYW1UaG91Z2h0ID0gdGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXJbdXNlcklEXVsnZW5uZWFncmFtJ11bJ3Rob3VnaHQnXTtcclxuICAgICAgdXNlckVubmVhZ3JhbVN0YXRlID0gdGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXJbdXNlcklEXVsnZW5uZWFncmFtJ11bJ3N0YXRlJ107XHJcbiAgICAgIHBvc3RSb2xlc1t1c2VySURdID0gXCJvd25lclwiO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyKTtcclxuICAgIGNvbnNvbGUubG9nKHVzZXJFbm5lYWdyYW1OdW0pO1xyXG4gICAgdmFyIHVwbG9hZERhdGEgPSB7XHJcbiAgICAgIGJlaGF2aW9yIDogdXNlckVubmVhZ3JhbUJlaGF2aW9yLFxyXG4gICAgICBlbW90aW9uIDogdXNlckVubmVhZ3JhbUVtb3Rpb24sXHJcbiAgICAgIG51bWJlciA6IHVzZXJFbm5lYWdyYW1OdW0sXHJcbiAgICAgIHN0YXRlIDogdXNlckVubmVhZ3JhbVN0YXRlLFxyXG4gICAgICB0aG91Z2h0IDogdXNlckVubmVhZ3JhbVRob3VnaHQsXHJcbiAgICAgIGRlc2NyaXB0aW9uIDogdGhpcy5kZXNjcmlwdGlvblZhbHVlLFxyXG4gICAgICBpbWFnZSA6IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmN1cnJlbnRCbG9nSW1hZ2VGaWxlVVJMLFxyXG4gICAgICBpc09wZW4gOiB0cnVlLFxyXG4gICAgICBsaWtlcyA6IFwiXCIsXHJcbiAgICAgIGZhdm9yaXRlcyA6IFwiXCIsXHJcbiAgICAgIGNvbW1lbnRzIDogXCJcIixcclxuICAgICAgbmFtZSA6IHRoaXMudGl0bGVWYWx1ZSxcclxuICAgICAgb3BlblRpbWUgOiBEYXRlLm5vdygpLFxyXG4gICAgICBjbG9zZVRpbWUgOiBcIlwiLFxyXG4gICAgICByb2xlcyA6IHBvc3RSb2xlcyxcclxuICAgICAgbGF0aXR1ZGU6IHRoaXMudXBsb2FkcG9zdFNlcnZpY2UucG9zdExvY2F0aW9uLnBvc2l0aW9uLmxhdGl0dWRlLFxyXG4gICAgICBsb25naXR1ZGU6IHRoaXMudXBsb2FkcG9zdFNlcnZpY2UucG9zdExvY2F0aW9uLnBvc2l0aW9uLmxvbmdpdHVkZSxcclxuICAgICAgdHlwZSA6IHRoaXMudXBsb2FkcG9zdFNlcnZpY2UucG9zdFR5cGVcclxuICAgIH1cclxuICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmFkZFBvc3QodXBsb2FkRGF0YSk7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvJ10sIHsgYW5pbWF0ZWQ6IGZhbHNlIH0pO1xyXG4gIH1cclxufVxyXG4iXX0=