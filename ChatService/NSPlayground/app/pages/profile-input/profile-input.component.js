"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var firebase_service_1 = require("~/services/firebase.service");
var dialogs = require("ui/dialogs");
var radio_option_1 = require("~/modules/buttons/radio-option");
var ProfileInputComponent = /** @class */ (function () {
    function ProfileInputComponent(routerExtensions, firebaseService) {
        this.routerExtensions = routerExtensions;
        this.firebaseService = firebaseService;
        this.email = "";
        this.name = "";
        this.gender = "";
        this.country = "";
        this.interest = "";
        this.introducing = "";
        this.language = "";
        this.isUpdating = false;
        this.isAddingNew = false;
    }
    ProfileInputComponent.prototype.ngOnInit = function () {
        this.genderOptionButtons = [
            new radio_option_1.RadioOption("Gender", "male"),
            new radio_option_1.RadioOption("Gender", "female"),
        ];
        this.email = this.firebaseService.thisUser[this.firebaseService.authuser.uid]['profile']['email'];
        this.name = this.firebaseService.thisUser[this.firebaseService.authuser.uid]['profile']['name'];
    };
    ProfileInputComponent.prototype.onTap = function (args) {
        this.routerExtensions.back();
    };
    ProfileInputComponent.prototype.onAddImageTap = function (imageType) {
        if (this.firebaseService.authuser) {
            this.firebaseService.pickImage(imageType);
        }
        else {
            dialogs.alert("Cannot upload images in offline mode");
        }
    };
    ProfileInputComponent.prototype.changeCheckedRadio = function (radioOption) {
        radioOption.selected = !radioOption.selected;
        if (!radioOption.selected) {
            return;
        }
        switch (radioOption.group) {
            case "Gender":
                this.gender = radioOption.text;
                this.genderOptionButtons.forEach(function (option) {
                    if (option.text !== radioOption.text) {
                        option.selected = false;
                    }
                });
                break;
        }
    };
    ProfileInputComponent.prototype.onSaveTap = function () {
        var userProfileToUpdate = {
            backgroundPicsrc: this.firebaseService.currentBackgroundImageFileURL,
            country: this.country,
            email: this.email,
            gender: this.gender,
            interest: this.interest,
            introducing: this.introducing,
            language: this.language,
            name: this.name,
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
            firebase_service_1.FirebaseService])
    ], ProfileInputComponent);
    return ProfileInputComponent;
}());
exports.ProfileInputComponent = ProfileInputComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9maWxlLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RDtBQUN6RCxzREFBK0Q7QUFDL0QsZ0VBQThEO0FBTzlELG9DQUFzQztBQUd0QywrREFBNkQ7QUFRN0Q7SUFrQkMsK0JBQW9CLGdCQUFrQyxFQUM3QyxlQUFnQztRQURyQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQzdDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQWxCekMsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUNuQixTQUFJLEdBQVUsRUFBRSxDQUFBO1FBQ2hCLFdBQU0sR0FBVyxFQUFFLENBQUM7UUFDcEIsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUNyQixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFJZCxlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGdCQUFXLEdBQVksS0FBSyxDQUFDO0lBV3JDLENBQUM7SUFDRCx3Q0FBUSxHQUFSO1FBQ0MsSUFBSSxDQUFDLG1CQUFtQixHQUFHO1lBQzFCLElBQUksMEJBQVcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO1lBQ2pDLElBQUksMEJBQVcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO1NBQ25DLENBQUM7UUFDRixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakcsQ0FBQztJQUVELHFDQUFLLEdBQUwsVUFBTSxJQUFzQjtRQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVDLDZDQUFhLEdBQWIsVUFBYyxTQUFnQjtRQUMvQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsT0FBTyxDQUFDLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7SUFDRixDQUFDO0lBRUQsa0RBQWtCLEdBQWxCLFVBQW1CLFdBQXdCO1FBQzFDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO1FBRTdDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDO1FBQ1IsQ0FBQztRQUdELE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzNCLEtBQUssUUFBUTtnQkFDWixJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNO29CQUN0QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUN0QyxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztvQkFDekIsQ0FBQztnQkFDRixDQUFDLENBQUMsQ0FBQztnQkFDSCxLQUFLLENBQUM7UUFDUixDQUFDO0lBQ0YsQ0FBQztJQUVELHlDQUFTLEdBQVQ7UUFDQyxJQUFJLG1CQUFtQixHQUFHO1lBQ3pCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsNkJBQTZCO1lBQ3BFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLGFBQWEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLDBCQUEwQjtTQUM5RCxDQUFBO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUE5RVcscUJBQXFCO1FBTmpDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGNBQWM7WUFDeEIsV0FBVyxFQUFFLGdDQUFnQztZQUM3QyxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztTQUM3QyxDQUFDO3lDQW1CcUMseUJBQWdCO1lBQzVCLGtDQUFlO09BbkI3QixxQkFBcUIsQ0ErRWpDO0lBQUQsNEJBQUM7Q0FBQSxBQS9FRCxJQStFQztBQS9FWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCxOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSBcIn4vc2VydmljZXMvZmlyZWJhc2Uuc2VydmljZVwiO1xyXG5cclxuaW1wb3J0IHsgR2VzdHVyZUV2ZW50RGF0YSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2dlc3R1cmVzXCI7XHJcbmltcG9ydCB7IEltYWdlU291cmNlIH0gZnJvbSBcImltYWdlLXNvdXJjZVwiO1xyXG5pbXBvcnQgeyBJbWFnZUFzc2V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvaW1hZ2UtYXNzZXRcIjtcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSBcInJ4anNcIjtcclxuaW1wb3J0ICogYXMgaW1hZ2VQaWNrZXIgZnJvbSBcIm5hdGl2ZXNjcmlwdC1pbWFnZXBpY2tlclwiO1xyXG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IGFuZHJvaWQsIGlvcyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uXCI7XHJcbmltcG9ydCB7IGtub3duRm9sZGVycywgcGF0aCB9IGZyb20gXCJmaWxlLXN5c3RlbVwiO1xyXG5pbXBvcnQgeyBSYWRpb09wdGlvbiB9IGZyb20gXCJ+L21vZHVsZXMvYnV0dG9ucy9yYWRpby1vcHRpb25cIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgc2VsZWN0b3I6ICdQcm9maWxlSW5wdXQnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9wcm9maWxlLWlucHV0LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9wcm9maWxlLWlucHV0LmNvbXBvbmVudC5jc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgUHJvZmlsZUlucHV0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRlbWFpbDogc3RyaW5nID0gXCJcIjtcclxuXHRuYW1lOiBzdHJpbmcgPVwiXCJcclxuXHRnZW5kZXI6IHN0cmluZyA9IFwiXCI7XHJcblx0Y291bnRyeTogc3RyaW5nID0gXCJcIjtcclxuXHRpbnRlcmVzdDogc3RyaW5nID0gXCJcIjtcclxuXHRpbnRyb2R1Y2luZzogc3RyaW5nID0gXCJcIjtcclxuXHRsYW5ndWFnZTogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgXHRzdGF0dXNDaGFuZ2VTdWJzY3I6IFN1YnNjcmlwdGlvbjtcclxuICBcclxuXHRwcml2YXRlIGlzVXBkYXRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHRwcml2YXRlIGlzQWRkaW5nTmV3OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdHByaXZhdGUgcmVtb3ZlZEltYWdlVXJsOiBzdHJpbmc7XHJcblx0Z2VuZGVyT3B0aW9uQnV0dG9ucz86IEFycmF5PFJhZGlvT3B0aW9uPjtcclxuXHRcclxuXHJcblx0Y29uc3RydWN0b3IocHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxyXG5cdFx0cHJpdmF0ZSBmaXJlYmFzZVNlcnZpY2U6IEZpcmViYXNlU2VydmljZSxcclxuXHRcdFxyXG5cdCkgeyBcclxuXHJcblx0fVxyXG5cdG5nT25Jbml0KCkgeyBcclxuXHRcdHRoaXMuZ2VuZGVyT3B0aW9uQnV0dG9ucyA9IFtcclxuXHRcdFx0bmV3IFJhZGlvT3B0aW9uKFwiR2VuZGVyXCIsIFwibWFsZVwiKSxcclxuXHRcdFx0bmV3IFJhZGlvT3B0aW9uKFwiR2VuZGVyXCIsIFwiZmVtYWxlXCIpLFxyXG5cdFx0XTtcclxuXHRcdHRoaXMuZW1haWwgPSB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlclt0aGlzLmZpcmViYXNlU2VydmljZS5hdXRodXNlci51aWRdWydwcm9maWxlJ11bJ2VtYWlsJ107XHJcblx0XHR0aGlzLm5hbWUgPSB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlclt0aGlzLmZpcmViYXNlU2VydmljZS5hdXRodXNlci51aWRdWydwcm9maWxlJ11bJ25hbWUnXTtcclxuXHR9XHJcblxyXG5cdG9uVGFwKGFyZ3M6IEdlc3R1cmVFdmVudERhdGEpIHtcclxuXHRcdHRoaXMucm91dGVyRXh0ZW5zaW9ucy5iYWNrKCk7XHJcblx0fVxyXG5cclxuICBcdG9uQWRkSW1hZ2VUYXAoaW1hZ2VUeXBlOnN0cmluZyk6IHZvaWQge1xyXG5cdFx0aWYgKHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmF1dGh1c2VyKSB7XHJcblx0XHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnBpY2tJbWFnZShpbWFnZVR5cGUpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0ZGlhbG9ncy5hbGVydChcIkNhbm5vdCB1cGxvYWQgaW1hZ2VzIGluIG9mZmxpbmUgbW9kZVwiKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNoYW5nZUNoZWNrZWRSYWRpbyhyYWRpb09wdGlvbjogUmFkaW9PcHRpb24pOiB2b2lkIHtcclxuXHRcdHJhZGlvT3B0aW9uLnNlbGVjdGVkID0gIXJhZGlvT3B0aW9uLnNlbGVjdGVkO1xyXG5cclxuXHRcdGlmICghcmFkaW9PcHRpb24uc2VsZWN0ZWQpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRzd2l0Y2ggKHJhZGlvT3B0aW9uLmdyb3VwKSB7XHJcblx0XHRcdGNhc2UgXCJHZW5kZXJcIjpcclxuXHRcdFx0XHR0aGlzLmdlbmRlciA9IHJhZGlvT3B0aW9uLnRleHQ7XHJcblx0XHRcdFx0dGhpcy5nZW5kZXJPcHRpb25CdXR0b25zLmZvckVhY2gob3B0aW9uID0+IHtcclxuXHRcdFx0XHRcdGlmIChvcHRpb24udGV4dCAhPT0gcmFkaW9PcHRpb24udGV4dCkge1xyXG5cdFx0XHRcdFx0XHRvcHRpb24uc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uU2F2ZVRhcCgpe1xyXG5cdFx0dmFyIHVzZXJQcm9maWxlVG9VcGRhdGUgPSB7XHJcblx0XHRcdGJhY2tncm91bmRQaWNzcmM6IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmN1cnJlbnRCYWNrZ3JvdW5kSW1hZ2VGaWxlVVJMLFxyXG5cdFx0XHRjb3VudHJ5OiB0aGlzLmNvdW50cnksXHJcblx0XHRcdGVtYWlsOiB0aGlzLmVtYWlsLFxyXG5cdFx0XHRnZW5kZXI6IHRoaXMuZ2VuZGVyLFxyXG5cdFx0XHRpbnRlcmVzdDogdGhpcy5pbnRlcmVzdCxcclxuXHRcdFx0aW50cm9kdWNpbmc6IHRoaXMuaW50cm9kdWNpbmcsXHJcblx0XHRcdGxhbmd1YWdlOiB0aGlzLmxhbmd1YWdlLFxyXG5cdFx0XHRuYW1lOiB0aGlzLm5hbWUsXHJcblx0XHRcdHByb2ZpbGVQaWNzcmM6IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLmN1cnJlbnRQcm9maWxlSW1hZ2VGaWxlVVJMXHJcblx0XHR9XHJcblx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5zZXRUaGlzVXNlclByb2ZpbGUodXNlclByb2ZpbGVUb1VwZGF0ZSk7XHJcblx0fVxyXG59XHJcbiJdfQ==