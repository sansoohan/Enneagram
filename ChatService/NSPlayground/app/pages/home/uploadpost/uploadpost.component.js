"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var scroll_view_1 = require("tns-core-modules/ui/scroll-view");
var dialogs = require("ui/dialogs");
var firebase = require("nativescript-plugin-firebase");
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
    UploadpostComponent.prototype.loadPost = function () {
        this.loadedData = this.firebaseService.getPost();
        this.loadedData = JSON.parse(JSON.stringify(this.loadedData));
        this.userEnneagramBehavior = this.loadedData['behavior'];
        this.userEnneagramEmotion = this.loadedData['emotion'];
        this.userEnneagramNum = this.loadedData['number'];
        this.userEnneagramState = this.loadedData['state'];
        this.userEnneagramThought = this.loadedData['thought'];
        this.descriptionValue = this.loadedData['description'];
        this.firebaseService.currentBlogImageFileURL = this.loadedData['image'];
        this.isOpened = this.loadedData['isOpen'];
        this.titleValue = this.loadedData['name'];
        // firebase.firestore.FieldValue.serverTimestamp() = this.loadedData['openTime'];
        // "" = this.loadedData['closeTime'];
        this.postRoles = this.loadedData['roles'];
        this.uploadpostService.postLocation.position.latitude = this.loadedData['latitude'];
        this.uploadpostService.postLocation.position.longitude = this.loadedData['longitude'];
        this.uploadpostService.postType = this.loadedData['type'];
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
        // Default Data for the First Posting.
        if (this.loadedData == null) {
            this.postRoles = {};
            for (var userID in this.firebaseService.thisUser) {
                this.userEnneagramNum = this.firebaseService.thisUser[userID]['enneagram']['number'];
                this.userEnneagramBehavior = this.firebaseService.thisUser[userID]['enneagram']['behavior'];
                this.userEnneagramEmotion = this.firebaseService.thisUser[userID]['enneagram']['emotion'];
                this.userEnneagramThought = this.firebaseService.thisUser[userID]['enneagram']['thought'];
                this.userEnneagramState = this.firebaseService.thisUser[userID]['enneagram']['state'];
                this.postRoles[userID] = "owner";
            }
            this.openTime = firebase.firestore.FieldValue.serverTimestamp();
            this.isOpened = true;
        }
        else {
            // Use loaded Data.
        }
        console.log(this.firebaseService.thisUser);
        console.log(this.userEnneagramNum);
        var uploadData = {
            behavior: this.userEnneagramBehavior,
            emotion: this.userEnneagramEmotion,
            number: this.userEnneagramNum,
            state: this.userEnneagramState,
            thought: this.userEnneagramThought,
            description: this.descriptionValue,
            image: this.firebaseService.currentBlogImageFileURL,
            isOpened: this.isOpened,
            name: this.titleValue,
            openTime: this.openTime,
            closeTime: this.closeTime,
            roles: this.postRoles,
            latitude: this.uploadpostService.postLocation.position.latitude,
            longitude: this.uploadpostService.postLocation.position.longitude,
            type: this.uploadpostService.postType
        };
        this.firebaseService.addPost(uploadData);
        this.routerExtensions.navigate(['/'], { animated: false });
    };
    UploadpostComponent.prototype.setCloseTime = function () {
        this.closeTime = firebase.firestore.FieldValue.serverTimestamp();
    };
    UploadpostComponent.prototype.toggleOpened = function () {
        this.isOpened = !this.isOpened;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkcG9zdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1cGxvYWRwb3N0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF3RTtBQUd4RSwrREFBOEU7QUFDOUUsb0NBQXNDO0FBQ3RDLHVEQUEwRDtBQUUxRCwyREFBeUQ7QUFDekQsZ0VBQThEO0FBQzlELHNEQUErRDtBQUUvRCxnRUFBd0Y7QUFFeEYsa0ZBQStFO0FBUS9FO0lBMEJFLDZCQUNVLGlCQUFvQyxFQUNwQyxlQUFnQyxFQUNoQyxnQkFBa0M7UUFGbEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQTNCNUMsNEJBQXVCLEdBQVcsQ0FBQyxDQUFDO1FBQ3BDLHNCQUFpQixHQUFVLFNBQVMsQ0FBQztRQUNyQyxtQkFBYyxHQUFVLEdBQUcsQ0FBQztRQUM1QixtQkFBYyxHQUFVLFNBQVMsQ0FBQztRQUNsQyxnQkFBVyxHQUFVLEdBQUcsQ0FBQztRQUN6QixlQUFVLEdBQVcsS0FBSyxDQUFDO1FBQzNCLGVBQVUsR0FBVSxFQUFFLENBQUM7UUFLdkIscUJBQWdCLEdBQVUsRUFBRSxDQUFDO0lBbUI3QixDQUFDO0lBRUQsc0NBQVEsR0FBUjtJQUVBLENBQUM7SUFFRCxtQ0FBSyxHQUFMLFVBQU0sSUFBc0I7UUFDMUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFQSw0Q0FBYyxHQUFkO0lBRUEsQ0FBQztJQUNELHlDQUFXLEdBQVgsVUFBWSxTQUFnQjtRQUM1QixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFO1lBQy9CLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFD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QUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUNELDBDQUFZLEdBQVo7UUFDRSxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ25FLENBQUM7SUFDRCwwQ0FBWSxHQUFaO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDakMsQ0FBQztJQXZJd0I7UUFBeEIsZ0JBQVMsQ0FBQyxZQUFZLENBQUM7a0NBQWEsd0JBQVU7MkRBQUM7SUFDNUI7UUFBbkIsZ0JBQVMsQ0FBQyxPQUFPLENBQUM7a0NBQVEsMENBQWdDO3NEQUFDO0lBQzNCO1FBQWhDLGdCQUFTLENBQUMsb0JBQW9CLENBQUM7a0NBQXFCLHlDQUFrQjttRUFBQztJQWhCN0QsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLFlBQVk7WUFDdEIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztTQUMzQyxDQUFDO3lDQTRCNkIsc0NBQWlCO1lBQ25CLGtDQUFlO1lBQ2QseUJBQWdCO09BN0JqQyxtQkFBbUIsQ0FzSi9CO0lBQUQsMEJBQUM7Q0FBQSxBQXRKRCxJQXNKQztBQXRKWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCxWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbmltcG9ydCB7IFRva2VuTW9kZWwgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWF1dG9jb21wbGV0ZVwiO1xyXG5pbXBvcnQgeyBTY3JvbGxWaWV3LCBTY3JvbGxFdmVudERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9zY3JvbGwtdmlld1wiO1xyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xyXG5cclxuaW1wb3J0IHsgVXBsb2FkcG9zdFNlcnZpY2UgfSBmcm9tIFwiLi91cGxvYWRwb3N0LXNlcnZpY2VcIjtcclxuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSBcIn4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXNcIjtcclxuaW1wb3J0IHsgUmFkQXV0b0NvbXBsZXRlVGV4dFZpZXdDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWF1dG9jb21wbGV0ZS9hbmd1bGFyXCI7XHJcblxyXG5pbXBvcnQgeyBHb29nbGVNYXBDb21wb25lbnQgfSBmcm9tIFwifi9tb2R1bGVzL2dvb2dsZS1tYXAvZ29vZ2xlLW1hcC5jb21wb25lbnRcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgc2VsZWN0b3I6ICdVcGxvYWRwb3N0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdXBsb2FkcG9zdC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vdXBsb2FkcG9zdC5jb21wb25lbnQuc2NzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBVcGxvYWRwb3N0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICBzZWxlY3RlZExvY2F0aW9uO1xyXG4gIHNlbGVjdGVkTGlzdFBpY2tlckluZGV4OiBudW1iZXIgPSAwO1xyXG4gIGxvY2F0aW9uQ29sbGFwc2VkOnN0cmluZyA9IFwiW2Nsb3NlXVwiO1xyXG4gIGxvY2F0aW9uSGVpZ2h0Om51bWJlciA9IDMwMDsgXHJcbiAgaW1hZ2VDb2xsYXBzZWQ6c3RyaW5nID0gXCJbY2xvc2VdXCI7XHJcbiAgaW1hZ2VIZWlnaHQ6bnVtYmVyID0gMzAwO1xyXG4gIGlzVXBsb2FkZWQ6Ym9vbGVhbiA9IGZhbHNlO1xyXG4gIHRpdGxlVmFsdWU6c3RyaW5nID0gXCJcIjtcclxuICBpc09wZW5lZDpib29sZWFuO1xyXG4gIG9wZW5UaW1lOmFueTtcclxuICBjbG9zZVRpbWU6YW55O1xyXG4gIHBvc3RSb2xlczphbnk7XHJcbiAgZGVzY3JpcHRpb25WYWx1ZTpzdHJpbmcgPSBcIlwiO1xyXG4gIEBWaWV3Q2hpbGQoXCJzY3JvbGx2aWV3XCIpIHNjcm9sbHZpZXc6IFNjcm9sbFZpZXc7XHJcbiAgQFZpZXdDaGlsZChcInR5cGVzXCIpIHR5cGVzOiBSYWRBdXRvQ29tcGxldGVUZXh0Vmlld0NvbXBvbmVudDtcclxuICBAVmlld0NoaWxkKFwiZ29vZ2xlTWFwQ29tcG9uZW50XCIpIGdvb2dsZU1hcENvbXBvbmVudDogR29vZ2xlTWFwQ29tcG9uZW50O1xyXG5cclxuXHJcbiAgcHJpdmF0ZSB1c2VyRW5uZWFncmFtTnVtO1xyXG4gIHByaXZhdGUgdXNlckVubmVhZ3JhbUJlaGF2aW9yO1xyXG4gIHByaXZhdGUgdXNlckVubmVhZ3JhbUVtb3Rpb247XHJcbiAgcHJpdmF0ZSB1c2VyRW5uZWFncmFtVGhvdWdodDtcclxuICBwcml2YXRlIHVzZXJFbm5lYWdyYW1TdGF0ZTtcclxuXHJcbiAgbG9hZGVkRGF0YTogYW55O1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSB1cGxvYWRwb3N0U2VydmljZTogVXBsb2FkcG9zdFNlcnZpY2UsXHJcbiAgICBwcml2YXRlIGZpcmViYXNlU2VydmljZTogRmlyZWJhc2VTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG4gICkge1xyXG5cclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG5cclxuICB9XHJcblxyXG4gIG9uVGFwKGFyZ3M6IEdlc3R1cmVFdmVudERhdGEpIHtcclxuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XHJcblx0fVxyXG5cclxuICBzZWxlY3RMb2NhdGlvbigpIHtcclxuXHJcbiAgfVxyXG4gIHNlbGVjdEltYWdlKGltYWdlVHlwZTpzdHJpbmcpOiB2b2lkIHtcclxuXHRcdGlmICh0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlcikge1xyXG4gICAgICB0aGlzLmlzVXBsb2FkZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLmZpcmViYXNlU2VydmljZS5waWNrSW1hZ2UoaW1hZ2VUeXBlKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGRpYWxvZ3MuYWxlcnQoXCJDYW5ub3QgdXBsb2FkIGltYWdlcyBpbiBvZmZsaW5lIG1vZGVcIik7XHJcblx0XHR9XHJcblx0fVxyXG4gIG9uTGFjYXRpb25Ub2dnbGVUYXAoKXtcclxuICAgIGlmKHRoaXMubG9jYXRpb25Db2xsYXBzZWQgPT0gXCJbY2xvc2VdXCIpe1xyXG4gICAgICB0aGlzLmxvY2F0aW9uQ29sbGFwc2VkID0gXCJbb3Blbl1cIjtcclxuICAgICAgdGhpcy5sb2NhdGlvbkhlaWdodCA9IDA7XHJcbiAgICB9ZWxzZXtcclxuICAgICAgdGhpcy5sb2NhdGlvbkNvbGxhcHNlZCA9IFwiW2Nsb3NlXVwiO1xyXG4gICAgICB0aGlzLmxvY2F0aW9uSGVpZ2h0ID0gMzAwO1xyXG4gICAgfSAgICBcclxuICB9XHJcbiAgXHJcbiAgb25JbWFnZVRvZ2dsZVRhcCgpe1xyXG4gICAgaWYodGhpcy5pbWFnZUNvbGxhcHNlZCA9PSBcIltjbG9zZV1cIil7XHJcbiAgICAgIHRoaXMuaW1hZ2VDb2xsYXBzZWQgPSBcIltvcGVuXVwiO1xyXG4gICAgICB0aGlzLmltYWdlSGVpZ2h0ID0gMDtcclxuICAgIH1lbHNle1xyXG4gICAgICB0aGlzLmltYWdlQ29sbGFwc2VkID0gXCJbY2xvc2VdXCI7XHJcbiAgICAgIHRoaXMuaW1hZ2VIZWlnaHQgPSAzMDA7XHJcbiAgICB9XHJcbiAgfVxyXG4gIG9uTWFwU2Nyb2xsKGFyZ3M6IFNjcm9sbEV2ZW50RGF0YSl7XHJcbiAgICB0aGlzLnNjcm9sbHZpZXcuaXNVc2VySW50ZXJhY3Rpb25FbmFibGVkID0gZmFsc2U7XHJcbiAgfVxyXG4gIGxvYWRQb3N0KCl7XHJcbiAgICB0aGlzLmxvYWRlZERhdGEgPSB0aGlzLmZpcmViYXNlU2VydmljZS5nZXRQb3N0KCk7XHJcbiAgICB0aGlzLmxvYWRlZERhdGEgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMubG9hZGVkRGF0YSkpO1xyXG4gICAgdGhpcy51c2VyRW5uZWFncmFtQmVoYXZpb3IgPSB0aGlzLmxvYWRlZERhdGFbJ2JlaGF2aW9yJ107XHJcbiAgICB0aGlzLnVzZXJFbm5lYWdyYW1FbW90aW9uID0gdGhpcy5sb2FkZWREYXRhWydlbW90aW9uJ107XHJcbiAgICB0aGlzLnVzZXJFbm5lYWdyYW1OdW0gPSB0aGlzLmxvYWRlZERhdGFbJ251bWJlciddO1xyXG4gICAgdGhpcy51c2VyRW5uZWFncmFtU3RhdGUgPSB0aGlzLmxvYWRlZERhdGFbJ3N0YXRlJ107XHJcbiAgICB0aGlzLnVzZXJFbm5lYWdyYW1UaG91Z2h0ID0gdGhpcy5sb2FkZWREYXRhWyd0aG91Z2h0J107XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uVmFsdWUgPSB0aGlzLmxvYWRlZERhdGFbJ2Rlc2NyaXB0aW9uJ107XHJcbiAgICB0aGlzLmZpcmViYXNlU2VydmljZS5jdXJyZW50QmxvZ0ltYWdlRmlsZVVSTCA9IHRoaXMubG9hZGVkRGF0YVsnaW1hZ2UnXTtcclxuICAgIHRoaXMuaXNPcGVuZWQgPSB0aGlzLmxvYWRlZERhdGFbJ2lzT3BlbiddO1xyXG4gICAgdGhpcy50aXRsZVZhbHVlID0gdGhpcy5sb2FkZWREYXRhWyduYW1lJ107XHJcbiAgICAvLyBmaXJlYmFzZS5maXJlc3RvcmUuRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKSA9IHRoaXMubG9hZGVkRGF0YVsnb3BlblRpbWUnXTtcclxuICAgIC8vIFwiXCIgPSB0aGlzLmxvYWRlZERhdGFbJ2Nsb3NlVGltZSddO1xyXG4gICAgdGhpcy5wb3N0Um9sZXMgPSB0aGlzLmxvYWRlZERhdGFbJ3JvbGVzJ107XHJcbiAgICB0aGlzLnVwbG9hZHBvc3RTZXJ2aWNlLnBvc3RMb2NhdGlvbi5wb3NpdGlvbi5sYXRpdHVkZSA9IHRoaXMubG9hZGVkRGF0YVsnbGF0aXR1ZGUnXTtcclxuICAgIHRoaXMudXBsb2FkcG9zdFNlcnZpY2UucG9zdExvY2F0aW9uLnBvc2l0aW9uLmxvbmdpdHVkZSA9IHRoaXMubG9hZGVkRGF0YVsnbG9uZ2l0dWRlJ107XHJcbiAgICB0aGlzLnVwbG9hZHBvc3RTZXJ2aWNlLnBvc3RUeXBlID0gdGhpcy5sb2FkZWREYXRhWyd0eXBlJ107XHJcbiAgfVxyXG4gIG9uVXBsb2FkVGFwKCl7XHJcbiAgICBpZighdGhpcy5pc1VwbG9hZGVkKXtcclxuICAgICAgZGlhbG9ncy5hbGVydChcIlBsZWFzZSBTZWxlY3QgYSBpbWFnZSBmb3IgcG9zdC5cIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYodGhpcy50aXRsZVZhbHVlPT09XCJcIil7XHJcbiAgICAgIGRpYWxvZ3MuYWxlcnQoXCJQbGVhc2UgRW50ZXIgYSB0aXRsZSBmb3IgcG9zdC5cIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBEZWZhdWx0IERhdGEgZm9yIHRoZSBGaXJzdCBQb3N0aW5nLlxyXG4gICAgaWYodGhpcy5sb2FkZWREYXRhID09IG51bGwpe1xyXG4gICAgICB0aGlzLnBvc3RSb2xlcyA9IHt9O1xyXG4gICAgICBmb3IodmFyIHVzZXJJRCBpbiB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlcil7XHJcbiAgICAgICAgdGhpcy51c2VyRW5uZWFncmFtTnVtID0gdGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXJbdXNlcklEXVsnZW5uZWFncmFtJ11bJ251bWJlciddO1xyXG4gICAgICAgIHRoaXMudXNlckVubmVhZ3JhbUJlaGF2aW9yID0gdGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXJbdXNlcklEXVsnZW5uZWFncmFtJ11bJ2JlaGF2aW9yJ107XHJcbiAgICAgICAgdGhpcy51c2VyRW5uZWFncmFtRW1vdGlvbiA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyW3VzZXJJRF1bJ2VubmVhZ3JhbSddWydlbW90aW9uJ107XHJcbiAgICAgICAgdGhpcy51c2VyRW5uZWFncmFtVGhvdWdodCA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyW3VzZXJJRF1bJ2VubmVhZ3JhbSddWyd0aG91Z2h0J107XHJcbiAgICAgICAgdGhpcy51c2VyRW5uZWFncmFtU3RhdGUgPSB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlclt1c2VySURdWydlbm5lYWdyYW0nXVsnc3RhdGUnXTtcclxuICAgICAgICB0aGlzLnBvc3RSb2xlc1t1c2VySURdID0gXCJvd25lclwiO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMub3BlblRpbWUgPSBmaXJlYmFzZS5maXJlc3RvcmUuRmllbGRWYWx1ZS5zZXJ2ZXJUaW1lc3RhbXAoKTtcclxuICAgICAgdGhpcy5pc09wZW5lZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAvLyBVc2UgbG9hZGVkIERhdGEuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2codGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXIpO1xyXG4gICAgY29uc29sZS5sb2codGhpcy51c2VyRW5uZWFncmFtTnVtKTtcclxuICAgIHZhciB1cGxvYWREYXRhID0ge1xyXG4gICAgICBiZWhhdmlvciA6IHRoaXMudXNlckVubmVhZ3JhbUJlaGF2aW9yLFxyXG4gICAgICBlbW90aW9uIDogdGhpcy51c2VyRW5uZWFncmFtRW1vdGlvbixcclxuICAgICAgbnVtYmVyIDogdGhpcy51c2VyRW5uZWFncmFtTnVtLFxyXG4gICAgICBzdGF0ZSA6IHRoaXMudXNlckVubmVhZ3JhbVN0YXRlLFxyXG4gICAgICB0aG91Z2h0IDogdGhpcy51c2VyRW5uZWFncmFtVGhvdWdodCxcclxuICAgICAgZGVzY3JpcHRpb24gOiB0aGlzLmRlc2NyaXB0aW9uVmFsdWUsXHJcbiAgICAgIGltYWdlIDogdGhpcy5maXJlYmFzZVNlcnZpY2UuY3VycmVudEJsb2dJbWFnZUZpbGVVUkwsXHJcbiAgICAgIGlzT3BlbmVkIDogdGhpcy5pc09wZW5lZCxcclxuICAgICAgbmFtZSA6IHRoaXMudGl0bGVWYWx1ZSxcclxuICAgICAgb3BlblRpbWUgOiB0aGlzLm9wZW5UaW1lLFxyXG4gICAgICBjbG9zZVRpbWUgOiB0aGlzLmNsb3NlVGltZSxcclxuICAgICAgcm9sZXMgOiB0aGlzLnBvc3RSb2xlcyxcclxuICAgICAgbGF0aXR1ZGU6IHRoaXMudXBsb2FkcG9zdFNlcnZpY2UucG9zdExvY2F0aW9uLnBvc2l0aW9uLmxhdGl0dWRlLFxyXG4gICAgICBsb25naXR1ZGU6IHRoaXMudXBsb2FkcG9zdFNlcnZpY2UucG9zdExvY2F0aW9uLnBvc2l0aW9uLmxvbmdpdHVkZSxcclxuICAgICAgdHlwZSA6IHRoaXMudXBsb2FkcG9zdFNlcnZpY2UucG9zdFR5cGVcclxuICAgIH1cclxuICAgIHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmFkZFBvc3QodXBsb2FkRGF0YSk7XHJcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvJ10sIHsgYW5pbWF0ZWQ6IGZhbHNlIH0pO1xyXG4gIH1cclxuICBzZXRDbG9zZVRpbWUoKSB7XHJcbiAgICB0aGlzLmNsb3NlVGltZSA9IGZpcmViYXNlLmZpcmVzdG9yZS5GaWVsZFZhbHVlLnNlcnZlclRpbWVzdGFtcCgpO1xyXG4gIH1cclxuICB0b2dnbGVPcGVuZWQoKXtcclxuICAgIHRoaXMuaXNPcGVuZWQgPSAhdGhpcy5pc09wZW5lZDtcclxuICB9XHJcbn1cclxuIl19