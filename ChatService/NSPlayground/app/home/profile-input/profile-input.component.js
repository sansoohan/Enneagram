"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var firebase_service_1 = require("../../services/firebase.service");
var dialogs = require("ui/dialogs");
var radio_option_1 = require("../enneagram/radio-option");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZS1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9maWxlLWlucHV0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RDtBQUN6RCxzREFBK0Q7QUFDL0Qsb0VBQWtFO0FBT2xFLG9DQUFzQztBQUd0QywwREFBd0Q7QUFReEQ7SUFrQkMsK0JBQW9CLGdCQUFrQyxFQUM3QyxlQUFnQztRQURyQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQzdDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQWxCekMsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUNuQixTQUFJLEdBQVUsRUFBRSxDQUFBO1FBQ2hCLFdBQU0sR0FBVyxFQUFFLENBQUM7UUFDcEIsWUFBTyxHQUFXLEVBQUUsQ0FBQztRQUNyQixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBQ3RCLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBQ3pCLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFJZCxlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGdCQUFXLEdBQVksS0FBSyxDQUFDO0lBV3JDLENBQUM7SUFDRCx3Q0FBUSxHQUFSO1FBQ0MsSUFBSSxDQUFDLG1CQUFtQixHQUFHO1lBQzFCLElBQUksMEJBQVcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO1lBQ2pDLElBQUksMEJBQVcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO1NBQ25DLENBQUM7UUFDRixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakcsQ0FBQztJQUVELHFDQUFLLEdBQUwsVUFBTSxJQUFzQjtRQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVDLDZDQUFhLEdBQWIsVUFBYyxTQUFnQjtRQUMvQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ1AsT0FBTyxDQUFDLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7SUFDRixDQUFDO0lBRUQsa0RBQWtCLEdBQWxCLFVBQW1CLFdBQXdCO1FBQzFDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDO1FBRTdDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDO1FBQ1IsQ0FBQztRQUdELE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzNCLEtBQUssUUFBUTtnQkFDWixJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNO29CQUN0QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUN0QyxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztvQkFDekIsQ0FBQztnQkFDRixDQUFDLENBQUMsQ0FBQztnQkFDSCxLQUFLLENBQUM7UUFDUixDQUFDO0lBQ0YsQ0FBQztJQUVELHlDQUFTLEdBQVQ7UUFDQyxJQUFJLG1CQUFtQixHQUFHO1lBQ3pCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsNkJBQTZCO1lBQ3BFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLGFBQWEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLDBCQUEwQjtTQUM5RCxDQUFBO1FBQ0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUE5RVcscUJBQXFCO1FBTmpDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGNBQWM7WUFDeEIsV0FBVyxFQUFFLGdDQUFnQztZQUM3QyxTQUFTLEVBQUUsQ0FBQywrQkFBK0IsQ0FBQztTQUM3QyxDQUFDO3lDQW1CcUMseUJBQWdCO1lBQzVCLGtDQUFlO09BbkI3QixxQkFBcUIsQ0ErRWpDO0lBQUQsNEJBQUM7Q0FBQSxBQS9FRCxJQStFQztBQS9FWSxzREFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCxOZ1pvbmUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgRmlyZWJhc2VTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7IEdlc3R1cmVFdmVudERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9nZXN0dXJlc1wiO1xyXG5pbXBvcnQgeyBJbWFnZVNvdXJjZSB9IGZyb20gXCJpbWFnZS1zb3VyY2VcIjtcclxuaW1wb3J0IHsgSW1hZ2VBc3NldCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ltYWdlLWFzc2V0XCI7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gXCJyeGpzXCI7XHJcbmltcG9ydCAqIGFzIGltYWdlUGlja2VyIGZyb20gXCJuYXRpdmVzY3JpcHQtaW1hZ2VwaWNrZXJcIjtcclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBhbmRyb2lkLCBpb3MgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBrbm93bkZvbGRlcnMsIHBhdGggfSBmcm9tIFwiZmlsZS1zeXN0ZW1cIjtcclxuaW1wb3J0IHsgUmFkaW9PcHRpb24gfSBmcm9tIFwiLi4vZW5uZWFncmFtL3JhZGlvLW9wdGlvblwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICBzZWxlY3RvcjogJ1Byb2ZpbGVJbnB1dCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3Byb2ZpbGUtaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3Byb2ZpbGUtaW5wdXQuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQcm9maWxlSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG5cdGVtYWlsOiBzdHJpbmcgPSBcIlwiO1xyXG5cdG5hbWU6IHN0cmluZyA9XCJcIlxyXG5cdGdlbmRlcjogc3RyaW5nID0gXCJcIjtcclxuXHRjb3VudHJ5OiBzdHJpbmcgPSBcIlwiO1xyXG5cdGludGVyZXN0OiBzdHJpbmcgPSBcIlwiO1xyXG5cdGludHJvZHVjaW5nOiBzdHJpbmcgPSBcIlwiO1xyXG5cdGxhbmd1YWdlOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICBcdHN0YXR1c0NoYW5nZVN1YnNjcjogU3Vic2NyaXB0aW9uO1xyXG4gIFxyXG5cdHByaXZhdGUgaXNVcGRhdGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdHByaXZhdGUgaXNBZGRpbmdOZXc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0cHJpdmF0ZSByZW1vdmVkSW1hZ2VVcmw6IHN0cmluZztcclxuXHRnZW5kZXJPcHRpb25CdXR0b25zPzogQXJyYXk8UmFkaW9PcHRpb24+O1xyXG5cdFxyXG5cclxuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcblx0XHRwcml2YXRlIGZpcmViYXNlU2VydmljZTogRmlyZWJhc2VTZXJ2aWNlLFxyXG5cdFx0XHJcblx0KSB7IFxyXG5cclxuXHR9XHJcblx0bmdPbkluaXQoKSB7IFxyXG5cdFx0dGhpcy5nZW5kZXJPcHRpb25CdXR0b25zID0gW1xyXG5cdFx0XHRuZXcgUmFkaW9PcHRpb24oXCJHZW5kZXJcIiwgXCJtYWxlXCIpLFxyXG5cdFx0XHRuZXcgUmFkaW9PcHRpb24oXCJHZW5kZXJcIiwgXCJmZW1hbGVcIiksXHJcblx0XHRdO1xyXG5cdFx0dGhpcy5lbWFpbCA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyW3RoaXMuZmlyZWJhc2VTZXJ2aWNlLmF1dGh1c2VyLnVpZF1bJ3Byb2ZpbGUnXVsnZW1haWwnXTtcclxuXHRcdHRoaXMubmFtZSA9IHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnRoaXNVc2VyW3RoaXMuZmlyZWJhc2VTZXJ2aWNlLmF1dGh1c2VyLnVpZF1bJ3Byb2ZpbGUnXVsnbmFtZSddO1xyXG5cdH1cclxuXHJcblx0b25UYXAoYXJnczogR2VzdHVyZUV2ZW50RGF0YSkge1xyXG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuXHR9XHJcblxyXG4gIFx0b25BZGRJbWFnZVRhcChpbWFnZVR5cGU6c3RyaW5nKTogdm9pZCB7XHJcblx0XHRpZiAodGhpcy5maXJlYmFzZVNlcnZpY2UuYXV0aHVzZXIpIHtcclxuXHRcdFx0dGhpcy5maXJlYmFzZVNlcnZpY2UucGlja0ltYWdlKGltYWdlVHlwZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkaWFsb2dzLmFsZXJ0KFwiQ2Fubm90IHVwbG9hZCBpbWFnZXMgaW4gb2ZmbGluZSBtb2RlXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y2hhbmdlQ2hlY2tlZFJhZGlvKHJhZGlvT3B0aW9uOiBSYWRpb09wdGlvbik6IHZvaWQge1xyXG5cdFx0cmFkaW9PcHRpb24uc2VsZWN0ZWQgPSAhcmFkaW9PcHRpb24uc2VsZWN0ZWQ7XHJcblxyXG5cdFx0aWYgKCFyYWRpb09wdGlvbi5zZWxlY3RlZCkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cclxuXHRcdHN3aXRjaCAocmFkaW9PcHRpb24uZ3JvdXApIHtcclxuXHRcdFx0Y2FzZSBcIkdlbmRlclwiOlxyXG5cdFx0XHRcdHRoaXMuZ2VuZGVyID0gcmFkaW9PcHRpb24udGV4dDtcclxuXHRcdFx0XHR0aGlzLmdlbmRlck9wdGlvbkJ1dHRvbnMuZm9yRWFjaChvcHRpb24gPT4ge1xyXG5cdFx0XHRcdFx0aWYgKG9wdGlvbi50ZXh0ICE9PSByYWRpb09wdGlvbi50ZXh0KSB7XHJcblx0XHRcdFx0XHRcdG9wdGlvbi5zZWxlY3RlZCA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25TYXZlVGFwKCl7XHJcblx0XHR2YXIgdXNlclByb2ZpbGVUb1VwZGF0ZSA9IHtcclxuXHRcdFx0YmFja2dyb3VuZFBpY3NyYzogdGhpcy5maXJlYmFzZVNlcnZpY2UuY3VycmVudEJhY2tncm91bmRJbWFnZUZpbGVVUkwsXHJcblx0XHRcdGNvdW50cnk6IHRoaXMuY291bnRyeSxcclxuXHRcdFx0ZW1haWw6IHRoaXMuZW1haWwsXHJcblx0XHRcdGdlbmRlcjogdGhpcy5nZW5kZXIsXHJcblx0XHRcdGludGVyZXN0OiB0aGlzLmludGVyZXN0LFxyXG5cdFx0XHRpbnRyb2R1Y2luZzogdGhpcy5pbnRyb2R1Y2luZyxcclxuXHRcdFx0bGFuZ3VhZ2U6IHRoaXMubGFuZ3VhZ2UsXHJcblx0XHRcdG5hbWU6IHRoaXMubmFtZSxcclxuXHRcdFx0cHJvZmlsZVBpY3NyYzogdGhpcy5maXJlYmFzZVNlcnZpY2UuY3VycmVudFByb2ZpbGVJbWFnZUZpbGVVUkxcclxuXHRcdH1cclxuXHRcdHRoaXMuZmlyZWJhc2VTZXJ2aWNlLnNldFRoaXNVc2VyUHJvZmlsZSh1c2VyUHJvZmlsZVRvVXBkYXRlKTtcclxuXHR9XHJcbn1cclxuIl19