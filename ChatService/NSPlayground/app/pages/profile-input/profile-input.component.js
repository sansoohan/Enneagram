"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var firebase_service_1 = require("~/services/firebase.service");
var dialogs = require("ui/dialogs");
var page_1 = require("ui/page");
var ProfileInputComponent = /** @class */ (function () {
    function ProfileInputComponent(routerExtensions, firebaseService, page) {
        this.routerExtensions = routerExtensions;
        this.firebaseService = firebaseService;
        this.page = page;
        this.country = "";
        this.interest = "";
        this.introducing = "";
        this.language = "";
        this.page.actionBarHidden = true;
        this.thisUserBackgroundPicsrc = this.firebaseService.currentBackgroundImageFileURL;
        this.thisUserProfilePicsrc = this.firebaseService.currentProfileImageFileURL;
    }
    ProfileInputComponent.prototype.ngOnInit = function () {
    };
    ProfileInputComponent.prototype.onCloseTap = function (args) {
        this.routerExtensions.back();
    };
    ProfileInputComponent.prototype.getCover = function (item) {
        for (var id in item) {
            return item[id]['image'];
        }
    };
    ProfileInputComponent.prototype.onAddImageTap = function (imageType) {
        console.log(imageType);
        if (this.firebaseService.authuser) {
            this.firebaseService.pickImage(imageType);
        }
        else {
            dialogs.alert("Cannot upload images in offline mode");
        }
    };
    ProfileInputComponent.prototype.onSaveTap = function () {
        var userProfileToUpdate = {
            country: this.country,
            interest: this.interest,
            introducing: this.introducing,
            language: this.language,
            backgroundPicsrc: this.firebaseService.currentBackgroundImageFileURL,
            profilePicsrc: this.firebaseService.currentProfileImageFileURL
        };
        this.firebaseService.setThisUserProfile(userProfileToUpdate);
    };
    ProfileInputComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ProfileInput',
            templateUrl: './profile-input.component.html',
            styleUrls: ['./profile-input.component.css']
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            firebase_service_1.FirebaseService,
            page_1.Page])
    ], ProfileInputComponent);
    return ProfileInputComponent;
}());
exports.ProfileInputComponent = ProfileInputComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9maWxlLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RDtBQUN6RCxzREFBK0Q7QUFDL0QsZ0VBQThEO0FBTzlELG9DQUFzQztBQUl0QyxnQ0FBK0I7QUFRL0I7SUFXQywrQkFDUyxnQkFBa0MsRUFDbEMsZUFBZ0MsRUFDaEMsSUFBVTtRQUZWLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFNBQUksR0FBSixJQUFJLENBQU07UUFibkIsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUNyQixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFZckIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLDZCQUE2QixDQUFDO1FBQ25GLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLDBCQUEwQixDQUFDO0lBRTlFLENBQUM7SUFDRCx3Q0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELDBDQUFVLEdBQVYsVUFBVyxJQUFzQjtRQUNoQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELHdDQUFRLEdBQVIsVUFBUyxJQUFJO1FBQ04sR0FBRyxDQUFBLENBQUMsSUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLENBQUEsQ0FBQztZQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdCLENBQUM7SUFDTCxDQUFDO0lBRUYsNkNBQWEsR0FBYixVQUFjLFNBQWdCO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNQLE9BQU8sQ0FBQyxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztRQUN2RCxDQUFDO0lBQ0YsQ0FBQztJQUdELHlDQUFTLEdBQVQ7UUFDQyxJQUFJLG1CQUFtQixHQUFHO1lBQ3pCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQzdCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLDZCQUE2QjtZQUNwRSxhQUFhLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQywwQkFBMEI7U0FDOUQsQ0FBQTtRQUNELElBQUksQ0FBQyxlQUFlLENBQUMsa0JBQWtCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBdERXLHFCQUFxQjtRQU5qQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFdBQVcsRUFBRSxnQ0FBZ0M7WUFDN0MsU0FBUyxFQUFFLENBQUMsK0JBQStCLENBQUM7U0FDN0MsQ0FBQzt5Q0FhMEIseUJBQWdCO1lBQ2pCLGtDQUFlO1lBQzFCLFdBQUk7T0FkUCxxQkFBcUIsQ0F1RGpDO0lBQUQsNEJBQUM7Q0FBQSxBQXZERCxJQXVEQztBQXZEWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCxOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSBcIn4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHsgR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzXCI7XHJcbmltcG9ydCB7IEltYWdlU291cmNlIH0gZnJvbSBcImltYWdlLXNvdXJjZVwiO1xyXG5pbXBvcnQgeyBJbWFnZUFzc2V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2UtYXNzZXRcIjtcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSBcInJ4anNcIjtcclxuaW1wb3J0ICogYXMgaW1hZ2VQaWNrZXIgZnJvbSBcIm5hdGl2ZXNjcmlwdC1pbWFnZXBpY2tlclwiO1xyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IGFuZHJvaWQsIGlvcyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCB7IGtub3duRm9sZGVycywgcGF0aCB9IGZyb20gXCJmaWxlLXN5c3RlbVwiO1xyXG5pbXBvcnQgeyBSYWRpb09wdGlvbiB9IGZyb20gXCJ+L21vZHVsZXMvYnV0dG9ucy9yYWRpby1vcHRpb25cIjtcclxuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHNlbGVjdG9yOiAnUHJvZmlsZUlucHV0JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vcHJvZmlsZS1pbnB1dC5jb21wb25lbnQuaHRtbCcsXHJcbiAgc3R5bGVVcmxzOiBbJy4vcHJvZmlsZS1pbnB1dC5jb21wb25lbnQuY3NzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFByb2ZpbGVJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblx0Y291bnRyeTogc3RyaW5nID0gXCJcIjtcclxuXHRpbnRlcmVzdDogc3RyaW5nID0gXCJcIjtcclxuXHRpbnRyb2R1Y2luZzogc3RyaW5nID0gXCJcIjtcclxuXHRsYW5ndWFnZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHRoaXNVc2VyUHJvZmlsZVBpY3NyYztcclxuICAgIHRoaXNVc2VyQmFja2dyb3VuZFBpY3NyYztcclxuXHJcblx0Z2VuZGVyT3B0aW9uQnV0dG9ucz86IEFycmF5PFJhZGlvT3B0aW9uPjtcclxuXHRcclxuXHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcblx0XHRwcml2YXRlIGZpcmViYXNlU2VydmljZTogRmlyZWJhc2VTZXJ2aWNlLFxyXG5cdFx0cHJpdmF0ZSBwYWdlOiBQYWdlXHJcblx0KSB7IFxyXG5cdFx0dGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XHJcblx0XHR0aGlzLnRoaXNVc2VyQmFja2dyb3VuZFBpY3NyYyA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlVVJMO1xyXG5cdFx0dGhpcy50aGlzVXNlclByb2ZpbGVQaWNzcmMgPSB0aGlzLmZpcmViYXNlU2VydmljZS5jdXJyZW50UHJvZmlsZUltYWdlRmlsZVVSTDtcclxuXHJcblx0fVxyXG5cdG5nT25Jbml0KCkgeyBcclxuXHR9XHJcblxyXG5cdG9uQ2xvc2VUYXAoYXJnczogR2VzdHVyZUV2ZW50RGF0YSkge1xyXG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuXHR9XHJcblxyXG5cdGdldENvdmVyKGl0ZW0pe1xyXG4gICAgICAgIGZvcih2YXIgaWQgaW4gaXRlbSl7XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtW2lkXVsnaW1hZ2UnXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gIFx0b25BZGRJbWFnZVRhcChpbWFnZVR5cGU6c3RyaW5nKTogdm9pZCB7XHJcblx0XHRjb25zb2xlLmxvZyhpbWFnZVR5cGUpO1xyXG5cdFx0aWYgKHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmF1dGh1c2VyKSB7XHJcblx0XHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnBpY2tJbWFnZShpbWFnZVR5cGUpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZGlhbG9ncy5hbGVydChcIkNhbm5vdCB1cGxvYWQgaW1hZ2VzIGluIG9mZmxpbmUgbW9kZVwiKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cclxuXHRvblNhdmVUYXAoKXtcclxuXHRcdHZhciB1c2VyUHJvZmlsZVRvVXBkYXRlID0ge1xyXG5cdFx0XHRjb3VudHJ5OiB0aGlzLmNvdW50cnksXHJcblx0XHRcdGludGVyZXN0OiB0aGlzLmludGVyZXN0LFxyXG5cdFx0XHRpbnRyb2R1Y2luZzogdGhpcy5pbnRyb2R1Y2luZyxcclxuXHRcdFx0bGFuZ3VhZ2U6IHRoaXMubGFuZ3VhZ2UsXHJcblx0XHRcdGJhY2tncm91bmRQaWNzcmM6IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlVVJMLFxyXG5cdFx0XHRwcm9maWxlUGljc3JjOiB0aGlzLmZpcmViYXNlU2VydmljZS5jdXJyZW50UHJvZmlsZUltYWdlRmlsZVVSTFxyXG5cdFx0fVxyXG5cdFx0dGhpcy5maXJlYmFzZVNlcnZpY2Uuc2V0VGhpc1VzZXJQcm9maWxlKHVzZXJQcm9maWxlVG9VcGRhdGUpO1xyXG5cdH1cclxufVxyXG4iXX0=