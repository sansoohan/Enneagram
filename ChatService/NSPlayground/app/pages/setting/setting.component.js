"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var firebase_service_1 = require("~/services/firebase.service");
var radio_option_1 = require("~/modules/buttons/radio-option");
var page_1 = require("ui/page");
var SettingComponent = /** @class */ (function () {
    function SettingComponent(routerExtensions, firebaseService, page) {
        this.routerExtensions = routerExtensions;
        this.firebaseService = firebaseService;
        this.page = page;
        this.email = "";
        this.name = "";
        this.gender = "";
        this.page.actionBarHidden = true;
    }
    SettingComponent.prototype.ngOnInit = function () {
        this.genderOptionButtons = [
            new radio_option_1.RadioOption("Gender", "male"),
            new radio_option_1.RadioOption("Gender", "female"),
        ];
        this.email = this.firebaseService.thisUser[this.firebaseService.authuser.uid]['profile']['email'];
        this.name = this.firebaseService.thisUser[this.firebaseService.authuser.uid]['profile']['name'];
        this.gender = this.firebaseService.thisUser[this.firebaseService.authuser.uid]['profile']['gender'];
        if (this.gender === 'male') {
            this.changeCheckedRadio(this.genderOptionButtons[0]);
        }
        else if (this.gender === 'female') {
            this.changeCheckedRadio(this.genderOptionButtons[1]);
        }
    };
    SettingComponent.prototype.onTap = function (args) {
        this.routerExtensions.back();
    };
    SettingComponent.prototype.changeCheckedRadio = function (radioOption) {
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
    SettingComponent.prototype.onSaveTap = function () {
        var userProfileToUpdate = {
            email: this.email,
            gender: this.gender,
            name: this.name,
        };
        this.firebaseService.setThisUserProfile(userProfileToUpdate);
    };
    SettingComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'Setting',
            templateUrl: './setting.component.html',
            styleUrls: ['./setting.component.css']
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            firebase_service_1.FirebaseService,
            page_1.Page])
    ], SettingComponent);
    return SettingComponent;
}());
exports.SettingComponent = SettingComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzZXR0aW5nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RDtBQUN6RCxzREFBK0Q7QUFDL0QsZ0VBQThEO0FBVTlELCtEQUE2RDtBQUM3RCxnQ0FBK0I7QUFPL0I7SUFPQywwQkFDUyxnQkFBa0MsRUFDbEMsZUFBZ0MsRUFDaEMsSUFBVTtRQUZWLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLFNBQUksR0FBSixJQUFJLENBQU07UUFUbkIsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUNuQixTQUFJLEdBQVUsRUFBRSxDQUFBO1FBQ2hCLFdBQU0sR0FBVyxFQUFFLENBQUM7UUFTbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQ2xDLENBQUM7SUFDRCxtQ0FBUSxHQUFSO1FBQ0MsSUFBSSxDQUFDLG1CQUFtQixHQUFHO1lBQzFCLElBQUksMEJBQVcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO1lBQ2pDLElBQUksMEJBQVcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO1NBQ25DLENBQUM7UUFDRixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRyxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFBLENBQUM7WUFDMUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RELENBQUM7UUFDRCxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLENBQUMsQ0FBQSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RCxDQUFDO0lBQ0YsQ0FBQztJQUVELGdDQUFLLEdBQUwsVUFBTSxJQUFzQjtRQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELDZDQUFrQixHQUFsQixVQUFtQixXQUF3QjtRQUMxQyxXQUFXLENBQUMsUUFBUSxHQUFHLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQztRQUU3QyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQztRQUNSLENBQUM7UUFHRCxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMzQixLQUFLLFFBQVE7Z0JBQ1osSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO2dCQUMvQixJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLFVBQUEsTUFBTTtvQkFDdEMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDdEMsTUFBTSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7b0JBQ3pCLENBQUM7Z0JBQ0YsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsS0FBSyxDQUFDO1FBQ1IsQ0FBQztJQUNGLENBQUM7SUFFRCxvQ0FBUyxHQUFUO1FBQ0MsSUFBSSxtQkFBbUIsR0FBRztZQUN6QixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtTQUNmLENBQUE7UUFDRCxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDOUQsQ0FBQztJQTdEVyxnQkFBZ0I7UUFONUIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsU0FBUztZQUNuQixXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO1NBQ3ZDLENBQUM7eUNBUzBCLHlCQUFnQjtZQUNqQixrQ0FBZTtZQUMxQixXQUFJO09BVlAsZ0JBQWdCLENBOEQ1QjtJQUFELHVCQUFDO0NBQUEsQUE5REQsSUE4REM7QUE5RFksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IEZpcmViYXNlU2VydmljZSB9IGZyb20gXCJ+L3NlcnZpY2VzL2ZpcmViYXNlLnNlcnZpY2VcIjtcclxuXHJcbmltcG9ydCB7IEdlc3R1cmVFdmVudERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9nZXN0dXJlc1wiO1xyXG5pbXBvcnQgeyBJbWFnZVNvdXJjZSB9IGZyb20gXCJpbWFnZS1zb3VyY2VcIjtcclxuaW1wb3J0IHsgSW1hZ2VBc3NldCB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2ltYWdlLWFzc2V0XCI7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gXCJyeGpzXCI7XHJcbmltcG9ydCAqIGFzIGltYWdlUGlja2VyIGZyb20gXCJuYXRpdmVzY3JpcHQtaW1hZ2VwaWNrZXJcIjtcclxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBhbmRyb2lkLCBpb3MgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBrbm93bkZvbGRlcnMsIHBhdGggfSBmcm9tIFwiZmlsZS1zeXN0ZW1cIjtcclxuaW1wb3J0IHsgUmFkaW9PcHRpb24gfSBmcm9tIFwifi9tb2R1bGVzL2J1dHRvbnMvcmFkaW8tb3B0aW9uXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5AQ29tcG9uZW50KHtcclxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gIHNlbGVjdG9yOiAnU2V0dGluZycsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL3NldHRpbmcuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL3NldHRpbmcuY29tcG9uZW50LmNzcyddXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5nQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHRlbWFpbDogc3RyaW5nID0gXCJcIjtcclxuXHRuYW1lOiBzdHJpbmcgPVwiXCJcclxuXHRnZW5kZXI6IHN0cmluZyA9IFwiXCI7XHJcblxyXG5cdGdlbmRlck9wdGlvbkJ1dHRvbnM/OiBBcnJheTxSYWRpb09wdGlvbj47XHJcblx0XHJcblx0Y29uc3RydWN0b3IoXHJcblx0XHRwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcblx0XHRwcml2YXRlIGZpcmViYXNlU2VydmljZTogRmlyZWJhc2VTZXJ2aWNlLFxyXG5cdFx0cHJpdmF0ZSBwYWdlOiBQYWdlXHJcblx0KSB7IFxyXG5cdFx0dGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XHJcblx0fVxyXG5cdG5nT25Jbml0KCkgeyBcclxuXHRcdHRoaXMuZ2VuZGVyT3B0aW9uQnV0dG9ucyA9IFtcclxuXHRcdFx0bmV3IFJhZGlvT3B0aW9uKFwiR2VuZGVyXCIsIFwibWFsZVwiKSxcclxuXHRcdFx0bmV3IFJhZGlvT3B0aW9uKFwiR2VuZGVyXCIsIFwiZmVtYWxlXCIpLFxyXG5cdFx0XTtcclxuXHRcdHRoaXMuZW1haWwgPSB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlclt0aGlzLmZpcmViYXNlU2VydmljZS5hdXRodXNlci51aWRdWydwcm9maWxlJ11bJ2VtYWlsJ107XHJcblx0XHR0aGlzLm5hbWUgPSB0aGlzLmZpcmViYXNlU2VydmljZS50aGlzVXNlclt0aGlzLmZpcmViYXNlU2VydmljZS5hdXRodXNlci51aWRdWydwcm9maWxlJ11bJ25hbWUnXTtcclxuXHRcdHRoaXMuZ2VuZGVyID0gdGhpcy5maXJlYmFzZVNlcnZpY2UudGhpc1VzZXJbdGhpcy5maXJlYmFzZVNlcnZpY2UuYXV0aHVzZXIudWlkXVsncHJvZmlsZSddWydnZW5kZXInXTtcclxuXHRcdGlmKHRoaXMuZ2VuZGVyID09PSAnbWFsZScpe1xyXG5cdFx0XHR0aGlzLmNoYW5nZUNoZWNrZWRSYWRpbyh0aGlzLmdlbmRlck9wdGlvbkJ1dHRvbnNbMF0pO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZSBpZih0aGlzLmdlbmRlciA9PT0gJ2ZlbWFsZScpe1xyXG5cdFx0XHR0aGlzLmNoYW5nZUNoZWNrZWRSYWRpbyh0aGlzLmdlbmRlck9wdGlvbkJ1dHRvbnNbMV0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25UYXAoYXJnczogR2VzdHVyZUV2ZW50RGF0YSkge1xyXG5cdFx0dGhpcy5yb3V0ZXJFeHRlbnNpb25zLmJhY2soKTtcclxuXHR9XHJcblxyXG5cdGNoYW5nZUNoZWNrZWRSYWRpbyhyYWRpb09wdGlvbjogUmFkaW9PcHRpb24pOiB2b2lkIHtcclxuXHRcdHJhZGlvT3B0aW9uLnNlbGVjdGVkID0gIXJhZGlvT3B0aW9uLnNlbGVjdGVkO1xyXG5cclxuXHRcdGlmICghcmFkaW9PcHRpb24uc2VsZWN0ZWQpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRzd2l0Y2ggKHJhZGlvT3B0aW9uLmdyb3VwKSB7XHJcblx0XHRcdGNhc2UgXCJHZW5kZXJcIjpcclxuXHRcdFx0XHR0aGlzLmdlbmRlciA9IHJhZGlvT3B0aW9uLnRleHQ7XHJcblx0XHRcdFx0dGhpcy5nZW5kZXJPcHRpb25CdXR0b25zLmZvckVhY2gob3B0aW9uID0+IHtcclxuXHRcdFx0XHRcdGlmIChvcHRpb24udGV4dCAhPT0gcmFkaW9PcHRpb24udGV4dCkge1xyXG5cdFx0XHRcdFx0XHRvcHRpb24uc2VsZWN0ZWQgPSBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRicmVhaztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdG9uU2F2ZVRhcCgpe1xyXG5cdFx0dmFyIHVzZXJQcm9maWxlVG9VcGRhdGUgPSB7XHJcblx0XHRcdGVtYWlsOiB0aGlzLmVtYWlsLFxyXG5cdFx0XHRnZW5kZXI6IHRoaXMuZ2VuZGVyLFxyXG5cdFx0XHRuYW1lOiB0aGlzLm5hbWUsXHJcblx0XHR9XHJcblx0XHR0aGlzLmZpcmViYXNlU2VydmljZS5zZXRUaGlzVXNlclByb2ZpbGUodXNlclByb2ZpbGVUb1VwZGF0ZSk7XHJcblx0fVxyXG59XHJcbiJdfQ==