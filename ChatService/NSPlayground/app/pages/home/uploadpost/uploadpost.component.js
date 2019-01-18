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
        var post_roles = {};
        for (var userID in this.firebaseService.thisUser) {
            userEnneagramNum = this.firebaseService.thisUser[userID]['enneagram']['number'];
            userEnneagramBehavior = this.firebaseService.thisUser[userID]['enneagram']['behavior'];
            userEnneagramEmotion = this.firebaseService.thisUser[userID]['enneagram']['emotion'];
            userEnneagramThought = this.firebaseService.thisUser[userID]['enneagram']['thought'];
            userEnneagramState = this.firebaseService.thisUser[userID]['enneagram']['state'];
            post_roles[userID] = "owner";
        }
        console.log(this.firebaseService.thisUser);
        console.log(userEnneagramNum);
        var uploadData = {
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
            latitude: this.uploadpostService.postLocation.position.latitude,
            longitude: this.uploadpostService.postLocation.position.longitude,
            name: this.titleValue,
            openTime: Date.now(),
            roles: post_roles,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkcG9zdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1cGxvYWRwb3N0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF3RTtBQUd4RSwrREFBOEU7QUFDOUUsb0NBQXNDO0FBRXRDLDJEQUF5RDtBQUN6RCxnRUFBOEQ7QUFDOUQsc0RBQStEO0FBRS9ELGdFQUF3RjtBQUV4RixrRkFBK0U7QUFRL0U7SUFhRSw2QkFDVSxpQkFBb0MsRUFDcEMsZUFBZ0MsRUFDaEMsZ0JBQWtDO1FBRmxDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFkNUMsNEJBQXVCLEdBQVcsQ0FBQyxDQUFDO1FBQ3BDLHNCQUFpQixHQUFVLFNBQVMsQ0FBQztRQUNyQyxtQkFBYyxHQUFVLEdBQUcsQ0FBQztRQUM1QixtQkFBYyxHQUFVLFNBQVMsQ0FBQztRQUNsQyxnQkFBVyxHQUFVLEdBQUcsQ0FBQztRQUN6QixlQUFVLEdBQVcsS0FBSyxDQUFDO1FBQzNCLGVBQVUsR0FBVSxFQUFFLENBQUM7UUFDdkIscUJBQWdCLEdBQVUsRUFBRSxDQUFDO0lBVTdCLENBQUM7SUFFRCxzQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQUVELG1DQUFLLEdBQUwsVUFBTSxJQUFzQjtRQUMxQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVBLDRDQUFjLEdBQWQ7SUFFQSxDQUFDO0lBQ0QseUNBQVcsR0FBWCxVQUFZLFNBQWdCO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMs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a0I7bUVBQUM7SUFaN0QsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFlBQVk7WUFDdEIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztTQUMzQyxDQUFDO3lDQWU2QixzQ0FBaUI7WUFDbkIsa0NBQWU7WUFDZCx5QkFBZ0I7T0FoQmpDLG1CQUFtQixDQThHL0I7SUFBRCwwQkFBQztDQUFBLEFBOUdELElBOEdDO0FBOUdZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcclxuaW1wb3J0IHsgVG9rZW5Nb2RlbCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktYXV0b2NvbXBsZXRlXCI7XHJcbmltcG9ydCB7IFNjcm9sbFZpZXcsIFNjcm9sbEV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3Njcm9sbC12aWV3XCI7XHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuXHJcbmltcG9ydCB7IFVwbG9hZHBvc3RTZXJ2aWNlIH0gZnJvbSBcIi4vdXBsb2FkcG9zdC1zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gXCJ+L3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzXCI7XHJcbmltcG9ydCB7IFJhZEF1dG9Db21wbGV0ZVRleHRWaWV3Q29tcG9uZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1hdXRvY29tcGxldGUvYW5ndWxhclwiO1xyXG5cclxuaW1wb3J0IHsgR29vZ2xlTWFwQ29tcG9uZW50IH0gZnJvbSBcIn4vbW9kdWxlcy9nb29nbGUtbWFwL2dvb2dsZS1tYXAuY29tcG9uZW50XCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHNlbGVjdG9yOiAnVXBsb2FkcG9zdCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3VwbG9hZHBvc3QuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3VwbG9hZHBvc3QuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVXBsb2FkcG9zdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgc2VsZWN0ZWRMb2NhdGlvbjtcclxuICBzZWxlY3RlZExpc3RQaWNrZXJJbmRleDogbnVtYmVyID0gMDtcclxuICBsb2NhdGlvbkNvbGxhcHNlZDpzdHJpbmcgPSBcIltjbG9zZV1cIjtcclxuICBsb2NhdGlvbkhlaWdodDpudW1iZXIgPSAzMDA7IFxyXG4gIGltYWdlQ29sbGFwc2VkOnN0cmluZyA9IFwiW2Nsb3NlXVwiO1xyXG4gIGltYWdlSGVpZ2h0Om51bWJlciA9IDMwMDtcclxuICBpc1VwbG9hZGVkOmJvb2xlYW4gPSBmYWxzZTtcclxuICB0aXRsZVZhbHVlOnN0cmluZyA9IFwiXCI7XHJcbiAgZGVzY3JpcHRpb25WYWx1ZTpzdHJpbmcgPSBcIlwiO1xyXG4gIEBWaWV3Q2hpbGQoXCJzY3JvbGx2aWV3XCIpIHNjcm9sbHZpZXc6IFNjcm9sbFZpZXc7XHJcbiAgQFZpZXdDaGlsZChcInR5cGVzXCIpIHR5cGVzOiBSYWRBdXRvQ29tcGxldGVUZXh0Vmlld0NvbXBvbmVudDtcclxuICBAVmlld0NoaWxkKFwiZ29vZ2xlTWFwQ29tcG9uZW50XCIpIGdvb2dsZU1hcENvbXBvbmVudDogR29vZ2xlTWFwQ29tcG9uZW50O1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB1cGxvYWRwb3N0U2VydmljZTogVXBsb2FkcG9zdFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGZpcmViYXNlU2VydmljZTogRmlyZWJhc2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICkge1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG5cclxuICB9XHJcblxyXG4gIG9uVGFwKGFyZ3M6IEdlc3R1cmVFdmVudERhdGEpIHtcclxuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XHJcblx0fVxyXG5cclxuICBzZWxlY3RMb2NhdGlvbigpIHtcclxuXHJcbiAgfVxyXG4gIHNlbGVjdEltYWdlKGltYWdlVHlwZTpzdHJpbmcpOiB2b2lkIHtcclxuXHRcdGlmICh0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlcikge1xyXG4gICAgICB0aGlzLmlzVXBsb2FkZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLmZpcmViYXNlU2VydmljZS5waWNrSW1hZ2UoaW1hZ2VUeXBlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGRpYWxvZ3MuYWxlcnQoXCJDYW5ub3QgdXBsb2FkIGltYWdlcyBpbiBvZmZsaW5lIG1vZGVcIik7XHJcblx0XHR9XHJcblx0fVxyXG4gIG9uTGFjYXRpb25Ub2dnbGVUYXAoKXtcclxuICAgIGlmKHRoaXMubG9jYXRpb25Db2xsYXBzZWQgPT0gXCJbY2xvc2VdXCIpe1xyXG4gICAgICB0aGlzLmxvY2F0aW9uQ29sbGFwc2VkID0gXCJbb3Blbl1cIjtcclxuICAgICAgdGhpcy5sb2NhdGlvbkhlaWdodCA9IDA7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgdGhpcy5sb2NhdGlvbkNvbGxhcHNlZCA9IFwiW2Nsb3NlXVwiO1xyXG4gICAgICB0aGlzLmxvY2F0aW9uSGVpZ2h0ID0gMzAwO1xyXG4gICAgfSAgICBcclxuICB9XHJcbiAgXHJcbiAgb25JbWFnZVRvZ2dsZVRhcCgpe1xyXG4gICAgaWYodGhpcy5pbWFnZUNvbGxhcHNlZCA9PSBcIltjbG9zZV1cIil7XHJcbiAgICAgIHRoaXMuaW1hZ2VDb2xsYXBzZWQgPSBcIltvcGVuXVwiO1xyXG4gICAgICB0aGlzLmltYWdlSGVpZ2h0ID0gMDtcclxuICAgIH1lbHNle1xyXG4gICAgICB0aGlzLmltYWdlQ29sbGFwc2VkID0gXCJbY2xvc2VdXCI7XHJcbiAgICAgIHRoaXMuaW1hZ2VIZWlnaHQgPSAzMDA7XHJcbiAgICB9XHJcbiAgfVxyXG4gIG9uTWFwU2Nyb2xsKGFyZ3M6IFNjcm9sbEV2ZW50RGF0YSl7XHJcbiAgICB0aGlzLnNjcm9sbHZpZXcuaXNVc2VySW50ZXJhY3Rpb25FbmFibGVkID0gZmFsc2U7XHJcbiAgfVxyXG4gIG9uVXBsb2FkVGFwKCl7XHJcbiAgICBpZighdGhpcy5pc1VwbG9hZGVkKXtcclxuICAgICAgZGlhbG9ncy5hbGVydChcIlBsZWFzZSBTZWxlY3QgYSBpbWFnZSBmb3IgcG9zdC5cIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYodGhpcy50aXRsZVZhbHVlPT09XCJcIil7XHJcbiAgICAgIGRpYWxvZ3MuYWxlcnQoXCJQbGVhc2UgRW50ZXIgYSB0aXRsZSBmb3IgcG9zdC5cIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgdXNlckVubmVhZ3JhbU51bTtcclxuICAgIHZhciB1c2VyRW5uZWFncmFtQmVoYXZpb3I7XHJcbiAgICB2YXIgdXNlckVubmVhZ3JhbUVtb3Rpb247XHJcbiAgICB2YXIgdXNlckVubmVhZ3JhbVRob3VnaHQ7XHJcbiAgICB2YXIgdXNlckVubmVhZ3JhbVN0YXRlO1xyXG4gICAgdmFyIHBvc3Rfcm9sZXMgPSB7fTtcclxuICAgIGZvcih2YXIgdXNlcklEIGluIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyKXtcclxuICAgICAgdXNlckVubmVhZ3JhbU51bSA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyW3VzZXJJRF1bJ2VubmVhZ3JhbSddWydudW1iZXInXTtcclxuICAgICAgdXNlckVubmVhZ3JhbUJlaGF2aW9yID0gdGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXJbdXNlcklEXVsnZW5uZWFncmFtJ11bJ2JlaGF2aW9yJ107XHJcbiAgICAgIHVzZXJFbm5lYWdyYW1FbW90aW9uID0gdGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXJbdXNlcklEXVsnZW5uZWFncmFtJ11bJ2Vtb3Rpb24nXTtcclxuICAgICAgdXNlckVubmVhZ3JhbVRob3VnaHQgPSB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlclt1c2VySURdWydlbm5lYWdyYW0nXVsndGhvdWdodCddO1xyXG4gICAgICB1c2VyRW5uZWFncmFtU3RhdGUgPSB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlclt1c2VySURdWydlbm5lYWdyYW0nXVsnc3RhdGUnXTtcclxuICAgICAgcG9zdF9yb2xlc1t1c2VySURdID0gXCJvd25lclwiO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyKTtcclxuICAgIGNvbnNvbGUubG9nKHVzZXJFbm5lYWdyYW1OdW0pO1xyXG4gICAgdmFyIHVwbG9hZERhdGEgPSB7XHJcbiAgICAgIGJlaGF2aW9yIDogdXNlckVubmVhZ3JhbUJlaGF2aW9yLFxyXG4gICAgICBlbW90aW9uIDogdXNlckVubmVhZ3JhbUVtb3Rpb24sXHJcbiAgICAgIG51bWJlciA6IHVzZXJFbm5lYWdyYW1OdW0sXHJcbiAgICAgIHN0YXRlIDogdXNlckVubmVhZ3JhbVN0YXRlLFxyXG4gICAgICB0aG91Z2h0IDogdXNlckVubmVhZ3JhbVRob3VnaHQsXHJcbiAgICAgIGNsb3NlVGltZSA6IFwiXCIsXHJcbiAgICAgIGRlc2NyaXB0aW9uIDogdGhpcy5kZXNjcmlwdGlvblZhbHVlLFxyXG4gICAgICBpbWFnZSA6IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmN1cnJlbnRCbG9nSW1hZ2VGaWxlVVJMLFxyXG4gICAgICBpc09wZW4gOiB0cnVlLFxyXG4gICAgICBsaWtlcyA6IDAsXHJcbiAgICAgIGxhdGl0dWRlOiB0aGlzLnVwbG9hZHBvc3RTZXJ2aWNlLnBvc3RMb2NhdGlvbi5wb3NpdGlvbi5sYXRpdHVkZSxcclxuICAgICAgbG9uZ2l0dWRlOiB0aGlzLnVwbG9hZHBvc3RTZXJ2aWNlLnBvc3RMb2NhdGlvbi5wb3NpdGlvbi5sb25naXR1ZGUsXHJcbiAgICAgIG5hbWUgOiB0aGlzLnRpdGxlVmFsdWUsXHJcbiAgICAgIG9wZW5UaW1lIDogRGF0ZS5ub3coKSxcclxuICAgICAgcm9sZXMgOiBwb3N0X3JvbGVzLFxyXG4gICAgICB0eXBlIDogdGhpcy51cGxvYWRwb3N0U2VydmljZS5wb3N0VHlwZVxyXG4gICAgfVxyXG4gICAgdGhpcy5maXJlYmFzZVNlcnZpY2UuYWRkUG9zdCh1cGxvYWREYXRhKTtcclxuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy8nXSwgeyBhbmltYXRlZDogZmFsc2UgfSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==