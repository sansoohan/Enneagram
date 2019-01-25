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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9maWxlLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RDtBQUN6RCxzREFBK0Q7QUFDL0QsZ0VBQThEO0FBTzlELG9DQUFzQztBQUl0QyxnQ0FBK0I7QUFRL0I7SUFXQywrQkFDUyxnQkFBa0MsRUFDbEMsZUFBZ0MsRUFDaEMsSUFBVTtRQUZWLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFNBQUksR0FBSixJQUFJLENBQU07UUFibkIsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUNyQixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFZckIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLDZCQUE2QixDQUFDO1FBQ25GLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLDBCQUEwQixDQUFDO0lBRTlFLENBQUM7SUFDRCx3Q0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELDBDQUFVLEdBQVYsVUFBVyxJQUFzQjtRQUNoQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELHdDQUFRLEdBQVIsVUFBUyxJQUFJO1FBQ04sS0FBSSxJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUM7WUFDZixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM1QjtJQUNMLENBQUM7SUFFRiw2Q0FBYSxHQUFiLFVBQWMsU0FBZ0I7UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QixJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzFDO2FBQU07WUFDTixPQUFPLENBQUMsS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7U0FDdEQ7SUFDRixDQUFDO0lBR0QseUNBQVMsR0FBVDtRQUNDLElBQUksbUJBQW1CLEdBQUc7WUFDekIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsNkJBQTZCO1lBQ3BFLGFBQWEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLDBCQUEwQjtTQUM5RCxDQUFBO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUF0RFcscUJBQXFCO1FBTmpDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGNBQWM7WUFDeEIsV0FBVyxFQUFFLGdDQUFnQztZQUM3QyxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztTQUM3QyxDQUFDO3lDQWEwQix5QkFBZ0I7WUFDakIsa0NBQWU7WUFDMUIsV0FBSTtPQWRQLHFCQUFxQixDQXVEakM7SUFBRCw0QkFBQztDQUFBLEFBdkRELElBdURDO0FBdkRZLHNEQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBGaXJlYmFzZVNlcnZpY2UgfSBmcm9tIFwifi9zZXJ2aWNlcy9maXJlYmFzZS5zZXJ2aWNlXCI7XHJcblxyXG5pbXBvcnQgeyBHZXN0dXJlRXZlbnREYXRhIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZ2VzdHVyZXNcIjtcclxuaW1wb3J0IHsgSW1hZ2VTb3VyY2UgfSBmcm9tIFwiaW1hZ2Utc291cmNlXCI7XHJcbmltcG9ydCB7IEltYWdlQXNzZXQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9pbWFnZS1hc3NldFwiO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tIFwicnhqc1wiO1xyXG5pbXBvcnQgKiBhcyBpbWFnZVBpY2tlciBmcm9tIFwibmF0aXZlc2NyaXB0LWltYWdlcGlja2VyXCI7XHJcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuaW1wb3J0IHsgYW5kcm9pZCwgaW9zIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIjtcclxuaW1wb3J0IHsga25vd25Gb2xkZXJzLCBwYXRoIH0gZnJvbSBcImZpbGUtc3lzdGVtXCI7XHJcbmltcG9ydCB7IFJhZGlvT3B0aW9uIH0gZnJvbSBcIn4vbW9kdWxlcy9idXR0b25zL3JhZGlvLW9wdGlvblwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgc2VsZWN0b3I6ICdQcm9maWxlSW5wdXQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9wcm9maWxlLWlucHV0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9wcm9maWxlLWlucHV0LmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUHJvZmlsZUlucHV0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRjb3VudHJ5OiBzdHJpbmcgPSBcIlwiO1xyXG5cdGludGVyZXN0OiBzdHJpbmcgPSBcIlwiO1xyXG5cdGludHJvZHVjaW5nOiBzdHJpbmcgPSBcIlwiO1xyXG5cdGxhbmd1YWdlOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgdGhpc1VzZXJQcm9maWxlUGljc3JjO1xyXG4gICAgdGhpc1VzZXJCYWNrZ3JvdW5kUGljc3JjO1xyXG5cclxuXHRnZW5kZXJPcHRpb25CdXR0b25zPzogQXJyYXk8UmFkaW9PcHRpb24+O1xyXG5cdFxyXG5cclxuXHRjb25zdHJ1Y3RvcihcclxuXHRcdHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuXHRcdHByaXZhdGUgZmlyZWJhc2VTZXJ2aWNlOiBGaXJlYmFzZVNlcnZpY2UsXHJcblx0XHRwcml2YXRlIHBhZ2U6IFBhZ2VcclxuXHQpIHsgXHJcblx0XHR0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcclxuXHRcdHRoaXMudGhpc1VzZXJCYWNrZ3JvdW5kUGljc3JjID0gdGhpcy5maXJlYmFzZVNlcnZpY2UuY3VycmVudEJhY2tncm91bmRJbWFnZUZpbGVVUkw7XHJcblx0XHR0aGlzLnRoaXNVc2VyUHJvZmlsZVBpY3NyYyA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmN1cnJlbnRQcm9maWxlSW1hZ2VGaWxlVVJMO1xyXG5cclxuXHR9XHJcblx0bmdPbkluaXQoKSB7IFxyXG5cdH1cclxuXHJcblx0b25DbG9zZVRhcChhcmdzOiBHZXN0dXJlRXZlbnREYXRhKSB7XHJcblx0XHR0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xyXG5cdH1cclxuXHJcblx0Z2V0Q292ZXIoaXRlbSl7XHJcbiAgICAgICAgZm9yKHZhciBpZCBpbiBpdGVtKXtcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW1baWRdWydpbWFnZSddO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgXHRvbkFkZEltYWdlVGFwKGltYWdlVHlwZTpzdHJpbmcpOiB2b2lkIHtcclxuXHRcdGNvbnNvbGUubG9nKGltYWdlVHlwZSk7XHJcblx0XHRpZiAodGhpcy5maXJlYmFzZVNlcnZpY2UuYXV0aHVzZXIpIHtcclxuXHRcdFx0dGhpcy5maXJlYmFzZVNlcnZpY2UucGlja0ltYWdlKGltYWdlVHlwZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkaWFsb2dzLmFsZXJ0KFwiQ2Fubm90IHVwbG9hZCBpbWFnZXMgaW4gb2ZmbGluZSBtb2RlXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblxyXG5cdG9uU2F2ZVRhcCgpe1xyXG5cdFx0dmFyIHVzZXJQcm9maWxlVG9VcGRhdGUgPSB7XHJcblx0XHRcdGNvdW50cnk6IHRoaXMuY291bnRyeSxcclxuXHRcdFx0aW50ZXJlc3Q6IHRoaXMuaW50ZXJlc3QsXHJcblx0XHRcdGludHJvZHVjaW5nOiB0aGlzLmludHJvZHVjaW5nLFxyXG5cdFx0XHRsYW5ndWFnZTogdGhpcy5sYW5ndWFnZSxcclxuXHRcdFx0YmFja2dyb3VuZFBpY3NyYzogdGhpcy5maXJlYmFzZVNlcnZpY2UuY3VycmVudEJhY2tncm91bmRJbWFnZUZpbGVVUkwsXHJcblx0XHRcdHByb2ZpbGVQaWNzcmM6IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmN1cnJlbnRQcm9maWxlSW1hZ2VGaWxlVVJMXHJcblx0XHR9XHJcblx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5zZXRUaGlzVXNlclByb2ZpbGUodXNlclByb2ZpbGVUb1VwZGF0ZSk7XHJcblx0fVxyXG59XHJcbiJdfQ==